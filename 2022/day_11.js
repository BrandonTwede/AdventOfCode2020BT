
class Monkey {
    constructor(items, operation, test, trueIdx, falseIdx, round = 1) {
        this.items = items.map((i) => BigInt(i));
        this.operation = operation;
        this.test = test;
        this.trueIdx = trueIdx;
        this.falseIdx = falseIdx;
        this.inspectionCount = 0;
        this.round = round;
    }

    inspect() {
        let results = [];
        for (let i of this.items) {
            i = this.operation(i);
            if (this.round == 1) {
                i = i/3n;
            } else {
                i = i % this.round;
            }
            let dest = this.test(i) == 0n ? this.trueIdx : this.falseIdx;
            results.push({item: i, dest: dest});
            this.inspectionCount += 1;
        }
        this.items = [];
        return results;
    }

    addItem(item) {
        this.items.push(item);
    }

}

function getMonkeys(round = 1) {
    const monkeys = [];
    let tests = [3n, 13n, 2n, 11n, 5n, 17n, 19n, 7n];
    let divisor = round == 1 ? 1 : tests.reduce((prev, curr) => prev * curr, 1n);
    monkeys.push(new Monkey([64, 89, 65, 95], (i) => {return i * 7n}, (t) => {return (t % 3n)}, 4, 1, divisor));
    monkeys.push(new Monkey([76, 66, 74, 87, 70, 56, 51, 66], (i) => i + 5n, (t) => (t % 13n), 7, 3, divisor));
    monkeys.push(new Monkey([91, 60, 63], (i) => i * i, (t) => (t % 2n), 6, 5, divisor));
    monkeys.push(new Monkey([92, 61, 79, 97, 79], (i) => i + 6n, (t) => (t % 11n), 2, 6, divisor));
    monkeys.push(new Monkey([93, 54], (i) => i * 11n, (t) => (t % 5n), 1, 7, divisor));
    monkeys.push(new Monkey([60, 79, 92, 69, 88, 82, 70], (i) => i + 8n, (t) => (t % 17n), 4, 0, divisor));
    monkeys.push(new Monkey([64, 57, 73, 89, 55, 53], (i) => i + 1n, (t) => (t % 19n), 0, 5, divisor));
    monkeys.push(new Monkey([62], (i) => i + 4n, (t) => (t % 7n), 3, 2, divisor));
    return monkeys;
}

export async function part1(input) {
    const monkeys = getMonkeys();
    const rounds = 20;
    for (let i = 0; i < rounds; i++) {
        for (let monkey of monkeys) {
            const itemsToMove = monkey.inspect();
            for (let item of itemsToMove) {
                monkeys[item.dest].addItem(item.item);
            }
        }
    }
    let counts = monkeys.map((m) => m.inspectionCount).sort((a,b) => b-a);
    console.log("Part 1 result: " + counts[0] * counts[1]);
    return counts[0] * counts[1];
}


export async function part2(input) {
    const monkeys = getMonkeys(2);
    const rounds = 10000;
    for (let i = 0; i < rounds; i++) {
        for (let monkey of monkeys) {
            const itemsToMove = monkey.inspect();
            for (let item of itemsToMove) {
                monkeys[item.dest].addItem(item.item);
            }
        }
    }
    let counts = monkeys.map((m) => m.inspectionCount).sort((a,b) => b-a);
    let result = BigInt(counts[0]) * BigInt(counts[1]);
    console.log("Part 2 result: " + Number(result));
    return Number(result);
}