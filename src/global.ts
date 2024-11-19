import { config } from 'dotenv';
config();

import { resolve } from 'path';
import { readFileSync, existsSync } from 'fs';

import { LoggerBuilder, Logger } from './logger';
import { DataSourceOptionsBuilder } from './orm';

declare global {
    var loggerBuilder: LoggerBuilder;
    var logger: Logger;
    var packageJson: any;
    var ormBuilder: DataSourceOptionsBuilder;
}

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