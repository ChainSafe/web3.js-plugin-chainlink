import { Web3Context } from 'web3-core/dist/web3_context';
import { Web3Eth } from 'web3-eth/dist/web3_eth';

import { ChainlinkPlugin } from '../../src/index';
import { MainnetPriceFeeds } from '../../src/types';

declare module 'web3-core' {
	interface Web3Context {
		chainlink: ChainlinkPlugin;
	}
}

declare module 'web3-eth' {
	interface Web3Eth {
		chainlink: ChainlinkPlugin;
	}
}

describe('ChainlinkPlugin Tests', () => {
	it('should register ChainlinkPlugin plugin on Web3Context instance', () => {
		const web3Context = new Web3Context('http://127.0.0.1:8545');
		web3Context.registerPlugin(new ChainlinkPlugin());
		expect(web3Context.chainlink).toBeDefined();
	});

	it('should register ChainlinkPlugin plugin on Web3Eth instance', () => {
		const web3Eth = new Web3Eth('http://127.0.0.1:8545');
		// TODO Related to https://github.com/web3/web3.js/pull/5393#discussion_r985552292
		// @ts-expect-error Property 'registerPlugin' does not exist on type 'Web3Eth'
		// eslint-disable-next-line @typescript-eslint/no-unsafe-call
		web3Eth.registerPlugin(new ChainlinkPlugin());
		expect(web3Eth.chainlink).toBeDefined();
	});

	describe('ChainlinkPlugin method tests', () => {
		const requestManagerSendSpy = jest.fn();

		let web3Context: Web3Context;

		beforeAll(() => {
			web3Context = new Web3Context('http://127.0.0.1:8545');
			web3Context.registerPlugin(new ChainlinkPlugin());
			web3Context.chainlink.requestManager.send = requestManagerSendSpy;
		});

		it('should call ChainlinkPlugin.getPrice with expected RPC object', async () => {
			await web3Context.chainlink.getPrice(MainnetPriceFeeds.LinkEth);
			expect(requestManagerSendSpy).toHaveBeenCalledWith({
				method: 'eth_call',
				params: [{ data: '0xfeaf968c', to: MainnetPriceFeeds.LinkEth }, 'latest'],
			});
		});
	});
});
