import PluginComponent from '../plugin.component';
import Command from 'core/infrastructure/command'
import {TH_CORE_NAME} from 'ng/definition';
import {PIVOT_BAR_NAME} from '../definition';
import TemplatePath from 'core/template/template.path';

TemplatePath
	.register(PIVOT_BAR_NAME, () => {
		return {
			model: 'pivot',
			resource: 'content'
		};
	});

const Plugin = PluginComponent('pivot-bar');
class PivotBar extends Plugin {
	constructor() {
		super(...arguments);

		this.newGroup = null;		
		this.selectedItems = null;
		
		this.replace = new Command({
				execute: key => {
					const pivot = this.model.pivot;

					pivot({
						by: [...key]
					});
				},
				canExecute: () => this.columns.length > 0
			}
		);

		this.add = new Command({
				execute: key => {
					const pivot = this.model.pivot;
					const state = pivot();
					const temp = state.by.concat(key);
				
					this.selectedItems = temp.slice();
					
					pivot({
						by: temp
					});

					this.newGroup = null;
				},
				canExecute: () => this.columns.length > 0
			}
		);

		this.remove = new Command({
			execute: key => {
				const pivot = this.model.pivot;
				const state = pivot();
				const index = state.by.findIndex(g => g === key);
				if (index >= 0) {
					const temp = Array.from(state.by);
					temp.splice(index, 1);

					this.selectedItems = temp.slice();

					pivot({
						by: temp
					});
				}
			}
		});

		this.drop = new Command({
			canExecute: e => e.source && e.source.key === TH_CORE_NAME && this.add.canExecute(e.source.value),
			execute: e => this.add.execute(e.source.value)
		});
	}

	get resource() {
		return this.model.pivot().resource;
	}

	get columns() {
		return this.model.data().columns;
	}

	get groups() {
		return this.model.pivot().by;
	}

	title(key) {
		const columns = this.columns;
		const index = columns.findIndex(c => c.key === key);
		return index >= 0 ? columns[index].title : '';
	}
}

export default PivotBar.component({
	controller: PivotBar,
	controllerAs: '$pivotBar'
});