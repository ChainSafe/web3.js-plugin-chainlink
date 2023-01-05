const config = {
	screenshotOnRunFailure: false,
	video: false,
	e2e: {
		// We've imported your old cypress plugins here.
		// You may want to clean this up later by importing these.
		setupNodeEvents(on, config) {
			return require('./cypress/plugins/index.js')(on, config);
		},
		specPattern: 'test/e2e/**/**/*.test.ts',
		excludeSpecPattern: ['**/contract_defaults_extra.test.ts'],
	},
};

module.exports = config;
