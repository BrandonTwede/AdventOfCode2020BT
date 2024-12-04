import { AocClient } from "advent-of-code-client";
import { InputReaderInterface } from "../util/InputReaderInterface";
import { DayInterface } from "./DayInterface";

export default class Day1 implements DayInterface {
    runPartOne(input: any): string {
        throw new Error("Method not implemented.");
    }
    runPartTwo(input: any): string {
        throw new Error("Method not implemented.");
    }
    getInputReader(aocClient: AocClient, part: Number, useLocal: boolean): InputReaderInterface {
        throw new Error("Method not implemented.");
    }
    run(part:number, input: any): string {
        if (part === 1) {
            return this.runPartOne(input);
        }
        if (part === 2) {
            return this.runPartTwo(input);
        }
        
    }
    
}