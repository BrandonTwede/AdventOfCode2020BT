import { AocClient } from "advent-of-code-client";
import { InputReaderInterface } from "../util/InputReaderInterface";
import { InputReader } from "../util/InputReader";
import { InputReaderAsInt } from "../util/InputReaderAsInt";
import { InputReaderSplit } from "../util/InputReaderSplit";
import DayBase from "./DayBase";

export default class Day1 extends DayBase {

    firstDigit(line: string): string {
        for (let c of line) {
            if (parseInt(c)) {
                return c;
            }
        }
    }

    lastDigit(line: string): string {
        for (let i = line.length - 1; i >= 0; i--) {
            if (parseInt(line[i])) {
                return line[i];
            }
        }
    }

    convertWordsToNumsFromFront(line: string): string {
        let lineArray = [];
        let oldLine = line;
        while(line.length > 0) {
            let temp = line;
            if (parseInt(line[0])) {
                return lineArray.join('') + line;
            }
            line = this.replaceAtBeginning(line, 'one', '1');
            line = this.replaceAtBeginning(line, 'two', '2');
            line = this.replaceAtBeginning(line, 'three', '3');
            line = this.replaceAtBeginning(line, 'four', '4');
            line = this.replaceAtBeginning(line, 'five', '5');
            line = this.replaceAtBeginning(line, 'six', '6');
            line = this.replaceAtBeginning(line, 'seven', '7');
            line = this.replaceAtBeginning(line, 'eight', '8');
            line = this.replaceAtBeginning(line, 'nine', '9');
            // line = this.replaceAtBeginning(line, 'zero', '0');

            if (temp.length != line.length) {
                return lineArray.join('') + line;
            }
            lineArray.push(line[0]);
            line = line.slice(1);
        }
        line = lineArray.join('');
        console.log(oldLine, line);
        return line;
    }

    replaceAtBeginning(line: string, num: string, val: string) {
        if (line.startsWith(num)) {
            return line.replace(num, val);
        }
        return line;
    }

    convertWordsToNumsFromBack(line: string): string {
        line = this.reverseString(line);
        let lineArray = [];
        let oldLine = line;
        while(line.length > 0) {
            let temp = line;

            line = this.replaceAtBeginning(line, 'eno', '1');
            line = this.replaceAtBeginning(line, 'owt', '2');
            line = this.replaceAtBeginning(line, 'eerht', '3');
            line = this.replaceAtBeginning(line, 'ruof', '4');
            line = this.replaceAtBeginning(line, 'evif', '5');
            line = this.replaceAtBeginning(line, 'xis', '6');
            line = this.replaceAtBeginning(line, 'neves', '7');
            line = this.replaceAtBeginning(line, 'thgie', '8');
            line = this.replaceAtBeginning(line, 'enin', '9');
            // line = this.replaceAtBeginning(line, 'zero', '0');

            if (temp.length != line.length) {
                return this.reverseString(lineArray.join('') + line);
            }
            lineArray.push(line[0]);
            line = line.slice(1);
        }
        line = lineArray.join('');
        line = this.reverseString(line);
        // console.log(oldLine, line);
        return line;
    }

    reverseString(s: string): string {
        return s.split("").reverse().join("");
    }


    runPartOne(input: any): string {
        // console.log(input);
        let numbers = [];
        for (let line of input) {
            console.log(line);
            console.log(this.firstDigit(line));
            let combined = '' + this.firstDigit(line) + this.lastDigit(line);
            console.log(combined);
            numbers.push(Number(combined));
        }
        // console.log(numbers);
        return String(numbers.reduce((sum, cur) => sum + cur));
    }
    runPartTwo(input: any): string {
        // console.log(input);
        let numbers = [];
        for (let line of input) {
            let oldLine = line;
            line = this.convertWordsToNumsFromFront(line);
            line = this.convertWordsToNumsFromBack(line);
            console.log(oldLine, line);
            let combined = '' + this.firstDigit(line) + this.lastDigit(line);
            console.log(combined);
            numbers.push(Number(combined));
        }
        // console.log(numbers);
        console.log("RAN PART 2");
        return String(numbers.reduce((sum, cur) => sum + cur));
    }
    getInputReader(aocClient: AocClient, part: Number, useLocal: boolean): InputReaderInterface {
        let reader = new InputReader(aocClient, useLocal);
        let splitReader = new InputReaderSplit(reader, '\n');
        return splitReader;

    }
}