string text = System.IO.File.ReadAllText("day_5.txt");
List<Line> input = text.Split("\n").Select(l => new Line(l)).ToList();

Console.WriteLine($"Part 1: {getOverlappingPointCount(input.FindAll(l => l.isNotDiagonal()).ToList())}");
Console.WriteLine($"Part 2: {getOverlappingPointCount(input)}");

int getOverlappingPointCount(List<Line> lines)
{
    Dictionary<string, int> pointCounts = new Dictionary<string, int>();
    foreach (Line line in lines)
    {
        foreach (Coordinate c in line.getCoordinates())
        {
            string key = c.ToString();
            if (pointCounts.ContainsKey(key)) pointCounts[key] = pointCounts[key] + 1;
            else pointCounts.Add(key, 1);
        }
    }
    return pointCounts.Count(pair => pair.Value > 1);
}

class Coordinate
{
    public Coordinate(int x, int y)
    {
        this.x = x;
        this.y = y;
    }

    public override string ToString()
    {
        return $"{x},{y}";
    }

    public int x = 0;
    public int y = 0;
}

class Line
{
    public Line(string input)
    {
        List<string> parts = input.Split(" -> ").ToList();
        List<int> coord1 = parts[0].Split(',').Select(num => Int32.Parse(num)).ToList();
        List<int> coord2 = parts[1].Split(',').Select(num => Int32.Parse(num)).ToList();
        c1 = new Coordinate(coord1[0], coord1[1]);
        c2 = new Coordinate(coord2[0], coord2[1]);
    }

    Coordinate c1;
    Coordinate c2;

    public bool isNotDiagonal() { return c1.x == c2.x || c1.y == c2.y; }

    public List<Coordinate> getCoordinates()
    {
        List<Coordinate> points = new List<Coordinate>();
        // Nightmare 'for' loop. Completely unreadable but handles vertical, horizontal, and diagonal cases.
        for (int y = c1.y, x = c1.x; y != c2.y || x != c2.x; y += (y == c2.y ? 0 : (c1.y < c2.y ? 1 : -1)), x += (x == c2.x ? 0 : (c1.x < c2.x ? 1 : -1)))
        {
            points.Add(new Coordinate(x, y));
        }
        points.Add(new Coordinate(c2.x, c2.y));
        return points;
    }

}