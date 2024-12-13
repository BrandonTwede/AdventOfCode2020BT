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

export default class Day8 extends DayBase {

    findNodesInInput(input:string[][]) {
        let results = {} as {[key:string]:coordinate[]};
        for (let x = 0; x < input.length; x++) {
            for (let y = 0; y < input[x].length; y++) {
                if(input[x][y] === '.') continue;
                let coordinate = { x, y };
                let node = input[x][y];
                if (!(node in results)) results[node] = [];
                results[node].push(coordinate);
            }
        }
        return results;
    }

    calculateAntinodes(coordinates: coordinate[], input:string[][], includeHarmonics = false) {
        let antinodes = [];
        for (let i = 0; i < coordinates.length; i++) {
            for (let j = i + 1; j < coordinates.length; j++) {
                let c1 = coordinates[i];
                let c2 = coordinates[j];
                let xDist = Math.abs(c1.x - c2.x);
                let yDist = Math.abs(c1.y - c2.y);
                let iterCount = 1;
                let a;
                do {
                    a = {
                        x: c1.x < c2.x ? Math.min(c1.x, c2.x) - (xDist * iterCount) : Math.max(c1.x, c2.x) + (xDist * iterCount),
                        y: c1.y < c2.y ? Math.min(c1.y, c2.y) - (yDist * iterCount) : Math.max(c1.y, c2.y) + (yDist * iterCount)
                    };
                    antinodes.push(a);
                    iterCount++
                    if (!includeHarmonics) break;
                } while(a.x >= 0 && a.x < input.length && a.y >= 0 && a.y < input[a.x].length);
                iterCount = 1;
                do{
                    a = {
                        x: c1.x < c2.x ? Math.max(c1.x, c2.x) + (xDist * iterCount) : Math.min(c1.x, c2.x) - (xDist * iterCount),
                        y: c1.y < c2.y ? Math.max(c1.y, c2.y) + (yDist * iterCount) : Math.min(c1.y, c2.y) - (yDist * iterCount)
                    };
                    antinodes.push(a);
                    iterCount++;
                    if (!includeHarmonics) break;
                } while(a.x >= 0 && a.x < input.length && a.y >= 0 && a.y < input[a.x].length)
            }
        }
        if (includeHarmonics) antinodes.push(...coordinates);
        return antinodes.filter((a) => a.x >= 0 && a.x < input.length && a.y >= 0 && a.y < input[a.x].length);
    }

    runPartOne(input: string[][]): string {
        const nodeLocations = this.findNodesInInput(input);
        let antinodes = [];
        for (let key in nodeLocations) {
            antinodes.push(...this.calculateAntinodes(nodeLocations[key], input));
        }
        let unique = new Set(antinodes.map(a => `${a.x},${a.y}`));
        return unique.size.toString();
    }

    runPartTwo(input: string[][]): string {
        const nodeLocations = this.findNodesInInput(input);
        let antinodes = [];
        for (let key in nodeLocations) {
            antinodes.push(...this.calculateAntinodes(nodeLocations[key], input, true));
        }
        let unique = new Set(antinodes.map(a => `${a.x},${a.y}`));
        return unique.size.toString();
    }
    getInputReader(aocClient: AocClient, part: Number, useLocal: boolean): InputReaderInterface {
        let reader = new InputReader(aocClient, useLocal);
        let splitReader = new InputReaderSplit(reader, '\n');
        let charReader = new InputReaderSplit(splitReader, '');
        return charReader;

    }
}