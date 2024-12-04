import { AocClient } from "advent-of-code-client";
import { InputReaderInterface } from "../util/InputReaderInterface";
import { InputReader } from "../util/InputReader";
import { InputReaderSplit } from "../util/InputReaderSplit";
import DayBase from "./DayBase";
import { InputReaderAsInt } from "../util/InputReaderAsInt";

export default class Day2 extends DayBase {

    isAllIncreasing(input: number[]): boolean {
        for (let i = 1; i < input.length; i++) {
            if (input[i] <= input[i - 1]) {
                return false;
            }
        }
        return true;
    }

    isAllDecreasing(input: number[]): boolean {
        for (let i = 1; i < input.length; i++) {
            if (input[i] >= input[i - 1]) {
                return false;
            }
        }
        return true;
    }

    checkIntervals(input: number[]): boolean {
        for (let i = 1; i < input.length; i++) {
            let num0 = input[i - 1];
            let num1 = input[i];
            let diff = Math.abs(num0 - num1);
            if (diff < 1 || diff > 3) {
                return false;
            }
        }
        return true;
    }

    reportIsSafe(report: number[]) { 
        return (this.isAllIncreasing(report) || this.isAllDecreasing(report)) && this.checkIntervals(report)
    }

    getSafeAndUnsafeReports(reports: number[][]): {safe: number[][], unsafe: number[][]} {
        let safeLevels = [];
        let unsafeLevels = [];
        for (let report of reports) {
            if (this.reportIsSafe(report)) {
                safeLevels.push(report);
            } else {
                unsafeLevels.push(report);
            }
        }
        return {safe: safeLevels, unsafe: unsafeLevels};
    }

    runPartOne(input: number[][]): string {
        const safeReports = this.getSafeAndUnsafeReports(input).safe;
        return safeReports.length.toString();
    }

    runPartTwo(input: number[][]): string {
        const reports = this.getSafeAndUnsafeReports(input);
        for (let report of reports.unsafe) {
            for (let i = 0; i < report.length; i++) {
                let reportCopy = [...report];
                reportCopy.splice(i, 1);
                if (this.reportIsSafe(reportCopy)) {
                    reports.safe.push(reportCopy);
                    break;
                }
            }
        }
        return reports.safe.length.toString();
    }

    getInputReader(aocClient: AocClient, part: Number, useLocal: boolean): InputReaderInterface {
        let reader = new InputReader(aocClient, useLocal);
        let splitReader = new InputReaderSplit(reader, '\n');
        let splitLine = new InputReaderSplit(splitReader, ' ');
        let intReader = new InputReaderAsInt(splitLine);
        return intReader;

    }
}