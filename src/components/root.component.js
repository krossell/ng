'use strict';

import Component from './component';
import Model from '../core/infrastructure/model';
import ModelBinder from '../core/infrastructure/model.bind';
import {noop} from '../core/services/utility';
import Event from '../core/services/event';

export default class RootComponent extends Component {
	constructor(...names) {
		super();

		const self = this;
		const binder = new ModelBinder(self);
		let commit = noop;

		function setup() {
			let run = true;
			if (!self.model) {
				self.model = new Model();
				run = false;
			}

			return binder.bind(self.model, names, run);
		}

		self.modelChanged = new Event();

		self.$onChanges = (e) => {
			if (e.hasOwnProperty('model')) {
				commit = setup();
				self.modelChanged.emit(self.model);
				return;
			}

			commit();
		};

		self.$onInit = self.onInit;

		self.$onDestroy = () => {
			binder.bind(null);
			self.onDestroy();
		};
	}
}