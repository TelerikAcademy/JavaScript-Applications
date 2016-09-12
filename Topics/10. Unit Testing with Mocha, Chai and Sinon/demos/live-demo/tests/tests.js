describe('function sum', function() {
    describe('valid input', function() {
        it('should return 0, when passed an empty array', function() {
            var array = [],
                actual = sum(array),
                expected = 0;

            expect(actual).to.be.equal(expected);
        });
        it('should return number, when passed an array with one number', function() {
            var num = 10,
                array = [num],
                actual = sum(array),
                expected = num;

            expect(actual).to.be.equal(expected);
        })
    });

    describe('invalid input', function() {
        it('should throw when not passed an argument', function() {
            expect(function() {
                sum();
            }).to.throw();
        })
    })
});

it('testing async function', function(done) {
    setTimeout(function() {
        expect(10).to.equal(0);
        done();
    }, 1000);
});

describe('testing with sinon', function() {
    beforeEach(function() {
        sinon.stub(console, 'log', function () {
            return 5;
        });
    });

    it('test console.log', function () {


        var result = console.log();
        expect(result).to.equal(5);
    });

    afterEach(function() {
        console.log.restore();
    });
});