# Customized Authentication for kdb VS Code Extension

This guide provides a template for implementing customized authentication in the [kdb VS Code extension](https://github.com/KxSystems/kx-vscode).

Customized authentication for the [kdb VS Code extension](https://github.com/KxSystems/kx-vscode) allows integration with external identity providers or custom logic for authenticating kdb+ connections.

## Prerequisites

Before proceeding, ensure you meet the following prerequisites:

- You must have Node.js and `npm` installed
- You must clone the [kx-vscode-auth](https://github.com/KxSystems/kx-vscode-auth) repo and build the `vsix` extension yourself.
- You must manually install the generated `.vsix` file into your local or target VS Code instance.
- You must write your own authentication logic in TypeScript by customizing the provided template

## Important notes

- Custom authentication is supported only for kdb+ connections.
- The provided sample extension must be customized and compiled for your use case. It does not work out-of-the-box.
- When installed, the main kdb VS Code extension automatically attempts to use the custom authentication extension first for kdb+ connections.
- There is currently no UI indication that the custom authentication is active. If you're still prompted for a username/password, it likely means the custom auth extension was not triggered or failed.

## Set up instructions

1. Clone the custom authentication extension

   Open a terminal in your VSCode Studio and run the following command:

   ```sh
   git clone https://github.com/KxSystems/kx-vscode-auth.git
   cd kx-vscode-auth
   npm install
   ```

1. Customize the authentication logic

   - Modify the `auth` function in [extension.ts](https://github.com/KxSystems/kx-vscode-auth/blob/main/src/extension.ts) to implement your specific custom authentication logic.
   - The kdb VS Code extension passes the configuration parameters to `auth`, as defined in [customAuth.ts](https://github.com/KxSystems/kx-vscode-auth/blob/main/src/customAuth.ts).

1. Build the extension

   The following commands build the extension. From the workspace root, run:

   ```sh
   npm test
   npm run vsix
   ```

   This generates `kdb-auth-1.0.0.vsix`, which is your custom auth extension.

1. Install the extension

   It's recommended to install the `.vsix` file on the target VS Code instance that uses custom authentication.

1. Check the setup

   Check for errors or logs in the VS Code Output panel under the relevant extension category to debug.

   Add logging in your custom auth function to confirm that it is being executed. If you're still prompted with a username/password dialog, the custom authentication extension may not be properly installed or functioning.

## Testing

A basic test case is provided in [extension.test.ts](https://github.com/KxSystems/kx-vscode-auth/blob/main/src/test/extension.test.ts). Expand this to include tests specific to your authentication logic.

## Configuration guidelines

Do **not** change the extension `name` and `publisher` in [package.json](https://github.com/KxSystems/kx-vscode-auth/blob/main/package.json).

By following this guide and tailoring the sample code, you can implement secure and flexible authentication for your kdb+ workflows within VS Code.

## Example custom authentication

A demo for Portier login service can be found on [portier](https://github.com/KxSystems/kx-vscode-auth/tree/portier) branch.
