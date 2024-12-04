import { AocClient } from "advent-of-code-client";
import { InputReaderInterface } from "../util/InputReaderInterface";

export interface DayInterface {
    getInputReader(aocClient: AocClient, part: number, useLocal: boolean): InputReaderInterface;
    run(part: number, input:any): string;
    runPartOne(input: any): string;
    runPartTwo(input: any): string;
}