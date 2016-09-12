import storageLoader from './storage.js';
import './array-polyfills.js';

var storage = storageLoader.get('local');

let storageKey = 'data-items';
let items = storage.load(storageKey) || [];

let idGenetaror = function () {
	let id = 0;
	return {
		next: function () {
			return id += 1;
		}
	}
}();

function add(item) {
	item.id = idGenetaror.next();
	items.push(item);
	storage.save(storageKey, items);
}

function all() {
	return items.slice();
}

function removeById(id){
	var itemToDeleteIndex = items.findIndex((item) => {
		return item.id === id
	});
	if(itemToDeleteIndex<0){
		throw new Error('Invalid id');
	}
	items.splice(itemToDeleteIndex, 1);
	storage.save(storageKey, items);
}

export default {
	add, all,removeById
};