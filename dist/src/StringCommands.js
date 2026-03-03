"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StringCommands = void 0;
const chalk_1 = __importDefault(require("chalk"));
const BaseCommand_1 = require("./BaseCommand");
class StringCommands extends BaseCommand_1.BaseCommand {
    constructor() {
        super('string', 'Perform string operations');
        this.stringHistory = [];
    }
    uppercase(text) {
        const result = text.toUpperCase();
        this.stringHistory.push({ operation: 'uppercase', input: text, output: result });
        console.log(chalk_1.default.green('Result: ') + chalk_1.default.bold(result));
    }
    lowercase(text) {
        const result = text.toLowerCase();
        this.stringHistory.push({ operation: 'lowercase', input: text, output: result });
        console.log(chalk_1.default.green('Result: ') + chalk_1.default.bold(result));
    }
    reverse(text) {
        const result = text.split('').reverse().join('');
        this.stringHistory.push({ operation: 'reverse', input: text, output: result });
        console.log(chalk_1.default.green('Result: ') + chalk_1.default.bold(result));
    }
    charCount(text) {
        const result = text.length;
        console.log(chalk_1.default.green(`Character count: `) + chalk_1.default.bold(`${result}`));
        this.printInfo(`Original text: "${text}"`);
    }
    wordCount(text) {
        const words = text.trim().split(/\s+/).filter(word => word.length > 0);
        const result = words.length;
        console.log(chalk_1.default.green(`Word count: `) + chalk_1.default.bold(`${result}`));
        this.printInfo(`Original text: "${text}"`);
    }
    palindrome(text) {
        const cleanText = text.toLowerCase().replace(/[^a-z0-9]/g, '');
        const reversed = cleanText.split('').reverse().join('');
        const isPalindrome = cleanText === reversed;
        if (isPalindrome) {
            this.printSuccess(`"${text}" is a palindrome!`);
        }
        else {
            this.printError(`"${text}" is not a palindrome`);
        }
    }
    showHistory() {
        if (this.stringHistory.length === 0) {
            this.printInfo('No string operations in history yet.');
            return;
        }
        console.log(chalk_1.default.blue('\n String Operations History:'));
        this.stringHistory.forEach((item, index) => {
            console.log(`${index + 1}. ${item.operation}: "${item.input}" → "${item.output}"`);
        });
    }
    execute(operation, text) {
        switch (operation) {
            case 'uppercase':
                this.uppercase(text);
                break;
            case 'lowercase':
                this.lowercase(text);
                break;
            case 'reverse':
                this.reverse(text);
                break;
            case 'charcount':
                this.charCount(text);
                break;
            case 'wordcount':
                this.wordCount(text);
                break;
            case 'palindrome':
                this.palindrome(text);
                break;
            default:
                this.printError(`Unknown operation: ${operation}`);
        }
    }
}
exports.StringCommands = StringCommands;
