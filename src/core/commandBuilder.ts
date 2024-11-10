import { Command } from 'commander';
import { AbstractCommand } from './abstractCommand';

export class CommandBuilder {
    private name: string = 'do';
    private description: string = 'A CLI application framework';
    private version: string = '1.0.0';
    private subCommands: (new (...args: any[]) => AbstractCommand)[] = [];

    public static new(): CommandBuilder {
        return new CommandBuilder();
    }

    public setName(name: string): this {
        this.name = name;
        return this;
    }

    public setDescription(description: string): this {
        this.description = description;
        return this;
    }

    public setVersion(version: string): this {
        this.version = version;
        return this;
    }

    public addSubCommands(...ctors: (new (...args: any[]) => AbstractCommand)[]): this {
        this.subCommands = ctors;
        return this;
    }

    public build(): Command {
        let command = new Command()
            .name(this.name)
            .description(this.description)
            .version(this.version)
            .option('-v, --verbose', 'enable verbose logging');
        this.subCommands.forEach(ctor => new ctor(command));
        return command;
    }
}