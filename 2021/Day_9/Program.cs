string text = System.IO.File.ReadAllText("day_9.txt");
List<string> lines = text.Split("\n").ToList();

int[,] parseInput(List<string> lines)
{
    int[,] board = new int[lines[0].Length, lines.Count];
    for (int x = 0; x < lines[0].Length; x++)
    {
        for (int y = 0; y < lines.Count; y++)
        {
            board[x, y] = Int32.Parse(lines[y][x].ToString());
        }
    }
    return board;
}

int[,] floor = parseInput(lines);


List<Tuple<int, int>> lowestCoordinates = new List<Tuple<int, int>>();
List<int> lowestValues = new List<int>();

for (int x = 0; x < floor.GetLength(0); x++)
{
    for (int y = 0; y < floor.GetLength(1); y++)
    {
        bool isLowest = true;
        int current = floor[x, y];
        if (x - 1 >= 0 && current >= floor[x - 1, y]) isLowest = false;
        if (y - 1 >= 0 && current >= floor[x, y - 1]) isLowest = false;
        if (x + 1 < floor.GetLength(0) && current >= floor[x + 1, y]) isLowest = false;
        if (y + 1 < floor.GetLength(1) && current >= floor[x, y + 1]) isLowest = false;
        if (isLowest)
        {
            lowestCoordinates.Add(new Tuple<int, int>(x, y));
            lowestValues.Add(floor[x, y]);
        }
    }
}

Console.WriteLine($"Part 1: {lowestValues.Sum() + lowestValues.Count}");

int getBasinSize(int[,] floor, int x, int y)
{
    Stack<Tuple<int, int>> stack = new Stack<Tuple<int, int>>();
    int count = 0;
    stack.Push(new Tuple<int, int>(x, y));
    while (stack.Count() > 0)
    {
        Tuple<int, int> current = stack.Pop();
        x = current.Item1;
        y = current.Item2;
        if (floor[x, y] != -1) count += 1;
        floor[x, y] = -1;

        if (x - 1 >= 0 &&  floor[x - 1, y] != 9 &&  floor[x - 1, y] != -1) stack.Push(new Tuple<int, int>(x - 1, y));
        if (y - 1 >= 0 &&  floor[x, y - 1] != 9 &&  floor[x, y - 1] != -1) stack.Push(new Tuple<int, int>(x, y - 1));
        if (x + 1 < floor.GetLength(0) && floor[x + 1, y] != 9 && floor[x + 1, y] != -1) stack.Push(new Tuple<int, int>(x + 1, y));
        if (y + 1 < floor.GetLength(1) && floor[x, y + 1] != 9 && floor[x, y + 1] != -1) stack.Push(new Tuple<int, int>(x, y + 1));
    }

    return count;
}

int part2Result = lowestCoordinates.Select(l => getBasinSize(floor, l.Item1, l.Item2)).OrderBy(s => s).TakeLast(3).Aggregate((total, next) => total * next);
Console.WriteLine($"Part 2: {part2Result}");
