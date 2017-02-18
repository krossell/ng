import Directive from './directive';
import {AUTOSIZE_NAME} from 'ng/definition';

class Autosize extends Directive(AUTOSIZE_NAME) {
	constructor($scope, $element, $attrs, $document) {
		this.$scope = $scope;
		this.$element = $element;
		this.$attrs = $attrs;
		this.body = $document[0].body;
	}

	onInit() {
		const $scope = this.$scope;
		const $element = this.$element;
		const $attrs = this.$attrs;
		const body = this.body;
		const selector = $attrs.autosize;

		let focusElement = null;
		let actualWidth = 0;
		let actualText = '';

		function calculateWidth(text) {
			let width = 0;
			if (text) {
				const test =
					$('<span>' + text + '</span>')
						.css({
							'white-space': 'pre',
							'visibility': 'hidden',
							'font': focusElement.css('font'),
							'line-height': focusElement.css('line-height'),
							'border-box': focusElement.css('border-box'),
							'border': focusElement.css('border')
						})
						.appendTo(body);

				width = test.width();
				test.remove();
			}

			return width;
		}

		$scope.autosize = {
			width: text => {
				if (!focusElement || !focusElement[0] || !focusElement.css('font')) {
					focusElement = selector && $element.find(selector) || $element;
					actualWidth = calculateWidth(text);
					return actualWidth;
				}

				if (actualText === text) {
					return actualWidth;
				}

				actualText = text;
				actualWidth = calculateWidth(text);
				return actualWidth;
			}
		};
	}
}


Autosize.$inject = ['$scope', '$element', '$attrs', '$document'];

export default {
	restrict: 'A',
	bindToController: true,
	controllerAs: '$focus',
	controller: Autosize,
	require: Autosize.require,
	link: Autosize.link
};


