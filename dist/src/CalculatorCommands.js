"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CalculatorCommands = void 0;
const chalk_1 = __importDefault(require("chalk"));
const BaseCommand_1 = require("./BaseCommand");
/**
 * CalculatorCommands class - handles all mathematical operations
 */
class CalculatorCommands extends BaseCommand_1.BaseCommand {
    constructor() {
        super('calculator', 'Perform mathematical operations');
        this.history = [];
    }
    /**
     * Add two numbers
     */
    add(num1, num2) {
        const result = num1 + num2;
        this.history.push({ operation: 'add', result });
        console.log(chalk_1.default.green(`${num1} + ${num2} = ${result}`));
    }
    /**
     * Subtract two numbers
     */
    subtract(num1, num2) {
        const result = num1 - num2;
        this.history.push({ operation: 'subtract', result });
        console.log(chalk_1.default.green(`${num1} - ${num2} = ${result}`));
    }
    /**
     * Multiply two numbers
     */
    multiply(num1, num2) {
        const result = num1 * num2;
        this.history.push({ operation: 'multiply', result });
        console.log(chalk_1.default.green(`${num1} × ${num2} = ${result}`));
    }
    /**
     * Divide two numbers
     */
    divide(num1, num2) {
        if (num2 === 0) {
            this.printError('Division by zero is not allowed!');
            return;
        }
        const result = num1 / num2;
        this.history.push({ operation: 'divide', result });
        console.log(chalk_1.default.green(`${num1} ÷ ${num2} = ${result}`));
    }
    /**
     * Modulo operation
     */
    modulo(num1, num2) {
        if (num2 === 0) {
            this.printError('Modulo by zero is not allowed!');
            return;
        }
        const result = num1 % num2;
        this.history.push({ operation: 'modulo', result });
        console.log(chalk_1.default.green(`${num1} % ${num2} = ${result}`));
    }
    /**
     * Power operation
     */
    power(base, exponent) {
        const result = Math.pow(base, exponent);
        this.history.push({ operation: 'power', result });
        console.log(chalk_1.default.green(`${base} ^ ${exponent} = ${result}`));
    }
    /**
     * Square root
     */
    sqrt(num) {
        if (num < 0) {
            this.printError('Cannot calculate square root of negative number!');
            return;
        }
        const result = Math.sqrt(num);
        console.log(chalk_1.default.green(`√${num} = ${result}`));
    }
    /**
     * Show calculation history
     */
    showHistory() {
        if (this.history.length === 0) {
            this.printInfo('No calculations in history yet.');
            return;
        }
        console.log(chalk_1.default.blue('\n📊 Calculation History:'));
        this.history.forEach((item, index) => {
            console.log(`${index + 1}. ${item.operation}: ${item.result}`);
        });
    }
    /**
     * Clear history
     */
    clearHistory() {
        this.history = [];
        this.printSuccess('History cleared!');
    }
    execute(operation, num1, num2) {
        switch (operation) {
            case 'add':
                this.add(num1, num2);
                break;
            case 'subtract':
                this.subtract(num1, num2);
                break;
            case 'multiply':
                this.multiply(num1, num2);
                break;
            case 'divide':
                this.divide(num1, num2);
                break;
            case 'modulo':
                this.modulo(num1, num2);
                break;
            case 'power':
                this.power(num1, num2);
                break;
            case 'sqrt':
                this.sqrt(num1);
                break;
            default:
                this.printError(`Unknown operation: ${operation}`);
        }
    }
}
exports.CalculatorCommands = CalculatorCommands;
