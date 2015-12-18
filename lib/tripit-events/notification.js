var request = require('request'),
    _ = require('lodash');

module.exports = function (body, slack) {
    body = JSON.parse(body);

    var message = '',
        channel_name = 'transformers',
        channel = slack.getChannelByName(channel_name),
        attachments = [];

    try {
        message = JSON.parse(body.Message);
    } catch (e) {
        message = body.Message;
    }

    if (_.isObject(message)) {
        _.forEach(message, function (value, key) {
            if (_.isObject(value)) {
                var node = '';
                for(k in value) {
                    node += "*" + k + ":*" + value[k] + "\n";
                }
                attachments.push({
                    title: key,
                    text: _.trim(node),
                });
            } else {
                attachments.push({
                    title: key,
                    text: value,
               });
            }
        });
    }

    channel.postMessage({
        username: 'AWS Cloudformation',
        color: '#ff9900',
        text: 'CloudFormation Alert',
        icon_url: 'https://s3.amazonaws.com/tinynova.assets/slack/aws.png',
        attachments: attachments
    });
}
