"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GitHubService = void 0;
const axios_1 = __importDefault(require("axios"));
const chalk_1 = __importDefault(require("chalk"));
const BaseCommand_1 = require("./BaseCommand");
/**
 * GitHubService class - handles GitHub API integration
 */
class GitHubService extends BaseCommand_1.BaseCommand {
    constructor() {
        super('github', 'Get GitHub user information');
        this.searchHistory = [];
    }
    /**
     * Get GitHub user information
     */
    async getUserInfo(username) {
        if (!username) {
            this.printError('Please provide a GitHub username');
            return;
        }
        this.printInfo(`Fetching GitHub user info for: ${username}...`);
        try {
            const response = await axios_1.default.get(`https://api.github.com/users/${username}`);
            const user = response.data;
            this.searchHistory.push(username);
            console.log(chalk_1.default.blue('\n👤 GitHub User Profile:'));
            console.log(chalk_1.default.gray('─'.repeat(50)));
            console.log(chalk_1.default.green('Username: ') + chalk_1.default.bold(user.login));
            console.log(chalk_1.default.green('Name: ') + (user.name || 'Not specified'));
            console.log(chalk_1.default.green('ID: ') + user.id);
            console.log(chalk_1.default.green('Company: ') + (user.company || 'Not specified'));
            console.log(chalk_1.default.green('Location: ') + (user.location || 'Not specified'));
            console.log(chalk_1.default.green('Blog: ') + (user.blog || 'Not specified'));
            console.log(chalk_1.default.green('Bio: ') + (user.bio || 'Not specified'));
            console.log(chalk_1.default.gray('─'.repeat(50)));
            console.log(chalk_1.default.blue('📊 Statistics:'));
            console.log(chalk_1.default.cyan('  📦 Public Repos: ') + user.public_repos);
            console.log(chalk_1.default.cyan('  📚 Public Gists: ') + user.public_gists);
            console.log(chalk_1.default.cyan('  👥 Followers: ') + user.followers);
            console.log(chalk_1.default.cyan('  👤 Following: ') + user.following);
            console.log(chalk_1.default.gray('─'.repeat(50)));
            console.log(chalk_1.default.green('Profile URL: ') + chalk_1.default.underline(user.html_url));
            console.log(chalk_1.default.green('Created: ') + new Date(user.created_at).toLocaleDateString());
            console.log(chalk_1.default.gray('─'.repeat(50)));
        }
        catch (error) {
            if (error.response && error.response.status === 404) {
                this.printError(`User not found: ${username}`);
            }
            else if (error.response && error.response.status === 403) {
                this.printError('API rate limit exceeded. Please try again later.');
            }
            else {
                this.printError(`Error fetching user: ${error.message}`);
            }
        }
    }
    /**
     * Get user's repositories
     */
    async getUserRepos(username, limit = 5) {
        if (!username) {
            this.printError('Please provide a GitHub username');
            return;
        }
        this.printInfo(`Fetching repositories for: ${username}...`);
        try {
            const response = await axios_1.default.get(`https://api.github.com/users/${username}/repos`, {
                params: {
                    sort: 'updated',
                    per_page: limit
                }
            });
            const repos = response.data;
            console.log(chalk_1.default.blue(`\n📚 Top ${repos.length} Repositories for ${username}:`));
            console.log(chalk_1.default.gray('─'.repeat(60)));
            repos.forEach((repo, index) => {
                console.log(`${index + 1}. ${chalk_1.default.green(repo.name)}`);
                console.log(`   ⭐ ${repo.stargazers_count} | 🍴 ${repo.forks_count} | 🔀 ${repo.language || 'N/A'}`);
                console.log(`   ${chalk_1.default.gray(repo.description || 'No description')}`);
                console.log(`   ${chalk_1.default.cyan(repo.html_url)}`);
                console.log(chalk_1.default.gray('─'.repeat(60)));
            });
        }
        catch (error) {
            if (error.response && error.response.status === 404) {
                this.printError(`User not found: ${username}`);
            }
            else {
                this.printError(`Error fetching repos: ${error.message}`);
            }
        }
    }
    /**
     * Show search history
     */
    showHistory() {
        if (this.searchHistory.length === 0) {
            this.printInfo('No GitHub searches yet.');
            return;
        }
        console.log(chalk_1.default.blue('\n🔍 Recent GitHub Searches:'));
        this.searchHistory.forEach((username, index) => {
            console.log(`${index + 1}. ${username}`);
        });
    }
    async execute(operation, ...args) {
        switch (operation) {
            case 'user':
                await this.getUserInfo(args[0]);
                break;
            case 'repos':
                await this.getUserRepos(args[0], args[1] ? parseInt(args[1]) : 5);
                break;
            default:
                this.printError(`Unknown operation: ${operation}`);
        }
    }
}
exports.GitHubService = GitHubService;
