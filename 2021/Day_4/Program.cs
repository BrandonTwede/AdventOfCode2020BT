string text = System.IO.File.ReadAllText("day_4.txt");
List<int> input = text.Split("\n\n").ToList()[0].Split(",").Select(val => Int32.Parse(val)).ToList();
List<string> boardsRaw = text.Split("\n\n").ToList();
boardsRaw.RemoveAt(0);

List<bingoBoard> boards = boardsRaw.Select(b => new bingoBoard(b)).ToList();

for (int round = 1; round <= input.Count; round++)
{
    List<int> calledNumbers = input.GetRange(0, round);
    bingoBoard? winner = boards.Find(b => b.isWinner(calledNumbers));
    if (winner != null)
    {
        Console.WriteLine(winner.ToString());
        Console.WriteLine($"Part 1: {winner.calculateScore(calledNumbers)}");
        break;
    }
}

List<bingoBoard> losingBoards = boards.ToList();
for (int round = 1; round <= input.Count && losingBoards.Count != 0; round++)
{
    List<int> calledNumbers = input.GetRange(0, round);
    List<bingoBoard> winners = losingBoards.FindAll(b => b.isWinner(calledNumbers));
    losingBoards.RemoveAll(board => winners.Contains(board));    
    if (losingBoards.Count == 0 && winners.Count == 1) {
        Console.WriteLine("\n" + winners[0].ToString());
        Console.WriteLine($"Part 2: {winners[0].calculateScore(calledNumbers)}");
    }   
}


class bingoBoard
{
    public bingoBoard(string boardRaw)
    {
        List<int> values = boardRaw.Split(new char[0], StringSplitOptions.RemoveEmptyEntries).Select(val => Int32.Parse(val)).ToList();
        for (int i = 0; i < board.GetLength(0); i++)
            for (int j = 0; j < board.GetLength(1); j++)
                board[i, j] = values[j + (i * 5)];
    }

    public int[,] board = new int[5, 5];

    public List<int> getColumn(int columnIndex)
    {
        List<int> column = new List<int>();
        for (int rowIndex = 0; rowIndex < board.GetLength(1); rowIndex++)
            column.Add(board[rowIndex, columnIndex]);
        return column;
    }

    public List<int> getRow(int rowIndex)
    {
        List<int> row = new List<int>();
        for (int columnIndex = 0; columnIndex < board.GetLength(0); columnIndex++)
            row.Add(board[rowIndex, columnIndex]);
        return row;
    }

    public bool isWinner(List<int> calledNumbers)
    {
        for (int i = 0; i < 5; i++)
        {
            if (getColumn(i).Intersect(calledNumbers).Count() == 5) return true;
            if (getRow(i).Intersect(calledNumbers).Count() == 5) return true;
        }
        return false;
    }

    public override string ToString() {
        return String.Join(Environment.NewLine,
            String.Join(' ', getRow(0)),
            String.Join(' ', getRow(1)),
            String.Join(' ', getRow(2)),
            String.Join(' ', getRow(3)),
            String.Join(' ', getRow(4))
        );
    }

    public int calculateScore(List<int> calledNumbers)
    {
        List<int> values = getRow(0).Concat(getRow(1)).Concat(getRow(2)).Concat(getRow(3)).Concat(getRow(4)).ToList();
        int uncalledSum = values.FindAll(val => !calledNumbers.Contains(val)).Sum();
        return uncalledSum * calledNumbers.Last();
    }
}