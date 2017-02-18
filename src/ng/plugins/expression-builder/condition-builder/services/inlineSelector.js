module.exports = function (app) {
	"use strict";

	app.service('phx.workQ.components.conditionBuilder.services.inlineSelector', Service);
	Service.$inject = ['expressionBuilderTraverse'];

	function Service(traverse) {
		return function (node) {
			var map =
				 traverse.depth(node)(
					  function (memo, expr) {
						  memo[expr.id] = expr;
						  return memo;
					  }, {});

			return function (id, path) {
				var expr = map[id];
				if (!expr) {
					console.debug('Can\'t find expr ' + id);
					return;
				}

				return expr[path];
			};
		};
	}

};
