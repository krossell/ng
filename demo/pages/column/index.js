Controller.$inject = ['$http'];
export default function Controller($http) {
	const ctrl = this;

	this.rows = [];

	this.getLastName = item => {
		return item['name']['last'];
	};

	$http.get('data/people/100.json')
		.then(function (response) {
			ctrl.rows = response.data;
		});
}