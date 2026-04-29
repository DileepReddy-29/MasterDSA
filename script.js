const navItems = [
  ["home", "H", "Home"],
  ["topics", "T", "Topics"],
  ["algorithms", "A", "Algorithms"],
  ["complexity", "O", "Complexity"],
  ["practice", "P", "Practice"],
  ["notes", "N", "Notes"],
  ["projects", "B", "Projects"],
  ["interview", "I", "Interview"],
  ["dashboard", "D", "Dashboard"],
];

const algorithms = [
  {
    id: "binary-search",
    name: "Binary Search",
    group: "Search",
    importance: "Used in interviews, databases, sorted logs, feature flags, and any system that searches ordered data fast.",
    childConcept:
      "Imagine you are guessing a number from 1 to 100. Instead of asking 1, 2, 3, and so on, you ask 50 first. If the answer is bigger, you throw away 1 to 50. If it is smaller, you throw away 50 to 100. Every question cuts the remaining numbers in half.",
    concept:
      "Binary search works only when the search space is sorted or monotonic. It keeps two borders, left and right, checks the middle, and safely removes the half that cannot contain the answer.",
    industryUse: ["Search in sorted product IDs", "Finding first bad build", "Capacity planning with binary search on answer", "Range queries in ordered data"],
    code: `def binary_search(nums, target):
    left, right = 0, len(nums) - 1

    while left <= right:
        mid = (left + right) // 2

        if nums[mid] == target:
            return mid
        if nums[mid] < target:
            left = mid + 1
        else:
            right = mid - 1

    return -1`,
    walkthrough: [
      "`left` and `right` mark the part of the array where the target may still exist.",
      "`mid` checks the center item. This is the item that lets us remove half the array.",
      "If `nums[mid]` equals target, we are done and return the index.",
      "If `nums[mid]` is too small, everything on the left side is also too small, so move `left` to `mid + 1`.",
      "If `nums[mid]` is too large, everything on the right side is also too large, so move `right` to `mid - 1`.",
      "When `left` crosses `right`, no valid search space remains, so return `-1`.",
    ],
    complexity: "Time O(log n), space O(1).",
    pitfalls: ["Using it on unsorted data", "Infinite loop from wrong boundary updates", "Forgetting first/last occurrence variants"],
  },
  {
    id: "merge-sort",
    name: "Merge Sort",
    group: "Sorting",
    importance: "Used when stable sorting matters and in external sorting for huge files.",
    childConcept:
      "Think of sorting exam papers. First split the big pile into tiny piles of one paper. A one-paper pile is already sorted. Then keep joining two sorted piles by always taking the smaller top paper.",
    concept:
      "Merge sort is divide and conquer. Divide the array into halves, sort each half, then merge two sorted halves into one sorted result.",
    industryUse: ["Stable sorting", "Sorting linked lists", "Counting inversions", "Sorting data that does not fit in memory"],
    code: `def merge_sort(nums):
    if len(nums) <= 1:
        return nums

    mid = len(nums) // 2
    left = merge_sort(nums[:mid])
    right = merge_sort(nums[mid:])

    return merge(left, right)

def merge(left, right):
    i = j = 0
    result = []

    while i < len(left) and j < len(right):
        if left[i] <= right[j]:
            result.append(left[i])
            i += 1
        else:
            result.append(right[j])
            j += 1

    result.extend(left[i:])
    result.extend(right[j:])
    return result`,
    walkthrough: [
      "The base case returns immediately when the list has zero or one element.",
      "`mid` splits the list into two smaller lists.",
      "Recursive calls sort the left half and right half independently.",
      "`merge` compares the front of both sorted halves and appends the smaller value.",
      "When one side is empty, the remaining values from the other side are already sorted, so append them.",
    ],
    complexity: "Time O(n log n), space O(n).",
    pitfalls: ["Forgetting the base case", "Using too much slicing in memory-constrained code", "Incorrect merge pointer movement"],
  },
  {
    id: "quick-sort",
    name: "Quick Sort",
    group: "Sorting",
    importance: "A classic in-place sorting idea and common interview test of partitioning.",
    childConcept:
      "Pick one student as the height checker. Put shorter students on the left and taller students on the right. Then do the same thing for each smaller group until everyone is ordered.",
    concept:
      "Quick sort chooses a pivot, partitions values around it, and recursively sorts both sides. Its power comes from partitioning in place.",
    industryUse: ["In-memory sorting", "Selection algorithms", "Understanding partition logic", "Performance-sensitive data processing"],
    code: `def quick_sort(nums):
    def sort(left, right):
        if left >= right:
            return

        pivot_index = partition(left, right)
        sort(left, pivot_index - 1)
        sort(pivot_index + 1, right)

    def partition(left, right):
        pivot = nums[right]
        store = left

        for i in range(left, right):
            if nums[i] <= pivot:
                nums[store], nums[i] = nums[i], nums[store]
                store += 1

        nums[store], nums[right] = nums[right], nums[store]
        return store

    sort(0, len(nums) - 1)
    return nums`,
    walkthrough: [
      "`sort(left, right)` sorts only the current subarray.",
      "The pivot is chosen as the last item.",
      "`store` marks where the next smaller-or-equal value should go.",
      "Every value <= pivot is swapped toward the left side.",
      "After the loop, the pivot is placed between smaller and larger values.",
      "Then the left and right sides are sorted recursively.",
    ],
    complexity: "Average O(n log n), worst O(n^2), space O(log n) recursion average.",
    pitfalls: ["Bad pivot choice on already sorted arrays", "Partition off-by-one errors", "Assuming quick sort is stable"],
  },
  {
    id: "bfs",
    name: "Breadth-First Search (BFS)",
    group: "Graphs",
    importance: "Used in maps, networking, social graph distance, crawling, and shortest path in unweighted graphs.",
    childConcept:
      "Imagine telling news in school. First you tell your closest friends. Then they tell their closest friends. BFS visits people layer by layer, like circles spreading in water.",
    concept:
      "BFS explores all neighbors at the current distance before going deeper. A queue preserves this first-in, first-out order.",
    industryUse: ["Shortest path without weights", "Web crawling", "Recommendation distance", "Level-order tree traversal"],
    code: `from collections import deque

def bfs(graph, start):
    queue = deque([start])
    seen = {start}
    order = []

    while queue:
        node = queue.popleft()
        order.append(node)

        for neighbor in graph.get(node, []):
            if neighbor not in seen:
                seen.add(neighbor)
                queue.append(neighbor)

    return order`,
    walkthrough: [
      "The queue starts with the first node.",
      "`seen` prevents visiting the same node forever in cyclic graphs.",
      "Remove from the front of the queue to process the oldest waiting node.",
      "Add every unseen neighbor to the queue.",
      "Because the queue is FIFO, nodes are processed by distance from the start.",
    ],
    complexity: "Time O(V + E), space O(V).",
    pitfalls: ["Marking visited too late", "Using BFS for weighted shortest paths", "Forgetting disconnected components"],
  },
  {
    id: "dfs",
    name: "Depth-First Search (DFS)",
    group: "Graphs",
    importance: "Used in dependency analysis, cycle detection, file trees, connected components, and backtracking.",
    childConcept:
      "Imagine exploring a maze. You keep walking down one path until you cannot go further, then you come back and try another path. DFS is that deep exploring behavior.",
    concept:
      "DFS explores one branch completely before trying the next branch. It can be implemented with recursion or an explicit stack.",
    industryUse: ["File system traversal", "Cycle detection", "Graph components", "Topological sorting"],
    code: `def dfs(graph, start):
    seen = set()
    order = []

    def visit(node):
        if node in seen:
            return

        seen.add(node)
        order.append(node)

        for neighbor in graph.get(node, []):
            visit(neighbor)

    visit(start)
    return order`,
    walkthrough: [
      "`seen` remembers already visited nodes.",
      "`visit` is a helper that processes one node.",
      "If the node was already seen, return immediately.",
      "Otherwise, mark it and add it to the answer order.",
      "Then recursively visit each neighbor.",
    ],
    complexity: "Time O(V + E), space O(V) for visited and recursion stack.",
    pitfalls: ["Stack overflow on huge graphs", "No visited set in cyclic graphs", "Confusing preorder and postorder use cases"],
  },
  {
    id: "dijkstra",
    name: "Dijkstra's Algorithm",
    group: "Shortest Path",
    importance: "Used in routing, delivery, network latency, game path costs, and weighted graph interviews.",
    childConcept:
      "Imagine going from your home to a shop. Every road has a travel time. You always try the currently fastest known place first, then update nearby places if you found a quicker way.",
    concept:
      "Dijkstra finds the shortest distance from one start node to all other nodes in a graph with non-negative edge weights. A min heap always expands the currently cheapest option.",
    industryUse: ["Map routing", "Network routing", "Service latency graphs", "Cheapest path calculations"],
    code: `import heapq

def dijkstra(graph, start):
    distances = {start: 0}
    heap = [(0, start)]

    while heap:
        current_distance, node = heapq.heappop(heap)

        if current_distance > distances.get(node, float("inf")):
            continue

        for neighbor, weight in graph.get(node, []):
            new_distance = current_distance + weight
            if new_distance < distances.get(neighbor, float("inf")):
                distances[neighbor] = new_distance
                heapq.heappush(heap, (new_distance, neighbor))

    return distances`,
    walkthrough: [
      "`distances` stores the best known distance to each node.",
      "The heap stores nodes ordered by smallest known distance.",
      "Pop the cheapest node first.",
      "Skip stale heap entries that are worse than an already found distance.",
      "For each neighbor, calculate the distance through the current node.",
      "If that route is better, save it and push it into the heap.",
    ],
    complexity: "Time O((V + E) log V), space O(V + E).",
    pitfalls: ["Using it with negative weights", "Not skipping stale heap entries", "Returning only visited order instead of distances"],
  },
  {
    id: "topological-sort",
    name: "Topological Sort",
    group: "Graphs",
    importance: "Used in build systems, course schedules, deployment ordering, package installation, and job pipelines.",
    childConcept:
      "If you must wear socks before shoes, socks must come first. Topological sort makes a correct order when some tasks must happen before other tasks.",
    concept:
      "Topological sort orders nodes in a directed acyclic graph so every dependency appears before the thing that depends on it.",
    industryUse: ["Package managers", "CI/CD pipelines", "Task schedulers", "Course prerequisite planning"],
    code: `from collections import deque, defaultdict

def topological_sort(nodes, edges):
    graph = defaultdict(list)
    indegree = {node: 0 for node in nodes}

    for before, after in edges:
        graph[before].append(after)
        indegree[after] += 1

    queue = deque([node for node in nodes if indegree[node] == 0])
    order = []

    while queue:
        node = queue.popleft()
        order.append(node)

        for neighbor in graph[node]:
            indegree[neighbor] -= 1
            if indegree[neighbor] == 0:
                queue.append(neighbor)

    return order if len(order) == len(nodes) else []`,
    walkthrough: [
      "`indegree` counts how many prerequisites each node still has.",
      "Nodes with indegree zero can be done immediately.",
      "When a node is completed, reduce the indegree of tasks depending on it.",
      "If a neighbor reaches indegree zero, it is ready and goes into the queue.",
      "If the final order does not include every node, a cycle exists.",
    ],
    complexity: "Time O(V + E), space O(V + E).",
    pitfalls: ["Trying to topologically sort an undirected graph", "Forgetting cycle detection", "Reversing edge direction"],
  },
  {
    id: "union-find",
    name: "Union Find (Disjoint Set Union)",
    group: "Connectivity",
    importance: "Used in networks, clustering, account merging, Kruskal MST, and dynamic connectivity.",
    childConcept:
      "Imagine students forming teams. At first, everyone is alone. When two students become teammates, their whole groups join. To check if two students are on the same team, ask for their team leader.",
    concept:
      "Union Find manages groups. `find` returns the representative of a group. `union` joins two groups. Path compression makes future finds faster.",
    industryUse: ["Account merge", "Network connectivity", "Image segmentation", "Minimum spanning tree"],
    code: `class UnionFind:
    def __init__(self, n):
        self.parent = list(range(n))
        self.rank = [0] * n

    def find(self, x):
        if self.parent[x] != x:
            self.parent[x] = self.find(self.parent[x])
        return self.parent[x]

    def union(self, a, b):
        root_a = self.find(a)
        root_b = self.find(b)

        if root_a == root_b:
            return False

        if self.rank[root_a] < self.rank[root_b]:
            self.parent[root_a] = root_b
        elif self.rank[root_a] > self.rank[root_b]:
            self.parent[root_b] = root_a
        else:
            self.parent[root_b] = root_a
            self.rank[root_a] += 1

        return True`,
    walkthrough: [
      "`parent[x]` points to x's group leader. Initially every item leads itself.",
      "`find` follows parent links until it reaches the leader.",
      "Path compression updates nodes to point directly to the leader.",
      "`union` finds both leaders and joins only if they are different.",
      "`rank` keeps the tree shallow by attaching the smaller tree under the bigger one.",
    ],
    complexity: "Almost O(1) amortized per operation, commonly written as O(alpha(n)).",
    pitfalls: ["Forgetting path compression", "Unioning raw nodes instead of roots", "Using it when edge order/path length matters"],
  },
  {
    id: "kadane",
    name: "Kadane's Algorithm",
    group: "Dynamic Programming",
    importance: "A must-know interview algorithm for maximum subarray and streaming profit-like problems.",
    childConcept:
      "Imagine collecting candies while walking. If your current bag becomes bad because it has negative value, throw that plan away and start fresh from the next house.",
    concept:
      "Kadane tracks the best subarray ending at the current position and the best subarray seen anywhere so far.",
    industryUse: ["Profit/loss streaks", "Signal analysis", "Maximum gain windows", "Time-series scoring"],
    code: `def max_subarray_sum(nums):
    best_ending_here = nums[0]
    best_so_far = nums[0]

    for value in nums[1:]:
        best_ending_here = max(value, best_ending_here + value)
        best_so_far = max(best_so_far, best_ending_here)

    return best_so_far`,
    walkthrough: [
      "`best_ending_here` means the best sum of a subarray that must end at the current value.",
      "For each value, choose whether to start fresh or extend the previous subarray.",
      "`best_so_far` remembers the strongest answer at any position.",
      "The algorithm works even when all numbers are negative because it starts from the first value.",
    ],
    complexity: "Time O(n), space O(1).",
    pitfalls: ["Initializing best to 0 when all values can be negative", "Returning current instead of global best", "Not understanding what the state means"],
  },
  {
    id: "sliding-window",
    name: "Sliding Window",
    group: "Arrays and Strings",
    importance: "Used heavily in interview string/array problems and real streaming analytics.",
    childConcept:
      "Imagine looking through a small window on a long train. You move the window forward instead of restarting from the first coach every time.",
    concept:
      "Sliding window maintains a valid range with left and right pointers. It expands to include new items and shrinks when the rule is broken.",
    industryUse: ["Rate limiting", "Rolling metrics", "Log monitoring", "Substring search constraints"],
    code: `def longest_substring_without_repeat(text):
    last_seen = {}
    left = 0
    best = 0

    for right, char in enumerate(text):
        if char in last_seen and last_seen[char] >= left:
            left = last_seen[char] + 1

        last_seen[char] = right
        best = max(best, right - left + 1)

    return best`,
    walkthrough: [
      "`left` and `right` describe the current substring window.",
      "`last_seen` remembers the latest index of each character.",
      "If a character repeats inside the current window, move `left` after its previous position.",
      "Update the character's latest position.",
      "The current valid length is `right - left + 1`.",
    ],
    complexity: "Time O(n), space O(k) where k is the character set size.",
    pitfalls: ["Moving left backward", "Shrinking too much", "Not checking whether duplicate is inside the current window"],
  },
  {
    id: "kmp",
    name: "KMP String Matching",
    group: "Strings",
    importance: "Used in text search, pattern matching, logs, editors, and interview string problems.",
    childConcept:
      "Suppose you are matching a word in a book. When one letter fails, you do not always need to restart from the next letter. KMP remembers what part of the word already matched.",
    concept:
      "KMP preprocesses a pattern into an LPS array. LPS tells how much of the pattern can be reused after a mismatch.",
    industryUse: ["Text search", "Log scanning", "DNA sequence matching", "Editor find tools"],
    code: `def kmp_search(text, pattern):
    if not pattern:
        return 0

    lps = build_lps(pattern)
    i = j = 0

    while i < len(text):
        if text[i] == pattern[j]:
            i += 1
            j += 1
            if j == len(pattern):
                return i - j
        elif j > 0:
            j = lps[j - 1]
        else:
            i += 1

    return -1

def build_lps(pattern):
    lps = [0] * len(pattern)
    length = 0
    i = 1

    while i < len(pattern):
        if pattern[i] == pattern[length]:
            length += 1
            lps[i] = length
            i += 1
        elif length > 0:
            length = lps[length - 1]
        else:
            i += 1

    return lps`,
    walkthrough: [
      "`build_lps` computes reusable prefix lengths for the pattern.",
      "`i` walks through the text and `j` walks through the pattern.",
      "When characters match, both pointers move.",
      "When the full pattern matches, return the starting index.",
      "On mismatch, KMP moves `j` using LPS instead of moving `i` backward.",
    ],
    complexity: "Time O(n + m), space O(m).",
    pitfalls: ["Misbuilding the LPS array", "Moving text pointer backward", "Not handling empty pattern"],
  },
  {
    id: "knapsack",
    name: "0/1 Knapsack Dynamic Programming",
    group: "Dynamic Programming",
    importance: "A foundation for resource allocation, budget optimization, and many take-or-skip interview problems.",
    childConcept:
      "You have a school bag that can carry only some weight. Each toy has weight and happiness points. You choose toys to get the most happiness without making the bag too heavy.",
    concept:
      "0/1 knapsack decides whether to take or skip each item. DP stores the best value possible for each capacity.",
    industryUse: ["Budget allocation", "Cloud resource planning", "Ad selection", "Portfolio optimization"],
    code: `def knapsack(weights, values, capacity):
    dp = [0] * (capacity + 1)

    for weight, value in zip(weights, values):
        for current_capacity in range(capacity, weight - 1, -1):
            take = value + dp[current_capacity - weight]
            skip = dp[current_capacity]
            dp[current_capacity] = max(skip, take)

    return dp[capacity]`,
    walkthrough: [
      "`dp[c]` means the best value possible with capacity `c` using processed items.",
      "For each item, capacities are scanned backward so the same item is not reused.",
      "`take` means choose the item and add its value to the best remaining capacity.",
      "`skip` means keep the old best answer without this item.",
      "The answer is the best value at full capacity.",
    ],
    complexity: "Time O(n * capacity), space O(capacity).",
    pitfalls: ["Looping capacity forward and accidentally reusing items", "Confusing 0/1 with unbounded knapsack", "Wrong DP state definition"],
  },
  {
    id: "backtracking",
    name: "Backtracking",
    group: "Recursion",
    importance: "Used in combinations, permutations, constraint solvers, search tools, and interview recursion problems.",
    childConcept:
      "Imagine trying outfits. Pick a shirt, then pants, then shoes. If it looks wrong, go back one step and try another choice. Backtracking means try, check, undo, and try again.",
    concept:
      "Backtracking explores choices recursively. It builds a partial answer, abandons invalid paths early, and undoes choices before trying the next option.",
    industryUse: ["Constraint solving", "Scheduling", "Combinatorial search", "Puzzle/game solvers"],
    code: `def subsets(nums):
    answer = []
    path = []

    def backtrack(index):
        if index == len(nums):
            answer.append(path.copy())
            return

        path.append(nums[index])
        backtrack(index + 1)
        path.pop()

        backtrack(index + 1)

    backtrack(0)
    return answer`,
    walkthrough: [
      "`path` stores the current partial subset.",
      "At each index, there are two choices: take the number or skip it.",
      "When taking, append the value and recurse.",
      "`path.pop()` undoes the choice so the next branch starts clean.",
      "When all indexes are decided, copy the path into the answer.",
    ],
    complexity: "Time O(2^n), space O(n) recursion depth excluding output.",
    pitfalls: ["Forgetting to undo a choice", "Appending path without copying", "Not pruning invalid branches"],
  },
  {
    id: "two-pointers",
    name: "Two Pointers",
    group: "Arrays and Strings",
    importance: "Used in sorted arrays, string cleanup, merging, deduping, and low-memory interview solutions.",
    childConcept:
      "Two friends start from two sides of a line of books. One checks from the left, one checks from the right. They move toward each other until they find what they need.",
    concept:
      "Two pointers use two indexes that move with purpose. They often replace nested loops when the data is sorted or when a range can be adjusted.",
    industryUse: ["Merging data streams", "Deduplication", "Palindrome checks", "Sorted search"],
    code: `def pair_with_sum(sorted_nums, target):
    left, right = 0, len(sorted_nums) - 1

    while left < right:
        total = sorted_nums[left] + sorted_nums[right]

        if total == target:
            return [left, right]
        if total < target:
            left += 1
        else:
            right -= 1

    return []`,
    walkthrough: [
      "`left` starts at the smallest value and `right` starts at the largest value.",
      "If the sum is correct, return both indexes.",
      "If the sum is too small, move `left` rightward to increase the sum.",
      "If the sum is too large, move `right` leftward to decrease the sum.",
      "The loop ends when the pointers meet.",
    ],
    complexity: "Time O(n), space O(1).",
    pitfalls: ["Using it when data is not sorted", "Moving the wrong pointer", "Missing duplicate-handling rules"],
  },
  {
    id: "mst-kruskal",
    name: "Kruskal's Minimum Spanning Tree",
    group: "Graphs",
    importance: "Used in network design, clustering, cable layout, and graph optimization interviews.",
    childConcept:
      "Imagine connecting houses with wires. You want every house connected, but you do not want to waste wire. Always choose the cheapest wire that does not make a useless circle.",
    concept:
      "Kruskal sorts edges by weight and keeps adding the cheapest edge that connects two different components. Union Find detects cycles efficiently.",
    industryUse: ["Network layout", "Clustering", "Approximation pipelines", "Infrastructure planning"],
    code: `def kruskal(n, edges):
    parent = list(range(n))
    rank = [0] * n

    def find(x):
        if parent[x] != x:
            parent[x] = find(parent[x])
        return parent[x]

    def union(a, b):
        root_a, root_b = find(a), find(b)
        if root_a == root_b:
            return False
        if rank[root_a] < rank[root_b]:
            parent[root_a] = root_b
        elif rank[root_a] > rank[root_b]:
            parent[root_b] = root_a
        else:
            parent[root_b] = root_a
            rank[root_a] += 1
        return True

    total = 0
    chosen = []
    for weight, a, b in sorted(edges):
        if union(a, b):
            total += weight
            chosen.append((a, b, weight))

    return total, chosen`,
    walkthrough: [
      "Sort all edges from cheapest to most expensive.",
      "Union Find tracks which nodes are already connected.",
      "For each edge, add it only if its endpoints are in different groups.",
      "If endpoints are already connected, the edge would create a cycle, so skip it.",
      "The chosen edges form a minimum spanning tree when the graph is connected.",
    ],
    complexity: "Time O(E log E), space O(V).",
    pitfalls: ["Forgetting to sort edges", "Adding cycle-forming edges", "Using MST for shortest path questions"],
  },
];

