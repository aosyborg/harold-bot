#!/usr/bin/env bash

getent passwd "harold-bot" > /dev/null || useradd -rU "harold-bot"
chown -R harold-bot:harold-bot /opt/harold-bot/*
service nginx restart
service rsyslog restart

AWSLOGS_CONFIG_FILE="/var/awslogs/etc/awslogs.conf"
if [[ -f ${AWSLOGS_CONFIG_FILE} && !($(cat $AWSLOGS_CONFIG_FILE) =~ haroldbot) ]]; then
    >&2 echo "
[/var/log/haroldbot.log]
datetime_format = %b %d %H:%M:%S
file = /var/log/haroldbot.log
buffer_duration = 5000
log_stream_name = {hostname}
initial_position = end_of_file
log_group_name = /var/log/haroldbot.log
        " >> ${AWSLOGS_CONFIG_FILE}

    service awslogs restart
fi
