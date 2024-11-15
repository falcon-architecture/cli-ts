#!/usr/bin/env node

import { CommandBuilder } from './';

CommandBuilder.new()
    .name(global.packageJson.name)
    .description("A CLI application framework")
    .version(global.packageJson.version)
    .build()
    .action(() => {
        let logger = global.loggerBuilder.build();
        logger.info('Success!');
    })
    .parse(process.argv);