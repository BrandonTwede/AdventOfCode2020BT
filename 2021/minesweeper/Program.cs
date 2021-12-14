

bool gameIsOver = false;

Console.WriteLine("Welcome to Minesweeper!");
int size = getNumberInput("\nWhat size board do you want to play? (Enter a number): ", 2, 99);
int bombs = getNumberInput("\nHow many bombs do you want on the board? ", 1, size * size);

int getNumberInput(string prompt, int min, int max)
{
    bool hasValidInput = false;
    int value = 0;
    while (!hasValidInput)
    {
        Console.Write(prompt);
        try
        {
            value = Int32.Parse(Console.ReadLine());
            if (value < min || value > max)
            {
                Console.WriteLine($"Input must be between {min}-{max}");
            }
            else
            {
                hasValidInput = true;
            }
        }
        catch (Exception e)
        {
            Console.WriteLine("Input not recognized, please try again");
        }
    }
    return value;
}

Game minesweeper = new Game(size, bombs);
while (!gameIsOver)
{
    minesweeper.PrintBoard();
    Console.Write("\n1. Dig\n2. Add/Remove a Flag\n3. Quit\n\n");
    string input = Console.ReadLine();
    switch (input.ToLower().Trim())
    {
        case "1":
        case "d":
        case "dig":
            try
            {
                bool isStillAlive = minesweeper.Dig();

                if (!isStillAlive)
                {
                    Console.WriteLine("\nThat's a bomb, you have died!");

                    gameIsOver = true;
                }
            }
            catch (Exception e)
            {
                Console.WriteLine("Coordinates not recognized, please try again.");
            }
            Console.Write("\n");
            break;

        case "2":
        case "f":
        case "flag":
            try
            {
                minesweeper.ToggleFlag();
                if (minesweeper.AreAllFlagsPlayed())
                {
                    gameIsOver = true;
                    if (minesweeper.AreAllFlagsCorrect())
                    {
                        Console.WriteLine("You Won!");
                    }
                    else
                    {
                        Console.WriteLine("Sorry, your flags were not correct :(\n You lose!");
                    }
                }
            }
            catch (Exception e)
            {
                Console.WriteLine("Coordinates not recognized, please try again.");
            }

            break;
        case "exit":
        case "quit":
        case "3":
        case "e":
        case "q":
            Console.WriteLine("Thanks for playing!");
            Environment.Exit(0);
            break;
        default:
            Console.WriteLine("\nInput not recognized, please try again.\n");
            break;
    }
}

minesweeper.PrintBoard();


class Game
{
    int size;
    int bombCount;
    int[,] board;
    string[,] revealedBoard;


    public Game(int size, int bombCount)
    {
        this.size = size;
        this.bombCount = bombCount;
        this.board = setupGame(size, bombCount);
        this.revealedBoard = new string[size, size];

        for (int i = 0; i < revealedBoard.GetLength(0); i++)
        {
            for (int j = 0; j < revealedBoard.GetLength(1); j++)
            {
                this.revealedBoard[i, j] = "?";
            }
        }
    }

    public bool Dig()
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

        return true;
    }

    public void ToggleFlag()
    {
        Console.Write("\nWhich column? ");
        string input = Console.ReadLine();
        int row = Int32.Parse(input.Trim());
        Console.Write("Which row? ");
        input = Console.ReadLine();
        int column = Int32.Parse(input.Trim());
        string selectedSpaceValue = revealedBoard[column - 1, row - 1];
        if (selectedSpaceValue == "F")
        {
            revealedBoard[column - 1, row - 1] = "?";
        }
        else if (selectedSpaceValue == "?")
        {
            revealedBoard[column - 1, row - 1] = "F";
        }
        else
        {
            Console.WriteLine("\nYou cannot place a flag there - that space is already revealed");
        }
    }

    public bool AreAllFlagsCorrect()
    {
        bool allFlagsCorrect = true;
        for (int i = 0; i < board.GetLength(0); i++)
        {
            for (int j = 0; j < board.GetLength(1); j++)
            {
                if (revealedBoard[i, j] == "F")
                {
                    if (board[i, j] != 10)
                    {
                        return false;
                    }
                }
            }
        }

        return allFlagsCorrect;
    }


    public bool AreAllFlagsPlayed()
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

        return flagCount >= bombCount;
    }

    public void PrintBoard()
    {
        Console.Write("\n");
        for (int rowIndex = -1; rowIndex < revealedBoard.GetLength(0); rowIndex++)
        {
            if (rowIndex == -1) // Write column numbers first
            {
                Console.Write("     ");
                for (int a = 1; a <= board.GetLength(0); a++)
                {
                    Console.Write(a.ToString().PadRight(3, ' '));
                }
                Console.Write("\n    ".PadRight(board.GetLength(0) * 3 + 4, '-'));
            }
            else
            {
                Console.Write((rowIndex + 1).ToString().PadLeft(3, ' ') + " |"); // Write row number at beginning of row

                for (int colIndex = 0; colIndex < board.GetLength(1); colIndex++)    // Write minefield row
                {
                    string value = revealedBoard[rowIndex, colIndex];
                    if (value == "10")
                    {
                        Console.ForegroundColor = ConsoleColor.Red;
                        value = "*";
                    }
                    else if (value == "?")
                    {
                        Console.ForegroundColor = ConsoleColor.Green;
                    }
                    else if (value == "0")
                    {
                        Console.ForegroundColor = ConsoleColor.DarkGray;
                    }
                    else if (value == "F")
                    {
                        Console.ForegroundColor = ConsoleColor.Yellow;
                    }
                    else
                    {
                        Console.ForegroundColor = ConsoleColor.Blue;
                    }

                    Console.Write(value.PadRight(3, ' '));
                }
                Console.ResetColor();
            }
            Console.Write("\n");
        }
    }


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
                    if (x1 >= 0 && x1 < board.GetLength(0) && y1 >= 0 && y1 < board.GetLength(1))
                    {
                        if (x1 == x && y1 == y) continue;
                        stack.Push(new Tuple<int, int>(x1, y1));
                    }
                }
            }
        }
    }

    int[,] setupGame(int size, int bombCount)
    {
        int[,] board = new int[size, size];
        for (int i = 0; i < board.GetLength(0); i++)
        {
            for (int j = 0; j < board.GetLength(1); j++)
            {
                board[i, j] = 0;
            }
        }

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
                {
                    neighbors.Add(new Tuple<int, int>(x1, y1));
                }
            }
        }
        return neighbors;
    }

    void calculateNumbers(int[,] board)
    {
        for (int i = 0; i < board.GetLength(0); i++)
        {
            for (int j = 0; j < board.GetLength(1); j++)
            {
                if (board[i, j] == 10) continue;
                board[i, j] = getNeighbors(board, i, j).Count(n => board[n.Item1, n.Item2] == 10);
            }
        }
    }


}