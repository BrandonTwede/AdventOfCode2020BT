
class Coord {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    toString() {
        return `${this.x},${this.y}`;
    }
}

function makeGrid(input) {
    let grid = [];
    let start, end;
    const rows = input.split("\n");
    for(let y = 0; y < rows.length; y++) {
        grid[y] = [];
        let columns = rows[y].split("");
        for (let x = 0; x < columns.length; x++) {
            let char = columns[x];
            switch(char) {
                case "S":
                    start = new Coord(x, y);
                    grid[y][x] = 0;
                    break;
                case "E":
                    end = new Coord(x, y);
                    grid[y][x] = 25;
                    break;
                default:
                    grid[y][x] = char.charCodeAt(0) - 97;
            }
        }
    }
    return {
        grid: grid,
        start: start,
        end: end
    }
}

function traverse(grid, start, end, maxLength) {
    let queue = [
        {
            pos: start,
            path: []
        }
    ];
    let visited = [];
    while (queue.length > 0) {
        let current = queue.shift();
        if (current.pos.toString() == end.toString()) {
            return current.path;
        }
        if (visited.includes(current.pos.toString())) {
            continue;
        }
        if (maxLength && current.path.length > maxLength) {
            continue;
        }

        visited.push(current.pos.toString());
        let x = current.pos.x;
        let y = current.pos.y;
        let path = current.path;
        path.push(current.pos);
        let currentVal = grid[y][x];
        if ((x - 1) >= 0 && grid[y][x - 1] <= (currentVal + 1)) {
            queue.push({
                pos: new Coord(x - 1, y),
                path: [...path]
            })
        }
        if ((y - 1) >= 0 && grid[y - 1][x] <= (currentVal + 1)) {
            queue.push({
                pos: new Coord(x, y - 1),
                path: [...path]
            })
        }
        if ((x + 1) < grid[y].length && grid[y][x + 1] <= (currentVal + 1)) {
            queue.push({
                pos: new Coord(x + 1, y),
                path: [...path]
            })
        }
        if ((y + 1) < grid.length && grid[y + 1][x] <= (currentVal + 1)) {
            queue.push({
                pos: new Coord(x, y + 1),
                path: [...path]
            })
        }
    }
}

export async function part1(input) {
    let {grid, start, end} = makeGrid(input);
    let path = traverse(grid, start, end);
    let result = path.length;
    console.log("Part 1 result: " + result);
    return result;
}

function findStartPoints(grid) {
    let points = [];
    for (let y = 0; y < grid.length; y++) {
        for (let x = 0 ; x < grid[y].length; x++) {
            if (grid[y][x] == 0) {
                points.push(new Coord(x, y));
            }
        }
    }
    return points;
}


export async function part2(input) {
    let {grid, start, end} = makeGrid(input);
    let startPoints = findStartPoints(grid);
    let shortestPath = traverse(grid, start, end);
    for (let i = 0; i < startPoints.length; i++) {
        let tempPath = traverse(grid, startPoints[i], end, shortestPath.length);
        if (tempPath && tempPath.length < shortestPath.length) {
            console.log(startPoints[i])
            console.log(tempPath.length);
            shortestPath = tempPath;
        }
    }
    let result = shortestPath.length;
    console.log("Part 2 result: " + result);
    return result;
}