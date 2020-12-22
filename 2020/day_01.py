f = open("2020/day_01_input.txt", "r")
numbers = []
for line in f:
    numbers.append(int(line))
f.close()

# Part 1
for num in numbers:
    if (2020 - num) in numbers:
        print("Solution 1: ")
        print(num * (2020-num))
        break

# Part 2
solution_found = False
for num in numbers:
    for num2 in numbers:
        for num3 in numbers:
            if (num + num2 + num3) == 2020:
                print("Solution 2")
                print(num * num2 * num3)
                solution_found = True
                break
        if solution_found: break
    if solution_found: break