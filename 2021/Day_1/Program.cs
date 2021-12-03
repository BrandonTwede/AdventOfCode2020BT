string text = System.IO.File.ReadAllText("day_1.txt");
int[] lines = text.Split("\n").Select(l => Int32.Parse(l)).ToArray();

int getTimesIncreased(int[] lines)
{
    int? prev = null;
    int timesIncreased = 0;
    foreach(int l1 in lines) {
        int current = l1;
        if (prev != null && current > prev) {
            timesIncreased++;
        }
        prev = current;
    }
    return timesIncreased;
}

Console.WriteLine("Part 1: " + getTimesIncreased(lines));

List<int> groupedItems = new List<int>();
for (int i = 2; i < lines.Length; i++) 
{
    groupedItems.Add(lines[i-2] + lines[i-1] + lines[i]);
}
Console.WriteLine("Part 2: " + getTimesIncreased(groupedItems.ToArray()));
