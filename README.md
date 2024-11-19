# Falcon Command Line Interface

1. Commands with parameter documentation
2. Prompts
3. Logger
4. Http Request Handling
5. File Read/Write
6. Read Env variables
7. SQLite integration using TypeOrm
8. Handlebar template process
9. Run cmd using `execa`

## 1.1 cli.ts file Usage

```typescript

#!/usr/bin/env node

import { CommandBuilder } from './commandBuilder';
import { LoggerBuilder } from './loggerBuilder';
import winston from 'winston';

global.loggerBuilder = LoggerBuilder.new()
    .addTransport(
        new winston.transports.Console({
            format: LoggerBuilder.consoleFormat()
        }),
        new winston.transports.File({
            filename: 'logs/cli.log',
            level: 'info',
            format: LoggerBuilder.fileFormat()
        })
    )
    .setLevel('debug')
    .setColors({
        fatal: 'red',
        error: 'red',
        warn: 'yellow',
        info: 'green',
        debug: 'blue',
        trace: 'magenta'
    });

CommandBuilder.new()
    .setName("do")
    .setDescription("A CLI application framework")
    .setVersion("1.0.0")
    .build()
    .action(() => {
        let logger = global.loggerBuilder.build();
        logger.info('Success info!');
    })
    .parse(process.argv);

```

## 1.2 Export your commands

```typescript

export const commands = [
    Init,
    Checkout,
];

```