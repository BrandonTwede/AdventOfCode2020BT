string text = System.IO.File.ReadAllText("day_8.txt");
List<string> lines = text.Split("\n").ToList();

int total = 0;
foreach (string line in lines)
{
    List<string> parts = line.Split("|").ToList();
    List<string> input = parts[0].Split(" ", StringSplitOptions.RemoveEmptyEntries).ToList();
    List<string> output = parts[1].Split(" ", StringSplitOptions.RemoveEmptyEntries).ToList();
    DigitModel model = new DigitModel(input.Concat(output).ToList());
    total += model.getNumberFromSequence(output).ToString().ToCharArray().Count(s => s == '1' || s == '4' || s == '7' || s == '8');
}
Console.WriteLine($"Part 1: {total}");

total = 0;
foreach (string line in lines)
{
    List<string> parts = line.Split("|").ToList();
    List<string> input = parts[0].Split(" ", StringSplitOptions.RemoveEmptyEntries).ToList();
    List<string> output = parts[1].Split(" ", StringSplitOptions.RemoveEmptyEntries).ToList();
    DigitModel model = new DigitModel(input.Concat(output).ToList());
    total += model.getNumberFromSequence(output);
}
Console.WriteLine($"Part 2: {total}");

class DigitModel
{

    List<char>? zero;
    List<char>? one;
    List<char>? two;
    List<char>? three;
    List<char>? four;
    List<char>? five;
    List<char>? six;
    List<char>? seven;
    List<char>? eight;
    List<char>? nine;

    public DigitModel(List<string> digits)
    {
        bool modelComplete = false;
        while (!modelComplete)
        {
            for (int i = 0; i < digits.Count; i++)
            {
                List<char> temp = digits[i].ToCharArray().ToList();
                temp.Sort();
                string segments = string.Join("", temp);
                if (digitAlreadyDefined(segments))
                {
                    digits.RemoveAt(i);
                    continue;
                }
                if (one == null && segments.Length == 2)
                {
                    one = segments.ToList<char>();
                    one.Sort();
                }
                else if (seven == null && segments.Length == 3)
                {
                    seven = segments.ToList<char>();
                    seven.Sort();
                }
                else if (four == null && segments.Length == 4)
                {
                    four = segments.ToList<char>();
                    four.Sort();
                }
                else if (eight == null && segments.Length == 7)
                {
                    eight = segments.ToList<char>();
                    eight.Sort();
                }
                else if (nine == null && four != null && segments.Length == 6 && four.Intersect(segments.ToList()).Count() == 4)
                {
                    nine = segments.ToList<char>();
                    nine.Sort();
                }
                else if (six == null && nine != null && segments.Length == 6 && nine.Intersect(segments.ToList()).Count() == 5
                    && one != null && one.Intersect(segments.ToList()).Count() == 1)
                {
                    six = segments.ToList<char>();
                    six.Sort();
                }
                else if (zero == null && nine != null && six != null && segments.Length == 6 && nine.Intersect(segments.ToList()).Count() == 5
                    && one != null && one.Intersect(segments.ToList()).Count() == 2)
                {
                    zero = segments.ToList<char>();
                    zero.Sort();
                }
                else if (three == null && one != null && segments.Length == 5 && one.Intersect(segments.ToList()).Count() == 2)
                {
                    three = segments.ToList<char>();
                    three.Sort();
                }
                else if (five == null && three != null && four != null && segments.Length == 5 && four.Intersect(segments.ToList()).Count() == 3
                    && six != null && six.Intersect(segments.ToList()).Count() == 5)
                {
                    five = segments.ToList<char>();
                    five.Sort();
                }
                else if (two == null && five != null && three != null && segments.Length == 5)
                {
                    two = segments.ToList<char>();
                    two.Sort();
                }

                if (zero != null && one != null && two != null && three != null && four != null && five != null && six != null && seven != null && eight != null && nine != null)
                    modelComplete = true;
            }
        }


    }

    private bool digitAlreadyDefined(string digit)
    {
        List<char> temp = digit.ToCharArray().ToList();
        temp.Sort();
        digit = string.Join("", temp);

        if ((one != null && String.Join("", one) == digit) || (two != null && String.Join("", two) == digit) || (three != null && String.Join("", three) == digit) ||
            (four != null && String.Join("", four) == digit) || (five != null && String.Join("", five) == digit) || (six != null && String.Join("", six) == digit) ||
            (seven != null && String.Join("", seven) == digit) || (eight != null && String.Join("", eight) == digit) || (nine != null && String.Join("", nine) == digit) ||
            (zero != null && String.Join("", zero) == digit))
            return true;
        return false;
    }

    private int segmentsToInt(string segments)
    {
        List<char> s = segments.ToList<char>();
        s.Sort();
        segments = string.Join("", s);
        if (one != null && string.Join("", one) == segments) return 1;
        if (two != null && string.Join("", two) == segments) return 2;
        if (three != null && string.Join("", three) == segments) return 3;
        if (four != null && string.Join("", four) == segments) return 4;
        if (five != null && string.Join("", five) == segments) return 5;
        if (six != null && string.Join("", six) == segments) return 6;
        if (seven != null && string.Join("", seven) == segments) return 7;
        if (eight != null && string.Join("", eight) == segments) return 8;
        if (nine != null && string.Join("", nine) == segments) return 9;
        if (zero != null && string.Join("", zero) == segments) return 0;
        throw new Exception("Segment not recognized: " + segments);
    }

    public int getNumberFromSequence(List<string> output)
    {
        return Int32.Parse(String.Join("", output.Select(o => this.segmentsToInt(o))));
    }
}