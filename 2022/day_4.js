
function pairHasFullyContainedPair(p1, p2) {
    let [p1Min, p1Max] = p1.split("-").map((i) => Number(i));
    let [p2Min, p2Max] = p2.split("-").map((i) => Number(i));

    return (
        (p1Min >= p2Min && p1Max <= p2Max) ||
        (p2Min >= p1Min && p2Max <= p1Max)
    );
}

export async function part1(input) {
    let pairs = input.split("\n");

    let containedPairs = pairs.filter(pair => pairHasFullyContainedPair(...pair.split(",")));
    console.log("Part 1 result: " + containedPairs.length);
    return containedPairs.length;
}

function pairsOverlap(p1, p2) {
    let [p1Min, p1Max] = p1.split("-").map((i) => Number(i));
    let [p2Min, p2Max] = p2.split("-").map((i) => Number(i));
    return (
        (p2Max >= p1Min && p2Min <= p1Min) ||
        (p2Min <= p1Max && p2Max >= p1Max) ||
        (p1Min <= p2Min && p1Max >= p2Min) ||
        (p1Min <= p2Max && p1Max >= p2Max)
    );
}

export async function part2(input) {
    let pairs = input.split("\n");

    let containedPairs = pairs.filter(pair => pairsOverlap(...pair.split(",")));
    console.log("Part 2 result: " + containedPairs.length);
    return containedPairs.length;
}