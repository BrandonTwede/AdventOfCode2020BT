using System.Text.RegularExpressions;

string text = "target area: x=282..314, y=-80..-45";    // REAL
//text = "target area: x=20..30, y=-10..-5";            // TESTING
string pattern = @"target area: x=(.*)\.\.(.*), y=(.*)\.\.(.*)";
Match match = Regex.Match(text, pattern);
int xMin = Int32.Parse(match.Groups[1].Value);
int xMax = Int32.Parse(match.Groups[2].Value);
int yMin = Int32.Parse(match.Groups[3].Value);
int yMax = Int32.Parse(match.Groups[4].Value);
Target target = new Target(xMin, xMax, yMin, yMax);

int highestY = 0;
int possibleTrajectories = 0;
for (int xVel = 1; xVel < xMax * 2; xVel++)
{
    for (int yVel = yMin; yVel < 80; yVel++)
    {
        int result = testTrajectory(xVel, yVel);
        if (result != Int32.MinValue) possibleTrajectories++;
        if (result > highestY) highestY = result;
    }
}
Console.WriteLine($"Part 1: {highestY}");
Console.WriteLine($"Part 2: {possibleTrajectories}");


int testTrajectory(int xVel, int yVel)
{
    Trajectory trajectory = new Trajectory(0, 0, xVel, yVel);
    for (; !target.IsPositionPastTarget(trajectory.GetPosition()); trajectory.DoStep())
        if (target.IsPositionInTarget(trajectory.GetPosition()))
            return trajectory.GetHighestY();
    return Int32.MinValue;
}

class Trajectory
{

    int xPos, yPos, xVel, yVel;
    int highestYReached = 0;

    public Trajectory(int xPos, int yPos, int xVel, int yVel)
    {
        this.xPos = xPos;
        this.yPos = yPos;
        this.xVel = xVel;
        this.yVel = yVel;
    }

    public void DoStep()
    {
        xPos += xVel;
        yPos += yVel;
        if (xVel != 0) xVel += xVel > 0 ? -1 : 1;
        yVel--;
        if (yPos > highestYReached) highestYReached = yPos;
    }

    public int GetHighestY()
    {
        return highestYReached;
    }

    public Tuple<int, int> GetPosition()
    {
        return new Tuple<int, int>(xPos, yPos);
    }

}

class Target
{
    int xMin, xMax, yMin, yMax;
    public Target(int xMin, int xMax, int yMin, int yMax)
    {
        this.xMin = xMin;
        this.xMax = xMax;
        this.yMin = yMin;
        this.yMax = yMax;
    }

    public bool IsPositionInTarget(Tuple<int, int> pos)
    {
        int x = pos.Item1; int y = pos.Item2;
        return x >= xMin && x <= xMax && y >= yMin && y <= yMax;
    }

    public bool IsPositionPastTarget(Tuple<int, int> pos)
    {
        return (pos.Item2 < yMin);
    }
}