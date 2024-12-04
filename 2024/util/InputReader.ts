

import { AocClient } from 'advent-of-code-client';

import * as fs from 'fs';
import { InputReaderInterface } from './InputReaderInterface';
var path = process.cwd();

export class InputReader implements InputReaderInterface {
    private client: AocClient;
    private useLocalFile: boolean;
    private localFileName: string;

    constructor(client: AocClient, useLocalFile: boolean = false, localFileName: string = 'test.txt') {
        this.client = client;
        this.useLocalFile = useLocalFile;
        this.localFileName = localFileName;
    }

    public async read(): Promise<any> {
        try {
            if (this.useLocalFile) {
                return fs.readFileSync(path + `/${this.localFileName}`).toString();
            }

            return await this.client.getInput();
        } catch (e) {
            console.log(e);
        }
        return [];
    }
}