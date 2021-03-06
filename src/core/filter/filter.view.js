import View from 'core/view/view';

export default class FilterView extends View {
	constructor(model) {
		super(model);
	}

	has(key) {
		const filterBy = this.model.filter().by;
		return filterBy.hasOwnProperty(key);
	}
}