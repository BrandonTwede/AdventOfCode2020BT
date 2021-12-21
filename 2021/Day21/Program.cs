Die die = new Die();

Player p1 = new Player(8);
Player p2 = new Player(4);
bool isP1Turn = true;

while (p1.GetScore() < 1000 && p2.GetScore() < 1000)
{
    if (isP1Turn) p1.TakeTurn(die); else p2.TakeTurn(die);
    isP1Turn = !isP1Turn;
}
Console.WriteLine($"Part 1: {new int[2] { p1.GetScore(), p2.GetScore() }.Min() * die.GetRollCount()}");


LinkedList<Game> games = new LinkedList<Game>();
var outcomeTotals = new Dictionary<int, int>
{
    {3, 1},
    {4, 3},
    {5, 6},
    {6, 7},
    {7, 6},
    {8, 3},
    {9, 1}
};

Console.Write("Calculating Part 2");
long p1Wins = 0;
long p2Wins = 0;
games.AddLast(new Game(21, 8, 4));
long i = 1;
while(games.Count > 0) {
    Game current = games.Last.Value;
    games.RemoveLast();
    long additionalWins = current.Step(games, outcomeTotals);
    if (current.GetTurn() == "p1") p1Wins += additionalWins;
    else p2Wins += additionalWins;
    if (i++ % 2500000 == 0) Console.Write(" .");
}
Console.WriteLine($"\n{p1Wins} vs {p2Wins}");
Console.WriteLine($"Part 2: {new long[2] { p1Wins, p2Wins }.Max()}");

class Game
{
    Player p1;
    Player p2;

    int targetScore;

    long gameCardinality = 1;

    bool isP1Turn = true;

    public Game(int targetScore, int p1StartPos, int p2StartPos)
    {
        p1 = new Player(p1StartPos);
        p2 = new Player(p2StartPos);
        this.targetScore = targetScore;
    }

    public Game(int targetScore, Player p1, Player p2, bool isP1Turn, long gameCardinality)
    {
        this.p1 = p1;
        this.p2 = p2;
        this.targetScore = targetScore;
        this.isP1Turn = isP1Turn;
        this.gameCardinality = gameCardinality;
    }

    public Game MakeCopy(bool isP1Turn)
    {
        return new Game(targetScore, new Player(p1), new Player(p2), isP1Turn, gameCardinality);
    }

    public long Step(LinkedList<Game> games, Dictionary<int, int> outcomeTotals)
    {

        long winCount = 0;
        if (isP1Turn)
        {
            
            foreach (int rollTotal in outcomeTotals.Keys)
            {
                Game temp = this.MakeCopy(!isP1Turn);
                temp.p1.TakeTurn(rollTotal);
                temp.gameCardinality = temp.gameCardinality * outcomeTotals[rollTotal];

                if (temp.p1.GetScore() >= targetScore) {winCount+= temp.gameCardinality;}
                else {games.AddLast(temp);}
            }
        } else {
            foreach (int rollTotal in outcomeTotals.Keys)
            {
                Game temp = this.MakeCopy(!isP1Turn);
                temp.p2.TakeTurn(rollTotal);
                temp.gameCardinality = temp.gameCardinality * outcomeTotals[rollTotal];

                if (temp.p2.GetScore() >= targetScore) {winCount+= temp.gameCardinality;}
                else {games.AddLast(temp);}
            }
        }
        return winCount;
    }

    public string GetTurn() {
        return isP1Turn ? "p1" : "p2";
    }
}

class Player
{
    int position = 0;
    int score = 0;

    public Player(int position)
    {
        this.position = position;
    }

    public Player(Player p)
    {
        this.position = p.position;
        this.score = p.score;
    }

    public void TakeTurn(Die die)
    {
        position = (position + die.Roll() + die.Roll() + die.Roll()) % 10;
        score += position == 0 ? 10 : position;
    }

    public void TakeTurn(int moveSpaces)
    {
        position = (position + moveSpaces) % 10;
        score += position == 0 ? 10 : position;
    }

    public int GetScore() { return score; }
    public int GetPosition() { return position; }
}

class Die
{
    protected int value = 1;
    protected int rollCount = 0;

    public int Roll()
    {
        if (value > 100) value = 1;
        rollCount++;
        return value++;
    }

    public int GetRollCount()
    {
        return rollCount;
    }
}