import color from './color';
import view from './view';
import text from './text';
import simple from './simple';
import macro from './macro';

let type;
let theme = {
	color: color(() => type),
	simple,
	text,
	view,
	macro,
};

const setTheme = typeTheme => {
	type = typeTheme;
	theme = {
		color: color(() => type),
		simple,
		text,
		view,
		macro,
	};
};

export const createStyles = creator => creator(theme);

export const Theme = {
	setTheme,
	createStyles,
};