const roadmap = [
  {
    level: "Beginner",
    goal: "Build the mental model: memory, operations, loops, and basic problem solving.",
    weeks: [
      ["01", "Complexity, arrays, strings, two pointers"],
      ["02", "Hashing, prefix sums, sorting basics"],
      ["03", "Stacks, queues, linked lists"],
      ["04", "Recursion, backtracking foundations"],
    ],
  },
  {
    level: "Intermediate",
    goal: "Learn reusable patterns and turn them into interview-ready instincts.",
    weeks: [
      ["05", "Sliding window, binary search on answers"],
      ["06", "Trees, BST, heaps, priority queues"],
      ["07", "Graphs: BFS, DFS, shortest paths"],
      ["08", "Greedy, intervals, union find"],
    ],
  },
  {
    level: "Advanced",
    goal: "Handle open-ended constraints, optimization, and system-like applications.",
    weeks: [
      ["09", "Dynamic programming patterns"],
      ["10", "Tries, segment trees, bit manipulation"],
      ["11", "Advanced graph algorithms and design tasks"],
      ["12", "Mock interviews, timed sets, portfolio projects"],
    ],
  },
];

const topics = [
  {
    id: "arrays",
    name: "Arrays & Strings",
    level: "Beginner",
    prerequisites: "Loops, indexing, basic math",
    analogy: "A row of numbered lockers: instant access if you know the locker number.",
    explanation:
      "Arrays store contiguous values, making index access fast. Most array interview problems are about transforming repeated scans into smarter scans using pointers, hash maps, or prefix information.",
    visual: "array",
    intuition: "Track positions, windows, or cumulative facts instead of recomputing from scratch.",
    complexities: ["Access O(1)", "Search O(n)", "Insert middle O(n)", "Extra space often O(1) to O(n)"],
    mistakes: ["Off-by-one ranges", "Mutating input when caller expects original", "Forgetting empty arrays"],
    cheatsheet: ["Use two pointers for sorted arrays", "Use prefix sum for repeated range queries", "Use frequency maps for counts"],
    code: {
      cpp: `vector<int> twoSum(vector<int>& nums, int target) {
  unordered_map<int, int> seen;
  for (int i = 0; i < nums.size(); i++) {
    int need = target - nums[i];
    if (seen.count(need)) return {seen[need], i};
    seen[nums[i]] = i;
  }
  return {};
}`,
      java: `int[] twoSum(int[] nums, int target) {
  Map<Integer, Integer> seen = new HashMap<>();
  for (int i = 0; i < nums.length; i++) {
    int need = target - nums[i];
    if (seen.containsKey(need)) return new int[]{seen.get(need), i};
    seen.put(nums[i], i);
  }
  return new int[]{};
}`,
      python: `def two_sum(nums, target):
    seen = {}
    for i, value in enumerate(nums):
        need = target - value
        if need in seen:
            return [seen[need], i]
        seen[value] = i
    return []`,
    },
  },
  {
    id: "linked-lists",
    name: "Linked Lists",
    level: "Beginner",
    prerequisites: "Pointers/references, classes",
    analogy: "A treasure hunt where each clue tells you where the next clue is.",
    explanation:
      "Linked lists store nodes connected by references. They are excellent for practicing pointer updates, in-place reversal, cycle detection, and careful null handling.",
    visual: "linked",
    intuition: "Think in links, not positions. Draw before changing next pointers.",
    complexities: ["Access O(n)", "Insert/delete known node O(1)", "Search O(n)", "Space O(1) for pointer algorithms"],
    mistakes: ["Losing the rest of the list during reversal", "Null pointer access", "Not using dummy nodes for edge cases"],
    cheatsheet: ["Fast/slow pointers detect cycles", "Dummy head simplifies deletion", "Reverse with prev, cur, next"],
    code: {
      cpp: `ListNode* reverseList(ListNode* head) {
  ListNode* prev = nullptr;
  while (head) {
    ListNode* next = head->next;
    head->next = prev;
    prev = head;
    head = next;
  }
  return prev;
}`,
      java: `ListNode reverseList(ListNode head) {
  ListNode prev = null;
  while (head != null) {
    ListNode next = head.next;
    head.next = prev;
    prev = head;
    head = next;
  }
  return prev;
}`,
      python: `def reverse_list(head):
    prev = None
    while head:
        nxt = head.next
        head.next = prev
        prev = head
        head = nxt
    return prev`,
    },
  },
  {
    id: "stacks-queues",
    name: "Stacks & Queues",
    level: "Beginner",
    prerequisites: "Arrays, linked lists",
    analogy: "Stack: plates piled vertically. Queue: people waiting in line.",
    explanation:
      "Stacks process the most recent item first. Queues process the oldest item first. They power undo systems, parsing, monotonic patterns, BFS, and schedulers.",
    visual: "stack",
    intuition: "Choose stack for nested/reversible state, queue for breadth/time order.",
    complexities: ["Push/pop O(1)", "Enqueue/dequeue O(1)", "Peek O(1)", "Space O(n)"],
    mistakes: ["Using arrays with O(n) front deletion", "Confusing stack order with queue order", "Missing monotonic stack invariant"],
    cheatsheet: ["Stack: valid parentheses, next greater element", "Queue: BFS, task scheduling", "Deque: sliding window maximum"],
    code: {
      cpp: `bool isValid(string s) {
  stack<char> st;
  unordered_map<char, char> pairs = {{')','('}, {']','['}, {'}','{'}};
  for (char c : s) {
    if (pairs.count(c)) {
      if (st.empty() || st.top() != pairs[c]) return false;
      st.pop();
    } else st.push(c);
  }
  return st.empty();
}`,
      java: `boolean isValid(String s) {
  Deque<Character> stack = new ArrayDeque<>();
  Map<Character, Character> pairs = Map.of(')', '(', ']', '[', '}', '{');
  for (char c : s.toCharArray()) {
    if (pairs.containsKey(c)) {
      if (stack.isEmpty() || stack.pop() != pairs.get(c)) return false;
    } else stack.push(c);
  }
  return stack.isEmpty();
}`,
      python: `def is_valid(s):
    stack = []
    pairs = {")": "(", "]": "[", "}": "{"}
    for ch in s:
        if ch in pairs:
            if not stack or stack.pop() != pairs[ch]:
                return False
        else:
            stack.append(ch)
    return not stack`,
    },
  },
  {
    id: "trees",
    name: "Trees & BST",
    level: "Intermediate",
    prerequisites: "Recursion, queues",
    analogy: "An org chart: each person can manage smaller groups below them.",
    explanation:
      "Trees model hierarchy. Interview questions usually ask you to traverse, compute bottom-up values, validate properties, or serialize structure.",
    visual: "tree",
    intuition: "Most tree problems are solved by deciding what each node needs from its children or parent.",
    complexities: ["Traversal O(n)", "Balanced BST search O(log n)", "Skewed BST search O(n)", "Recursion stack O(h)"],
    mistakes: ["Assuming a binary tree is balanced", "Using local BST checks instead of min/max ranges", "Ignoring null base cases"],
    cheatsheet: ["DFS for depth/path problems", "BFS for level order", "BST inorder traversal is sorted"],
    code: {
      cpp: `int maxDepth(TreeNode* root) {
  if (!root) return 0;
  return 1 + max(maxDepth(root->left), maxDepth(root->right));
}`,
      java: `int maxDepth(TreeNode root) {
  if (root == null) return 0;
  return 1 + Math.max(maxDepth(root.left), maxDepth(root.right));
}`,
      python: `def max_depth(root):
    if not root:
        return 0
    return 1 + max(max_depth(root.left), max_depth(root.right))`,
    },
  },
  {
    id: "graphs",
    name: "Graphs",
    level: "Intermediate",
    prerequisites: "Queues, recursion, hash maps",
    analogy: "Cities and roads: nodes are places, edges are possible moves.",
    explanation:
      "Graphs represent relationships. Learn traversal first, then shortest paths, cycle detection, topological sort, and connected components.",
    visual: "graph",
    intuition: "Always define state: node, cost, visited condition, and what makes an edge usable.",
    complexities: ["BFS/DFS O(V + E)", "Dijkstra O((V + E) log V)", "Space O(V + E)", "Matrix graphs can cost O(V^2)"],
    mistakes: ["Marking visited too late", "Forgetting disconnected components", "Using BFS on weighted graphs"],
    cheatsheet: ["BFS for unweighted shortest path", "DFS for components/cycles", "Topological sort for prerequisites"],
    code: {
      cpp: `vector<int> bfs(int start, vector<vector<int>>& graph) {
  vector<int> order, seen(graph.size());
  queue<int> q;
  q.push(start);
  seen[start] = 1;
  while (!q.empty()) {
    int node = q.front(); q.pop();
    order.push_back(node);
    for (int next : graph[node]) {
      if (!seen[next]) {
        seen[next] = 1;
        q.push(next);
      }
    }
  }
  return order;
}`,
      java: `List<Integer> bfs(int start, List<List<Integer>> graph) {
  List<Integer> order = new ArrayList<>();
  boolean[] seen = new boolean[graph.size()];
  Queue<Integer> q = new ArrayDeque<>();
  q.add(start);
  seen[start] = true;
  while (!q.isEmpty()) {
    int node = q.remove();
    order.add(node);
    for (int next : graph.get(node)) {
      if (!seen[next]) {
        seen[next] = true;
        q.add(next);
      }
    }
  }
  return order;
}`,
      python: `from collections import deque

def bfs(start, graph):
    order, seen = [], {start}
    q = deque([start])
    while q:
        node = q.popleft()
        order.append(node)
        for nxt in graph[node]:
            if nxt not in seen:
                seen.add(nxt)
                q.append(nxt)
    return order`,
    },
  },
  {
    id: "hashing",
    name: "Hashing",
    level: "Beginner",
    prerequisites: "Arrays, strings",
    analogy: "A labeled filing cabinet where the label tells you exactly where to look.",
    explanation:
      "Hash maps and sets trade extra memory for fast lookup. They are the backbone of frequency counting, duplicate detection, memoization, and indexing.",
    visual: "hash",
    intuition: "If you keep asking 'have I seen this before?', hashing is probably useful.",
    complexities: ["Average insert/search O(1)", "Worst case O(n)", "Space O(n)", "Sorting alternative often O(n log n)"],
    mistakes: ["Ignoring collisions conceptually", "Using mutable objects as keys", "Forgetting to update counts when sliding"],
    cheatsheet: ["Map value to count/index/list", "Set for membership", "Composite keys encode state"],
    code: {
      cpp: `bool hasDuplicate(vector<int>& nums) {
  unordered_set<int> seen;
  for (int x : nums) {
    if (seen.count(x)) return true;
    seen.insert(x);
  }
  return false;
}`,
      java: `boolean hasDuplicate(int[] nums) {
  Set<Integer> seen = new HashSet<>();
  for (int x : nums) {
    if (!seen.add(x)) return true;
  }
  return false;
}`,
      python: `def has_duplicate(nums):
    seen = set()
    for x in nums:
        if x in seen:
            return True
        seen.add(x)
    return False`,
    },
  },
  {
    id: "heaps",
    name: "Heaps & Priority Queues",
    level: "Intermediate",
    prerequisites: "Arrays, trees",
    analogy: "A triage desk where the most urgent task is always served first.",
    explanation:
      "Heaps maintain quick access to the minimum or maximum item while allowing efficient insertion. They are used in top-k, scheduling, merging, and graph algorithms.",
    visual: "heap",
    intuition: "Use a heap when sorted order is overkill but repeated best-item access is needed.",
    complexities: ["Push O(log n)", "Pop O(log n)", "Peek O(1)", "Heapify O(n)"],
    mistakes: ["Using full sort repeatedly", "Forgetting Python heapq is min-heap only", "Wrong comparator direction"],
    cheatsheet: ["Min heap for next smallest", "Fixed-size heap for top-k", "Pair cost with item for scheduling"],
    code: {
      cpp: `int findKthLargest(vector<int>& nums, int k) {
  priority_queue<int, vector<int>, greater<int>> pq;
  for (int x : nums) {
    pq.push(x);
    if (pq.size() > k) pq.pop();
  }
  return pq.top();
}`,
      java: `int findKthLargest(int[] nums, int k) {
  PriorityQueue<Integer> pq = new PriorityQueue<>();
  for (int x : nums) {
    pq.add(x);
    if (pq.size() > k) pq.remove();
  }
  return pq.peek();
}`,
      python: `import heapq

def find_kth_largest(nums, k):
    heap = []
    for x in nums:
        heapq.heappush(heap, x)
        if len(heap) > k:
            heapq.heappop(heap)
    return heap[0]`,
    },
  },
  {
    id: "dp",
    name: "Dynamic Programming",
    level: "Advanced",
    prerequisites: "Recursion, arrays, graphs",
    analogy: "Solving a workbook where later answers reuse earlier answers.",
    explanation:
      "Dynamic programming solves problems with overlapping subproblems and optimal substructure. Start with recursion, define state, then cache or tabulate.",
    visual: "dp",
    intuition: "State is the whole game: what variables uniquely describe a subproblem?",
    complexities: ["Usually states x transitions", "Memo space equals state count", "Tabulation can optimize space", "Exponential recursion often becomes polynomial"],
    mistakes: ["Choosing incomplete state", "Wrong base cases", "Optimizing space before correctness"],
    cheatsheet: ["1D: house robber, climbing stairs", "2D: grid paths, LCS", "Knapsack: choose/take transitions"],
    code: {
      cpp: `int climbStairs(int n) {
  int a = 1, b = 1;
  for (int i = 2; i <= n; i++) {
    int c = a + b;
    a = b;
    b = c;
  }
  return b;
}`,
      java: `int climbStairs(int n) {
  int a = 1, b = 1;
  for (int i = 2; i <= n; i++) {
    int c = a + b;
    a = b;
    b = c;
  }
  return b;
}`,
      python: `def climb_stairs(n):
    a = b = 1
    for _ in range(2, n + 1):
        a, b = b, a + b
    return b`,
    },
  },
  {
    id: "tries",
    name: "Tries & Prefix Search",
    level: "Advanced",
    prerequisites: "Hashing, trees",
    analogy: "A dictionary organized by shared prefixes instead of complete words.",
    explanation:
      "Tries store strings character by character. They make prefix queries fast and are common in autocomplete, word search, routing, and IP matching.",
    visual: "tree",
    intuition: "Shared prefixes become shared paths, reducing repeated string scans.",
    complexities: ["Insert O(L)", "Search O(L)", "Prefix O(L)", "Space O(total characters)"],
    mistakes: ["Forgetting end-of-word marker", "Using array children when alphabet is huge", "Not pruning in DFS word search"],
    cheatsheet: ["Node children map char to node", "Mark terminal words", "Combine trie + DFS for board search"],
    code: {
      cpp: `struct TrieNode {
  unordered_map<char, TrieNode*> child;
  bool word = false;
};

void insert(TrieNode* root, string s) {
  for (char c : s) {
    if (!root->child[c]) root->child[c] = new TrieNode();
    root = root->child[c];
  }
  root->word = true;
}`,
      java: `class TrieNode {
  Map<Character, TrieNode> child = new HashMap<>();
  boolean word;
}

void insert(TrieNode root, String s) {
  for (char c : s.toCharArray()) {
    root.child.putIfAbsent(c, new TrieNode());
    root = root.child.get(c);
  }
  root.word = true;
}`,
      python: `class TrieNode:
    def __init__(self):
        self.child = {}
        self.word = False

def insert(root, s):
    for ch in s:
        root = root.child.setdefault(ch, TrieNode())
    root.word = True`,
    },
  },
];

