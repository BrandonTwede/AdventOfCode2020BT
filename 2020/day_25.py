import copy

f = open("2020/day_25_input.txt", "r")

public_keys = list()
for line in f:
    public_keys.append(int(line.strip()))
f.close()

def do_loop(value, subject_num):
    value = value * subject_num
    value = value % 20201227
    return value

def get_loop_size(key):
    temp_value = 1
    loop_count = 1
    while temp_value != key:
        temp_value = do_loop(temp_value, 7)
        loop_count += 1
    return loop_count - 1

card_loop = get_loop_size(public_keys[0])

def find_encryption_key(door_public_key, card_loop):
    value = 1
    for number in range(1, card_loop + 1):
        value = do_loop(value, door_public_key)
    return value

print("Solution to Part 1: " + str(find_encryption_key(public_keys[1], card_loop)))