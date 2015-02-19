var _ = require('lodash'),
    config = require('../config'),
    Slack = require('slack-client');

var slack = login();

module.exports = function (request, response, next) {
    // Inject slack into the request to other middlewear can use it
    request.slack = slack;
    next();
};

function login () {
    var settings = {
            token: config.token,
            autoReconnect: config.autoReconnect || true,
            autoMark: config.autoMark || true
        },
        slack = new Slack(settings.token, settings.autoReconnect, settings.autoMark);

    slack.on('open', require('./slackbot-events/open').bind(this, slack));
    //slack.on('message', require('./slackbot-events/message').bind(this, slack));
    slack.on('error', require('./slackbot-events/error'));

    slack.login();
    return slack;
};
