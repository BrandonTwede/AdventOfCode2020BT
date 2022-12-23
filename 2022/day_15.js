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
        // if (y) this.sSearch(sensor, y);
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

    pointIsContained(c) {
        return mDist(this.sensor, c) <= this.maxDist;
    }

    rSearch(current) {
        if (this.coordsCovered.has(current.toString())) return;
        if (mDist(this.sensor, current) > this.maxDist) return;
        this.coordsCovered.add(current.toString());
        this.rSearch(new Coord(current.x + 1, current.y));
        this.rSearch(new Coord(current.x - 1, current.y));
        this.rSearch(new Coord(current.x, current.y + 1));
        this.rSearch(new Coord(current.x, current.y - 1));
    }

    sSearch(start, y) {
        let coords = [new Coord(start.x, y)];
        let count = 1;
        while(coords.length > 0) {
            
            if (count % 1000000 == 0) console.log(coords.length);
            count++;
            
            let current = coords.pop();
            if (this.coordsCovered.has(current.toString())) continue;
            if (mDist(this.sensor, current) > this.maxDist) continue;
            this.coordsCovered.add(current.toString());
            coords.push(new Coord(current.x + 1, y));
            coords.push(new Coord(current.x - 1, y));
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

const setDifference = (a, b) => new Set([...a].filter(x => !b.has(x)));
const setIntersection = (a, b) => new Set([...a].filter(x => b.has(x)));
const setUnion = (a, b) => new Set([...a, ...b]);

function cfs(s) {
    // console.log(s);
    return new Coord(s.split(",")[0], s.split(",")[1]);
}

function mDist(p1, p2) {
   return Math.abs(p1.x - p2.x) + Math.abs(p1.y - p2.y);
}

function findRangeCovered(sensors, y) {
    let ranges = sensors.map((s) => s.bounds[y]).filter((s) => !!s);
    // console.log(ranges);
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
    let ySearch = 10;
    ySearch = 2000000;
    let sensors = parseInput(input);
    let range = findRangeCovered(sensors, ySearch);

    console.log("Input Parsed");
    let yBeacons = new Set(sensors.map((s) => s.beacon).filter((b) => b.y == ySearch).map((b) => b.toString()));
    console.log(yBeacons);
    console.log(range);
    let result = range[0].y - range[0].x + 1 - yBeacons.size;
    // let yScanned = sensors.reduce((p, c) => setUnion(p, c.coordsCovered), new Set());
    // console.log("scanned");
    // // console.log(yScanned);
    // // console.log(yBeacons);
    // let beaconless = setDifference(yScanned, yBeacons);
    // let result = beaconless.size;
    console.log("Part 1 result: " + result);
    return result;
}

function searchSpace(sensors, beacons, max) {
    for (let i = 0; i <= max; i++) {
        let x = max / 2;
        if (i % 2 == 0) {
            x += (i/2);
        } else {
            x -= Math.ceil(i/2);
        }
        for (let y = 0; y <= max; y++) {
            let c = new Coord(x,y);
            let inRange = false;
            for (let s of sensors) {
                if (s.pointIsContained(c)) {
                    inRange = true;
                    break;
                }
            }
            if (!inRange && !beacons.has(c.toString)) {
                return c;
            }
        }

    }
    return undefined;
}

export async function part2(input) {
    let sensors = parseInput(input);
    console.log("Input parsed");
    sensors.sort((a,b) => b.maxDist - a.maxDist);
    // console.log(sensors);
    // let beacons = new Set(sensors.map((s) => s.beacon.toString()));
    let max = 20;
    max = 4000000;
    // let point = searchSpace(sensors, beacons, max);
    let range = [], y = 0;
    while (y <= max) {
        if (y%100000 == 0)console.log(y);
        range = findRangeCovered(sensors, y);
        // console.log(range);
        if (range.length > 1) {
            break;
        }
        y++;

    }
    

    let yBeacons = new Set(sensors.map((s) => s.beacon).filter((b) => b.y == y).map((b) => b.toString()));
    console.log(yBeacons);
    console.log(range);
    console.log(y);
    let result = 0;
    // let result = range[0].y - range[0].x + 1 - yBeacons.size;
    // let result = point ? (point.x * 4000000) + point.y : 0;
    console.log("Part 2 result: " + result);
    return result;
}