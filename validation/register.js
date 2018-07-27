const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateRegisterInput(data) {
	let errors = {};

	data.name = !isEmpty(data.name) ? data.name : '';
	data.email = !isEmpty(data.email) ? data.email : '';
	data.password = !isEmpty(data.password) ? data.password : '';
	data.confirm = !isEmpty(data.confirm) ? data.confirm : '';

	// if (!Validator.isLength(data.name, { min: 2, max: 30 })) {
	//     errors.name = 'Name field is required';
	// }

	if (Validator.isEmpty(data.name)) {
		errors.name = 'Name field is required';
	}

	if (!Validator.isEmail(data.email)) {
		errors.email = 'Email is invalid';
	}

	if (Validator.isEmpty(data.email)) {
		errors.email = 'Email field is required';
	}

	if (Validator.isEmpty(data.password)) {
		errors.password = 'Password field is required';
	}

	if (!Validator.equals(data.password, date.confirm)) {
	}

	if (Validator.isEmpty(data.confirm)) {
		errors.email = 'Confirm password field is required';
	}
};
