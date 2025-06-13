/*
 * Copyright (c) 1998-2025 Kx Systems Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the
 * License. You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations under the License.
 */

import * as vscode from "vscode";
import Fastify from "fastify";
import formPlugin from "@fastify/formbody";
import { pickPort } from "pick-port";

export function authenticate(timeout: number) {
  return new Promise<string>(async (resolve, reject) => {
    const port = await pickPort({
      type: "tcp",
      minPort: 10000,
      maxPort: 10100,
    });

    const Client = await import("portier");

    const portier = new Client.default({
      redirectUri: `http://localhost:${port}/verify`,
    });

    const app = Fastify();

    app.register(formPlugin);

    app.get("/", (req, res) => {
      res.type("text/html");
      return `
        <p>Enter your email address:</p>
        <form method="post" action="/auth">
          <input name="email" type="email">
          <button type="submit">Login</button>
        </form>
      `;
    });

    app.post("/auth", async (req, res) => {
      const body = req.body as any;
      const authUrl = await portier.authenticate(body.email);
      res.redirect(authUrl, 303);
    });

    app.post("/verify", async (req, res) => {
      const body = req.body as any;

      try {
        if (body.error) {
          throw new Error(`${body.error_description}`);
        }

        await portier.verify(body.id_token);
        resolve(body.id_token);

        const [header, payload, signature] = body.id_token.split(".");
        res.type("text/html");
        return `
          <p>WARNING: Information is shown for demo purposes only, should be removed in a production built.</p>
          <p>Token:</p>
          <pre style="white-space: pre-wrap; word-wrap: break-word;">${
            body.id_token
          }</pre>
           <p>Header:</p>
          <pre style="white-space: pre-wrap; word-wrap: break-word;">${JSON.stringify(
            JSON.parse(Buffer.from(header, "base64").toString()),
            null,
            2
          )}</pre>
          <p>Payload:</p>
          <pre style="white-space: pre-wrap; word-wrap: break-word;">${JSON.stringify(
            JSON.parse(Buffer.from(payload, "base64").toString()),
            null,
            2
          )}</pre>
          <p>Signature:</p>
          <pre style="white-space: pre-wrap; word-wrap: break-word;">${signature}</pre>
        `;
      } catch (error) {
        reject(new Error("Authentication failed!"));
        res.type("text/html");
        return `
          <p>Error: ${error}</p>
        `;
      } finally {
        app.close();
      }
    });

    await app.listen({ port });

    setTimeout(() => {
      reject(new Error("Authentication timeout!"));
      app.close();
    }, timeout);

    await vscode.env.openExternal(
      vscode.Uri.parse(`http://localhost:${port}/`)
    );
  });
}
