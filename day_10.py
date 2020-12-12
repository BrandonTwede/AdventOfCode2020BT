import copy

f = open("day_10_input.txt", "r")
# f = open("day_10_test_1.txt", "r")
# f = open("day_10_test_2.txt", "r")
# f = open("day_10_test_3.txt", "r")
numbers = [0]
for line in f:
    numbers.append(int(line))
f.close()
numbers.sort()

numbers.append(numbers[-1] + 3)

# Part 1

diff_1_count = 0
diff_3_count = 0
for i in range(1, len(numbers)):
    difference = numbers[i] - numbers[i-1]
    if difference == 1: diff_1_count += 1
    if difference == 3: diff_3_count += 1
print(diff_1_count * diff_3_count)


# Part 2

# Works for small examples, but is too slow for final solution
def complete_chain(chain, remaining):
    count = 0
    if not remaining: return 1
    while remaining and remaining[0] - chain[-1] <= 3:
        chain_copy = copy.deepcopy(chain)
        remaining_copy = copy.deepcopy(remaining)
        chain_copy.append(remaining_copy.pop(0))
        count += complete_chain(chain_copy, remaining_copy)
        remaining.pop(0)
    return count
# print(complete_chain([0], numbers[1:])) #Too slow!

nums_with_counts = []
for num in numbers:
    nums_with_counts.append([num, 1])

def get_counts_from_following_items(item_list, index):
    count = 0
    for i in range(index + 1, index + 4):
        if i >= len(item_list): break
        if (item_list[i][0] - item_list[index][0] <= 3):
            count += item_list[i][1]
    return count if count != 0 else 1
    
for i, num_with_count in reversed(list(enumerate(nums_with_counts))):
    nums_with_counts[i][1] = get_counts_from_following_items(nums_with_counts, i)

print(nums_with_counts[0][1])
