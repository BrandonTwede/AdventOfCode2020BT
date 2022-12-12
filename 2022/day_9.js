
class Coord {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    toString() {
        return `${this.x},${this.y}`;
    }
}

class Rope {
    constructor(length) {
        this.lastIndex = length - 1;
        this.knots = [];
        for (let i = 0; i < length; i++) {
            this.knots.push(new Coord(0, 0));
        }
        this.tailPositions = new Set();
        this.tailPositions.add("0,0");
    }

    moveRope(dir) {
        const head = this.knots[0];
        switch(dir) {
            case "R":
                head.x += 1;
                break;
            case "U":
                head.y += 1;
                break;
            case "L":
                head.x += -1;
                break;
            case "D":
                head.y += -1;
                break;
            default:
                console.log("ERROR: Invalid Direction");
        }
        for (let i = 1; i < this.knots.length; i++) {
            let nextLoc = this.segmentFollow(this.knots[i-1], this.knots[i]);
            if (i == this.knots.length - 1) this.tailPositions.add(nextLoc);
        }
    }

    segmentFollow(head, tail) {
        if (Math.abs(tail.x - head.x) + Math.abs(tail.y - head.y) > 2) {
            tail.x += tail.x > head.x ? -1 : 1;
            tail.y += tail.y > head.y ? -1 : 1;
        }
        if (Math.abs(tail.x - head.x) > 1) {
            tail.x += tail.x > head.x ? -1 : 1;
        }
        if (Math.abs(tail.y - head.y) > 1) {
            tail.y += tail.y > head.y ? -1 : 1;
        }
        return tail.toString();
    }
}

export async function part1(input) {
    const instructions = input.split("\n");
    const rope = new Rope(2);
    for (let i of instructions) {
        let [dir, count] = i.split(" ");
        while (count > 0) {
            rope.moveRope(dir);
            count--;
        }
    }
    console.log("Part 1 result: " + rope.tailPositions.size);
    return rope.tailPositions.size;
}


export async function part2(input) {
    const instructions = input.split("\n");
    const rope = new Rope(10);
    for (let i of instructions) {
        let [dir, count] = i.split(" ");
        while (count > 0) {
            rope.moveRope(dir);
            count--;
        }
    }
    console.log("Part 2 result: " + rope.tailPositions.size);
    return rope.tailPositions.size;
}