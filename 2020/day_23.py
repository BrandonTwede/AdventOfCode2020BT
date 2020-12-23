import copy

# cups = list(map(int, list("389125467"))) # Test
cups = list(map(int, list("476138259")))
starting_index = 0
max_num = max(cups)
min_num = min(cups)
cups_pt2 = copy.deepcopy(cups)

debug = False

def get_item_at_index(cups, idx):
    return cups[idx % len(cups)]

def get_next_three_items(cups, start_idx):
    return [get_item_at_index(cups, i) for i in range(start_idx + 1, start_idx + 4)]

def get_next_lowest_item_idx(cups, val, three_excluded):
    while True:
        val = val - 1 if val > min_num else max_num
        if val not in three_excluded: return cups.index(val)

def do_move(cups, current_index):
    if debug: print(cups)
    cup_num = get_item_at_index(cups, current_index)
    next_three = get_next_three_items(cups, current_index)
    if debug: print(next_three)
    cups = [num for num in cups if num not in next_three]
    destination_idx = (get_next_lowest_item_idx(cups, cup_num, next_three) + 1) % len(cups)
    if debug: print(cups[destination_idx])
    cups[destination_idx:destination_idx] = next_three
    current_index = cups.index(cup_num) + 1
    return cups, current_index

current_index = 0
for i in range(100):
    cups, current_index = do_move(cups, current_index)
idx = cups.index(1)
print("Solution to Part 1: " + ''.join(str(s) for s in (cups[idx+1:] + cups[:idx])))

cups_pt2.extend(range(max(cups_pt2) + 1, 1000001))
cups = cups_pt2
max_num = max(cups)
min_num = min(cups)

class Node:
    def __init__(self, val, next = None):
        self.val = val
        self.next = next

node_dict = dict()
prev_node = None
for num in cups:
    node_dict[num] = Node(num)
    if prev_node: prev_node.next = node_dict[num]
    prev_node = node_dict[num]
current_node = node_dict[cups[0]]
prev_node.next = current_node # Set last item to point to the first

def is_val_in_list(start_node, val):
    next_node = start_node
    while True:
        if next_node.val == val: return True
        if next_node.next == None or next_node.next == start_node:
            return False
        next_node = next_node.next

def get_next_lowest_item_node(val, three_excluded):
    while True:
        val = val - 1 if val > min_num else max_num
        if not is_val_in_list(three_excluded, val): return node_dict[val]

def print_list(current_node):
    next_node = current_node
    result = ""
    while True:
        result += str(next_node.val)
        if next_node.next == None or next_node.next == current_node:
            return result
        next_node = next_node.next
        result += ", "

def do_move_node(current_node):
    if debug: print(print_list(current_node))
    cup_num = current_node.val
    next_three = current_node.next
    current_node.next = current_node.next.next.next.next
    next_three.next.next.next = None
    if debug: print(print_list(next_three))
    if debug: print(print_list(current_node))

    insert_after = get_next_lowest_item_node(cup_num, next_three)
    next_three.next.next.next = insert_after.next
    insert_after.next = next_three
    current_node = current_node.next
    return current_node

print("Calculating part 2...")
for i in range(10000000):
    if (i % 1000000) == 0: print(str(int(i / 100000)) + "% calculated")
    current_node = do_move_node(current_node)

print("Solution to Part 2: %d" % (node_dict[1].next.val * node_dict[1].next.next.val))