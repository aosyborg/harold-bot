var express = require('express'),
    morgan = require('morgan'),
    bodyParser = require('body-parser'),
    app = express();

var slack_realtime = require('./lib/slackbot'),
    tripit = require('./routes/tripit'),
    slack_slash_commands = require('./routes/slash-commands'),
    error_handler = require('./routes/error_handler');

app.use(morgan('combined'));
app.use(bodyParser.text({type: 'text/plain'}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Slack real time messaging
app.use(slack_realtime);

// Webhooks
app.use(tripit);
app.use(slack_slash_commands);

// Error handler has to be last
//app.use(error_handler);

module.exports = app;
