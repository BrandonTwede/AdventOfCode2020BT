string text = System.IO.File.ReadAllText("day_14.txt");
string template = text.Split("\n")[0];

Dictionary<string, string> insertionLookup = new Dictionary<string, string>();
foreach(string[] parts in text.Split("\n").Where(t => t.Contains("->")).Select(t => t.Split(" -> ").ToArray())) {
    insertionLookup.Add(parts[0], parts[1]);
}

Dictionary<string, long> incrementDictionary(Dictionary<string, long> dict, string key, long amount = 1) {
    if (dict.ContainsKey(key)) {
        dict[key] = dict[key] + amount;
    } else {
        dict[key] = amount;
    }
    return dict;
}

long getAnswer(Dictionary<string, long> pairCount) {
    List<Tuple<string, long>> letterCounts = new List<Tuple<string, long>>();
    foreach (string letter in string.Join("", pairCount.Keys).Distinct().Select(c => c.ToString())) {
        long count = 0;
        foreach (string key in pairCount.Keys) {
            if (key.Contains(letter)) {
                count += pairCount[key] * key.Count(c => c == letter[0]);
            }
        }
        if (template.First().ToString() == letter || template.Last().ToString() == letter) count += 1;
        letterCounts.Add(new Tuple<string, long>(letter, count/2));
    }

    long least = letterCounts.Select(t => new { Letter = t.Item1, Count = t.Item2 }).OrderBy(x => x.Count).First().Count;
    long most = letterCounts.Select(t => new { Letter = t.Item1, Count = t.Item2 }).OrderBy(x => x.Count).Last().Count;
    return most - least;
}

Dictionary<string, long> pairCount = new Dictionary<string, long>();
for (int idx = 1; idx < template.Length; idx++) {
    pairCount = incrementDictionary(pairCount, $"{template[idx-1]}{template[idx]}");
}

int steps = 40;
for (int i = 0; i < steps; i++) {
    Dictionary<string, long> changes = new Dictionary<string, long>();
    foreach (string pair in pairCount.Keys) {
        if (insertionLookup.ContainsKey(pair) && pairCount[pair] > 0) {
            string insert = insertionLookup[pair];
            incrementDictionary(changes, $"{pair[0]}{insert}", pairCount[pair]);
            incrementDictionary(changes, $"{insert}{pair[1]}", pairCount[pair]);
            incrementDictionary(changes, pair, -1 * pairCount[pair]);
        }
    }

    foreach(string pair in changes.Keys) {
        pairCount = incrementDictionary(pairCount, pair, changes[pair]);
    }
    if (i == 9) Console.WriteLine($"Part 1: {getAnswer(pairCount)}");
}
Console.WriteLine($"Part 2: {getAnswer(pairCount)}");