import axios from 'axios';
import chalk from 'chalk';
import { BaseCommand } from './BaseCommand';

/**
 * GitHub User data interface
 */
interface GitHubUser {
    login: string;
    id: number;
    avatar_url: string;
    html_url: string;
    name: string | null;
    company: string | null;
    blog: string;
    location: string | null;
    bio: string | null;
    public_repos: number;
    public_gists: number;
    followers: number;
    following: number;
    created_at: string;
}

/**
 * Repository interface
 */
interface GitHubRepo {
    name: string;
    description: string | null;
    stargazers_count: number;
    forks_count: number;
    language: string | null;
    html_url: string;
}

/**
 * GitHubService class - handles GitHub API integration
 */
export class GitHubService extends BaseCommand {
    private searchHistory: string[];

    constructor() {
        super('github', 'Get GitHub user information');
        this.searchHistory = [];
    }

    /**
     * Get GitHub user information
     */
    async getUserInfo(username: string): Promise<void> {
        if (!username) {
            this.printError('Please provide a GitHub username');
            return;
        }

        this.printInfo(`Fetching GitHub user info for: ${username}...`);

        try {
            const response = await axios.get<GitHubUser>(`https://api.github.com/users/${username}`);
            const user = response.data;

            this.searchHistory.push(username);

            console.log(chalk.blue('\n GitHub User Profile:'));
            console.log(chalk.gray('─'.repeat(50)));
            console.log(chalk.green('Username: ') + chalk.bold(user.login));
            console.log(chalk.green('Name: ') + (user.name || 'Not specified'));
            console.log(chalk.green('ID: ') + user.id);
            console.log(chalk.green('Company: ') + (user.company || 'Not specified'));
            console.log(chalk.green('Location: ') + (user.location || 'Not specified'));
            console.log(chalk.green('Blog: ') + (user.blog || 'Not specified'));
            console.log(chalk.green('Bio: ') + (user.bio || 'Not specified'));
            console.log(chalk.gray('─'.repeat(50)));
            console.log(chalk.blue(' Statistics:'));
            console.log(chalk.cyan('  Public Repos: ') + user.public_repos);
            console.log(chalk.cyan('  Public Gists: ') + user.public_gists);
            console.log(chalk.cyan('  Followers: ') + user.followers);
            console.log(chalk.cyan('  Following: ') + user.following);
            console.log(chalk.gray('─'.repeat(50)));
            console.log(chalk.green('Profile URL: ') + chalk.underline(user.html_url));
            console.log(chalk.green('Created: ') + new Date(user.created_at).toLocaleDateString());
            console.log(chalk.gray('─'.repeat(50)));
        } catch (error: any) {
            if (error.response && error.response.status === 404) {
                this.printError(`User not found: ${username}`);
            } else if (error.response && error.response.status === 403) {
                this.printError('API rate limit exceeded. Please try again later.');
            } else {
                this.printError(`Error fetching user: ${error.message}`);
            }
        }
    }

    /**
     * Get user's repositories
     */
    async getUserRepos(username: string, limit: number = 5): Promise<void> {
        if (!username) {
            this.printError('Please provide a GitHub username');
            return;
        }

        this.printInfo(`Fetching repositories for: ${username}...`);

        try {
            const response = await axios.get<GitHubRepo[]>(`https://api.github.com/users/${username}/repos`, {
                params: {
                    sort: 'updated',
                    per_page: limit
                }
            });

            const repos: GitHubRepo[] = response.data;

            console.log(chalk.blue(`\n Top ${repos.length} Repositories for ${username}:`));
            console.log(chalk.gray('─'.repeat(60)));

            repos.forEach((repo: any, index: number) => {
                console.log(`${index + 1}. ${chalk.green(repo.name)}`);
                console.log(`    ${repo.stargazers_count} | 🍴 ${repo.forks_count} | 🔀 ${repo.language || 'N/A'}`);
                console.log(`   ${chalk.gray(repo.description || 'No description')}`);
                console.log(`   ${chalk.cyan(repo.html_url)}`);
                console.log(chalk.gray('─'.repeat(60)));
            });
        } catch (error: any) {
            if (error.response && error.response.status === 404) {
                this.printError(`User not found: ${username}`);
            } else {
                this.printError(`Error fetching repos: ${error.message}`);
            }
        }
    }

    /**
     * Show search history
     */
    showHistory(): void {
        if (this.searchHistory.length === 0) {
            this.printInfo('No GitHub searches yet.');
            return;
        }
        console.log(chalk.blue('\n Recent GitHub Searches:'));
        this.searchHistory.forEach((username, index) => {
            console.log(`${index + 1}. ${username}`);
        });
    }

    async execute(operation: string, ...args: string[]): Promise<void> {
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

