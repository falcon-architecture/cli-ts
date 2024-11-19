import { DataSourceOptionsBuilder } from './dataSourceOptionsBuilder';

global.ormBuilder = DataSourceOptionsBuilder.new();

export * from "typeorm";
export * from "reflect-metadata";
export * from './dataSourceOptionsBuilder';