function sum(...numbers) {
	if (Array.isArray(numbers[0])) {
		numbers = numbers[0];
	}
	return numbers.reduce(function(s, number) {
		return s + number;
	}, 0);
}
