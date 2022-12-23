
function comparePairs(p1, p2) {
    for (let i = 0; i < Math.max(p1.length, p2.length); i++) {
        let i1 = p1[i];
        let i2 = p2[i];
        if (i1 == undefined) {
            return -1;
        }
        if (i2 == undefined) {
            return 1;
        }
        if (typeof i1 == typeof i2 && typeof i1 == 'number') {
            if (i1 < i2) return -1;
            if (i1 > i2) return 1;
            continue;
        }
        if (typeof i1 == 'number') {
            i1 = [i1];
        }
        if (typeof i2 == 'number') {
            i2 = [i2];
        }
        if (typeof i1 == typeof i2 && typeof i1 == 'object') {
            let result = comparePairs(i1, i2);
            if (result !== 0) return result;
            continue;
        }
    }
    return 0;
}

export async function part1(input) {
    let pairs = input.split("\n\n");
    let correctOrderIndexes = [];
    for (let i = 0; i < pairs.length; i++) {
        let pair = pairs[i].split("\n");
        let isCorrectOrder = comparePairs(JSON.parse(pair[0]), JSON.parse(pair[1]));
        if (isCorrectOrder <= 0) correctOrderIndexes.push(i);
    }
    let result = correctOrderIndexes.reduce((prev, curr) => prev + curr, 0) + correctOrderIndexes.length;
    console.log("Part 1 result: " + result);
    return result;
}


export async function part2(input) {
    input = input.replaceAll("\n\n", "\n").split("\n");
    const decoderKey1 = "[[2]]";
    const decoderKey2 = "[[6]]";
    input.push(decoderKey1);
    input.push(decoderKey2);
    input = input.map((i) => JSON.parse(i));
    input.sort(comparePairs);
    input = input.map((i) => JSON.stringify(i));
    let result = (input.indexOf(decoderKey1) + 1) * (input.indexOf(decoderKey2) + 1);
    console.log("Part 2 result: " + result);
    return result;
}