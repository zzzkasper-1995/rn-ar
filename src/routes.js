export const settingsDefault = {
	layout: {
		direction: 'ltr', // Supported directions are: 'rtl', 'ltr'
		backgroundColor: 'rgb(255,255,255,255)',
		orientation: ['portrait'],
	},
	statusBar: {
		backgroundColor: 'rgba(255,255,255,0)',
		style: 'light',
	},
	topBar: {
		visible: false,
		drawBehind: true,
		height: 0,
	},
	animations: {
		setRoot: {
			alpha: {
				from: 0,
				to: 1,
				duration: 300,
			},
		},
	},
	bottomTabs: {
		visible: true,
		backgroundColor: 'white',
		drawBehind: true,
		translucent: true,
	},
	overlay: {
		interceptTouchOutside: false,
		handleKeyboardEvents: true,
	},
};

export const rootLoadApp = {
	root: {
		stack: {
			id: 'appStack',
			children: [
				{
					component: {
						id: 'initApp',
						name: 'initApp',
					},
				},
			],
			options: {
				topBar: {
					visible: false,
					height: 0,
				},
			},
		},
	},
};

export const rootMainApp = {
	root: {
		stack: {
			id: 'appStack',
			children: [
				{
					component: {
						id: 'main',
						name: 'main',
					},
				},
			],
			options: {
				topBar: {
					visible: false,
					height: 0,
				},
			},
		},
	},
};
