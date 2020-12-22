import copy
import math
import re

f = open("day_20_input.txt", "r")
full_text = f.read()
f.close()

tiles_text = full_text.strip().split("\n\n")
tiles = dict()
unplaced_tiles = dict()
for tile in tiles_text:
    image = []
    for i, line in enumerate(tile.split("\n")):
        if i == 0:
            id = line.strip("Tile: ")
            continue
        image.append(list(line.strip()))
    tiles[id] = image
    unplaced_tiles[id] = image
        
placed_tiles = dict()
placed_tiles["0,0"] = list(tiles.keys())[0]
del unplaced_tiles[placed_tiles["0,0"]]

def print_tile(image):
    for row in image:
        print(''.join(row))

def get_edge(edge, image, tile_id=None):
    if tile_id: image = tiles[tile_id]
    if edge == "top": return ''.join(image[0])
    if edge == "bottom": return ''.join(image[-1])
    result = []
    idx = 0 if edge == "left" else -1
    for row in image:
        result.append(row[idx])
    return ''.join(result)

def mirror_flip(image):
    for i, row in enumerate(image):
        image[i] = list(reversed(row))
    return image

def rotate_image(image, times):
    for i in range(times):
        image = list(zip(*image[::-1]))
    for i in range(len(image)):
        image[i] = list(image[i])
    return image

def get_all_tile_permutations(id, start_image=None):
    all_configurations = []
    if start_image == None: start_image = tiles[id]
    all_configurations.append(copy.deepcopy(start_image)) #Original
    all_configurations.append(rotate_image(copy.deepcopy(start_image), 1)) # Rotate once
    all_configurations.append(rotate_image(copy.deepcopy(start_image), 2)) # Rotate twice
    all_configurations.append(rotate_image(copy.deepcopy(start_image), 3)) # Rotate thrice
    all_configurations.append(mirror_flip(copy.deepcopy(start_image))) # Flip once
    all_configurations.append(mirror_flip(rotate_image(copy.deepcopy(start_image), 1))) # Rotate once and flip
    all_configurations.append(mirror_flip(rotate_image(copy.deepcopy(start_image), 2))) # Rotate twice and flip
    all_configurations.append(rotate_image(mirror_flip(copy.deepcopy(start_image)), 1)) # Flip then rotate once
    return all_configurations

def get_all_matching_edge(id_to_check, placed_edge, unplaced_edge, config_pool, unplaced_id):
    matches = []
    if id_to_check in placed_tiles:
        id = placed_tiles[id_to_check]
        if id == "X": return copy.deepcopy(config_pool)
        needs_to_match = get_edge(placed_edge, None, id)
        for config in config_pool:
            if needs_to_match == get_edge(unplaced_edge, config):
                matches.append(config)
    else: return copy.deepcopy(config_pool)
    return matches

def find_piece_fitting_coordinate(x, y):
    for unplaced_id,piece in unplaced_tiles.items():
        configurations = get_all_tile_permutations(unplaced_id)
        remaining_configurations = []
        remaining_configurations = get_all_matching_edge("%d,%d" % (x-1, y), "bottom", "top", configurations, unplaced_id)
        remaining_configurations = get_all_matching_edge("%d,%d" % (x+1, y), "top", "bottom", remaining_configurations, unplaced_id)
        remaining_configurations = get_all_matching_edge("%d,%d" % (x, y-1), "right", "left", remaining_configurations, unplaced_id)
        remaining_configurations = get_all_matching_edge("%d,%d" % (x, y+1), "left", "right", remaining_configurations, unplaced_id)
        
        if len(remaining_configurations) == 1:
            tiles[unplaced_id] = remaining_configurations[0] #Save fitting tile orientation
            unplaced_tiles[unplaced_id] = remaining_configurations[0]
            return unplaced_id
    return None

def get_board_bounds(board):
    mins = [0, 0]
    maxs = [0, 0]
    for key, value in board.items():
        if value == "X": continue
        for i, v in enumerate(key.split(",")):
            v = int(v)
            if v < mins[i]: mins[i] = v
            if v > maxs[i]: maxs[i] = v
    return (mins[0], maxs[0]), (mins[1], maxs[1])

while len(unplaced_tiles) > 0:
    tile_placed = False
    for placed_id, placed_image in placed_tiles.items():
        if placed_image == "X": continue
        placed_x, placed_y = list(map(int, placed_id.split(",")))
        tile_placed = False
        for x in range(placed_x - 1, placed_x + 2):
            next_coord = "%d,%d" % (x, placed_y)
            if x == placed_x or (next_coord in placed_tiles): continue
            next_id = find_piece_fitting_coordinate(x, placed_y)
            if next_id != None:
                placed_tiles[next_coord] = next_id
                del unplaced_tiles[next_id]
            else: placed_tiles[next_coord] = "X"
            tile_placed = True
        for y in range(placed_y - 1, placed_y + 2):
            next_coord = "%d,%d" % (placed_x, y)
            if y == placed_y or (next_coord in placed_tiles): continue
            next_id = find_piece_fitting_coordinate(placed_x, y)
            if next_id != None:
                placed_tiles[next_coord] = next_id
                del unplaced_tiles[next_id]
            else: placed_tiles[next_coord] = "X"
            tile_placed = True
        if tile_placed: break

x_bounds, y_bounds = get_board_bounds(placed_tiles)

corners = []
answer = 1
for x in x_bounds:
    for y in y_bounds:
        answer *= int(placed_tiles["%d,%d" % (x, y)])
        corners.append(placed_tiles["%d,%d" % (x, y)])
print("Corners: " + str(corners))
print("Answer to Part 1: " + str(answer))

# Create Large Image
large_image = []
for x in range(x_bounds[0], x_bounds[1] + 1):
    image_rows = len(tiles[placed_tiles["%d,%d" % (x, y_bounds[0])]])
    for r in range(1, image_rows - 1):
        large_row = []
        for y in range(y_bounds[0], y_bounds[1] + 1):
            tile = tiles[placed_tiles["%d,%d" % (x, y)]]
            large_row += tile[r][1:-1]
        large_image.append(large_row)


### SEA CREATURE DEPICTED BELOW:
                  # 
#    ##    ##    ###
 #  #  #  #  #  #    
sea_creature = [[19], [1,6,7,12,13,18,19,20], [2,5,8,11,14,17]]
def has_sea_creature(x, y, _image):
    if ((y + 19) >= len(_image[x])) or ((x + 2) >= len(_image)): return False
    creature_found = True
    count = 1
    for i in range(len(sea_creature)):
        for j in range(len(sea_creature[i])):
            c = _image[x + i][y + sea_creature[i][j] - 1]
            if c not in ['#', 'O']:
                creature_found = False
    return creature_found

def count_rough_water(image):
    total = 0
    for row in image:
        total += row.count("#")
    return total

#Search every permutation of large image for sea creatures
all_large_configs = get_all_tile_permutations(None, large_image)
for arrangement in all_large_configs:
    modifiable_copy = copy.deepcopy(arrangement)
    creature_found = False
    for i in range(len(arrangement)):
        for j in range(len(arrangement[i])):
            if has_sea_creature(i, j, modifiable_copy):
                for _x in range(len(sea_creature)):
                    for _y in range(len(sea_creature[_x])):
                        modifiable_copy[i + _x][j + sea_creature[_x][_y] - 1] = 'O'
                creature_found = True
    if creature_found:
        print_tile(modifiable_copy)
        print("Solution to Part 2: " + str(count_rough_water(modifiable_copy)))
