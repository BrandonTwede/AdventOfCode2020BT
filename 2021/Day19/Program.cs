string[] scannersRaw = System.IO.File.ReadAllText("day_19.txt").Split("\n\n");


class Beacons {

    class Coordinate {
        public Coordinate(int x, int y, int z) {

        }
    }

    public Beacons(string input) {
        string[] points = input.Split("\n").Where(l => l.Contains(',')).ToArray();
    }
}

