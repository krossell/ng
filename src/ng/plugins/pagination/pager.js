import PluginComponent from '../plugin.component';
import {PAGER_NAME} from '../definition';
import Command from 'core/infrastructure/command';
import TemplatePath from 'core/template/template.path';

TemplatePath
	.register(PAGER_NAME, () => {
		return {
			model: 'pagination',
			resource: 'content'
		};
	});

const Plugin = PluginComponent('pager', {models: ['pagination']});
class Pager extends Plugin {
	constructor() {
		super(...arguments);

		const ctrl = this;
		this.next = new Command({
			execute: () => ctrl.current = ctrl.current + 1,
			canExecute: () => (ctrl.current + 1) * ctrl.size < ctrl.total
		});

		this.prev = new Command({
			execute: () => ctrl.current = ctrl.current - 1,
			canExecute: () => ctrl.current > 0
		});
	}

	get resource() {
		return this.model.pagination().resource;
	}

	get size() {
		return this.model.pagination().size;
	}

	set size(value) {
		this.model.pagination({size: value});
	}

	get sizeList() {
		return this.model.pagination().sizeList;
	}

	get current() {
		return this.model.pagination().current;
	}

	set current(value) {
		return this.model.pagination({current: value});
	}

	get from() {
		return Math.min(this.total, this.current * this.size + 1);
	}

	get to() {
		return Math.min(this.total, (this.current + 1) * this.size)
	}

	get total() {
		return this.model.data().rows.length;
	}
}

export default Pager.component({
	controller: Pager,
	controllerAs: '$pager',
	bindings: {
		'paginationSize': '<size',
		'paginationSizeList': '<sizeList'
	}
});