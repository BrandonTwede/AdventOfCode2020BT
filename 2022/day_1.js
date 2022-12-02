export async function part1(input) {
    let elves = input.split("\n\n");
    let max = 0;

    for (let elf of elves) {
        // console.log(elf);
        let sum = 0;
        for (let food of elf.split("\n")) {
            // console.log(food);
            sum += Number(food);
        }
        if (sum > max) {
            max = sum;
        }
    }
    console.log("Part 1 result: " + max);
    return max;
}


export async function part2(input) {
    let elves = input.split("\n\n");
    let results = []

    for (let elf of elves) {
        // console.log(elf);
        let sum = 0;
        for (let food of elf.split("\n")) {
            // console.log(food);
            sum += Number(food);
        }
        results.push(sum);
    }
    results = results.sort(function(a,b) {return a - b}).reverse();
    const answer = results[0] + results[1] + results[2];
    console.log("Part 2 result: " + answer);
    return answer;
}