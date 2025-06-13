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

import * as assert from "assert";
import * as vscode from "vscode";
import { CustomAuth, CustomAuthParams } from "../customAuth";

suite("Extension Test Suite", () => {
  test("should reject for undefined token", async function () {
    this.timeout(60 * 1000);
    const extension = vscode.extensions.getExtension("KX.kdb-auth");
    assert.ok(extension);
    const api: CustomAuth = await extension.activate();
    assert.ok(api);
    const params: CustomAuthParams = {
      name: "localhost:5001 [local]",
      labels: [],
    };
    const custom = api.auth(params);
    for (let i = 10000; i <= 10100; i++) {
      try {
        await fetch(`http://localhost:${i}/verify`, { method: "POST" });
      } catch (error) {}
    }
    await assert.rejects(custom, new Error("Authentication failed!"));
  });
});
