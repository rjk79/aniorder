const Validator = require('validator');
const validText = require('./valid-text');

module.exports = function validateScoreInput(data) {
    let errors = {};

    data.name = validText(data.name) ? data.name : '';

    if (Validator.isEmpty(data.name)) {
        errors.name = 'Name field is required';
    }

    if (Validator.isEmpty(data.value)) {
        errors.value = 'Value field is required';
    }

    return {
        errors,
        isValid: Object.keys(errors).length === 0
    };
};