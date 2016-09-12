//jquery

import 'jquery';

//db
import db from 'app/db.js';

export function init($element) {
	let $list,
		$input;

	$element = $($element);

	db.all()
		.forEach((item) => {
			createItem(item)
				.appendTo($list)
		});

	$input = $('<input/>');

	$('<label/>')
		.text('Text:')
		.append($input)
		.appendTo($element);

	$('<a/>')
		.addClass('button')
		.attr('href', '#')
		.text('add')
		.appendTo($element)
		.on('click', function () {
			let text = $input.val();
			$input.val('');
			let obj = {
				text
			};
			db.add(obj);
			createItem(obj)
				.appendTo($list);
		});

	$list = $('<ul/>')
		.addClass('items-list')
		.appendTo($element)
		.on('click', '.button', function () {
			let $this = $(this);
			let $item = $this.parent();
			let id = $item.attr('data-id') | 0;
			db.removeById(id);
			$item.remove();
		});

	function createItem(obj) {
		return $('<li/>')
			.addClass('list-item')
			.attr('data-id', obj.id)
			.append($('<strong/>')
				.text(obj.text))
			.append($('<a/>')
				.addClass('button')
				.attr('href', '#')
				.text('X'));
	}
}