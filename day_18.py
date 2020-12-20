import copy

f = open("day_18_input.txt", "r")

equations = []
for line in f:
    equations.append(line.strip("\n "))
f.close()

def get_paren_value(val):
    count = 0
    count += val.count("(")
    count -= val.count(")")
    return count

def find_next_closing_paren(equation, return_on_flip = False):
    i = 0
    paren_count = 0
    paren_type = get_paren_value(equation[0]) < 0
    for item in equation:
        paren_count += get_paren_value(item)
        if paren_type != (paren_count < 0) and return_on_flip: return i
        if paren_count == 0: return i
        i += 1
    return i - 1

def find_prev_open_paren(equation):
    i = 0
    paren_count = 0
    for item in reversed(equation):
        paren_count += item.count("(")
        paren_count -= item.count(")")
        if paren_count == 0: return i
        i += 1
    return 0


def calculate_equation(equation):
    if len(equation) == 1: return equation
    l_arg = equation[0]
    if "(" in l_arg:
        end_idx = find_next_closing_paren(equation[0:])
        paren_section = equation[0:1+end_idx]
        paren_section[0] = paren_section[0][1:]
        paren_section[-1] = paren_section[-1][:-1]
        l_arg = calculate_equation(paren_section)[0]
        remaining = equation[1+end_idx:] if len(equation) > 1 + end_idx else []
        return calculate_equation([str(l_arg)] + remaining)
    l_arg = int(l_arg)
    op = equation[1]
    r_arg = equation[2]
    
    remaining = equation[3:] if len(equation) > 3 else []
    if "(" in r_arg:
        end_idx = find_next_closing_paren(equation[2:])
        paren_section = equation[2:3+end_idx]
        paren_section[0] = paren_section[0][1:]
        paren_section[-1] = paren_section[-1][:-1]
        r_arg = calculate_equation(paren_section)
        remaining = equation[3+end_idx:] if len(equation) > 3+end_idx else []
        r_arg = r_arg.pop(0)

    r_arg = int(r_arg.strip("()"))
    if op == "*": answer =  l_arg * r_arg
    if op == "+": answer = l_arg + r_arg
    return calculate_equation([str(answer)] + remaining)

answers = []
for equation in equations:
    answers.append(int(calculate_equation(equation.split(" ")).pop()))

print("Solution to Part 1: " + str(sum(answers)))

# Incorrect guesses to Part 1:
# 1256875737466 - too low
# 3940235927398 - too high


# Part 2 is solved by adding in parenthesis to force the precedence of the '+' operator
modified_equations = []
for i, equation in enumerate(equations):
    eq_parts = equation.split(" ")
    for j, op in enumerate(eq_parts):
        if op == "+":
            if ")" in eq_parts[j-1]:
                end_idx = find_next_closing_paren(list(reversed(eq_parts[:j])), True)
                eq_parts[j-1-end_idx] = "(" + eq_parts[j-1-end_idx]
            else: eq_parts[j-1] = "(" + eq_parts[j-1]
            if "(" in eq_parts[j+1]:
                end_idx = find_next_closing_paren(eq_parts[j+1:], True)
                eq_parts[j+1+end_idx] = eq_parts[j+1+end_idx] + ")"
            else: eq_parts[j+1] = eq_parts[j+1] + ")"
    modified_equations.append(eq_parts)

answers = []
for equation in modified_equations:
    answers.append(int(calculate_equation(equation).pop()))
print("Solution to Part 2: " + str(sum(answers)))

# Incorrect Guesses:
# 126664987632994374



