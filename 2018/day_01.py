f = open("2018/day_01_input.txt", "r")
numbers = []
for line in f:
    numbers.append(int(line))
f.close()

total = 0
for num in numbers:
    total += num
print("Solution to Part 1: %d" % total)

def find_first_duplicate_occurance(numbers):
    numbers_found = set()
    total = 0
    while total not in numbers_found:
        for num in numbers:
            if total in numbers_found: return total
            numbers_found.add(total)
            total += num
    return total

print("Solution to Part 2: %d" % find_first_duplicate_occurance(numbers))