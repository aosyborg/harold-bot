var config = require('../../config');

module.exports = function (slack, body) {
    var project = body.repository.homepage.replace(/.*\/([a-z0-9\-_]+\/[a-z0-9\-_]+)$/, '$1')
        is_known_project = config.gitlab_project_channels[project],
        channel_name = config.gitlab_project_channels[project] || 'tripit-platform',
        channel = slack.getChannelByName(channel_name);

    // Ignore in tests...
    if (!channel || !channel.postMessage) {
        return;
    }

    channel.postMessage({
        username: 'harold-bot',
        icon_url: 'https://s3.amazonaws.com/aosyborg/harold-bot.png',
        attachments: [{
            pretext: 'Testing integration with ' + project + ': ',
            fallback: 'Testing integration with ' + project + ': ' + (is_known_project ? 'success!' : 'error!'),
            text: is_known_project ? 'Project configured correctly' : 'Project missing from harold-bot config!',
            color: is_known_project ? '#309c46' : '#ca0001'
        }]
    });
};
