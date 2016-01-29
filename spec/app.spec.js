describe('gitAppTest', function () {
    var storage;

    beforeEach(function () {
        module('gitApp');
    });

    beforeEach(inject(function ($injector) {
        storage = $injector.get('storage');
    }));

    it('should return an empty array', function() {

        var result = storage.getFavoriteRepositories();

        expect(result.length).toBe(0);

    });

});