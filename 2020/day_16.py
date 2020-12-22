import copy

f = open("2020/day_16_input.txt", "r")
full_text = f.read()
f.close()

# Parse the file *********
def create_range_obj(text):
    l = []
    rules = text.split(" or ")
    l.append(rules[0].split("-"))
    l.append(rules[1].split("-"))
    return l

sections = full_text.strip().split("\n\n")
rules = dict()
rule_names = set()
for _, r in enumerate(sections[0].split("\n"), 1):
    rules[r.split(": ")[0]] = create_range_obj(r.split(": ")[1])
    rule_names.add(r.split(": ")[0])
my_ticket = sections[1].split("\n")[1].strip().split(",")
other_tickets = []
for i, t in enumerate(sections[2].split("\n")):
    if i == 0: continue
    other_tickets.append(t.strip().split(","))
# ************************


def get_matching_rules(_rules, num):
    matching_rules = []
    for k, v in _rules.items():
        for _range in v:
            if num >= int(_range[0]) and num <= int(_range[1]):
                matching_rules.append(k)
    return matching_rules

invalid_vals = []
valid_tickets = []
for t in other_tickets:
    is_valid = True
    for val in t:
        if not get_matching_rules(rules, int(val)):
            invalid_vals.append(val)
            is_valid = False
    if is_valid: valid_tickets.append(t)
print("Solution to Part 1: " + str(sum(map(int,invalid_vals))))

field_with_index = dict()
all_rules = copy.deepcopy(rule_names)
while len(field_with_index) < len(all_rules):
    for i,_ in enumerate(valid_tickets[0]):
        valid_names = copy.deepcopy(rule_names)
        for ticket in valid_tickets:
            valid_names = valid_names.intersection(get_matching_rules(rules, int(ticket[i])))
        if len(valid_names) == 1:
            valid_name = valid_names.pop()
            field_with_index[valid_name] = i
            rule_names.remove(valid_name)

solution = 1
for field, i in field_with_index.items():
    if "departure" in field:
        solution *= int(my_ticket[i])
print("Solution to Part 2: " + str(solution))
        