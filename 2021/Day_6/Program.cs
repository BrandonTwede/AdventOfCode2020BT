string text = System.IO.File.ReadAllText("day_6.txt");
List<int> input = text.Split(",").Select(l => Int32.Parse(l)).ToList();
Dictionary<int, Int64> fishCounts = new Dictionary<int, Int64>();

// Initialize from input
for (int i = 0; i <= 8; i++)
    fishCounts.Add(i, input.Count(f => f == i));

Int64 getFishPopulationCount(int days, Dictionary<int, Int64> fishCounts) {
    for (int day = 0; day < days; day++)
    {
        Dictionary<int, Int64> nextFish = getBlankFishCounts();
        for (int i = 0; i < 8; i++)
            nextFish[i] = fishCounts[i + 1];
        nextFish[6] = nextFish[6] + fishCounts[0];
        nextFish[8] = fishCounts[0];
        fishCounts = nextFish;
    }
    return fishCounts.Values.Sum();
}

Dictionary<int, Int64> getBlankFishCounts() // For conventience
{
    Dictionary<int, Int64> fishCounts = new Dictionary<int, Int64>();
    for (int i = 0; i <= 8; i++)
        fishCounts.Add(i, 0);
    return fishCounts;
}


Console.WriteLine($"Part 1: {getFishPopulationCount(80, fishCounts)}");
Console.WriteLine($"Part 2: {getFishPopulationCount(256, fishCounts)}");