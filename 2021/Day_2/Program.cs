string text = System.IO.File.ReadAllText("day_2.txt");
List<string> input = text.Split("\n").ToList();

int depth = 0;
int distance = 0;
int aim = 0;

foreach (string instructions in input) {
    List<string> parts = instructions.Split(" ").ToList();
    string dir = parts[0];
    int val = Int32.Parse(parts[1]);
    if (dir == "forward") distance += val;
    if (dir == "up") depth -= val;
    if (dir == "down") depth += val;
}
Console.WriteLine($"Part 1: ${depth * distance}");

depth = 0; distance = 0;
foreach (string instructions in input) {
    List<string> parts = instructions.Split(" ").ToList();
    string dir = parts[0];
    int val = Int32.Parse(parts[1]);
    if (dir == "forward") {
        distance += val;
        depth += aim * val;
    }
    if (dir == "up") aim -= val;
    if (dir == "down") aim += val;
}
Console.WriteLine($"Part 2: ${depth * distance}");

