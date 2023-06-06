// Module Augmentation
declare module './chainlink_plugin' {
	interface Web3Context {
		chainlink: ChainlinkPlugin;
	}
}

export * from './types';
export * from './chainlink_plugin';
