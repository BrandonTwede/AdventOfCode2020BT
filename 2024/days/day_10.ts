import { AocClient } from "advent-of-code-client";
import { InputReaderInterface } from "../../2023/util/InputReaderInterface";
import { InputReader } from "../../2023/util/InputReader";
import { InputReaderAsInt } from "../../2023/util/InputReaderAsInt";
import { InputReaderSplit } from "../../2023/util/InputReaderSplit";
import DayBase from "../../2023/days/DayBase";

type coordinate = {
    x: number,
    y: number
}

function uniqBy(a, key) {
    var seen = {};
    return a.filter(function(item) {
        var k = key(item);
        return seen.hasOwnProperty(k) ? false : (seen[k] = true);
    })
}

export default class Day10 extends DayBase {

    followTrailRecursive(map:number[][], pos: coordinate): coordinate[] {
        let current = map[pos.x][pos.y];
        if (current == 9) return [pos];
        let next = current + 1;
        let peaks = [];
        if (pos.x > 0 && map[pos.x - 1][pos.y] == next) peaks.push(...this.followTrailRecursive(map, {x:pos.x - 1, y:pos.y}));
        if (pos.x < map.length - 1 && map[pos.x + 1][pos.y] == next) peaks.push(...this.followTrailRecursive(map, {x:pos.x + 1, y:pos.y}));
        if (pos.y > 0 && map[pos.x][pos.y - 1] == next) peaks.push(...this.followTrailRecursive(map, {x:pos.x, y:pos.y - 1}));
        if (pos.y < map[pos.x].length - 1 && map[pos.x][pos.y + 1] == next) peaks.push(...this.followTrailRecursive(map, {x:pos.x, y:pos.y + 1}));
        
        return peaks;
    }

    countTrails(map:number[][], unique = false) {
        let peaksFound = [];
        for (let x = 0; x < map.length; x++) {
            for (let y = 0; y < map[x].length; y++) {
                if (map[x][y] === 0) {
                    let trails = this.followTrailRecursive(map, {x,y});
                    if (unique) trails = uniqBy(trails, JSON.stringify);
                    peaksFound.push(trails);
                }
            }
        }
        return peaksFound;
    }

    runPartOne(input: number[][]): string {
        let peaksFound = this.countTrails(input, true);
        let peakScoreSum = peaksFound.map(l => l.length).reduce((p, c) => {return p + c}, 0);
        return peakScoreSum.toString();
    }


    runPartTwo(input: number[][]): string {
        let peaksFound = this.countTrails(input, false);
        let peakScoreSum = peaksFound.map(l => l.length).reduce((p, c) => {return p + c}, 0);
        return peakScoreSum.toString();
    }

    getInputReader(aocClient: AocClient, part: Number, useLocal: boolean): InputReaderInterface {
        let reader = new InputReader(aocClient, useLocal);
        let splitLine = new InputReaderSplit(reader, '\n');
        let splitChar = new InputReaderSplit(splitLine, '');
        let readAsInt = new InputReaderAsInt(splitChar);
        return readAsInt;
    }
}