import string

f = open("2020/day_06_input.txt", "r")

current_group = []
groups = []
for line in f:
    if (line.strip() == ""):
        groups.append(current_group)
        current_group = []
    else: current_group.append(line.strip())
groups.append(current_group)
f.close()

# Part 1
question_total = 0
for group in groups:
    question_total += len(set(''.join(group)))
print("Total Questions Answered: " + str(question_total))

# Part 2
def get_everyone_answer_count(group):
    count = 0
    for c in string.ascii_lowercase:
        all_answered_yes = True
        for response in group:
            if c not in response: all_answered_yes = False
        if all_answered_yes: count += 1
    return count

question_total = 0
for group in groups:
    question_total += get_everyone_answer_count(group)
print("Total Questions Everyone In Groups Answered: " + str(question_total))