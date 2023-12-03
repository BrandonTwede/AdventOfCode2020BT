let Pair = require('./objects').Pair;
let Tile = require('./objects').Tile;

// console.log(new Pair(0, 4).equals(new Pair(4, 0)));

let t1 = new Tile(new Pair(0, 4), new Pair(1, 6), new Pair(2, 7), new Pair(3, 5));
let t2 = new Tile(new Pair(4, 0), new Pair(3, 5), new Pair(2, 7), new Pair(1, 6));
// console.log(t1.equals(t2));
// console.log(t2);

let t3 = new Tile(new Pair(0, 4), new Pair(1, 7), new Pair(2, 5), new Pair(3, 6));
console.log(t1.equals(t3));
// t3.rotate();
// console.log(t1.equals(t3));


// indexes 3 and 4 are the same
// indexes 8 and 12 are the same
