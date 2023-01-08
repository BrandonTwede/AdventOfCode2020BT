class Coord {
    constructor(x, y) {
        this.x = Number(x);
        this.y = Number(y);
    }

    toString() {
        return `${this.x},${this.y}`;
    }

}

class Sensor {
    constructor(sensor, beacon, y) {
        this.sensor = sensor;
        this.beacon = beacon;
        this.coordsCovered = new Set();
        this.maxDist = mDist(sensor, beacon);
        this.bounds = {};
        this.calculateBounds();
    }

    calculateBounds() {
        let midPointReached = false;
        let xDiff = 0;
        for (let y = this.sensor.y - this.maxDist; y <= this.sensor.y + this.maxDist; y++) {
            this.bounds[y] = new Coord(this.sensor.x - xDiff, this.sensor.x + xDiff);
            if (y == this.sensor.y) {
                midPointReached = true;
            }
            xDiff += midPointReached ? -1 : 1;
        }
    }
}

function pairsOverlap(p1, p2) {
    let [p1Min, p1Max] = [p1.x, p1.y];
    let [p2Min, p2Max] = [p2.x, p2.y];
    return (
        (p1Min >= p2Min && p1Max <= p2Max) ||
        (p2Min >= p1Min && p2Max <= p1Max) ||
        (p2Max >= p1Min && p2Min <= p1Min) ||
        (p2Min <= p1Max && p2Max >= p1Max) ||
        (p1Min <= p2Min && p1Max >= p2Min) ||
        (p1Min <= p2Max && p1Max >= p2Max)
    );
}

function mergePair(p1, p2) {
    return new Coord(Math.min(p1.x, p2.x), Math.max(p1.y, p2.y));
}

function mDist(p1, p2) {
   return Math.abs(p1.x - p2.x) + Math.abs(p1.y - p2.y);
}

function findRangeCovered(sensors, y) {
    let ranges = sensors.map((s) => s.bounds[y]).filter((s) => !!s);
    let mergeFound = true;
    while(mergeFound) {
        mergeFound = false;
        for (let i = 0; i < ranges.length; i++) {
            for (let j = i + 1; j < ranges.length; j++) {
                if (i == j) continue;
                let r1 = ranges[i];
                let r2 = ranges[j];
                if (pairsOverlap(r1, r2)) {
                    mergeFound = true;
                    ranges.splice(i > j ? i : j, 1);
                    ranges.splice(i > j ? j : i, 1);
                    ranges.push(mergePair(r1, r2));
                    break;
                }
            }
            if (mergeFound) break;
        }
    }
    return ranges;
}

function parseInput(input, ySearch) {
    let results = [];
    for (let line of input.split("\n")) {
        let sensor = line.split(":")[0];
        let beacon = line.split(":")[1];
        let sX = sensor.split(",")[0].split("=")[1];
        let sY = sensor.split(",")[1].split("=")[1];
        let bX = beacon.split(",")[0].split("=")[1];
        let bY = beacon.split(",")[1].split("=")[1];
        results.push(new Sensor(new Coord(sX, sY), new Coord(bX, bY), ySearch));
    }
    return results;
}

export async function part1(input) {
    let ySearch = 2000000;
    let sensors = parseInput(input);
    let range = findRangeCovered(sensors, ySearch);
    console.log("Input Parsed");
    let yBeacons = new Set(sensors.map((s) => s.beacon).filter((b) => b.y == ySearch).map((b) => b.toString()));
    let result = range[0].y - range[0].x + 1 - yBeacons.size;
    console.log("Part 1 result: " + result);
    return result;
}


export async function part2(input) {
    let sensors = parseInput(input);
    console.log("Input parsed");
    sensors.sort((a,b) => b.maxDist - a.maxDist);
    let max = 4000000;
    let range = [], y = 0;
    while (y <= max) {
        range = findRangeCovered(sensors, y);
        if (range.length > 1) break;
        y++;
    }
    
    let xFinal = range[0].x < range[1].x ? range[0].y + 1 : range[1].y + 1;
    let result = (xFinal * 4000000) + y;
    console.log(new Coord(xFinal, y));
    console.log("Part 2 result: " + result);
    return result;
}