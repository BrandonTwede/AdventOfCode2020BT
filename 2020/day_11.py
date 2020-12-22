import copy

f = open("day_11_input.txt", "r")
starting_board = []
for line in f:
    starting_board.append(list(line.strip()))
f.close()

occupied = "#"
empty = "L"
floor = "."

is_part_2 = True
occupied_threshold = 5 if is_part_2 else 4

def get_space_type(space):
    if space == occupied: return "occupied"
    if space == empty: return "empty"
    if space == floor: return "floor"

def count_adjacent_occupied(board, row, col):
    occupied_count = 0
    for i in range(row - 1, row + 2):
        for j in range(col - 1, col + 2):
            if i < 0 or i >= len(board): continue
            if j < 0 or j >= len(board[i]): continue
            if i == row and j == col: continue
            if get_space_type(board[i][j]) == "occupied": occupied_count += 1
    return occupied_count

def count_directions_occupied(board, row, col):
    occupied_count = 0
    for row_change in range(-1, 2):
        for col_change in range(-1, 2):
            if row_change == 0 and col_change == 0: continue
            if (is_occupied_in_direction(board, row, col, row_change, col_change)): occupied_count += 1
    return occupied_count

def is_occupied_in_direction(board, row, col, row_diff, col_diff):
    offset = 1
    while True:
        new_row = row + (row_diff * offset)
        new_col = col + (col_diff * offset)
        if new_row < 0 or new_row >= len(board): break
        if new_col < 0 or new_col >= len(board[new_row]): break
        space = get_space_type(board[new_row][new_col])
        if space == "occupied": return True
        if space == "empty": return False
        offset += 1
    return False

def get_next_state(board, row, col):
    seat_status = get_space_type(board[row][col])
    if seat_status == "floor": return floor
    occupied_count = count_adjacent_occupied(board, row, col) if not is_part_2 else count_directions_occupied(board, row, col)
    if seat_status == "empty" and occupied_count == 0: return occupied
    if seat_status == "occupied" and occupied_count >= occupied_threshold: return empty
    return board[row][col]

def execute_round(prev_board):
    did_change = False
    next_board = copy.deepcopy(prev_board)
    for row in range(len(prev_board)):
        for col in range(len(prev_board[row])):
            next_board[row][col] = get_next_state(prev_board, row, col)
            if next_board[row][col] != prev_board[row][col]: did_change = True
    return next_board, did_change

def count_total_occupied(board):
    total_occupied = 0
    for row in range(len(board)):
        for col in range(len(board[row])):
            if get_space_type(board[row][col]) == "occupied": total_occupied += 1
    return total_occupied

board_changed = True
prev_board = copy.deepcopy(starting_board)
while board_changed:
    next_board, board_changed = execute_round(prev_board)
    prev_board = copy.deepcopy(next_board)

print(count_total_occupied(prev_board))