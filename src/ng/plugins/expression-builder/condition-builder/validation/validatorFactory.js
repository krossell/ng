module.exports = function (app) {
	"use strict";

	app.factory('phx.workQ.components.conditionBuilder.validation.validatorFactory', Factory);
	Factory.$inject = ['phx.workQ.components.validation.validator'];

	function traverse(buffer, isValid) {
		return buffer.reduce(function (memo, item) {
			var result = isValid(item);
			if (!result) {
				memo.push(false);
			}
			return memo;
		}, []);
	}

	function Factory(validator) {
		var commonValidator = validator.create({
			required: function (value) {
				return angular.isArray(value)
					 ? value.length > 0
					 : value === 0 || value;
			}
		});

		var numberValidator = commonValidator
			 .build(['required'])
			 .register('number', function validate(value) {
				 if (angular.isArray(value)) {
					 var state = traverse(value, validate);
					 return state.length === 0;
				 }
				 else {
					 var number = parseFloat(value);
					 return !isNaN(number) && isFinite(number);
				 }
			 });

		var integerValidator = commonValidator
			 .build(['required'])
			 .register('integer', function validate(value) {
				 if (angular.isArray(value)) {
					 var state = traverse(value, validate);
					 return state.length === 0;
				 }
				 else {
					 var number = parseInt(value);
					 return !isNaN(number) && isFinite(number);
				 }
			 });

		var datetimeValidator = commonValidator
			 .build(['required'])
			 .register('datetime', function validate(value) {
				 if (angular.isArray(value)) {
					 var state = traverse(value, validate);
					 return state.length === 0;
				 }
				 else {
					 var date = new Date(value);
					 return date !== 'Invalid Date' && !isNaN(date);
				 }
			 });

		var currencyValidator = commonValidator
			 .build(['required']);

		var stringValidator = commonValidator
			 .build(['required']);

		return function (context) {
			var validators = {
				'number': numberValidator,
				'integer': integerValidator,
				'currency': currencyValidator,
				'datetime': datetimeValidator,
				'string': stringValidator
			};

			var types = context.fields.reduce(function (memo, f) {
				memo[f.name] = f.type;
				return memo;
			}, {});

			return function (key) {
				if (!types.hasOwnProperty(key)) {
					throw new Error('Invalid key ' + key);
				}

				var type = (types[key] || '').toLowerCase();
				if (!validators.hasOwnProperty(type)) {
					throw new Error('No rules registered for type ' + type);
				}

				return validators[type];
			};
		};
	}
};