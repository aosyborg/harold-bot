var request = require('request');

module.exports = function (body, slack) {
    console.log(body);
    body = JSON.parse(body);

    var message = body.message,
        channel_name = 'general',
        channel = slack.getChannelByName(channel_name);

    console.log(message);
}
