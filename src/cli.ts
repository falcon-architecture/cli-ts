#!/usr/bin/env node

import { CommandBuilder } from './commandBuilder';

CommandBuilder.new()
    .setName("do")
    .setDescription("A CLI application framework")
    .setVersion("1.0.0")
    .build()
    .action(() => {
        let logger = global.loggerBuilder.build();
        logger.info('Success!');
    })
    .parse(process.argv);