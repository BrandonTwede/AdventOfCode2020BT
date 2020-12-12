import pdb;
import re;

f = open("day_04_input.txt", "r")
current_passport_fields = []
current_passport_values = []
passports = []
for line in f:
    if (line.strip() == ""): 
        passports.append([current_passport_fields, current_passport_values])
        current_passport_fields = []
        current_passport_values = []
    parts = line.split()
    for p in parts:
        current_passport_fields.append(p.split(":")[0])
        current_passport_values.append(p.split(":")[1])
f.close()
passports.append([current_passport_fields, current_passport_values])

required_fields = ["byr", "iyr", "eyr", "hgt", "hcl", "ecl", "pid"] # no "cid" required


# byr (Birth Year) - four digits; at least 1920 and at most 2002.
# iyr (Issue Year) - four digits; at least 2010 and at most 2020.
# eyr (Expiration Year) - four digits; at least 2020 and at most 2030.
# hgt (Height) - a number followed by either cm or in:
# If cm, the number must be at least 150 and at most 193.
# If in, the number must be at least 59 and at most 76.
# hcl (Hair Color) - a # followed by exactly six characters 0-9 or a-f.
# ecl (Eye Color) - exactly one of: amb blu brn gry grn hzl oth.
# pid (Passport ID) - a nine-digit number, including leading zeroes.
# cid (Country ID) - ignored, missing or not.
debug = True
def passport_is_valid(passport):
    for required_field in required_fields:
        if required_field not in passport[0]:
            if debug: print("Invalid " + required_field + ": field missing")
            return False
        idx = passport[0].index(required_field)
        value = passport[1][idx].strip()
        if required_field == "byr":
            if len(value) != 4 or int(value) < 1920 or int(value) > 2002:
                if debug: print("Invalid " + required_field + ": " + value)
                return False
        elif required_field == "iyr":
            if len(value) != 4 or int(value) < 2010 or int(value) > 2020:
                if debug: print("Invalid " + required_field + ": " + value)
                return False
        elif required_field == "eyr":
            if len(value) != 4 or int(value) < 2020 or int(value) > 2030:
                if debug: print("Invalid " + required_field + ": " + value)
                return False
        elif required_field == "hgt":
            if value[0:-2].strip() == "":
                if debug: print("Invalid " + required_field + ": " + value + " - missing units")
                return False
            height = int(value[0:-2])
            if value[-2:] == "cm":
                if height < 150 or height > 193:
                    if debug: print("Invalid " + required_field + ": " + value)
                    return False
            elif value[-2:] == "in":
                if height < 59 or height > 76:
                    if debug: print("Invalid " + required_field + ": " + value)
                    return False
            else: return False
        elif required_field == "hcl":
            if re.search("^#([0-9]|[a-f]){6}$", value) == None:
                if debug: print("Invalid " + required_field + ": " + value)
                return False
        elif required_field == "ecl":
            if value not in ["amb", "blu", "brn", "gry", "grn", "hzl", "oth"]:
                if debug: print("Invalid " + required_field + ": " + value)
                return False
        elif required_field == "pid":
            if re.search("^[0-9]{9}$", value) == None:
                if debug: print("Invalid " + required_field + ": " + value)
                return False
    return True

valid_count = 0
invalid_count = 0
for passport in passports:
    if passport_is_valid(passport): 
        valid_count += 1
        # print("valid")
    else: 
        invalid_count += 1
        # print("invalid")

print(valid_count)
print(invalid_count)