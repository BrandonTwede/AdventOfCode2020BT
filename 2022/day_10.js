
class CRT {
    constructor() {
        this.cycle = 0;
        this.output = [];
    }

    drawSprite(pos) {
        if (Math.abs((this.cycle % 40) - pos) <= 1) {
            this.output.push("#");
        } else {
            this.output.push(".");
        }
        this.cycle += 1;
    }

    print() {
        const chunkSize = 40;
        for (let i = 0; i < this.output.length; i += chunkSize) {
            const chunk = this.output.slice(i, i + chunkSize);
            console.log(chunk.join("").replace(/\./g, " ").replace(/\#/g, "■"));
        }
    }
}

class CPU {
    constructor() {
        this.cycle = 1;
        this.x = 1;
        this.signals = [];
        this.crt = new CRT();
    }

    execute(instruction) {
        let prevCycle = this.cycle;
        let prevX = this.x;
        switch (instruction.split(" ")[0]) {
            case "noop":
                this.cycle += 1;
                this.crt.drawSprite(prevX);
                break;
            case "addx":
                this.cycle += 2;
                this.crt.drawSprite(prevX);
                this.crt.drawSprite(prevX);
                this.x += Number(instruction.split(" ")[1]);
                break;
        }
        for (let i = prevCycle; i < this.cycle; i++) {
            if ((i + 20) % 40 == 0) {
                this.signals.push(prevX * i);
            }
        }
    }
}


export async function part1(input) {
    let cpu = new CPU();
    input = input.split("\n");
    for (let i = 0; i < input.length; i++) {
        cpu.execute(input[i]);
    }
    let sum = cpu.signals.reduce((a,b) => a + b, 0);
    console.log("Part 1 result: " + sum);
    return sum;
}


export async function part2(input) {
    let cpu = new CPU();
    input = input.split("\n");
    for (let i = 0; i < input.length; i++) {
        cpu.execute(input[i]);
    }
    console.log("Part 2 result: Read below");
    cpu.crt.print();
    return 0;
}