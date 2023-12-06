import { AocClient } from "advent-of-code-client";
import { InputReaderInterface } from "../util/InputReaderInterface";
import { InputReader } from "../util/InputReader";
import { InputReaderSplit } from "../util/InputReaderSplit";
import DayBase from "./DayBase";
import { InputReaderAsInt } from "../util/InputReaderAsInt";
import { InputReaderTakeFromArray } from "../util/InputReaderTakeFromArray";

export default class Day4 extends DayBase {
    runPartOne(input: any): string {
        let matchCounts = [];
        for (let card of input) {
            let count = this.countMatches(card[0], card[1]);
            if (count > 0) {
                matchCounts.push(count);
            }
        }
        return String(matchCounts.map((c) => Math.pow(2, c - 1)).reduce((prev, curr) => prev + curr));
    }

    countMatches(ticket : Array<number>, numbers) {
        let count = 0;
        for (let num of numbers) {
            if (ticket.includes(num)) {
                count++;
            }
        }
        return count;
    }


    runPartTwo(input: any): string {
        let matchCounts = [];
        for (let card of input) {
            let count = this.countMatches(card[0], card[1]);
            matchCounts.push(count);
        }
        let cardCopyCount = {} as Map<string, number>;
        for (let i = 0; i < matchCounts.length; i++) {
            if (!cardCopyCount[i]) {
                cardCopyCount[i] = 1;
            }
            let timesWon = matchCounts[i];
            for (let countIdx = i + 1; timesWon > 0 && countIdx < matchCounts.length; timesWon--, countIdx++) {
                if (!cardCopyCount[countIdx]) {
                    cardCopyCount[countIdx] = 1;
                }
                cardCopyCount[countIdx] = cardCopyCount[countIdx] + cardCopyCount[i];
            }
        }
        matchCounts = matchCounts.map((c, idx) => Math.pow(2, c - 1) * cardCopyCount[idx]);
        return String(Object.values(cardCopyCount).reduce((prev, curr) => prev + curr));
    }


    getInputReader(aocClient: AocClient, part: Number, useLocal: boolean): InputReaderInterface {
        let reader = new InputReader(aocClient, useLocal);
        let splitReader = new InputReaderSplit(reader, '\n');
        let splitColon = new InputReaderSplit(splitReader, ': ');
        let takeSecond = new InputReaderTakeFromArray(splitColon, 1);
        let splitBar = new InputReaderSplit(takeSecond, ' | ');
        let splitSpace = new InputReaderSplit(splitBar, ' ');
        let intReader = new InputReaderAsInt(splitSpace);
        return intReader;
    }
}