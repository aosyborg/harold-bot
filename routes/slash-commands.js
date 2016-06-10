var express = require('express'),
    router = express.Router();

var commands = require('../lib/slash-commands');

router.use('/slack/slash-command', function (request, response, next) {
    var params = {}

    request.body.split('\n').forEach(function (pair) {
        var array = pair.split('=');
        array[1] && (params[array[0]] = array[1]);
    });

    response.json(commands.parse(params))
});

module.exports = router;
