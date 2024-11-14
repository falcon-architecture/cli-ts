import { config } from 'dotenv';
config();

import winston from 'winston';
import { resolve } from 'path';
import { readFileSync, existsSync } from 'fs';
import { EntityManager } from 'typeorm';

import { LoggerBuilder } from './loggerBuilder';
import { OrmBuilder } from './typeorm/ormBuilder';

declare global {
    var loggerBuilder: LoggerBuilder;
    var packageJson: any;
    var ormBuilder: OrmBuilder;
}

global.loggerBuilder = LoggerBuilder.new()
    .colors({
        fatal: 'red',
        error: 'red',
        warn: 'yellow',
        info: 'green',
        debug: 'blue',
        trace: 'magenta'
    });

global.ormBuilder = OrmBuilder.new();

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