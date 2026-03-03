"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseCommand = void 0;
const chalk_1 = __importDefault(require("chalk"));
class BaseCommand {
    constructor(name, description) {
        this.name = name;
        this.description = description;
    }
    printSuccess(message) {
        console.log(chalk_1.default.green('✓ ') + message);
    }
    printError(message) {
        console.log(chalk_1.default.red('✗ ') + message);
    }
    printInfo(message) {
        console.log(chalk_1.default.blue('ℹ ') + message);
    }
    printWarning(message) {
        console.log(chalk_1.default.yellow('⚠ ') + message);
    }
    getName() {
        return this.name;
    }
    getDescription() {
        return this.description;
    }
}
exports.BaseCommand = BaseCommand;
