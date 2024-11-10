#!/usr/bin/env ts-node

import { CommandBuilder } from './core';

CommandBuilder.new()
    .setName("do")
    .setDescription("A CLI application framework")
    .setVersion("1.0.0")
    .build()
    .parse(process.argv);