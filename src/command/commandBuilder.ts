import { Command } from 'commander';
import { AbstractCommand } from './abstractCommand';

export class CommandBuilder {
    private _name: string = 'do';
    private _description: string = 'A CLI application framework';
    private _version: string = '1.0.0';
    private _subCommands: (new (...args: any[]) => AbstractCommand)[] = [];

    public static new(): CommandBuilder {
        return new CommandBuilder();
    }

    public name(name: string): this {
        this._name = name;
        return this;
    }

    public description(description: string): this {
        this._description = description;
        return this;
    }

    public version(version: string): this {
        this._version = version;
        return this;
    }

    public subCommands(...ctors: (new (...args: any[]) => AbstractCommand)[]): this {
        this._subCommands = ctors;
        return this;
    }

    public build(): Command {
        let command = new Command()
            .name(this._name)
            .description(this._description)
            .version(this._version)
            .option('-v, --verbose', 'enable verbose mode');
        this._subCommands.forEach(ctor => new ctor(command));
        return command;
    }
}