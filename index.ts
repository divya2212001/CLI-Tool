#!/usr/bin/env node

import chalk from 'chalk';
import { Command } from 'commander';


import { CalculatorCommands } from './src/CalculatorCommands';
import { StringCommands } from './src/StringCommands';
import { FileCommands } from './src/FileCommands';
import { GitHubService } from './src/GitHubService';
import { WeatherService } from './src/WeatherService';
import { QuoteService } from './src/QuoteService';
import { GreeterCommands } from './src/GreeterCommands';


const calculator = new CalculatorCommands();
const stringOps = new StringCommands();
const fileOps = new FileCommands();
const github = new GitHubService();
const weather = new WeatherService();
const quote = new QuoteService();
const greeter = new GreeterCommands();


const program = new Command();

program
    .name('mycli')
    .description(chalk.blue('SESD Workshop 2 - A comprehensive CLI tool with OOP concepts'))
    .version('1.0.0');


program
    .command('greet <name>')
    .description('Greet a user by name')
    .action((name: string) => {
        greeter.greet(name);
    });

program
    .command('greet-time <name>')
    .description('Greet a user with time-based message')
    .action((name: string) => {
        greeter.greetWithTime(name);
    });

program
    .command('greet-list')
    .description('Show list of greeted users')
    .action(() => {
        greeter.showGreetedUsers();
    });


program
    .command('add <num1> <num2>')
    .description('Add two numbers')
    .action((num1: string, num2: string) => {
        calculator.add(Number(num1), Number(num2));
    });

program
    .command('subtract <num1> <num2>')
    .description('Subtract two numbers')
    .action((num1: string, num2: string) => {
        calculator.subtract(Number(num1), Number(num2));
    });

program
    .command('multiply <num1> <num2>')
    .description('Multiply two numbers')
    .action((num1: string, num2: string) => {
        calculator.multiply(Number(num1), Number(num2));
    });

program
    .command('divide <num1> <num2>')
    .description('Divide two numbers')
    .action((num1: string, num2: string) => {
        calculator.divide(Number(num1), Number(num2));
    });

program
    .command('modulo <num1> <num2>')
    .description('Modulo operation')
    .action((num1: string, num2: string) => {
        calculator.modulo(Number(num1), Number(num2));
    });

program
    .command('power <base> <exponent>')
    .description('Power operation (base^exponent)')
    .action((base: string, exponent: string) => {
        calculator.power(Number(base), Number(exponent));
    });

program
    .command('sqrt <num>')
    .description('Square root of a number')
    .action((num: string) => {
        calculator.sqrt(Number(num));
    });

program
    .command('calc-history')
    .description('Show calculation history')
    .action(() => {
        calculator.showHistory();
    });


program
    .command('uppercase <text>')
    .description('Convert text to uppercase')
    .action((text: string) => {
        stringOps.uppercase(text);
    });

program
    .command('lowercase <text>')
    .description('Convert text to lowercase')
    .action((text: string) => {
        stringOps.lowercase(text);
    });

program
    .command('reverse <text>')
    .description('Reverse a string')
    .action((text: string) => {
        stringOps.reverse(text);
    });

program
    .command('charcount <text>')
    .description('Count characters in text')
    .action((text: string) => {
        stringOps.charCount(text);
    });

program
    .command('wordcount <text>')
    .description('Count words in text')
    .action((text: string) => {
        stringOps.wordCount(text);
    });

program
    .command('palindrome <text>')
    .description('Check if text is a palindrome')
    .action((text: string) => {
        stringOps.palindrome(text);
    });



program
    .command('fileinfo <filename>')
    .description('Get information about a file')
    .action((filename: string) => {
        fileOps.fileInfo(filename);
    });

program
    .command('listfiles <directory>')
    .description('List files in a directory')
    .action((directory: string) => {
        fileOps.listFiles(directory);
    });

program
    .command('exists <path>')
    .description('Check if a file or directory exists')
    .action((path: string) => {
        fileOps.exists(path);
    });



program
    .command('github <username>')
    .description('Get GitHub user information')
    .action(async (username: string) => {
        await github.getUserInfo(username);
    });

program
    .command('github-repos <username> [limit]')
    .description('Get GitHub user repositories')
    .action(async (username: string, limit?: string) => {
        await github.getUserRepos(username, limit ? parseInt(limit) : 5);
    });

program
    .command('weather <city>')
    .description('Get weather information for a city')
    .action(async (city: string) => {
        await weather.getWeather(city);
    });

program
    .command('forecast <city> [days]')
    .description('Get weather forecast for a city')
    .action(async (city: string, days?: string) => {
        await weather.getForecast(city, days ? parseInt(days) : 3);
    });



program
    .command('quote')
    .description('Get a random inspirational quote')
    .action(async () => {
        await quote.getRandomQuote();
    });

program
    .command('quote-today')
    .description('Get quote of the day')
    .action(async () => {
        await quote.getQuoteOfTheDay();
    });

program
    .command('quotes [count]')
    .description('Get multiple random quotes')
    .action(async (count?: string) => {
        await quote.getMultipleQuotes(count ? parseInt(count) : 5);
    });


program
    .command('help-all')
    .description('Show all available commands')
    .action(() => {
        console.log(chalk.bold('       MYCLI - Available Commands        '));

        console.log(chalk.cyan('GREET Commands:'));
        console.log('  greet <name>              - Greet a user');
        console.log('  greet-time <name>         - Greet with time');
        console.log('  greet-list                - Show greeted users\n');

        console.log(chalk.cyan('CALCULATOR Commands:'));
        console.log('  add <n1> <n2>             - Addition');
        console.log('  subtract <n1> <n2>        - Subtraction');
        console.log('  multiply <n1> <n2>        - Multiplication');
        console.log('  divide <n1> <n2>          - Division');
        console.log('  modulo <n1> <n2>          - Modulo');
        console.log('  power <base> <exp>        - Power');
        console.log('  sqrt <num>                - Square root');
        console.log('  calc-history              - Show history\n');

        console.log(chalk.cyan('STRING Commands:'));
        console.log('  uppercase <text>          - To uppercase');
        console.log('  lowercase <text>          - To lowercase');
        console.log('  reverse <text>            - Reverse string');
        console.log('  charcount <text>          - Character count');
        console.log('  wordcount <text>          - Word count');
        console.log('  palindrome <text>         - Check palindrome\n');

        console.log(chalk.cyan('FILE Commands:'));
        console.log('  fileinfo <filename>        - File information');
        console.log('  listfiles <dir>           - List directory');
        console.log('  exists <path>             - Check existence\n');

        console.log(chalk.cyan('GITHUB Commands (API):'));
        console.log('  github <username>          - User info');
        console.log('  github-repos <user> [n]   - User repos\n');

        console.log(chalk.cyan('WEATHER Commands (API):'));
        console.log('  weather <city>            - Current weather');
        console.log('  forecast <city> [days]    - Forecast\n');

        console.log(chalk.cyan('QUOTE Commands (API):'));
        console.log('  quote                     - Random quote');
        console.log('  quote-today               - Quote of day');
        console.log('  quotes [count]            - Multiple quotes\n');

       
    });

// Parse the arguments
program.parse();

