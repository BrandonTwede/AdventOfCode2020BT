f = open("2020/day_02_input.txt", "r")
passwords = []
for line in f:
    passwords.append(line)
f.close()

# 1-3 a: abcde
# 1-3 b: cdefg
# 2-9 c: ccccccccc

# string[n]

validPasswords = 0

for line in passwords:
    parts = line.split(" ")
    letter = parts[1][0]
    password = parts[2]
    numLetters = password.count(letter)
    validNums = parts[0].split("-")
    if numLetters >= int(validNums[0]) and numLetters <= int(validNums[1]):
        validPasswords = validPasswords + 1

print(validPasswords)

validPasswords2 = 0

for line in passwords:
    parts = line.split(" ")
    letter = parts[1][0]
    password = parts[2]
    twoIndices = parts[0].split("-")
    firstIndex = int(twoIndices[0])
    secondIndex = int(twoIndices[1])
    if password[firstIndex - 1] == letter or password[secondIndex - 1] == letter:
        validPasswords2 = validPasswords2 + 1
        if password[firstIndex - 1] == letter and password[secondIndex - 1] == letter:
            validPasswords2 = validPasswords2 - 1

print(validPasswords2)
