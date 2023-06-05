import { Web3, Web3Eth, core as web3core } from 'web3';

import { ChainlinkPlugin } from '../../src/chainlink_plugin';
import { MainnetPriceFeeds } from '../../src/types';

describe('ChainlinkPlugin Tests', () => {
	it('should register ChainlinkPlugin plugin on Web3Context instance', () => {
		const web3Context = new web3core.Web3Context('http://127.0.0.1:8545');
		web3Context.registerPlugin(new ChainlinkPlugin());
		expect(web3Context.chainlink).toBeDefined();
	});

	it('should register ChainlinkPlugin plugin on Web3Eth instance', () => {
		const web3Eth = new Web3Eth('http://127.0.0.1:8545');
		web3Eth.registerPlugin(new ChainlinkPlugin());
		expect(web3Eth.chainlink).toBeDefined();
	});

	describe('ChainlinkPlugin method tests', () => {
		let web3Context: Web3;
		let requestManagerSendSpy: jest.SpyInstance;

		beforeAll(() => {
			web3Context = new Web3('https://rpc.ankr.com/eth');
			web3Context.registerPlugin(new ChainlinkPlugin());
			requestManagerSendSpy = jest.spyOn(web3Context.chainlink.requestManager, 'send');
		});

		it('should call ChainlinkPlugin.getPrice with expected RPC object', async () => {
			const result = await web3Context.chainlink.getPrice(MainnetPriceFeeds.LinkEth);
			expect(Object.keys(result as object)).toEqual(
				expect.arrayContaining([
					'roundId',
					'answer',
					'startedAt',
					'updatedAt',
					'answeredInRound',
				]),
			);
			expect(requestManagerSendSpy).toHaveBeenCalledWith({
				method: 'eth_call',
				params: [
					{
						data: '0xfeaf968c',
						input: '0xfeaf968c',
						to: MainnetPriceFeeds.LinkEth,
					},
					'latest',
				],
			});
		});
	});
});
