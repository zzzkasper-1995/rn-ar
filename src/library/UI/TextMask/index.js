import IMask from 'imask';

const TextMask = {};

TextMask.getMaskedValue = (text = '', userMask) => {
	const masked = IMask.createMask({mask: userMask});
	masked.resolve(text);
	return masked.value;
};

TextMask.unmaskedValue = (text = '', userMask) => {
	const masked = IMask.createMask({mask: userMask});
	masked.resolve(text);
	return masked.unmaskedValue;
};

TextMask.type = {
	phone: '+7 (000) 000-00-00',
	email: /^\S*@?\S*$/,
};

export {TextMask};
