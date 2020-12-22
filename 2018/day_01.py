f = open("2018/day_01_input.txt", "r")
numbers = []
for line in f:
    numbers.append(int(line))
f.close()

total = 0
for num in numbers:
    total += num
print("Solution to Part 1: %d" % total)