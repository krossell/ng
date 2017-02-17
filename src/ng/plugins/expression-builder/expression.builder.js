import PluginComponent from '../plugin.component';
import Command from 'core/infrastructure/command';
import TemplatePath from 'core/template/template.path';
import Aggregation from 'core/services/aggregation';
import * as columnService from 'core/column/column.service';
import {isFunction, noop} from 'core/services/utility';
import {EXPRESSION_BUILDER_NAME} from '../definition';
import PipeUnit from 'core/pipe/units/pipe.unit';

TemplatePath
	.register(EXPRESSION_BUILDER_NAME, () => {
		return {
			model: 'expressionBuilder',
			resource: 'content'
		};
	});

const Plugin = PluginComponent('expression-builder', {inject: ['qgrid']});
class ExpressionBuilder extends Plugin {
	constructor() {
		super(...arguments);

		this.submit = new Command({
			execute: () => {
				this.onSubmit();
			}
		});

		this.cancel = new Command({
			execute: () => {
				this.onCancel();
			}
		});

		this.reset = new Command({
			execute: () => {
			}
		});
	}

	onInit() {
	}
}

export default ExpressionBuilder.component({
	controller: ExpressionBuilder,
	controllerAs: '$expressionBuilder',
	bindings: {
		'onSubmit': '&',
		'onCancel': '&'
	}
});