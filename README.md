# Web3.js Chainlink Plugin

![ES Version](https://img.shields.io/badge/ES-2020-yellow)
![Node Version](https://img.shields.io/badge/node-14.x-green)
[![NPM Package][npm-image]][npm-url]

This is a Chainlink plugin implementation for version `4.x` of [web3.js](https://github.com/web3/web3.js).

## Prerequisites

-   :gear: [NodeJS](https://nodejs.org/) (LTS/Fermium)
-   :toolbox: [Yarn](https://yarnpkg.com/) or [npm](https://www.npmjs.com/package/npm)

## Installation

You can install the package either using [npm](https://www.npmjs.com/package/web3) or using [Yarn](https://yarnpkg.com/package/web3)

### Using npm

```bash
npm install @chainsafe/web3.js-chainlink-plugin
```

### Using Yarn

```bash
yarn add @chainsafe/web3.js-chainlink-plugin
```

## Using this plugin

You can use this plugin to get the price of token-pairs from a Chainlink smart contract.

Following is a code snippet for getting the Price of the pair `Link/Eth` from the Ethereum mainnet.
However, if you are connected to another Ethereum network other than the mainnet, or you would like to get the price of another pair, replace `MainnetPriceFeeds.LinkEth`, in the code below, with the address of the intended Chainlink smart contract that is deployed on the network that you are connected to, and you may check https://docs.chain.link/docs/data-feeds/price-feeds/addresses/ for the most updated mainnet and testnet addresses.

```typescript
import { ChainlinkPlugin, MainnetPriceFeeds } from '@chainsafe/web3.js-chainlink-plugin';

import Web3 from 'web3';

const web3 = new Web3('YOUR_ETHEREUM_NODE'); // Use a node connected to mainnet, if you will keep using `MainnetPriceFeeds.LinkEth` below.

const chainlinkPlugin = new ChainlinkPlugin();

web3.registerPlugin(chainlinkPlugin);

web3.chainlink.getPrice(MainnetPriceFeeds.LinkEth).then(console.log);
```

## Found an issue or have a question or suggestion

-   :writing_hand: If you found an issue or have a question or suggestion [submit an issue](https://github.com/ChainSafe/web3.js-plugin-chainlink/issues/new) or join us on [Discord](https://discord.gg/yjyvFRP)
    ![Discord](https://img.shields.io/discord/593655374469660673.svg?label=Discord&logo=discord)

## Run the tests

You may like to run the tests and examine their code to see how to use the plugin. And this would be also useful if you are a plugin writer.

First clone the repo locally. And then:

-   Run `yarn` or `npm i`
    -   Installs dependencies and builds the plugin
-   Run `yarn test` or `npm test`
    -   Runs the [unit test](https://github.com/ChainSafe/web3.js-plugin-chainlink/blob/master/test/unit/plugin.test.ts) that instantiates an instance of `Web3`, configures it with a provider, then registers the [ChainlinkPlugin](https://github.com/ChainSafe/web3.js-plugin-chainlink/blob/master/src/index.ts) on the `Web3` instance
        -   `ChainlinkPlugin` takes an `AggregatorV3InterfaceABI` as the first argument, and the deployed contract address as the second

## Useful links

-   [web3.js Documentation](https://docs.web3js.org/)
-   [Chainlink Documentation](https://docs.chain.link/docs) especially gettnig the price from the latest round: [latestRoundData](https://docs.chain.link/docs/data-feeds/price-feeds/api-reference/#latestrounddata)

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
