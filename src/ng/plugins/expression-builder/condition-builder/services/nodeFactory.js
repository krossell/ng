module.exports = new Factory();

function Factory() {}

Factory.prototype.operator = function () {
	return {
		"id": "#operator",
		"expressions": [
			{
				"value": "",
				"id": "#operator",
				"type": "select"
			}
		]
	}
};

Factory.prototype.operand = function () {
	return {
		"id": "#operand",
		"expressions": [
			{
				"value": null,
				"id": "#value",
				"type": "autocomplete"
			}
		]
	}
};

Factory.prototype.binary = {
	operand: function () {
		return {
			"id": "#operand",
			"expressions": [
				{
					"value": null,
					"id": "#value",
					"type": "autocomplete"
				}
			]
		}
	}
};

Factory.prototype.between = {
	operand: function () {
		return {
			"id": "#operand",
			"expressions": [
				{
					"value": null,
					"id": "#from",
					"type": "autocomplete"
				},
				{
					"value": null,
					"id": "#to",
					"type": "autocomplete"
				}
			]
		}
	},
	operator: function () {
		return {
			"id": "#operator",
			"expressions": [
				{
					"value": "BETWEEN",
					"id": "#operator",
					"type": "select",
					"method": [
						"change"
					]
				}
			]
		}
	}
};

Factory.prototype.in = {
	operand: function () {
		return {
			"id": "#operand",
			"expressions": [
				{
					"values": [],
					"id": "#in-operand",
					"type": "multiselect"
				}
			]
		}
	},
	operator: function () {
		return {
			"id": "#operator",
			"expressions": [
				{
					"value": "IN",
					"id": "#operator",
					"type": "select",
					"method": [
						"change"
					]
				}
			]
		}
	}
};
