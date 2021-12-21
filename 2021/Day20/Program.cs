string[] inputParts = System.IO.File.ReadAllText("day_20.txt").Split("\n\n");
string algorithm = inputParts[0];
string[] imageRaw = inputParts[1].Split("\n");

HashSet<Coordinate> image = new HashSet<Coordinate>();
for (int x = 0; x < imageRaw.Length; x++) {
    for (int y = 0; y < imageRaw[0].Length; y++) {
        if (imageRaw[x][y] == '#') image.Add(new Coordinate(x, y));
    }
}

for (int i = 0; i < 50; i++) {
    image = processImage(image, i % 2 == 0 ? '.' : '#');
    Console.Write(".");
    if (i == 1) Console.WriteLine($"\nPart 1:{image.Count}");
    if (i % 10 == 0) Console.WriteLine();
}
Console.WriteLine($"\nPart 2: {image.Count}");

HashSet<Coordinate> processImage(HashSet<Coordinate> coordinates, char infiniteChar) {
    List<int> xs = coordinates.Select(c => c.x).ToList();
    List<int> ys = coordinates.Select(c => c.y).ToList();
    int xMin = xs.Min();
    int yMin = ys.Min();
    int xMax = xs.Max();
    int yMax = ys.Max();
    HashSet<Coordinate> nextImage = new HashSet<Coordinate>(coordinates.Count + 1000);
    char[] binary = new char[9];
    for (int x = xMin - 3; x < xMax + 3; x++) {
        for (int y = yMin - 3; y < yMax + 3; y++) {
            List<Coordinate> neighbors = getNeighbors(x, y);
            Coordinate c;
            for (int i = 0; i < neighbors.Count; i++) {
                c = neighbors[i];
                if (coordinates.Contains(c)) binary[i] = '#';
                else if (c.x < xMin|| c.x > xMax|| c.y < yMin|| c.y > yMax) binary[i] = infiniteChar;
                else binary[i] = '.';
            }
            int algIdx = Convert.ToInt32(string.Join("", binary).Replace('#','1').Replace('.','0'), 2);
            if (algorithm[algIdx] == '#') nextImage.Add(new Coordinate(x, y));
        }
    }
    return nextImage;
}

void printImage(List<Coordinate> coordinates) {
    List<int> xs = coordinates.Select(c => c.x).ToList();
    List<int> ys = coordinates.Select(c => c.y).ToList();
    for (int x = xs.Min() - 4; x < xs.Max() + 4; x++) {
        for (int y = ys.Min() - 4; y < ys.Max() + 4; y++) {
            List<string> cStrings = coordinates.Select(c => c.ToString()).ToList();
            Console.Write((cStrings.Contains($"{x},{y}") ? "#" : "."));
        }
        Console.WriteLine();
    }
}

List<Coordinate> getNeighbors(int x, int y)
{
    List<Coordinate> neighbors = new List<Coordinate>();
    for (int i = -1; i <= 1; i++)
    {
        for (int j = -1; j <= 1; j++)
        {
            int x1 = x + i, y1 = y + j;
            neighbors.Add(new Coordinate(x1, y1));
        }
    }
    return neighbors;
}


class Coordinate : IEquatable<Coordinate>
{
    public Coordinate(int x, int y)
    {
        this.x = x;
        this.y = y;
    }

    public bool Equals(Coordinate? a) {
        if (a == null) return false;
        return a.x == this.x && a.y == this.y;
    }

    public override int GetHashCode() {
        return Int32.Parse($"{this.x}{this.y.ToString().Replace("-", "")}");
    }

    public override string ToString()
    {
        return $"{x},{y}";
    }

    public int x = 0;
    public int y = 0;
}


