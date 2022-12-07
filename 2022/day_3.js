
function getPriority(char) {
    let ascii = Number(char);
    if (ascii > 97) {
        ascii =  ascii - 96;
    } else {
        ascii = ascii - 38;
    }
    return ascii;
}

export async function part1(input) {
    let bags = input.split("\n");
    let misfits = [];

    for (let bag of bags) {
        bag = bag.split("");
        let halfwayThrough = Math.floor(bag.length / 2)
        
        let left = bag.slice(0, halfwayThrough);
        let right = bag.slice(halfwayThrough, bag.length);
        for (let item of left) {
            if (right.includes(item)) {
                misfits.push(item);
                break;
            }
        }
    }
    let total = misfits.reduce((prev, curr) => {return prev + getPriority(curr.charCodeAt(0))}, 0);
    console.log("Part 1 result: " + total);
    return total;
}

export async function part2(input) {
    let bags = input.split("\n");
    let misfits = [];

    for (let i = 0; i < bags.length; i += 3) {
        let bag1 = bags[i].split("");
        let bag2 = bags[i+1].split("");
        let bag3 = bags[i+2].split("");
        let shared = [];
        for (let item of bag1) {
            if (bag2.includes(item)) {
                shared.push(item);
            }
        }
        for (let item of shared) {
            if (bag3.includes(item)) {
                misfits.push(item);
                break;
            }
        }
    }

    let total = misfits.reduce((prev, curr) => {return prev + getPriority(curr.charCodeAt(0))}, 0);
    console.log("Part 2 result: " + total);
    return total;
}