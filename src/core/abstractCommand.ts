import { Command } from 'commander';
import { Common } from './common';

export abstract class AbstractCommand extends Common {
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
}