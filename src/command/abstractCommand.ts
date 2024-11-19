import { Command } from 'commander';
import { Logger } from 'winston';
import { Common } from './common';
import { ICliConfig } from '../cliConfig';

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
        this.logger.silly(`executing ${this.constructor.name}...`);
        try {
            await this.run(...args);
        }
        catch (err: any) {
            this.logger.error(err.message);
        }
        const endTime = new Date();
        this.logger.silly(`executing ${this.constructor.name} completed`);
        this.logger.info(`Execution duration: ${endTime.getTime() - startTime.getTime()} ms`);
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
        let cmd = new ctor(...args);
        this.logger.debug(`sub command ${ctor.constructor.name} is created`);
        return cmd;
    }

    public help(): void {
        this.command.help();
    }

    public initConfig<T extends ICliConfig>(config: T): void {
        if (this.isConfigInitialized) {
            throw new Error(`Command is already initialized. Run with --force to reinitialize`);
        }
        config.name = this.rootCommand.name();
        config.version = this.rootCommand.version();
        let path = this.configFilePath;
        this.writeJson(path, config);
        this.logger.debug(`config file is initialized at ${path}`);
    }
    public updateConfig<T extends ICliConfig>(config: T): void {
        let updateConfig = { ...this.config(), ...config };
        this.writeJson(this.configFilePath, updateConfig);
        this.logger.debug(`config file is updated at ${this.configFilePath}`);
    }

    public get isConfigInitialized(): boolean {
        return this.exists(this.configFilePath);
    }

    public config<T extends ICliConfig>(): T {
        let path = this.configFilePath;
        if (!this.exists(path)) {
            throw new Error(`It is not initialized. Run init command first`);
        }
        this.logger.debug(`config file is read from ${path}`);
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
                .level(logLevel)
                .build();
            this._logger.silly(`logger is initialized in ${logLevel} mode`);
        }
        return this._logger;
    }
}