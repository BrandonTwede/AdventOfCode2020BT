
function findFirstMarker(input, uniqueSize) {
    for (let i = uniqueSize; i < input.length; i++) {
        let chunk = new Set(input.slice(i - uniqueSize, i).split(""));
        if (chunk.size == uniqueSize) return i;
    }
    return 0;
}

export async function part1(input) {
    let result = findFirstMarker(input, 4);
    console.log("Part 1 result: " + result);
    return result;
}


export async function part2(input) {
    let result = findFirstMarker(input, 14);
    console.log("Part 2 result: " + result);
    return result;
}