import { core, Web3, Web3Eth } from 'web3';

// https://github.com/ChainSafe/web3.js-plugin-chainlink/issues/15
// @ts-ignore
import { ChainlinkPlugin, MainnetPriceFeeds } from '@chainsafe/web3.js-chainlink-plugin';

describe('ChainlinkPlugin Tests', () => {
	it('should register ChainlinkPlugin plugin on Web3Context instance', () => {
		const web3Context = new core.Web3Context('http://127.0.0.1:8545');
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
			web3Context = new Web3();
			web3Context.registerPlugin(new ChainlinkPlugin());
			requestManagerSendSpy = jest.spyOn(web3Context.chainlink.requestManager, 'send');
		});

		it('should call ChainlinkPlugin.getPrice with expected RPC object', async () => {
			const providers = [
				'https://eth.public-rpc.com',
				'https://nodes.mewapi.io/rpc/eth',
				'https://ethereum.publicnode.com',
				'https://rpc.ankr.com/eth',
				'https://rpc.flashbots.net/',
			];
			let result: unknown;
			let counter = 0;
			do {
				try {
					web3Context.setProvider(providers[counter]);
					// eslint-disable-next-line no-await-in-loop
					result = await web3Context.chainlink.getPrice(MainnetPriceFeeds.LinkEth);
				} catch (error) {
					counter += 1;
				}
			} while (!result && counter < providers.length);

			if (!result) {
				throw new Error('It seems all Providers endpoints, used for the test, had issues');
			}
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
