# Portier Authentication for [kdb VS Code](https://github.com/KxSystems/kx-vscode) Extension

This is a custom authentication extension for VS Code using [Portier](https://portier.github.io/) login service and is based on [kx-vscode-auth](https://github.com/KxSystems/kx-vscode-auth) and [portier-node](https://github.com/portier/portier-node).

## Build

The following commands build the extension and output `kdb-auth-1.0.0.vsix` to the workspace. This file should be installed as an extension on the target VS Code instances that requires [Portier](https://portier.github.io/) authentication.

```sh
npm install
npm run vsix
```

## Securing Server

A rudimentary implementation for `q` is provided for completeness in `portier.q` script since client side verfication of the token does not prevent unauthorized logins to the q server.

The following command can be used to start a q server with `Portier` authentication enabled.

```sh
q portier.q -p 5001
```

The script depends on `curl` and [jwt-cli](https://github.com/mike-engel/jwt-cli).

## Disclaimer

The code is provided as a demo and is not meant to be used in production. Check [kdb+ documentation](https://code.kx.com/q/wp/permissions/) for more information.
