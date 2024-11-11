#!/usr/bin/env node

import { CommandBuilder } from './commandBuilder';
import { LoggerBuilder } from './loggerBuilder';
import winston from 'winston';

global.loggerBuilder = LoggerBuilder.new()
    .addTransport(
        new winston.transports.Console({
            format: LoggerBuilder.consoleFormat()
        }),
        new winston.transports.File({
            filename: 'logs/cli.log',
            level: 'info',
            format: LoggerBuilder.fileFormat()
        })
    )
    .setLevel('debug')
    .setColors({
        fatal: 'red',
        error: 'red',
        warn: 'yellow',
        info: 'green',
        debug: 'blue',
        trace: 'magenta'
    });

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