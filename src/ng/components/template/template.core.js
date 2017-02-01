import AppError from 'core/infrastructure/error';

export default class TemplateCore {
	constructor($compile, $templateCache) {
		this.$compile = $compile;
		this.$templateCache = $templateCache;
	}

	link(templateUrl, resource, key = 'content') {
		const resourceData = resource.data;
		const template = resourceData.hasOwnProperty(key)
			? resourceData[key]
			: resourceData.hasOwnProperty('$default')
				? resourceData['$default']
				: this.$templateCache.get(templateUrl);

		return (element, scope/*, type*/) => {
			const resourceScope = resource.scope;
			for (let name of Object.keys(resourceScope)) {
				if (scope.hasOwnProperty(name)) {
					throw new AppError(
						'template.core',
						`"${name}" is reserved, use another name`
					);
				}

				scope[name] = resourceScope[name];
			}

			element.html('<!--qgrid: template-->' + template);

			// Uncomment that if custom template controller is need
			//const $node = element.html('<!--qgrid: template-->' + template);
			// if (type) {
			// 	$node[0].setAttribute(`q-grid-core:${type}`, '');
			// }

			const linkTo = this.$compile(element.contents());
			linkTo(scope);
		};
	}
}