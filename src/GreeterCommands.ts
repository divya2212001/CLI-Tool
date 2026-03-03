import chalk from 'chalk';
import { BaseCommand } from './BaseCommand';

export class GreeterCommands extends BaseCommand {
    private greetedUsers: string[];

    constructor() {
        super('greeter', 'Greet users');
        this.greetedUsers = [];
    }

    greet(name: string): void {
        if (!name) {
            this.printError('Please provide a name');
            return;
        }

        this.greetedUsers.push(name);

        console.log(chalk.blue('\n Hello there!'));
        console.log(chalk.green(chalk.bold(`Welcome, ${name}!`)));
        console.log(chalk.gray('-'.repeat(40)));
        this.printInfo('Great to have you here!');
    }

    greetWithTime(name: string): void {
        if (!name) {
            this.printError('Please provide a name');
            return;
        }

        const hour = new Date().getHours();
        let greeting: string;

        if (hour < 12) {
            greeting = 'Good morning';
        } else if (hour < 18) {
            greeting = 'Good afternoon';
        } else {
            greeting = 'Good evening';
        }

        console.log(chalk.blue(`\n${greeting}, ${name}!`));
        console.log(chalk.gray('-'.repeat(40)));
        console.log(`Current time: ${chalk.green(new Date().toLocaleTimeString())}`);
    }

    showGreetedUsers(): void {
        if (this.greetedUsers.length === 0) {
            this.printInfo('No users greeted yet.');
            return;
        }

        console.log(chalk.blue('\n Greeted Users:'));
        console.log(chalk.gray('-'.repeat(40)));
        this.greetedUsers.forEach((user, index) => {
            console.log(`${index + 1}. ${user}`);
        });
        console.log(chalk.gray('-'.repeat(40)));
    }

    execute(operation: string, ...args: string[]): void {
        switch (operation) {
            case 'greet':
                this.greet(args[0]);
                break;
            case 'greet-time':
                this.greetWithTime(args[0]);
                break;
            case 'list':
                this.showGreetedUsers();
                break;
            default:
                this.printError(`Unknown operation: ${operation}`);
        }
    }
}