const practiceProblems = [
  {
    id: "p1",
    title: "Two Sum",
    topic: "Arrays & Strings",
    pattern: "Hashing",
    difficulty: "Easy",
    io: "Input: nums=[2,7,11,15], target=9 -> Output: [0,1]",
    hint: "Store the number you need before moving on.",
    solution: "Scan once. For each value, check if target - value is already in a map.",
  },
  {
    id: "p2",
    title: "Longest Substring Without Repeating Characters",
    topic: "Arrays & Strings",
    pattern: "Sliding Window",
    difficulty: "Medium",
    io: 'Input: "abcabcbb" -> Output: 3',
    hint: "Move left only when a duplicate is inside the current window.",
    solution: "Use a map from character to last index and maintain a valid left boundary.",
  },
  {
    id: "p3",
    title: "Reverse Linked List",
    topic: "Linked Lists",
    pattern: "Pointer Reversal",
    difficulty: "Easy",
    io: "Input: 1->2->3->null -> Output: 3->2->1->null",
    hint: "Keep the next pointer before changing it.",
    solution: "Iterate with prev, current, and next references until current is null.",
  },
  {
    id: "p4",
    title: "Binary Tree Level Order Traversal",
    topic: "Trees & BST",
    pattern: "BFS",
    difficulty: "Medium",
    io: "Input: [3,9,20,null,null,15,7] -> Output: [[3],[9,20],[15,7]]",
    hint: "Process the queue in fixed-size batches.",
    solution: "For each level, read queue size, pop that many nodes, then enqueue children.",
  },
  {
    id: "p5",
    title: "Course Schedule",
    topic: "Graphs",
    pattern: "Topological Sort",
    difficulty: "Medium",
    io: "Input: numCourses=2, prerequisites=[[1,0]] -> Output: true",
    hint: "A cycle means impossible.",
    solution: "Use indegrees and BFS. If you process all courses, the schedule is valid.",
  },
  {
    id: "p6",
    title: "LRU Cache",
    topic: "Hashing",
    pattern: "Design",
    difficulty: "Hard",
    io: "Input: put/get operations -> Output: values or -1",
    hint: "Hash map gives access. Doubly linked list gives recency order.",
    solution: "Map key to node. Move accessed nodes to front and evict from tail.",
  },
  {
    id: "p7",
    title: "Kth Largest Element",
    topic: "Heaps & Priority Queues",
    pattern: "Top K",
    difficulty: "Medium",
    io: "Input: nums=[3,2,1,5,6,4], k=2 -> Output: 5",
    hint: "Keep only k candidates.",
    solution: "Use a min heap of size k. The heap top is the kth largest.",
  },
  {
    id: "p8",
    title: "Longest Common Subsequence",
    topic: "Dynamic Programming",
    pattern: "2D DP",
    difficulty: "Medium",
    io: 'Input: "abcde", "ace" -> Output: 3',
    hint: "Let dp[i][j] mean answer for prefixes.",
    solution: "If chars match, take 1 + diagonal. Otherwise take max of left/up.",
  },
  {
    id: "p9",
    title: "Word Search II",
    topic: "Tries & Prefix Search",
    pattern: "Trie + Backtracking",
    difficulty: "Hard",
    io: 'Input: board + words=["oath","pea","eat","rain"] -> Output: ["eat","oath"]',
    hint: "Stop DFS as soon as the current prefix is absent.",
    solution: "Build a trie for words, DFS from each cell, and collect terminal trie nodes.",
  },
];

const topicQuestionBlueprints = {
  arrays: {
    easy: [
      ["Find Maximum and Minimum", "Linear Scan", "Input: [4,1,9,2] -> Output: min=1, max=9"],
      ["Reverse an Array In Place", "Two Pointers", "Input: [1,2,3] -> Output: [3,2,1]"],
      ["Check if Array is Sorted", "Linear Scan", "Input: [1,2,2,5] -> Output: true"],
      ["Remove Duplicates from Sorted Array", "Two Pointers", "Input: [1,1,2,3] -> Output: [1,2,3]"],
      ["Move Zeroes to End", "Two Pointers", "Input: [0,1,0,3] -> Output: [1,3,0,0]"],
      ["Rotate Array by One", "Array Rotation", "Input: [1,2,3] -> Output: [3,1,2]"],
      ["Find Missing Number from 0 to n", "Math / XOR", "Input: [3,0,1] -> Output: 2"],
      ["Find Single Number", "XOR", "Input: [2,2,1] -> Output: 1"],
      ["Merge Two Sorted Arrays", "Two Pointers", "Input: [1,3], [2,4] -> Output: [1,2,3,4]"],
      ["Count Frequency of Elements", "Hashing", "Input: [1,1,2] -> Output: {1:2,2:1}"],
      ["Find Second Largest", "Linear Scan", "Input: [5,1,7,7] -> Output: 5"],
      ["Valid Palindrome String", "Two Pointers", "Input: racecar -> Output: true"],
      ["Maximum Consecutive Ones", "Linear Scan", "Input: [1,1,0,1] -> Output: 2"],
      ["Left Rotate by K", "Reversal", "Input: [1,2,3,4], k=2 -> Output: [3,4,1,2]"],
      ["Find Common Elements", "Two Pointers", "Input: [1,2,3], [2,3] -> Output: [2,3]"],
      ["Prefix Sum Range Query", "Prefix Sum", "Input: sum(1,3) -> Output: pre[4]-pre[1]"],
      ["Replace Each Element with Greatest Right", "Right Scan", "Input: [17,18,5] -> Output: [18,5,-1]"],
      ["Squares of Sorted Array", "Two Pointers", "Input: [-4,-1,0,3] -> Output: [0,1,9,16]"],
    ],
    medium: [
      ["Two Sum", "Hashing", "Input: [2,7,11], target=9 -> Output: [0,1]"],
      ["Three Sum", "Sorting + Two Pointers", "Input: [-1,0,1,2,-1] -> Output: triplets summing 0"],
      ["Longest Substring Without Repeating Characters", "Sliding Window", "Input: abcabcbb -> Output: 3"],
      ["Maximum Subarray Sum", "Kadane", "Input: [-2,1,-3,4] -> Output: 4"],
      ["Subarray Sum Equals K", "Prefix Sum + Hashing", "Input: [1,1,1], k=2 -> Output: 2"],
      ["Product of Array Except Self", "Prefix/Suffix", "Input: [1,2,3,4] -> Output: [24,12,8,6]"],
      ["Container With Most Water", "Two Pointers", "Input: heights -> Output: max area"],
      ["Sort Colors", "Dutch National Flag", "Input: [2,0,2,1] -> Output: [0,1,2,2]"],
      ["Next Permutation", "Suffix Reversal", "Input: [1,2,3] -> Output: [1,3,2]"],
      ["Spiral Matrix", "Simulation", "Input: matrix -> Output: spiral order"],
      ["Merge Intervals", "Sorting", "Input: [[1,3],[2,6]] -> Output: [[1,6]]"],
      ["Search in Rotated Sorted Array", "Binary Search", "Input: [4,5,6,1,2], target=1 -> Output: 3"],
      ["Find Peak Element", "Binary Search", "Input: [1,2,3,1] -> Output: index 2"],
      ["Minimum Size Subarray Sum", "Sliding Window", "Input: target=7, [2,3,1,2,4,3] -> Output: 2"],
      ["Longest Repeating Character Replacement", "Sliding Window", "Input: AABABBA, k=1 -> Output: 4"],
      ["Group Anagrams", "Hashing", "Input: eat, tea, tan -> Output: grouped anagrams"],
      ["Set Matrix Zeroes", "In-place Marking", "Input: matrix with zero -> Output: row/column zeroed"],
      ["Find Duplicate Number", "Cycle Detection", "Input: [1,3,4,2,2] -> Output: 2"],
      ["Koko Eating Bananas", "Binary Search on Answer", "Input: piles, h -> Output: min speed"],
      ["Longest Consecutive Sequence", "Hash Set", "Input: [100,4,200,1,3,2] -> Output: 4"],
    ],
    hard: [
      ["Trapping Rain Water", "Two Pointers", "Input: heights -> Output: trapped water"],
      ["Median of Two Sorted Arrays", "Binary Search Partition", "Input: [1,3], [2] -> Output: 2"],
      ["Minimum Window Substring", "Sliding Window", "Input: ADOBECODEBANC, ABC -> Output: BANC"],
      ["First Missing Positive", "Index Placement", "Input: [3,4,-1,1] -> Output: 2"],
      ["Largest Rectangle in Histogram", "Monotonic Stack", "Input: [2,1,5,6,2,3] -> Output: 10"],
      ["Maximal Rectangle", "Histogram + DP", "Input: binary matrix -> Output: max rectangle"],
      ["Sliding Window Maximum", "Deque", "Input: nums, k -> Output: window maxes"],
      ["Count Smaller Numbers After Self", "Fenwick / Merge Sort", "Input: [5,2,6,1] -> Output: [2,1,1,0]"],
      ["Reverse Pairs", "Merge Sort", "Input: [1,3,2,3,1] -> Output: 2"],
      ["Split Array Largest Sum", "Binary Search on Answer", "Input: nums, k -> Output: minimized largest sum"],
      ["Maximum Gap", "Bucket Sort", "Input: [3,6,9,1] -> Output: 3"],
      ["Shortest Subarray with Sum at Least K", "Prefix + Deque", "Input: nums, k -> Output: min length"],
    ],
  },
  "linked-lists": {
    easy: [
      ["Reverse Linked List", "Pointer Reversal", "Input: 1->2->3 -> Output: 3->2->1"],
      ["Find Middle of Linked List", "Fast/Slow Pointers", "Input: 1->2->3 -> Output: 2"],
      ["Detect Cycle", "Floyd Cycle", "Input: linked list -> Output: true/false"],
      ["Delete Node by Value", "Dummy Node", "Input: remove 3 -> Output: list without 3"],
      ["Merge Two Sorted Lists", "Two Pointers", "Input: 1->3 and 2->4 -> Output: 1->2->3->4"],
      ["Count Nodes", "Traversal", "Input: head -> Output: length"],
      ["Search in Linked List", "Traversal", "Input: key=7 -> Output: found/not found"],
      ["Insert at Head", "Pointer Update", "Input: value=5 -> Output: new head"],
      ["Insert at Tail", "Traversal", "Input: value=5 -> Output: appended list"],
      ["Remove Duplicates from Sorted List", "Single Pass", "Input: 1->1->2 -> Output: 1->2"],
      ["Find Nth Node", "Traversal", "Input: n=3 -> Output: third node"],
      ["Convert Array to List", "Construction", "Input: [1,2,3] -> Output: linked nodes"],
      ["Print List in Reverse", "Recursion / Stack", "Input: 1->2->3 -> Output: 3,2,1"],
      ["Compare Two Lists", "Traversal", "Input: two heads -> Output: equal/not equal"],
      ["Delete Tail Node", "Pointer Update", "Input: 1->2->3 -> Output: 1->2"],
      ["Find Previous Node", "Traversal", "Input: target -> Output: previous node"],
      ["Clear Linked List", "Traversal", "Input: head -> Output: empty list"],
      ["Get Decimal Value", "Accumulation", "Input: 1->0->1 -> Output: 5"],
    ],
    medium: [
      ["Remove Nth Node from End", "Two Pointers", "Input: n=2 -> Output: node removed"],
      ["Add Two Numbers", "Carry Simulation", "Input: 2->4->3 + 5->6->4 -> Output: 7->0->8"],
      ["Reorder List", "Middle + Reverse + Merge", "Input: 1->2->3->4 -> Output: 1->4->2->3"],
      ["Palindrome Linked List", "Fast/Slow + Reverse", "Input: 1->2->2->1 -> Output: true"],
      ["Intersection of Two Lists", "Pointer Switching", "Input: two heads -> Output: intersection"],
      ["Rotate List", "Cycle + Break", "Input: 1->2->3, k=1 -> Output: 3->1->2"],
      ["Partition List", "Two Dummy Lists", "Input: x=3 -> Output: less then greater"],
      ["Swap Nodes in Pairs", "Pointer Rewiring", "Input: 1->2->3->4 -> Output: 2->1->4->3"],
      ["Odd Even Linked List", "Pointer Grouping", "Input: 1->2->3->4 -> Output: 1->3->2->4"],
      ["Sort List", "Merge Sort", "Input: unsorted list -> Output: sorted list"],
      ["Copy List with Random Pointer", "Hash Map / Weaving", "Input: random list -> Output: deep copy"],
      ["Flatten Multilevel List", "DFS", "Input: child pointers -> Output: flattened list"],
      ["Cycle Entry Point", "Floyd Cycle", "Input: cyclic list -> Output: entry node"],
      ["Delete Duplicates II", "Dummy Node", "Input: 1->2->3->3 -> Output: 1->2"],
      ["Split List to Parts", "Length + Slicing", "Input: k parts -> Output: balanced parts"],
      ["Linked List Components", "Hash Set", "Input: subset values -> Output: component count"],
      ["Remove Zero Sum Sublists", "Prefix Sum", "Input: 1->2->-3->3 -> Output: 3"],
      ["Next Greater Node", "Monotonic Stack", "Input: 2->1->5 -> Output: [5,5,0]"],
      ["Merge Nodes Between Zeroes", "Accumulation", "Input: 0->3->1->0 -> Output: 4"],
      ["Twin Sum of Linked List", "Reverse Second Half", "Input: even list -> Output: max twin sum"],
    ],
    hard: [
      ["Reverse Nodes in K Group", "Block Reversal", "Input: k=2 -> Output: pairwise reversed groups"],
      ["Merge K Sorted Lists", "Heap / Divide Conquer", "Input: k lists -> Output: one sorted list"],
      ["LRU Cache Internals", "Doubly List + Hash Map", "Input: get/put -> Output: cache responses"],
      ["All O(1) Data Structure", "Bucket List", "Input: inc/dec/getMax/getMin -> Output: O(1)"],
      ["Design Browser History", "Doubly Linked List", "Input: visit/back/forward -> Output: current page"],
      ["Skip List Search", "Layered Linked Lists", "Input: key -> Output: found/not found"],
      ["Reverse Alternate K Nodes", "Block Reversal", "Input: k=3 -> Output: alternate groups reversed"],
      ["Clone Graph with Linked Neighbors", "Hash Map DFS", "Input: node references -> Output: deep copy"],
      ["Sort Nearly Sorted Linked List", "Min Heap", "Input: k-sorted list -> Output: sorted list"],
      ["Flatten Sorted Linked Lists", "Merge", "Input: down/right list -> Output: sorted flattened list"],
      ["Text Editor Cursor", "Two Lists", "Input: add/delete/move -> Output: cursor text"],
      ["Persistent Linked List Versioning", "Structural Sharing", "Input: updates -> Output: old/new versions"],
    ],
  },
};

