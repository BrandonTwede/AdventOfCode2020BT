import sys

f = open("day_9_input.txt", "r")
# f = open("day_9_test.txt", "r")
numbers = []
for line in f:
    numbers.append(int(line))
f.close()

preamble_length = 25

def next_num_valid(preamble, next_num):
    for i in range(len(preamble)):
        for j in range(i + 1, len(preamble)):
            if (preamble[i] + preamble[j]) == next_num: return True
    return False

preamble = numbers[:preamble_length]
remaining_code = numbers[preamble_length:]
invalid_number = -1
for next_num in remaining_code:
    if not next_num_valid(preamble, next_num):
        print("Invalid number found: " + str(next_num))
        invalid_number = next_num
        break
    else:
        preamble.pop(0)
        preamble.append(next_num)

if (invalid_number == -1):
    print("Invalid number not found. Exiting")
    exit()

# Part 2
for i in range(len(numbers)):
    smallest_num = sys.maxsize
    largest_num = 0
    running_total = 0
    for j in range(i, len(numbers)):
        if numbers[j] > largest_num: largest_num = numbers[j]
        if numbers[j] < smallest_num: smallest_num = numbers[j]
        running_total += numbers[j]
        if running_total > invalid_number: break
        if running_total == invalid_number and smallest_num != largest_num:
            print("Encryption weakness found: " + str(smallest_num + largest_num))
            exit()



