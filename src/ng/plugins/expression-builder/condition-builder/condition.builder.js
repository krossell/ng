import {yes} from 'core/services/utility';

export default function Factory(ExpressionBuilder) {
	const defaults = {
		isVisible: yes,
		isValid: node => node.attr('placeholder') || (!this.state || !this.state.length)
	};

	const templates = [
		{
			type: 'label',
			templateUrl: 'qgrid.expression-builder.label.tpl.html'
		},
		{
			type: 'input',
			templateUrl: 'qgrid.expression-builder.input.tpl.html'
		},
		{
			type: 'select',
			templateUrl: 'qgrid.expression-builder.select.tpl.html'
		},
		{
			type: 'button',
			templateUrl: 'qgrid.expression-builder.button.tpl.html'
		},
		{
			type: 'iconButton',
			templateUrl: 'qgrid.expression-builder.iconButton.tpl.html'
		},
		{
			type: 'autocomplete',
			templateUrl: 'qgrid.expression-builder.autocomplete.tpl.html'
		},
		{
			type: 'multiselect',
			templateUrl: 'qgrid.expression-builder.multiselect.tpl.html'
		}
	];

	const builder = new ExpressionBuilder(templates, defaults);
	return builder;
}

Factory.$inject = ['ExpressionBuilder'];