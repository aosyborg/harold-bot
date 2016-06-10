var commands = {
    '/rules': command_rules
};

module.exports.parse = function (params) {
    command = commands[params.command] || null;

    if (!command) {
        return;
    }

    return command();
};

function command_rules () {
    return 'The first rule of #outofcontext is we do not talk in #outofcontext!'
}
