function createGrid(input) {
    let rows = input.split("\n");
    for (let i = 0; i < rows.length; i++) {
        rows[i] = rows[i].split("");
    }
    return rows;
}

function isHiddenInDirection(grid, x, y, xDelta, yDelta) {
    const tree = grid[x][y];
    x += xDelta;
    y += yDelta;
    while (x >= 0 && y >= 0 && x < grid[0].length && y < grid.length) {
        if (tree <= grid[x][y]) {
            return true;
        }
        x += xDelta;
        y += yDelta;
    }
    return false;
}

function isHidden(grid, x, y) {
    const isHidden = isHiddenInDirection(grid, x, y, -1, 0) &&
        isHiddenInDirection(grid, x, y, 1, 0) &&
        isHiddenInDirection(grid, x, y, 0, -1) &&
        isHiddenInDirection(grid, x, y, 0, 1);
    return isHidden;
}

export async function part1(input) {
    let grid = createGrid(input);
    let visibleCount = (grid.length * 2) + ((grid[0].length - 2) * 2);
    console.log(visibleCount);
    for (let x = 1; x < grid[0].length - 1; x++) {
        for (let y = 1; y < grid.length - 1; y++) {
            if (!isHidden(grid, x, y)) visibleCount += 1;
        }
    }
    console.log("Part 1 result: " + visibleCount);
    return visibleCount;
}


function getScoreInDirection(grid, x, y, xDelta, yDelta) {
    let distance = 1;
    const tree = grid[x][y];
    x += xDelta;
    y += yDelta;
    while (x >= 0 && y >= 0 && x < grid[0].length && y < grid.length) {
        if (tree <= grid[x][y]) {
            return distance;
        }
        x += xDelta;
        y += yDelta;
        distance += 1;
    }
    return distance - 1;
}


function calculateTreeScore(grid, x, y) {
    const score = getScoreInDirection(grid, x, y, -1, 0) *
        getScoreInDirection(grid, x, y, 1, 0) *
        getScoreInDirection(grid, x, y, 0, -1) *
        getScoreInDirection(grid, x, y, 0, 1);
    return score;
}

export async function part2(input) {
    let grid = createGrid(input);
    let treeScores = []
    for (let x = 1; x < grid[0].length - 1; x++) {
        for (let y = 1; y < grid.length - 1; y++) {
            treeScores.push(calculateTreeScore(grid, x, y));
        }
    }
    let max = Math.max(...treeScores);
    console.log("Part 2 result: " + max);
    return max;
}