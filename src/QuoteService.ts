import axios from 'axios';
import chalk from 'chalk';
import { BaseCommand } from './BaseCommand';

interface ZenQuote {
    q: string; // quote
    a: string; // author
    h: string; // html
}

export class QuoteService extends BaseCommand {
    private favoriteQuotes: Array<{ quote: string; author: string }>;

    constructor() {
        super('quote', 'Get random inspirational quotes');
        this.favoriteQuotes = [];
    }

    async getRandomQuote(): Promise<void> {
        this.printInfo('Fetching a random quote...');

        try {
            // Using zenquotes.io API
            const response = await axios.get<ZenQuote[]>('https://zenquotes.io/api/random');
            const quoteData = response.data[0];

            console.log(chalk.blue('\n Daily Inspiration:'));
            console.log(chalk.gray('-'.repeat(60)));
            console.log(chalk.green('"') + chalk.bold(quoteData.q) + chalk.green('"'));
            console.log(chalk.cyan(`\n  - ${quoteData.a}`));
            console.log(chalk.gray('-'.repeat(60)));
        } catch (error: any) {
            this.printError(`Error fetching quote: ${error.message}`);
        }
    }

    async getQuoteOfTheDay(): Promise<void> {
        this.printInfo('Fetching quote of the day...');

        try {
            // Using zenquotes.io API for today's quote
            const response = await axios.get<ZenQuote[]>('https://zenquotes.io/api/today');
            const quoteData = response.data[0];

            console.log(chalk.blue('\n Quote of the Day:'));
            console.log(chalk.gray('-'.repeat(60)));
            console.log(chalk.green('"') + chalk.bold(quoteData.q) + chalk.green('"'));
            console.log(chalk.cyan(`\n  - ${quoteData.a}`));
            console.log(chalk.gray('-'.repeat(60)));
        } catch (error: any) {
            this.printError(`Error fetching quote: ${error.message}`);
        }
    }

    async getMultipleQuotes(count: number = 5): Promise<void> {
        if (count < 1 || count > 20) {
            this.printError('Count must be between 1 and 20');
            return;
        }

        this.printInfo(`Fetching ${count} random quotes...`);

        try {
            // Using zenquotes.io API for multiple quotes
            const response = await axios.get<ZenQuote[]>(`https://zenquotes.io/api/quotes`);
            const quotes = response.data.slice(0, count);

            console.log(chalk.blue(`\n Random Quotes (${count}):`));
            console.log(chalk.gray('-'.repeat(60)));
            
            quotes.forEach((quoteData, index) => {
                console.log(`${index + 1}. "${quoteData.q}"`);
                console.log(`   - ${quoteData.a}`);
                console.log();
            });
            
            console.log(chalk.gray('-'.repeat(60)));
        } catch (error: any) {
            this.printError(`Error fetching quotes: ${error.message}`);
        }
    }

    addToFavorites(quote: string, author: string): void {
        this.favoriteQuotes.push({ quote, author });
        this.printSuccess('Quote added to favorites!');
    }

    showFavorites(): void {
        if (this.favoriteQuotes.length === 0) {
            this.printInfo('No favorite quotes yet.');
            return;
        }

        console.log(chalk.blue('\n Favorite Quotes:'));
        console.log(chalk.gray('-'.repeat(60)));
        
        this.favoriteQuotes.forEach((item, index) => {
            console.log(`${index + 1}. "${item.quote}"`);
            console.log(`   - ${item.author}`);
            console.log();
        });
        
        console.log(chalk.gray('-'.repeat(60)));
    }

    async execute(operation: string, ...args: string[]): Promise<void> {
        switch (operation) {
            case 'random':
                await this.getRandomQuote();
                break;
            case 'today':
                await this.getQuoteOfTheDay();
                break;
            case 'multiple':
                await this.getMultipleQuotes(args[0] ? parseInt(args[0]) : 5);
                break;
            case 'favorites':
                this.showFavorites();
                break;
            default:
                this.printError(`Unknown operation: ${operation}`);
        }
    }
}

