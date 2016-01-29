describe('gitAppTest', function () {
    var storage;

    beforeEach(function () {
        module('gitApp');
    });

    beforeEach(inject(function ($injector) {
        storage = $injector.get('storage');
    }));

    it('should return an array of five elements', function () {
        var result = storage.httpGetRequest("FuRa1");

        expect(result.length).toBe(5);

    });
/*
    it('with "yabxyzyxba1" value, result should return an array, firs elm of it will be "abxyzyxba"', function () {
        var result = parser('yabxyzyxba1');

        expect(result[0]).toBe("abxyzyxba");
    });

    it('with "yabxyzyxba1" value, result should contain 4 palindromes', function () {
        var result = parser('yabxyzyxba1');

        expect(result.length).toBe(4);
    });

    it('firs element should have maximal length', function () {
        var result = parser('yabxyzyxba1');

        expect(result[0].length > result[1].length).toBe(true);
    });
*/
});