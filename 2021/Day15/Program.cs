using System.Collections.Concurrent;

string text = System.IO.File.ReadAllText("day_15.txt");
string[] input = text.Split("\n");

int[,] floor = new int[input.Length, input[0].Length];
int[,] maxCost = new int[input.Length, input[0].Length];
for (int x = 0; x < floor.GetLength(0); x++)
{
    for (int y = 0; y < floor.GetLength(1); y++)
    {
        floor[x, y] = Int32.Parse(input[x][y].ToString());
        maxCost[x,y] = Int32.MaxValue;
    }
}
maxCost[0,0] = 0;


int[,] part2Floor = new int[input.Length * 5, input[0].Length * 5];
int[,] part2MaxCost = new int[input.Length * 5, input[0].Length * 5];
for (int x = 0; x < part2Floor.GetLength(0); x++)
{
    for (int y = 0; y < part2Floor.GetLength(1); y++)
    {
        int xPrime = x % input.Length;
        int yPrime = y % input[0].Length;
        int offset = (int)Math.Floor((double)x / (double)input.Length) + (int)Math.Floor((double)y / (double)input.Length);
        int value = (Int32.Parse(input[xPrime][yPrime].ToString()) + offset);
        if (value > 9) value -= 9;
        part2Floor[x, y] = value;
        part2MaxCost[x,y] = Int32.MaxValue;
    }
}
maxCost[0,0] = 0;


Console.WriteLine($"Part 1: {getLowestRisk2(floor, maxCost)}");
Console.WriteLine($"Part 2: {getLowestRisk2(part2Floor, part2MaxCost)}");


int getLowestRisk2(int[,] floor, int[,] maxCost)
{
    List<Tuple<int, int>> next = new List<Tuple<int, int>>();
    HashSet<string> visited = new HashSet<string>();
    next.Add(new Tuple<int, int>(0, 0));
    while (next.Count > 0)
    {
        List<Tuple<int, int>> nextNext = new List<Tuple<int, int>>();
        next = next.OrderBy(n => maxCost[n.Item1, n.Item2]).ToList();
        Tuple<int, int> current = next.First();
        next.RemoveAt(0);

        int x = current.Item1;
        int y = current.Item2;
        if (visited.Contains($"{x},{y}")) continue;
        visited.Add($"{x},{y}");
        if (x + 1 < floor.GetLength(0))
        {
            maxCost[x + 1, y] = Math.Min(maxCost[x+1,y], (x == 0 && y == 0 ? 0 : floor[x, y]) + (maxCost[x, y] == Int32.MaxValue ? 0 : maxCost[x,y]));
            next.Add(new Tuple<int, int>(x + 1, y));
        }
        if (y + 1 < floor.GetLength(1))
        {
            maxCost[x, y + 1] = Math.Min(maxCost[x,y+1], (x == 0 && y == 0 ? 0 : floor[x, y]) + (maxCost[x, y] == Int32.MaxValue ? 0 : maxCost[x,y]));
            next.Add(new Tuple<int, int>(x, y + 1));
        }
        if (x - 1 >= 0)
        {
            maxCost[x -1, y] = Math.Min(maxCost[x-1,y], (x == 0 && y == 0 ? 0 : floor[x, y]) + (maxCost[x, y] == Int32.MaxValue ? 0 : maxCost[x,y]));
            next.Add(new Tuple<int, int>(x - 1, y));
        }
        if (y - 1 >= 0)
        {
            maxCost[x, y - 1] = Math.Min(maxCost[x,y-1], (x == 0 && y == 0 ? 0 : floor[x, y]) + (maxCost[x, y] == Int32.MaxValue ? 0 : maxCost[x,y]));
            next.Add(new Tuple<int, int>(x, y - 1));
        }
    }
    return maxCost[maxCost.GetLength(0) - 1, maxCost.GetLength(1) - 1] + floor[floor.GetLength(0) - 1, floor.GetLength(1) - 1];
}


/**********
ATTEMPT 2
***********/


// int getLowestRisk(int[,] floor, int[,] maxCost)
// {
//     List<Tuple<int, int>> next = new List<Tuple<int, int>>();
//     next.Add(new Tuple<int, int>(floor.GetLength(0) - 1, floor.GetLength(1) - 1));
//     while (next.Count > 0)
//     {
//         List<Tuple<int, int>> nextNext = new List<Tuple<int, int>>();
//         next = next.OrderBy(n => floor[n.Item1, n.Item2]).ToList();
//         foreach (Tuple<int, int> current in next)
//         {
//             int x = current.Item1;
//             int y = current.Item2;

//             int lowest = Math.Min(getCostFromDirection(maxCost, x, y, "down") + getCostFromDirection(floor, x, y, "down"),
//             getCostFromDirection(maxCost, x, y, "right") + getCostFromDirection(floor, x, y, "right"));
//             maxCost[x, y] = (x == floor.GetLength(0) - 1 && y == floor.GetLength(1) - 1) ? 0 : lowest;
//             if (x - 1 >= 0) nextNext.Add(new Tuple<int, int>(x - 1, y)); // Add square to the left
//             if (x == maxCost.GetLength(0) - 1 && y - 1 >= 0) nextNext.Add(new Tuple<int, int>(x, y - 1)); // If rightmost square, add square above
//         }
//         next = nextNext;
//     }
//     return maxCost[0, 0];
// }


