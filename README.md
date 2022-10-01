# Web3.js Chainlink Plugin

![ES Version](https://img.shields.io/badge/ES-2020-yellow)
![Node Version](https://img.shields.io/badge/node-14.x-green)
[![NPM Package][npm-image]][npm-url]

This is a Chainlink plugin implementation for version `4.x` of [web3.js](https://github.com/web3/web3.js).

###### Get it from the NPM Registry

```bash
yarn add web3-plugin-chainlink
```

## Prerequisites

-   :gear: [NodeJS](https://nodejs.org/) (LTS/Fermium)
-   :toolbox: [Yarn](https://yarnpkg.com/)

## Getting Started

-   :writing_hand: If you have questions [submit an issue](https://github.com/web3/web3.js/issues/new) or join us on [Discord](https://discord.gg/yjyvFRP)
    ![Discord](https://img.shields.io/discord/593655374469660673.svg?label=Discord&logo=discord)

After cloning the repo,

-   Run `yarn`
    -   Installs dependencies and builds the plugin
-   Run `yarn test`
    -   Runs the [unit test](https://github.com/ChainSafe/web3.js-plugin-chainlink/blob/master/test/unit/plugin.test.ts) that instantiates an instance of `Web3`, configures it with a provider, then registers the [ChainlinkPlugin](https://github.com/ChainSafe/web3.js-plugin-chainlink/blob/master/src/index.ts) on the `Web3` instance
        -   `ChainlinkPlugin` takes an `AggregatorV3InterfaceABI` as the first argument, and the deployed contract address as the second

```typescript
export class ChainlinkPlugin extends Web3PluginBase {
	public pluginNamespace = 'chainlink';

	protected readonly _contract: Contract<typeof AggregatorV3InterfaceABI>;

	public constructor(abi: ContractAbi, address: Address) {
		super();
		this._contract = new Contract(abi, address);
	}
...
```

## Package.json Scripts

| Script    | Description                                        |
| --------- | -------------------------------------------------- |
| build     | Uses `tsc` to build package and dependent packages |
| clean     | Uses `rimraf` to remove `dist/`                    |
| format    | Uses `prettier` to format the code                 |
| lint      | Uses `eslint` to lint package                      |
| lint:fix  | Uses `eslint` to check and fix any warnings        |
| test      | Uses `jest` to run unit tests                      |
| test:unit | Uses `jest` to run tests under `/test/unit`        |

[npm-image]: https://img.shields.io/npm/v/web3-core-method.svg
[npm-url]: https://npmjs.org/packages/web3
