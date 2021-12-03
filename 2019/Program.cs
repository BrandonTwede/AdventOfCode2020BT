

string text = System.IO.File.ReadAllText("day_2.txt");
List<int> lines = text.Split("\n").Select(l => (int)(Math.Floor(Int32.Parse(l) / 3.0) - 2)).ToList();
Console.WriteLine(lines.Sum());

lines = text.Split("\n").Select(l => Int32.Parse(l)).ToList();
List<int> fuelList = new List<int>();
for (int i = 0; i < lines.Count; i++)
{
    int extraFuel = (int)(Math.Floor(lines[i] / 3.0) - 2);
    if (extraFuel > 0) {
        lines.Add(extraFuel);
        fuelList.Add(extraFuel);
    }
}

Console.WriteLine(fuelList.Sum());

text = System.IO.File.ReadAllText("day_3.txt");
lines = text.Split(",").Select(l => Int32.Parse(l)).ToList();
lines[1] = 12;
lines[2] = 2;
List<int> originalInput = lines.ToList();

int runProgram(List<int> lines) {
    for (int i = 0; i < lines.Count; i+= 4)
    {
        int instruction = lines[i];
        if (instruction == 99) break;
        int val1 = lines[lines[i+1]];
        int val2 = lines[lines[i+2]];
        int result = 0;
        if (instruction == 1) result = val1 + val2;
        if (instruction == 2) result = val1 * val2;
        
        lines[lines[i+3]] = result;
    }
    return lines[0];
}


Console.WriteLine(runProgram(lines));
bool resultFound = false;
for (int i = 0; i <= 99; i++)
{
    for (int j = 0; j <= 99; j++)
    {
        List<int> testInput = originalInput.ToList();
        testInput[1] = i;
        testInput[2] = j;
        int result = runProgram(testInput);
        if (result == 19690720) {
            Console.WriteLine(100 * i + j);
            resultFound = true;
            break;
        }
    }
    if (resultFound) break;
}



List<coordinate> getWireCoordinates(string wirePath)
{
    List<coordinate> coordinates = new List<coordinate>();
    int x = 0, y = 0;
    coordinates.Add(new coordinate(x, y));
    foreach (string dir in wirePath.Split(","))
    {
        int value = Int32.Parse(dir.Substring(1));
        if (dir[0] == 'R') x += value;
        if (dir[0] == 'L') x -= value;
        if (dir[0] == 'U') y += value;
        if (dir[0] == 'D') y -= value;
        coordinates.Add(new coordinate(x, y));
    }
    return coordinates;
}

text = System.IO.File.ReadAllText("day_4.txt");
List<string> wires = text.Split("\n").ToList();
List<List<coordinate>> wireCoordinates = new List<List<coordinate>>();
foreach (string wirePath in wires) {
    wireCoordinates.Add(getWireCoordinates(wirePath));
}

coordinate? doSegmentsCross(coordinate i1, coordinate i2, coordinate j1, coordinate j2)
{
    string wire1Direction = i1.x - i2.x == 0 ? "vertical" : "horizontal";
    string wire2Direction = j1.x - j2.x == 0 ? "vertical" : "horizontal";
    if (wire1Direction == wire2Direction) return null;
    if (wire1Direction == "horizontal")
    {
        if ((j1.y < i1.y && j2.y > i1.y) || (j1.y > i1.y && j2.y < i1.y))
            if ((j1.x > i1.x && j1.x < i2.x) || (j1.x < i1.x && j1.x > i2.x))
                return new coordinate(j1.x, i1.y);
    }
    if (wire1Direction == "vertical")
    {
        if ((j1.x < i1.x && j2.x > i1.x) || (j1.x > i1.x && j2.x < i1.x))
            if ((j1.y > i1.y && j1.y < i2.y) || (j1.y < i1.y && j1.y > i2.y))
                return new coordinate(i1.x, j1.y);
    }
    return null;
}

List<coordinate> getWireIntersections(List<coordinate> wire1, List<coordinate> wire2)
{
    List<coordinate> intersections = new List<coordinate>();
    for (int i = 1; i < wire1.Count; i++)
    {
        for (int j = 1; j < wire2.Count; j++)
        {
            coordinate? result = doSegmentsCross(wire1[i-1], wire1[i], wire2[j-1], wire2[j]);
            if (result != null) {
                intersections.Add(result.Value);
                wire1.Insert(i, result.Value);
                wire2.Insert(j, result.Value);
            }
        }
    }
    return intersections;
}
List<coordinate> intersections = getWireIntersections(wireCoordinates[0], wireCoordinates[1]);
Console.WriteLine(intersections.Select(i => Math.Abs(i.x) + Math.Abs(i.y)).Min());


int countSteps(coordinate endpoint, List<coordinate> wireCoordinates)
{
    int total = 0;
    for (int i = 1; i < wireCoordinates.Count; i++) {
        total += Math.Abs(wireCoordinates[i-1].x - wireCoordinates[i].x) + Math.Abs(wireCoordinates[i-1].y - wireCoordinates[i].y);
        if (wireCoordinates[i].x == endpoint.x && wireCoordinates[i].y == endpoint.y) break;
    }
    return total;
}

List<int> stepsCount = new List<int>();
foreach (coordinate c in intersections) {
    stepsCount.Add(countSteps(c, wireCoordinates[0]) + countSteps(c, wireCoordinates[1]));
}

Console.WriteLine(stepsCount.Min());

struct coordinate {
    public override string ToString() {
        return "x: " + x + " y: " + y;
    }
    public coordinate(int x, int y)
    {
        this.x = x;
        this.y = y;
    }
    public int x;
    public int y;
}
