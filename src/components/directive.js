'use strict';

export default function (name, require = {}) {
	const dependencies =
		Object.keys(require)
			.reduce(function (memo, key) {
				memo.push({
					key: key,
					selector: require[key]
				});

				return memo;
			}, []);

	class Directive {
		constructor() {
		}

		onInit() {
		}

		onDestroy() {
		}

		static link($scope, $element, $attrs, $ctrls) {
			const ctrl = $ctrls[0];

			ctrl.$attrs = $attrs;
			for (let i = 0, length = dependencies.length; i < length; i++) {
				const d = dependencies[i];
				ctrl[d.key] = $ctrls[i + 1];
			}

			ctrl.onInit();
			//$scope.$on('$destroy', ctrl.onDestroy);
		}
	}

	Directive.require = [name].concat(dependencies.map(d => d.selector));
	return Directive;
}