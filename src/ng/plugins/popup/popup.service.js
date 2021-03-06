import TemplateLink from 'ng/components/template/template.link';
import PopupManager from './popup.manager';

export default class PopupService {
	constructor() {
		Array.from(arguments).forEach((arg, index) => this[PopupService.$inject[index]] = arg);

		this.template = new TemplateLink(this.$compile, this.$templateCache);
		this.popups = {};
	}

	close(id) {
		const item = this.popups[id];
		item.close();

		delete this.popups[id];
	}

	closeAll() {
		const popups = Object.keys(this.popups);
		for (let i = 0, length = popups.length; i < length; i++) {
			popups[i].close();
		}
	}

	open(settings, model, parent, target) {
		if (this.popups.hasOwnProperty(settings.id)) {
			return;
		}

		target = this.targetize(null, settings);

		const scope = this.$rootScope.$new(false, parent);

		scope.model = model;
		scope.id = settings.id;

		const popup = angular.element('<q-grid:popup-panel id="id" model="model"></q-grid:popup-panel>');

		this.$document[0].body.append(popup[0]);
		this.$compile(popup)(scope);

		const pos = this.position(target, settings);

		popup.attr('id', settings.id);
		popup.css({left: pos.left + 'px', top: pos.top + 'px', zIndex: 79});

		if (settings.resizable) {
			popup.addClass('resizable');
		}
		if (settings.collapsible) {
			popup.addClass('collapsible');
		}
		if (settings.cls) {
			popup.addClass(settings.cls);
		}

		// var container = this.$document[0].body;
		// if (settings.container) {
		// 	container =
		// 		container.querySelector(settings.container)
		// 		|| container;
		// }

		this.popups[settings.id] = new PopupManager(popup, settings, this.$document[0].body);

		this.popups[settings.id].focus();
		//
		// this.$timeout(function () {
		// 	//Added this $timeout to keep the popup from flickering the position every time,
		// 	//it enters the DOM
		// 	angular.element(container).append(popup);
		// });
	}

	expand(id) {
		const item = this.popups[id];
		item.expand();
	}

	collapse(id) {
		const item = self.popups[id];
		item.collapse();
	}

	focus(id) {
		for(let [, popup] of this.popups) {
			popup.unfocus();
		}

		const popup = this.popups[id];
		popup.focus();
	}

	resize(id, settings) {
		const item = this.popups[id];
		item.resize(settings);
	}

	targetize(target, settings) {
		if (!target) {
			return {
				offset: () => {
					return {
						left: this.$window.innerWidth / 2,
						top: (this.$window.innerHeight - (parseInt(settings.height) || 0)) / 2
					};
				},
				height: () => {
					return 500;
				},
				width: () => {
					return 400;
				}
			};
		}
		else {
			//TODO: get rid of jQuery
			return angular.element(target);
		}
	}

	position(target, settings) {
		const dy = parseInt(settings.offsetTop) || 0;
		const dx = parseInt(settings.offsetLeft) || 0;
		const w = this.$window.innerWidth;
		const h = this.$window.innerHeight;
		const p = target.offset();
		const x = p.left;
		const y = p.top;
		const eh = parseInt(settings.height) || target.height();
		const ew = parseInt(settings.width) || target.width();
		const eh2 = eh / 2;
		const ew2 = ew / 2;
		const gtx1 = x + ew2 > w;
		const ltx0 = x - ew2 < 0;
		const gty1 = y + eh > h;
		const lty0 = y - eh < 0;
		const l = ltx0 && gtx1
			? w / 2 - ew2
			: gtx1
			? x - ew - dx
			: ltx0
			? x + dx
			: x - ew2 + dx;
		const t = lty0 && gty1
			? h / 2 - eh2
			: gty1
			? y - eh - dy
			: lty0
			? y + dy
			: y + dy;

		return {
			left: l,
			top: t
		};
	}
}




PopupService.$inject = [
	'$rootScope',
	'$window',
	'$document',
	'$templateCache',
	'$compile',
	'$timeout'
];
