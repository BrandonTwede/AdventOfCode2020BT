import { AocClient } from "advent-of-code-client";
import { InputReaderInterface } from "../../2023/util/InputReaderInterface";
import { InputReader } from "../../2023/util/InputReader";
import { InputReaderAsInt } from "../../2023/util/InputReaderAsInt";
import { InputReaderSplit } from "../../2023/util/InputReaderSplit";
import DayBase from "../../2023/days/DayBase";

export default class Day7 extends DayBase {

    operation(a: bigint, b: bigint, operator: string) {
        switch(operator) {
            case '*':
                return a * b;
            case '+':
                return a + b;
            case '||':
                return BigInt(a.toString() + b.toString());

            default:
                console.log("INVALID OPERATOR", operator);
                throw Error('invalid operator');
        }
    }

    performMath(numbers: (number|bigint)[], operators: string[], target:bigint): bigint {
        if (operators.length != numbers.length - 1) throw Error('invalid number of operators');
        while(numbers.length > 1) {
            let a = numbers.shift();
            let b = numbers.shift();
            let operator = operators.shift();
            let result = this.operation(BigInt(a), BigInt(b), operator);
            if (result > target) return null;
            numbers.unshift(result);
        }
        return BigInt(numbers[0]);
    }

    makeOperatorList(val: number, length: number, possibleOperators: string[]) {
        let binary = val.toString(possibleOperators.length).padStart(length, '0').split('');
        for (let i = 0; i < possibleOperators.length; i++) {
            let operator = possibleOperators[i];
            binary = binary.map(c => c === String(i) ? operator: c);
            // binary = binary.replaceAll(String(i), operator);
        }
        return binary;
    }

    isMathPossible(equation: number[][], possibleOperators: string[]) {
        let target = BigInt(equation[0][0]);
        let numbers = equation[1];
        const operatorCount = numbers.length - 1;
        for (let i = 0; i <= Infinity; i++) {
            let operators = this.makeOperatorList(i, operatorCount, possibleOperators);
            if (operators.length > operatorCount) break;
            
            let result = this.performMath([...numbers], operators, target);
            if (result === target) return true;
        }
        return false;
    }

    totalValidEquations(input: number[][][], possibleOperators: string[]):bigint {
        let total = BigInt(0);
        for (let row of input) {
            if (this.isMathPossible(row, possibleOperators)) {
                total = total + BigInt(row[0][0]);
            }
        }
        return total;
    }


    runPartOne(input: number[][][]): string {
        return this.totalValidEquations(input, ['+','*']).toString();
    }

    runPartTwo(input: number[][][]): string {
        return this.totalValidEquations(input, ['+','*','||']).toString();
    }
    getInputReader(aocClient: AocClient, part: Number, useLocal: boolean): InputReaderInterface {
        let reader = new InputReader(aocClient, useLocal);
        let splitReader = new InputReaderSplit(reader, '\n');
        let splitColon = new InputReaderSplit(splitReader, ': ');
        let splitSpace = new InputReaderSplit(splitColon, ' ');
        let readAsInt = new InputReaderAsInt(splitSpace);
        return readAsInt;

    }
}