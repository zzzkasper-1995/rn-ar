export const Response = async (res, callback) => {
	const json = await res.json();
	let respon = {};
	if (json.success) {
		respon = {ok: true, result: json};
	} else {
		respon = {ok: false, result: `Code: ${json.statusCode} Des:${json.statusDescription}`};
	}
	callback(respon);
};

export const formDataToString = formDataObject => {
	this.formDataString = '';
	Object.keys(formDataObject).forEach(key => {
		if (formDataObject[key] !== null && formDataObject[key] !== undefined)
			this.formDataString += `&${key}=${encodeURIComponent(formDataObject[key])}`;
	});
	return this.formDataString.slice(1);
};

export const PORTAL = 'https://..';
