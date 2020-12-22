import copy

f = open("day_08_input.txt", "r")
#f = open("day_08_test.txt", "r")

instructions_base = []
for line in f:
    op, arg = line.strip().split(" ")
    arg = int(arg)
    instructions_base.append({"op": op, "arg": arg, "executed":False})
f.close()

def run_instructions(instructions, i, acc, can_do_change, run_if_loop):
    loop_detected = False
    while i < len(instructions) and i >= 0:
        cur = instructions[i]
        if cur["executed"]:
            loop_detected = True
            run_if_loop(acc)
            break
        instructions[i]["executed"] = True
        if cur["op"] == "nop" and can_do_change:
            run_instructions(copy.deepcopy(instructions), i + cur["arg"], acc, False, run_if_loop)
        if cur["op"] == "jmp":
            if can_do_change:
                run_instructions(copy.deepcopy(instructions), i + 1, acc, False, run_if_loop)
            i += cur["arg"]
            continue
        if cur["op"] == "acc": acc += cur["arg"]
        i += 1
    if (not loop_detected): print("Execution finished!\nAccumulator: " + str(acc))

# Part 1
def print_if_loop(acc):
    print("Loop detected!\nAccumulator: " + str(acc))

run_instructions(copy.deepcopy(instructions_base), 0, 0, False, print_if_loop)


# Part 2
run_instructions(copy.deepcopy(instructions_base), 0, 0, True, lambda a: 0)