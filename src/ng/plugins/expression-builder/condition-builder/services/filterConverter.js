module.exports = function (app) {
	"use strict";

	app.service('phx.workQ.components.conditionBuilder.services.filterConverter', Service);

	Service.$inject = [];

	function Service() {

		var operations = require('../schemas/operations'),
			labelMapping = operations.labelMapping,
			nodeFactory = require('./nodeFactory');

		this.visit = function (condition, filter) {
			var newFilter = angular.copy(filter),
				conditions = traversConditionFactory()(condition),
				nodes = traverseNodesFactory()(newFilter);

			for (var i=0; i < conditions.length; i++) {
				apply(nodes[i], conditions[i])
			}

			return newFilter;
		};

		function traversConditionFactory() {
			var conditions = [];
			return function traverse(node) {
				if (!node) {
					return conditions;
				}

				switch (node.kind) {
					case 'group':
						traverse(node.left);
						traverse(node.right);
						break;
					case 'condition':
						conditions.push(node);
						break;
					default:
						throw Error('Invalid kind ' + node.kind);
				}

				return conditions;
			};
		}

		function traverseNodesFactory() {
			var nodes = [];
			return function traverse(node) {
				switch (node.id) {
					case '#root':
					case '#logical':
						node.children.forEach(function (child) {
							traverse(child);
						});
						break;

					case '#condition':
						if (!node.attributes.placeholder) {
							nodes.push(node);
						}
						break;

					default:
						throw Error('Invalid kind ' + node.id);
				}

				return nodes;
			};
		}

		function apply(node, condition) {
			switch (labelMapping[condition.op]) {
				case 'IS NOT EMPTY':
				case 'IS EMPTY':
					visitUnary(node.line, condition);
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
					visitBinary(node.line, condition);
					break;
				case 'BETWEEN':
					visitBetween(node.line, condition);
					break;
				case 'IN':
					visitIn(node.line, condition);
					break;
				default:
					throw new Error('Invalid operation ' + condition.op)
			}
		}

		function visitUnary(node, condition) {
			node[1] = new nodeFactory.operator();
			if (node.length === 3) {
				node.splice(2, 1)
			}

			node.forEach(function (childNode) {
				visitNode(childNode, condition);
			});
		}

		function visitBinary(node, condition) {
			node[1] = new nodeFactory.operator();
			node[2] = new nodeFactory.binary.operand();

			node.forEach(function (child) {
				visitNode(child, condition);
			});
		}

		function visitIn(node, condition) {
			node[1] = new nodeFactory.in.operator();
			node[2] = new nodeFactory.in.operand();

			node.forEach(function (child) {
				switch (child.id) {
					case '#field':
						child.expressions[0].value = condition.left;
						break;

					case '#operator':
						child.expressions[0].value = labelMapping[condition.op];
						break;

					case '#operand':
						child.expressions[0].values = condition.right;
						break;

					default:
						throw Error('Invalid kind ' + child.id);
				}
			});
		}


		function visitBetween(node, condition) {
			node[1] = new nodeFactory.between.operator();
			node[2] = new nodeFactory.between.operand();
			node.forEach(function (child) {
				switch (child.id) {
					case '#field':
						child.expressions[0].value = condition.left;
						break;

					case '#operator':
						child.expressions[0].value = labelMapping[condition.op];
						break;

					case '#operand':
						child.expressions[0].value = condition.right[0];
						child.expressions[1].value = condition.right[1];
						break;

					default:
						throw Error('Invalid kind ' + child.id);
				}
			});
		}

		function visitNode(node, condition) {
			switch (node.id) {
				case '#field':
					node.expressions[0].value = condition.left;
					break;

				case '#operator':
					node.expressions[0].value = labelMapping[condition.op];
					break;

				case '#operand':
					node.expressions[0].value = condition.right;
					break;

				default:
					throw Error('Invalid kind ' + node.id);
			}
		}

	}

};
