import chalk from 'chalk';
import { BaseCommand } from './BaseCommand';

/**
 * StringCommands class - handles all string manipulation operations
 */
export class StringCommands extends BaseCommand {
    private stringHistory: Array<{ operation: string; input: string; output: string }>;

    constructor() {
        super('string', 'Perform string operations');
        this.stringHistory = [];
    }

    /**
     * Convert string to uppercase
     */
    uppercase(text: string): void {
        const result = text.toUpperCase();
        this.stringHistory.push({ operation: 'uppercase', input: text, output: result });
        console.log(chalk.green('Result: ') + chalk.bold(result));
    }

    /**
     * Convert string to lowercase
     */
    lowercase(text: string): void {
        const result = text.toLowerCase();
        this.stringHistory.push({ operation: 'lowercase', input: text, output: result });
        console.log(chalk.green('Result: ') + chalk.bold(result));
    }

    /**
     * Reverse a string
     */
    reverse(text: string): void {
        const result = text.split('').reverse().join('');
        this.stringHistory.push({ operation: 'reverse', input: text, output: result });
        console.log(chalk.green('Result: ') + chalk.bold(result));
    }

    /**
     * Count characters in a string
     */
    charCount(text: string): void {
        const result = text.length;
        console.log(chalk.green(`Character count: `) + chalk.bold(`${result}`));
        this.printInfo(`Original text: "${text}"`);
    }

    /**
     * Count words in a string
     */
    wordCount(text: string): void {
        const words = text.trim().split(/\s+/).filter(word => word.length > 0);
        const result = words.length;
        console.log(chalk.green(`Word count: `) + chalk.bold(`${result}`));
        this.printInfo(`Original text: "${text}"`);
    }

    /**
     * Check if string is palindrome
     */
    palindrome(text: string): void {
        const cleanText = text.toLowerCase().replace(/[^a-z0-9]/g, '');
        const reversed = cleanText.split('').reverse().join('');
        const isPalindrome = cleanText === reversed;
        
        if (isPalindrome) {
            this.printSuccess(`"${text}" is a palindrome!`);
        } else {
            this.printError(`"${text}" is not a palindrome`);
        }
    }

    /**
     * Show string history
     */
    showHistory(): void {
        if (this.stringHistory.length === 0) {
            this.printInfo('No string operations in history yet.');
            return;
        }
        console.log(chalk.blue('\n String Operations History:'));
        this.stringHistory.forEach((item, index) => {
            console.log(`${index + 1}. ${item.operation}: "${item.input}" → "${item.output}"`);
        });
    }

    execute(operation: string, text: string): void {
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

