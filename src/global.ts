import { config } from 'dotenv';
config();
import { LoggerBuilder } from './loggerBuilder';
import winston from 'winston';
import { resolve } from 'path';
import { readFileSync, existsSync } from 'fs';

declare global {
    var loggerBuilder: LoggerBuilder;
    var packageJson: any;
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

var getParentDir = (dir?: string): string => resolve(dir ?? __dirname, '..');
var findPackageJsonPath = (): string => {
    const packageFileName = 'package.json';
    let dir = getParentDir();
    let path = resolve(dir, packageFileName);
    while (!existsSync(path)) {
        dir = getParentDir(dir);
        path = resolve(dir, packageFileName);
    }
    return path;
};
var getPackageJson = (path: string): any => JSON.parse(readFileSync(path).toString());
global.packageJson = getPackageJson(findPackageJsonPath());