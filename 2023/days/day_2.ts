import { AocClient } from "advent-of-code-client";
import { InputReaderInterface } from "../util/InputReaderInterface";
import { InputReader } from "../util/InputReader";
import { InputReaderTakeFromArray } from "../util/InputReaderTakeFromArray";
import { InputReaderSplit } from "../util/InputReaderSplit";
import DayBase from "./DayBase";
import { InputReaderMap } from "../util/InputReaderMap";

export default class Day2 extends DayBase {
    runPartOne(input: any): string {
        const limits = {
            "red": 12,
            "green": 13,
            "blue": 14
        } as any;
        let possibleGames = [];
        for (let gameNum = 0; gameNum < input.length; gameNum++) {
            if (this.gameIsPossible(input[gameNum], limits)) {
                possibleGames.push(gameNum + 1);
            }
        }
        return String(possibleGames.reduce((prev, curr) => prev + curr));
    }

    gameIsPossible(game: Array<Map<string, number>>, limits: Map<string, number>) : boolean {
        for (let round of game) {
            if (!this.roundIsPossible(round, limits)) {
                return false
            }
        }
        return true;
    }

    roundIsPossible(round: Map<string, number>, limits: Map<string, number>) : boolean {
        for (let color in limits) {
            if (limits[color] < (round[color] || 0)) {
                return false;
            }
        }
        return true;
    }

    runPartTwo(input: any): string {
        let gamePowers = [];
        for (let game of input) {
            let redMax = this.findMaxCubeUsageInGame(game, 'red');
            let greenMax = this.findMaxCubeUsageInGame(game, 'green');
            let blueMax = this.findMaxCubeUsageInGame(game, 'blue');
            gamePowers.push(redMax * greenMax * blueMax);
        }
        return String(gamePowers.reduce((prev, curr) => prev + curr));
    }

    findMaxCubeUsageInGame(game: Array<Map<string, number>>, color: string) : number {
        let roundCounts = game.map(function(round) { return round[color] || 0});
        Math.max(...roundCounts);
        Math.max(3, 5, 8, 2);


        roundCounts = [];
        for (let i = 0; i < game.length; i++) {
            let round = game[i];
            roundCounts.push(round[color] || 0);
        }
        let maxCount = Math.max(...roundCounts);


        let cubeRoundCounts = [];
        for (let round of game) {
            cubeRoundCounts.push(round[color] || 0);
        }
        return Math.max(...cubeRoundCounts);
    }

    getInputReader(aocClient: AocClient, part: Number, useLocal: boolean): InputReaderInterface {
        let reader = new InputReader(aocClient, useLocal);
        let splitReader = new InputReaderSplit(reader, '\n');
        let splitReaderColon = new InputReaderSplit(splitReader, ':');
        let takeSecond = new InputReaderTakeFromArray(splitReaderColon, 1);
        let makeMap = new InputReaderMap(takeSecond, (v: string, i) => {
            let rounds = v.split(';');
            let result = [];
            for (let r of rounds) {
                let cubes = {};
                for (let c of r.split(',')) {
                    c = c.trim();
                    let parts = c.split(' ');
                    cubes[parts[1]] = parts[0];
                }
                result.push(cubes);
            }
            return result;
        });
        return makeMap;
    }
}