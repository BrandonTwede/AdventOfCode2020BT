string text = System.IO.File.ReadAllText("day_13.txt");
List<int[]> coordinates = text.Split("\n").Where(t => t.Contains(',')).Select(c => c.Split(",").Select(s => Int32.Parse(s)).ToArray()).ToList();
List<string[]> instructions = text.Split("\n").Where(t => t.Contains('=')).Select(t => t.Split(' ')[2].Split('=')).ToList();

bool isFirstLoop = true;
foreach (string[] instruction in instructions)
{
    string foldAxis = instruction[0];
    int foldCoordinateIdx = foldAxis == "x" ? 0 : 1;
    int foldPoint = Int32.Parse(instruction[1]);
    for (int i = 0; i < coordinates.Count; i++)
    {
        int foldCoordinateValue = coordinates[i][foldCoordinateIdx];
        coordinates[i][foldCoordinateIdx] -= foldCoordinateValue > foldPoint ? (foldCoordinateValue - foldPoint) * 2 : 0;
    }
    if (isFirstLoop)
    {
        Console.WriteLine($"Part 1: {coordinates.Select(c => $"{c[0]},{c[1]}").Distinct().Count()}");
        isFirstLoop = false;
    }
}

Console.WriteLine("Part 2:");

int maxX = coordinates.Select(c => c[0]).Max() + 1;
int maxY = coordinates.Select(c => c[1]).Max() + 1;

for (int y = 0; y < maxY; y++)
{
    for (int x = 0; x < maxX; x++)
    {
        Console.Write(coordinates.Select(c => $"{c[0]},{c[1]}").Contains($"{x},{y}") ? "#" : " ");
    }
    Console.Write("\n");
}