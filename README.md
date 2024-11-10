# Falcon Command Line Interface

1. Commands
2. Prompts
3. Logger
4. Http Request Handling
5. File Read/Write
6. Read Env variables

## 1.1 Usage

```typescript
#!/usr/bin/env ts-node

import { CommandBuilder } from '@cli/core';
import { commands } from './commands'; // Ref: 1.2

CommandBuilder.new()
    .setName("do")
    .setDescription("A CLI application for poly repo management")
    .setVersion("1.0.0")
    .addSubCommands(...commands)
    .build()
    .parse(process.argv);
```

## 1.2 Export your commands

```typescript

export const commands = [
    Init,
    Checkout,
];

```