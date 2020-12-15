f = open("day_15_input.txt", "r")
nums = []
memory = dict()
for line in f:
    parts = line.strip().split(",")
    for i in range(len(parts)):
        nums.append(int(parts[i]))
        memory[int(parts[i])] = i
    nums = list(map(int, parts))
f.close()

while len(nums) < 30000000:
    last_num = nums[-1]
    last_idx = memory.get(last_num)
    if last_idx != None:
        next_num = len(nums) - 1 - last_idx
        memory[last_num] = len(nums) - 1
        nums.append(next_num)
    else:
        memory[last_num] = len(nums) - 1
        nums.append(0)
        

print("Solution to Part 1: " + str(nums[2019]))
print("Solution to Part 2: " + str(nums[-1]))