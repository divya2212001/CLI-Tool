import chalk from 'chalk';
import { BaseCommand } from './BaseCommand';


export class CalculatorCommands extends BaseCommand {
    private history: Array<{ operation: string; result: number }>;

    constructor() {
        super('calculator', 'Perform mathematical operations');
        this.history = [];
    }

    add(num1: number, num2: number): void {
        const result = num1 + num2;
        this.history.push({ operation: 'add', result });
        console.log(chalk.green(`${num1} + ${num2} = ${result}`));
    }

    subtract(num1: number, num2: number): void {
        const result = num1 - num2;
        this.history.push({ operation: 'subtract', result });
        console.log(chalk.green(`${num1} - ${num2} = ${result}`));
    }


    multiply(num1: number, num2: number): void {
        const result = num1 * num2;
        this.history.push({ operation: 'multiply', result });
        console.log(chalk.green(`${num1} × ${num2} = ${result}`));
    }

    
    divide(num1: number, num2: number): void {
        if (num2 === 0) {
            this.printError('Division by zero is not allowed!');
            return;
        }
        const result = num1 / num2;
        this.history.push({ operation: 'divide', result });
        console.log(chalk.green(`${num1} ÷ ${num2} = ${result}`));
    }

    
    modulo(num1: number, num2: number): void {
        if (num2 === 0) {
            this.printError('Modulo by zero is not allowed!');
            return;
        }
        const result = num1 % num2;
        this.history.push({ operation: 'modulo', result });
        console.log(chalk.green(`${num1} % ${num2} = ${result}`));
    }

    
    power(base: number, exponent: number): void {
        const result = Math.pow(base, exponent);
        this.history.push({ operation: 'power', result });
        console.log(chalk.green(`${base} ^ ${exponent} = ${result}`));
    }

    
    sqrt(num: number): void {
        if (num < 0) {
            this.printError('Cannot calculate square root of negative number!');
            return;
        }
        const result = Math.sqrt(num);
        console.log(chalk.green(`√${num} = ${result}`));
    }

    
    showHistory(): void {
        if (this.history.length === 0) {
            this.printInfo('No calculations in history yet.');
            return;
        }
        console.log(chalk.blue('\n Calculation History:'));
        this.history.forEach((item, index) => {
            console.log(`${index + 1}. ${item.operation}: ${item.result}`);
        });
    }

    
    clearHistory(): void {
        this.history = [];
        this.printSuccess('History cleared!');
    }

    execute(operation: string, num1: number, num2?: number): void {
        switch (operation) {
            case 'add':
                this.add(num1, num2!);
                break;
            case 'subtract':
                this.subtract(num1, num2!);
                break;
            case 'multiply':
                this.multiply(num1, num2!);
                break;
            case 'divide':
                this.divide(num1, num2!);
                break;
            case 'modulo':
                this.modulo(num1, num2!);
                break;
            case 'power':
                this.power(num1, num2!);
                break;
            case 'sqrt':
                this.sqrt(num1);
                break;
            default:
                this.printError(`Unknown operation: ${operation}`);
        }
    }
}

