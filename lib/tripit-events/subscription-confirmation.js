var request = require('request');

module.exports = function (body) {
    body = JSON.parse(body);

    request(body.SubscribeURL, function (error, response) {
        if (error || response.statusCode != 200) {
            console.log(error);
            console.log(response.body);
            return
        }

        console.log('Subscribed to new tripic topic: ' + body.TopicArn);
    });
}
