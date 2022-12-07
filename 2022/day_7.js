
class File {
    constructor(name, size) {
        this.name = name;
        this.size = size;
    }
}

class Directory {
    constructor(name, parent) {
        this.name = name;
        this.files = {};
        this.dirs = {};
        this.parent = parent;
        this.size = undefined;
    }

    addContent(row) {
        let name = row.split(" ")[1];
        if (row.startsWith('dir')) {
            this.dirs[name] = new Directory(name, this);
        } else {
            this.files[name] = new File(name, Number(row.split(" ")[0]));
        }
    }

    calculateSize() {
        if (this.size) return this.size;
        let total = 0;
        for (let filename in this.files) {
            total += this.files[filename].size;
        }
        for (let dir in this.dirs) {
            total += this.dirs[dir].calculateSize();
        }
        this.size = total;
        return total;
    }

    getSizeList(mapping = []) {
        for (let dir in this.dirs) {
            mapping = this.dirs[dir].getSizeList(mapping);
        }
        let size = this.size || this.calculateSize();
        mapping.push(size);

        return mapping;
    }
}

function createDirectoryStructure(input) {
    let currDir = new Directory('/');
    const rows = input.split("\n");
    for (let i = 1; i < rows.length; i++) {
        let row = rows[i];
        if (row.startsWith('$')) {
            switch (row.split(" ")[1]) {
                case 'cd':
                    let dest = row.split(" ")[2];
                    currDir = dest == '..' ? currDir.parent : currDir.dirs[dest];
                    break;
                case 'ls':
                    row = rows[i + 1];
                    while (row && !row.startsWith('$')) {
                        i += 1;
                        currDir.addContent(row);
                        row = rows[i + 1];
                    }
                    break;
            }
        }
    }

    // Return to root node
    while(currDir.parent) {
        currDir = currDir.parent;
    }
    return currDir;
}


export async function part1(input) {
    const root = createDirectoryStructure(input);
    let sizeList = Object.values(root.getSizeList());
    sizeList = sizeList.filter((a) => {return a <= 100000});
    const sum = sizeList.reduce((partialSum, a) => partialSum + a, 0);
    console.log("Part 1 result: " + sum);
    return sum;
}


export async function part2(input) {
    const root = createDirectoryStructure(input);
    let sortedSizes = root.getSizeList().sort((a,b) => a - b);
    const storageUsed = root.calculateSize();
    const MAX_STORAGE = 70000000;
    const UPDATE_SIZE = 30000000;
    const unused = MAX_STORAGE - storageUsed;
    const sizeNeeded = UPDATE_SIZE - unused;
    const answer = sortedSizes.find((n) => n >= sizeNeeded);
    console.log("Part 2 result: " + answer);
    return answer;
}