function fallbackBlueprint(topicName) {
  const base = topicName.replace(/&/g, "and");
  return {
    easy: [
      [`Identify ${base} Operations`, "Fundamentals", "Input: operation list -> Output: result"],
      [`Implement Basic ${base}`, "Implementation", "Input: commands -> Output: final structure"],
      [`Traverse ${base}`, "Traversal", "Input: structure -> Output: visit order"],
      [`Search in ${base}`, "Search", "Input: key -> Output: found/not found"],
      [`Count Elements in ${base}`, "Counting", "Input: structure -> Output: count"],
      [`Find Minimum in ${base}`, "Scan", "Input: values -> Output: minimum"],
      [`Find Maximum in ${base}`, "Scan", "Input: values -> Output: maximum"],
      [`Validate Simple ${base}`, "Validation", "Input: structure -> Output: valid/invalid"],
      [`Build ${base} from Input`, "Construction", "Input: values -> Output: structure"],
      [`Convert ${base} to Array`, "Traversal", "Input: structure -> Output: array"],
      [`Handle Empty ${base}`, "Edge Cases", "Input: empty -> Output: safe result"],
      [`Compare Two ${base} Structures`, "Traversal", "Input: two structures -> Output: equal/not equal"],
      [`Find First Match in ${base}`, "Search", "Input: predicate -> Output: first match"],
      [`Remove One Item from ${base}`, "Update", "Input: key -> Output: updated structure"],
      [`Insert One Item into ${base}`, "Update", "Input: value -> Output: updated structure"],
      [`Print ${base} Levels or States`, "Traversal", "Input: structure -> Output: grouped states"],
      [`Compute Simple Metric for ${base}`, "Aggregation", "Input: structure -> Output: metric"],
      [`Explain ${base} Complexity`, "Analysis", "Input: operations -> Output: Big O"],
    ],
    medium: [
      [`Optimize Search in ${base}`, "Hashing / Indexing", "Input: repeated queries -> Output: faster answers"],
      [`Detect Cycle or Repeated State in ${base}`, "Visited Set", "Input: transitions -> Output: cycle/no cycle"],
      [`Find Shortest Operation Sequence in ${base}`, "BFS", "Input: start/end -> Output: min steps"],
      [`Group ${base} Items by Pattern`, "Hashing", "Input: values -> Output: groups"],
      [`Maintain Top K in ${base}`, "Heap", "Input: stream -> Output: top k"],
      [`Range Query on ${base}`, "Prefix / Tree Index", "Input: queries -> Output: range answers"],
      [`Balance Work Across ${base}`, "Greedy", "Input: tasks -> Output: assignment"],
      [`Serialize and Deserialize ${base}`, "Encoding", "Input: structure -> Output: string and back"],
      [`Find Boundary Cases in ${base}`, "Edge Cases", "Input: tricky data -> Output: correct result"],
      [`Merge Multiple ${base} Inputs`, "Merge", "Input: structures -> Output: combined result"],
      [`Transform ${base} In Place`, "In-place Update", "Input: structure -> Output: transformed"],
      [`Find Longest Valid Segment in ${base}`, "Sliding Window / DFS", "Input: values -> Output: length"],
      [`Count Valid Configurations in ${base}`, "DP / Backtracking", "Input: constraints -> Output: count"],
      [`Design Iterator for ${base}`, "Stateful Traversal", "Input: next/hasNext -> Output: values"],
      [`Compute Dependency Order in ${base}`, "Topological Thinking", "Input: dependencies -> Output: order"],
      [`Find Duplicate State in ${base}`, "Hashing", "Input: states -> Output: duplicate"],
      [`Minimize Cost in ${base}`, "Greedy / DP", "Input: costs -> Output: min cost"],
      [`Find Kth Element in ${base}`, "Selection", "Input: k -> Output: kth item"],
      [`Process Streaming ${base} Data`, "Online Algorithm", "Input: stream -> Output: live answers"],
      [`Recover Corrupted ${base}`, "Invariant Repair", "Input: broken structure -> Output: fixed structure"],
    ],
    hard: [
      [`Design Production ${base} Service`, "System Design", "Input: API calls -> Output: correct service state"],
      [`Support Dynamic Updates in ${base}`, "Advanced Indexing", "Input: updates/queries -> Output: answers"],
      [`Find Optimal Global Answer in ${base}`, "DP / Graph Search", "Input: constraints -> Output: optimum"],
      [`Scale ${base} Queries to Large N`, "Preprocessing", "Input: 100k queries -> Output: fast answers"],
      [`Handle Concurrency-like Events in ${base}`, "Ordering", "Input: events -> Output: consistent state"],
      [`Prove Correctness of ${base} Algorithm`, "Proof", "Input: algorithm -> Output: invariant proof"],
      [`Compress ${base} State`, "Space Optimization", "Input: huge state -> Output: compact state"],
      [`Build Fault-Tolerant ${base}`, "Robust Design", "Input: invalid operations -> Output: safe behavior"],
      [`Find All Critical Structures in ${base}`, "Advanced Traversal", "Input: structure -> Output: critical items"],
      [`Optimize Memory for ${base}`, "Space Optimization", "Input: constraints -> Output: low-memory solution"],
      [`Combine ${base} with Caching`, "Design + Hashing", "Input: repeated work -> Output: cached answers"],
      [`Advanced Interview Challenge for ${base}`, "Mixed Patterns", "Input: hidden constraints -> Output: efficient solution"],
    ],
  };
}

function buildTopicQuestions(topic) {
  const blueprint = topicQuestionBlueprints[topic.id] || fallbackBlueprint(topic.name);
  return ["easy", "medium", "hard"].flatMap((difficulty) =>
    blueprint[difficulty].map(([title, pattern, example], index) => ({
      id: `${topic.id}-${difficulty}-${index + 1}`,
      title,
      pattern,
      example,
      difficulty: difficulty[0].toUpperCase() + difficulty.slice(1),
      explanation: makeQuestionExplanation(topic, title, pattern, difficulty),
    })),
  );
}

function makeQuestionExplanation(topic, title, pattern, difficulty) {
  const levelAdvice = {
    easy: "Start with the direct invariant and keep the implementation readable. The main goal is correctness on empty input, one element, duplicates, and boundary indexes.",
    medium:
      "First describe the brute-force approach, then remove repeated work with the stated pattern. Keep a small example beside the code and update the important variables after every step.",
    hard:
      "Hard versions usually combine two ideas. Lock down the invariant, prove why each item is processed a limited number of times, and test the most hostile edge case before finalizing.",
  };
  const complexityReason = makeQuestionComplexityReason(pattern, difficulty);
  return {
    idea: `${title} is a ${topic.name} problem. The practical hook is ${pattern}: use it to preserve the exact information needed for the next decision without recomputing the entire structure.`,
    steps: [
      `Clarify input size, allowed mutation, duplicate handling, and what should happen for empty or invalid input.`,
      `Choose the ${pattern} pattern and write the invariant in one sentence before coding.`,
      `Process the ${topic.name.toLowerCase()} data in the natural order for this pattern, updating only the state required by the invariant.`,
      `Return the answer only after checking boundary cases: smallest input, repeated values, already optimal input, and worst-shaped input.`,
    ],
    complexity:
      difficulty === "hard"
        ? "Target O(n log n) or O(n) time depending on the pattern; justify any extra data structure. Space is usually O(n), unless the problem explicitly asks for in-place work."
        : difficulty === "medium"
          ? "Target O(n) or O(n log n) time after optimization. Extra space is usually O(1) for pointer scans or O(n) for maps, sets, queues, stacks, and memo tables."
          : "Target O(n) time for a single pass or O(1)/O(n) space depending on whether the answer needs auxiliary storage.",
    timeReason: complexityReason.time,
    spaceReason: complexityReason.space,
    complexityInterview: complexityReason.interview,
    educatorNote: levelAdvice[difficulty],
  };
}

function makeQuestionComplexityReason(pattern, difficulty) {
  const p = pattern.toLowerCase();
  if (p.includes("two pointers")) {
    return {
      time: "Time is usually O(n) because each pointer moves in one direction and does not repeatedly revisit the same element. Even with two pointers, the total number of pointer moves is bounded by the input size.",
      space: "Space is usually O(1) because the solution stores only indexes and a few variables, unless the problem asks you to build a separate output list.",
      interview: "I would say: both pointers move forward/inward at most n total steps, so the time is linear, and the extra memory is constant.",
    };
  }
  if (p.includes("sliding window")) {
    return {
      time: "Time is O(n) because the right pointer scans the input once and the left pointer only moves forward. Each item enters the window once and leaves the window at most once.",
      space: "Space is O(k) or O(n) depending on what the window tracks. If it stores character counts, k is the character set; if it stores arbitrary values, it can grow with n.",
      interview: "I would say: the window never moves backward, so total pointer movement is linear; the map/set inside the window determines the extra space.",
    };
  }
  if (p.includes("hash")) {
    return {
      time: "Time is usually O(n) average because you scan the input once and hash map/set insert and lookup are O(1) on average.",
      space: "Space is O(n) in the worst case because the hash table may need to store many or all input elements, counts, or indexes.",
      interview: "I would say: I trade memory for speed. The single scan is linear, and the hash table gives average constant lookup.",
    };
  }
  if (p.includes("binary search")) {
    return {
      time: "Time is O(log n) when searching a sorted/monotonic space because each check removes half of the remaining candidates.",
      space: "Space is O(1) for iterative binary search because only left, right, and mid variables are stored.",
      interview: "I would say: every decision halves the search space, which is why the number of checks is logarithmic.",
    };
  }
  if (p.includes("bfs")) {
    return {
      time: "Time is O(V + E) for graphs because BFS visits every vertex once and inspects every edge from the adjacency list once.",
      space: "Space is O(V) because the queue and visited set can store vertices, especially when a large level is waiting to be processed.",
      interview: "I would say: each node enters the queue once, and each edge is checked once, so BFS is linear in graph size.",
    };
  }
  if (p.includes("dfs") || p.includes("backtracking")) {
    if (p.includes("backtracking")) {
      return {
        time: "Time can be exponential because the algorithm explores multiple choices at each step. For subsets, two choices per item creates O(2^n) states; for permutations, it can be O(n!).",
        space: "Space is usually O(n) for the recursion path, excluding the output. If all answers are stored, output space can also be exponential.",
        interview: "I would say: the branching factor drives the time, and the recursion depth drives the extra working space.",
      };
    }
    return {
      time: "Time is O(V + E) for graph/tree traversal because each node is visited once and each edge/child link is explored once.",
      space: "Space is O(V) in the worst case because of the visited set and recursion stack, especially for a long chain-like graph.",
      interview: "I would say: DFS does constant work per node and edge, while recursion/visited storage can grow with the number of nodes.",
    };
  }
  if (p.includes("heap") || p.includes("top k")) {
    return {
      time: "Time is usually O(n log k) for top-k problems because each of n values may cause a heap push/pop, and heap size is kept around k.",
      space: "Space is O(k) when the heap stores only k best candidates, or O(n) if the full heap is built.",
      interview: "I would say: the heap avoids sorting everything; each update costs log k, and the heap stores only the candidates I need.",
    };
  }
  if (p.includes("prefix")) {
    return {
      time: "Building prefix data takes O(n). Each range query can then be answered in O(1), so total time is O(n + q) for q queries.",
      space: "Space is O(n) because the prefix array stores one cumulative value per position.",
      interview: "I would say: I pay one linear preprocessing cost so repeated queries become constant time.",
    };
  }
  if (p.includes("dp")) {
    return {
      time: "Time is based on number of DP states multiplied by transitions per state. For a 1D DP it is often O(n); for a 2D DP it is often O(n*m).",
      space: "Space equals the number of stored states. It can sometimes be optimized from O(n*m) to O(n) or O(1) if only recent states are needed.",
      interview: "I would say: I define the state first, count how many states exist, then count how much work each transition does.",
    };
  }
  if (p.includes("stack")) {
    return {
      time: "Time is usually O(n) because each item is pushed once and popped at most once. Even nested while loops remain linear when total pops are bounded.",
      space: "Space is O(n) in the worst case because the stack may store many unresolved items.",
      interview: "I would say: every element enters and leaves the stack at most once, so total operations are linear.",
    };
  }
  if (p.includes("sorting") || p.includes("sort")) {
    return {
      time: "Time is usually O(n log n) because comparison sorting dominates. Any later linear scan does not change the dominant term.",
      space: "Space depends on the sorting method. Built-in sorts or merge-based approaches may use O(n), while in-place sorts may use O(1) or O(log n) stack space.",
      interview: "I would say: sorting is the dominant cost, so the overall time is O(n log n), then I explain any extra storage used by the sort.",
    };
  }
  if (p.includes("union")) {
    return {
      time: "Union Find operations are almost constant with path compression and union by rank. Across many operations, the amortized time is near O(1), often written O(alpha(n)).",
      space: "Space is O(n) because parent and rank/size arrays store one entry for each node.",
      interview: "I would say: path compression flattens the structure, so repeated connectivity checks become extremely fast.",
    };
  }
  return {
    time:
      difficulty === "Hard"
        ? "Time depends on the dominant operation. Hard problems often combine sorting, heaps, DP, graph traversal, or binary search, so identify the repeated operation and count it carefully."
        : "Time is usually found by counting how many times the input is scanned and what each operation costs.",
    space: "Space is found by counting extra structures such as arrays, maps, sets, stacks, queues, heaps, recursion stack, and output storage.",
    interview: "I would say: I count the dominant repeated work for time, then separately count the extra memory structures for space.",
  };
}

const projects = [
  {
    title: "Undo/Redo Editor",
    data: "Stack",
    outcome: "A text editor history engine with undo stack and redo stack.",
    build: ["push every edit onto undo", "undo moves action to redo", "new edit clears redo"],
  },
  {
    title: "Task Scheduler",
    data: "Queue / Heap",
    outcome: "A job runner that executes tasks by arrival time or priority.",
    build: ["queue incoming jobs", "priority queue urgent tasks", "track waiting and completed states"],
  },
  {
    title: "File System Explorer",
    data: "Tree",
    outcome: "A nested folder browser with expand/collapse and recursive search.",
    build: ["folders as nodes", "DFS search", "breadcrumb path reconstruction"],
  },
  {
    title: "Navigation Map",
    data: "Graph",
    outcome: "A route planner with BFS for hops and Dijkstra for weighted roads.",
    build: ["locations as vertices", "roads as weighted edges", "shortest route visualizer"],
  },
  {
    title: "LRU Cache",
    data: "Hash Map + Linked List",
    outcome: "A fast cache with fixed capacity and automatic eviction.",
    build: ["map keys to nodes", "list stores recency", "move accessed item to front"],
  },
];

const flashcards = [
  ["What does O(log n) usually mean?", "The search space is repeatedly divided, often by half."],
  ["When should you use BFS?", "Level order traversal or shortest path in an unweighted graph."],
  ["What is the DP state?", "The variables that uniquely identify a subproblem."],
  ["Why use a monotonic stack?", "To keep candidates in useful order for next greater/smaller problems."],
  ["What makes a graph topological sort possible?", "The graph must be directed and acyclic."],
];

const storageKey = "dsa-mastery-state-v1";
const state = loadState();
let activeTopicId = state.activeTopicId || topics[0].id;
let activeAlgorithmId = state.activeAlgorithmId || algorithms[0].id;
let activeLanguage = state.activeLanguage || "python";
let activeTopicQuestionFilter = "All";
let activePracticeFilter = "All";
let activeFlashcard = 0;
let flashcardShowingAnswer = false;

function loadState() {
  try {
    return JSON.parse(localStorage.getItem(storageKey)) || {};
  } catch {
    return {};
  }
}

function saveState() {
  localStorage.setItem(storageKey, JSON.stringify(state));
}

function solvedSet() {
  return new Set(state.solvedProblems || []);
}

function setSolved(id, checked) {
  const solved = solvedSet();
  if (checked) solved.add(id);
  else solved.delete(id);
  state.solvedProblems = [...solved];
  saveState();
  renderDashboard();
  updateWeekly();
}

function toast(message) {
  const node = document.getElementById("toast");
  node.textContent = message;
  node.classList.add("show");
  window.setTimeout(() => node.classList.remove("show"), 1800);
}

function el(tag, className, content) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (content !== undefined) node.innerHTML = content;
  return node;
}

function renderNav() {
  const nav = document.getElementById("navList");
  nav.innerHTML = navItems
    .map(([id, icon, label]) => `<a class="nav-link" href="#${id}" data-nav="${id}"><span class="nav-icon">${icon}</span>${label}</a>`)
    .join("");
}

function activatePage(id) {
  const target = navItems.some(([pageId]) => pageId === id) ? id : "home";
  document.querySelectorAll(".page").forEach((page) => page.classList.toggle("active", page.id === target));
  document.querySelectorAll(".nav-link").forEach((link) => link.classList.toggle("active", link.dataset.nav === target));
  document.querySelector(".sidebar").classList.remove("open");
}

