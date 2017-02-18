module.exports = function (app) {
	"use strict";

	app.service('phx.workQ.components.conditionBuilder.schemas.inlineSchema', Service);
	Service.$inject = [
		'$q',
		'phx.workQ.components.conditionBuilder.services.conditionVisitor',
		'phx.workQ.components.conditionBuilder',
		'phx.workQ.components.conditionBuilder.validation.validatorFactory'
	];

	var getValue = function (line, id, props) {
		var group = line.get(id);
		if (group) {
			if (group.expressions.length === 1) {
				var expr = group.expressions[0],
					 prop = props.filter(function (p) {
						 return expr.hasOwnProperty(p);
					 })[0];

				if (prop) {
					var value = expr[prop];
					if (angular.isArray(value) && value.length) {
						return value[0]
					}

					return value;
				}
			}
		}

		return null;
	};

	function Service($q, Visitor, builder, validatorFactory) {

		var ops = require('../schemas/operations'),
			 operations = ops.typeMapping,
			 operationMapping = ops.labelMapping;

		function InlineSchema(context) {
			Visitor.call(this, context.fields);
			var self = this,
				 next = {};

			this.suggestFactory = require('../schemas/suggest')($q, context);

			this.context = context;
			this.current = null;
			this.serialize = {};
			this.validator = validatorFactory(context);

			this.node = builder()
				 .node('#inline', function (schema) {
					 self.current = schema;
				 })
				 .apply();


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

		InlineSchema.prototype = Object.create(Visitor.prototype);

		InlineSchema.prototype.visit = function (item, depth) {
			Visitor.prototype.visit.call(this, item, depth);

			this.current.attr('serialize', this.serialize);
			return this.current;
		};

		InlineSchema.prototype.visitGroup = function (group, depth) {
			if (group.right) {
				var id = this.nextId('visitGroup');

				if (depth > 1) {
					this.current =
						 this.current
							  .label(id('#group-open'), {
								  text: '('
							  });
				}

				this.visit(group.left, depth);
				this.visitGroupOp(group.op, id);
				this.visit(group.right, depth);

				if (depth > 1) {
					this.current =
						 this.current
							  .label(id('#group-close'), {
								  text: ')'
							  });
				}
			}
			else {
				this.visit(group.left, depth);
			}
		};

		InlineSchema.prototype.visitGroupOp = function (op, id) {
			this.serialize[id('#logical-op')] = ['value'];

			this.current =
				 this.current
					  .select(id('#logical-op'), {
						  classes: ['cb-operation'],
						  options: ['AND', 'OR'],
						  value: op.toUpperCase()
					  });
		};

		InlineSchema.prototype.visitCondition = function (condition, depth) {
			var self = this,
				 validator = self.validator,
				 id = this.nextId('visitCondition', depth),
				 op = operationMapping[condition.op],
				 value = angular.copy(condition.right),
				 suggestT = this.suggestFactory(id('#field')),
				 suggest = suggestT.suggest,
				 suggests = suggestT.suggests;

			self.serialize[id('#field')] = ['value'];
			self.serialize[id('#operator')] = ['value'];
			self.serialize[id('#value')] = ['value'];
			self.serialize[id('#from')] = ['value'];
			self.serialize[id('#to')] = ['value'];
			self.serialize[id('#in-operand')] = ['values'];

			this.current =
				 this.current
					  .select(id('#field'), {
						  classes: ['cb-operation', 'field'],
						  options: self.context.fields.map(function (f) {
							  return f.name;
						  }),
						  value: condition.left,
						  getLabel: function (node, line, name) {
							  var field = self.context.fields.filter(function (f) {
								  return f.name === name;
							  })[0];

							  return (field && field.label) || null
						  },
						  getType: function (node, line, name) {
							  var field = self.context.fields.filter(function (f) {
								  return f.name === name;
							  })[0];

							  return (field && field.type) || 'TEXT';
						  },
						  change: function (node, line) {
							  if (node.attr('placeholder')) {
								  node.addAfter(node.clone());
								  node.attr('placeholder', false);
							  }

							  var field = this.value,
								   type = this.getType(field),
								   ops = operations[type] || [],
								   op = line.get(id('#operator')).expressions[0];

							  if (ops.indexOf(op.value) < 0) {
								  op.value = ops.length ? ops[0] : null;
								  op.change();
							  }
							  else {
								  var operand = line.get(id('#operand')).expressions[0];
								  operand.state = validator(field)(operand.value);
								  if(operand.state.length){
									  operand.value = null;
									  operand.state = validator(field)(operand.value);
								  }
							  }
						  }
					  })
					  .select(id('#operator'), {
						  classes: ['cb-operation', 'has-value'],
						  getOptions: function (node, line) {
							  var field = line.get(id('#field')).expressions[0],
									name = field.value,
									type = field.getType(name);

							  return type ? operations[type] : [];
						  },
						  value: op,
						  change: function (node, line) {
							  switch (this.value.toLowerCase()) {
								  case 'equals':
								  case 'not equals':
								  case 'greater than':
								  case 'less than':
								  case 'greater or eq. to':
								  case 'less or eq. to':
								  case 'like':
								  case 'not like':
								  case 'starts with':
								  case 'ends with':
									  var value = getValue(line, id('#operand'), ['value', 'values']);

									  line.put(id('#operand'), node, function (schema) {
										  schema.autocomplete(id('#value'), {
											  $watch: {
												  'value': function (oldValue, newValue, node, line) {
													  var field = line.get(id('#field')).expressions[0].value;
													  this.state = validator(field)(this.value);
												  }
											  },
											  classes: {
												  'cb-operand': true,
												  'has-value': function () {
													  return !!this.value;
												  },
												  'invalid': function (node) {
													  return !this.isValid(node);
												  }
											  },
											  options: suggest,
											  value: value,
											  placeholderText: 'Select value'
										  });
									  });
									  break;
								  case 'between':
									  line.put(id('#operand'), node, function (schema) {
										  schema
												.autocomplete(id('#from'), {
													$watch: {
														'value': function (oldValue, newValue, node, line) {
															var field = line.get(id('#field')).expressions[0].value;
															this.state = validator(field)(this.value);
														}
													},
													classes: {
														'cb-operand': true,
														'between': true,
														'has-value': function () {
															return !!this.value;
														},
														'invalid': function (node) {
															return !this.isValid(node);
														}
													},
													options: suggest,
													value: angular.isArray(value) ? value[0] : null,
													placeholderText: 'Select value'
												})
												.label(id('#and'), {
													classes: ['cb-operand'],
													text: 'AND'
												})
												.autocomplete(id('#to'), {
													$watch: {
														'value': function (oldValue, newValue, node, line) {
															var field = line.get(id('#field')).expressions[0].value;
															this.state = validator(field)(this.value);
														}
													},
													classes: {
														'cb-operand': true,
														'between': true,
														'has-value': function () {
															return !!this.value;
														},
														'invalid': function (node) {
															return !this.isValid(node);
														}
													},
													options: suggest,
													value: angular.isArray(value) ? value[1] : null,
													placeholderText: 'Select value'
												});
									  });
									  break;
								  case 'in':
									  line.put(id('#operand'), node, function (schema) {
										  schema
												.label(id('#in-open'), {
													text: '('
												})
												.multiselect(id('#in-operand'), {
													$watch: {
														'values': function (oldValue, newValue, node, line) {
															var field = line.get(id('#field')).expressions[0].value;
															this.state = validator(field)(this.values);
														}
													},
													classes: {
														'cb-operand': true,
														'has-value': function () {
															return !!this.values.length;
														},
														'invalid': function (node) {
															return !this.isValid(node);
														}
													},
													values: angular.isArray(value) ? value : [],
													options: suggests,
													placeholderText: 'Select value'
												})
												.label(id('#in-close'), {
													text: ')'
												});
									  });
									  break;
								  case 'is empty':
								  case 'is not empty':
									  line.put(id('#operand'), node, angular.noop);
									  break;
							  }
						  }
					  })
					  .group(id('#operand'), function (schema) {
						  switch (op.toLowerCase()) {
							  case 'equals':
							  case 'not equals':
							  case 'greater than':
							  case 'less than':
							  case 'greater or eq. to':
							  case 'less or eq. to':
							  case 'like':
							  case 'not like':
							  case 'starts with':
							  case 'ends with':
								  schema.autocomplete(id('#value'), {
									  $watch: {
										  'value': function (oldValue, newValue, node, line) {
											  var field = line.get(id('#field')).expressions[0].value;
											  this.state = validator(field)(this.value);
										  }
									  },
									  classes: {
										  'cb-operand': true,
										  'has-value': function () {
											  return !!this.value;
										  },
										  'invalid': function (node) {
											  return !this.isValid(node);
										  }
									  },
									  options: suggest,
									  value: value,
									  placeholderText: 'Select value'
								  });
								  break;
							  case 'between':
								  schema
										.autocomplete(id('#from'), {
											$watch: {
												'value': function (oldValue, newValue, node, line) {
													var field = line.get(id('#field')).expressions[0].value;
													this.state = validator(field)(this.value);
												}
											},
											classes: {
												'cb-operand': true,
												'between': true,
												'has-value': function () {
													return !!this.value;
												},
												'invalid': function (node) {
													return !this.isValid(node);
												}
											},
											options: suggest,
											value: angular.isArray(value) ? value[0] : null,
											placeholderText: 'Select value'
										})
										.label(id('#and'), {
											classes: ['cb-operand'],
											text: 'AND'
										})
										.autocomplete(id('#to'), {
											$watch: {
												'value': function (oldValue, newValue, node, line) {
													var field = line.get(id('#field')).expressions[0].value;
													this.state = validator(field)(this.value);
												}
											},
											classes: {
												'cb-operand': true,
												'between': true,
												'has-value': function () {
													return !!this.value;
												},
												'invalid': function (node) {
													return !this.isValid(node);
												}
											},
											options: suggest,
											value: angular.isArray(value) ? value[1] : null,
											placeholderText: 'Select value'
										});
								  break;
							  case 'in':
								  schema
										.label(id('#in-open'), {
											text: '('
										})
										.multiselect(id('#in-operand'), {
											$watch: {
												'values': function (oldValue, newValue, node, line) {
													var field = line.get(id('#field')).expressions[0].value;
													this.state = validator(field)(this.values);
												}
											},
											classes: {
												'cb-operand': true,
												'has-value': function () {
													return !!this.values.length;
												},
												'invalid': function (node) {
													return !this.isValid(node);
												}
											},
											values: angular.isArray(value) ? value : [],
											options: suggests,
											placeholderText: 'Select value'
										})
										.label(id('#in-close'), {
											text: ')'
										});
							  case'is empty':
							  case'is not empty':
								  break;
						  }
					  })
		};

		return InlineSchema;
	}
};