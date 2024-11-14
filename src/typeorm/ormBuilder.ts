import { DataSourceOptions, DatabaseType } from "typeorm"

export class OrmBuilder {
    private _type: DatabaseType = "sqlite";
    private _database: string = `config.sqlite`;
    private _synchronize: boolean = true;
    private _logging: boolean = true;
    private _entities: string[] = [__dirname + "../../../**/*.entity.ts"];
    private _migrations: string[] = [__dirname + "../../../**/*.migration.ts"];
    private _subscribers: string[] = [__dirname + "../../../**/*.subscriber.ts"];

    public static new(): OrmBuilder {
        return new OrmBuilder();
    }

    public type(type: DatabaseType): this {
        this._type = type;
        return this;
    }

    public database(database: string): this {
        this._database = database;
        return this;
    }

    public synchronize(synchronize: boolean): this {
        this._synchronize = synchronize;
        return this;
    }

    public logging(logging: boolean): this {
        this._logging = logging;
        return this;
    }

    public entities(...entities: string[]): this {
        this._entities = entities;
        return this;
    }

    public migrations(...migrations: string[]): this {
        this._migrations = migrations;
        return this;
    }

    public subscribers(...subscribers: string[]): this {
        this._subscribers = subscribers;
        return this;
    }

    public build(): DataSourceOptions {
        const config: DataSourceOptions = {
            type: this._type as any,
            database: this._database,
            synchronize: this._synchronize,
            logging: this._logging,
            entities: this._entities,
            migrations: this._migrations,
            subscribers: this._subscribers
        };
        return config;
    }
}