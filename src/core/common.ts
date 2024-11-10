import { readFileSync, existsSync, writeFileSync } from 'fs';
import { join } from 'path';
import inquirer, { Answers, DistinctQuestion } from 'inquirer';
import axios, { AxiosRequestConfig } from 'axios';

export class Common {
    public get cwd(): string { return process.cwd(); }

    public getPath(path: string): string {
        return join(this.cwd, path);
    }
    public exists(path: string): boolean {
        return existsSync(path);
    }

    public readFile(path: string): string {
        let data = readFileSync(path, 'utf-8');
        return data;
    }
    public readJson<T>(path: string): T {
        let data = this.readFile(path);
        return JSON.parse(data);
    }
    public writeFile(path: string, data: string): void {
        writeFileSync(path, data);
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
}