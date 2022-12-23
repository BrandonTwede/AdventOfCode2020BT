class Coord {
    constructor(x, y) {
        this.x = Number(x);
        this.y = Number(y);
    }

    toString() {
        return `${this.x},${this.y}`;
    }
}


class Path {
    constructor(line) {
        let points = line.split("->");
        this.points = points.map((p) => new Coord(...p.split(",")));
    }
}


class Cave {
    constructor(paths, withFloor = false) {
        let minx = Number.MAX_VALUE, maxx = 0, maxy = 0;
        for (let path of paths) {
            for (let p of path.points) {
                if (p.x < minx) minx = p.x;
                if (p.x > maxx) maxx = p.x;
                if (p.y > maxy) maxy = p.y;
            }
        }
        this.minx = minx;
        this.maxx = maxx;
        this.maxy = maxy;
        this.restingSandCount = 0;
        this.sandStart = 500 - this.minx;
        this.grid = new Array((maxx - minx) + 1);
        for (let y = 0; y < this.grid.length; y++) {
            this.grid[y] = new Array(maxy + 1);
        }
    }

    addPath(path) {
        for (let i = 1; i < path.points.length; i++) {
            let p1 = path.points[i - 1], p2 = path.points[i];
            if (p1.x - this.minx >= 0) p1.x -= this.minx;
            if (p2.x - this.minx >= 0) p2.x -= this.minx;
            if (p1.x == p2.x) {
                if (p1.y <= p2.y) {
                    for (let y = p1.y; y <= p2.y; y++) {
                        this.grid[p1.x][y] = "#"
                    }
                }
                if (p1.y > p2.y) {
                    for (let y = p1.y; y >= p2.y; y--) {
                        this.grid[p1.x][y] = "#"
                    }
                }
            }
            if (p1.y == p2.y) {
                if (p1.x <= p2.x) {
                    for (let x = p1.x; x <= p2.x; x++) {
                        this.grid[x][p1.y] = "#"
                    }
                }
                if (p1.x > p2.x) {
                    for (let x = p1.x; x >= p2.x; x--) {
                        this.grid[x][p1.y] = "#"
                    }
                }
            }
        }
    }


    dropSand() {
        let done = false;
        while (true) {
            let grid = this.grid;
            let maxY = this.maxy;
            let sand = new Coord(this.sandStart, 0);
            let isAtRest = (pos) => {
                // console.log(pos.x + ", " + pos.y);
                if (!grid[pos.x]) return false;
                if (!grid[pos.x][pos.y + 1]) return false;
                if (!grid[pos.x - 1]) return false;
                if (!grid[pos.x - 1][pos.y + 1]) return false;
                if (!grid[pos.x + 1]) return false;
                if (!grid[pos.x + 1][pos.y + 1]) return false;
                return true;
            }
            // console.log(sand.x + ", " + sand.y);
            while(!isAtRest(sand)) {
                // console.log(sand.x + ", " + sand.y);
                if (sand.x < 0 || sand.x >= grid.length || sand.y >= grid[sand.x].length) {
                    done = true;
                    break;
                }
                if (!grid[sand.x][sand.y + 1]) sand = new Coord(sand.x, sand.y + 1);
                else if (!grid[sand.x - 1] || !grid[sand.x - 1][sand.y + 1])  sand = new Coord(sand.x - 1, sand.y + 1);
                else if (!grid[sand.x + 1] || !grid[sand.x + 1][sand.y + 1])  sand = new Coord(sand.x + 1, sand.y + 1);
                

            }
            if (sand.toString() == new Coord(this.sandStart, 0).toString()) {
                done = true;
            }

            if (!done) {
                this.restingSandCount++;
                this.grid[sand.x][sand.y] = "o";
            } else {
                break;
            }
        }
    }

    print() {
        let cave = transpose(this.grid);
        for (let row of cave) {
            console.log(row.map((i) => !i ? "." : i).join(""));
        }
    }

}

function transpose(matrix) {
    const rows = matrix.length
    const cols = matrix[0].length

    let grid = []
    for (let col = 0; col < cols; col++) {
        grid[col] = []
    }
    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            grid[col][row] = matrix[row][col]
        }
    }
    return grid
}

export async function part1(input) {
    let paths = [];
    for (let line of input.split("\n")) {
        paths.push(new Path(line));
    }
    let cave = new Cave(paths);
    for (let path of paths) {
        cave.addPath(path);
    }
    cave.print();
    cave.dropSand();
    cave.print();
    let result = cave.restingSandCount;
    console.log("Part 1 result: " + result);
    return result;
}


export async function part2(input) {
    let paths = [];
    for (let line of input.split("\n")) {
        paths.push(new Path(line));
    }
    let cave = new Cave(paths);
    let yMax = cave.maxy;
    paths.push(new Path(`0,${yMax + 2} -> 700,${yMax + 2}`));
    cave = new Cave(paths);
    for (let path of paths) {
        cave.addPath(path);
    }
    cave.dropSand();
    let result = cave.restingSandCount + 1;
    console.log("Part 2 result: " + result);
    return result;
}