function renderHome() {
  document.getElementById("home").innerHTML = `
    <div class="hero">
      <div class="hero-copy">
        <p class="eyebrow">Your DSA Growth Lab</p>
        <h1>Become the kind of problem solver interviews remember.</h1>
        <p class="lead">Start small, understand deeply, and build confidence one pattern at a time. This platform turns DSA into a guided journey with intuition, code, practice, projects, and progress you can actually see.</p>
        <div class="hero-actions">
          <a class="pill-button primary" href="#topics">Start Learning</a>
          <a class="pill-button" href="#algorithms">Explore Algorithms</a>
          <a class="pill-button" href="#dashboard">Track Wins</a>
        </div>
        <div class="motivation-strip" aria-label="Learning highlights">
          <span><strong>450</strong> topic questions</span>
          <span><strong>15</strong> core algorithms</span>
          <span><strong>12</strong> week roadmap</span>
        </div>
      </div>
      <div class="hero-board" aria-label="Animated graph learning visual">
        <div class="board-grid"></div>
        <span class="edge" style="left: 21%; top: 30%; width: 185px; transform: rotate(22deg)"></span>
        <span class="edge" style="left: 46%; top: 42%; width: 170px; transform: rotate(122deg)"></span>
        <span class="edge" style="left: 28%; top: 67%; width: 205px; transform: rotate(-18deg)"></span>
        <span class="node" style="left: 12%; top: 18%">Array</span>
        <span class="node" style="right: 16%; top: 30%">Graph</span>
        <span class="node" style="left: 22%; bottom: 14%">DP</span>
        <span class="node" style="right: 12%; bottom: 17%">Tree</span>
      </div>
    </div>
    <section class="section">
      <div class="section-head">
        <div>
          <p class="eyebrow">Learning Experience</p>
          <h2>Everything has a purpose: understand, code, practice, revise.</h2>
        </div>
      </div>
      <div class="grid three">
        ${[
          ["Learn with intuition", "Every topic begins with simple mental models before moving into code."],
          ["Practice with direction", "Problems are grouped by pattern and difficulty so practice feels focused, not random."],
          ["Build real projects", "Use stacks, queues, trees, graphs, and caches in realistic mini-systems."],
          ["Prepare for interviews", "Algorithms include practical interview questions and model answers."],
          ["Revise smarter", "Flashcards and compact notes help you remember what matters."],
          ["See progress", "Solved count, topic skill, weekly goals, and streaks keep momentum visible."],
        ]
          .map(([title, text]) => `<article class="card"><h3>${title}</h3><p>${text}</p></article>`)
          .join("")}
      </div>
    </section>
    <section class="section">
      <div class="section-head">
        <div>
          <p class="eyebrow">Learning Roadmap</p>
          <h2>Beginner -> Intermediate -> Advanced</h2>
        </div>
      </div>
      <div class="roadmap">
        ${roadmap
          .map(
            (level) => `<article class="card roadmap-level">
              <h3>${level.level}</h3>
              <p>${level.goal}</p>
              ${level.weeks
                .map(([num, text]) => `<div class="week"><span class="week-num">W${num}</span><strong>${text}</strong></div>`)
                .join("")}
            </article>`,
          )
          .join("")}
      </div>
    </section>
    <section class="section">
      <div class="section-head">
        <div>
          <p class="eyebrow">Tech Stack Suggestions</p>
          <h2>Start static, grow into a full platform</h2>
        </div>
      </div>
      <table class="resource-table">
        <thead><tr><th>Layer</th><th>MVP</th><th>Advanced Version</th></tr></thead>
        <tbody>
          <tr><td>Frontend</td><td>This static HTML/CSS/JS app or React + Vite</td><td>Next.js with route-based topic pages and MDX notes</td></tr>
          <tr><td>Backend</td><td>LocalStorage for progress</td><td>Node.js/Express or Firebase Auth + Cloud Functions</td></tr>
          <tr><td>Database</td><td>JSON content files</td><td>MongoDB or Firestore for users, progress, notes, attempts</td></tr>
          <tr><td>Code Judge</td><td>Copy code snippets and run locally</td><td>Judge0, Sphere Engine, or custom Docker sandbox</td></tr>
        </tbody>
      </table>
    </section>
  `;
}

function renderTopics() {
  const page = document.getElementById("topics");
  page.innerHTML = `
    <p class="eyebrow">Topic Mastery</p>
    <h1 class="page-title">Choose one topic. Understand it so well that problems stop feeling mysterious.</h1>
    <p class="lead">Each topic gives you intuition, implementation, common traps, cheatsheets, and 50 interview-style questions with explanations and code.</p>
    <div class="section topic-picker-wrap" id="topicList"></div>
    <div class="section topic-layout">
      <div class="topic-detail" id="topicDetail"></div>
    </div>
  `;
  renderTopicList();
  renderTopicDetail();
}

function renderTopicList() {
  const list = document.getElementById("topicList");
  if (!list) return;
  const active = topics.find((topic) => topic.id === activeTopicId) || topics[0];
  list.innerHTML = `
    <article class="card topic-picker">
      <label for="topicSelect">
        <span class="eyebrow">Choose Topic</span>
        <strong>${active.name}</strong>
        <small>Level: ${active.level} | Prerequisites: ${active.prerequisites}</small>
      </label>
      <select id="topicSelect" aria-label="Choose DSA topic">
        ${topics.map((topic) => `<option value="${topic.id}" ${topic.id === activeTopicId ? "selected" : ""}>${topic.name}</option>`).join("")}
      </select>
    </article>
  `;
  list.querySelector("#topicSelect").addEventListener("change", (event) => {
    activeTopicId = event.target.value;
    activeTopicQuestionFilter = "All";
    state.activeTopicId = activeTopicId;
    saveState();
    renderTopicList();
    renderTopicDetail();
  });
}

function diagram(type) {
  if (type === "array") {
    return `<div class="array-vis">${[3, 8, 12, 19, 24].map((n, i) => `<span class="cell">${n}<small>${i}</small></span>`).join("")}</div>`;
  }
  if (type === "linked") {
    return `<div class="array-vis">${["A", "->", "B", "->", "C", "->", "null"].map((n) => `<span class="cell">${n}</span>`).join("")}</div>`;
  }
  if (type === "stack") {
    return `<div class="stack-vis" style="flex-direction:column-reverse">${["call 1", "call 2", "call 3"].map((n) => `<span class="cell" style="width:150px">${n}</span>`).join("")}</div>`;
  }
  if (type === "tree" || type === "heap") {
    return `<div class="tree-vis"><span class="tree-node root">8</span><span class="tree-node child">3</span><span class="tree-node child">10</span><span class="tree-node child">1</span><span class="tree-node child">6</span></div>`;
  }
  if (type === "graph") {
    return `<div class="graph-vis">
      <span class="graph-line" style="left:70px;top:50px;width:120px;transform:rotate(19deg)"></span>
      <span class="graph-line" style="left:190px;top:92px;width:118px;transform:rotate(-32deg)"></span>
      <span class="graph-line" style="left:90px;top:130px;width:170px;transform:rotate(-9deg)"></span>
      <span class="graph-node" style="left:36px;top:28px">A</span>
      <span class="graph-node" style="left:180px;top:70px">B</span>
      <span class="graph-node" style="left:300px;top:20px">C</span>
      <span class="graph-node" style="left:88px;top:118px">D</span>
    </div>`;
  }
  if (type === "hash") {
    return `<div class="hash-vis">${["key", "hash", "bucket", "value"].map((n) => `<span class="cell" style="width:86px">${n}</span>`).join("")}</div>`;
  }
  return `<div class="dp-vis">${["state", "base", "transition", "answer"].map((n) => `<span class="cell" style="width:104px">${n}</span>`).join("")}</div>`;
}

function renderTopicDetail() {
  const detail = document.getElementById("topicDetail");
  if (!detail) return;
  const topic = topics.find((item) => item.id === activeTopicId) || topics[0];
  const code = topic.code[activeLanguage];
  const topicQuestions = buildTopicQuestions(topic);
  detail.innerHTML = `
    <article class="card">
      <p class="eyebrow">${topic.level}</p>
      <h2>${topic.name}</h2>
      <p class="muted">${topic.explanation}</p>
      <div class="tag-row">
        <span class="tag">Prerequisites: ${topic.prerequisites}</span>
        <span class="tag">Interview Core</span>
        <span class="tag">Project Useful</span>
      </div>
    </article>
    <div class="grid two">
      <article class="card">
        <h3>Visual Intuition</h3>
        <p>${topic.intuition}</p>
        <div class="diagram">${diagram(topic.visual)}</div>
      </article>
      <article class="card">
        <h3>Real-Life Analogy</h3>
        <p>${topic.analogy}</p>
        <h3>Time & Space</h3>
        <ul>${topic.complexities.map((item) => `<li>${item}</li>`).join("")}</ul>
      </article>
    </div>
    <article class="card">
      <div class="section-head">
        <div><h3>Code Implementation</h3><p class="muted">Switch languages and copy the snippet.</p></div>
        <div class="tabs">
          ${["cpp", "java", "python"].map((lang) => `<button class="tab-button ${lang === activeLanguage ? "active" : ""}" data-lang="${lang}" type="button">${lang.toUpperCase()}</button>`).join("")}
        </div>
      </div>
      <div class="code-panel">
        <div class="code-head"><span>${topic.name} | ${activeLanguage.toUpperCase()}</span><button class="copy-button" type="button" data-copy>Copy</button></div>
        <pre><code>${escapeHtml(code)}</code></pre>
      </div>
    </article>
    <div class="grid two">
      <article class="card">
        <h3>Common Mistakes</h3>
        <ul>${topic.mistakes.map((item) => `<li>${item}</li>`).join("")}</ul>
      </article>
      <article class="card">
        <h3>Cheatsheet Summary</h3>
        <ul>${topic.cheatsheet.map((item) => `<li>${item}</li>`).join("")}</ul>
      </article>
    </div>
    <article class="card">
      <div class="section-head">
        <div>
          <h3>50 Interview Questions for ${topic.name}</h3>
          <p class="muted">Balanced as 18 Easy, 20 Medium, and 12 Hard questions. Open any item for a deep solution plan.</p>
        </div>
        <div class="tabs" id="topicQuestionFilters">
          ${["All", "Easy", "Medium", "Hard"].map((level) => `<button class="filter-button ${level === activeTopicQuestionFilter ? "active" : ""}" data-topic-question-filter="${level}" type="button">${level}</button>`).join("")}
        </div>
      </div>
      <div class="problem-list" id="topicQuestionList">
        ${renderTopicQuestions(topicQuestions)}
      </div>
    </article>
  `;
  detail.querySelectorAll("[data-lang]").forEach((button) => {
    button.addEventListener("click", () => {
      activeLanguage = button.dataset.lang;
      state.activeLanguage = activeLanguage;
      saveState();
      renderTopicDetail();
    });
  });
  detail.querySelector("[data-copy]").addEventListener("click", async () => {
    await navigator.clipboard.writeText(code);
    toast("Code copied");
  });
  detail.querySelectorAll("[data-topic-question-filter]").forEach((button) => {
    button.addEventListener("click", () => {
      activeTopicQuestionFilter = button.dataset.topicQuestionFilter;
      renderTopicDetail();
    });
  });
  bindQuestionCopyButtons(detail);
}

function renderTopicQuestions(questions) {
  const activeTopic = topics.find((topic) => topic.id === activeTopicId) || topics[0];
  const filtered = questions.filter((question) => activeTopicQuestionFilter === "All" || question.difficulty === activeTopicQuestionFilter);
  return filtered
    .map(
      (question, index) => {
        const solutionCode = makeQuestionSolutionCode(question);
        const problem = makeLeetCodeProblem(question, activeTopic);
        return `<details class="card topic-question" ${index === 0 ? "open" : ""}>
        <summary>
          <span class="difficulty ${question.difficulty}">${question.difficulty}</span>
          <strong>${question.title}</strong>
          <span class="tag">${question.pattern}</span>
        </summary>
        <div class="details-body">
          <section class="leetcode-prompt">
            <p class="eyebrow">Problem Statement</p>
            <h4>${problem.title}</h4>
            <p>${problem.statement}</p>
            <div class="grid two">
              <div>
                <h5>Example</h5>
                <pre class="plain-example">${problem.example}</pre>
              </div>
              <div>
                <h5>Constraints</h5>
                <ul>${problem.constraints.map((item) => `<li>${item}</li>`).join("")}</ul>
              </div>
            </div>
            <div class="think-box">
              <strong>Try before opening solution:</strong>
              <span>${problem.thinkFirst}</span>
            </div>
          </section>

          <details class="solution-panel">
            <summary>Show solution explanation and code</summary>
            <div class="solution-body">
              <p><strong>Core idea:</strong> ${question.explanation.idea}</p>
              <p><strong>Step-by-step solution:</strong></p>
              <ol>${question.explanation.steps.map((step) => `<li>${step}</li>`).join("")}</ol>
              <p><strong>Complete reference code:</strong></p>
              <div class="code-panel compact-code">
                <div class="code-head"><span>Python reference solution</span><button class="copy-button" type="button" data-copy-question="${question.id}">Copy</button></div>
                <pre><code>${escapeHtml(solutionCode)}</code></pre>
              </div>
              <p><strong>Complexity:</strong> ${question.explanation.complexity}</p>
              <div class="complexity-explain">
                <p><strong>Why time is this:</strong> ${question.explanation.timeReason}</p>
                <p><strong>Why space is this:</strong> ${question.explanation.spaceReason}</p>
                <p><strong>How to explain in interview:</strong> ${question.explanation.complexityInterview}</p>
              </div>
              <p><strong>Interview explanation:</strong> ${question.explanation.educatorNote}</p>
            </div>
          </details>
        </div>
      </details>`;
      },
    )
    .join("");
}

function makeLeetCodeProblem(question, topic) {
  const constraintsByDifficulty = {
    Easy: ["1 <= n <= 10^4", "Input values may contain duplicates unless stated otherwise.", "Aim for a clear O(n) or O(n log n) solution."],
    Medium: ["1 <= n <= 10^5", "Design for edge cases such as empty input, duplicates, and already-sorted data.", "Brute force may pass small cases but should be optimized."],
    Hard: ["1 <= n <= 2 * 10^5", "Multiple edge cases may appear together.", "Expected solution should use the stated pattern efficiently."],
  };
  const action = inferProblemAction(question.title);
  return {
    title: question.title,
    statement: `Given input related to ${topic.name.toLowerCase()}, ${action}. Your task is to solve the problem using the ${question.pattern} pattern. Return the required result in the format shown by the example. Focus on correctness first, then optimize for the expected complexity.`,
    example: question.example.replace(" -> ", "\nOutput: ").replace("Input: ", "Input: "),
    constraints: constraintsByDifficulty[question.difficulty] || constraintsByDifficulty.Medium,
    thinkFirst: `Before seeing the solution, ask: what state should I track, when should that state change, and what edge case could break a simple brute-force approach?`,
  };
}

function inferProblemAction(title) {
  const lower = title.toLowerCase();
  if (lower.includes("find")) return "find the requested value, index, path, group, or optimized answer";
  if (lower.includes("count")) return "count how many valid items, states, pairs, paths, or configurations exist";
  if (lower.includes("check") || lower.includes("valid") || lower.includes("detect")) return "determine whether the required condition is true or false";
  if (lower.includes("merge")) return "merge the given structures while preserving the required order or invariant";
  if (lower.includes("sort")) return "rearrange the data into the required order";
  if (lower.includes("reverse")) return "reverse the required part of the structure without losing data";
  if (lower.includes("design") || lower.includes("implement")) return "design the required operations so each command returns the correct result";
  if (lower.includes("maximum") || lower.includes("minimum") || lower.includes("longest") || lower.includes("shortest")) {
    return "compute the optimal answer requested by the problem";
  }
  return "compute and return the result requested by the problem";
}

function renderAlgorithms() {
  const page = document.getElementById("algorithms");
  const algorithm = algorithms.find((item) => item.id === activeAlgorithmId) || algorithms[0];
  page.innerHTML = `
    <p class="eyebrow">Algorithm Playbook</p>
    <h1 class="page-title">Learn the algorithms that quietly power real software.</h1>
    <p class="lead">Pick an algorithm, understand the story behind it, read the production-minded code, then practice how to explain it in interviews.</p>

    <section class="section algorithm-picker-wrap">
      <article class="card topic-picker">
        <label for="algorithmSelect">
          <span class="eyebrow">Choose Algorithm</span>
          <strong>${algorithm.name}</strong>
          <small>${algorithm.group} | ${algorithm.importance}</small>
        </label>
        <select id="algorithmSelect" aria-label="Choose algorithm">
          ${algorithms.map((item) => `<option value="${item.id}" ${item.id === activeAlgorithmId ? "selected" : ""}>${item.name}</option>`).join("")}
        </select>
      </article>
    </section>

    <section class="section algorithm-detail">
      ${renderAlgorithmDetail(algorithm)}
    </section>
  `;

  page.querySelector("#algorithmSelect").addEventListener("change", (event) => {
    activeAlgorithmId = event.target.value;
    state.activeAlgorithmId = activeAlgorithmId;
    saveState();
    renderAlgorithms();
  });

  page.querySelector("[data-copy-algorithm]").addEventListener("click", async () => {
    await navigator.clipboard.writeText(algorithm.code);
    toast("Algorithm code copied");
  });
}

