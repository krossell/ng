module.exports = function (app) {
	"use strict";

	app.factory('phx.workQ.components.conditionBuilder.services.conditionConverter', Factory);
	Factory.$inject = [];

	var operations = require('../schemas/operations'),
		camelCase = operations.camelCaseMapping;

	function Factory() {
		return {
			convert: visit
		}
	}

	function visit(item) {
		switch (item.id) {
			case '#root':
				return visit(item.children[0]);
			case '#logical':
				var group = visitGroup(item);
				if (group) {
					if (!(group.left || group.right)) {
						return null
					}
				}

				return group;
			case '#condition':
				return visitCondition(item);
			default:
				throw Error('Invalid kind ' + item.kind);
		}
	}

	function visitGroup(node) {
		var line = node.line,
			operatorExpression = find(line, '#logical-op', '#logical-op'),
			children = node.children.filter(notPlaceholder).map(visit);

		if (children.length === 0) {
			return null;
		}

		if (children.length === 1) {
			return {
				kind: 'group',
				op: operatorExpression.value.toLowerCase(),
				left: children[0],
				right: null
			};
		}

		return children.slice(1).reduce(function (memo, item) {
			return {
				kind: 'group',
				op: operatorExpression.value.toLowerCase(),
				left: memo,
				right: item
			}
		}, children[0]);
	}

	function visitCondition(node) {
		var line = node.line,
			operatorExpression = find(line, '#operator', '#operator'),
			value = operatorExpression.value.toUpperCase();

		var condition;
		switch (value) {
			case 'IS NOT EMPTY':
			case 'IS EMPTY':
				condition = visitUnary(line, operatorExpression.value);
				break;
			case 'EQUALS':
			case 'NOT EQUALS':
			case 'GREATER OR EQ. TO':
			case 'GREATER THAN':
			case 'LESS OR EQ. TO':
			case 'LESS THAN':
			case 'LIKE':
			case 'NOT LIKE':
			case 'STARTS WITH':
			case 'ENDS WITH':
				condition = visitBinary(line, operatorExpression.value);
				break;
			case 'BETWEEN':
				condition = visitBetween(line);
				break;
			case 'IN':
				condition = visitIn(line);
				break;
			default:
				throw new Error('Invalid operation ' + value)
		}
		condition.kind = 'condition';

		return condition;
	}

	function visitUnary(line, op) {
		var left = visitField(line);

		return {
			left: left.value,
			op: camelCase[op.toUpperCase()]
		}
	}

	function visitBinary(line, op) {
		var left = visitField(line),
			right = find(line, '#operand', '#value') || find(line, '#fieldRight');

		return {
			left: left.value,
			op: camelCase[op.toUpperCase()],
			right: right.value
		}
	}

	function visitIn(line) {
		var left = visitField(line),
			right = find(line, '#operand', '#in-operand') || find(line, '#fieldRight');

		return {
			left: left.value,
			op: 'in',
			right: angular.copy(right.values) || right.value
		}
	}

	function visitBetween(line) {
		var left = visitField(line),
			from = find(line, '#operand', '#from') || find(line, '#fieldFrom'),
			to = find(line, '#operand', '#to') || find(line, '#fieldTo');

		return {
			left: left.value,
			op: 'between',
			right: [from.value, to.value]
		}
	}

	function visitField(line) {
		return find(line, '#field') || find(line, '#fieldLeft');
	}

	function notPlaceholder(node) {
		return !node.attributes.placeholder;
	}

	function find(line, groupId, expressionId) {
		var group = findById(line, groupId);
		if (!group) {
			return null;
		}

		return findById(group.expressions, expressionId || groupId);
	}

	function findById(items, id) {
		var result = items
				.filter(function (item) {
					return item.id === id;
				}),
			length = result.length;

		if (length === 1) {
			return result[0]
		}

		if (length > 1) {
			throw new Error('conditionConverter: ambiguous id ' + id);
		}

		return null;
	}
};
