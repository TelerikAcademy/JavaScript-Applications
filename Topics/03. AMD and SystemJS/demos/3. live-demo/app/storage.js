export default {
	get: function (storageType) {
		var storage = storageType === 'local' ? localStorage : sessionStorage;
		return {
			save: function (key, value) {
				storage.setItem(key, JSON.stringify(value));
			},
			load: function (key) {
				return JSON.parse(storage.getItem(key));
			}
		};
	}
}