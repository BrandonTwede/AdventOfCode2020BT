string text = System.IO.File.ReadAllText("day_12.txt");
List<string> connections = text.Split("\n").ToList();

Dictionary<string, List<string>> caveConnectionsLookup = new Dictionary<string, List<string>>();
List<string> caveNames = connections.Select(c => c.Split("-").ToList()).Aggregate((all, next) => all.Concat(next).ToList()).Distinct().ToList();
caveNames.ForEach(cave => caveConnectionsLookup.Add(cave, new List<string>()));
foreach (string[] names in connections.Select(c => c.Split("-"))) {
    caveConnectionsLookup[names[0]].Add(names[1]);
    caveConnectionsLookup[names[1]].Add(names[0]);
}

int countValidPaths(bool isPart1 = true) {
    Stack<Trip> tripsInProgress = new Stack<Trip>();
    tripsInProgress.Push(new Trip(new List<string>(){"start"}));
    List<Trip> completedTrips = new List<Trip>();
    while(tripsInProgress.Count > 0) {
        Trip currentTrip = tripsInProgress.Pop();
        foreach(string connection in caveConnectionsLookup[currentTrip.GetCurrentCave()]) {
            if (connection == "start") continue;
            Trip nextTrip = currentTrip.Copy();
            if (nextTrip.VisitCave(connection, isPart1: isPart1)) {
                if (connection == "end") completedTrips.Add(nextTrip);
                else tripsInProgress.Push(nextTrip);
            }
        }
    }
    return completedTrips.Count;
}

Console.WriteLine($"Part 1: {countValidPaths(isPart1: true)}");
Console.WriteLine($"Part 2: {countValidPaths(isPart1: false)}");

class Trip{

    List<string> cavesVisited = new List<string>();

    public Trip(List<string> visited) {
        cavesVisited = visited.ToList();
    }

    public Trip Copy() {
        Trip t = new Trip(cavesVisited);
        return t;
    }

    public bool VisitCave(string name, bool isPart1 = true) {
        if (isPart1) {
            if(name.All(char.IsLower) && name != "end" && cavesVisited.Contains(name)) return false;
            cavesVisited.Add(name);
        } else {
            cavesVisited.Add(name);
            bool onlyOneVisitedTwice = cavesVisited.Where(n => n.All(char.IsLower)).GroupBy(n => n).Count(n => n.Count() == 2) <= 1;
            bool noneVisitedThrice = cavesVisited.Where(n => n.All(char.IsLower)).GroupBy(n => n).Count(n => n.Count() > 2) == 0;
            if(!onlyOneVisitedTwice || !noneVisitedThrice) return false;
        }
        return true;
    }

    public string GetCurrentCave() {
        return cavesVisited.Last();
    }
}