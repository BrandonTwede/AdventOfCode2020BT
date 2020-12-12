f = open("day_12_input.txt", "r")
instructions = []
for line in f:
    instructions.append([line[0], int(line[1:])])
f.close()

dirs = ["N", "E", "S", "W"]
x_pos = 0
y_pos = 0
cur_dir = 1

def move_dir(x, y, dir, dist):
    if dir == "N": y += dist
    if dir == "E": x += dist
    if dir == "S": y -= dist
    if dir == "W": x -= dist
    return x, y

for instruction in instructions:
    command = instruction[0]
    distance = instruction[1]
    if command in ["L", "R"]:
        turns = int(distance / 90)
        if command == "L": turns *= -1
        cur_dir += turns
        cur_dir = cur_dir % 4
    if command in dirs:
        x_pos, y_pos = move_dir(x_pos, y_pos, command, distance)
    if command == "F":
        x_pos, y_pos = move_dir(x_pos, y_pos, dirs[cur_dir], distance)

print("Part 1 Solution: " + str(abs(x_pos) + abs(y_pos)))

# Part 2
x_pos = 0
y_pos = 0
cur_dir = 1

waypt_x_pos = 10
waypt_y_pos = 1

def move_to_waypoint(x, y, way_x, way_y, dist):
    x += way_x * dist
    y += way_y * dist
    return x, y

def rotate_waypoint(x, y, dir, dist):
    for i in range(int(dist / 90)):
        if dir == "L": x, y = -y, x
        if dir == "R": x, y = y, -x
    return x, y

for instruction in instructions:
    command = instruction[0]
    distance = instruction[1]
    if command in ["L", "R"]:
        waypt_x_pos, waypt_y_pos = rotate_waypoint(waypt_x_pos, waypt_y_pos, command, distance)
    if command in dirs:
        waypt_x_pos, waypt_y_pos = move_dir(waypt_x_pos, waypt_y_pos, command, distance)
    if command == "F":
        x_pos, y_pos = move_to_waypoint(x_pos, y_pos, waypt_x_pos, waypt_y_pos, distance)

print("Part 2 Solution: " + str(abs(x_pos) + abs(y_pos)))
