let Pair = require('./objects').Pair;
let Tile = require('./objects').Tile;
let graph = require('./outputVis');
const fs = require('fs');

let col1 = [new Pair(0, 4), new Pair(0, 5), new Pair(0, 6), new Pair(0,7)];
let col2 = [new Pair(1, 4), new Pair(1, 5), new Pair(1, 6), new Pair(1,7)];
let col3 = [new Pair(2, 4), new Pair(2, 5), new Pair(2, 6), new Pair(2,7)];
let col4 = [new Pair(3, 4), new Pair(3, 5), new Pair(3, 6), new Pair(3,7)];

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
// console.log(tiles.length);

let combinedTiles = []
for (let i = 0; i < tiles.length; i++) {
    let t = new Tile(...tiles[i].wires);
    t.flip();
    combinedTiles.push(tiles[i]);
    combinedTiles.push(t);
}


// tiles.push(...reversedTiles);
tiles = combinedTiles;
console.log(tiles.length);
tiles = dedup(tiles);
console.log(tiles.length);

tiles = tiles.filter(t => t.isValid);
console.log(tiles.length);

for (let i = 0; i < tiles.length; i++) {

    let svg = graph.drawTile(tiles[i]);
    try {
        fs.writeFileSync(`./images/test${i}.svg`, svg);
        // file written successfully
      } catch (err) {
        console.error(err);
      }
    
}