// int getCostFromDirection(int[,] costGrid, int x, int y, string dir)
// {
//     if (dir == "up") x -= 1;
//     if (dir == "down") x += 1;
//     if (dir == "left") y -= 1;
//     if (dir == "right") y += 1;
//     if (x < 0 || x >= costGrid.GetLength(0) || y < 0 || y >= costGrid.GetLength(1)) return 99999;
//     return costGrid[x, y];
// }

/*********
ATTEMPT 1
*********/

// int bestPathRiskFound = 0;
// for (int x = 1; x < floor.GetLength(0); x++)
// {
//     //Console.WriteLine(floor[x,0]);
//     bestPathRiskFound += floor[x, 0];
// }
// for (int y = 1; y < floor.GetLength(1); y++)
// {
//     //Console.WriteLine(floor[floor.GetLength(0) - 1, y]);
//     bestPathRiskFound += floor[floor.GetLength(0) - 1, y];
// }
// Console.WriteLine(bestPathRiskFound);



// LinkedList<Path> paths = new LinkedList<Path>();
// ConcurrentStack<Path> cp = new ConcurrentStack<Path>();
// paths.AddLast(new Path(0, 0, 0, 0));
// cp.Push(new Path(0, 0, 0, 0));
// string[] directions = new string[] { "down", "right", "up", "left" };
// int previousBest = bestPathRiskFound;
// Object thisLock = new Object();

// Action searchPaths = () =>
// {
//     Console.WriteLine($"Task started on {Task.CurrentId}");
//     int iterationsWithNoBestChange = 0;
//     while (paths.Count > 0)
//     {
//         Path current;
//         lock (thisLock)
//         {
//             current = paths.OrderByDescending(p => p.GetLength()).ThenBy(p => p.GetRisk()).First();
//             paths.Remove(current);
//             // current = paths.First();
//             // paths.RemoveAt(0);
//         }
//         //Console.Write("1");
//         //Path current;
//         //cp.TryPop(out current);
//         //if (current == null) break;
//         //Console.WriteLine(current.GetRisk());
//         foreach (string dir in directions)
//         {
//             Path p = new Path(current);
//             if (p.Move(floor, dir, bestPathRiskFound))
//             {

//                     //if (p.GetX() > 7 && p.GetY() > 7) Console.WriteLine($"{p.GetX()},{p.GetY()}");
//                     if (p.GetX() == floor.GetLength(0) - 1 && p.GetY() == floor.GetLength(1) - 1)
//                     {
//                         Console.WriteLine(p.GetRisk());
//                         Interlocked.Exchange(ref previousBest, bestPathRiskFound);
//                         //previousBest = bestPathRiskFound;
//                         Interlocked.Exchange(ref bestPathRiskFound, p.GetRisk());
//                     }
//                     else
//                     {
//                         lock(thisLock) {
//                         paths.AddLast(p);
//                         }
//                     }

//             }
//         }
//         if (previousBest == bestPathRiskFound)
//             iterationsWithNoBestChange++;
//         else
//             iterationsWithNoBestChange = 0;
//         if (iterationsWithNoBestChange > 1000000000) break;
//     }

// };

// var tasks = new Task[5];
// for (int i = 0; i < tasks.Length; i++)
//     tasks[i] = Task.Factory.StartNew(searchPaths);

// // Wait for all the tasks to finish up
// await Task.WhenAll(tasks);

// while (paths.Count > 0)
// {
//     paths = paths.OrderByDescending(p => p.GetLength()).ThenBy(p => p.GetRisk()).ToList();
//     //Console.Write("1");
//     Path current = paths.First();
//     paths.RemoveAt(0);
//     //Console.WriteLine(current.GetRisk());
//     foreach (string dir in directions)
//     {
//         Path p = new Path(current);
//         if (p.Move(floor, dir, bestPathRiskFound))
//         {
//             //if (p.GetX() > 7 && p.GetY() > 7) Console.WriteLine($"{p.GetX()},{p.GetY()}");
//             if (p.GetX() == floor.GetLength(0) - 1 && p.GetY() == floor.GetLength(1) - 1)
//             {
//                 Console.WriteLine(p.GetRisk());
//                 previousBest = bestPathRiskFound;
//                 bestPathRiskFound = p.GetRisk();
//             }
//             else
//             {
//                 paths.Add(p);
//             }
//         }
//     }
//     if (previousBest == bestPathRiskFound)
//         iterationsWithNoBestChange++;
//     else
//         iterationsWithNoBestChange = 0;
//     if (iterationsWithNoBestChange > 1000000000) break;
// }
//Console.WriteLine(bestPathRiskFound);


// class Path
// {

//     int x, y, risk, length;
//     public Path(int x, int y, int risk, int length)
//     {
//         this.x = x;
//         this.y = y;
//         this.risk = risk;
//         this.length = length;
//     }

//     public Path(Path p)
//     {
//         this.x = p.x;
//         this.y = p.y;
//         this.risk = p.risk;
//         this.length = p.length;
//     }

//     public void AddToRisk(int val)
//     {
//         risk += val;
//     }

//     public int GetRisk() { return risk; }
//     public int GetX() { return x; }
//     public int GetY() { return y; }
//     public int GetLength() { return length; }

//     public bool Move(int[,] floor, string dir, int bestRisk = Int32.MaxValue)
//     {
//         if (dir == "up") x -= 1;
//         if (dir == "down") x += 1;
//         if (dir == "left") y -= 1;
//         if (dir == "right") y += 1;
//         if (x < 0 || x >= floor.GetLength(0) || y < 0 || y >= floor.GetLength(1)) return false;
//         risk += floor[x, y];
//         length++;
//         if (risk > bestRisk) return false;
//         return true;
//     }
// }