int size = 9;
int bombCount = 25;


int[,] board = setupGame(size, bombCount);
string[,] revealedBoard = new string[size, size];

for (int i = 0; i < revealedBoard.GetLength(0); i++)
    for (int j = 0; j < revealedBoard.GetLength(1); j++)
        revealedBoard[i, j] = "?";


void revealZeros(int x, int y)
{
    Stack<Tuple<int, int>> stack = new Stack<Tuple<int, int>>();
    stack.Push(new Tuple<int, int>(x, y));
    while (stack.Count() > 0)
    {
        Tuple<int, int> current = stack.Pop();
        x = current.Item1;
        y = current.Item2;
        if (revealedBoard[x, y] != "?") continue;
        revealedBoard[x, y] = board[x, y].ToString();
        if (board[x, y].ToString() != "0") continue;


        for (int i = -1; i <= 1; i++)
        {
            for (int j = -1; j <= 1; j++)
            {
                int x1 = x + i, y1 = y + j;
                Console.WriteLine($"{x1},{y1}");
                if (x1 >= 0 && x1 < board.GetLength(0) && y1 >= 0 && y1 < board.GetLength(1))
                {
                    if (x1 == x && y1 == y) continue;
                    stack.Push(new Tuple<int, int>(x1, y1));
                }
            }
        }
    }
}


bool Dig()
{
    try
    {
        Console.Write("\nWhich column? ");
        string input = Console.ReadLine();
        int row = Int32.Parse(input.Trim());
        Console.Write("Which row? ");
        input = Console.ReadLine();
        int column = Int32.Parse(input.Trim());
        //Console.WriteLine($"You selected {row},{column}\n");
        int revealedValue = board[column - 1, row - 1];
        if (revealedValue == 0) revealZeros(column - 1, row - 1);
        else
        {
            revealedBoard[column - 1, row - 1] = board[column - 1, row - 1].ToString();
            if (revealedValue == 10) return false;
        }

    }
    catch (Exception e)
    {
        Console.WriteLine("Coordinates not recognized, please try again.");
    }
    Console.Write("\n");
    return true;
}

void PlaceFlag()
{
    try
    {
        Console.Write("\nWhich column? ");
        string input = Console.ReadLine();
        int row = Int32.Parse(input.Trim());
        Console.Write("Which row? ");
        input = Console.ReadLine();
        int column = Int32.Parse(input.Trim());
        revealedBoard[column - 1, row - 1] = "F";
    }
    catch (Exception e)
    {
        Console.WriteLine("Coordinates not recognized, please try again.");
    }
}

bool checkForWin()
{
    bool allFlagsCorrect = true;
    for (int i = 0; i < board.GetLength(0); i++)
    {
        for (int j = 0; j < board.GetLength(1); j++)
        {
            if (revealedBoard[i, j] == "F")
            {
                if (board[i, j] != 10) return false;

            }
        }
    }

    return allFlagsCorrect;
}

int countFlagsPlayed()
{
    int flagCount = 0;
    int[,] board = new int[size, size];
    for (int i = 0; i < board.GetLength(0); i++)
        for (int j = 0; j < board.GetLength(1); j++)
        {
            if (revealedBoard[i, j] == "F")
            {
                flagCount++;
            }
        }

    return flagCount;
}

bool gameIsOver = false;
while (!gameIsOver)
{
    printBoard(revealedBoard);
    Console.Write("\n1. Dig\n2. Place a Flag\n3. Quit\n\n");
    string input = Console.ReadLine();
    switch (input.ToLower().Trim())
    {
        case "1":
        case "d":
        case "dig":
            bool isStillAlive = Dig();

            if (!isStillAlive)
            {
                Console.WriteLine("\nThat's a bomb, you have died!");
                printBoard(revealedBoard);
                gameIsOver = true;
            }
            break;

        case "2":
        case "f":
        case "flag":
            PlaceFlag();

            if (countFlagsPlayed() >= bombCount)
            {
                bool didWin = checkForWin();
                if (didWin)
                {
                    Console.WriteLine("You Won!");
                    gameIsOver = true;
                    printBoard(revealedBoard);
                }
                else
                {
                    Console.WriteLine("Sorry, your flags were not correct :(\n You lose!");
                    gameIsOver = true;
                    printBoard(revealedBoard);
                }
            }

            break;
        case "exit":
        case "quit":
        case "3":
        case "e":
        case "q":
            Environment.Exit(0);
            break;
        default:
            Console.WriteLine("\nInput not recognized, please try again.\n");
            break;
    }
}

void printBoard(string[,] board)
{
    Console.Write("\n");
    for (int i = -1; i < board.GetLength(0); i++)
    {
        if (i == -1)
        {
            Console.Write("  ");
            for (int a = 1; a <= board.GetLength(0); a++)
                Console.Write(a.ToString().PadRight(2, ' '));
            Console.Write("\n  ");
            for (int a = 0; a < board.GetLength(0); a++) Console.Write("--");
        }
        else
        {
            Console.Write((i + 1).ToString() + "|");
        }
        for (int j = 0; j < board.GetLength(1); j++)
        {
            if (i == -1) continue;
            Console.Write(board[i, j] == "10" ? "*".PadRight(2, ' ') : board[i, j].ToString().PadRight(2, ' '));
        }
        Console.Write("\n");
    }
}




int[,] setupGame(int size, int bombCount)
{
    int[,] board = new int[size, size];
    for (int i = 0; i < board.GetLength(0); i++)
        for (int j = 0; j < board.GetLength(1); j++)
            board[i, j] = 0;

    placeBombs(board, bombCount);
    calculateNumbers(board);
    return board;
}

void placeBombs(int[,] board, int bombCount)
{
    int bombsPlaced = 0;
    Random r = new Random();
    while (bombsPlaced < bombCount)
    {
        int x = r.Next(size);
        int y = r.Next(size);
        if (board[x, y] != 10)
        {
            board[x, y] = 10;
            bombsPlaced++;
        }
    }
}

List<Tuple<int, int>> getNeighbors(int[,] grid, int x, int y)
{
    List<Tuple<int, int>> neighbors = new List<Tuple<int, int>>();
    for (int i = -1; i <= 1; i++)
    {
        for (int j = -1; j <= 1; j++)
        {
            int x1 = x + i, y1 = y + j;
            if (x1 >= 0 && x1 < grid.GetLength(0) && y1 >= 0 && y1 < grid.GetLength(1))
                neighbors.Add(new Tuple<int, int>(x1, y1));
        }
    }
    return neighbors;
}

void calculateNumbers(int[,] board)
{
    for (int i = 0; i < board.GetLength(0); i++)
        for (int j = 0; j < board.GetLength(1); j++)
        {
            if (board[i, j] == 10) continue;
            board[i, j] = getNeighbors(board, i, j).Count(n => board[n.Item1, n.Item2] == 10);
        }
}
