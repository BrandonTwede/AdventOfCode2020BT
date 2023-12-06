import { AocClient } from "advent-of-code-client";
import { InputReaderInterface } from "../util/InputReaderInterface";
import { InputReader } from "../util/InputReader";
import { InputReaderSplit } from "../util/InputReaderSplit";
import DayBase from "./DayBase";
import { InputReaderAsInt } from "../util/InputReaderAsInt";
import { InputReaderTakeFromArray } from "../util/InputReaderTakeFromArray";
import { InputReaderMap } from "../util/InputReaderMap";

type MapRule = {
    min: number,
    max: number,
    difference: number
}

export default class Day5 extends DayBase {
    runPartOne(input: any): string {
        console.log(input.maps);
        let locations = [];

        for (let seed of input.seeds) {
            locations.push(this.followMapChain(input.maps, seed));
        }
        // console.log(locations);
        return String(Math.min(...locations));
    }

    followMapChain(maps: Array<Array<MapRule>>, seed: number) {
        let current = seed;
        for (let rules of maps) {
            for (let rule of rules) {
                if (current >= rule.min && current < rule.max) {
                    current = current + rule.difference;
                    break;
                }
            }
            // console.log(current);
        }
        return current;
    }

    runPartTwo(input: any): string {
        // console.log(input.maps);
        let lowest = Number.MAX_VALUE;
        for (let i = 0; i < input.seeds.length; i += 2) {
            let range = input.seeds[i+1];
            console.log(range);
            for (let j = 0; j < range; j++) {
                let seed = input.seeds[i] + j;
                // console.log(seed);
                let location = this.followMapChain(input.maps, seed);
                if (location < lowest) {
                    lowest = location;
                }
            }
            
        }
        return String(lowest);
    }

    makeMapFromRanges(inputRows: Array<string>): Array<MapRule> {
        let rules = [] as Array<MapRule>;
        inputRows.shift(); // Remove header row
        // console.log(inputRows);
        for (let row of inputRows) {
            let split = row.split(' ').map((n)=> Number(n));
            let dest=split[0], src=split[1], length=split[2];
            rules.push({
                min: src,
                max: src + length,
                difference: dest-src
            });
        }
        return rules;
    }

    getInputReader(aocClient: AocClient, part: Number, useLocal: boolean): InputReaderInterface {
        let reader = new InputReader(aocClient, useLocal);
        let splitReader = new InputReaderSplit(reader, '\n\n');
        let makeMap = new InputReaderMap(reader, (input: string, i) => {
            let v = input.split('\n\n');
            // console.log(v);
            let seeds = v[0].split(': ')[1].split(' ').map((i) => Number(i));
            let resultMaps = [];
            for (let i = 1; i < v.length; i++) {
                resultMaps.push(this.makeMapFromRanges(v[i].split('\n')));
            }
            return { seeds, maps: resultMaps};
        });
        return makeMap;
    }
}