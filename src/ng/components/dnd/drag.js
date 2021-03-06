import Directive from 'ng/directives/directive';
import EventListener from 'core/infrastructure/event.listener';
import DragService from './drag.service';
import {DRAG_NAME, DROP_EFFECT_NAME, CAN_DRAG_NAME, VIEW_CORE_NAME} from 'ng/definition';
import {GRID_PREFIX} from 'core/definition';

class Drag extends Directive(DRAG_NAME, {view: `^^?${VIEW_CORE_NAME}`}) {
	constructor($element) {
		super();

		this.element = $element[0];
		this.listener = new EventListener(this, this.element);
	}

	onInit() {
		this.element.classList.add(`${GRID_PREFIX}-can-drag`);
		this.listener.on('dragstart', this.start);
		this.listener.on('dragend', this.end.bind(this));
	}

	onDestroy() {
		this.element.classList.remove(`${GRID_PREFIX}-can-drag`);
		this.listener.off()
	}

	start(e) {
		const transfer = e.dataTransfer;
		if (this.canDrag(this.event()) === false) {
			e.preventDefault();
			transfer.effectAllowed = 'none';
			return false;
		}

		const source = this.transfer();
		this.element.classList.add(`${GRID_PREFIX}-drag`);
		transfer.setData(DragService.mimeType, DragService.encode(source));
		transfer.effectAllowed = this.effect || 'move';
		DragService.transfer = source;

		if (this.view) {
			const model = this.view.model;
			model.drag({isActive: true});
		}
	}

	end() {
		this.element.classList.remove(`${GRID_PREFIX}-drag`);
		DragService.transfer = null;

		if (this.view) {
			const model = this.view.model;
			model.drag({isActive: false});
		}
	}

	event() {
		const source = this.transfer()
		return {
			$event: {
				source: source,
				target: null
			}
		};
	}
}

Drag.$inject = ['$element'];

export default {
	restrict: 'A',
	bindToController: {
		'transfer': `&${DRAG_NAME}`,
		'effect': `@${DROP_EFFECT_NAME}`,
		'canDrag': `&${CAN_DRAG_NAME}`
	},
	controllerAs: '$drag',
	controller: Drag,
	require: Drag.require,
	link: Drag.link
};