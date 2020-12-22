import copy
import re

f = open("2020/day_19_input.txt", "r")
full_text = f.read()
f.close()

isPart2 = False

def parse_rule_string(line):
    id, rule = line.split(":")
    parts = rule.strip().split("|")
    parsed_rule = []
    for p in parts:
        parsed_rule.append(p.strip(" \"").split(" "))
    return id, parsed_rule

sections = full_text.strip().split("\n\n")
rules = dict()
for _, r in enumerate(sections[0].split("\n")):
    id, rule = parse_rule_string(r)
    rules[id] = rule

messages = []
for line in sections[1].split("\n"):
    messages.append(line.strip())

def follow_rule(id):
    result = "("
    for i, subrule in enumerate(rules[id]):
        if i > 0: result += "|"
        for j, next_id in enumerate(subrule):
            if next_id == 'a' or next_id == 'b': return next_id
            result += "(" + follow_rule(next_id) + ")"
            if id == "11" and isPart2: result += "{x}"
    result += ")"
    if id == '8' and isPart2:
        result += '+'
    return result

def generate_rule_regex():
    all_regex = ["^"]
    for id in rules['0'][0]:
        all_regex.append(follow_rule(id))
    all_regex.append("$")
    all_regex = ''.join(all_regex)
    return all_regex

all_regex = generate_rule_regex()
count_valid = 0
for m in messages:
    if re.search(all_regex, m) != None: count_valid += 1
print("Solution to Part 1: " + str(count_valid))

isPart2 = True
all_regex = generate_rule_regex()
count_valid = 0
prev_match_num = 0
i = 1
while True:
    if i > 5: break # Hack
    for m in messages:
        if re.search(all_regex.replace("x", str(i)), m) != None: count_valid += 1
    i += 1
print("Solution to Part 2: " + str(count_valid))