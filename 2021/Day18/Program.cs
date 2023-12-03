string text = System.IO.File.ReadAllText("day_18.txt");

class SnailFishNum
{

    // SnailFishNum left = null;
    // SnailFishNum? right = null;

    long value = -1;

    // public SnailFishNum(string num)
    // {
    //     if (num.Length == 1) return SnailFishNum(Int32.Parse(num));
    //     num = num.Substring(1, num.Length - 2); // TODO: Add if statement to only do this if
    //     int completeBracketCount = 0;
    //     int middleIdx = -1;
    //     for (int i = 0; i < num.Length; i++)
    //     {
    //         char c = num[i];
    //         if (c == '[') completeBracketCount++;
    //         if (c == ']') completeBracketCount--;
    //         if (c == ',' && completeBracketCount == 0)
    //         {
    //             middleIdx = i;
    //             break;
    //         }
    //     }
    //     left = SnailFishNum(num.Substring())

    // }

    // public SnailFishNum(int value)
    // {
    //     this.value = value;
    // }

    public SnailFishNum(SnailFishNum l, SnailFishNum r)
    {
        this.left = l;
        this.right = r;
    }

    SnailFishNum? findPairToExplode(int level)
    {
        return null;
    }

    bool Reduce()
    {
        // Find any pairs in need of exploding

        // Find any pairs in need of splitting

        return false;
    }

}