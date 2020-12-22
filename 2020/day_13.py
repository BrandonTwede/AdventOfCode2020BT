import sys
import copy

f = open("2020/day_13_input.txt", "r")
my_time = int(f.readline())
bus_times = f.readline().strip().split(",")
f.close()

bus_times_nums = []
for time in bus_times:
    if time != "x": bus_times_nums.append(int(time))

soonest_bus = sys.maxsize
for time in bus_times_nums:
    diff = time - (my_time % time)
    if diff >= 0 and diff < (soonest_bus - (my_time % soonest_bus)):
        soonest_bus = time
print("Part 1 Solution: " + str(soonest_bus * (soonest_bus - (my_time % soonest_bus))))


# I confess that I do not 100% undestand how this works, but I followed the process outlined by u/PillarsBliz
# in this reddit thread: https://www.reddit.com/r/adventofcode/comments/kc60ri/2020_day_13_can_anyone_give_me_a_hint_for_part_2/gfnnfm3/

def find_solution(start, lcm, constraints):
    multiple = 1
    solution = start
    constraints_satisfied = False
    while not constraints_satisfied:
        solution = start + (lcm * multiple)
        constraints_satisfied = True
        for c in constraints:
            offset = bus_times.index(str(c))
            if (solution + offset) % c != 0:
                constraints_satisfied = False
                break
        multiple += 1
    return solution


buses = copy.deepcopy(bus_times_nums)
start = buses.pop(0)
constraints = [start]
for item in buses:
    lcm = 1
    for c in constraints: lcm *= c
    constraints.append(item)
    start = find_solution(start, lcm, constraints)
print("Solution Part 2: " + str(start))
