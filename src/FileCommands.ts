import chalk from 'chalk';
import * as fs from 'fs';
import * as path from 'path';
import { BaseCommand } from './BaseCommand';

/**
 * FileCommands class - handles file-related operations
 */
export class FileCommands extends BaseCommand {
    constructor() {
        super('file', 'Perform file operations');
    }

    /**
     * Get information about a file
     */
    fileInfo(filePath: string): void {
        try {
            // Resolve the path
            const resolvedPath = path.resolve(filePath);
            
            // Check if file exists
            if (!fs.existsSync(resolvedPath)) {
                this.printError(`File not found: ${filePath}`);
                return;
            }

            // Get file stats
            const stats = fs.statSync(resolvedPath);
            
            console.log(chalk.blue('\n📄 File Information:'));
            console.log(chalk.gray('─'.repeat(40)));
            console.log(chalk.green('File Name: ') + chalk.bold(path.basename(resolvedPath)));
            console.log(chalk.green('Full Path: ') + resolvedPath);
            console.log(chalk.green('Extension: ') + (path.extname(resolvedPath) || 'None'));
            console.log(chalk.green('Size: ') + this.formatBytes(stats.size));
            console.log(chalk.green('Created: ') + stats.birthtime.toLocaleString());
            console.log(chalk.green('Modified: ') + stats.mtime.toLocaleString());
            console.log(chalk.green('Is Directory: ') + (stats.isDirectory() ? 'Yes' : 'No'));
            console.log(chalk.green('Is File: ') + (stats.isFile() ? 'Yes' : 'No'));
            console.log(chalk.gray('─'.repeat(40)));
        } catch (error: any) {
            this.printError(`Error reading file: ${error.message}`);
        }
    }

    /**
     * List files in a directory
     */
    listFiles(dirPath: string): void {
        try {
            const resolvedPath = path.resolve(dirPath);
            
            if (!fs.existsSync(resolvedPath)) {
                this.printError(`Directory not found: ${dirPath}`);
                return;
            }

            if (!fs.statSync(resolvedPath).isDirectory()) {
                this.printError(`Not a directory: ${dirPath}`);
                return;
            }

            const files = fs.readdirSync(resolvedPath);
            
            console.log(chalk.blue(`\n📁 Files in ${dirPath}:`));
            console.log(chalk.gray('─'.repeat(40)));
            
            if (files.length === 0) {
                this.printInfo('Directory is empty');
            } else {
                files.forEach((file, index) => {
                    const filePath = path.join(resolvedPath, file);
                    const stats = fs.statSync(filePath);
                    const type = stats.isDirectory() ? chalk.blue('📁') : chalk.gray('📄');
                    const size = stats.isFile() ? this.formatBytes(stats.size) : '';
                    console.log(`${index + 1}. ${type} ${file} ${size}`);
                });
            }
            console.log(chalk.gray('─'.repeat(40)));
        } catch (error: any) {
            this.printError(`Error listing files: ${error.message}`);
        }
    }

    /**
     * Check if a file or directory exists
     */
    exists(targetPath: string): void {
        const resolvedPath = path.resolve(targetPath);
        const exists = fs.existsSync(resolvedPath);
        
        if (exists) {
            const stats = fs.statSync(resolvedPath);
            const type = stats.isDirectory() ? 'Directory' : 'File';
            this.printSuccess(`${type} exists: ${targetPath}`);
        } else {
            this.printError(`Path does not exist: ${targetPath}`);
        }
    }

    /**
     * Format bytes to human readable format
     */
    private formatBytes(bytes: number): string {
        if (bytes === 0) return '0 Bytes';
        
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }

    execute(operation: string, ...args: string[]): void {
        switch (operation) {
            case 'fileinfo':
                this.fileInfo(args[0]);
                break;
            case 'list':
                this.listFiles(args[0]);
                break;
            case 'exists':
                this.exists(args[0]);
                break;
            default:
                this.printError(`Unknown operation: ${operation}`);
        }
    }
}

