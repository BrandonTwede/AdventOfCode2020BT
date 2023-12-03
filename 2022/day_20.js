
    function parseInput(input) {
        return input.split("\n").map(n => Number(n));
    }


// function getIdx(list, idx) {
//     return list[idx % list.length];
// }


// export async function part1(input) {
//     // let numbers = parseInput(input);
//     // // console.log(numbers);
//     // let initial = [...numbers];
//     // for (let i = 0; i < initial.length; i++) {
//     //     const num = initial[i];
//     //     if (num === 0) continue;
//     //     let currIdx = numbers.indexOf(num);
//     //     let newIdx = currIdx + num ;
//     //     numbers.splice(currIdx, 1);
//     //     if (newIdx <= 0) {
//     //         while(newIdx <= 0) {
//     //             newIdx = numbers.length + newIdx;
//     //             // console.log(newIdx);
//     //         }
//     //         // console.log(newIdx);
//     //     } else if (newIdx >= numbers.length) {
//     //         while (newIdx >= numbers.length) {
//     //             newIdx = newIdx % numbers.length;
//     //         }
//     //         if (newIdx == 0) newIdx = numbers.length;
//     //     }
        
//     //     numbers.splice(newIdx, 0, num);
//     //     // console.log(numbers.join(","));
//     // }
//     // console.log(numbers);
//     let numbers = parseInput(input);
//     let result = [];
//     for (let pos = 0; pos < numbers.length; pos++) {
//         const num = numbers[pos];
//         let newPos = (pos + num + numbers.length) % numbers.length;
//         if (newPos >= result.length) {
//             newPos -= result.length;
//         }
//         result.splice(newPos, 0, num);
//     }
//     console.log(result.join(","));


//     numbers = [...result];
//     let offset = numbers.indexOf(0);
//     let coordinates = [getIdx(numbers, 1000 + offset), getIdx(numbers, 2000 + offset), getIdx(numbers, 3000 + offset)];
//     console.log(coordinates);
//     result = coordinates.reduce((a, b) => a + b, 0);
//     console.log("Result of Part 1:", result);
//     return result;
// }




// export async function part2(input) {
//     let result = findFirstMarker(input, 14);
//     console.log("Part 2 result: " + result);
//     return result;
// }




function mixList(head) {
    // Iterate over the list and move each node a number of positions
    // equal to its value
    let currentNode = head;
    do {
      currentNode = moveNode(currentNode);
      if (currentNode === head) {
        break;
      }
      currentNode = currentNode.next;
    } while (true);
  }
  
  
  
  
  function moveNode(node) {
    // Determine the number of positions to move the node
    const moveCount = node.value;
  
    // If the move count is 0, there is no need to move the node
    if (moveCount === 0) {
      return node;
    }
  
    // Move the node forward or backward in the list
    let newNode;
    if (moveCount > 0) {
      // Move the node forward
      newNode = node.next;
      if (newNode === null) {
        newNode = head;
      }
    } else {
      // Move the node backward
      newNode = node.prev;
      if (newNode === null) {
        newNode = tail;
      }
    }
  
    // Return the new node that the original node has been moved to
    return newNode;
  }
  
  
  function findGroveCoordinates(head) {
    // Find the node with value 0
    let currentNode = head;
    while (currentNode.value !== 0) {
      currentNode = currentNode.next;
    }
  
    // Follow the next pointers to find the 1000th, 2000th, and 3000th
    // nodes after the node with value 0
    let coordinates = [];
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 1000; j++) {
        currentNode = currentNode.next;
        if (currentNode === null) {
          currentNode = head;
        }
      }
      coordinates.push(currentNode.value);
    }
  
    // Return the sum of the grove coordinates
    return coordinates.reduce((sum, value) => sum + value, 0);
  }
  
  export async function part1(input) {
  // Create the linked list
  let numbers = parseInput(input);
  const head = { value: numbers[0] };
  let currentNode = head;
  let remainder = numbers.slice(1);
  for (let i = 0; i < remainder.length; i++) {
    const value = remainder[i];
    currentNode.next = { value, prev: currentNode };
    currentNode = currentNode.next;
  }
  currentNode.next = head;
  head.prev = currentNode;
  console.log("MIXING");
  // Mix the list and find the grove coordinates
  mixList(head);
  const groveCoordinatesSum = findGroveCoordinates(head);
  console.log(groveCoordinatesSum); // expected output: 3
}
  