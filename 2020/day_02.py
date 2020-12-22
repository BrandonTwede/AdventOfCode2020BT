f = open("2020/day_02_input.txt", "r")
lines = []
for line in f:
    lines.append(line)
f.close()

invalid_count = 0
valid_count = 0
for line in lines:
    parts = line.split()
    min = int(parts[0].split("-")[0])
    max = int(parts[0].split("-")[1])
    letter = parts[1][0]
    password = parts[2]
    
    # Part 1
    # occurrences = password.count(letter)    
    # if occurrences < min or occurrences > max:
    #     invalid_count += 1
    # else:
    #     valid_count += 1

    # Part 2
    first_check = password[min-1] == letter
    second_check = password[max-1] == letter
    if (first_check or second_check) and not (first_check and second_check):
        valid_count += 1

print("Invalid Count:")
print(invalid_count)
print("Valid Count:")
print(valid_count)