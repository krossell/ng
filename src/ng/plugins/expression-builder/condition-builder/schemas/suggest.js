export default
const suggestFactory = context =>
	key => (node, line) => {
		const selection = this.value == null ? '' : ('' + this.value).toLowerCase();
		const field = line.get(key).expressions[0].value;

		return context.suggest(field, 0, 10, selection)
	};


export default
const suggestsFactory = context =>
	key => (node, line) => {
		const selection =
				(this.values || [])
					.map(item => {
						return ('' + item).toLowerCase()
					}),
			deferred = $q.defer(),
			field = line.get(key).expressions[0].value;

		context.suggest(field, 0, 10, this.filter, selection)
			.then(data => {
				if (selection.length) {
					deferred.resolve(
						data.filter(function (item) {
							return selection.indexOf(('' + item).toLowerCase()) < 0;
						})
					);
				}
				else {
					deferred.resolve(data);
				}
			})
			.catch(deferred.reject);

		return deferred.promise;
	};

