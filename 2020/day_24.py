import copy

f = open("2020/day_24_input.txt", "r")

dirs = ["e", "w", "se", "sw", "ne", "nw"]

def get_next_direction(line):
    compound_dirs = ["se", "sw", "ne", "nw"]
    if len(line) > 1 and line[:2] in compound_dirs:
        return line[:2], line[2:]
    return line[:1], line[1:]

identifiers = list()
for line in f:
    ident = list()
    while len(line) > 0:
        next_dir, line = get_next_direction(line.strip())
        ident.append(next_dir)
    identifiers.append(ident)
f.close()


def update_coordinate(q, r, dir):
    if dir == "ne":
        q += 1
        r -= 1
    if dir == "se":
        r += 1
    if dir == "e":
        q += 1
    if dir == "nw":
        r -= 1
    if dir == "w":
        q -= 1
    if dir == "sw":
        q -= 1
        r += 1
    return q, r

black_coordinates = dict()

for ident in identifiers:
    q = 0
    r = 0
    for dir in ident:
        q, r = update_coordinate(q, r, dir)
    coordinate = "%d,%d" % (q,r)
    if coordinate in black_coordinates: del black_coordinates[coordinate]
    else: black_coordinates[coordinate] = True
print("Solution to Part 1: %d" % len(black_coordinates))

def get_all_adjacent(coord, bank, color):
    tiles = []
    q, r = coord.split(",")
    for d in dirs:
        c = "%d,%d" % update_coordinate(int(q), int(r), d)
        if color == "white" and c not in bank: tiles.append(c)
        if color == "black" and c in bank: tiles.append(c)
    return tiles

def find_surrounding_white_tiles(black_tiles):
    white_tiles = set()
    for coord in black_tiles:
        white_tiles.update(get_all_adjacent(coord, black_tiles, "white"))
    return list(white_tiles)

def do_round(black_tiles):
    prev_round = copy.deepcopy(black_tiles)
    next_tiles = dict()
    white_tiles = find_surrounding_white_tiles(prev_round)
    for tile in white_tiles:
        if len(get_all_adjacent(tile, prev_round, "black")) == 2: next_tiles[tile] = True
    for tile in black_tiles:
        neighbor_count = len(get_all_adjacent(tile, prev_round, "black"))
        if neighbor_count in [1,2]: next_tiles[tile] = True
    return next_tiles

for i in range(100):
    black_coordinates = do_round(black_coordinates)
    if (i + 1) in [1,2,3,4,5,6,7,8,9,10,20,30,40,50,60,70,80,90,100]: print("Round %d: %d" % (i+1,len(black_coordinates)))