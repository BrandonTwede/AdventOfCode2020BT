import { AocClient } from "advent-of-code-client";
import { InputReaderInterface } from "../util/InputReaderInterface";
import { InputReader } from "../util/InputReader";
import DayBase from "./DayBase";

export default class Day3 extends DayBase {

    runPartOne(input: string): string {
        let pattern = /mul\(\d+,\d+\)/g;
        let matches = input.match(pattern);
        let products = matches.map((m) => {
            let nums = m.match(/\d+/g);
            return Number(nums[0]) * Number(nums[1]);
        });
        let sum = products.reduce((a, b) => a + b, 0);
        return sum.toString();
    }

    runPartTwo(input: string): string {
        let pattern = /(mul\(\d+,\d+\))|(do\(\))|(don\'t\(\))/g;
        let matches = input.match(pattern);
        let instructionsEnabled = true;
        let products = matches.map((m) => {
            if (m == "do()") {
                instructionsEnabled = true;
                return 0;
            } else if (m == "don't()") {
                instructionsEnabled = false;
                return 0;
            } 
            if (!instructionsEnabled) {
                return 0;
            }
            let nums = m.match(/\d+/g);
            return Number(nums[0]) * Number(nums[1]);
        });
        let sum = products.reduce((a, b) => a + b, 0);
        return sum.toString();
    }

    getInputReader(aocClient: AocClient, part: Number, useLocal: boolean): InputReaderInterface {
        let reader = new InputReader(aocClient, useLocal);
        return reader;

    }
}