string text = System.IO.File.ReadAllText("day_16.txt");
Packet p = new Packet(text);
Console.WriteLine($"Part 1: {p.GetVersionSum()}");
Console.WriteLine($"Part 2: {p.GetValue()}");

// TESTS
// Console.WriteLine(new Packet("D2FE28"));
// Console.WriteLine(new Packet("38006F45291200"));

// Console.WriteLine(new Packet("EE00D40C823060"));

// Console.WriteLine("Test 1: " + new Packet("8A004A801A8002F478"));
// Console.WriteLine("Test 2: " + new Packet("620080001611562C8802118E34"));
// Console.WriteLine("Test 3: " + new Packet("C0015000016115A2E0802F182340").GetVersionSum());
// Console.WriteLine("Test 4: " + new Packet("A0016C880162017C3686B18A3D4780").GetVersionSum());

class Packet { 
    List<Packet> subpackets = new List<Packet>();
    int version;
    int typeId;
    long literal;
    char lengthTypeId = (char)0;
    int contentLength;
    int binaryLength;

    string remnantBinary = "";

    string GetRemnant() { return remnantBinary; }

    public int GetVersionSum() {
        int sum = version;
        foreach(Packet p in subpackets) sum += p.GetVersionSum();
        return sum;
    }

    public long GetValue() {
        if (typeId == 4) return literal;
        if (typeId == 0) return subpackets.Select(p => p.GetValue()).Sum();
        if (typeId == 1) return subpackets.Select(p => p.GetValue()).Aggregate((long)1, (all, next) => all * next); // Multiply
        if (typeId == 2) return subpackets.Select(p => p.GetValue()).Min(); // Minimum
        if (typeId == 3) return subpackets.Select(p => p.GetValue()).Max(); // Maximum
        if (typeId == 5) return subpackets[0].GetValue() > subpackets[1].GetValue() ? 1 : 0; // Greater than
        if (typeId == 6) return subpackets[0].GetValue() < subpackets[1].GetValue() ? 1 : 0; // Less than
        if (typeId == 7) return subpackets[0].GetValue() == subpackets[1].GetValue() ? 1 : 0; // Equals
        return 0;
    }

    string hexToBinary(string input) {
        return String.Join(String.Empty, input.Select(c => Convert.ToString(Convert.ToInt32(c.ToString(), 16), 2).PadLeft(4, '0')));
    }

    public override string ToString()
    {
        string output = $"Version: {version}, Type: {typeId},";
        if (typeId == 4) output += $" Literal: {literal},";
        else output += $" Content Length: {contentLength},";
        output += $" Remnant: {remnantBinary},";
        foreach(Packet p in subpackets) {
            output += $"\n\t{p}";
        }
        return output;
    }

    public Packet(string input, bool isBinary = false) {
        string binary = isBinary ? input : hexToBinary(input);
        version = Convert.ToInt32(string.Join("", binary.Substring(0,3)), 2);
        typeId = Convert.ToInt32(string.Join("", binary.Substring(3,3)), 2);
        if (typeId == 4) {
            int charsTaken = 0;
            bool endFound = false;
            int idx = 0;
            string literalBinary = "";
            while (!endFound) {
                idx = 6 + charsTaken;
                if (!endFound) {
                    endFound = binary[idx] == '0';
                    literalBinary += binary.Substring(idx + 1, 4);
                    charsTaken += 5;
                }
            }
            remnantBinary = binary.Substring(6 + charsTaken);
            literal = Convert.ToInt64(string.Join("", literalBinary), 2);
        } else {
            lengthTypeId = binary[6];
            if (lengthTypeId == '0') {
                contentLength = Convert.ToInt32(string.Join("", binary.Substring(7, 15)), 2);
                string subBinary = binary.Substring(7 + 15, contentLength);
                subpackets.Add(new Packet(subBinary, isBinary: true));
                while (subpackets.Last().GetRemnant().Length > 10)
                    subpackets.Add(new Packet(subpackets.Last().GetRemnant(), isBinary: true));
                remnantBinary = binary.Substring(7 + 15 + contentLength);
            } else {
                contentLength = Convert.ToInt32(string.Join("", binary.Substring(7, 11)), 2);
                subpackets.Add(new Packet(binary.Substring(7 + 11), isBinary: true));
                for (int i = 0; i < contentLength - 1; i++) {
                    subpackets.Add(new Packet(subpackets.Last().GetRemnant(), isBinary: true));
                }
                remnantBinary = subpackets.Last().GetRemnant();
            }
        }
        binaryLength = binary.Length - remnantBinary.Length;
    }
}