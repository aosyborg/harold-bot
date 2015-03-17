#!/usr/bin/env bash

getent passwd "harold-bot" > /dev/null || useradd -rU "harold-bot"
chown -R harold-bot:harold-bot /opt/harold-bot/*
service nginx restart
