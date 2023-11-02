import { defineConfig } from 'cypress';
import allureWriter from '@shelex/cypress-allure-plugin/writer';

export default defineConfig({
	e2e: {
		baseUrl: 'https://opensource-demo.orangehrmlive.com/web/index.php',
		video: true,
		setupNodeEvents(on, config) {
			allureWriter(on, config);
			return config;
		},
		env: {
			allure: true,
			allureAttachRequests: true,
			allureAddVideoOnPass: true,
			screenshotOnRunFailure: true,
			 snapshotOnly: true
		},
	},
});