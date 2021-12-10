string text = System.IO.File.ReadAllText("day_10.txt");
List<string> lines = text.Split("\n").ToList();

List<char> openings = new List<char>() { '{', '(', '[', '<' };
List<char> closings = new List<char>() { '}', ')', ']', '>' };

char? getIllegalCharacter(string line)
{
    Stack<char> characters = new Stack<char>();
    foreach (char c in line)
    {
        if (openings.Contains(c)) characters.Push(c);
        else
        {
            char top = characters.Pop();
            int idx = openings.IndexOf(top);
            if (closings[idx] != c) return c;
        }
    }
    return null;
}

int getScore(char c)
{
    if (c == ')') return 3;
    if (c == ']') return 57;
    if (c == '}') return 1197;
    if (c == '>') return 25137;
    return 0;
}

Console.WriteLine($"Part 1: {lines.Select(l => getIllegalCharacter(l)).Where(c => c != null).Cast<char>().Select(c => getScore(c)).Sum()}");

string getMissingSequence(string line)
{
    Stack<char> characters = new Stack<char>();
    foreach (char c in line)
    {
        if (openings.Contains(c)) characters.Push(c);
        else
        {
            char top = characters.Pop();
            int idx = openings.IndexOf(top);
            if (closings[idx] != c) return "";
        }
    }
    return string.Join("", characters.ToList().Select(c => openings.ToList().IndexOf(c)).Select(i => closings[i]).ToList());
}

long getSequenceScore(string sequence)
{
    long score = 0;
    foreach (char c in sequence)
    {
        score *= 5;
        if (c == ')') score += 1;
        if (c == ']') score += 2;
        if (c == '}') score += 3;
        if (c == '>') score += 4;
    }
    return score;
}


List<long> scores = lines.Select(l => getMissingSequence(l)).Where(s => !string.IsNullOrWhiteSpace(s)).Select(s => getSequenceScore(s)).OrderBy(s => s).ToList();
Console.WriteLine($"Part 2: {scores[(scores.Count() / 2)]}");