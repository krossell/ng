module.exports = function (app) {
	"use strict";

	app.service('phx.workQ.components.conditionBuilder.validation.validator', Service);
	Service.$inject = ['expressionBuilderTraverse'];

	function Service (traverse) {
		this.validate = function (node) {
			return traverse.depth(node)(function (memo, expression, line, node) {
				return node.attr('placeholder')
					? memo
					: memo && expression.isValid();
			}, true);
		};
	}
};
