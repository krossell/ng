import Event from './event';
import {isObject, isFunction} from '../services/utility';
import AppError from './error';
import * as guard from './guard';
import Log from 'core/infrastructure/log';

const models = {};
let close = false;

export default class Model {
	constructor() {
		close = true;
		for (let name of Object.keys(models)) {
			const model = new models[name]();
			const event = new Event();
			this[name + 'Changed'] = event;
			this[name] = function (state, tag) {
				const length = arguments.length;
				if (length) {
					if (!isObject(state)) {
						throw new AppError(
							`model.${name}`,
							`"${state}" is not a valid type, should be an object`);
					}

					let hasChanges = false;
					const changes = {};
					const keys = Object.keys(state);
					for (let i = 0, keyLength = keys.length; i < keyLength; i++) {
						const key = keys[i];
						if (!model.hasOwnProperty(key)) {
							throw new AppError(
								`model.${name}`,
								`"${key}" is not a valid key, only [${Object.keys(model).join(', ')}] keys are supported`
							);
						}

						const newValue = state[key];
						const oldValue = model[key];
						if (newValue !== oldValue) {
							Log.info('model', `value changed - "${name}.${key}"`);
							guard.notUndefined(newValue, `model.${name}.${key}`);

							model[key] = newValue;
							hasChanges = true;
							changes[key] = {
								newValue: newValue,
								oldValue: oldValue
							};
						}
					}

					if (hasChanges) {
						event.emit({
							state: model,
							changes: changes,
							tag: length > 1 ? tag : {}
						});
					}
				}

				return model;
			};
		}
	}

	static register(name, model) {
		if (models.hasOwnProperty(name)) {
			throw new AppError(
				'model',
				`"${name}" is already registered`);
		}

		if (!isFunction(model)) {
			throw new AppError(
				`model.${name}`,
				`"${model}" is not a valid type, should be an constructor function`);
		}

		if (close) {
			throw new AppError(
				`model.${name}`,
				'can\'t register, registration was closed');
		}

		models[name] = model;
		return Model;
	}
}