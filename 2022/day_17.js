
class Coord {
    constructor(x, y) {
        this.x = Number(x);
        this.y = Number(y);
    }

    toString() {
        return `${this.x},${this.y}`;
    }
}

const line = [new Coord(0, 0), new Coord(1, 0), new Coord(2, 0), new Coord(3, 0)];
const plus = [new Coord(1, 0), new Coord(0, 1), new Coord(1, 1), new Coord(2, 1), new Coord(1, 2)];
const ell = [new Coord(0, 0), new Coord(1, 0), new Coord(2, 0), new Coord(2, 1), new Coord(2, 2)];
const vLine = [new Coord(0, 0), new Coord(0, 1), new Coord(0, 2), new Coord(0, 3)];
const square = [new Coord(0,0), new Coord(0,1), new Coord(1,0), new Coord(1,1)];
const blockList = [line, plus, ell, vLine, square];

let maxHeight = -1;
let caveWidth = 7;
let recentBlockList = [];
let highestY = -1;

function getNext(list, step) {
    return list[step % list.length];
}

function isValidPos(cave, block, blockPos) {
    for (let c of block) {
        let pos = new Coord(c.x + blockPos.x, c.y + blockPos.y);
        if (pos.x < 0 || pos.x >= caveWidth || pos.y < 0) {
            return false;
        }
        if (pos.toString() in cave) {
            return false;
        }
    }
    return true;
}

function dropBlock(cave, block, jets, startStep) {
    let startPos = new Coord(2, maxHeight + 4);
    let blockAtRest = false;
    let prevPos = new Coord(startPos.x, startPos.y);
    let currPos = new Coord(prevPos.x, prevPos.y);
    let currStep = startStep;
    // console.log(startStep);
    while(!blockAtRest) {
        let dir = getNext(jets, currStep++);
        prevPos = new Coord(currPos.x, currPos.y);
        // Set current position according to jet direction
        currPos = new Coord(prevPos.x + (dir == "<" ? -1 : 1), prevPos.y);
        // If new current position collides with a wall, reset position to previous.
        if (!isValidPos(cave, block, currPos)) {
            currPos = new Coord(prevPos.x, prevPos.y);
            // console.log(`Tried to move ${dir} but could not.`);
        } else {
            // console.log(`Moved ${dir}.`);
        }
        // currPos = isValidPos(cave, block, currPos) ? new Coord(currPos.x, currPos.y) : new Coord(prevPos.x, prevPos.y);
        prevPos = new Coord(currPos.x, currPos.y);
        // Set current pos to one block lower
        currPos = new Coord(prevPos.x, prevPos.y - 1);
        // console.log(currPos);
        // If new current position collides, reset position to previous
        if (!isValidPos(cave, block, currPos)) {
            blockAtRest = true;
            // console.log("Tried to move down but could not. Rock at rest.")
            currPos = new Coord(prevPos.x, prevPos.y);
        } else {
            // console.log("Moved down");
        }
        // currStep++;
    }
    // currStep--;
    // let maxY = -1;
    for (let b of block) {
        let y = b.y + currPos.y;
        if (y > maxHeight) maxHeight = y;
        let temp = new Coord(b.x + currPos.x, y)
        cave[temp.toString()] = true;;
        recentBlockList.push(temp.toString());
    }

    // if (recentBlockList.length > 1000) console.log("DELETING");
    if (recentBlockList.length > 200) {
        // console.log("DELETING");
        // console.log(cave.size);
        // while (recentBlockList.length > 1000) {
            let temp = recentBlockList.splice(0, 50);
            // console.log(temp);
            for (let b of temp) {
                delete cave[b];
            }
        // }
    }
    
    // let blockHeight = Math.max(...block.map((b) => b.y)) + 1;
    // maxHeight += blockHeight;
    // maxHeight = maxY;
    // maxHeight = Math.max(...[...cave].map((c) => Number(c.split(",")[1])));
    // console.log("Height:", maxHeight);
    // printCave(cave);
    return currStep;

}

function printCave(cave) {
    let maxY = Math.max(...[...cave].map((c) => Number(c.split(",")[1])));
    for (let y = maxY; y >= 0; y--) {
        let row = [...cave].filter((c) => Number(c.split(",")[1]) == y).map((c) => new Coord(c.split(",")[0], c.split(",")[1]));
        // console.log(row);
        let toPrint = Array(7);
        for (let p of row) {
            // console.log(p);
            toPrint[p.x] = "#";
        }
        for (let i = 0 ; i < toPrint.length; i++) {
            if (!toPrint[i]) {
                toPrint[i] = ".";
            }
        }
        console.log(toPrint.join(""));
    }

}

export async function part1(input) {
    let jets = input.trim().split("");
    // console.log(jets);
    let maxRocks = 2022;
    // maxRocks = 10;
    let cave = new Set();
    let jetStep = 0;
    for (let i = 0; i < maxRocks; i++) {
        let block = getNext(blockList, i);
        // console.log(i);
        jetStep = dropBlock(cave, block, jets, jetStep);
        // console.log(jetStep);
    }
    // console.log(cave);
    // printCave(cave);
    // let maxY = Math.max(...[...cave].map((c) => Number(c.split(",")[1])));
    // console.log(maxY);
    let result = maxHeight + 1;
    console.log("Part 1 result: " + result);
    return result;
}


export async function part2(input) {
    let jets = input.trim().split("");
    // console.log(jets);
    let maxRocks = 1000000000000;
    // maxRocks = 10;
    let cave = new Set();
    let jetStep = 0;
    let blockStep = 0;
    for (let i = 0; i < maxRocks; i++) {
        let block = getNext(blockList, i);
        // console.log(i);
        jetStep = dropBlock(cave, block, jets, jetStep);
        jetStep = (jetStep % jets.length);
        blockStep = i % blockList.length;
        if (jetStep==blockStep) {
            console.log(i);
        }
        // console.log(jetStep);
    }
    // console.log(cave);
    // printCave(cave);
    // let maxY = Math.max(...[...cave].map((c) => Number(c.split(",")[1])));
    // console.log(maxY);
    let result = maxHeight + 1;
    console.log("Part 2 result: " + result);
    return result;
}