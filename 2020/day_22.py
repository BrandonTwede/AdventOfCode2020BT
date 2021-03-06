import copy

f = open("2020/day_22_input.txt", "r")
full_text = f.read()
f.close()

player_decks_text = full_text.strip().split("\n\n")
player_decks = []
for i, deck in enumerate(player_decks_text):
    player_decks.append([])
    for j, card in enumerate(deck.split("\n")):
        if j == 0: continue
        player_decks[i].append(int(card.strip()))

def do_round(decks):
    played = []
    for deck in decks:
        played.append(deck.pop(0))
    winning_player_idx = played.index(max(played))
    decks[winning_player_idx].append(played.pop(winning_player_idx))
    decks[winning_player_idx] += played
    return decks

def has_empty_deck(decks):
    for deck in decks:
        if len(deck) == 0: return True
    return False

def calculate_score(deck):
    score = 0
    for i, card in enumerate(reversed(deck)):
        score += card * (i + 1)
    return score

part_1_decks = copy.deepcopy(player_decks)
while not has_empty_deck(part_1_decks):
    part_1_decks = do_round(part_1_decks)

print("Solution to Part 1:")
for i, deck in enumerate(part_1_decks):
    print("\tPlayer " + str(i + 1) + " score: " + str(calculate_score(deck)))
print("\n")

def can_do_recurisve_round(played, decks):
    for i, card in enumerate(played):
        if len(decks[i]) < card: return False
    return True

def get_sub_decks(played, decks):
    next_decks = []
    for i, deck in enumerate(decks):
        card = played[i]
        next_decks.append(deck[:card])
    return next_decks

def do_recursive_round(decks, previous_rounds = []):
    played = []
    for deck in decks:
        played.append(deck.pop(0))
    if can_do_recurisve_round(played, decks):
        winning_player_idx, _ = play_recursive_game(get_sub_decks(played, decks))
    else:
        winning_player_idx = played.index(max(played))
    decks[winning_player_idx].append(played.pop(winning_player_idx))
    decks[winning_player_idx] += played
    return decks

def play_recursive_game(decks):
    previous_rounds = []
    while not has_empty_deck(decks):
        for round in previous_rounds:
            if round == decks:
                return 0, decks
        previous_rounds.append(copy.deepcopy(decks))
        decks = do_recursive_round(decks)
    for i, deck in enumerate(decks):
        if len(deck) > 0: return i, decks

winning_index, final_decks = play_recursive_game(copy.deepcopy(player_decks))
print("Solution to Part 2:")
for i, deck in enumerate(final_decks):
    print("\tPlayer " + str(i + 1) + " score: " + str(calculate_score(deck)))