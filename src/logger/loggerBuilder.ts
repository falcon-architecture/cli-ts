import winston, { createLogger, format, Logform, Logger } from 'winston';
import * as TransportStream from 'winston-transport';
const { combine, timestamp, printf, colorize } = format;

export class LoggerBuilder {
    private _transports: TransportStream[] = [
        new winston.transports.Console({
            format: LoggerBuilder.consoleFormat()
        }),
        new winston.transports.File({
            filename: 'logs/cli.log',
            level: 'trace',
            format: LoggerBuilder.fileFormat()
        })
    ];
    private _level: 'fatal' | 'error' | 'warn' | 'info' | 'debug' | 'trace' = 'info';

    public static new(): LoggerBuilder {
        return new LoggerBuilder();
    }

    public static consoleFormat(dateFormat: string = 'YYYY-MM-DD HH:mm:ss'): Logform.Format {
        return combine(
            colorize(),
            timestamp({ format: dateFormat }),
            LoggerBuilder.logFormat
        );
    }

    public static fileFormat(dateFormat: string = 'YYYY-MM-DD HH:mm:ss'): Logform.Format {
        return combine(
            timestamp({ format: dateFormat }),
            LoggerBuilder.logFormat
        );
    }
    private static readonly logFormat = printf(({ level, message, timestamp }) => {
        return `${timestamp} [${level}]: ${message}`;
    });

    public transport(...transport: TransportStream[]): this {
        this._transports = transport;
        return this;
    }
    public clearTransport(): this {
        this._transports = [];
        return this;
    }

    public level(level: 'fatal' | 'error' | 'warn' | 'info' | 'debug' | 'trace'): this {
        this._level = level;
        return this;
    }

    public colors(colors: { [key: string]: string }): this {
        winston.addColors(colors);
        return this;
    }

    public build(): Logger {
        const logger = createLogger({
            level: this._level,
            transports: this._transports
        });
        return logger;
    }
}