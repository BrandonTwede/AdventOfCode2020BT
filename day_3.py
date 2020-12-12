# f = open("day_3_input.txt", "r")
f = open("day_3_input.txt", "r")
lines = []
for line in f:
    lines.append(line.strip())
f.close()


def is_loc_tree(x, y):
    # if y > len(lines): return False
    return lines[y][x % len(lines[0])] == "#"

x = 0
y = 0
x_change = 3
y_change = 1
trees_hit = 0
while y < len(lines):
    if is_loc_tree(x, y):
        trees_hit += 1
    x += x_change
    y += y_change
print(trees_hit)

# Part 2
print(70*171*48*60*35)