string text = System.IO.File.ReadAllText("day_11.txt");
List<string> lines = text.Split("\n").ToList();

Octopus[,] grid = new Octopus[lines[0].Length, lines.Count];
for (int i = 0; i < grid.GetLength(0); i++)
    for (int j = 0; j < grid.GetLength(1); j++)
        grid[i, j] = new Octopus(Int32.Parse(lines[i][j].ToString()));

List<Tuple<int, int>> getNeighbors(Octopus[,] grid, int x, int y)
{
    List<Tuple<int, int>> neighbors = new List<Tuple<int, int>>();
    for (int i = -1; i <= 1; i++)
    {
        for (int j = -1; j <= 1; j++)
        {
            int x1 = x + i, y1 = y + j;
            if (x1 >= 0 && x1 < grid.GetLength(0) && y1 >= 0 && y1 < grid.GetLength(1))
                neighbors.Add(new Tuple<int, int>(x1, y1));
        }
    }
    return neighbors;
}

int countFlashesFromThisOctopus(Octopus[,] grid, int x, int y, int stepNum)
{
    int flashCount = 0;
    bool didFlash = grid[x, y].increment(stepNum);
    if (didFlash)
        flashCount = 1 + getNeighbors(grid, x, y).Select(n => countFlashesFromThisOctopus(grid, n.Item1, n.Item2, stepNum)).Sum();
    return flashCount;
}

int flashCount = 0;     // Part 1
int flashedStep = 0;    // Part 2
for (int step = 1; step <= 100 || flashedStep == 0; step++)
{
    int flashedThisStep = 0;
    for (int i = 0; i < grid.GetLength(0); i++)
        for (int j = 0; j < grid.GetLength(1); j++)
            flashedThisStep += countFlashesFromThisOctopus(grid, i, j, step);
    if (step <= 100) flashCount += flashedThisStep;
    if (flashedStep == 0 && flashedThisStep == grid.GetLength(0) * grid.GetLength(1))
        flashedStep = step;
}

Console.WriteLine($"Part 1: {flashCount}");
Console.WriteLine($"Part 2: {flashedStep}");

class Octopus
{
    int lastFlashedRound = -1;
    int energy = 0;

    public Octopus(int energy) { this.energy = energy; }
    public override string ToString() { return energy.ToString(); }
    public int getEnergy() { return energy; }

    public bool increment(int roundNum)
    {
        bool didFlash = false;
        if (roundNum != lastFlashedRound)
            energy += 1;
        if (energy > 9)
        {
            didFlash = true;
            energy = 0;
            lastFlashedRound = roundNum;
        }
        return didFlash;
    }
}