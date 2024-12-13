import { AocClient } from "advent-of-code-client";
import { InputReaderInterface } from "../util/InputReaderInterface";
import { InputReader } from "../util/InputReader";
import DayBase from "./DayBase";
import { InputReaderSplit } from "../util/InputReaderSplit";

export default class Day4 extends DayBase {

    getXmasCount(input: string[][], x: number, y: number): number {
        let count = 0;
        const stack = [{x, y, currentLetterIdx: 0, xOffset: undefined, yOffset: undefined}];
        const permutations = [-1, 0, 1];
        const word = 'XMAS';
        while(stack.length > 0) {
            const item = stack.pop();
            if (item.x < 0 || item.y < 0 || item.x >= input.length || item.y >= input[item.x].length) {
                continue;
            }
            if (input[item.x][item.y] != word[item.currentLetterIdx]) {
                continue;
            }
            if (item.currentLetterIdx >= word.length - 1) {
                count++;
                continue;
            }
            if (item.xOffset == undefined || item.yOffset == undefined) {
                for (let xOffset of permutations) {
                    for (let yOffset of permutations) {
                        // Search currently can switch directions
                        if (xOffset == 0 && yOffset == 0) continue;
                        stack.push({x: item.x + xOffset, y: item.y + yOffset, xOffset, yOffset, currentLetterIdx: item.currentLetterIdx + 1})
                    }
                }
            } else {
                stack.push({x: item.x + item.xOffset, y: item.y + item.yOffset, xOffset: item.xOffset, yOffset: item.yOffset, currentLetterIdx: item.currentLetterIdx + 1})
            }
        }
        return count;
    }

    getXmasShapeCount(input: string[][], x: number, y: number): number {
        if (input[x][y] != 'A') return 0;
        if (x < 1 || y < 1 || x > input.length - 2 || y > input[x].length - 2) return 0;
        let topLeft = input[x-1][y-1];
        let topRight = input[x-1][y+1];
        let bottomLeft = input[x+1][y-1];
        let bottomRight = input[x+1][y+1];

        const diagonalIsValid = (corner1, corner2) => {
            return ((corner1 == 'M' && corner2 == 'S') || (corner1 == 'S' && corner2 == 'M'));
        }
        if (diagonalIsValid(topLeft, bottomRight) && diagonalIsValid(topRight, bottomLeft)) {
            return 1;
        }
        return 0;
    }

    runPartOne(input: string[][]): string {
        let total = 0;
        for (let i = 0; i < input.length; i++) {
            for (let j = 0; j < input[i].length; j++) {
                total += this.getXmasCount(input, i, j);
            }
        }
        return total.toString();
    }

    runPartTwo(input: string[][]): string {
        let total = 0;
        for (let i = 0; i < input.length; i++) {
            for (let j = 0; j < input[i].length; j++) {
                total += this.getXmasShapeCount(input, i, j);
            }
        }
        return total.toString();
    }

    getInputReader(aocClient: AocClient, part: Number, useLocal: boolean): InputReaderInterface {
        let reader = new InputReader(aocClient, useLocal);
        let splitLines = new InputReaderSplit(reader, '\n');
        let splitChar = new InputReaderSplit(splitLines, '');
        return splitChar;

    }
}