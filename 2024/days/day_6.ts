import { AocClient } from "advent-of-code-client";
import { InputReaderInterface } from "../util/InputReaderInterface";
import { InputReader } from "../util/InputReader";
import DayBase from "./DayBase";
import { InputReaderSplit } from "../util/InputReaderSplit";

type direction = 'up' | 'down' | 'left' | 'right';
const directionOrder = ['up', 'right', 'down', 'left'] as direction[];

export default class Day6 extends DayBase {

    grid : string[][];

    guard = {
        currentX: 0,
        currentY: 0,
        direction: 'up' as direction,
        visitedSpaces: new Set() as Set<string>,
        path: [],
        retreadCount: 0,
        advance: () => {
            let nextX = this.guard.currentX, nextY = this.guard.currentY;
            if (this.guard.visitedSpaces.has(`${nextX},${nextY}`)) {
                this.guard.retreadCount += 1;
            } else {
                this.guard.retreadCount = 0;
            }

            this.guard.visitedSpaces.add(`${nextX},${nextY}`);
            this.guard.path.push(`${nextX},${nextY}`);
            switch(this.guard.direction) {
                case 'up':
                    nextX -= 1;
                    break;
                case 'down':
                    nextX += 1;
                    break;
                case 'right':
                    nextY += 1;
                    break;
                case 'left':
                    nextY -= 1;
                    break;
            }
            if (this.grid[nextX]?.[nextY] == '#') {
                let dir = this.guard.direction;
                this.guard.direction = directionOrder[(directionOrder.indexOf(dir) + 1)%directionOrder.length];
                nextX = this.guard.currentX;
                nextY = this.guard.currentY;
            }

            this.guard.currentX = nextX;
            this.guard.currentY = nextY;
        }
    }

    getGuardStartPosition(input: string[][]) {
        for (let x = 0 ; x < input.length; x++) {
            for (let y = 0; y < input.length; y++) {
                if (input[x][y] == '^') return {x, y}
            }
        }
        throw Error ('guard not found in input');
    }

    guardIsInBounds(input: string[][]) {
        return this.guard.currentX > 0
            && this.guard.currentY > 0
            && this.guard.currentX < input.length
            && this.guard.currentY < input[this.guard.currentX].length
    }

    printPath(input: string[][]) {
        for (let x = 0 ; x < input.length; x++) {
            let line = '';
            for (let y = 0; y < input.length; y++) {
                line += input[x][y] != '^' && this.guard.visitedSpaces.has(`${x},${y}`) ? 'X' : input[x][y];
            }
            console.log(line);
        }
    }

    runPartOne(input: string[][]): string {
        this.grid = JSON.parse(JSON.stringify(input));
        let {x, y} = this.getGuardStartPosition(input);
        this.guard.currentX = x;
        this.guard.currentY = y;
        let loopCount = 0
        while (this.guardIsInBounds(input) && loopCount < 50000) {
            this.guard.advance();
            loopCount++;
        }

        this.printPath(input);
        return this.guard.visitedSpaces.size.toString();
    }


    loopFound() {
        let loopCount = 0;
        const loopLimit = 50000;
        while (this.guardIsInBounds(this.grid) && loopCount < loopLimit) {
            this.guard.advance();
            loopCount++;
            if (this.guard.retreadCount > 1000) return true;
        }
        if (loopCount >= loopLimit) throw Error('loop limit reached');
        return false;
    }

    runPartTwo(input: string[][]): string {
        this.grid = JSON.parse(JSON.stringify(input));
        let {x, y} = this.getGuardStartPosition(input);
        this.guard.currentX = x;
        this.guard.currentY = y;
        let loopCount = 0
        while (this.guardIsInBounds(input) && loopCount < 50000) {
            this.guard.advance();
            loopCount++;
        }
        
        const initialVisitedSpaces = new Set([...this.guard.visitedSpaces]);
        const loopObstaclePositions = new Set();
        let obstacleCheckCount = 0;
        for (let pos of initialVisitedSpaces) {
            if(obstacleCheckCount % 1000 == 0) {
                console.log("Progress: " + Math.trunc(obstacleCheckCount / initialVisitedSpaces.size * 100) + "%");
            }
            let obstacleX = Number(pos.split(',')[0]);
            let obstacleY = Number(pos.split(',')[1]);
            this.grid = JSON.parse(JSON.stringify(input));
            let {x, y} = this.getGuardStartPosition(input);
            this.guard.currentX = x;
            this.guard.currentY = y;
            this.guard.retreadCount = 0;
            this.guard.direction= 'up';
            this.guard.visitedSpaces = new Set() as Set<string>;
            this.guard.path= [];
            obstacleCheckCount++;
            if (obstacleX == x && obstacleY == y) {
                continue;
            }
            this.grid[obstacleX][obstacleY] = '#'
            if (this.loopFound()) {
                loopObstaclePositions.add(pos);
            }
        }

        return loopObstaclePositions.size.toString();
    }

    getInputReader(aocClient: AocClient, part: Number, useLocal: boolean): InputReaderInterface {
        let reader = new InputReader(aocClient, useLocal);
        let splitLines = new InputReaderSplit(reader, '\n');
        let splitChar = new InputReaderSplit(splitLines, '');
        return splitChar;
    }
}