function renderComplexity() {
  const growthRows = [
    ["O(1)", "Constant", "Same effort no matter input size", "Reading arr[5]", "8%"],
    ["O(log n)", "Logarithmic", "Cuts the problem down again and again", "Binary search", "18%"],
    ["O(n)", "Linear", "Touches each item once", "Find max in array", "34%"],
    ["O(n log n)", "Linearithmic", "Efficient sorting level", "Merge sort", "52%"],
    ["O(n^2)", "Quadratic", "Nested comparison of pairs", "Bubble sort, all pairs", "74%"],
    ["O(2^n)", "Exponential", "Branches double with each choice", "Subsets/backtracking", "92%"],
    ["O(n!)", "Factorial", "Tries every ordering", "All permutations", "100%"],
  ];
  const inputRows = [
    ["10", "1", "3", "10", "33", "100", "1,024", "3,628,800"],
    ["100", "1", "7", "100", "664", "10,000", "huge", "impossible"],
    ["1,000", "1", "10", "1,000", "9,966", "1,000,000", "impossible", "impossible"],
    ["100,000", "1", "17", "100,000", "1,660,964", "10,000,000,000", "impossible", "impossible"],
  ];

  document.getElementById("complexity").innerHTML = `
    <p class="eyebrow">Complexity Visual Guide</p>
    <h1 class="page-title">Understand Big O like a map of how your code grows.</h1>
    <p class="lead">Complexity is not about exact seconds. It explains how fast work and memory grow when the input becomes bigger. Once you can see that growth, choosing the right DSA pattern becomes much easier.</p>

    <section class="section complexity-hero-grid">
      <article class="card complexity-story">
        <p class="eyebrow">Simple Intuition</p>
        <h2>Big O answers one question: what happens when input grows?</h2>
        <p>If you have 10 books, checking every book is fine. If you have 10 million books, checking every book may be slow. Big O helps you predict this before your program struggles.</p>
        <div class="complexity-analogy">
          <span>Small input</span>
          <strong>works anyway</strong>
          <span>Large input</span>
          <strong>needs smart logic</strong>
        </div>
      </article>
      <article class="card">
        <h3>Interview Rule</h3>
        <p class="muted">Always explain complexity by counting the dominant work.</p>
        <ol class="deep-list">
          <li>Find loops, recursion, and data structure operations.</li>
          <li>Count how many times the main work runs as n grows.</li>
          <li>Drop constants like 2n -> O(n).</li>
          <li>Keep the fastest-growing term like n^2 + n -> O(n^2).</li>
          <li>Explain extra memory separately as space complexity.</li>
        </ol>
      </article>
    </section>

    <section class="section card">
      <div class="section-head">
        <div>
          <p class="eyebrow">Growth Visualization</p>
          <h2>Same input, very different effort</h2>
        </div>
      </div>
      <div class="growth-chart" aria-label="Big O growth chart">
        ${growthRows
          .map(
            ([notation, name, meaning, example, width]) => `<div class="growth-row">
              <div>
                <strong>${notation}</strong>
                <span>${name}</span>
              </div>
              <div class="growth-track"><span style="width:${width}"></span></div>
              <p>${meaning}</p>
              <small>${example}</small>
            </div>`,
          )
          .join("")}
      </div>
    </section>

    <section class="section">
      <div class="section-head">
        <div>
          <p class="eyebrow">Comparison Table</p>
          <h2>What the computer roughly faces as n grows</h2>
        </div>
      </div>
      <table class="resource-table complexity-table">
        <thead>
          <tr><th>n</th><th>O(1)</th><th>O(log n)</th><th>O(n)</th><th>O(n log n)</th><th>O(n^2)</th><th>O(2^n)</th><th>O(n!)</th></tr>
        </thead>
        <tbody>
          ${inputRows.map((row) => `<tr>${row.map((cell) => `<td>${cell}</td>`).join("")}</tr>`).join("")}
        </tbody>
      </table>
    </section>

    <section class="section grid three">
      ${[
        ["O(1)", "Array access, hash lookup average", "The number of steps stays almost the same even if n grows."],
        ["O(log n)", "Binary search, heap height", "Every step removes a large part of the remaining work."],
        ["O(n)", "One loop over input", "If input doubles, work roughly doubles."],
        ["O(n log n)", "Merge sort, heap sort", "Usually acceptable for sorting large input."],
        ["O(n^2)", "Nested loops over same input", "If input doubles, work becomes about four times bigger."],
        ["O(2^n)", "Subsets, brute-force choices", "Each item creates branching choices, so growth explodes quickly."],
      ]
        .map(
          ([title, example, text]) => `<article class="card complexity-card">
            <p class="eyebrow">${title}</p>
            <h3>${example}</h3>
            <p>${text}</p>
          </article>`,
        )
        .join("")}
    </section>

    <section class="section grid two">
      <article class="card">
        <h3>Time Complexity Example</h3>
        <div class="code-panel compact-code">
          <div class="code-head"><span>O(n) because the loop runs once per item</span></div>
          <pre><code>${escapeHtml(`def find_max(nums):
    best = nums[0]
    for value in nums:
        if value > best:
            best = value
    return best`)}</code></pre>
        </div>
        <p class="muted">If there are 1,000 numbers, the loop checks about 1,000 values. If there are 1,000,000 numbers, it checks about 1,000,000 values.</p>
      </article>
      <article class="card">
        <h3>Space Complexity Example</h3>
        <div class="code-panel compact-code">
          <div class="code-head"><span>O(n) space because the set can store n values</span></div>
          <pre><code>${escapeHtml(`def has_duplicate(nums):
    seen = set()
    for value in nums:
        if value in seen:
            return True
        seen.add(value)
    return False`)}</code></pre>
        </div>
        <p class="muted">The code is fast because lookup is quick, but it spends extra memory to remember values already seen.</p>
      </article>
    </section>

    <section class="section card">
      <h3>How to Speak Complexity in Interviews</h3>
      <div class="interview-qa-list">
        ${[
          ["Single loop", "This is O(n) time because each element is visited once. Space is O(1) if I only keep a few variables."],
          ["Nested loop", "This is O(n^2) time because for each item I may compare against every other item."],
          ["Sorting first", "Sorting costs O(n log n). The later linear scan is O(n), so total time is O(n log n)."],
          ["Hash map", "The hash map gives average O(1) lookup, so the full scan is O(n) time and O(n) space."],
          ["Recursion", "I count the number of recursive states and the work per state. For DP, states times transitions gives the time."],
        ]
          .map(
            ([title, answer]) => `<details class="interview-qa" open>
              <summary><strong>${title}</strong><span class="tag">Model Answer</span></summary>
              <div class="details-body">${answer}</div>
            </details>`,
          )
          .join("")}
      </div>
    </section>
  `;
}

function renderAlgorithmDetail(algorithm) {
  const complexityDetails = getAlgorithmComplexityDetails(algorithm);
  return `
    <article class="card algorithm-hero">
      <div>
        <p class="eyebrow">${algorithm.group}</p>
        <h2>${algorithm.name}</h2>
        <p class="muted">${algorithm.importance}</p>
      </div>
      <span class="tag">Interview Essential</span>
    </article>

    <div class="grid two algorithm-concepts">
      <article class="card concept-card simple">
        <p class="eyebrow">Start Here</p>
        <h3>Simple Intuition</h3>
        <p>${algorithm.childConcept}</p>
      </article>
      <article class="card concept-card technical">
        <p class="eyebrow">Core Idea</p>
        <h3>Technical View</h3>
        <p>${algorithm.concept}</p>
      </article>
    </div>

    <article class="card">
      <h3>Where This Is Used in Industry</h3>
      <div class="tag-row">
        ${algorithm.industryUse.map((item) => `<span class="tag">${item}</span>`).join("")}
      </div>
    </article>

    <article class="card">
      <div class="section-head">
        <div>
          <h3>Proper Code</h3>
          <p class="muted">Python reference implementation written for interview clarity.</p>
        </div>
        <button class="copy-button" type="button" data-copy-algorithm>Copy</button>
      </div>
      <div class="code-panel">
        <div class="code-head"><span>${algorithm.name} | Python</span></div>
        <pre><code>${escapeHtml(algorithm.code)}</code></pre>
      </div>
    </article>

    <article class="card">
      <h3>Code Explanation Step by Step</h3>
      <ol class="deep-list">
        ${algorithm.walkthrough.map((step) => `<li>${step}</li>`).join("")}
      </ol>
    </article>

    <div class="grid two">
      <article class="card">
        <h3>Complexity</h3>
        <p><strong>${algorithm.complexity}</strong></p>
        <div class="complexity-explain">
          <p><strong>Why time is this:</strong> ${complexityDetails.time}</p>
          <p><strong>Why space is this:</strong> ${complexityDetails.space}</p>
          <p><strong>How to say it in an interview:</strong> ${complexityDetails.interview}</p>
        </div>
      </article>
      <article class="card">
        <h3>Common Mistakes</h3>
        <div class="mistake-list">
          ${renderAlgorithmMistakes(algorithm)}
        </div>
      </article>
    </div>

    <article class="card">
      <h3>How to Explain This in an Interview</h3>
      <div class="interview-explain-steps">
        ${renderInterviewExplanationSteps(algorithm)}
      </div>
    </article>

    <article class="card">
      <h3>Interview Questions Asked on ${algorithm.name}</h3>
      <p class="muted">These are the common styles of questions interviewers ask, plus practical answers you can model.</p>
      <div class="interview-qa-list">
        ${renderAlgorithmInterviewQuestions(algorithm)}
      </div>
    </article>
  `;
}

function renderInterviewExplanationSteps(algorithm) {
  const steps = [
    {
      title: "1. State the goal in one sentence",
      why: "This tells the interviewer that you understand the problem before jumping into code.",
      say: `For ${algorithm.name}, the goal is to produce the correct result by using this idea: ${algorithm.concept}`,
    },
    {
      title: "2. Name the key idea that makes it efficient",
      why: "Interviewers want to hear the reason your solution is better than brute force.",
      say: `The efficient part is that I use the main invariant/data movement of ${algorithm.name}, so I avoid repeating unnecessary work.`,
    },
    {
      title: "3. Walk through a tiny example",
      why: "A small example catches edge cases and proves you can reason, not just memorize code.",
      say: "I would take a very small input, update the important variables step by step, and show exactly when the answer changes.",
    },
    {
      title: "4. Code around the invariant",
      why: "Clean code follows the algorithm's rule. If the invariant is clear, the code becomes easier to debug.",
      say: "I will keep the key state updated after every step, and I will only discard data when the invariant proves it is safe.",
    },
    {
      title: "5. Finish with complexity and edge cases",
      why: "This shows senior-level completeness: correctness, performance, and reliability.",
      say: `The complexity is ${algorithm.complexity}. I would also test empty input, one item, duplicates, and the worst-shaped input for this algorithm.`,
    },
  ];

  return steps
    .map(
      (step) => `<article class="interview-step">
        <h4>${step.title}</h4>
        <p><strong>Why:</strong> ${step.why}</p>
        <p><strong>Say:</strong> ${step.say}</p>
      </article>`,
    )
    .join("");
}

function renderAlgorithmMistakes(algorithm) {
  return algorithm.pitfalls
    .map((pitfall) => {
      const detail = getMistakeExplanation(algorithm, pitfall);
      return `<details class="mistake-card" open>
        <summary><strong>${pitfall}</strong></summary>
        <div class="details-body">
          <p><strong>Why it happens:</strong> ${detail.why}</p>
          <p><strong>How to avoid it:</strong> ${detail.avoid}</p>
        </div>
      </details>`;
    })
    .join("");
}

function getMistakeExplanation(algorithm, pitfall) {
  const key = `${algorithm.id}|${pitfall}`;
  const explanations = {
    "merge-sort|Forgetting the base case": {
      why:
        "Merge sort is recursive. If you do not stop when the array has zero or one element, the function keeps splitting forever or until the program crashes with a recursion error.",
      avoid:
        "Always write the base case first: if len(nums) <= 1, return nums. Then mentally test with [], [5], and [2,1] before moving to bigger input.",
    },
    "merge-sort|Using too much slicing in memory-constrained code": {
      why:
        "In Python, nums[:mid] and nums[mid:] create new arrays. That is easy to read, but for large inputs it repeatedly copies data and increases memory pressure.",
      avoid:
        "For interviews, mention the clean slicing version first, then say that production or memory-sensitive code can pass left/right indexes and reuse a temporary buffer.",
    },
    "merge-sort|Incorrect merge pointer movement": {
      why:
        "The merge step has two pointers. If you append an item but forget to move that side's pointer, the loop can repeat the same value forever or produce duplicates.",
      avoid:
        "After appending from left, increment i. After appending from right, increment j. Finally append the leftover tail from whichever side still has elements.",
    },
  };

  if (explanations[key]) return explanations[key];

  if (pitfall.toLowerCase().includes("base case")) {
    return {
      why: "Recursive algorithms need a stopping condition. Without it, each call creates another call and never reaches a final answer.",
      avoid: "Write and test the smallest inputs first. For recursion, ask: what input can I answer immediately without more recursion?",
    };
  }
  if (pitfall.toLowerCase().includes("pointer")) {
    return {
      why: "Pointer algorithms depend on moving indexes in the correct direction. A single wrong move can skip valid answers or create an infinite loop.",
      avoid: "State the pointer rule before coding. After every branch, confirm which pointer moves and why that move safely discards part of the search space.",
    };
  }
  if (pitfall.toLowerCase().includes("visited") || pitfall.toLowerCase().includes("cycle")) {
    return {
      why: "Graphs and recursive searches can revisit the same node through another path. Without proper state tracking, the algorithm may loop or double-count.",
      avoid: "Mark nodes as soon as they enter the queue/recursion path, and use the right state model: visited for undirected/simple traversal, visiting/visited for directed cycle detection.",
    };
  }
  if (pitfall.toLowerCase().includes("negative")) {
    return {
      why: "Some algorithms rely on a mathematical assumption. Dijkstra assumes once a shortest node is chosen, no later edge can make it cheaper. Negative weights break that.",
      avoid: "Before choosing an algorithm, check constraints. If weights can be negative, consider Bellman-Ford or another algorithm designed for that case.",
    };
  }
  if (pitfall.toLowerCase().includes("sorted") || pitfall.toLowerCase().includes("sort")) {
    return {
      why: "Several algorithms only work because order gives useful information. If the data is not sorted, pointer movement or binary decisions may discard the correct answer.",
      avoid: "Ask whether input is already sorted. If not, either sort first and include O(n log n) in complexity, or choose a hash/map-based approach.",
    };
  }
  if (pitfall.toLowerCase().includes("space") || pitfall.toLowerCase().includes("memory")) {
    return {
      why: "A solution can be time-efficient but still create large helper arrays, maps, recursion stacks, or copied slices.",
      avoid: "Always analyze extra memory separately. If memory matters, prefer indexes, in-place updates, streaming, or reusable buffers where possible.",
    };
  }
  if (pitfall.toLowerCase().includes("stable")) {
    return {
      why: "A stable sort preserves the relative order of equal elements. Some sorting algorithms do not guarantee that, which can break multi-key sorting.",
      avoid: "If equal-item order matters, choose a stable algorithm such as merge sort or the language's stable built-in sort.",
    };
  }
  if (pitfall.toLowerCase().includes("direction")) {
    return {
      why: "Many graph and DP problems change meaning when an edge or loop direction is reversed.",
      avoid: "Write a tiny example and label what each arrow means. For DP, say whether the loop allows reuse or prevents reuse.",
    };
  }

  return {
    why:
      "This mistake usually happens when the code is memorized without naming the invariant. The implementation may look close, but one condition breaks the algorithm's guarantee.",
    avoid:
      "Before coding, write the invariant in plain English. During testing, use the smallest input, duplicates, empty input, and one worst-case example.",
  };
}

