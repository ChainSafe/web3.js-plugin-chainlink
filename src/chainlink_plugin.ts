import { Address, Contract, ContractAbi, core as web3Core, validator } from 'web3';
import { AggregatorV3InterfaceABI } from './aggregator_v3_interface_abi';
import { GoerliPriceFeeds, MainnetPriceFeeds } from './types';
import { Web3Context } from './reexported_web3_context';

export class ChainlinkPlugin extends web3Core.Web3PluginBase {
	public pluginNamespace: string;
	public defaultAggregatorInterfaceAbi: ContractAbi;

	public constructor(options?: {
		pluginNamespace?: string;
		defaultAggregatorInterfaceAbi?: ContractAbi;
	}) {
		super();
		this.pluginNamespace = options?.pluginNamespace ?? 'chainlink';
		this.defaultAggregatorInterfaceAbi =
			options?.defaultAggregatorInterfaceAbi ?? AggregatorV3InterfaceABI;
	}

	/**
	 * Calls the `latestRoundData` method on a deployed `aggregatorInterfaceAbi` contract.
	 * More information about `latestRoundData` could be found at https://docs.chain.link/docs/data-feeds/price-feeds/api-reference/#latestrounddata
	 *
	 * @returns A `Price` object from deployed `aggregatorInterfaceAbi` contract.
	 */
	public async getPrice(
		priceFeedAddress: MainnetPriceFeeds | GoerliPriceFeeds | Address,
		aggregatorInterfaceAbi: ContractAbi = this.defaultAggregatorInterfaceAbi,
	) {
		if (!validator.isAddress(priceFeedAddress)) {
			throw new Error(
				`Provided priceFeedAddress is not a valid address: ${priceFeedAddress}`,
			);
		}

		const _contract: Contract<typeof aggregatorInterfaceAbi> = new Contract(
			aggregatorInterfaceAbi,
			priceFeedAddress,
		);

		// Adds Web3Context to Contract instance
		_contract.link(this);

		if (_contract.methods.latestRoundData !== undefined) {
			return _contract.methods.latestRoundData().call();
		}

		throw new Error(
			'Unable to get price, provided aggregatorInterfaceAbi is missing latestRoundData method',
		);
	}
}

// Module Augmentation
declare module './reexported_web3_context' {
	interface Web3Context {
		chainlink: ChainlinkPlugin;
	}
}

// Module Augmentation
declare module 'web3-core' {
	interface Web3Context {
		chainlink: ChainlinkPlugin;
	}
}

// Module Augmentation
declare module 'web3' {
	// eslint-disable-next-line @typescript-eslint/prefer-namespace-keyword, @typescript-eslint/no-namespace
	module core {
		interface Web3Context {
			chainlink: ChainlinkPlugin;
		}
	}
}

export { Web3Context };
