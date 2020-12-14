import copy

f = open("day_14_input.txt", "r")
sections = []
prev_section = {}
for line in f:
    if "mask" in line:
        if prev_section: sections.append(prev_section)
        prev_section = { "mask": line.split(" ")[2].strip(), "operations": [] }
    else:
        mem = line.split(" ")[0][4:-1]
        val = int(line.split(" ")[2].strip())
        prev_section["operations"].append([mem, val])
f.close()
sections.append(prev_section)

def apply_mask(mask, value):
    bin_num = list(format(value, "036b"))
    for i, c in enumerate(mask):
        if c == "X": continue
        bin_num[i] = c
    return int(''.join(bin_num), 2)

memory = {}
for s in sections:
    mask = s["mask"]
    for op in s["operations"]:
        memory[op[0]] = apply_mask(mask, op[1])

sum = 0
for key, value in memory.items():
    sum += value
print("Solution to Part 1: " + str(sum))

def decode_memory_address(mask, original_mem):
    masked_mem = list(format(int(original_mem), "036b"))
    for i, c in enumerate(mask):
        if c == "0": continue
        masked_mem[i] = c
    
    unchanged_pass = True
    addresses = [masked_mem]
    while True:
        next_addresses = []
        unchanged_pass = True
        for addr in addresses:
            if "X" in addr:
                unchanged_pass = False
                idx = addr.index("X")
                c = copy.deepcopy(addr)
                c[idx] = "0"
                next_addresses.append(c)
                c = copy.deepcopy(addr)
                c[idx] = "1"
                next_addresses.append(c)
            else:
                next_addresses.append(addr)
        addresses = next_addresses
        if unchanged_pass: break
    return list(map(''.join, addresses))


memory = {}
for s in sections:
    mask = s["mask"]
    for op in s["operations"]:
        addresses = decode_memory_address(mask, op[0])
        for addr in addresses:
            memory[addr] = op[1]

sum = 0
for key, value in memory.items():
    sum += value
print("Solution to Part 2: " + str(sum))
