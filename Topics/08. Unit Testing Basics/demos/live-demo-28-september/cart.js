function validateName(name) {
	if(typeof name !== 'string') {
		throw 'Name is not a string';
	}
	if(name.length === 0) {
		throw 'Name should not be an empty string';
	}
}

class ShoppingCart {
	constructor(name) {
		validateName(name);
		this._name = name;
	}

	get name() {
		return this._name;
	}
	set name(name) {
		validateName(name);
		this._name = name;
	}
}

module.exports = {
	ShoppingCart
};
