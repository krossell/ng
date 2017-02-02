import angular from 'angular';

export function get(row, column) {
	if (column.path) {
		var result = row;

		angular.forEach(column.path.split('.'), function (value) {
			result = result[value];
		})

		return result;
	}

	return column.value
			? column.value(row)
			: row[column.key];
}

export function getFactory(column){
	const get = column.$value
		? row => column.$value({$row: row})
		: column.value
			? row => column.value(row)
			: row => row[column.key];

	return row => get(row);
}