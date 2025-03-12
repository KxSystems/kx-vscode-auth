# Customized authentication for kdb VS Code extension

This guide provides a sample customized authentication extension for the [kdb VS Code extension](https://github.com/KxSystems/kx-vscode).

Customized authentication for the [kdb VS Code extension](https://github.com/KxSystems/kx-vscode) allows you to add custom logic when authenticating with kdb. This enhances security by enabling you to authenticate by various identity providers.

## Set up customization

Update the `auth` function in [extension.ts](https://github.com/KxSystems/kx-vscode-auth/blob/main/src/extension.ts) according to the custom requirements. The kdb VS Code extension passes the configuration parameters to `auth`, as defined in [customAuth.ts](https://github.com/KxSystems/kx-vscode-auth/blob/main/src/customAuth.ts).

## Build

The following commands build the extension and output `kdb-auth-1.0.0.vsix` to the workspace. It's recommended to install this file as an extension on the target VS Code instances that requires custom authentication.

```sh
npm test
npm run vsix
```

## Tests

A simple test case is provided in [extension.test.ts](https://github.com/KxSystems/kx-vscode-auth/blob/main/src/test/extension.test.ts).

## Note

The extension `name` and `publisher` in [package.json](https://github.com/KxSystems/kx-vscode-auth/blob/main/package.json) should **not** be changed.
