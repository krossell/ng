import ColumnModel from './column.model';

export default class DataColumnModel extends ColumnModel {
	constructor() {
		super(...arguments);

		this.isDefault = true;
		this.aggregation = null;
	}
}