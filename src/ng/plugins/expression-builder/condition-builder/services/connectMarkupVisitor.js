module.exports = function (app) {
	"use strict";

	app.service('phx.workQ.components.conditionBuilder.services.connectMarkupVisitor', Service);
	Service.$inject = ['phx.workQ.components.conditionBuilder.services.connectConditionVisitor'];
	
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
					return '<span class="markup-condition-left">' + this.labelLeft(condition.left) + '</span><span class="markup-condition-right">' + ' is not empty</span>';
				case 'isNull':
					return '<span class="markup-condition-left">' + this.labelLeft(condition.left) + '</span><span class="markup-condition-right">' + ' is empty</span>';
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

			return '<span class="markup-condition-left">' + this.labelLeft(condition.left) + '</span><span class="markup-condition-op"> ' + op + ' </span><span class="markup-condition-left">' + this.labelRight(condition.right) + '</span>';
		};

		return MarkupVisitor;
	}
};