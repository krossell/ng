module.exports = function (app) {
	"use strict";

	app.service('phx.workQ.components.conditionBuilder.services.markupVisitor', Service);
	Service.$inject = ['phx.workQ.components.conditionBuilder.services.conditionVisitor'];

	function stringify(value, type) {
		switch (type) {
			case 'STRING':
			case 'CURRENCY':
				return stringifyText(value);
			case 'INTEGER':
				return stringifyInteger(value);
			case 'NUMBER':
				return stringifyNumber(value);
			case 'DATETIME':
				return stringifyDate(value);
			default:
		}
	}

	function stringifyText(value) {
		return "<span class='markup-condition-quote'>'</span><span class='markup-condition-value markup-condition-value-text'>" + value + "</span><span class=\'markup-condition-quote\'>'</span>";
	}

	function stringifyDate(value) {
		var date = new Date(value);
		if (date !== 'Invalid Date' && !isNaN(date))
		{
			return "<span class='markup-condition-quote'>'</span><span class='markup-condition-value markup-condition-value-date'>" + value + "</span><span class=\'markup-condition-quote\'>'</span>"
		}
		else {
			return "<span class='markup-condition-quote'>'</span><span class='markup-condition-value markup-condition-value-date markup-condition-error'>" + value + "</span><span class=\'markup-condition-quote\'>'</span>"
		}
	}

	function stringifyNumber(value) {
		var number = parseFloat(value);
		if (!isNaN(number) && isFinite(number)) {
			return "<span class='markup-condition-value markup-condition-number'>" + value + "</span>";
		}
		else {
			return "<span class='markup-condition-value markup-condition-number markup-condition-error'>" + value + "</span>";
		}
	}

	function stringifyInteger(value) {
		var number = parseInt(value);
		if (!isNaN(number) && isFinite(number)) {
			return "<span class='markup-condition-value markup-condition-number'>" + value + "</span>";
		}
		else {
			return "<span class='markup-condition-value markup-condition-number markup-condition-error'>" + value + "</span>";
		}
	}

	function Service(Visitor) {
		function MarkupVisitor(fields) {
			Visitor.call(this, fields);
		}

		MarkupVisitor.prototype = Object.create(Visitor.prototype);
		

		MarkupVisitor.prototype.visitGroup = function (group, depth) {
			if (group.right) {
				var l = this.visit(group.left, depth),
					 r = this.visit(group.right, depth);

				var expr = '<div class="markup-node-left">' + l + '</div>' + '<span class="markup-group-op"> ' + group.op + ' </span> ' + '<div class="markup-node-right">' + r + "</div>";
				return '<div class="markup-node">' + (depth > 1 ? '<span class="markup-group-open">(</span>' + expr + '<span class="markup-group-close">)</span>' : expr) + '</div>';
			}

			return '<div class="markup-node">' + this.visit(group.left, depth) + '<div class="markup-node">';
		};

		MarkupVisitor.prototype.visitUnary = function (condition) {
			switch (condition.op) {
				case 'isNotNull':
					return '<span class="markup-condition-left">' + this.label(condition.left) + '</span><span class="markup-condition-right">' + ' is not empty</span>';
				case 'isNull':
					return '<span class="markup-condition-left">' + this.label(condition.left) + '</span><span class="markup-condition-right">' + ' is empty</span>';
				default:
					throw new Error('Invalid operation ' + condition.op)
			}
		};

		MarkupVisitor.prototype.visitBinary = function (condition) {
			var op;

			switch (condition.op) {
				case 'equals':
					op = '=';
					break;
				case 'notEquals':
					op = '&lt;&gt;';
					break;
				case 'greaterThanOrEquals':
					op = '&gt;='
					break;
				case 'greaterThan':
					op = '&gt;';
					break;
				case 'lessThanOrEquals':
					op = '&lt;=';
					break;
				case 'lessThan':
					op = '&lt;';
					break;
				case 'like':
					op = 'like';
					break
				case 'notLike':
					op = 'not like';
					break;
				case 'startsWith':
					op = 'starts with';
					break;
				case 'endsWith':
					op = 'ends with';
					break;
				default:
					throw new Error('Invalid operation ' + condition.op)
			}

			return '<span class="markup-condition-left">' + this.label(condition.left) + '</span><span class="markup-condition-op"> ' + op + ' </span><span class="markup-condition-right">' + stringify(condition.right, this.type(condition.left)) + '</span>';
		};

		MarkupVisitor.prototype.visitBetween = function (condition) {
			return '<span class="markup-condition-left">' +
				 this.label(condition.left) +
				 '</span><span class="markup-condition-op"> between </span><span class="markup-condition-right">' +
				 stringify(condition.right[0], this.type(condition.left)) +
				 '</span><span class="markup-condition-op"> and </span><span class="markup-condition-right">' +
				 stringify(condition.right[1], this.type(condition.left)) +
				 '</span>';
		};

		MarkupVisitor.prototype.visitIn = function (condition) {
			var self = this;
			return '<span class="markup-condition-left">' +
				 this.label(condition.left) +
				 '</span><span class="markup-condition-op"> in </span><span class="markup-condition-open">(</span><span class="markup-condition-right">' +
				 condition.right
					  .map(function (item) {
						  return stringify(item, self.type(condition.left));
					  })
					  .join(', ') +
				 '</span><span class="markup-condition-close">)</span>';
		};

		return MarkupVisitor;
	}

};
