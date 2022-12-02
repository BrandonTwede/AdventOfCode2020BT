
const leftOptions = ['A', 'B', 'C'];
const rightOptions = ['X', 'Y', 'Z'];


function scoreRound(l, r) {
    const lIndex = leftOptions.indexOf(l);
    const rIndex = rightOptions.indexOf(r);
    let score = rIndex + 1;
    if (lIndex == rIndex) {
        return score + 3;
    }
    let diff = rIndex - lIndex;
    if (diff == 1 || diff == -2) {
        return score + 6
    }
    return score;
}

export async function part1(input) {
    let rounds = input.split("\n");
    let total = 0;

    for (let round of rounds) {
        const parts = round.split(' ');
        total += scoreRound(parts[0], parts[1]);
    }
    console.log("Part 1 result: " + total);
    return total;
}

function scoreRound2(l, r) {
    const lIndex = leftOptions.indexOf(l);
    let rIndex = rightOptions.indexOf(r);
    let score = rIndex * 3;
    if (r == 'Y') return score + lIndex + 1;
    if (r == 'Z') rIndex = (lIndex + 1) % 3;
    if (r == 'X') rIndex = (lIndex - 1 + 3) % 3;
    return score + rIndex + 1;
}

export async function part2(input) {
    let rounds = input.split("\n");
    let total = 0;

    for (let round of rounds) {
        const parts = round.split(' ');
        let score = scoreRound2(parts[0], parts[1]);
        total += score;
    }
    console.log("Part 2 result: " + total);
    return total;
}