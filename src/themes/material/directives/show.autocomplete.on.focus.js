module.exports = function (app) {

	app.directive('showAutocompleteOnFocus', Directive);

	Directive.$inject = ['$parse', '$timeout'];

	function Directive($parse, $timeout) {
		return {
			restrict: 'A',
			require: "^mdAutocomplete",
			link: function (scope, element, attrs, mdAutocompleteController) {
				var optionsFactory = $parse(attrs.showAutocompleteOnFocus);
				var onMouseUp = function () {
					if (mdAutocompleteController.hidden) {
						mdAutocompleteController.hidden = false;
						var options = optionsFactory(scope);
						options().then(function (data) {
							mdAutocompleteController.matches = data;
							$timeout(function() {
								mdAutocompleteController.scope.$apply();
							});
						});
					}
				};
				element.on('mouseup', onMouseUp);
				scope.$on('$destroy', function () {
					element.off('mouseup', onMouseUp);
				});
			}
		};
	}
};
