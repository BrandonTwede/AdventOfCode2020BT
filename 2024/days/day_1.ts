import { AocClient } from "advent-of-code-client";
import { InputReaderInterface } from "../util/InputReaderInterface";
import { InputReader } from "../util/InputReader";
import { InputReaderSplit } from "../util/InputReaderSplit";
import DayBase from "./DayBase";
import { InputReaderDoFunc } from "../util/InputReaderDoFunc";

export default class Day1 extends DayBase {

    runPartOne(input: number[][]): string {
        input[0].sort();
        input[1].sort();
        const distances = [];
        for (let i = 0; i < input[0].length; i++) {
            distances.push(Math.abs(input[0][i] - input[1][i]));
        }
        let sum = distances.reduce((a, b) => a + b, 0);
        return sum.toString();
    }

    runPartTwo(input: number[][]): string {
        let numOccurrance = new Map<number, number>();
        for (let i = 0; i < input[1].length; i++) {
            let num = input[1][i];
            if (numOccurrance.has(num)) {
                numOccurrance.set(num, numOccurrance.get(num) + 1);
            } else {
                numOccurrance.set(num, 1);
            }
        }
        let similarityScore = 0;
        for (let num of input[0]) {
            if (!numOccurrance.has(num)) continue;
            similarityScore += num * numOccurrance.get(num);
        }
        return similarityScore.toString();
    }

    getInputReader(aocClient: AocClient, part: Number, useLocal: boolean): InputReaderInterface {
        let reader = new InputReader(aocClient, useLocal);
        let splitReader = new InputReaderSplit(reader, '\n');
        let splitLine = new InputReaderSplit(splitReader, '   ');
        let listCombine = new InputReaderDoFunc(splitLine, (input) => {
            const list1 = [];
            const list2 = [];
            for(let line of input) {
                list1.push(Number(line[0]));
                list2.push(Number(line[1]));
            }
            return [list1, list2];
        });
        return listCombine;

    }
}