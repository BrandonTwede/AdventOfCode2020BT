string text = System.IO.File.ReadAllText("day_13.txt");
List<string> coordinates = text.Split("\n").Where(t => t.Contains(',')).ToList();
List<string[]> instructions = text.Split("\n").Where(t => t.Contains('=')).Select(t => t.Split(' ')[2].Split('=')).ToList();

bool isFirstLoop = true;
foreach (string[] instruction in instructions)
{
    string foldAxis = instruction[0];
    int foldPoint = Int32.Parse(instruction[1]);
    for (int i = 0; i < coordinates.Count; i++)
    {
        int x = Int32.Parse(coordinates[i].Split(",")[0]);
        int y = Int32.Parse(coordinates[i].Split(",")[1]);
        int val = Int32.Parse(coordinates[i].Split(",")[foldAxis == "x" ? 0 : 1]);
        if (val > foldPoint)
        {
            if (foldAxis == "x")
            {
                x -= (x - foldPoint) * 2;
            }
            else
            {
                y -= (y - foldPoint) * 2;
            }
            coordinates[i] = $"{x},{y}";
        }
    }
    coordinates = coordinates.Distinct().ToList();
    if (isFirstLoop)
    {
        Console.WriteLine($"Part 1: {coordinates.Count()}");
        isFirstLoop = false;
    }

}

Console.WriteLine("Part 2:");

int maxX = coordinates.Select(p => Int32.Parse(p.Split(',')[0])).Max() + 1;
int maxY = coordinates.Select(p => Int32.Parse(p.Split(',')[1])).Max() + 1;

for (int y = 0; y < maxY; y++)
{
    for (int x = 0; x < maxX; x++)
    {
        Console.Write(coordinates.Contains($"{x},{y}") ? "#" : " ");
    }
    Console.Write("\n");
}
