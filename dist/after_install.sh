#!/usr/bin/env bash

chown -R harold-bot:harold-bot /opt/harold-bot/*
service nginx restart
