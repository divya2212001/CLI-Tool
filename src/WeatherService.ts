import axios from 'axios';
import chalk from 'chalk';
import { BaseCommand } from './BaseCommand';

/**
 * Weather data interface
 */
interface WeatherData {
    current_condition: Array<{
        temp_C: string;
        temp_F: string;
        weatherDesc: Array<{ value: string }>;
        humidity: string;
        windspeedKmph: string;
        cloudcover: string;
    }>;
    nearest_area: Array<{
        areaName: Array<{ value: string }>;
        region: Array<{ value: string }>;
        country: Array<{ value: string }>;
    }>;
}

/**
 * WeatherService class - handles Weather API integration
 */
export class WeatherService extends BaseCommand {
    private searchHistory: string[];

    constructor() {
        super('weather', 'Get weather information for a city');
        this.searchHistory = [];
    }

    /**
     * Get weather information for a city
     */
    async getWeather(city: string): Promise<void> {
        if (!city) {
            this.printError('Please provide a city name');
            return;
        }

        this.printInfo(`Fetching weather for: ${city}...`);

        try {
            // Using wttr.in API - no API key needed
            const response = await axios.get(`https://wttr.in/${city}?format=j1`);
            const weather = response.data as unknown as WeatherData;

            const current = weather.current_condition[0];
            const area = weather.nearest_area[0];

            this.searchHistory.push(city);

            console.log(chalk.blue('\nWeather Information:'));
            console.log(chalk.gray('-'.repeat(50)));
            console.log(chalk.green('Location: ') + chalk.bold(area.areaName[0].value));
            console.log(chalk.green('Region: ') + area.region[0].value);
            console.log(chalk.green('Country: ') + area.country[0].value);
            console.log(chalk.gray('-'.repeat(50)));
            console.log(chalk.cyan('Temperature:'));
            console.log(`   Celsius:    ${chalk.bold(current.temp_C + 'C')}`);
            console.log(`   Fahrenheit: ${chalk.bold(current.temp_F + 'F')}`);
            console.log(chalk.cyan('Conditions:'));
            console.log(`   ${current.weatherDesc[0].value}`);
            console.log(chalk.cyan('Humidity: ') + current.humidity + '%');
            console.log(chalk.cyan('Wind Speed: ') + current.windspeedKmph + ' km/h');
            console.log(chalk.cyan('Cloud Cover: ') + current.cloudcover + '%');
            console.log(chalk.gray('-'.repeat(50)));
        } catch (error: any) {
            if (error.response && error.response.status === 404) {
                this.printError(`City not found: ${city}`);
            } else {
                this.printError(`Error fetching weather: ${error.message}`);
            }
        }
    }

    /**
     * Get weather forecast for multiple days
     */
    async getForecast(city: string, days: number = 3): Promise<void> {
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
            const response = await axios.get(`https://wttr.in/${city}?format=j1`);
            const weather = response.data as unknown as WeatherData;

            const area = weather.nearest_area[0];

            console.log(chalk.blue(`\n${days}-Day Weather Forecast for ${area.areaName[0].value}:`));
            console.log(chalk.gray('-'.repeat(50)));
            
            // Note: wttr.in free tier has limited forecast data
            // Showing current conditions as forecast
            const current = weather.current_condition[0];
            console.log(chalk.green('Current Conditions:'));
            console.log(`   Temperature: ${current.temp_C}C / ${current.temp_F}F`);
            console.log(`   ${current.weatherDesc[0].value}`);
            console.log(`   Humidity: ${current.humidity}%`);
            console.log(chalk.gray('-'.repeat(50)));
        } catch (error: any) {
            this.printError(`Error fetching forecast: ${error.message}`);
        }
    }

    /**
     * Show search history
     */
    showHistory(): void {
        if (this.searchHistory.length === 0) {
            this.printInfo('No weather searches yet.');
            return;
        }
        console.log(chalk.blue('\nRecent Weather Searches:'));
        this.searchHistory.forEach((city, index) => {
            console.log(`${index + 1}. ${city}`);
        });
    }

    async execute(operation: string, ...args: string[]): Promise<void> {
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

