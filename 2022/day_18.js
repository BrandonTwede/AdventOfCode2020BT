
class Coord {
    constructor(x, y, z) {
        this.x = Number(x);
        this.y = Number(y);
        this.z = Number(z);
    }

    toString() {
        return `${this.x},${this.y},${this.z}`;
    }
}

function parseInputs(input) {
    let points = [];
    for (let line of input.split("\n")) {
        points.push(new Coord(...line.split(",")));
    }
    return points;
}

function findMax(input) {
    let values = [];
    for (let line of input.split("\n")) {
        values.push(...line.split(",").map(v => Number(v)));
    }
    return Math.max(...values);
}

function getNeighbor(grid, x, y, z, xDiff, yDiff, zDiff) {
    let nextX = x + xDiff;
    let nextY = y + yDiff;
    let nextZ = z + zDiff;
    if (nextX < 0 || nextY < 0 || nextZ < 0) return "w";
    return grid[nextX][nextY][nextZ];
}

function countSides(grid, coord, filterFunc) {
    let x = coord.x, y = coord.y, z = coord.z;
    let neighbors = [
        getNeighbor(grid, x, y, z, -1, 0, 0),
        getNeighbor(grid, x, y, z, 1, 0, 0),
        getNeighbor(grid, x, y, z, 0, -1, 0),
        getNeighbor(grid, x, y, z, 0, 1, 0),
        getNeighbor(grid, x, y, z, 0, 0, -1),
        getNeighbor(grid, x, y, z, 0, 0, 1)
    ];
    return neighbors.filter(filterFunc).length;
}

function makeGrid(input) {
    let points = parseInputs(input)
    let max = findMax(input);
    let grid = new Array(max + 2);
    for (let i = 0; i < grid.length; i++) {
        grid[i] = new Array(max + 2);
        for (let j = 0; j < grid[i].length; j++) {
            grid[i][j] = new Array(max + 2);
        }
    }
    
    for (let c of points) {
        grid[c.x][c.y][c.z] = true;
    }
    return grid;
}

function floodGrid(grid) {
    let max = grid.length;
    let stack = [];
    stack.push(new Coord(0, 0, 0));
    while (stack.length > 0) {
        let current = stack.pop();
        if (!current) continue;
        
        let x = current.x, y = current.y, z = current.z;
        if (x < 0 || x >= max || y < 0 || y >= max || z < 0 || z >= max) {
            continue;
        }
        
        let cube = grid[x][y][z];
        if (cube) continue;
        else grid[x][y][z] = "w";
        stack.push(
            new Coord(x - 1, y, z),
            new Coord(x + 1, y, z),
            new Coord(x, y - 1, z),
            new Coord(x, y + 1, z),
            new Coord(x, y, z - 1),
            new Coord(x, y, z + 1),
        );

    }
    return grid;

}

export async function part1(input) {
    let points = parseInputs(input);
    let grid = makeGrid(input);
    let total = 0;
    for (let p of points) {
        let count = countSides(grid, p, (n) => n == "w" || n == undefined);
        total += count;
    }
    let result = total;
    console.log("Part 1 result: " + result);
    return result;
}


export async function part2(input) {
    let points = parseInputs(input);
    let grid = makeGrid(input);
    grid = floodGrid(grid);
    let total = 0;
    for (let p of points) {
        let count = countSides(grid, p, (n) => n == "w");
        total += count;
    }
    let result = total;
    console.log("Part 2 result: " + result);
    return result;
}