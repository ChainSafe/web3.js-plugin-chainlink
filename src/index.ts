import { ContractAbi } from 'web3-eth-abi';
import Contract from 'web3-eth-contract';
import { Web3Context, Web3PluginBase } from 'web3-core';
import { Address, Web3APISpec } from 'web3-types';
// @ts-expect-error 'Web3' is declared but its value is never read.
import Web3 from 'web3';

import { AggregatorV3InterfaceABI } from './aggregator_v3_interface_abi';
import { Price } from './types';

export class ChainlinkPlugin extends Web3PluginBase {
	public pluginNamespace = 'chainlink';

	protected readonly _contract: Contract<typeof AggregatorV3InterfaceABI>;

	public constructor(abi: ContractAbi, address: Address) {
		super();
		this._contract = new Contract(abi, address);
	}

	/**
	 * This method overrides the inherited `link` method from `Web3PluginBase`
	 * to add to a configured `RequestManager` to our Contract instance
	 * when `Web3.registerPlugin` is called.
	 *
	 * @param parentContext - The context to be added to the instance of `ChainlinkPlugin`,
	 * and by extension, the instance of `Contract`.
	 */
	public link(parentContext: Web3Context<Web3APISpec>) {
		super.link(parentContext);
		this._contract.link(parentContext);
	}

	/**
	 * Calls the `latestRoundData` method on a deployed `AggregatorV3` contracts.
	 *
	 * @returns A `Price` ({@link Price}) object from deployed `AggregatorV3` contract.
	 */
	public async getPrice() {
		return this._contract.methods.latestRoundData().call() as unknown as Promise<Price>;
	}
}

declare module 'web3' {
	interface Web3 {
		chainlink: ChainlinkPlugin;
	}
}
