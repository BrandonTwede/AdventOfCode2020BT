
function createStacks(input) {
    let lines = input.split("\n");
    let numLineIdx = lines.findIndex((l) => l.trim().startsWith('1'));
    let stacks = {};
    for (let idx in lines[numLineIdx]) {
        const c = lines[numLineIdx][idx];
        if (c == " ") continue;
        if (!(c in stacks)) stacks[c] = [];
        for (let i = numLineIdx - 1; i >= 0; i--) {
            let crate = lines[i][idx];
            if (crate == ' ') continue;
            stacks[c].push(crate);
        }
    }
    return stacks;
}

function executeInput(stacks, input) {
    let lines = input.split("\n");
    let numLineIdx = lines.findIndex((l) => l.trim().startsWith('1'));
    let instructions = lines.slice(numLineIdx + 1);
    for (let instruction of instructions) {
        if (!instruction) continue;
        let parts = instruction.split(' ');
        let quantity = Number(parts[1]);
        let src = parts[3];
        let dest = parts[5];
        for (let count = 0; count < quantity; count++) {
            let crate = stacks[src].pop();
            stacks[dest].push(crate);
        }
    }
    return stacks;
}

function readTopCrates(stacks) {
    let count = Object.keys(stacks).length;
    let result = "";
    for (let key = 1; key <= count; key++) {
        let stack = stacks[String(key)];
        result += stack[stack.length - 1];
    }
    return result;
}

export async function part1(input) {
    let stacks = createStacks(input);
    stacks = executeInput(stacks, input);
    let result = readTopCrates(stacks);

    console.log("Part 1 result: " + result);
    return result;
}

function executeInput2(stacks, input) {
    let lines = input.split("\n");
    let numLineIdx = lines.findIndex((l) => l.trim().startsWith('1'));
    let instructions = lines.slice(numLineIdx + 1);
    for (let instruction of instructions) {
        if (!instruction) continue;
        let parts = instruction.split(' ');
        let quantity = Number(parts[1]);
        let src = parts[3];
        let dest = parts[5];
        let tempStack = [];
        for (let count = 0; count < quantity; count++) {
            let crate = stacks[src].pop();
            tempStack.push(crate);
        }
        while (tempStack.length > 0) {
            let crate = tempStack.pop();
            stacks[dest].push(crate);
        }
    }
    return stacks;
}

export async function part2(input) {
    let stacks = createStacks(input);
    stacks = executeInput2(stacks, input);
    let result = readTopCrates(stacks);

    console.log("Part 2 result: " + result);
    return result;
}