function getAlgorithmComplexityDetails(algorithm) {
  const details = {
    "binary-search": {
      time: "Each comparison removes about half of the remaining search area. If n is 100, one step leaves about 50, then 25, then 12, and so on. The number of halvings is log n, so time is O(log n).",
      space: "The iterative version only stores left, right, and mid variables. It does not create another array, so space is O(1).",
      interview: "Because the array is sorted, every middle check lets me discard half the search space. That gives O(log n) time and O(1) extra space.",
    },
    "merge-sort": {
      time: "The array is split into halves until single elements remain, creating about log n levels. At each level, merging touches all n elements once. n work per level times log n levels gives O(n log n).",
      space: "Merging creates temporary arrays/results that together hold up to n elements at a level, so auxiliary space is O(n).",
      interview: "Merge sort has log n split levels, and each level performs n total merge work, so time is O(n log n). The merge buffer needs O(n) extra space.",
    },
    "quick-sort": {
      time: "On average, partitioning splits the array into reasonably balanced parts. Each level partitions n elements total, and there are about log n levels, giving O(n log n). In the worst case, bad pivots create n levels, giving O(n^2).",
      space: "Quick sort sorts in place, but recursion uses stack frames. Balanced recursion uses O(log n) stack space on average.",
      interview: "Partition is linear per level. With balanced pivots there are log n levels, so average time is O(n log n). Worst case is O(n^2) when pivots are consistently poor.",
    },
    bfs: {
      time: "BFS visits every vertex once and checks every edge from adjacency lists once. That is why the total time is O(V + E).",
      space: "The queue and visited set can hold many vertices, especially a full level of the graph, so space is O(V).",
      interview: "Every node is enqueued once and every edge is inspected once, so BFS is O(V + E) time with O(V) space for queue and visited.",
    },
    dfs: {
      time: "DFS visits each vertex once and scans each edge from the adjacency list. Total work is vertices plus edges, O(V + E).",
      space: "The visited set stores up to V nodes. The recursion stack can also grow up to V in a long chain, so space is O(V).",
      interview: "DFS marks each node once and explores each edge once, so time is O(V + E). Space is O(V) for visited and recursion depth.",
    },
    dijkstra: {
      time: "Each heap push or pop costs log V. Edges can cause heap updates, so across vertices and edges the common complexity is O((V + E) log V).",
      space: "The graph stores edges, the distance map stores vertices, and the heap can hold pending entries, so space is O(V + E).",
      interview: "The min heap makes each shortest-distance choice efficient. Relaxing edges causes heap operations, so time is O((V + E) log V), with O(V + E) space.",
    },
    "topological-sort": {
      time: "Building indegrees scans all edges. The queue processes every vertex once, and each edge reduces indegree once. That totals O(V + E).",
      space: "The adjacency list, indegree map, queue, and output order store vertices and edges, so space is O(V + E).",
      interview: "I process every node once and every dependency edge once, so topological sort is O(V + E) time and O(V + E) space.",
    },
    "union-find": {
      time: "Path compression and union by rank make trees almost flat. Each find/union is nearly constant in practice, written as O(alpha(n)), where alpha grows so slowly it is less than 5 for realistic inputs.",
      space: "The parent and rank arrays store one entry per item, so space is O(n).",
      interview: "With path compression and rank, each operation is amortized almost O(1), formally O(alpha(n)). Space is O(n) for parent and rank.",
    },
    kadane: {
      time: "Kadane scans the array once. For each value it performs constant work: choose extend or restart, then update best. One pass gives O(n).",
      space: "It only keeps two variables, current best ending here and global best, so extra space is O(1).",
      interview: "Each element is processed once with constant work, so time is O(n). I only store two running values, so space is O(1).",
    },
    "sliding-window": {
      time: "The right pointer moves from start to end once. The left pointer also only moves forward, never backward. Since each character enters and leaves the window at most once, time is O(n).",
      space: "The map stores characters currently seen. If k is the character set size, space is O(k), or O(n) in the most general case.",
      interview: "Both pointers move forward at most n times total, so the scan is O(n). The hashmap stores last seen characters, so space is O(k).",
    },
    kmp: {
      time: "Building the LPS table takes O(m) for pattern length m. Searching text moves pointers forward without rechecking characters unnecessarily, so scan is O(n). Total is O(n + m).",
      space: "The LPS array stores one integer per pattern character, so space is O(m).",
      interview: "KMP preprocesses the pattern in O(m), then scans the text in O(n) using LPS jumps. Total time is O(n + m), space O(m).",
    },
    knapsack: {
      time: "For each of n items, the algorithm considers capacities from capacity down to item weight. That creates n times capacity states, so time is O(n * capacity).",
      space: "The optimized DP uses one array of size capacity + 1 instead of a full 2D table, so space is O(capacity).",
      interview: "The DP state is capacity for each processed item. I process n items across all capacities, so time is O(n * capacity), space O(capacity).",
    },
    backtracking: {
      time: "For subsets, each item creates two choices: take or skip. That produces 2^n possible subsets, so time is O(2^n), not counting output-copy cost details.",
      space: "The recursion path can contain up to n items, so recursion depth is O(n), excluding the output list that stores all subsets.",
      interview: "Because every element branches into include/exclude, there are 2^n combinations. The active recursion path is length n, so extra space is O(n) excluding output.",
    },
    "two-pointers": {
      time: "The left and right pointers only move inward. Each move discards one position, so there are at most n pointer moves. That gives O(n).",
      space: "Only two indexes and a few variables are stored, so extra space is O(1).",
      interview: "Each pointer moves in one direction and never revisits elements, so time is O(n). Since it uses only indexes, space is O(1).",
    },
    "mst-kruskal": {
      time: "Sorting all edges dominates the cost at O(E log E). Union Find operations are almost constant, so they do not dominate sorting.",
      space: "Parent and rank arrays use O(V), and the chosen edge list can store up to V - 1 edges. If the edge list is already given, extra space is mainly O(V).",
      interview: "Kruskal sorts edges first, which costs O(E log E). Then it uses Union Find to add safe edges almost constantly, so total time is O(E log E).",
    },
  };

  return (
    details[algorithm.id] || {
      time: "Count how often the main operation runs as input grows. The largest repeated part determines the time complexity.",
      space: "Count extra memory created by the algorithm, such as arrays, maps, recursion stack, queues, or heaps.",
      interview: `I would justify ${algorithm.complexity} by pointing to the dominant loop, recursion, or data structure operation in the implementation.`,
    }
  );
}

function renderAlgorithmInterviewQuestions(algorithm) {
  return getAlgorithmInterviewQuestions(algorithm)
    .map(
      (item) => `<details class="interview-qa" open>
        <summary>
          <strong>${item.question}</strong>
          <span class="tag">${item.type}</span>
        </summary>
        <div class="details-body">
          <p><strong>What interviewer checks:</strong> ${item.checks}</p>
          <p><strong>Practical example:</strong> ${item.example}</p>
          <p><strong>Answer:</strong> ${item.answer}</p>
        </div>
      </details>`,
    )
    .join("");
}

function getAlgorithmInterviewQuestions(algorithm) {
  const common = [
    {
      type: "Concept",
      question: `When would you choose ${algorithm.name}?`,
      checks: "Whether you know the trigger condition instead of memorizing code.",
      example: `In a production system, use it when the data shape matches this requirement: ${algorithm.concept}`,
      answer: `I would choose ${algorithm.name} when its core condition is present. I would first verify the input constraints, then use the algorithm because it gives ${algorithm.complexity} and avoids unnecessary brute force work.`,
    },
    {
      type: "Complexity",
      question: `Explain the time and space complexity of ${algorithm.name}.`,
      checks: "Whether you can justify Big O using loops, heap operations, recursion depth, or graph edges.",
      example: `For ${algorithm.name}, I would point to the exact repeated operation in the code and count how many times it can happen.`,
      answer: `${algorithm.complexity} The important part is not only naming Big O, but explaining why each input element, edge, state, or recursive branch is processed that many times.`,
    },
  ];

  const specific = {
    "binary-search": [
      {
        type: "Boundary Variant",
        question: "Find the first occurrence of a target in a sorted array with duplicates.",
        checks: "Boundary control and ability to keep searching after a match.",
        example: "Input: nums=[1,2,2,2,4], target=2. Output: 1.",
        answer:
          "Use binary search, but when nums[mid] equals target, save mid as a possible answer and continue searching the left half. This finds the earliest index while keeping O(log n) time.",
      },
      {
        type: "Binary Search on Answer",
        question: "Given machines with different speeds, find the minimum time to produce k items.",
        checks: "Whether you recognize a monotonic yes/no condition.",
        example: "If time=10 can produce enough items, then time=11,12,... can also produce enough.",
        answer:
          "Binary search the time. For each candidate time, calculate total produced items. If production >= k, move right lower; otherwise move left higher. The monotonic condition makes binary search valid.",
      },
    ],
    "merge-sort": [
      {
        type: "Counting",
        question: "Count inversions in an array.",
        checks: "Whether you can extend merge sort while merging.",
        example: "Input: [2,4,1,3,5]. Output: 3 inversions.",
        answer:
          "During merge, when right[j] is smaller than left[i], it forms inversions with all remaining elements from left[i..end]. Add that count while merging sorted halves.",
      },
      {
        type: "Linked List Sorting",
        question: "Sort a linked list in O(n log n).",
        checks: "Choosing merge sort because linked lists do not support random access.",
        example: "Input: 4->2->1->3. Output: 1->2->3->4.",
        answer:
          "Split the list using slow/fast pointers, recursively sort both halves, then merge two sorted linked lists. Merge sort fits linked lists because merging only rewires next pointers.",
      },
    ],
    "quick-sort": [
      {
        type: "Partition",
        question: "Find the kth largest element without fully sorting.",
        checks: "Understanding quickselect from quicksort partitioning.",
        example: "Input: [3,2,1,5,6,4], k=2. Output: 5.",
        answer:
          "Use partition to place a pivot in its final sorted position. If the pivot index is the kth largest position, return it. Otherwise recurse only into the side containing the answer.",
      },
      {
        type: "Tradeoff",
        question: "Why can quick sort degrade to O(n^2)?",
        checks: "Pivot choice and recursion balance.",
        example: "Already sorted input with last element as pivot creates one empty side each time.",
        answer:
          "If the pivot repeatedly becomes the smallest or largest element, the split is 0 and n-1 instead of balanced. Random pivot or median-of-three reduces this risk.",
      },
    ],
    bfs: [
      {
        type: "Shortest Path",
        question: "Find the shortest path in an unweighted grid.",
        checks: "Recognizing BFS level order as shortest distance.",
        example: "Move from top-left to bottom-right in a 0/1 grid where 0 is open.",
        answer:
          "Use BFS from the start cell. Each queue level represents one more step. The first time we reach the destination is the shortest path because all moves have equal cost.",
      },
      {
        type: "Tree Level Order",
        question: "Return values level by level in a binary tree.",
        checks: "Queue batching by current level size.",
        example: "Input tree [3,9,20,null,null,15,7]. Output: [[3],[9,20],[15,7]].",
        answer:
          "Push the root into a queue. For each level, store queue size, pop exactly that many nodes, and push their children. This separates levels cleanly.",
      },
    ],
    dfs: [
      {
        type: "Components",
        question: "Count connected components in a graph.",
        checks: "Using DFS from every unseen node.",
        example: "Graph with groups {0,1,2} and {3,4}. Output: 2.",
        answer:
          "Loop through all nodes. Whenever a node is unseen, start DFS and mark its whole component. Increment count once per DFS start.",
      },
      {
        type: "Cycle Detection",
        question: "Detect a cycle in a directed graph.",
        checks: "Understanding recursion states, not just visited.",
        example: "0->1->2->0 has a cycle.",
        answer:
          "Use three states: unvisited, visiting, visited. If DFS reaches a visiting node, there is a back edge and therefore a cycle.",
      },
    ],
    dijkstra: [
      {
        type: "Weighted Shortest Path",
        question: "Find cheapest route between cities with positive road costs.",
        checks: "Choosing Dijkstra instead of BFS.",
        example: "A->B cost 5, A->C cost 1, C->B cost 1. Cheapest A to B is 2 through C.",
        answer:
          "Use a min heap by current distance. Always expand the cheapest known city first and relax its outgoing roads. Stop early when destination is popped if only one target is needed.",
      },
      {
        type: "Constraint",
        question: "Why does Dijkstra fail with negative edges?",
        checks: "Knowing the algorithm's assumption.",
        example: "A path that looks expensive early may become cheap after a negative edge.",
        answer:
          "Dijkstra finalizes nodes assuming future edges cannot reduce their distance. Negative edges break that assumption, so Bellman-Ford is safer for negative weights.",
      },
    ],
    "topological-sort": [
      {
        type: "Dependency Ordering",
        question: "Can all courses be completed given prerequisites?",
        checks: "Cycle detection using topological sort.",
        example: "Courses: 0<-1 and 1<-0 means impossible.",
        answer:
          "Build indegrees. Process all zero-indegree courses. If the processed count equals total courses, no cycle exists; otherwise prerequisites contain a cycle.",
      },
      {
        type: "Build System",
        question: "Find the order to build packages with dependencies.",
        checks: "Correct edge direction and dependency-first ordering.",
        example: "Build core before api before app.",
        answer:
          "Create edges dependency -> dependent. Start with packages that have no dependencies, then release dependents as their indegree becomes zero.",
      },
    ],
    "union-find": [
      {
        type: "Connectivity",
        question: "Given friend pairs, check if two people are in the same group.",
        checks: "Using union and find efficiently.",
        example: "Pairs: (1,2), (2,3). Query: are 1 and 3 connected? Yes.",
        answer:
          "Union every friend pair. For each query, compare find(a) and find(b). If roots match, they belong to the same connected group.",
      },
      {
        type: "Cycle in Undirected Graph",
        question: "Detect whether adding an edge creates a cycle.",
        checks: "Union Find cycle logic.",
        example: "Edges: (0,1), (1,2), (2,0). The third edge creates a cycle.",
        answer:
          "For each edge, if both endpoints already have the same root, adding that edge creates a cycle. Otherwise union their groups.",
      },
    ],
    kadane: [
      {
        type: "Maximum Subarray",
        question: "Find the maximum sum of a contiguous subarray.",
        checks: "Knowing when to extend vs restart.",
        example: "Input: [-2,1,-3,4,-1,2,1,-5,4]. Output: 6.",
        answer:
          "At each element, choose max(element, previous_best_ending_here + element). Track the global best. The best subarray is [4,-1,2,1].",
      },
      {
        type: "All Negative Edge Case",
        question: "How do you handle an array where all numbers are negative?",
        checks: "Correct initialization.",
        example: "Input: [-5,-2,-9]. Output: -2.",
        answer:
          "Initialize current and best to nums[0], not 0. That allows the algorithm to return the largest negative number when no positive sum exists.",
      },
    ],
    "sliding-window": [
      {
        type: "String Window",
        question: "Find longest substring without repeating characters.",
        checks: "Maintaining a valid window.",
        example: "Input: abcabcbb. Output: 3 for abc.",
        answer:
          "Use left/right pointers and last seen indexes. When a duplicate appears inside the window, move left after the previous duplicate.",
      },
      {
        type: "Fixed Window",
        question: "Find max sum of any subarray of size k.",
        checks: "Difference between fixed and variable windows.",
        example: "Input: [2,1,5,1,3,2], k=3. Output: 9.",
        answer:
          "Keep a running sum of k elements. Add the new right element and remove the old left element as the window slides.",
      },
    ],
    kmp: [
      {
        type: "Pattern Search",
        question: "Find the first occurrence of a pattern in text.",
        checks: "Using LPS to avoid repeated comparisons.",
        example: "Text: abxabcabcaby, pattern: abcaby. Output: 6.",
        answer:
          "Build the LPS array for the pattern, then scan text. On mismatch, move the pattern pointer using LPS instead of restarting the text pointer.",
      },
      {
        type: "LPS Meaning",
        question: "What does the LPS array store?",
        checks: "Conceptual understanding of prefix reuse.",
        example: "For pattern abab, LPS is [0,0,1,2].",
        answer:
          "LPS[i] stores the length of the longest proper prefix that is also a suffix for pattern[0..i]. It tells how much matched work can be reused.",
      },
    ],
    knapsack: [
      {
        type: "Take or Skip",
        question: "Maximize value with limited capacity.",
        checks: "DP state and transition.",
        example: "weights=[1,3,4], values=[15,20,30], capacity=4. Best is 35.",
        answer:
          "For each item and capacity, choose max(skip item, take item + best remaining capacity). Use backward capacity iteration for 0/1 knapsack.",
      },
      {
        type: "Variant",
        question: "What changes in unbounded knapsack?",
        checks: "Recognizing item reuse.",
        example: "Coin change allows using the same coin many times.",
        answer:
          "In unbounded knapsack, iterate capacity forward so the same item can contribute again. In 0/1 knapsack, iterate backward to prevent reuse.",
      },
    ],
    backtracking: [
      {
        type: "Combinations",
        question: "Generate all subsets or combinations.",
        checks: "Try, recurse, undo pattern.",
        example: "Input: [1,2]. Output: [], [1], [2], [1,2].",
        answer:
          "At each index, choose include or exclude. Append the choice, recurse, then pop it before exploring the next branch.",
      },
      {
        type: "Pruning",
        question: "How do you optimize N-Queens or Sudoku solving?",
        checks: "Early rejection of invalid partial states.",
        example: "In N-Queens, never place two queens in same column or diagonal.",
        answer:
          "Track constraints in sets. Before recursing, check whether the move violates a constraint. If invalid, skip that branch immediately.",
      },
    ],
    "two-pointers": [
      {
        type: "Sorted Pair",
        question: "Find two numbers in a sorted array that sum to target.",
        checks: "Pointer movement reasoning.",
        example: "Input: [1,2,4,6,8], target=10. Output: [2,3] or values 4 and 6.",
        answer:
          "Start at both ends. If sum is too small, move left to increase it. If sum is too large, move right to decrease it.",
      },
      {
        type: "Palindrome",
        question: "Check if a string is a valid palindrome ignoring punctuation.",
        checks: "Clean pointer movement and character handling.",
        example: "A man, a plan, a canal: Panama -> true.",
        answer:
          "Move left and right inward. Skip non-alphanumeric characters. Compare lowercase characters at both pointers.",
      },
    ],
    "mst-kruskal": [
      {
        type: "Minimum Connection Cost",
        question: "Connect all cities with minimum total cost.",
        checks: "Recognizing minimum spanning tree.",
        example: "Cities are nodes and possible cables are weighted edges.",
        answer:
          "Sort cables by cost and use Union Find. Add a cable only when it connects two different components. The result connects all cities with minimum total cost.",
      },
      {
        type: "MST vs Shortest Path",
        question: "Is MST the same as shortest path?",
        checks: "Algorithm selection clarity.",
        example: "A cheap total network may not give the shortest route between two specific cities.",
        answer:
          "No. MST minimizes total connection cost for all nodes. Shortest path minimizes distance between selected nodes. Use Dijkstra for shortest path with non-negative weights.",
      },
    ],
  };

  return [...(specific[algorithm.id] || []), ...common];
}

function bindQuestionCopyButtons(scope) {
  scope.querySelectorAll("[data-copy-question]").forEach((button) => {
    button.addEventListener("click", async (event) => {
      event.preventDefault();
      event.stopPropagation();
      const topic = topics.find((item) => item.id === activeTopicId) || topics[0];
      const question = buildTopicQuestions(topic).find((item) => item.id === button.dataset.copyQuestion);
      if (!question) return;
      await navigator.clipboard.writeText(makeQuestionSolutionCode(question));
      toast("Question code copied");
    });
  });
}

