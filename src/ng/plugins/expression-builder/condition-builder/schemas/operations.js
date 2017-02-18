function swap(obj) {
	const result = {};
	for (let prop in obj) {
		if (obj.hasOwnProperty(prop)) {
			result[obj[prop]] = prop;
		}
	}

	return result;
}

export const commonOperations = [
	'EQUALS',
	'NOT EQUALS',
	'IN',
	'IS EMPTY',
	'IS NOT EMPTY'
];

export const oneToOneCommonOperations = [
	'EQUALS',
	'NOT EQUALS'
];

export const textOperations = [
	'LIKE',
	'NOT LIKE',
	'STARTS WITH',
	'ENDS WITH'
];

export const numberOpertions = [
	'BETWEEN',
	'GREATER THAN',
	'LESS THAN',
	'GREATER OR EQ. TO',
	'LESS OR EQ. TO'
];

export const oneToOneNumberOpertions = [
	'GREATER THAN',
	'LESS THAN',
	'GREATER OR EQ. TO',
	'LESS OR EQ. TO'
];

export const camelCaseMapping = {
	'IS EMPTY': 'isNull',
	'IS NOT EMPTY': 'isNotNull',
	'EQUALS': 'equals',
	'NOT EQUALS': 'notEquals',
	'GREATER OR EQ. TO': 'greaterThanOrEquals',
	'LESS OR EQ. TO': 'lessThanOrEquals',
	'GREATER THAN': 'greaterThan',
	'LESS THAN': 'lessThan',
	'LIKE': 'like',
	'NOT LIKE': 'notLike',
	'STARTS WITH': 'startsWith',
	'ENDS WITH': 'endsWith',
	'IN': 'in',
	'BETWEEN': 'between'
};

export const typeMapping = {
	STRING: commonOperations.concat(textOperations),
	INTEGER: commonOperations.concat(numberOpertions),
	NUMBER: commonOperations.concat(numberOpertions),
	DATETIME: commonOperations.concat(numberOpertions),
	CURRENCY: commonOperations.concat(numberOpertions)
};

export const oneToOneMapping = {
	STRING: oneToOneCommonOperations.concat(textOperations),
	INTEGER: oneToOneCommonOperations.concat(oneToOneNumberOpertions),
	NUMBER: oneToOneCommonOperations.concat(oneToOneNumberOpertions),
	DATETIME: oneToOneCommonOperations.concat(oneToOneNumberOpertions),
	CURRENCY: oneToOneCommonOperations.concat(oneToOneNumberOpertions)
};

export const labelMapping = swap(camelCaseMapping);