var config = require('../../config');

module.exports = function (slack, body) {
    var properties = {
            namespace: body.object_attributes.target.namespace,
            name: body.object_attributes.target.name,
            state: body.object_attributes.state,
            title: body.object_attributes.title,
            url: body.object_attributes.url,
            user: 'Unknown'
        },
        project = properties.namespace + '/' + properties.name,
        channel_name = 'general',
        channel;

    // We can't do anything if we don't know what channel to post in
    if (!config.gitlab_project_channels[project]) {
        console.warn('Unknown project: ' + project);
        return;
    }
    channel_name = config.gitlab_project_channels[project];

    if (body.user && body.user.name) {
        properties.user = body.user.name;
    }

    if (!properties.url) {
        // Not the best fallback but it will do
        properties.url = body.object_attributes.target.http_url;
    }

    channel = slack.getChannelByName(channel_name);
    channel.postMessage({
        username: 'harold-bot',
        icon_url: 'https://s3.amazonaws.com/aosyborg/harold-bot.png',
        attachments: [{
            pretext: 'Merge request ' + properties.state + ': ',
            fallback: 'Merge request ' + properties.state,
            title: properties.title,
            title_link: properties.url,
            text: '[' + project + '] ',
            color: '#7CD197'
        }]
    });
};
