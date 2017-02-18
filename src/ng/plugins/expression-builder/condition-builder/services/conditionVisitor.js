module.exports = function (app) {
	"use strict";

	app.service('phx.workQ.components.conditionBuilder.services.conditionVisitor', Service);
	Service.$inject = [];

	function stringify(value) {
		return angular.isString(value) || angular.isDate(value) ? "'" + value + "'" : value;
	}

	function Service() {
		return Visitor;
	}

	function Visitor(fields) {
		this.fields = fields || {};
	}

	Visitor.prototype.label = function (name) {
		return this.fields.hasOwnProperty(name) ? this.fields[name].label : name;
	};

	Visitor.prototype.type = function (name) {
		return this.fields.hasOwnProperty(name) ? this.fields[name].type : null;
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
			case 'between':
				return this.visitBetween(condition, depth);
			case 'in':
				return this.visitIn(condition, depth);
			default:
				throw new Error('Invalid operation ' + condition.op)
		}
	};

	Visitor.prototype.visitUnary = function (condition, depth) {
		switch (condition.op) {
			case 'isNotNull':
				return this.label(condition.left) + ' is not empty';
			case 'isNull':
				return this.label(condition.left) + ' is empty';
			default:
				throw new Error('Invalid operation ' + condition.op)
		}
	};

	Visitor.prototype.visitBinary = function (condition, depth) {
		switch (condition.op) {
			case 'equals':
				return this.label(condition.left) + '=' + stringify(condition.right);
			case 'notEquals':
				return this.label(condition.left) + '<>' + stringify(condition.right);
			case 'greaterThanOrEquals':
				return this.label(condition.left) + '>=' + stringify(condition.right);
			case 'greaterThan':
				return this.label(condition.left) + '>' + stringify(condition.right);
			case 'lessThanOrEquals':
				return this.label(condition.left) + '<=' + stringify(condition.right);
			case 'lessThan':
				return this.label(condition.left) + '<' + stringify(condition.right);
			case 'like':
				return this.label(condition.left) + ' like ' + stringify('%' + condition.right + '%');
			case 'notLike':
				return this.label(condition.left) + ' not like ' + stringify('%' + condition.right + '%');
			case 'startsWith':
				return this.label(condition.left) + ' starts with ' + stringify('%' + condition.right + '%');
			case 'endsWith':
				return this.label(condition.left) + ' ends with ' + stringify('%' + condition.right + '%');
			default:
				throw new Error('Invalid operation ' + condition.op)
		}
	};

	Visitor.prototype.visitBetween = function (condition, depth) {
		return this.label(condition.left) + ' between ' + stringify(condition.right[0]) + ' and ' + stringify(condition.right[1]);
	};

	Visitor.prototype.visitIn = function (condition, depth) {
		return this.label(condition.left) + ' in (' + condition.right.map(stringify).join(', ') + ')';
	};

};
