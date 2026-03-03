"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileCommands = void 0;
const chalk_1 = __importDefault(require("chalk"));
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const BaseCommand_1 = require("./BaseCommand");
class FileCommands extends BaseCommand_1.BaseCommand {
    constructor() {
        super('file', 'Perform file operations');
    }
    fileInfo(filePath) {
        try {
            const resolvedPath = path.resolve(filePath);
            // Check if file exists
            if (!fs.existsSync(resolvedPath)) {
                this.printError(`File not found: ${filePath}`);
                return;
            }
            // Get file stats
            const stats = fs.statSync(resolvedPath);
            console.log(chalk_1.default.blue('\n File Information:'));
            console.log(chalk_1.default.gray('─'.repeat(40)));
            console.log(chalk_1.default.green('File Name: ') + chalk_1.default.bold(path.basename(resolvedPath)));
            console.log(chalk_1.default.green('Full Path: ') + resolvedPath);
            console.log(chalk_1.default.green('Extension: ') + (path.extname(resolvedPath) || 'None'));
            console.log(chalk_1.default.green('Size: ') + this.formatBytes(stats.size));
            console.log(chalk_1.default.green('Created: ') + stats.birthtime.toLocaleString());
            console.log(chalk_1.default.green('Modified: ') + stats.mtime.toLocaleString());
            console.log(chalk_1.default.green('Is Directory: ') + (stats.isDirectory() ? 'Yes' : 'No'));
            console.log(chalk_1.default.green('Is File: ') + (stats.isFile() ? 'Yes' : 'No'));
            console.log(chalk_1.default.gray('─'.repeat(40)));
        }
        catch (error) {
            this.printError(`Error reading file: ${error.message}`);
        }
    }
    listFiles(dirPath) {
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
            console.log(chalk_1.default.blue(`\n Files in ${dirPath}:`));
            console.log(chalk_1.default.gray('─'.repeat(40)));
            if (files.length === 0) {
                this.printInfo('Directory is empty');
            }
            else {
                files.forEach((file, index) => {
                    const filePath = path.join(resolvedPath, file);
                    const stats = fs.statSync(filePath);
                    const type = stats.isDirectory() ? chalk_1.default.blue('📁') : chalk_1.default.gray('📄');
                    const size = stats.isFile() ? this.formatBytes(stats.size) : '';
                    console.log(`${index + 1}. ${type} ${file} ${size}`);
                });
            }
            console.log(chalk_1.default.gray('─'.repeat(40)));
        }
        catch (error) {
            this.printError(`Error listing files: ${error.message}`);
        }
    }
    exists(targetPath) {
        const resolvedPath = path.resolve(targetPath);
        const exists = fs.existsSync(resolvedPath);
        if (exists) {
            const stats = fs.statSync(resolvedPath);
            const type = stats.isDirectory() ? 'Directory' : 'File';
            this.printSuccess(`${type} exists: ${targetPath}`);
        }
        else {
            this.printError(`Path does not exist: ${targetPath}`);
        }
    }
    formatBytes(bytes) {
        if (bytes === 0)
            return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }
    execute(operation, ...args) {
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
exports.FileCommands = FileCommands;
