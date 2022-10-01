/*
This file is part of web3.js.

web3.js is free software: you can redistribute it and/or modify
it under the terms of the GNU Lesser General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

web3.js is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU Lesser General Public License for more details.

You should have received a copy of the GNU Lesser General Public License
along with web3.js.  If not, see <http://www.gnu.org/licenses/>.
*/
import { ContractAbi } from 'web3-eth-abi';
import Contract from 'web3-eth-contract';
import { Web3Context, Web3PluginBase } from 'web3-core';
import { Address, Web3APISpec } from 'web3-types';
// @ts-expect-error 'Web3' is declared but its value is never read.
import { Web3 } from 'web3';

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
