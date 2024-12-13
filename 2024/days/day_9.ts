import { AocClient } from "advent-of-code-client";
import { InputReaderInterface } from "../../2023/util/InputReaderInterface";
import { InputReader } from "../../2023/util/InputReader";
import { InputReaderAsInt } from "../../2023/util/InputReaderAsInt";
import { InputReaderSplit } from "../../2023/util/InputReaderSplit";
import DayBase from "../../2023/days/DayBase";

export default class Day9 extends DayBase {

    convertToBlocks(input:number[]):string[] {
        let isFile = true;
        let fileId = 0;
        const memory = [];
        for (let num of input) {
            for (let i = 0; i < num; i++) {
                memory.push(isFile ? String(fileId) : '.');
            }
            if (isFile) fileId++;
            isFile = !isFile;
        }
        return memory;
    }

    calculateChecksum(memory:string[]): number {
        let total = 0;
        for (let i = 0; i < memory.length; i++) {
            if (memory[i] == '.') continue;
            total += i * Number(memory[i]);
        }
        return total;
    }

    runPartOne(input: number[]): string {
        let memory = this.convertToBlocks(input);
        let leftPointer = memory.indexOf('.');
        let rightPointer = memory.length - 1;
        while (leftPointer != rightPointer) {
            if (memory[rightPointer] == '.') {
                rightPointer--;
                continue;
            }
            if (memory[leftPointer] != '.') {
                leftPointer++;
                continue;
            }
            let temp = memory[leftPointer];
            memory[leftPointer] = memory[rightPointer];
            memory[rightPointer] = temp;
        }
        return this.calculateChecksum(memory).toString();
    }

    getGapLength(memory: string[], startIdx: number): number {
        let type = memory[startIdx];
        let i = startIdx;
        while(i < memory.length && memory[i] == type) {
            i++;
        }
        let length = (i - startIdx);
        return length;
    }

    performSwap(memory: string[], gapStart: number, fileStart: number) {
        const fileId = memory[fileStart]
        let fileIdx = fileStart;
        let gapIdx = gapStart;
        while(memory[fileIdx] == fileId) {
            memory[gapIdx] = fileId;
            memory[fileIdx] = '.';
            fileIdx += 1;
            gapIdx += 1;
        }
    }

    runPartTwo(input: number[]): string {
        const memory = this.convertToBlocks(input);
        const startFileId = Number(memory.at(-1));
        for (let fileId = startFileId; fileId > 0; fileId--) {
            let startIdx = memory.indexOf(String(fileId));
            let endIdx = memory.lastIndexOf(String(fileId));
            let length = (endIdx - startIdx) + 1;
            for (let i = 0; i < memory.length; i++) {
                if (memory[i] == String(fileId)) break;
                if (memory[i] !== '.') continue;
                let gapLength = this.getGapLength(memory, i);
                if (gapLength >= length) {
                    this.performSwap(memory, i, startIdx);
                    break;
                }
            }
        }
        return this.calculateChecksum(memory).toString();
    }

    getInputReader(aocClient: AocClient, part: Number, useLocal: boolean): InputReaderInterface {
        let reader = new InputReader(aocClient, useLocal);
        let splitReader = new InputReaderSplit(reader, '');
        let readAsInt = new InputReaderAsInt(splitReader);
        return readAsInt;

    }
}