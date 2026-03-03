"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuoteService = void 0;
const axios_1 = __importDefault(require("axios"));
const chalk_1 = __importDefault(require("chalk"));
const BaseCommand_1 = require("./BaseCommand");
class QuoteService extends BaseCommand_1.BaseCommand {
    constructor() {
        super('quote', 'Get random inspirational quotes');
        this.favoriteQuotes = [];
    }
    async getRandomQuote() {
        this.printInfo('Fetching a random quote...');
        try {
            // Using zenquotes.io API
            const response = await axios_1.default.get('https://zenquotes.io/api/random');
            const quoteData = response.data[0];
            console.log(chalk_1.default.blue('\n Daily Inspiration:'));
            console.log(chalk_1.default.gray('-'.repeat(60)));
            console.log(chalk_1.default.green('"') + chalk_1.default.bold(quoteData.q) + chalk_1.default.green('"'));
            console.log(chalk_1.default.cyan(`\n  - ${quoteData.a}`));
            console.log(chalk_1.default.gray('-'.repeat(60)));
        }
        catch (error) {
            this.printError(`Error fetching quote: ${error.message}`);
        }
    }
    async getQuoteOfTheDay() {
        this.printInfo('Fetching quote of the day...');
        try {
            // Using zenquotes.io API for today's quote
            const response = await axios_1.default.get('https://zenquotes.io/api/today');
            const quoteData = response.data[0];
            console.log(chalk_1.default.blue('\n Quote of the Day:'));
            console.log(chalk_1.default.gray('-'.repeat(60)));
            console.log(chalk_1.default.green('"') + chalk_1.default.bold(quoteData.q) + chalk_1.default.green('"'));
            console.log(chalk_1.default.cyan(`\n  - ${quoteData.a}`));
            console.log(chalk_1.default.gray('-'.repeat(60)));
        }
        catch (error) {
            this.printError(`Error fetching quote: ${error.message}`);
        }
    }
    async getMultipleQuotes(count = 5) {
        if (count < 1 || count > 20) {
            this.printError('Count must be between 1 and 20');
            return;
        }
        this.printInfo(`Fetching ${count} random quotes...`);
        try {
            // Using zenquotes.io API for multiple quotes
            const response = await axios_1.default.get(`https://zenquotes.io/api/quotes`);
            const quotes = response.data.slice(0, count);
            console.log(chalk_1.default.blue(`\n Random Quotes (${count}):`));
            console.log(chalk_1.default.gray('-'.repeat(60)));
            quotes.forEach((quoteData, index) => {
                console.log(`${index + 1}. "${quoteData.q}"`);
                console.log(`   - ${quoteData.a}`);
                console.log();
            });
            console.log(chalk_1.default.gray('-'.repeat(60)));
        }
        catch (error) {
            this.printError(`Error fetching quotes: ${error.message}`);
        }
    }
    addToFavorites(quote, author) {
        this.favoriteQuotes.push({ quote, author });
        this.printSuccess('Quote added to favorites!');
    }
    showFavorites() {
        if (this.favoriteQuotes.length === 0) {
            this.printInfo('No favorite quotes yet.');
            return;
        }
        console.log(chalk_1.default.blue('\n Favorite Quotes:'));
        console.log(chalk_1.default.gray('-'.repeat(60)));
        this.favoriteQuotes.forEach((item, index) => {
            console.log(`${index + 1}. "${item.quote}"`);
            console.log(`   - ${item.author}`);
            console.log();
        });
        console.log(chalk_1.default.gray('-'.repeat(60)));
    }
    async execute(operation, ...args) {
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
exports.QuoteService = QuoteService;
