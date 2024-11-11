import { config } from 'dotenv';
config();

import { LoggerBuilder } from './loggerBuilder';
import winston from 'winston';

declare global {
    var loggerBuilder: LoggerBuilder;
}

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

export { ICliConfig } from './cliConfig';
export { AbstractCommand } from './abstractCommand';
export { CommandBuilder } from './commandBuilder';
export { LoggerBuilder } from './loggerBuilder';
export { Common } from './common';
