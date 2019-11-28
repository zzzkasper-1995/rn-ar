const required = value => (value ? undefined : 'Required');
const isTrue = value => (value ? undefined : 'notTrue');
const minLength = min => value =>
	value && `${value}`.length >= min ? undefined : `Length should be greater than ${min}`;

const compare = otherValue => value => (otherValue === value ? undefined : 'not compare');
const moreThan = otherValue => value => (Number(value) > otherValue ? undefined : 'not more than');
const fromTo = (min, max) => value =>
	Number(value) > min && Number(value) <= max ? undefined : 'not more than';

const validateEmail = email => {
	const re = /\S+@\S+\.\S+/;
	if (re.test(email)) {
		return undefined;
	}
	return 'notEmail';
};

const validateEmailTop = email => {
	const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	if (re.test(String(email).toLowerCase())) {
		return undefined;
	}
	return 'notEmail';
};

// проверка пароля на сложность
const hardPas = pas => {
	// 	(?=.*[0-9]) - строка содержит хотя бы одно число;
	// (?=.*[!@#$%^&*]) - строка содержит хотя бы один спецсимвол;
	// (?=.*[a-z]) - строка содержит хотя бы одну латинскую букву в нижнем регистре;
	// (?=.*[A-Z]) - строка содержит хотя бы одну латинскую букву в верхнем регистре;
	// [0-9a-zA-Z!@#$%^&*]{6,} - строка состоит не менее, чем из 6 вышеупомянутых символов.

	const reg = /(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{8,}/g;
	if (!!pas && reg.test(pas)) {
		return undefined;
	}
	return 'need have hard';
};

const related = (arg = []) => value => {
	let res;
	if (value) {
		res = undefined;
		return res;
	}

	for (let i = 0; i < arg.length; i += 1) {
		if (arg[i]) {
			res = undefined;
			return res;
		}
	}
	// return 'need any values';
	res = 'need any values';
	return res;
};

const Validates = {
	required,
	isTrue,
	minLength,
	validateEmail,
	hardPas,
	compare,
	moreThan,
	fromTo,
	validateEmailTop,
	related,
};
export {Validates};
