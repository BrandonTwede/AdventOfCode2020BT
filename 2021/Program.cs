string[] instructions = System.IO.File.ReadAllText("day_24.txt").Split("\n");

instructions = @"inp x
mul x -1".Split("\n");



long[] values = new long[4]{0,0,0,0};
Queue<int> input = new Queue<int>("56".Select(c => Int32.Parse(c)));
foreach(string instruction in instructions) {
    doInstruction(instruction, input);
}
Console.WriteLine(values[vars["x"]]);

long largest = 99999999999999;

void doInstruction(string instruction, Queue<int> inputBuffer) {
    string[] parts = Instruction.Split(" ");
    switch(parts[0]) {
        case "inp":
            int inp = inputBuffer.Dequeue();
            values[vars[parts[1]]] = inp;
            break;
        case "add":
            string a = parts[1], b = parts[2];
            values[vars[a]] = values[vars[a]] + values[vars[b]];
            break;
        case "mul":
            string a = parts[1], b = parts[2];
            values[vars[a]] = values[vars[a]] * values[vars[b]];
            break;
        case "div":
            string a = parts[1], b = parts[2];
            values[vars[a]] = Math.Floor(values[vars[a]] / values[vars[b]]);
            break;
        case "div":
            string a = parts[1], b = parts[2];
            values[vars[a]] = values[vars[a]] % values[vars[b]];
            break;
        case "div":
            string a = parts[1], b = parts[2];
            values[vars[a]] = (values[vars[a]] == values[vars[b]] ? 1 : 0);
            break;
    }
}

Dictionary<string, int> vars = new Dictionary<string, int>{
    {"w", 0},
    {"x", 1},
    {"y", 2},
    {"z", 3}
};