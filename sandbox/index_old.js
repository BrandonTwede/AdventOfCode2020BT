

class Pair {

    constructor(i1, i2) {
        this.x = i1;
        this.y = i2;
    }

    equals(p2) {
        return (this.x == p2.x && this.y == p2.y);
    }
}

class Tile {
    constructor(i, j, k, l) {
        this.wires = [i,j,k,l];
    }

    rotate() {
        for (let i = 0; i < this.wires.length; i++) {
            this.wires[i] = new Pair(this.wires[i].y, this.wires[i].x);
        }
    }

    flip() {
        for(let i = 0; i < this.wires.length; i++) {
            let wire = this.wires[i];
            let x = wire.x;
            let y = wire.y;
            let newx = wire.x;
            let newy = wire.y;
            if (x == 3) newx = 1;
            if (x == 1) newx = 3;
            if (y == 3) newy = 1;
            if (y == 1) newy = 3;
            this.wires[i] = new Pair(newx, newy);
        }
    }

    equals(t2) {
        let inequalityFound = false;
        for (let i = 0; i < this.wires.length; i++) {
            let foundMatch = false;
            for (let j = 0; j < t2.wires.length; j++) {
                if (this.wires[i].equals(t2.wires[j])) {
                    foundMatch = true;
                    break;
                }
            }
            if (!foundMatch) {
                inequalityFound = true;
                break;
            }
        }
        if (!inequalityFound) return true;
        t2.rotate();
        for (let i = 0; i < this.wires.length; i++) {
            let foundMatch = false;
            for (let j = 0; j < t2.wires.length; j++) {
                if (this.wires[i].equals(t2.wires[j])) {
                    foundMatch = true;
                    break;
                }
            }
            if (!foundMatch) {
                inequalityFound = true;
                break;
            }
        }
        if (!inequalityFound) return true;
        return false;
    }
}

let col1 = [new Pair(1, 1), new Pair(1, 2), new Pair(1, 3), new Pair(1,4)];
let col2 = [new Pair(2, 1), new Pair(2, 2), new Pair(2, 3), new Pair(2,4)];
let col3 = [new Pair(3, 1), new Pair(3, 2), new Pair(3, 3), new Pair(3,4)];
let col4 = [new Pair(4, 1), new Pair(4, 2), new Pair(4, 3), new Pair(4,4)];

let tiles = [];

let i, j, k, l;
for (i = 0; i < col1.length; i++) {
    for (j = 0; j < col2.length; j++) {
        if (j == i) continue;
        for (k = 0; k < col3.length; k++) {
            if (k == i || k == j) continue;
            for (l = 0; l < col3.length; l++) {
                if (l == i || l == j || l == k) continue;
                tiles.push(new Tile(col1[i], col2[j], col3[k], col4[l]));
            }
        }
    }
}

console.log(tiles.length);
function dedup(_tiles) {
    let dedupedTiles = [];
    for (let i = 0; i < _tiles.length; i++) {
        let dupFound = false;
        for (j = 0; j < dedupedTiles.length; j++) {
            if (_tiles[i].equals(dedupedTiles[j])) {
                dupFound = true;
                break;
            };
        }
        if(!dupFound) dedupedTiles.push(_tiles[i]);
    }
    return dedupedTiles;
}


// tiles = dedup(tiles);
console.log(tiles.length);

let reversedTiles = [];
for (let i = 0; i < tiles.length; i++) {
    let t = new Tile(...tiles[i].wires);
    t.flip();
    reversedTiles.push(t);
}


tiles.push(...reversedTiles);
console.log(tiles.length);
tiles = dedup(tiles);
console.log(tiles.length);
console.log(tiles[tiles.length-1]);