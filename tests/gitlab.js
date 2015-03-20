var request = require('supertest'),
    assert = require('assert'),
    app = require('../app.js');

describe('Gitlab callbacks', function () {
    it('Handles test webhook', function (done) {
        assert(true);
        request(app)
            .post('/gitlab')
            .send(require('./data/test.json'))
            .expect(function (response) {
                assert(response.ok);
            })
            .end(done);
    });
});
