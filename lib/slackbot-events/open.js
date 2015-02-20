module.exports = function(slack) {
    var channels = [],
        groups = [],
        unreads = slack.getUnreadCount(),
        key;

    for (key in slack.channels) {
        if (slack.channels[key].is_member) {
            channels.push('#' + slack.channels[key].name);
        }
    }

    for (key in slack.groups) {
        if (slack.groups[key].is_open && !slack.groups[key].is_archived) {
            groups.push(slack.groups[key].name);
        }
    }

    console.log('Welcome to Slack. You are @%s of %s', slack.self.name, slack.team.name);
    console.log('You are in: %s', channels.join(', '));
    console.log('As well as: %s', groups.join(', '));
    console.log('You have %s unread ' + (unreads === 1 ? 'message' : 'messages'), unreads);
};
