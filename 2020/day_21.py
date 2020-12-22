f = open("2020/day_21_input.txt", "r")

foods = []
allergens = set()
all_ingredients = set()
for line in f:
    ingredients = line.split("(contains")[0].strip().split(" ")
    _allergens = line.split("(contains ")[1].strip(" ()\n").split(", ")
    foods.append([list(ingredients), set(_allergens)])
    allergens.update(_allergens)
    all_ingredients.update(ingredients)
f.close()

foods_with_allergen = set()
unidentified_allergens = list(allergens)
identified_allergens = list()
foreign_allergen_names = set()
allergen_name_map = dict()
while len(unidentified_allergens) > 0:
    for allergen in unidentified_allergens:
        for food in foods:
            if allergen in food[1]:
                if len(foods_with_allergen) <= 0: foods_with_allergen.update(food[0])
                else: foods_with_allergen &= set(food[0])
        foods_with_allergen = foods_with_allergen - foreign_allergen_names
        if len(foods_with_allergen) == 1:
            unidentified_allergens.remove(allergen)
            identified_allergens.append(allergen)
            foreign_allergen_names.add(list(foods_with_allergen)[0])
            allergen_name_map[allergen] = list(foods_with_allergen)[0]
            break
        foods_with_allergen = set()

safe_ingredients = all_ingredients - foreign_allergen_names
safe_count = 0
for ingredient in safe_ingredients:
    for food in foods:
        safe_count += list(food[0]).count(ingredient)
print("Solution to Part 1: " + str(safe_count))

english_allergens = list(allergen_name_map.keys())
english_allergens.sort()
sorted_allergen_list = []
for name in english_allergens:
    sorted_allergen_list.append(allergen_name_map[name])

print("Solution to Part 2: " + str(','.join(sorted_allergen_list)))