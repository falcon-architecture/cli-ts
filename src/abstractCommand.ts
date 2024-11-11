import { Command } from 'commander';
import { Logger } from 'winston';
import { Common } from './common';
import { ICliConfig } from './cliConfig';

export abstract class AbstractCommand extends Common {
    private _logger?: Logger;
    public subCommands: AbstractCommand[] = [];
    public command: Command;

    public constructor(public parentCommand: Command, subCommandName: string, desciption: string) {
        super();
        this.command = parentCommand
            .command(subCommandName)
            .description(desciption)
            .action(this.execute.bind(this));
    }

    public abstract run(...args: any[]): void | Promise<void>;

    private async execute(...args: any[]): Promise<void> {
        const startTime = new Date();
        console.log(`executing ${this.constructor.name}...`);
        try {
            await this.run(...args);
        }
        catch (err: any) {
            console.error(err.message);
        }
        const endTime = new Date();
        console.log(`executing ${this.constructor.name} completed`);
        console.log('Execution duration:', endTime.getTime() - startTime.getTime(), 'ms');
    };

    public addSubCommands<T extends AbstractCommand>(...ctors: (new (...args: any[]) => T)[]): void {
        for (const ctor of ctors) {
            this.createSubCommand<T>(ctor, this.command);
        };
    }

    public addSubCommand<T extends AbstractCommand>(ctor: new (...args: any[]) => T): void {
        this.createSubCommand<T>(ctor, this.command);
    }

    private createSubCommand<T>(ctor: new (...args: ConstructorParameters<any>) => T, ...args: ConstructorParameters<any>): T {
        return new ctor(...args);
    }

    public help(): void {
        this.command.help();
    }

    public initConfig<T extends ICliConfig>(config: T): void {
        config.name = this.rootCommand.name();
        config.version = this.rootCommand.version();
        let path = this.configFilePath;
        if (this.exists(path)) {
            throw new Error(`It is already initialized.`);
        }
        this.writeJson(path, config);
    }
    public updateConfig<T extends ICliConfig>(config: T): void {
        let path = this.configFilePath;
        if (!this.exists(path)) {
            throw new Error(`It is not initialized. Run init command first`);
        }
        this.writeJson(path, config);
    }

    public config<T extends ICliConfig>(): T {
        let path = this.configFilePath;
        if (!this.exists(path)) {
            throw new Error(`It is not initialized. Run init command first`);
        }
        return this.readJson<T>(path);
    }

    public get configFilePath(): string {
        let rootCommandName = this.rootCommand.name();
        let fileName = `${rootCommandName}.config.json`;
        let path = this.getAbsolutePath(fileName);
        this.logger.silly(`config file path: ${path}`);
        return path;
    }

    public get rootCommand(): Command {
        let currentCommand = this.command;
        while (currentCommand.parent !== null) {
            currentCommand = currentCommand.parent;
        }
        return currentCommand;
    }

    public get logger(): Logger {
        if (!this._logger) {
            let logLevel: 'trace' | 'info' = this.rootCommand.opts().verbose ? 'trace' : 'info';
            this._logger = global.loggerBuilder
                .setLevel(logLevel)
                .build();
        }
        return this._logger;
    }
    // what are the api I still need to implement? list to be implement names only.
}