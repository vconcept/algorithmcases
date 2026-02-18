// Bruteforce algorithm

function overlaps(a, b) {
  return !(a.end <= b.start || a.start >= b.end);
}

function bruteForce(tasks, index = 0, selected = []) {
  if (index === tasks.length) {
    return selected.length;
  }

  // Option 1: skip current task
  let skip = bruteForce(tasks, index + 1, selected);

  // Option 2: take current task (if valid)
  let canTake = selected.every(t => !overlaps(t, tasks[index]));
  let take = 0;

  if (canTake) {
    take = bruteForce(tasks, index + 1, [...selected, tasks[index]]);
  }

  return Math.max(skip, take);
}


// Greedy solution (we are picking tasks that finishes earlier)
function greedy(tasks) {
  const sorted = [...tasks].sort((a, b) => a.end - b.end);

  let count = 0;
  let lastEnd = -Infinity;

  for (let task of sorted) {
    if (task.start >= lastEnd) {
      count++;
      lastEnd = task.end;
    }
  }

  return count;
}

// Let us validate with some sample inputs 

const tasks = [
  { start: 1, end: 3 },
  { start: 2, end: 5 },
  { start: 4, end: 6 },
  { start: 6, end: 7 },
  { start: 5, end: 9 },
  { start: 8, end: 10 }
];

console.log(bruteForce(tasks)); // 4
console.log(greedy(tasks));     // 4



// Let us now perform large test inputs

function generateTasks(n) {
  return Array.from({ length: n }, () => {
    let start = Math.floor(Math.random() * 10000);
    let end = start + Math.floor(Math.random() * 20) + 1;
    return { start, end };
  });
}

const bigTasks = generateTasks(10000);

console.time("Greedy");
greedy(bigTasks);
console.timeEnd("Greedy");

// DO NOT RUN bruteForce(bigTasks)
//
bruteForce(bigTasks)
// It will not terminate in reasonable time



/*
The greedy algorithm is dramatically faster.
It runs in O(n log n) due to sorting, while brute force runs in O(2ⁿ), making it unusable for large inputs.

The greedy solution is easier to maintain and scale with the following advantages:
Fewer lines of code
No recursion
Predictable performance
Easy to debug and extend

| Algorithm   | Memory Usage                         |
| ----------- | ------------------------------------ |
| Brute-force | Very high (recursion + combinations) |
| Greedy      | Minimal (sorting + iteration)        |

*/



/*
Recommended Algorithm: Greedy (Earliest End Time):

Proven optimal for activity selection
Handles thousands of tasks per second
Deterministic and predictable
Minimal memory usage
Clean, maintainable code
Real-time safe


- When brute force might still be relevant:

Very small datasets (≤ 20 tasks)
Academic verification
Exhaustive testing or correctness proofs
When constraints change (e.g., weighted tasks)

*/


/*
1️⃣ All tasks overlapping
[{ start: 0, end: 10 }, { start: 1, end: 9 }, ...]
Greedy → returns 1
Brute-force → returns 1 (slow)


2️⃣ All tasks non-overlapping
[{ start: 1, end: 2 }, { start: 2, end: 3 }, ...]
Greedy → returns all
Brute-force → returns all (very slow)


3️⃣ Same start or end times
[{ start: 1, end: 3 }, { start: 1, end: 2 }, { start: 2, end: 3 }]
Greedy handles correctly when sorted by end
Brute-force still correct but inefficient
*/