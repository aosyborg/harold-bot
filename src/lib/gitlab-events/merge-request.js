module.exports = function (slack, body) {
    var properties = {
            namespace: body.object_attributes.target.namespace,
            name: body.object_attributes.target.name,
            state: body.object_attributes.state,
            title: body.object_attributes.title,
            url: body.object_attributes.url,
            user: 'Unknown'
        },
        channel = slack.getChannelByName('general');

    if (body.user && body.user.name) {
        properties.user = body.user.name;
    }

    if (!properties.url) {
        // Not the best fallback but it will do
        properties.url = body.object_attributes.target.http_url;
    }

    channel.postMessage({
        username: 'harold-bot',
        icon_url: 'https://s3-us-west-2.amazonaws.com/slack-files2/avatars/2015-02-18/3766806521_0b6aba5ca200538b9496_48.jpg',
        attachments: [{
            pretext: 'Merge request ' + properties.state + ': ',
            fallback: 'Merge request ' + properties.state,
            title: properties.title,
            title_link: properties.url,
            text: '[' + properties.namespace + '/' + properties.name + '] ',
            color: '#7CD197'
        }]
    });
};
