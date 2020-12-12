import re

f = open("day_07_input.txt", "r")
rules = []
rule_pattern = "^(.*) bags contain (.*)\."
bag_pattern = "(\d+) (.*) bag"
for line in f:
    match = re.search(rule_pattern, line.strip())
    container = match.group(1)
    contained = []
    contained_colors = []
    if re.search(bag_pattern, match.group(2)):
        for bag in match.group(2).split(","):
            bag_match = re.search(bag_pattern, bag.strip())
            contained.append({"color": bag_match.group(2), "quantity": bag_match.group(1)})
            contained_colors.append(bag_match.group(2))
    rules.append({"color": container, "contains": contained, "contained_colors":contained_colors})
f.close()

my_bag = "shiny gold"

# Part 1
hold_candidates = set()
for bag in rules:
    if my_bag in bag["contained_colors"]: hold_candidates.add(bag["color"])

candidates_updated = True
while candidates_updated:
    candidates_updated = False
    for bag in rules:
        common = hold_candidates.intersection(bag["contained_colors"])
        if common:
            prev_len = len(hold_candidates)
            hold_candidates.add(bag["color"])
            if len(hold_candidates) > prev_len: candidates_updated = True
print("Bags that can eventually hold a " + my_bag + " bag: " + str(len(hold_candidates)))

# Part 2
bag_stack = []

def get_bags_inside_bag(color):
    new_bags = []
    for bag in rules:
        if bag["color"] == color:
            for contained in bag["contains"]:
                for i in range(int(contained["quantity"])):
                    new_bags.append(contained["color"])
    return new_bags

total = 0
bag_stack = get_bags_inside_bag(my_bag)
while bag_stack:
    color = bag_stack.pop()
    total += 1
    bag_stack.extend(get_bags_inside_bag(color))
print("Bags contained within my bag: " + str(total))
