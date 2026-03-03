# SESD Workshop 2 - CLI Tool

A comprehensive CLI tool built with Node.js, TypeScript, and Object-Oriented Programming concepts.

## Features

- **28 Custom Commands** - Full-featured command-line interface
- **OOP Architecture** - Built using classes, inheritance, and object creation
- **3 API Integrations** - GitHub, Weather, and Quote APIs
- **Multiple Operations** - Calculator, String manipulation, File operations

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn

## Setup Instructions

### 1. Clone/Extract the Project

```bash
cd SESD-Workshop-2
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Build the Project

```bash
npm install -D typescript ts-node nodemon @types/node
npx tsc --init
```

### 4. Link the CLI Tool

```bash
npm link
```

### 5. Run the CLI

```bash
mycli --help
```

## Available Commands

### Greet Commands

| Command | Description | Example |
|---------|-------------|---------|
| greet <name> | Greet a user by name | mycli greet John |
| greet-time <name> | Greet with time-based message | mycli greet-time John |
| greet-list | Show list of greeted users | mycli greet-list |

### Calculator Commands

| Command | Description | Example |
|---------|-------------|---------|
| add <num1> <num2> | Add two numbers | mycli add 10 5 |
| subtract <num1> <num2> | Subtract two numbers | mycli subtract 10 5 |
| multiply <num1> <num2> | Multiply two numbers | mycli multiply 4 7 |
| divide <num1> <num2> | Divide two numbers | mycli divide 10 2 |
| modulo <num1> <num2> | Modulo operation | mycli modulo 10 3 |
| power <base> <exponent> | Power operation | mycli power 2 8 |
| sqrt <num> | Square root | mycli sqrt 16 |
| calc-history | Show calculation history | mycli calc-history |

### String Commands

| Command | Description | Example |
|---------|-------------|---------|
| uppercase <text> | Convert to uppercase | mycli uppercase "hello" |
| lowercase <text> | Convert to lowercase | mycli lowercase "HELLO" |
| reverse <text> | Reverse a string | mycli reverse "hello" |
| charcount <text> | Count characters | mycli charcount "hello" |
| wordcount <text> | Count words | mycli wordcount "hello world" |
| palindrome <text> | Check palindrome | mycli palindrome "radar" |

### File Commands

| Command | Description | Example |
|---------|-------------|---------|
| fileinfo <filename> | Get file information | mycli fileinfo package.json |
| listfiles <directory> | List directory contents | mycli listfiles . |
| exists <path> | Check if path exists | mycli exists ./src |

### GitHub Commands (API)

| Command | Description | Example |
|---------|-------------|---------|
| github <username> | Get GitHub user info | mycli github octocat |
| github-repos <username> [limit] | Get user repositories | mycli github-repos octocat 5 |

### Weather Commands (API)

| Command | Description | Example |
|---------|-------------|---------|
| weather <city> | Get current weather | mycli weather "London" |
| forecast <city> [days] | Get weather forecast | mycli forecast "London" 3 |

### Quote Commands (API)

| Command | Description | Example |
|---------|-------------|---------|
| quote | Get random quote | mycli quote |
| quote-today | Get quote of the day | mycli quote-today |
| quotes [count] | Get multiple quotes | mycli quotes 3 |

### Utility Commands

| Command | Description |
|---------|-------------|
| help-all | Show all available commands |

## Example Usage

### Basic Math Operations

```bash
$ mycli add 25 17
25 + 17 = 42

$ mycli multiply 6 7
6 x 7 = 42

$ mycli power 2 10
2 ^ 10 = 1024
```

### String Manipulation

```bash
$ mycli uppercase "hello world"
HELLO WORLD

$ mycli reverse "programming"
gnimmargorp

$ mycli palindrome "racecar"
"racecar" is a palindrome!
```

### File Operations

```bash
$ mycli fileinfo package.json
File Information:
File Name: package.json
Size: 651 Bytes
```

### API Integration Examples

```bash
$ mycli github octocat
GitHub User Profile:
Username: octocat
Name: The Octocat
Public Repos: 8
Followers: 21957

$ mycli quote
Daily Inspiration:
"A creative man is motivated by the desire to achieve..."
  - Ayn Rand
```

## Project Structure

```
SESD-Workshop-2/
├── src/
│   ├── BaseCommand.ts       # Abstract base class
│   ├── CalculatorCommands.ts
│   ├── StringCommands.ts
│   ├── FileCommands.ts
│   ├── GitHubService.ts    # GitHub API
│   ├── WeatherService.ts   # Weather API
│   ├── QuoteService.ts     # Quote API
│   └── GreeterCommands.ts
├── index.ts                # Main CLI entry point
├── dist/                   # Compiled JavaScript
├── package.json
├── tsconfig.json
└── README.md
```

## OOP Concepts Used

- Classes: All commands are implemented as classes
- Inheritance: All command classes extend BaseCommand
- Encapsulation: Private methods and properties
- Objects: Multiple command objects instantiated in main
- Abstract Methods: BaseCommand defines abstract execute()

## API Integrations

1. GitHub API - https://api.github.com/users/{username}
2. Weather API (wttr.in) - https://wttr.in/{city}?format=j1
3. Quote API (ZenQuotes) - https://zenquotes.io/api/random


