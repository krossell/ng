import Resource from '../resource/resource';

export default class SortModel {
	constructor() {
		this.resource = new Resource();
		this.by = [];
		this.mode = 'multiple';
	}
}