string[] rows = System.IO.File.ReadAllText("day_25.txt").Split("\n");

HashSet<Coordinate> down = new HashSet<Coordinate>();
HashSet<Coordinate> right = new HashSet<Coordinate>();


int xMax = rows[0].Length;
int yMax = rows.Length;
for (int y = 0; y < rows.Length; y++)
{
    for (int x = 0; x < rows[y].Length; x++)
    {
        if (rows[y][x] == '>') right.Add(new Coordinate(x, y));
        if (rows[y][x] == 'v') down.Add(new Coordinate(x, y));
    }
}

print();


bool hasChange = true;
int roundCount = 0;
for (; hasChange; roundCount++)
{
    int numChanged = 0;
    numChanged += doStep(right, "right");
    numChanged += doStep(down, "down");
    Console.WriteLine(numChanged);
    hasChange = numChanged != 0;
    //hasChange = false;
}

Console.WriteLine(roundCount);
print();

void print()
{
    for (int y = 0; y < rows.Length; y++)
    {
        for (int x = 0; x < rows[y].Length; x++)
        {
            Coordinate c = new Coordinate(x, y);
            if (right.Contains(c)) {
                Console.Write(">");
            }
            else if (down.Contains(c)) {
                Console.Write("v");
            } else {
                Console.Write(".");
            }
        }
        Console.WriteLine();
    }
}


int doStep(HashSet<Coordinate> activeList, string dir)
{
    int changeCount = 0;
    HashSet<Coordinate> nextList = new HashSet<Coordinate>();
    foreach (Coordinate c in activeList)
    {
        Coordinate next = getCoordinate(c, dir);
        if (down.Contains(next) || right.Contains(next))
        {
            nextList.Add(c); // Spot is taken, stays put
        }
        else
        {
            nextList.Add(next);
            changeCount++;
        }
    }
    if (dir == "right") right = nextList;
    if (dir == "down") down = nextList;
    return changeCount;
}

Coordinate getCoordinate(Coordinate c, string dir)
{
    if (dir == "right")
    {
        int nextX = c.x + 1;
        if (nextX >= xMax) nextX = nextX - xMax;
        return new Coordinate(nextX, c.y);
    }
    if (dir == "down")
    {
        int nextY = c.y + 1;
        if (nextY >= yMax) nextY = nextY - yMax;
        return new Coordinate(c.x, nextY);
    }
    return new Coordinate(0, 0);
}

class Coordinate : IEquatable<Coordinate>
{
    public Coordinate(int x, int y)
    {
        this.x = x;
        this.y = y;
    }

    public bool Equals(Coordinate? a)
    {
        if (a == null) return false;
        return a.x == this.x && a.y == this.y;
    }

    public override int GetHashCode()
    {
        return Int32.Parse($"{this.x}{this.y.ToString().Replace("-", "")}");
    }

    public override string ToString()
    {
        return $"{x},{y}";
    }

    public int x = 0;
    public int y = 0;
}