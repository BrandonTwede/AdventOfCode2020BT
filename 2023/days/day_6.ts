import { AocClient } from "advent-of-code-client";
import { InputReaderInterface } from "../util/InputReaderInterface";
import { InputReader } from "../util/InputReader";
import { InputReaderSplit } from "../util/InputReaderSplit";
import DayBase from "./DayBase";
import { InputReaderTakeFromArray } from "../util/InputReaderTakeFromArray";
import { InputReaderDoFunc } from "../util/InputReaderDoFunc";

type Race = {
    t: number,
    d: number
}

export default class Day6 extends DayBase {
    runPartOne(input: any): string {
        let total = 1;
        for (let race of input) {
            total *= this.calculateWinningHoldDurations(race);
        }
        
        return String(total);
    }

    calculateWinningHoldDurations(race: Race) {
        let startDuration = 0; 
        let speed = 0;
        while ((race.t - startDuration) * speed <= race.d) {
            startDuration++;
            speed++;
        }
        speed = race.t;
        let endDuration = race.t;
        while((race.t - endDuration) * speed <= race.d) {
            endDuration--;
            speed--;
        }
        return endDuration - startDuration + 1;
    }

    runPartTwo(input: any): string {
        return String(this.calculateWinningHoldDurations(input));
    }

    getInputReader(aocClient: AocClient, part: Number, useLocal: boolean): InputReaderInterface {
        let reader = new InputReader(aocClient, useLocal);
        let splitReader = new InputReaderSplit(reader, '\n');
        let colonSplit = new InputReaderSplit(splitReader, ':');
        let takeSecond = new InputReaderTakeFromArray(colonSplit, 1);
        let splitSpace = new InputReaderSplit(takeSecond, ' ');
        let makeMap = new InputReaderDoFunc(splitSpace, (input) => {
            if (part == 1) {
                let races = [] as Array<Race>;
                for (let i = 0; i < input[0].length; i++) {
                    races.push({ t: parseInt(input[0][i]), d: parseInt(input[1][i])});
                }
                return races;
            }
            return { t: parseInt(input[0].join('')), d: parseInt(input[1].join(''))} as Race;
        });
        return makeMap;
    }
}