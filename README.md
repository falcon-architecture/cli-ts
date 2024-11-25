# Falcon Comman Line Interface Tool

## Description
The CLI Utility Tool is a powerful and versatile command-line interface designed to streamline multiple tasks for developers out of the box. It utilizes a suite of popular npm packages to provide a comprehensive toolkit for efficient development workflows.

## Features
- **Command Management with Commander**: Efficiently manage and execute command-line operations.
- **User Interaction with Inquirer**: Generate dynamic and user-friendly prompts to gather input.
- **Logging with Winston**: Provide comprehensive logging capabilities for tracking and debugging.
- **HTTP Requests using Axios**: Seamlessly handle HTTP requests and responses.
- **Environment Configuration with Dotenv**: Easily read and manage environment variables.
- **Database Connectivity with TypeORM**: Integrate SQLite database for data management.
- **Template Rendering with Handlebars**: Render and compile templates for dynamic content generation.
- **Shell Command Execution with ShellJS**: Execute shell commands within your scripts, enhancing automation.
- **File Handling**: Perform file read and write operations for data manipulation and storage.
- **Reports Printing**:  Prints reports in a table format in the console.
## Installation

To install the CLI Utility Tool, use the following command:

```bash
npm install @falcon.io/cli -s
```

## Usage
After installation, you can start using the CLI Utility Tool by running the following command:

```typescript

#!/usr/bin/env node

import { CommandBuilder } from './commandBuilder';
import { LoggerBuilder } from './loggerBuilder';
import winston from 'winston';

global.loggerBuilder = LoggerBuilder.new()
    .transport(
        new winston.transports.Console({
            format: LoggerBuilder.consoleFormat()
        }),
        new winston.transports.File({
            filename: 'logs/cli.log',
            level: 'info',
            format: LoggerBuilder.fileFormat()
        })
    )
    .level('debug')
    .colors({
        fatal: 'red',
        error: 'red',
        warn: 'yellow',
        info: 'green',
        debug: 'blue',
        trace: 'magenta'
    });

CommandBuilder.new()
    .name("do")
    .description("A CLI application framework")
    .version("1.0.0")
    .build()
    .action(() => {
        let logger = global.loggerBuilder.build();
        logger.info('Success info!');
    })
    .parse(process.argv);

```
This tool will help you with various tasks, including executing commands, prompting for user input, logging, making HTTP requests, accessing environment variables, managing SQLite databases, processing templates, running shell commands, and handling files.

Here's a brief overview of how to use each feature:

## Command Management

your-cli-command <your-command> [options]

## Interactive Prompts
The tool will automatically prompt you for necessary information using inquirer.

## Logging
Logs are managed by Winston and will be output to the console or a specified log file.

## HTTP Requests
Make HTTP requests using Axios within the commands.

## Environment Variables
Read and manage environment variables using Dotenv.

## Database Integration
Connect to an SQLite database and perform CRUD operations using TypeORM.

## Template Rendering
Process and compile templates using Handlebars.

## Shell Command Execution
Run shell commands using ShellJS.

## File Handling
Read and write files for various purposes.

## Examples

## Contributing
Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.

## License
This project is licensed under the MIT License. See the LICENSE file for details.


Replace `your-cli-command` with the actual name of your CLI tool. This should provide a comprehensive guide for users to understand and utilize your CLI command package effectively.