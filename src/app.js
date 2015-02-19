var express = require('express'),
    morgan = require('morgan'),
    bodyParser = require('body-parser'),
    app = express();

var gitlab = require('./routes/gitlab'),
    slack = require('./lib/slackbot'),
    error_handler = require('./routes/error_handler');

app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Slack real time messaging
app.use(slack);

// Webhooks
app.use(gitlab);

// Error handler has to be last
//app.use(error_handler);

module.exports = app;
