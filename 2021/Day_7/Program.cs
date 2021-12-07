string text = System.IO.File.ReadAllText("day_7.txt");
List<int> input = text.Split(",").Select(l => Int32.Parse(l)).ToList();

int findFuelCost(List<int> positions, int point, bool isPart2 = false)
{
    int fuel = 0;
    foreach (int p in positions)
    {
        if (isPart2)
        {
            for (int i = 1; i <= Math.Abs(p - point); i++)
                fuel += i;
        }
        else
        {
            fuel += Math.Abs(p - point);
        }
    }
    return fuel;
}

int minFuel(List<int> input, bool isPart2 = false)
{
    List<int> allFuel = new List<int>();
    for (int i = input.Min(); i <= input.Max(); i++)
        allFuel.Add(findFuelCost(input, i, isPart2: isPart2));
    return allFuel.Min();
}

Console.WriteLine($"Part 1: {minFuel(input)}");
Console.WriteLine($"Part 2: {minFuel(input, true)}");