module.exports = function (app) {
	"use strict";

	app.service('phx.workQ.components.conditionBuilder.services.connectConditionVisitor', Service);
	Service.$inject = [];

	function Service() {
		return Visitor;
	}

	function Visitor(fields) {
		this.fields = fields || {left: [], right: []};
	}

	Visitor.prototype.labelLeft = function (name) {
		return this.fields.left.hasOwnProperty(name) ? this.fields.left[name].label : name;
	};

	Visitor.prototype.labelRight = function (name) {
		return this.fields.right.hasOwnProperty(name) ? this.fields.right[name].label : name;
	};

	Visitor.prototype.visit = function (item, depth) {
		switch (item.kind) {
			case 'group':
				return this.visitGroup(item, (depth || 0) + 1);
				break;
			case 'condition':
				return this.visitCondition(item, depth || 0);
				break;
			default:
				throw Error('Invalid kind ' + item.kind);
		}
	};

	Visitor.prototype.visitGroup = function (group, depth) {
		if (group.right) {
			var l = this.visit(group.left, depth),
				r = this.visit(group.right, depth);

			var expr = l + ' ' + group.op + ' ' + r;
			return depth > 1 ? '(' + expr + ')' : expr;
		}

		return this.visit(group.left, depth);
	};

	Visitor.prototype.visitCondition = function (condition, depth) {
		switch (condition.op) {
			case 'isNotNull':
			case 'isNull':
				return this.visitUnary(condition, depth);
			case 'equals':
			case 'notEquals':
			case 'greaterThanOrEquals':
			case 'greaterThan':
			case 'lessThanOrEquals':
			case 'lessThan':
			case 'like':
			case 'notLike':
			case 'startsWith':
			case 'endsWith':
				return this.visitBinary(condition, depth);
			default:
				throw new Error('Invalid operation ' + condition.op)
		}
	};

	Visitor.prototype.visitUnary = function (condition, depth) {
		switch (condition.op) {
			case 'isNotNull':
				return this.labelLeft(condition.left) + ' is not empty';
			case 'isNull':
				return this.labelLeft(condition.left) + ' is empty';
			default:
				throw new Error('Invalid operation ' + condition.op)
		}
	};

	Visitor.prototype.visitBinary = function (condition, depth) {
		switch (condition.op) {
			case 'equals':
				return this.labelLeft(condition.left) + '=' + this.labelRight(condition.right);
			case 'notEquals':
				return this.labelLeft(condition.left) + '<>' + this.labelRight(condition.right);
			case 'greaterThanOrEquals':
				return this.labelLeft(condition.left) + '>=' + this.labelRight(condition.right);
			case 'greaterThan':
				return this.labelLeft(condition.left) + '>' + this.labelRight(condition.right);
			case 'lessThanOrEquals':
				return this.labelLeft(condition.left) + '<=' + this.labelRight(condition.right);
			case 'lessThan':
				return this.labelLeft(condition.left) + '<' + this.labelRight(condition.right);
			case 'like':
				return this.labelLeft(condition.left) + ' like ' + this.labelRight('%' + condition.right + '%');
			case 'notLike':
				return this.labelLeft(condition.left) + ' not like ' + this.labelRight('%' + condition.right + '%');
			case 'startsWith':
				return this.labelLeft(condition.left) + ' starts with ' + this.labelRight('%' + condition.right + '%');
			case 'endsWith':
				return this.labelLeft(condition.left) + ' ends with ' + this.labelRight('%' + condition.right + '%');
			default:
				throw new Error('Invalid operation ' + condition.op)
		}
	};
};
