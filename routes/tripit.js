var express = require('express'),
    router = express.Router();

var event_types = {
    SubscriptionConfirmation: require('../lib/tripit-events/subscription-confirmation'),
    Notification: require('../lib/tripit-events/notification')
}

router.use('/tripit/cloudformation', function (request, response, next) {
    var event = request.get('x-amz-sns-message-type');
    if (!event_types[event]) {
        return response.status(404).json('Not Found');
    }

    event_types[event](request.body, request.slack);
    response.json('Ok');
});

module.exports = router;
