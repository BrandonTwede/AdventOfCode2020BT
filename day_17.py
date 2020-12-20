import copy

f = open("day_17_input.txt", "r")

filled_spaces = dict()
active = "#"
iterations = 6
part_1 = False

y = 0
for line in f:
    x = 0
    for c in line.strip():
        if c == active: 
            if part_1: filled_spaces["%d,%d,%d" % (x, y, 0)] = active
            else: filled_spaces["%d,%d,%d,%d" % (x, y, 0, 0)] = active
        x += 1
    y += 1
f.close()

def enlargen_bound(bound):
    return (bound[0] - 1, bound[1] + 1)

def get_board_bounds(filled_spaces):
    mins = [0, 0, 0] if part_1 else [0, 0, 0, 0]
    maxs = [0, 0, 0] if part_1 else [0, 0, 0, 0]
    for key in filled_spaces:
        for i, v in enumerate(key.split(",")):
            v = int(v)
            if v < mins[i]: mins[i] = v
            if v > maxs[i]: maxs[i] = v
    if part_1:
        return (mins[0], maxs[0]), (mins[1], maxs[1]), (mins[2], maxs[2])
    else: 
        return (mins[0], maxs[0]), (mins[1], maxs[1]), (mins[2], maxs[2]), (mins[3], maxs[3])

def count_neighbors(_x, _y, _z, board, _w=None):
    count = 0
    for x in range(_x - 1, _x + 2):
        for y in range(_y - 1, _y + 2):
            for z in range(_z - 1, _z + 2):
                if part_1:
                    if x == _x and y == _y and z == _z: continue
                    if ("%d,%d,%d" % (x, y, z)) in board: count += 1
                else:
                    for w in range(_w - 1, _w + 2):
                        if x == _x and y == _y and z == _z and w == _w: continue
                        if ("%d,%d,%d,%d" % (x, y, z, w)) in board: count += 1
    return count

def do_one_cycle(filled_spaces):
    if part_1: x_bounds, y_bounds, z_bounds = map(enlargen_bound, get_board_bounds(filled_spaces))
    else: x_bounds, y_bounds, z_bounds, w_bounds = map(enlargen_bound, get_board_bounds(filled_spaces))
    next_filled_spaces = dict()
    for x in range(x_bounds[0], x_bounds[1] + 1):
        for y in range(y_bounds[0], y_bounds[1] + 1):
            for z in range(z_bounds[0], z_bounds[1] + 1):
                if part_1:
                    neighbors = count_neighbors(x, y, z, filled_spaces)
                    key = "%d,%d,%d" % (x, y, z)
                    is_active = key in filled_spaces
                    if is_active and neighbors in [2, 3]: next_filled_spaces[key] = active
                    if not is_active and neighbors == 3: next_filled_spaces[key] = active
                else:
                    for w in range(w_bounds[0], w_bounds[1] + 1):
                        neighbors = count_neighbors(x, y, z, filled_spaces, w)
                        key = "%d,%d,%d,%d" % (x, y, z, w)
                        is_active = key in filled_spaces
                        if is_active and neighbors in [2, 3]: next_filled_spaces[key] = active
                        if not is_active and neighbors == 3: next_filled_spaces[key] = active

    return next_filled_spaces

next_state = copy.deepcopy(filled_spaces)        
for i in range(iterations):
    next_state = do_one_cycle(next_state)

print(len(next_state))
