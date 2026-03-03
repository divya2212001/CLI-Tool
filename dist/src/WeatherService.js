"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WeatherService = void 0;
const axios_1 = __importDefault(require("axios"));
const chalk_1 = __importDefault(require("chalk"));
const BaseCommand_1 = require("./BaseCommand");
class WeatherService extends BaseCommand_1.BaseCommand {
    constructor() {
        super('weather', 'Get weather information for a city');
        this.searchHistory = [];
    }
    async getWeather(city) {
        if (!city) {
            this.printError('Please provide a city name');
            return;
        }
        this.printInfo(`Fetching weather for: ${city}...`);
        try {
            // Using wttr.in API - no API key needed
            const response = await axios_1.default.get(`https://wttr.in/${city}?format=j1`);
            const weather = response.data;
            const current = weather.current_condition[0];
            const area = weather.nearest_area[0];
            this.searchHistory.push(city);
            console.log(chalk_1.default.blue('\nWeather Information:'));
            console.log(chalk_1.default.gray('-'.repeat(50)));
            console.log(chalk_1.default.green('Location: ') + chalk_1.default.bold(area.areaName[0].value));
            console.log(chalk_1.default.green('Region: ') + area.region[0].value);
            console.log(chalk_1.default.green('Country: ') + area.country[0].value);
            console.log(chalk_1.default.gray('-'.repeat(50)));
            console.log(chalk_1.default.cyan('Temperature:'));
            console.log(`   Celsius:    ${chalk_1.default.bold(current.temp_C + 'C')}`);
            console.log(`   Fahrenheit: ${chalk_1.default.bold(current.temp_F + 'F')}`);
            console.log(chalk_1.default.cyan('Conditions:'));
            console.log(`   ${current.weatherDesc[0].value}`);
            console.log(chalk_1.default.cyan('Humidity: ') + current.humidity + '%');
            console.log(chalk_1.default.cyan('Wind Speed: ') + current.windspeedKmph + ' km/h');
            console.log(chalk_1.default.cyan('Cloud Cover: ') + current.cloudcover + '%');
            console.log(chalk_1.default.gray('-'.repeat(50)));
        }
        catch (error) {
            if (error.response && error.response.status === 404) {
                this.printError(`City not found: ${city}`);
            }
            else {
                this.printError(`Error fetching weather: ${error.message}`);
            }
        }
    }
    async getForecast(city, days = 3) {
        if (!city) {
            this.printError('Please provide a city name');
            return;
        }
        if (days < 1 || days > 7) {
            this.printError('Days must be between 1 and 7');
            return;
        }
        this.printInfo(`Fetching ${days}-day forecast for: ${city}...`);
        try {
            // Using wttr.in API with format
            const response = await axios_1.default.get(`https://wttr.in/${city}?format=j1`);
            const weather = response.data;
            const area = weather.nearest_area[0];
            console.log(chalk_1.default.blue(`\n${days}-Day Weather Forecast for ${area.areaName[0].value}:`));
            console.log(chalk_1.default.gray('-'.repeat(50)));
            // Showing current conditions as forecast
            const current = weather.current_condition[0];
            console.log(chalk_1.default.green('Current Conditions:'));
            console.log(`   Temperature: ${current.temp_C}C / ${current.temp_F}F`);
            console.log(`   ${current.weatherDesc[0].value}`);
            console.log(`   Humidity: ${current.humidity}%`);
            console.log(chalk_1.default.gray('-'.repeat(50)));
        }
        catch (error) {
            this.printError(`Error fetching forecast: ${error.message}`);
        }
    }
    showHistory() {
        if (this.searchHistory.length === 0) {
            this.printInfo('No weather searches yet.');
            return;
        }
        console.log(chalk_1.default.blue('\nRecent Weather Searches:'));
        this.searchHistory.forEach((city, index) => {
            console.log(`${index + 1}. ${city}`);
        });
    }
    async execute(operation, ...args) {
        switch (operation) {
            case 'weather':
                await this.getWeather(args[0]);
                break;
            case 'forecast':
                await this.getForecast(args[0], args[1] ? parseInt(args[1]) : 3);
                break;
            default:
                this.printError(`Unknown operation: ${operation}`);
        }
    }
}
exports.WeatherService = WeatherService;
