import { Web3 } from 'web3';
import { Web3Context } from 'web3-core';
import { Web3Eth } from 'web3-eth';

import { ChainlinkPlugin } from '../../src/chainlink_plugin';
import { MainnetPriceFeeds } from '../../src/types';

describe('ChainlinkPlugin Tests', () => {
	it('should register ChainlinkPlugin plugin on Web3Context instance', () => {
		const web3Context = new Web3Context('http://127.0.0.1:8545');
		web3Context.registerPlugin(new ChainlinkPlugin());
		expect(web3Context.chainlink).toBeDefined();
	});

	it('should register ChainlinkPlugin plugin on Web3Eth instance', () => {
		const web3Eth = new Web3Eth('http://127.0.0.1:8545');
		web3Eth.registerPlugin(new ChainlinkPlugin());
		expect(web3Eth.chainlink).toBeDefined();
	});

	describe('ChainlinkPlugin method tests', () => {
		const requestManagerSendSpy = jest.fn();

		let web3Context: Web3;

		beforeAll(() => {
			web3Context = new Web3('http://127.0.0.1:8545');
			web3Context.registerPlugin(new ChainlinkPlugin());
			web3Context.chainlink.requestManager.send = requestManagerSendSpy;
		});

		it('should call ChainlinkPlugin.getPrice with expected RPC object', async () => {
			await web3Context.chainlink.getPrice(MainnetPriceFeeds.LinkEth);
			expect(requestManagerSendSpy).toHaveBeenCalledWith({
				method: 'eth_call',
				params: [{ input: '0xfeaf968c', to: MainnetPriceFeeds.LinkEth }, 'latest'],
			});
		});
	});
});
