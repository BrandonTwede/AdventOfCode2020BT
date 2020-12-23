f = open("2018/day_02_input.txt", "r")
ids = []
for line in f:
    ids.append(line.strip())
f.close()

two_total = 0
three_total = 0
for line in ids:
    has_two = False
    has_three = False
    for letter in range(97,123):
        count = line.count(chr(letter))
        if count == 2: has_two = True
        if count == 3: has_three = True
    if has_two: two_total += 1
    if has_three: three_total += 1

print("Solution to Part 1: %d" % (two_total * three_total))

def get_id_common_letters(ids):
    for l1 in ids:
        for l2 in ids:
            diff_indexes = []
            for i in range(len(l1)):
                if l1[i] != l2[i]: diff_indexes.append(i)
                if len(diff_indexes) > 1: break
            if len(diff_indexes) == 1:
                return l1[:diff_indexes[0]] + l1[diff_indexes[0] + 1:]
print("Solution to Part 2: " + get_id_common_letters(ids))
