module.exports = function (app) {
	"use strict";

	app.service('phx.workQ.components.conditionBuilder.services.inlineVisitor', Service);
	Service.$inject = ['phx.workQ.components.conditionBuilder.services.conditionVisitor'];

	function Service(Visitor) {

		var operations = require('../schemas/operations');

		function InlineVisitor(selector) {
			Visitor.call(this, []);
			var next = {};

			this.select = function (id, path, value) {
				var result = selector(id, path);
				return angular.isUndefined(result) ? value : result;
			};

			this.nextId = function (id, depth) {
				var cursor = 0;
				if (next.hasOwnProperty(id)) {
					cursor = next[id] + 1;
					next[id] = cursor;
				}
				else {
					next[id] = cursor;
				}

				return function id(label) {
					return label + '-' + cursor;
				};

			};

			this.getId = function (id) {
				if (!next.hasOwnProperty(id)) {
					throw new Error('Id ' + id + ' is not found');
				}

				var cursor = next[id];
				return function id(label) {
					return label + '-' + cursor;
				};
			};
		}

		InlineVisitor.prototype = Object.create(Visitor.prototype);

		InlineVisitor.prototype.visit = function (item, depth) {
			switch (item.kind) {
				case 'group':
					this.visitGroup(item, (depth || 0) + 1);
					break;
				case 'condition':
					this.visitCondition(item, (depth || 0) + 1);
					break;
				default:
					throw Error('Invalid kind ' + item.kind);
			}
		};

		InlineVisitor.prototype.visitGroup = function (group, depth) {
			if (group.right) {
				var id = this.nextId('visitGroup', depth),
					 op = this.select(id('#logical-op'), 'value', group.op);

				this.visit(group.left, depth);
				group.op = op.toLowerCase();
				this.visit(group.right, depth);
			}
			else {
				this.visit(group.left, depth);
			}
		};

		InlineVisitor.prototype.visitCondition = function (condition, depth) {
			var id = this.nextId('visitCondition', depth),
				 op = this.select(id('#operator'), 'value', condition.op),
				 field = this.select(id('#field'), 'value', condition.left);

			condition.left = field;
			condition.op = operations.camelCaseMapping[op];
			Visitor.prototype.visitCondition.call(this, condition, depth);
		};

		InlineVisitor.prototype.visitUnary = function (condition, depth) {
			condition.right = null;
		};

		InlineVisitor.prototype.visitBinary = function (condition, depth) {
			var id = this.getId('visitCondition'),
				 value = this.select(id('#value'), 'value', condition.right);
			condition.right = value;
		};

		InlineVisitor.prototype.visitBetween = function (condition, depth) {
			var id = this.getId('visitCondition'),
				 isArray = angular.isArray(condition.right),
				 from = this.select(id('#from'), 'value', (isArray ? condition.right[0] : null)),
				 to = this.select(id('#to'), 'value', (isArray ? condition.right[1] : null));

			condition.right = [from, to];
		};

		InlineVisitor.prototype.visitIn = function (condition, depth) {
			var id = this.getId('visitCondition'),
				 isArray = angular.isArray(condition.right),
				 values = this.select(id('#in-operand'), 'values', (isArray ? condition.right : []));

			condition.right = values;
		};

		return InlineVisitor;
	}

};
