#!/usr/bin/env bash

if [[ -f /etc/monit/conf.d/harold-bot.conf ]]; then
    monit stop harold-bot
fi
