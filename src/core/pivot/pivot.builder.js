import {identity} from 'core/services/utility';
import pivot from './pivot';
import view from './pivot.view';

function build(columnMap, valueFactory) {
	return function run(pivot, pivotBy, level = 0) {
		const key = pivotBy[0];
		const column = columnMap[key];
		const getValue = valueFactory(column);

		return pivot({
			factory: () => ({}),
			selector: row => [getValue(row)],
			name: identity,
			value: (parent, row, pivot) => {
				const nextPivotBy = pivotBy.slice(1);
				if (nextPivotBy.length) {
					return run(
						pivot,
						nextPivotBy,
						level + 1)(row);
				}

				return true;
			}
		});
	};
}

export default function (columnMap, pivotBy, valueFactory) {
	let doPivot = null;
	if (pivotBy.length) {
		const doBuild = build(columnMap, valueFactory);
		doPivot = doBuild(pivot, pivotBy);
	}

	return rows => {
		if (doPivot) {
			const data = doPivot(rows);
			return view(data);
		}

		return null;
	};
}