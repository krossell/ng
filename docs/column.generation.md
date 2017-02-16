# qgrid column generation

User doesn't have to provide columns using model service or markup. Columns can be generated by passed rows. Autogeneration creates array of objects has next structure:
```
{
	key: 'lastName',					// key from passed data
	title: 'Last Name',					// prettified key
	value: (item, value) => {...}		// getter/setter method for column cells
}
```

Column generation has two modes:
- shallow: get first-level keys of passed rows and use it for columns
- deep: more complex mode which will handle nested objects untill doesn't find primitive type or array; it'll create getter/setter using handled path to column as well

> Note that array is converted to string joined by semicolon

User should set attribute generation on q-grid:columns element. This supports values ```deep|shallow``` and switches on appropriate mode. One of this must be set for correct work.

## Examples

### markup
```html
<q-grid rows='$ctrl.rows'>
	<q-grid:columns generation="deep"></q-grid:columns>
</q-grid>
```

### script
```javascript
controller.$inject = [];
function controller(){
	this.rows = [{
		name: {
			last: 'Doe',
			first: 'John'
		},
		birthday: '1/1/1970',
		address: {
			zip: '1234',
			street: 'Ocean avenue'
		}
	}, /*...*/];

	// Auto-generated columns format equals next declaration:
	// const columns = [{
	//		key: 'last',
	//		title: 'Last',
	//		value: (item, value) => {
	//			if (value) {
	//				item.name.last = value;
	//				return;
	//			}
	//			return item.name.last;
	//		}
	//	}, {
	//		key: 'first',
	//		title: 'First',
	//		value: (item, value) => {/*...*/}
	//	}, {
	//		key: 'birthday',
	//		title: 'Birthday',
	//		value: (item, value) => {/*...*/}
	//	}, {
	//		key: 'zip',
	//		title: 'Zip',
	//		value: (item, value) => {./*...*/}
	//	}, {
	//		key: 'street',
	//		title: 'Street',
	//		value: (item, value) => {/*...*/}
	//	}];
}
```