function makeQuestionSolutionCode(question) {
  const title = question.title.toLowerCase();
  const pattern = question.pattern.toLowerCase();
  const fn = question.title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_|_$/g, "")
    .slice(0, 48) || "solve";

  if (title.includes("two sum")) {
    return `def two_sum(nums, target):
    seen = {}
    for index, value in enumerate(nums):
        need = target - value
        if need in seen:
            return [seen[need], index]
        seen[value] = index
    return []`;
  }
  if (title.includes("three sum")) {
    return `def three_sum(nums):
    nums.sort()
    answer = []
    for i in range(len(nums)):
        if i > 0 and nums[i] == nums[i - 1]:
            continue
        left, right = i + 1, len(nums) - 1
        while left < right:
            total = nums[i] + nums[left] + nums[right]
            if total == 0:
                answer.append([nums[i], nums[left], nums[right]])
                left += 1
                right -= 1
                while left < right and nums[left] == nums[left - 1]:
                    left += 1
            elif total < 0:
                left += 1
            else:
                right -= 1
    return answer`;
  }
  if (title.includes("reverse linked list")) {
    return `class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

def reverse_linked_list(head):
    prev = None
    current = head
    while current:
        nxt = current.next
        current.next = prev
        prev = current
        current = nxt
    return prev`;
  }
  if (title.includes("maximum subarray")) {
    return `def maximum_subarray_sum(nums):
    best = current = nums[0]
    for value in nums[1:]:
        current = max(value, current + value)
        best = max(best, current)
    return best`;
  }
  if (title.includes("valid palindrome")) {
    return `def valid_palindrome(text):
    left, right = 0, len(text) - 1
    while left < right:
        while left < right and not text[left].isalnum():
            left += 1
        while left < right and not text[right].isalnum():
            right -= 1
        if text[left].lower() != text[right].lower():
            return False
        left += 1
        right -= 1
    return True`;
  }
  if (title.includes("merge two sorted")) {
    return `def merge_two_sorted_arrays(a, b):
    i = j = 0
    merged = []
    while i < len(a) and j < len(b):
        if a[i] <= b[j]:
            merged.append(a[i])
            i += 1
        else:
            merged.append(b[j])
            j += 1
    return merged + a[i:] + b[j:]`;
  }
  if (title.includes("detect cycle") || pattern.includes("floyd")) {
    return `def has_cycle(head):
    slow = fast = head
    while fast and fast.next:
        slow = slow.next
        fast = fast.next.next
        if slow is fast:
            return True
    return False`;
  }
  if (pattern.includes("sliding window")) {
    return `def ${fn}(items, limit):
    left = 0
    best = 0
    window_state = {}
    for right, value in enumerate(items):
        window_state[value] = window_state.get(value, 0) + 1
        while not is_window_valid(window_state, limit):
            old = items[left]
            window_state[old] -= 1
            if window_state[old] == 0:
                del window_state[old]
            left += 1
        best = max(best, right - left + 1)
    return best

def is_window_valid(window_state, limit):
    # Replace this condition with the problem's exact rule.
    return len(window_state) <= limit`;
  }
  if (pattern.includes("two pointers")) {
    return `def ${fn}(values, target=None):
    left, right = 0, len(values) - 1
    answer = None
    while left < right:
        current = values[left] + values[right]
        if target is not None and current == target:
            return [left, right]
        if target is None or current < target:
            left += 1
        else:
            right -= 1
    return answer`;
  }
  if (pattern.includes("binary search")) {
    return `def ${fn}(values, target):
    left, right = 0, len(values) - 1
    while left <= right:
        mid = (left + right) // 2
        if values[mid] == target:
            return mid
        if values[mid] < target:
            left = mid + 1
        else:
            right = mid - 1
    return -1`;
  }
  if (pattern.includes("bfs")) {
    return `from collections import deque

def ${fn}(graph, start):
    queue = deque([start])
    seen = {start}
    order = []
    while queue:
        node = queue.popleft()
        order.append(node)
        for nxt in graph.get(node, []):
            if nxt not in seen:
                seen.add(nxt)
                queue.append(nxt)
    return order`;
  }
  if (pattern.includes("dfs") || pattern.includes("backtracking")) {
    return `def ${fn}(graph, start):
    seen = set()
    order = []

    def dfs(node):
        if node in seen:
            return
        seen.add(node)
        order.append(node)
        for nxt in graph.get(node, []):
            dfs(nxt)

    dfs(start)
    return order`;
  }
  if (pattern.includes("heap") || pattern.includes("top k")) {
    return `import heapq

def ${fn}(values, k):
    heap = []
    for value in values:
        heapq.heappush(heap, value)
        if len(heap) > k:
            heapq.heappop(heap)
    return heap[0] if heap else None`;
  }
  if (pattern.includes("prefix")) {
    return `def ${fn}(values, queries):
    prefix = [0]
    for value in values:
        prefix.append(prefix[-1] + value)
    answer = []
    for left, right in queries:
        answer.append(prefix[right + 1] - prefix[left])
    return answer`;
  }
  if (pattern.includes("hash")) {
    return `def ${fn}(values):
    seen = {}
    answer = []
    for index, value in enumerate(values):
        if value in seen:
            answer.append((seen[value], index))
        seen[value] = index
    return answer`;
  }
  if (pattern.includes("dp")) {
    return `def ${fn}(values):
    if not values:
        return 0
    dp = [0] * (len(values) + 1)
    dp[1] = values[0]
    for i in range(2, len(values) + 1):
        dp[i] = max(dp[i - 1], dp[i - 2] + values[i - 1])
    return dp[-1]`;
  }
  if (pattern.includes("stack")) {
    return `def ${fn}(values):
    stack = []
    answer = [-1] * len(values)
    for i, value in enumerate(values):
        while stack and values[stack[-1]] < value:
            answer[stack.pop()] = value
        stack.append(i)
    return answer`;
  }
  return `def ${fn}(data):
    """
    Reference template for: ${question.title}
    Pattern: ${question.pattern}
    1. Validate the input.
    2. Maintain the invariant described in the explanation.
    3. Update the answer after each state change.
    4. Return the final answer.
    """
    if data is None:
        return None

    answer = None
    state = {}
    for index, value in enumerate(data):
        state[value] = state.get(value, 0) + 1
        answer = update_answer(answer, index, value, state)
    return answer

def update_answer(answer, index, value, state):
    # Replace with the exact comparison or transition for this question.
    return value if answer is None else answer`;
}

function renderPractice() {
  const patterns = ["All", ...new Set(practiceProblems.map((problem) => problem.pattern)), "Easy", "Medium", "Hard"];
  document.getElementById("practice").innerHTML = `
    <p class="eyebrow">Practice Problems</p>
    <h1 class="page-title">Solve by pattern, not by memorizing answers.</h1>
    <p class="lead">Each problem includes example IO, a hint, and a step-by-step solution. Checking a problem updates the dashboard.</p>
    <section class="section">
      <div class="tabs" id="practiceFilters">${patterns.map((p) => `<button class="filter-button ${p === activePracticeFilter ? "active" : ""}" data-filter="${p}" type="button">${p}</button>`).join("")}</div>
      <div class="problem-list section" id="problemList"></div>
    </section>
  `;
  document.querySelectorAll("[data-filter]").forEach((button) => {
    button.addEventListener("click", () => {
      activePracticeFilter = button.dataset.filter;
      renderPractice();
    });
  });
  renderProblemList();
}

function renderProblemList() {
  const solved = solvedSet();
  const problems = practiceProblems.filter(
    (p) => activePracticeFilter === "All" || p.pattern === activePracticeFilter || p.difficulty === activePracticeFilter,
  );
  document.getElementById("problemList").innerHTML = problems
    .map(
      (problem) => `<article class="card problem">
        <div>
          <div class="check-row">
            <input type="checkbox" ${solved.has(problem.id) ? "checked" : ""} data-solved="${problem.id}" aria-label="Mark ${problem.title} solved" />
            <h3>${problem.title}</h3>
          </div>
          <div class="tag-row"><span class="tag">${problem.topic}</span><span class="tag">${problem.pattern}</span><span class="tag difficulty ${problem.difficulty}">${problem.difficulty}</span></div>
          <p><strong>Example:</strong> ${problem.io}</p>
          <div class="accordion">
            <details><summary>Hint</summary><div class="details-body">${problem.hint}</div></details>
            <details><summary>Step-by-step Solution</summary><div class="details-body">${problem.solution}</div></details>
          </div>
        </div>
      </article>`,
    )
    .join("");
  document.querySelectorAll("[data-solved]").forEach((box) => {
    box.addEventListener("change", () => setSolved(box.dataset.solved, box.checked));
  });
}

function renderNotes() {
  document.getElementById("notes").innerHTML = `
    <p class="eyebrow">Notes & Revision</p>
    <h1 class="page-title">Revise fast with compact notes, flashcards, and spaced repetition.</h1>
    <div class="section grid two">
      <article class="card">
        <h3>Quick Revision Notes</h3>
        <ul>
          <li>Arrays: ask whether order, duplicates, or range queries matter.</li>
          <li>Stacks: look for nearest greater/smaller, nested tokens, or undo state.</li>
          <li>Trees: define return value for each node before coding.</li>
          <li>Graphs: choose BFS, DFS, Dijkstra, or topological sort based on edge meaning.</li>
          <li>DP: write state, base case, transition, answer extraction.</li>
        </ul>
        <button class="pill-button" id="downloadNotes" type="button">Download Notes</button>
      </article>
      <article class="card">
        <h3>Spaced Repetition Plan</h3>
        <ul>
          <li>Day 0: learn topic and solve 3 examples.</li>
          <li>Day 1: review cheatsheet and solve 2 easy problems.</li>
          <li>Day 3: solve 2 medium pattern problems.</li>
          <li>Day 7: timed mixed set and explain aloud.</li>
          <li>Day 14: revisit mistakes and add one project feature.</li>
        </ul>
      </article>
    </div>
    <section class="section">
      <div class="section-head">
        <div><p class="eyebrow">Flashcards</p><h2>Tap through core interview ideas</h2></div>
        <div class="button-row">
          <button class="pill-button" id="prevFlash" type="button">Previous</button>
          <button class="pill-button primary" id="flipFlash" type="button">Flip</button>
          <button class="pill-button" id="nextFlash" type="button">Next</button>
        </div>
      </div>
      <div class="flashcard" id="flashcard"></div>
    </section>
  `;
  document.getElementById("downloadNotes").addEventListener("click", downloadNotes);
  document.getElementById("flipFlash").addEventListener("click", () => {
    flashcardShowingAnswer = !flashcardShowingAnswer;
    renderFlashcard();
  });
  document.getElementById("prevFlash").addEventListener("click", () => {
    activeFlashcard = (activeFlashcard - 1 + flashcards.length) % flashcards.length;
    flashcardShowingAnswer = false;
    renderFlashcard();
  });
  document.getElementById("nextFlash").addEventListener("click", () => {
    activeFlashcard = (activeFlashcard + 1) % flashcards.length;
    flashcardShowingAnswer = false;
    renderFlashcard();
  });
  renderFlashcard();
}

function renderFlashcard() {
  const [front, back] = flashcards[activeFlashcard];
  document.getElementById("flashcard").innerHTML = `<div><p class="eyebrow">${flashcardShowingAnswer ? "Answer" : "Question"}</p><strong>${flashcardShowingAnswer ? back : front}</strong></div>`;
}

function downloadNotes() {
  const text = topics
    .map((topic) => `${topic.name}\n${topic.explanation}\nCheatsheet:\n- ${topic.cheatsheet.join("\n- ")}\n`)
    .join("\n");
  const blob = new Blob([text], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "dsa-revision-notes.txt";
  link.click();
  URL.revokeObjectURL(url);
}

function renderProjects() {
  document.getElementById("projects").innerHTML = `
    <p class="eyebrow">Real-World Projects</p>
    <h1 class="page-title">Turn abstract DSA into portfolio-ready systems.</h1>
    <p class="lead">Each project maps a data structure to a real product behavior. Build these after the matching topic.</p>
    <section class="section grid two">
      ${projects
        .map(
          (project) => `<article class="card">
            <p class="eyebrow">${project.data}</p>
            <h3>${project.title}</h3>
            <p>${project.outcome}</p>
            <ul>${project.build.map((item) => `<li>${item}</li>`).join("")}</ul>
          </article>`,
        )
        .join("")}
    </section>
  `;
}

function renderInterview() {
  document.getElementById("interview").innerHTML = `
    <p class="eyebrow">Interview Preparation</p>
    <h1 class="page-title">Practice explaining tradeoffs under interview pressure.</h1>
    <section class="section grid two">
      <article class="card">
        <h3>Mock Interview Simulator</h3>
        <p id="mockPrompt">Click generate to receive a realistic prompt.</p>
        <div class="button-row">
          <button class="pill-button primary" id="mockButton" type="button">Generate Prompt</button>
          <button class="pill-button" id="timerButton" type="button">Start 25:00 Timer</button>
        </div>
        <p class="lead" id="timerText" style="font-size:32px;margin-top:20px">25:00</p>
      </article>
      <article class="card">
        <h3>Answer Framework</h3>
        <ol>
          <li>Clarify inputs, constraints, and expected output.</li>
          <li>Describe brute force and why it is limited.</li>
          <li>Identify pattern and data structure.</li>
          <li>Walk through example before coding.</li>
          <li>State complexity and test edge cases.</li>
        </ol>
      </article>
    </section>
    <section class="section grid three">
      ${["Arrays: two pointers vs hashing", "Trees: recursion return values", "Graphs: BFS vs DFS vs Dijkstra", "DP: state design", "Design: LRU cache", "Hard: trie + backtracking"]
        .map((item) => `<article class="card"><h3>${item}</h3><p>Explain the core pattern, code the main solution, then name tradeoffs and edge cases.</p></article>`)
        .join("")}
    </section>
  `;
  document.getElementById("mockButton").addEventListener("click", generateMockPrompt);
  document.getElementById("timerButton").addEventListener("click", startTimer);
}

function generateMockPrompt() {
  const prompt = practiceProblems[Math.floor(Math.random() * practiceProblems.length)];
  document.getElementById("mockPrompt").textContent = `${prompt.title}: ${prompt.io}. Start by clarifying constraints, then solve using ${prompt.pattern}.`;
}

function startTimer() {
  let seconds = 25 * 60;
  const timer = document.getElementById("timerText");
  window.clearInterval(window.dsaTimer);
  window.dsaTimer = window.setInterval(() => {
    seconds -= 1;
    const mm = String(Math.floor(seconds / 60)).padStart(2, "0");
    const ss = String(seconds % 60).padStart(2, "0");
    timer.textContent = `${mm}:${ss}`;
    if (seconds <= 0) {
      window.clearInterval(window.dsaTimer);
      toast("Mock interview complete");
    }
  }, 1000);
}

function renderDashboard() {
  const page = document.getElementById("dashboard");
  const solved = solvedSet();
  const solvedCount = solved.size;
  const percent = Math.round((solvedCount / practiceProblems.length) * 100);
  const topicStats = topics.map((topic) => {
    const related = practiceProblems.filter((p) => p.topic === topic.name);
    const count = related.filter((p) => solved.has(p.id)).length;
    return [topic.name, related.length ? Math.round((count / related.length) * 100) : 0];
  });
  page.innerHTML = `
    <p class="eyebrow">Progress Tracker Dashboard</p>
    <h1 class="page-title">Your learning progress, saved in this browser.</h1>
    <section class="section dashboard-grid">
      <article class="card">
        <div class="grid three">
          <div class="stat"><span class="muted">Solved</span><strong>${solvedCount}</strong><span>of ${practiceProblems.length}</span></div>
          <div class="stat"><span class="muted">Completion</span><strong>${percent}%</strong><span>practice set</span></div>
          <div class="stat"><span class="muted">Streak</span><strong>${Math.min(7, solvedCount)}</strong><span>study days target</span></div>
        </div>
        <div class="meter"><span style="width:${percent}%"></span></div>
      </article>
      <article class="card">
        <h3>Weekly Goals</h3>
        <ul>
          <li>Solve 12 problems.</li>
          <li>Finish 2 topic pages.</li>
          <li>Build 1 project feature.</li>
          <li>Complete 1 mock interview.</li>
        </ul>
      </article>
    </section>
    <section class="section card">
      <h3>Skill Level Per Topic</h3>
      ${topicStats
        .map(
          ([name, value]) => `<div class="skill-row"><strong>${name}</strong><div class="meter"><span style="width:${value}%"></span></div><span>${value}%</span></div>`,
        )
        .join("")}
    </section>
  `;
}

function updateWeekly() {
  const solved = solvedSet().size;
  const target = 12;
  document.getElementById("weeklyMeter").style.width = `${Math.min(100, (solved / target) * 100)}%`;
  document.getElementById("weeklyStatus").textContent = `${solved} / ${target} completed`;
}

function bindSearch() {
  const input = document.getElementById("globalSearch");
  input.addEventListener("input", () => {
    const query = input.value.trim().toLowerCase();
    if (!query) {
      document.querySelectorAll(".card, .problem, .topic-question").forEach((node) => node.classList.remove("hide"));
      return;
    }
    document.querySelectorAll(".card, .problem, .topic-question").forEach((node) => {
      node.classList.toggle("hide", !node.textContent.toLowerCase().includes(query));
    });
  });
}

function bindTheme() {
  const saved = state.theme || "light";
  document.documentElement.dataset.theme = saved;
  updateThemeButton(saved);
  document.getElementById("themeToggle").addEventListener("click", () => {
    const next = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    state.theme = next;
    saveState();
    updateThemeButton(next);
  });
}

function updateThemeButton(theme) {
  document.getElementById("themeIcon").textContent = theme === "dark" ? "Sun" : "Moon";
  document.getElementById("themeText").textContent = theme === "dark" ? "Light" : "Dark";
}

function escapeHtml(value) {
  return value.replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" })[char]);
}

function boot() {
  renderNav();
  renderHome();
  renderTopics();
  renderAlgorithms();
  renderComplexity();
  renderPractice();
  renderNotes();
  renderProjects();
  renderInterview();
  renderDashboard();
  bindSearch();
  bindTheme();
  updateWeekly();

  document.getElementById("menuButton").addEventListener("click", () => {
    document.querySelector(".sidebar").classList.toggle("open");
  });
  window.addEventListener("hashchange", () => activatePage(location.hash.slice(1)));
  activatePage(location.hash.slice(1) || "home");
}

boot();
