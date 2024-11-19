import { LoggerBuilder } from './loggerBuilder';
global.loggerBuilder = LoggerBuilder.new()
    .colors({
        fatal: 'red',
        error: 'red',
        warn: 'yellow',
        info: 'green',
        debug: 'blue',
        trace: 'magenta'
    });
export * from './loggerBuilder';
export { Logger } from 'winston';
