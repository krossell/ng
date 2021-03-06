import ModelComponent from '../model.component';
import {generate} from 'core/column-list/column.list.generate';
import AppError from 'core/infrastructure/error';
import {isUndefined, assignWith, noop} from 'core/services/utility';
import merge from 'core/services/merge';
import * as columnService from 'core/column/column.service'
import {GRID_NAME} from 'ng/definition';

class ColumnList extends ModelComponent {
	constructor() {
		super('columnList');
		this.columns = [];
	}

	// Use onLink to wait while this.columns will be filled by column components
	onLink() {
		const model = this.root.model;
		const data = model.data;
		const generation = this.columnListGeneration;
		if (generation) {
			model.dataChanged.watch(e => {
				if (!e || e.changes.hasOwnProperty('rows')) {
					const generatedColumns = [];
					const rows = model.data().rows;
					switch (generation) {
						case 'deep':
							generatedColumns.push(...generate(rows, true));
							break;
						case 'shallow':
							generatedColumns.push(...generate(rows, false));
							break;
						default:
							throw new AppError(
								'column.list',
								`Invalid generation mode "${generation}"`
							);
					}

					const generatedColumnMap = columnService.map(generatedColumns);
					const templateColumnMap = columnService.map(this.columns);
					const dataColumns = data().columns.filter(c => !generatedColumnMap.hasOwnProperty(c.key) && !templateColumnMap.hasOwnProperty(c.key));
					data({columns: this.merge(this.merge(generatedColumns, dataColumns), this.columns)});
				}
			});
		}
		else {
			data({columns: this.merge(data().columns, this.columns)});
		}
	}

	merge(left, right) {
		const doMerge = merge({
			equals: (l, r) => l.key === r.key,
			update: (l, r) => assignWith(l, r, (source, target) => !isUndefined(target) && target !== null ? target : source),
			insert: (r, left) => left.unshift(r),
			remove: noop
		});

		doMerge(left, right);
		return left;
	}

	add(column) {
		this.columns.push(column);
	}
}

ColumnList.$inject = [];

export default {
	require: {
		root: `^^${GRID_NAME}`
	},
	controller: ColumnList,
	bindings: {
		columnListGeneration: '@generation'
	}
};