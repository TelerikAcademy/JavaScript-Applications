/*globals describe, it, require, before, global*/

var chai = require('chai'),
	sinon = require('sinon'),
	sinonChai = require('sinon-chai');
chai.use(sinonChai);

var expect = chai.expect;

var _ = require('underscore');
var result = require('../tasks/task-6')();

describe('Task #6 Students Tests', function () {
	before(function () {
		global._ = _;
	});

	it('One book', function() {
		var books = [{
			title: 'Spam is everywhere',
			author: {
				firstName: 'Spamim',
				lastName: 'Mnogo'
			}
		}];
		var expected = ['Spamim Mnogo'];

		var actual = [];
		sinon.stub(console, 'log', function (msg) {
			actual.push('' + msg);
		});
		result(books);
		console.log.restore();

		expect(actual).to.eql(expected);
	});
	it('One author', function() {
		var books = [{
			title: 'Book1',
			author: {
				firstName: 'Sanjay',
				lastName: 'Wilfrith'
			}
		}, {
			title: 'Book27',
			author: {
				firstName: 'Sanjay',
				lastName: 'Wilfrith'
			}
		}, {
			title: 'Book3',
			author: {
				firstName: 'Sanjay',
				lastName: 'Wilfrith'
			}
		}];
		var expected = ['Sanjay Wilfrith'];

		var actual = [];
		sinon.stub(console, 'log', function (msg) {
			actual.push('' + msg);
		});
		result(books);
		console.log.restore();

		expect(actual).to.eql(expected);
	});
	it('Single most popular author', function() {
		var books = [{
			title: 'Book is 3',
			author: {
				firstName: 'Toyger',
				lastName: 'Ninos'
			}
		}, {
			title: 'Big hit',
			author: {
				firstName: 'Miles',
				lastName: 'Pietari'
			}
		}, {
			title: 'Boo is k42',
			author: {
				firstName: 'Toyger',
				lastName: 'Ninos'
			}
		}, {
			title: 'Avtobiografiq na Zlatko',
			author: {
				firstName: 'neSumZlatko',
				lastName: 'Hardmod'
			}
		}, {
			title: 'n00b',
			author: {
				firstName: 'Miles',
				lastName: 'Pietari'
			}
		}, {
			title: 'Just a bOOk',
			author: {
				firstName: 'Toyger',
				lastName: 'Ninos'
			}
		}];
		var expected = ['Toyger Ninos'];

		var actual = [];
		sinon.stub(console, 'log', function (msg) {
			actual.push('' + msg);
		});
		result(books);
		console.log.restore();

		expect(actual).to.eql(expected);
	});
	it('Several popular authors', function() {
		var books = [{
			title: 'Katadzhiya trepe molets-mutant s uran',
			author: {
				firstName: 'Leland',
				lastName: 'Pallab'
			}
		}, {
			title: 'Planirat se tridnevni stachki',
			author: {
				firstName: 'Cleitus',
				lastName: 'Lyosha'
			}
		}, {
			title: 'Pleseni svalyat bombandirovach',
			author: {
				firstName: 'Leland',
				lastName: 'Pallab'
			}
		}, {
			title: 'Stokovata borsa evakuirana',
			author: {
				firstName: 'Leland',
				lastName: 'Pallab'
			}
		}, {
			title: 'Valentino otvarya magazin v Nyu York',
			author: {
				firstName: 'Cleitus',
				lastName: 'Lyosha'
			}
		}, {
			title: 'Robot otkradna Mig-29',
			author: {
				firstName: 'Meliton',
				lastName: 'Hann'
			}
		}, {
			title: 'Vikat pensioneri',
			author: {
				firstName: 'Cleitus',
				lastName: 'Lyosha'
			}
		}, {
			title: 'Evropeyskata kosmicheska agentsiya izprati Hari Potar do kosmicheskata stantsiya',
			author: {
				firstName: 'Jan',
				lastName: 'Murray'
			}
		}, {
			title: 'Mel Gibsan otkradna samoletonosach',
			author: {
				firstName: 'Faruq',
				lastName: 'Laurie'
			}
		}, {
			title: 'Pensionerite iskat ostavki',
			author: {
				firstName: 'Osgar',
				lastName: 'Yankel'
			}
		}, {
			title: 'Maniak podgoni otryad uchiteli',
			author: {
				firstName: 'Valrio',
				lastName: 'Bongani'
			}
		}, {
			title: 'Eskimosi praznuvat',
			author: {
				firstName: 'Boitumelo',
				lastName: 'Donal'
			}
		}, {
			title: 'Horata iskat zatvor za Debeliya',
			author: {
				firstName: 'Pallas',
				lastName: 'Pauwel'
			}
		}, {
			title: 'Vrachki predrichat masovi stachki',
			author: {
				firstName: 'Shahar',
				lastName: 'Sava'
			}
		}, {
			title: 'Privatizatori zadigat raketa za skrap',
			author: {
				firstName: 'Pallas',
				lastName: 'Pauwel'
			}
		}, {
			title: 'Diabetitsi se kriyat',
			author: {
				firstName: 'Meliton',
				lastName: 'Hann'
			}
		}, {
			title: 'Androidi lekuvat malariya s hormon ot morkovi',
			author: {
				firstName: 'Achim',
				lastName: 'Dion'
			}
		}, {
			title: 'Atomen fizik trepe angeli s otrova za koloradski brambari',
			author: {
				firstName: 'Hieronymos',
				lastName: 'Udo'
			}
		}, {
			title: 'Reyndzhari dovtasvat na pomosht',
			author: {
				firstName: 'Ruben',
				lastName: 'Anah'
			}
		}, {
			title: 'Babichki rezhat vodno kolelo za otmashtenie',
			author: {
				firstName: 'Pallas',
				lastName: 'Pauwel'
			}
		}, {
			title: 'Skotovadite yadosani',
			author: {
				firstName: 'Philbert',
				lastName: 'Joel'
			}
		}];
		var expected = [
			'Cleitus Lyosha',
			'Leland Pallab',
			'Pallas Pauwel'
		];

		var actual = [];
		sinon.stub(console, 'log', function (msg) {
			actual.push('' + msg);
		});
		result(books);
		console.log.restore();

		expect(actual).to.eql(expected);
	});
});
