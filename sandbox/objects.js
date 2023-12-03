class Pair {

    constructor(i1, i2) {
        this.x = i1;
        this.y = i2;
    }

    equals(p2) {
        return (this.x == p2.x && this.y == p2.y) || (this.x == p2.y && this.y == p2.x);
    }
}

class Tile {
    constructor(i, j, k, l) {
        this.wires = [i,j,k,l];
    }

    isValid() {
        for (let i = 0; i < this.wires.length; i++) {
            let x = this.wires[i].x;
            let y = this.wires[i].y;
            let wireValid = (x <= 3 && y >=4) || (x >=4 && y <= 3);
            if (!wireValid) return false;
        }
        return true;
    }

    rotate() {
        for (let i = 0; i < this.wires.length; i++) {
            this.wires[i] = new Pair((this.wires[i].x + 4) % 8, (this.wires[i].y + 4) % 8);
        }
    }

    flip() {
        for(let i = 0; i < this.wires.length; i++) {
            let wire = this.wires[i];
            let newx = this.swapNumberForFlip(wire.x);
            let newy = this.swapNumberForFlip(wire.y)
            this.wires[i] = new Pair(newx, newy);
        }
    }

    swapNumberForFlip(i) {
        if (i == 1) return 3;
        if (i == 3) return 1;
        if (i == 7) return 5;
        if (i == 5) return 7;
        if (i == 0) return 4;
        if (i == 4) return 0;
        return i;
    }

    equals(t2) {
        let inequalityFound = false;
        // console.log(t2);
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
        // console.log(t2);
        inequalityFound = false
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
        t2.rotate();
        if (!inequalityFound) return true;
        return false;
    }
}

module.exports.Pair = Pair;
module.exports.Tile = Tile;