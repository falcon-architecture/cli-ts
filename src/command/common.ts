import { readFileSync, existsSync, writeFileSync, mkdirSync } from 'fs';
import { join } from 'path';
import inquirer, { Answers, DistinctQuestion } from 'inquirer';
import axios, { AxiosRequestConfig } from 'axios';
import { compile } from 'handlebars';

export class Common {
    public get cwd(): string { return process.cwd(); }

    public getAbsolutePath(path: string): string {
        return join(this.cwd, path);
    }
    public exists(path: string): boolean {
        return existsSync(path);
    }

    public mkdir(dirPath: string): void {
        mkdirSync(dirPath, { recursive: true });
        global.logger?.debug(`directory is created at ${dirPath}`);
    }


    public readFile(path: string): string {
        let data = readFileSync(path, 'utf-8');
        global.logger?.debug(`file is read from ${path}`);
        return data;
    }
    public readJson<T>(path: string): T {
        let data = this.readFile(path);
        return JSON.parse(data);
    }
    public writeFile(path: string, data: string): void {
        writeFileSync(path, data);
        global.logger?.debug(`file is written to ${path}`);
    }
    public writeJson<T>(path: string, data: T): void {
        this.writeFile(path, JSON.stringify(data, null, 2));
    }

    public async prompt<T extends Answers>(promptOptions: DistinctQuestion[]): Promise<T> {
        return inquirer.prompt<T>(promptOptions as any[]) as unknown as Promise<T>;
    }

    public async request<T>(config: AxiosRequestConfig): Promise<T> {
        let response = await axios.request<T>(config);
        return response.data;
    }

    public compileTemplate(template: string, data: any): string {
        return compile(template)(data);
    }

    public compileTemplateFile(path: string, data: any): string {
        let template = this.readFile(path);
        global.logger?.debug(`template is read from ${path}`);
        return this.compileTemplate(template, data);
    }
}