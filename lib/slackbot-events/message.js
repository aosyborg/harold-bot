var harold_facts = require('./harold-facts');

module.exports = function(slack, message) {
    var type = message.type,
        channel = slack.getChannelGroupOrDMByID(message.channel),
        harold_bot_id = message._client.self.id
        is_talking_to_harold_bot = message.text.indexOf('<@' + harold_bot_id + '>') === 0,
        response = '';

    // Not talking to harold bot
    if (type !== 'message' || !is_talking_to_harold_bot) {
        return;
    }

    // Asking for facts
    if (/fact/.test(message.text)) {
        return channel.send(get_harold_fact());
    }

    //channel.send('Are you talking to me?');
};

function get_harold_fact() {
    var fact = Math.floor(Math.random() * harold_facts.length);
    console.log(fact);
    return harold_facts[fact];
}
