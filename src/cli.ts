#!/usr/bin/env node

import { CommandBuilder } from './';

CommandBuilder.new()
    .setName(global.packageJson.name)
    .setDescription("A CLI application framework")
    .setVersion(global.packageJson.version)
    .build()
    .action(() => {
        let logger = global.loggerBuilder.build();
        logger.info('Success!');
    })
    .parse(process.argv);