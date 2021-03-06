import Command from 'core/infrastructure/command';
import * as columnService from 'core/column/column.service';

export default class Navigation {
	constructor(model) {
		this.model = model;
	}

	get commands() {
		const model = this.model;
		const commands = {
			goDown: new Command({
				shortcut: 'down',
				canExecute: () => model.navigation().row < model.view().rows.length - 1,
				execute: () => {
					model.navigation({row: model.navigation().row + 1});
				}
			}),
			goUp: new Command({
				shortcut: 'up',
				canExecute: () => model.navigation().row > 0,
				execute: () => {
					model.navigation({row: model.navigation().row - 1});
				}
			}),
			goRight: new Command({
				shortcut: 'tab|right',
				canExecute: () => model.navigation().column < columnService.lineView(model.view().columns).length - 2,
				execute: () => {
					model.navigation({column: model.navigation().column + 1});
				}
			}),
			goLeft: new Command({
				shortcut: 'shift+tab|left',
				canExecute: () => model.navigation().column > 0,
				execute: () => {
					model.navigation({column: model.navigation().column - 1});
				}
			}),
			focusFirstCellColumn: new Command({
				shortcut: 'home',
				canExecute: () => model.navigation().column > 0 || model.navigation().column == -1,
				execute: () => {
					model.navigation({column: 0});
				}
			}),
			focusLastCellColumn: new Command({
				shortcut: 'end',
				canExecute: () => model.navigation().column < columnService.lineView(model.view().columns).length - 1
				|| model.navigation().column >= -1,
				execute: () => {
					const index = columnService.lineView(model.view().columns).length - 1;
					model.navigation({column: index - 1});
				}
			}),
			focusFirstCellRow: new Command({
				shortcut: 'pageUp',
				execute: () => {
					const nav = {row: 0};
					if (model.navigation().column == -1) {
						nav.column = 0;
					}
					model.navigation(nav);
				}
			}),
			focusLastCellRow: new Command({
				shortcut: 'pageDown',
				execute: () => {
					const rows = model.view().rows;
					const nav = {row: rows.length - 1};
					if (model.navigation().column == -1) {
						nav.column = 0;
					}
					model.navigation(nav);
				}
			})
		};
		return new Map(
			Object.entries(commands)
		);
	}
}