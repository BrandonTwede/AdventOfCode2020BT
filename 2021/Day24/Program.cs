Dictionary<string, int> vars = new Dictionary<string, int>{
    {"w", 0},
    {"x", 1},
    {"y", 2},
    {"z", 3}
};

string[] instructions = System.IO.File.ReadAllText("day_24.txt").Split("\n");

//instructions = "inp z\ninp x\nmul z 3\neql z x".Split("\n");

for (long largest = 11111111111111; true; largest++) {
    Console.WriteLine(largest);
    if (checkNumber(largest)) break;
}


bool checkNumber(long number) {
    int[] values = new int[4]{0,0,0,0};
    Queue<char> input = new Queue<char>((number).ToString().PadLeft(14, '0').ToCharArray().ToList());
    if (input.Contains('0')) return false;
    foreach(string instruction in instructions) {
        doInstruction(instruction, values, input);
    }
    //Console.WriteLine(values[vars["z"]]);
    return values[vars["z"]] == 0;
}

void doInstruction(string instruction, int[] values, Queue<char> inputBuffer) {
    //Console.WriteLine($"\"{instruction}\"");
    string[] parts = instruction.Split(" ");
    int a = values[vars[parts[1]]];
    int b = -1;
    if (parts.Length > 2) {
        if (parts[2] == "w" || parts[2] == "x" || parts[2] == "y" || parts[2] == "z") {
            b = values[vars[parts[2]]];
        } else {
            b = Int32.Parse(parts[2]);
        }
    }


        
    switch(parts[0]) {
        case "inp":
            int inp = Int32.Parse(inputBuffer.Dequeue().ToString());
            values[vars[parts[1]]] = inp;
            break;
        case "add":
            values[vars[parts[1]]] = a + b;
            break;
        case "mul":
            values[vars[parts[1]]] = a * b;
            break;
        case "div":
            values[vars[parts[1]]] = (int)Math.Floor((double)a / (double)b);
            break;
        case "mod":
            values[vars[parts[1]]] = a % b;
            break;
        case "eql":
            values[vars[parts[1]]] = (a == b ? 1 : 0);
            break;
    }
}

