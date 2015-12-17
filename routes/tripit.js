var express = require('express'),
    router = express.Router();

router.use('/tripit/cloudformation', function (request, response, next) {
    console.log(request.body);
    response.json('Ok');
});

module.exports = router;
