#!/usr/bin/env bash

if [ -f /etc/monit/config.d/harold-bot.conf ]; then
    monit stop harold-bot
fi
