module.exports = function(slack, message) {
    var type = message.type,
        channel = slack.getChannelGroupOrDMByID(message.channel),
        user = slack.getUserByID(message.user),
        time = message.ts,
        text = message.text,
        response = '';
    console.log('Received: %s %s @%s %s "%s"', type, (channel.is_channel ? '#' : '') + channel.name, user.name, time, text);
    console.log(message.channel);
    // Respond to messages with the reverse of the text received.
    if (type === 'message') {
        response = text.split('').reverse().join('');
        //channel.send(response);
        channel.send('So does this one: <http://www.foo.com|www.foo.com>');
        console.log('@%s responded with "%s"', slack.self.name, response);
    }
};
