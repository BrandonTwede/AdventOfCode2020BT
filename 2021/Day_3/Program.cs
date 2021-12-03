string text = System.IO.File.ReadAllText("day_3.txt");
List<string> input = text.Split("\n").ToList();

string epsilon = "";
string gamma = "";

char findOccurrance(int i, List<string> input, Func<int, int, char> bitCriteria) {
    int oneCount = input.Count(binary => binary[i] == '1');
    int zeroCount = input.Count(binary => binary[i] == '0');
    return bitCriteria(oneCount, zeroCount);
}

Func<int, int, char> mostCommon = (oneCount, zeroCount) => oneCount >= zeroCount ? '1' : '0';
Func<int, int, char> leastCommon = (oneCount, zeroCount) => oneCount < zeroCount ? '1' : '0';

for (int i = 0; i < input[0].Length; i++) {
    if (findOccurrance(i, input, mostCommon) == '1') {
        epsilon += "1";
        gamma += "0";
    } else {
        gamma += "1";
        epsilon += "0";
    }
}

Console.WriteLine("Part 1: " + System.Convert.ToInt32(gamma, 2) * System.Convert.ToInt32(epsilon, 2));

string oxygen = "";
string scrubber = "";

string calculateRating(List<string> input, Func<int, int, char> bitCriteria) {
    for (int i = 0; i < input[0].Length && input.Count > 1; i++) {
        input = input.FindAll(line => line[i] == findOccurrance(i, input, bitCriteria));
    }
    return input[0];
}

oxygen = calculateRating(input, mostCommon);
scrubber = calculateRating(input, leastCommon);


Console.WriteLine("Part 2: " + System.Convert.ToInt32(oxygen, 2) * System.Convert.ToInt32(scrubber,2));