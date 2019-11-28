global.fetch = require('jest-fetch-mock');

jest.mock('react-native-languages', () => ({
	RNLanguages: {
		language: 'en',
		languages: ['en'],
	},
}));

jest.mock('react-native-simple-toast', () => ({
	SHORT: jest.fn(),
}));
