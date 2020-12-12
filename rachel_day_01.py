f = open("day_01_input.txt", "r")
numbers = []
for line in f:
    numbers.append(int(line))
f.close()

# len(numbers) -> 1000
# range(1000) -> [0, 1, 2, 3, 4, ..., 999]
# for i in range(len(numbers)):
#     expense = numbers[i]


# numbers = [ 2004, 1823, 1628, ... ]

for i, firstNumber in enumerate(numbers):
    for j, secondNumber in enumerate(numbers):
        for k, thirdNumber in enumerate(numbers):
            if j <= i or k <= j: continue
            if firstNumber + secondNumber + thirdNumber == 2020:
                print(str(firstNumber) + ", " + str(secondNumber) + ", " + str(thirdNumber))
                print (firstNumber * secondNumber * thirdNumber)



    

# [1, 2, 3]
# 5

# int firstNumber = 0;
# int secondNumber = 0;

# for (int i = 0; i < numbers.length(); i++) {
#     firstNumber = numbers.at(i);  
#     for (int j = 0; j < numbers.length(); j++) {
#         if (i == j) {continue;}
#         secondNumber = numbers.at(j);
#         if ((firstNumber + secondNumber) == 2020) {
#             cout << firstNumber << ", " << secondNumber << endl;
#         }
#     }
# }
