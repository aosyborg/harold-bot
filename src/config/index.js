module.exports = {
    token: process.env.SLACK_TOKEN || '',
    autoReconnect: process.env.SLACK_AUTORECONNECT || true,
    autoMark: process.env.SLACK_AUTOMARK || true,
};
