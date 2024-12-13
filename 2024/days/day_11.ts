import { AocClient } from "advent-of-code-client";
import { InputReaderInterface } from "../../2023/util/InputReaderInterface";
import { InputReader } from "../../2023/util/InputReader";
import { InputReaderAsInt } from "../../2023/util/InputReaderAsInt";
import { InputReaderSplit } from "../../2023/util/InputReaderSplit";
import DayBase from "../../2023/days/DayBase";


export default class Day11 extends DayBase {

    applyRulesToRock(rock: number): number[] {
        if (rock === 0) return [1];
        const rockText = String(rock);
        if ((rockText.length % 2) === 0) {
            return [
                Number(rockText.substring(0, rockText.length / 2)),
                Number(rockText.substring(rockText.length / 2))
            ];
        }
        return [rock * 2024];
    }

    // Inefficient naïve approach, runs out of memory for blink counts > ~40
    runPartOne(input: number[]): string {
        let blinkCount = 25;
        let rocks = [...input];
        for (let i = 0; i < blinkCount; i++) {
            let nextRocks = [];
            for (let rock of rocks) {
                nextRocks.push(...this.applyRulesToRock(rock));
            }
            rocks = nextRocks;
        }
        return rocks.length.toString();
    }

    // More efficient solution
    runPartTwo(input: number[]): string {
        let blinkCount = 75;
        let rockList = new Map() as Map<number, number>;
        for (let rock of input) {
            rockList.set(rock, 1);
        }

        for (let i = 0; i < blinkCount; i++) {
            let nextRocks = new Map() as Map<number, number>;
            for (let rock of rockList.keys()) {
                let newRocks = this.applyRulesToRock(rock);
                for (let newRock of newRocks) {
                    if (!nextRocks.has(newRock)) {
                        nextRocks.set(newRock, 0);
                    }
                    nextRocks.set(newRock, nextRocks.get(newRock) + rockList.get(rock));
                }
            }
            rockList = nextRocks;
        }

        let sum = [...rockList.values()].reduce((p, c) => p+c, 0);
        return sum.toString();
    }

    getInputReader(aocClient: AocClient, part: Number, useLocal: boolean): InputReaderInterface {
        let reader = new InputReader(aocClient, useLocal);
        let splitSpace = new InputReaderSplit(reader, ' ');
        let readAsInt = new InputReaderAsInt(splitSpace);
        return readAsInt;
    }
}