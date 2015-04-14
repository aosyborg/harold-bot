var config = {
    //token: process.env.SLACK_TOKEN || '',
    token: 'xoxb-3766806459-mWtiVLi0QwdO0rpdVvQqGH4n',
    auto_reconnect: process.env.SLACK_AUTORECONNECT || true,
    auto_mark: process.env.SLACK_AUTOMARK || true,
    gitlab_project_channels: {
        'namespace/repo': 'general'
    }
};

// Parse the json string if present
if (process.env.GITLAB_PROJECT_CHANNELS) {
    config.gitlab_project_channels = JSON.parse(process.env.GITLAB_PROJECT_CHANNELS);
}

module.exports = config;
