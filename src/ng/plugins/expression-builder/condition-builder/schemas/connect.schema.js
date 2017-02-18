const ops = require('./operations');
const	operations = ops.oneToOneMapping;

export default function (conditionBuilder, context) {

		var filterFactory = function (type) {
			switch (type) {
				case 'STRING':
				case 'DATETIME':
					return function (field) {
						return field.type === type;
					};
				case 'CURRENCY':
				case 'INTEGER':
				case 'NUMBER':
					var map = {
						'CURRENCY': true,
						'INTEGER': true,
						'NUMBER': true
					};

					return function (field) {
						return map.hasOwnProperty(field.type);
					};

				default:
					return function () {
						return true;
					};
			}
		};

		return conditionBuilder()
			.node('#logical', function (schema) {
				schema
					.attr('serialize', {
						'#logical-op': ['value']
					})
					.select('#logical-op', {
						classes: ['cb-operation'],
						options: ['AND', 'OR'],
						value: 'AND'
					})
					.iconButton('#add-logical', {
						icon: 'add',
						click: function (node, line) {
							node.addChildAfter(node.clone());
						}
					})
					.iconButton('#remove-logical', {
						icon: 'close',
						isVisible: function (node) {
							return node.level > 1;
						},
						click: function (node) {
							node.remove();
						}
					})
					.node('#condition', function (schema) {
						schema
							.attr('placeholder', true)
							.attr('class', {
								placeholder: function (node) {
									return node.attr('placeholder');
								}
							})
							.attr('serialize', {
								'#fieldLeft': ['value'],
								'#operator': ['value'],
								'#fieldRight': ['value'],
								'@attr': ['placeholder']
							})
							.select('#fieldLeft', {
								placeholderText: 'Select a field',
								classes: ['cb-operation', 'field'],
								options: context.fields.left.map(function (f) {
									return f.name;
								}),
								value: context.fields.left.length ? context.fields.left[0].name : '',
								getLabel: function (node, line, name) {
									var field = context.fields.left.filter(function (f) {
										return f.name === name;
									})[0];

									return (field && field.label) || null
								},
								getType: function (node, line, name) {
									var field = context.fields.left.filter(function (f) {
										return f.name === name;
									})[0];

									return (field && field.type) || 'TEXT';
								},
								change: function (node, line) {
									if (node.attr('placeholder')) {
										node.addAfter(node.clone());
										node.attr('placeholder', false);
									}

									var left = this,
										leftType = left.getType(left.value),
										right = line.get('#fieldLeft').expressions[0],
										rightType = right.getType(right.value);

									if (leftType !== rightType) {
										right.value = '';
									}
								}
							})
							.select('#operator', {
								classes: ['cb-operation'],
								getOptions: function (node, line) {
									var field = line.get('#fieldLeft').expressions[0],
										name = field.value,
										type = field.getType(name);

									return type ? operations[type] : [];
								},
								value: 'EQUALS',
							})
							.select('#fieldRight', {
								placeholderText: 'Select a field',
								classes: ['cb-operation', 'field'],
								getType: function (node, line, name) {
									var field = context.fields.right.filter(function (f) {
										return f.name === name;
									})[0];

									return (field && field.type) || 'TEXT';
								},
								getOptions: function (node, line) {
									var field = line.get('#fieldLeft').expressions[0],
										name = field.value,
										type = field.getType(name),
										filter = filterFactory(type),
										fields = context
											.fields
											.right
											.filter(filter)
											.map(function (f) {
												return f.name;
											});

									if (!fields.length) {
										this.placeholderText = 'Not fields of ' + type + ' type';
									}

									return fields;
								},
								value: '',
								getLabel: function (node, line, name) {
									var field = context.fields.right.filter(function (f) {
										return f.name === name;
									})[0];

									return (field && field.label) || null
								},
								change: function (node, line) {
									if (node.attr('placeholder')) {
										node.addAfter(node.clone());
										node.attr('placeholder', false);
									}
								}
							})
							.iconButton('#remove', {
								icon: 'close',
								isVisible: function (node, line) {
									return !node.attr('placeholder');
								},
								click: function (node) {
									node.remove();
								}
							})
					})
			});
	}
}
