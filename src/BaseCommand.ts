import chalk from 'chalk';

export abstract class BaseCommand {
    protected name: string;
    protected description: string;

    constructor(name: string, description: string) {
        this.name = name;
        this.description = description;
    }

    abstract execute(...args: any[]): void;

    protected printSuccess(message: string): void {
        console.log(chalk.green('✓ ') + message);
    }

    protected printError(message: string): void {
        console.log(chalk.red('✗ ') + message);
    }

    protected printInfo(message: string): void {
        console.log(chalk.blue('ℹ ') + message);
    }

    protected printWarning(message: string): void {
        console.log(chalk.yellow('⚠ ') + message);
    }

    getName(): string {
        return this.name;
    }

    getDescription(): string {
        return this.description;
    }
}

