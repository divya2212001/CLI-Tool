"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GreeterCommands = void 0;
const chalk_1 = __importDefault(require("chalk"));
const BaseCommand_1 = require("./BaseCommand");
class GreeterCommands extends BaseCommand_1.BaseCommand {
    constructor() {
        super('greeter', 'Greet users');
        this.greetedUsers = [];
    }
    greet(name) {
        if (!name) {
            this.printError('Please provide a name');
            return;
        }
        this.greetedUsers.push(name);
        console.log(chalk_1.default.blue('\n Hello there!'));
        console.log(chalk_1.default.green(chalk_1.default.bold(`Welcome, ${name}!`)));
        console.log(chalk_1.default.gray('-'.repeat(40)));
        this.printInfo('Great to have you here!');
    }
    greetWithTime(name) {
        if (!name) {
            this.printError('Please provide a name');
            return;
        }
        const hour = new Date().getHours();
        let greeting;
        if (hour < 12) {
            greeting = 'Good morning';
        }
        else if (hour < 18) {
            greeting = 'Good afternoon';
        }
        else {
            greeting = 'Good evening';
        }
        console.log(chalk_1.default.blue(`\n${greeting}, ${name}!`));
        console.log(chalk_1.default.gray('-'.repeat(40)));
        console.log(`Current time: ${chalk_1.default.green(new Date().toLocaleTimeString())}`);
    }
    showGreetedUsers() {
        if (this.greetedUsers.length === 0) {
            this.printInfo('No users greeted yet.');
            return;
        }
        console.log(chalk_1.default.blue('\n Greeted Users:'));
        console.log(chalk_1.default.gray('-'.repeat(40)));
        this.greetedUsers.forEach((user, index) => {
            console.log(`${index + 1}. ${user}`);
        });
        console.log(chalk_1.default.gray('-'.repeat(40)));
    }
    execute(operation, ...args) {
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
exports.GreeterCommands = GreeterCommands;
