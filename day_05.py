f = open("day_05_input.txt", "r")
lines = []
for line in f:
    lines.append(line.strip())
f.close()

rows = 127
columns = 7

def get_half(min, max, letter):
    halfway = max - ((max - min) // 2)
    if letter in ["F", "L"]: # Lower half
        return [min, halfway - 1]
    if letter in ["B", "R"]: # Upper half
        return [halfway, max]

def get_coordinate(min, max, input):
    for c in input:
        min, max = get_half(min, max, c)
    return min

def get_seat_id(ticket):
    row_input = ticket[0:7]
    col_input = ticket[-3:]
    row_pos = get_coordinate(0, rows, row_input)
    col_pos = get_coordinate(0, columns, col_input)
    return (row_pos * 8) + col_pos

highest = 0
seat_ids = []
for row in lines:
    seat_id = get_seat_id(row)
    seat_ids.append(seat_id)
    if seat_id > highest: highest = seat_id
print("Highest seat ID: " + str(highest))

seat_ids.sort()
missing_seats = []
for i in range(len(seat_ids)):
    if i == 0: continue
    if seat_ids[i] - seat_ids[i-1] > 1:
        missing_seats.extend(list( range(seat_ids[i-1] + 1, seat_ids[i]) ))
print("Missing IDs: " + str(missing_seats))