import Web3 from 'web3';

import { ChainlinkPlugin } from '../../src/index';
import { AggregatorV3InterfaceABI } from '../../src/aggregator_v3_interface_abi';

const aggregatorAddress = '0xECe365B379E1dD183B20fc5f022230C044d51404';

describe('Chainlink Plugin Tests', () => {
	it('should register ChainlinkPlugin and make the getPrice call', async () => {
		const web3 = new Web3('https://rpc.ankr.com/eth_rinkeby');
		web3.registerPlugin(new ChainlinkPlugin(AggregatorV3InterfaceABI, aggregatorAddress));
		const price = await web3.chainlink.getPrice();
		expect(Object.keys(price)).toEqual(
			expect.arrayContaining([
				'roundId',
				'answer',
				'startedAt',
				'updatedAt',
				'answeredInRound',
			]),
		);
	});
});
