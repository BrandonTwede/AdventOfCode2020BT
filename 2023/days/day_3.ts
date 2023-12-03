import { AocClient } from "advent-of-code-client";
import { InputReaderInterface } from "../util/InputReaderInterface";
import { InputReader } from "../util/InputReader";
import { InputReaderSplit } from "../util/InputReaderSplit";
import DayBase from "./DayBase";

export default class Day2 extends DayBase {
    
    combineSets(set : Array<number>, ...iterables) {
        for (const iterable of iterables) {
            for (const item of iterable) {
                set.push(item);
            }
        }
        return set;
    }

    runPartOne(input: any): string {
        let partNumbers = [];
        for (let y = 0; y < input.length; y++) {
            for (let x = 0; x < input[y].length; x++) {
                if (this.isSymbol(input[y][x])) {
                    partNumbers = this.combineSets(partNumbers, Array.from(this.checkAdjacentSpots(input, y, x)))
                }
            }
        }
        let result = String(Array.from(partNumbers).reduce((prev, curr) => prev + curr));
        return result;
    }

    checkAdjacentSpots(input: Array<string>, lineIdx: number, colIdx: number) :Set<number> {
        let transform = [-1, 0, 1];
        let numbersFound = new Set() as Set<number>;
        for (let y of transform) {
            y = lineIdx + y;
            for (let x of transform) {
                x = colIdx + x;
                if (y >= 0 && y < input.length && x >= 0 && x < input[y].length) {
                    if (this.isNumber(input[y][x])) {
                        numbersFound.add(this.findRestOfNumber(input[y], x));
                    }
                }
            }
        }
        return numbersFound;
    }

    findRestOfNumber(line: string, index) : number {
        let minIndex = index;
        let maxIndex = index;
        while (true) {
            if (!this.isNumber(line[minIndex])) {
                break;
            }
            minIndex--;
        }
        while (true) {
            if (!this.isNumber(line[maxIndex])) {
                break;
            }
            maxIndex++;
        }
        return parseInt(line.substring(minIndex + 1, maxIndex));
    }

    isNumber(char) {
        if (!char) return false;
        return char.match(/[0-9]/);
    }

    isSymbol(char) {
        if (!char) return false;
        return !char.match(/[0-9]|\./);
    }

    isGear(char) {
        if (!char) return false;
        return char == '*';
    }

    runPartTwo(input: any): string {
        let gearRatios = [];
        for (let y = 0; y < input.length; y++) {
            for (let x = 0; x < input[y].length; x++) {
                if (this.isGear(input[y][x])) {
                    // console.log(input[y], x);
                    let adjacentNumbers = Array.from(this.checkAdjacentSpots(input, y, x));
                    if (adjacentNumbers.length == 2) {
                        gearRatios.push(adjacentNumbers[0] * adjacentNumbers[1]);
                    }
                }
            }
        }
        let result = String(Array.from(gearRatios).reduce((prev, curr) => prev + curr));
        return result;
    }


    getInputReader(aocClient: AocClient, part: Number, useLocal: boolean): InputReaderInterface {
        let reader = new InputReader(aocClient, useLocal);
        let splitReader = new InputReaderSplit(reader, '\n');
        return splitReader;
    }
}