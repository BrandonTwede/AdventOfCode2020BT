using System.Text.RegularExpressions;


string[] instructions = System.IO.File.ReadAllText("day_22.txt").Split("\n");
HashSet<string> onPoints = new HashSet<string>();


foreach (string instruction in instructions) {
    Instruction i = new Instruction(instruction);
    LinkedList<string> iPoints = i.GetPoints();
    //Console.WriteLine(iPoints.Count);
    if (i.GetState() == "on") {
        foreach(string point in iPoints)
            onPoints.Add(point);
    } else {
        foreach(string point in iPoints)
            onPoints.Remove(point);
    }
    Console.WriteLine(onPoints.Count);
}
Console.WriteLine(onPoints.Count);


class Instruction {

    string state;
    int xMin, xMax, yMin, yMax, zMin, zMax;

    public Instruction(string input) {
        string pattern = @".*x=(.*)\.\.(.*),y=(.*)\.\.(.*),z=(.*)\.\.(.*)";
        Match match = Regex.Match(input, pattern);
        xMin = Int32.Parse(match.Groups[1].Value);
        xMax = Int32.Parse(match.Groups[2].Value);
        yMin = Int32.Parse(match.Groups[3].Value);
        yMax = Int32.Parse(match.Groups[4].Value);
        zMin = Int32.Parse(match.Groups[5].Value);
        zMax = Int32.Parse(match.Groups[6].Value);
        state = input.Contains("on") ? "on" : "off";
    }

    public string GetState() { return state; }

    public LinkedList<string> GetPoints() {
        LinkedList<string> points = new LinkedList<string>();

        for (int x = new int[]{xMin}.Max(); x <= new int[]{xMax}.Min(); x++) {
            for (int y = new int[]{yMin}.Max(); y <= new int[]{yMax}.Min(); y++) {
                for (int z = new int[]{zMin}.Max(); z <= new int[]{zMax}.Min(); z++) {
                    points.AddLast($"{x},{y},{z}");
                }
            }
        }
        return points;
    }
}