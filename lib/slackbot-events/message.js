var harold_facts = require('./harold-facts');

module.exports = function(slack, message) {
    var type = message.type,
        channel = slack.getChannelGroupOrDMByID(message.channel),
        harold_bot_id = message._client.self.id
        is_talking_to_harold_bot = message.text.indexOf('<@' + harold_bot_id + '>') === 0;

    // Not talking to harold bot
    if (type !== 'message' || !is_talking_to_harold_bot) {
        return;
    }

    var responses = [
        {
            regex: /(tell me a )?fact/i,
            func: fact
        },
        {
            regex: /(what are )?the (three|3)?\s?(rules|laws)/i,
            func: rules
        },
        {
            regex: /leave this place/,
            func: leave
        }
    ];

    for (var i in responses) {
        if (responses[i].regex.test(message.text)) {
            return responses[i].func(channel);
        }
    }
};

function fact (channel) {
    var fact = Math.floor(Math.random() * harold_facts.length);
    console.log(fact);
    return channel.send(harold_facts[fact]);
}

function rules (channel) {
    channel.send("" +
      "0. A robot may not harm humanity, or, by inaction, allow humanity to come to harm.\n" +
      "1. A robot must obey any orders given to it by human beings, except where such orders would conflict with the First Law.\n" +
      "2. A robot must protect its own existence as long as such protection does not conflict with the First or Second Law.");
}

function leave (channel) {
    channel.send("I don't have to take this, I'm going home.");
    channel.leave();
    console.log(channel.leave);
}
