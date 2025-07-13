export interface Problem {
  id: string;
  slug: string;
  title: string;
  category: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  description: string;
  example: {
    input: string;
    output: string;
  };
  code: string;
  explanation: {
    title: string;
    content: string;
    keyInsight: string;
    steps: string[];
  };
  complexity: {
    time: string;
    space: string;
    timeDescription: string;
    spaceDescription: string;
  };
}

export const problems: Problem[] = [
  {
    id: '1',
    slug: 'remove-duplicates',
    title: 'Remove Duplicates from Sorted Array',
    category: 'Two Pointers',
    difficulty: 'Easy',
    description: 'Given an integer array nums sorted in non-decreasing order, remove the duplicates in-place such that each unique element appears only once. The relative order of the elements should be kept the same.',
    example: {
      input: 'nums = [1,1,2]',
      output: '[1,2]'
    },
    code: `def removeDuplicates(nums):
    """
    Remove duplicates using two pointers
    Time: O(n), Space: O(1)
    """
    if not nums:
        return 0
    
    left = 0
    
    for right in range(1, len(nums)):
        if nums[right] != nums[left]:
            left += 1
            nums[left] = nums[right]
    
    return left + 1

# Test the solution
test_cases = [
    [1, 1, 2],
    [0, 0, 1, 1, 1, 2, 2, 3, 3, 4],
    [1, 2, 3]
]

for i, nums in enumerate(test_cases):
    original = nums.copy()
    length = removeDuplicates(nums)
    result = nums[:length]
    print(f"Test {i+1}: {original} -> {result} (length: {length})")`,
    explanation: {
      title: 'Two Pointers Approach',
      content: 'This problem can be solved efficiently using two pointers technique where we maintain a slow pointer for the position of unique elements.',
      keyInsight: 'We use two pointers: one for tracking unique elements and another for scanning the array.',
      steps: [
        'Initialize left pointer at index 0',
        'Use right pointer to scan from index 1',
        'When nums[right] != nums[left], increment left and copy the element',
        'Return left + 1 as the length of unique elements'
      ]
    },
    complexity: {
      time: 'O(n)',
      space: 'O(1)',
      timeDescription: 'Single pass through the array',
      spaceDescription: 'Only constant extra space'
    }
  },
  {
    id: '2',
    slug: 'sort-colors',
    title: 'Sort Colors',
    category: 'Two Pointers',
    difficulty: 'Medium',
    description: 'Given an array nums with n objects colored red, white, or blue, sort them in-place so that objects of the same color are adjacent, with the colors in the order red, white, and blue.',
    example: {
      input: 'nums = [2,0,2,1,1,0]',
      output: '[0,0,1,1,2,2]'
    },
    code: `def sortColors(nums):
    """
    Sort colors using Dutch National Flag algorithm
    Time: O(n), Space: O(1)
    """
    left = curr = 0
    right = len(nums) - 1
    
    while curr <= right:
        if nums[curr] == 0:
            # Move 0 to the left region
            nums[left], nums[curr] = nums[curr], nums[left]
            left += 1
            curr += 1
        elif nums[curr] == 1:
            # 1 is in the correct position
            curr += 1
        else:  # nums[curr] == 2
            # Move 2 to the right region
            nums[curr], nums[right] = nums[right], nums[curr]
            right -= 1
            # Don't increment curr as we need to check the swapped element
    
    return nums

# Test the solution
test_cases = [
    [2, 0, 2, 1, 1, 0],
    [2, 0, 1],
    [0],
    [1, 2, 0]
]

for i, nums in enumerate(test_cases):
    original = nums.copy()
    result = sortColors(nums)
    print(f"Test {i+1}: {original} -> {result}")`,
    explanation: {
      title: 'Dutch National Flag Algorithm',
      content: 'This problem can be solved efficiently using the Dutch National Flag algorithm, which uses three pointers to partition the array in a single pass.',
      keyInsight: 'We maintain three regions: processed 0s, unprocessed elements, and processed 2s. The unprocessed region shrinks as we iterate through the array.',
      steps: [
        'Initialize three pointers: left = 0, curr = 0, right = n-1',
        'While curr ≤ right:',
        'If nums[curr] = 0: swap with nums[left] and increment both pointers',
        'If nums[curr] = 1: just increment curr',
        'If nums[curr] = 2: swap with nums[right] and decrement right'
      ]
    },
    complexity: {
      time: 'O(n)',
      space: 'O(1)',
      timeDescription: 'Single pass through the array',
      spaceDescription: 'Only constant extra space'
    }
  },
  {
    id: '3',
    slug: 'container-with-most-water',
    title: 'Container With Most Water',
    category: 'Two Pointers',
    difficulty: 'Medium',
    description: 'You are given an integer array height of length n. There are n vertical lines drawn such that the two endpoints of the ith line are (i, 0) and (i, height[i]). Find two lines that together with the x-axis form a container that contains the most water.',
    example: {
      input: 'height = [1,8,6,2,5,4,8,3,7]',
      output: '49'
    },
    code: `def maxArea(height):
    """
    Find maximum water area using two pointers
    Time: O(n), Space: O(1)
    """
    left = 0
    right = len(height) - 1
    max_area = 0
    
    while left < right:
        # Calculate current area
        width = right - left
        current_height = min(height[left], height[right])
        current_area = width * current_height
        max_area = max(max_area, current_area)
        
        # Move the pointer with smaller height
        if height[left] < height[right]:
            left += 1
        else:
            right -= 1
    
    return max_area

# Test the solution
test_cases = [
    [1, 8, 6, 2, 5, 4, 8, 3, 7],
    [1, 1],
    [4, 3, 2, 1, 4],
    [1, 2, 1]
]

for i, height in enumerate(test_cases):
    result = maxArea(height)
    print(f"Test {i+1}: {height} -> {result}")`,
    explanation: {
      title: 'Two Pointers Optimization',
      content: 'This problem uses the two pointers technique to find the maximum area efficiently by eliminating suboptimal solutions.',
      keyInsight: 'We always move the pointer with the smaller height because moving the taller one cannot increase the area.',
      steps: [
        'Start with pointers at both ends of the array',
        'Calculate area using the minimum height and current width',
        'Move the pointer with smaller height inward',
        'Continue until pointers meet, tracking maximum area'
      ]
    },
    complexity: {
      time: 'O(n)',
      space: 'O(1)',
      timeDescription: 'Single pass with two pointers',
      spaceDescription: 'Only constant extra space'
    }
  },
  {
    id: '4',
    slug: 'longest-substring-without-repeating',
    title: 'Longest Substring Without Repeating Characters',
    category: 'Sliding Window',
    difficulty: 'Medium',
    description: 'Given a string s, find the length of the longest substring without repeating characters.',
    example: {
      input: 's = "abcabcbb"',
      output: '3'
    },
    code: `def lengthOfLongestSubstring(s):
    """
    Find longest substring using sliding window
    Time: O(n), Space: O(min(m,n))
    """
    char_set = set()
    left = 0
    max_length = 0
    
    for right in range(len(s)):
        # Shrink window until no duplicates
        while s[right] in char_set:
            char_set.remove(s[left])
            left += 1
        
        # Add current character and update max length
        char_set.add(s[right])
        max_length = max(max_length, right - left + 1)
    
    return max_length

# Test the solution
test_cases = [
    "abcabcbb",
    "bbbbb",
    "pwwkew",
    ""
]

for i, s in enumerate(test_cases):
    result = lengthOfLongestSubstring(s)
    print(f"Test {i+1}: '{s}' -> {result}")`,
    explanation: {
      title: 'Sliding Window Technique',
      content: 'This problem uses the sliding window pattern to maintain a window of unique characters and track the maximum length.',
      keyInsight: 'We expand the window by moving the right pointer and shrink it by moving the left pointer when duplicates are found.',
      steps: [
        'Use a set to track characters in current window',
        'Expand window by moving right pointer',
        'When duplicate found, shrink window from left',
        'Track maximum window size throughout the process'
      ]
    },
    complexity: {
      time: 'O(n)',
      space: 'O(min(m,n))',
      timeDescription: 'Each character visited at most twice',
      spaceDescription: 'Space for character set (at most alphabet size)'
    }
  },
  // --- 30 more problems below ---
  {
    id: '5', slug: 'two-sum', title: 'Two Sum', category: 'Hash Table', difficulty: 'Easy',
    description: 'Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.',
    example: { input: 'nums = [2,7,11,15], target = 9', output: '[0,1]' },
    code: `def twoSum(nums, target):\n    lookup = {}\n    for i, num in enumerate(nums):\n        if target - num in lookup:\n            return [lookup[target - num], i]\n        lookup[num] = i`,
    explanation: { title: 'Hash Map Lookup', content: 'Store each number in a hash map and check if the complement exists.', keyInsight: 'Hash map for O(1) lookup.', steps: ['Iterate nums', 'Check complement', 'Return indices'] },
    complexity: { time: 'O(n)', space: 'O(n)', timeDescription: 'Single pass', spaceDescription: 'Hash map' }
  },
  {
    id: '6', slug: 'valid-parentheses', title: 'Valid Parentheses', category: 'Stack', difficulty: 'Easy',
    description: 'Given a string s containing just the characters (), {}, and [], determine if the input string is valid.',
    example: { input: 's = "()[]{}"', output: 'true' },
    code: `def isValid(s):\n    stack = []\n    mapping = {')': '(', '}': '{', ']': '['}\n    for char in s:\n        if char in mapping.values():\n            stack.append(char)\n        elif char in mapping:\n            if not stack or mapping[char] != stack.pop():\n                return False\n    return not stack`,
    explanation: { title: 'Stack for Matching', content: 'Use a stack to match opening and closing brackets.', keyInsight: 'Stack for LIFO order.', steps: ['Iterate string', 'Push/pop stack', 'Check validity'] },
    complexity: { time: 'O(n)', space: 'O(n)', timeDescription: 'Single pass', spaceDescription: 'Stack' }
  },
  {
    id: '7', slug: 'merge-intervals', title: 'Merge Intervals', category: 'Intervals', difficulty: 'Medium',
    description: 'Given an array of intervals, merge all overlapping intervals.',
    example: { input: 'intervals = [[1,3],[2,6],[8,10],[15,18]]', output: '[[1,6],[8,10],[15,18]]' },
    code: `def merge(intervals):\n    intervals.sort(key=lambda x: x[0])\n    merged = []\n    for interval in intervals:\n        if not merged or merged[-1][1] < interval[0]:\n            merged.append(interval)\n        else:\n            merged[-1][1] = max(merged[-1][1], interval[1])\n    return merged`,
    explanation: { title: 'Sort and Merge', content: 'Sort intervals and merge overlapping ones.', keyInsight: 'Sort by start time.', steps: ['Sort intervals', 'Iterate and merge', 'Return merged'] },
    complexity: { time: 'O(n log n)', space: 'O(n)', timeDescription: 'Sort dominates', spaceDescription: 'Output list' }
  },
  {
    id: '8', slug: 'climbing-stairs', title: 'Climbing Stairs', category: 'Dynamic Programming', difficulty: 'Easy',
    description: 'You are climbing a staircase. It takes n steps to reach the top. Each time you can climb 1 or 2 steps. How many distinct ways can you climb to the top?',
    example: { input: 'n = 3', output: '3' },
    code: `def climbStairs(n):\n    if n <= 2: return n\n    a, b = 1, 2\n    for _ in range(3, n+1):\n        a, b = b, a+b\n    return b`,
    explanation: { title: 'Fibonacci DP', content: 'DP with two variables, like Fibonacci.', keyInsight: 'DP recurrence.', steps: ['Base cases', 'Iterate up', 'Return result'] },
    complexity: { time: 'O(n)', space: 'O(1)', timeDescription: 'Single pass', spaceDescription: 'Two vars' }
  },
  {
    id: '9', slug: 'maximum-subarray', title: 'Maximum Subarray', category: 'Dynamic Programming', difficulty: 'Medium',
    description: 'Find the contiguous subarray with the largest sum.',
    example: { input: 'nums = [-2,1,-3,4,-1,2,1,-5,4]', output: '6' },
    code: `def maxSubArray(nums):\n    max_sum = curr = nums[0]\n    for n in nums[1:]:\n        curr = max(n, curr+n)\n        max_sum = max(max_sum, curr)\n    return max_sum`,
    explanation: { title: 'Kadane’s Algorithm', content: 'Track max sum ending at each index.', keyInsight: 'DP with running max.', steps: ['Init max/curr', 'Iterate', 'Update max'] },
    complexity: { time: 'O(n)', space: 'O(1)', timeDescription: 'Single pass', spaceDescription: 'Constant' }
  },
  {
    id: '10', slug: 'min-stack', title: 'Min Stack', category: 'Stack', difficulty: 'Medium',
    description: 'Design a stack that supports push, pop, top, and retrieving the minimum element in constant time.',
    example: { input: 'push(1), push(2), getMin()', output: '1' },
    code: `class MinStack:\n    def __init__(self):\n        self.stack = []\n        self.min_stack = []\n    def push(self, x):\n        self.stack.append(x)\n        if not self.min_stack or x <= self.min_stack[-1]:\n            self.min_stack.append(x)\n    def pop(self):\n        if self.stack.pop() == self.min_stack[-1]:\n            self.min_stack.pop()\n    def top(self):\n        return self.stack[-1]\n    def getMin(self):\n        return self.min_stack[-1]`,
    explanation: { title: 'Stack with Min Tracking', content: 'Use a second stack to track minimums.', keyInsight: 'Min stack mirrors stack.', steps: ['Push to both', 'Pop from both', 'Return min'] },
    complexity: { time: 'O(1)', space: 'O(n)', timeDescription: 'All ops constant', spaceDescription: 'Extra stack' }
  },
  {
    id: '11', slug: 'valid-anagram', title: 'Valid Anagram', category: 'Hash Table', difficulty: 'Easy',
    description: 'Given two strings s and t, return true if t is an anagram of s.',
    example: { input: 's = "anagram", t = "nagaram"', output: 'true' },
    code: `def isAnagram(s, t):\n    return sorted(s) == sorted(t)`,
    explanation: { title: 'Sort and Compare', content: 'Sort both strings and compare.', keyInsight: 'Sorting gives canonical form.', steps: ['Sort s/t', 'Compare'] },
    complexity: { time: 'O(n log n)', space: 'O(n)', timeDescription: 'Sort dominates', spaceDescription: 'Sorted strings' }
  },
  {
    id: '12', slug: 'group-anagrams', title: 'Group Anagrams', category: 'Hash Table', difficulty: 'Medium',
    description: 'Group anagrams from a list of strings.',
    example: { input: 'strs = ["eat","tea","tan","ate","nat","bat"]', output: '[ ["eat","tea","ate"], ["tan","nat"], ["bat"] ]' },
    code: `def groupAnagrams(strs):\n    from collections import defaultdict\n    groups = defaultdict(list)\n    for s in strs:\n        key = tuple(sorted(s))\n        groups[key].append(s)\n    return list(groups.values())`,
    explanation: { title: 'Hash by Sorted', content: 'Sort each string as key.', keyInsight: 'Sorted tuple as hash key.', steps: ['Sort each', 'Group by key', 'Return groups'] },
    complexity: { time: 'O(nk log k)', space: 'O(nk)', timeDescription: 'Sort each string', spaceDescription: 'Groups' }
  },
  {
    id: '13', slug: 'top-k-frequent', title: 'Top K Frequent Elements', category: 'Heap', difficulty: 'Medium',
    description: 'Return the k most frequent elements.',
    example: { input: 'nums = [1,1,1,2,2,3], k = 2', output: '[1,2]' },
    code: `def topKFrequent(nums, k):\n    from collections import Counter\n    return [x for x, _ in Counter(nums).most_common(k)]`,
    explanation: { title: 'Counter and Heap', content: 'Use Counter to count and heap to get top k.', keyInsight: 'Counter.most_common.', steps: ['Count', 'Heapq', 'Return top k'] },
    complexity: { time: 'O(n log k)', space: 'O(n)', timeDescription: 'Heap for k', spaceDescription: 'Counter' }
  },
  {
    id: '14', slug: 'kth-largest-element', title: 'Kth Largest Element in Array', category: 'Heap', difficulty: 'Medium',
    description: 'Find the kth largest element in an array.',
    example: { input: 'nums = [3,2,1,5,6,4], k = 2', output: '5' },
    code: `def findKthLargest(nums, k):\n    import heapq\n    return heapq.nlargest(k, nums)[-1]`,
    explanation: { title: 'Heapq nlargest', content: 'Use heapq.nlargest to get kth largest.', keyInsight: 'Heapq for k largest.', steps: ['Heapq nlargest', 'Return last'] },
    complexity: { time: 'O(n log k)', space: 'O(k)', timeDescription: 'Heap for k', spaceDescription: 'Heap' }
  },
  {
    id: '15', slug: 'binary-search', title: 'Binary Search', category: 'Binary Search', difficulty: 'Easy',
    description: 'Implement binary search on a sorted array.',
    example: { input: 'nums = [-1,0,3,5,9,12], target = 9', output: '4' },
    code: `def search(nums, target):\n    left, right = 0, len(nums)-1\n    while left <= right:\n        mid = (left + right) // 2\n        if nums[mid] == target:\n            return mid\n        elif nums[mid] < target:\n            left = mid + 1\n        else:\n            right = mid - 1\n    return -1`,
    explanation: { title: 'Classic Binary Search', content: 'Divide and conquer on sorted array.', keyInsight: 'Halve search space.', steps: ['Set bounds', 'Loop', 'Check mid'] },
    complexity: { time: 'O(log n)', space: 'O(1)', timeDescription: 'Halving', spaceDescription: 'Constant' }
  },
  {
    id: '16', slug: 'search-2d-matrix', title: 'Search a 2D Matrix', category: 'Binary Search', difficulty: 'Medium',
    description: 'Search for a target value in a 2D matrix.',
    example: { input: 'matrix = [[1,3,5,7],[10,11,16,20],[23,30,34,60]], target = 3', output: 'true' },
    code: `def searchMatrix(matrix, target):\n    if not matrix: return False\n    m, n = len(matrix), len(matrix[0])\n    left, right = 0, m*n-1\n    while left <= right:\n        mid = (left+right)//2\n        val = matrix[mid//n][mid%n]\n        if val == target: return True\n        elif val < target: left = mid+1\n        else: right = mid-1\n    return False`,
    explanation: { title: 'Flattened Binary Search', content: 'Treat 2D as 1D for search.', keyInsight: 'Index math for 2D.', steps: ['Set bounds', 'Loop', 'Check mid'] },
    complexity: { time: 'O(log(mn))', space: 'O(1)', timeDescription: 'Halving', spaceDescription: 'Constant' }
  },
  {
    id: '17', slug: 'rotate-image', title: 'Rotate Image', category: 'Matrix', difficulty: 'Medium',
    description: 'Rotate an n x n 2D matrix by 90 degrees (clockwise).',
    example: { input: 'matrix = [[1,2,3],[4,5,6],[7,8,9]]', output: '[[7,4,1],[8,5,2],[9,6,3]]' },
    code: `def rotate(matrix):\n    matrix[:] = zip(*matrix[::-1])`,
    explanation: { title: 'Transpose and Reverse', content: 'Transpose then reverse rows.', keyInsight: 'Python zip for rotate.', steps: ['Reverse', 'Zip', 'Assign'] },
    complexity: { time: 'O(n^2)', space: 'O(1)', timeDescription: 'All elements', spaceDescription: 'In-place' }
  },
  {
    id: '18', slug: 'spiral-matrix', title: 'Spiral Matrix', category: 'Matrix', difficulty: 'Medium',
    description: 'Return all elements of an m x n matrix in spiral order.',
    example: { input: 'matrix = [[1,2,3],[4,5,6],[7,8,9]]', output: '[1,2,3,6,9,8,7,4,5]' },
    code: `def spiralOrder(matrix):\n    res = []\n    while matrix:\n        res += matrix.pop(0)\n        if matrix and matrix[0]:\n            for row in matrix: res.append(row.pop())\n        if matrix: res += matrix.pop()[::-1]\n        if matrix and matrix[0]:\n            for row in matrix[::-1]: res.append(row.pop(0))\n    return res`,
    explanation: { title: 'Layer by Layer', content: 'Peel off layers in spiral order.', keyInsight: 'Pop rows/cols.', steps: ['Pop top', 'Pop right', 'Pop bottom', 'Pop left'] },
    complexity: { time: 'O(mn)', space: 'O(1)', timeDescription: 'All elements', spaceDescription: 'Output list' }
  },
  {
    id: '19', slug: 'set-matrix-zeroes', title: 'Set Matrix Zeroes', category: 'Matrix', difficulty: 'Medium',
    description: 'Set entire row and column to zero if an element is zero.',
    example: { input: 'matrix = [[1,1,1],[1,0,1],[1,1,1]]', output: '[[1,0,1],[0,0,0],[1,0,1]]' },
    code: `def setZeroes(matrix):\n    rows, cols = set(), set()\n    for i in range(len(matrix)):\n        for j in range(len(matrix[0])):\n            if matrix[i][j] == 0:\n                rows.add(i)\n                cols.add(j)\n    for i in range(len(matrix)):\n        for j in range(len(matrix[0])):\n            if i in rows or j in cols:\n                matrix[i][j] = 0`,
    explanation: { title: 'Mark Rows/Cols', content: 'Track rows/cols to zero.', keyInsight: 'Sets for marking.', steps: ['Mark', 'Zero', 'Return'] },
    complexity: { time: 'O(mn)', space: 'O(m+n)', timeDescription: 'All elements', spaceDescription: 'Sets' }
  },
  {
    id: '20', slug: 'word-search', title: 'Word Search', category: 'Backtracking', difficulty: 'Medium',
    description: 'Given a 2D board and a word, find if the word exists in the grid.',
    example: { input: 'board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word = "ABCCED"', output: 'true' },
    code: `def exist(board, word):\n    def dfs(i, j, k):\n        if not 0 <= i < len(board) or not 0 <= j < len(board[0]) or board[i][j] != word[k]:\n            return False\n        if k == len(word) - 1: return True\n        tmp, board[i][j] = board[i][j], '/'\n        res = dfs(i+1,j,k+1) or dfs(i-1,j,k+1) or dfs(i,j+1,k+1) or dfs(i,j-1,k+1)\n        board[i][j] = tmp\n        return res\n    for i in range(len(board)):\n        for j in range(len(board[0])):\n            if dfs(i, j, 0): return True\n    return False`,
    explanation: { title: 'DFS Backtracking', content: 'DFS for each cell, backtrack on fail.', keyInsight: 'Mark visited.', steps: ['DFS', 'Backtrack', 'Return'] },
    complexity: { time: 'O(mn*3^L)', space: 'O(L)', timeDescription: 'DFS for each cell', spaceDescription: 'Recursion' }
  },
  {
    id: '21', slug: 'combination-sum', title: 'Combination Sum', category: 'Backtracking', difficulty: 'Medium',
    description: 'Find all unique combinations that sum to target.',
    example: { input: 'candidates = [2,3,6,7], target = 7', output: '[[2,2,3],[7]]' },
    code: `def combinationSum(candidates, target):\n    res = []\n    def dfs(path, t, i):\n        if t == 0: res.append(path); return\n        if t < 0: return\n        for j in range(i, len(candidates)):\n            dfs(path+[candidates[j]], t-candidates[j], j)\n    dfs([], target, 0)\n    return res`,
    explanation: { title: 'DFS with Backtracking', content: 'DFS and backtrack for all sums.', keyInsight: 'Try all combos.', steps: ['DFS', 'Backtrack', 'Return'] },
    complexity: { time: 'O(2^n)', space: 'O(n)', timeDescription: 'All combos', spaceDescription: 'Recursion' }
  },
  {
    id: '22', slug: 'permutations', title: 'Permutations', category: 'Backtracking', difficulty: 'Medium',
    description: 'Return all possible permutations.',
    example: { input: 'nums = [1,2,3]', output: '[[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]' },
    code: `def permute(nums):\n    res = []\n    def backtrack(path, used):\n        if len(path) == len(nums): res.append(path[:]); return\n        for i in range(len(nums)):\n            if used[i]: continue\n            used[i] = True\n            path.append(nums[i])\n            backtrack(path, used)\n            path.pop(); used[i] = False\n    backtrack([], [False]*len(nums))\n    return res`,
    explanation: { title: 'Backtracking', content: 'Try all unused elements at each step.', keyInsight: 'Track used elements.', steps: ['Backtrack', 'Try all', 'Return'] },
    complexity: { time: 'O(n!)', space: 'O(n)', timeDescription: 'All perms', spaceDescription: 'Recursion' }
  },
  {
    id: '23', slug: 'unique-paths', title: 'Unique Paths', category: 'Dynamic Programming', difficulty: 'Medium',
    description: 'Find the number of unique paths in an m x n grid.',
    example: { input: 'm = 3, n = 7', output: '28' },
    code: `def uniquePaths(m, n):\n    dp = [[1]*n for _ in range(m)]\n    for i in range(1, m):\n        for j in range(1, n):\n            dp[i][j] = dp[i-1][j] + dp[i][j-1]\n    return dp[-1][-1]`,
    explanation: { title: 'DP Table', content: 'DP table for grid paths.', keyInsight: 'DP recurrence.', steps: ['Init table', 'Fill table', 'Return'] },
    complexity: { time: 'O(mn)', space: 'O(mn)', timeDescription: 'Fill table', spaceDescription: 'DP table' }
  },
  {
    id: '24', slug: 'minimum-path-sum', title: 'Minimum Path Sum', category: 'Dynamic Programming', difficulty: 'Medium',
    description: 'Find a path with minimum sum from top-left to bottom-right.',
    example: { input: 'grid = [[1,3,1],[1,5,1],[4,2,1]]', output: '7' },
    code: `def minPathSum(grid):\n    m, n = len(grid), len(grid[0])\n    for i in range(1, m): grid[i][0] += grid[i-1][0]\n    for j in range(1, n): grid[0][j] += grid[0][j-1]\n    for i in range(1, m):\n        for j in range(1, n):\n            grid[i][j] += min(grid[i-1][j], grid[i][j-1])\n    return grid[-1][-1]`,
    explanation: { title: 'DP Table', content: 'DP table for min path.', keyInsight: 'DP recurrence.', steps: ['Init table', 'Fill table', 'Return'] },
    complexity: { time: 'O(mn)', space: 'O(1)', timeDescription: 'Fill table', spaceDescription: 'In-place' }
  },
  {
    id: '25', slug: 'coin-change', title: 'Coin Change', category: 'Dynamic Programming', difficulty: 'Medium',
    description: 'Find the fewest coins needed to make up a given amount.',
    example: { input: 'coins = [1,2,5], amount = 11', output: '3' },
    code: `def coinChange(coins, amount):\n    dp = [float('inf')] * (amount+1)\n    dp[0] = 0\n    for coin in coins:\n        for x in range(coin, amount+1):\n            dp[x] = min(dp[x], dp[x-coin]+1)\n    return dp[amount] if dp[amount] != float('inf') else -1`,
    explanation: { title: 'DP for Min Coins', content: 'DP for each amount.', keyInsight: 'DP recurrence.', steps: ['Init dp', 'Iterate coins', 'Update dp'] },
    complexity: { time: 'O(amount*coins)', space: 'O(amount)', timeDescription: 'DP table', spaceDescription: 'DP array' }
  },
  {
    id: '26', slug: 'longest-increasing-subsequence', title: 'Longest Increasing Subsequence', category: 'Dynamic Programming', difficulty: 'Medium',
    description: 'Find the length of the longest increasing subsequence.',
    example: { input: 'nums = [10,9,2,5,3,7,101,18]', output: '4' },
    code: `def lengthOfLIS(nums):\n    dp = [1]*len(nums)\n    for i in range(len(nums)):\n        for j in range(i):\n            if nums[i] > nums[j]:\n                dp[i] = max(dp[i], dp[j]+1)\n    return max(dp)`,
    explanation: { title: 'DP for LIS', content: 'DP for each index.', keyInsight: 'DP recurrence.', steps: ['Init dp', 'Iterate', 'Update dp'] },
    complexity: { time: 'O(n^2)', space: 'O(n)', timeDescription: 'DP table', spaceDescription: 'DP array' }
  },
  {
    id: '27', slug: 'number-of-islands', title: 'Number of Islands', category: 'DFS', difficulty: 'Medium',
    description: 'Count the number of islands in a 2D grid.',
    example: { input: 'grid = [["1","1","0","0","0"],["1","1","0","0","0"],["0","0","1","0"],["0","0","0","1"]]', output: '3' },
    code: `def numIslands(grid):\n    def dfs(i, j):\n        if i<0 or i>=len(grid) or j<0 or j>=len(grid[0]) or grid[i][j]=='0': return\n        grid[i][j]='0'\n        dfs(i+1,j); dfs(i-1,j); dfs(i,j+1); dfs(i,j-1)\n    count=0\n    for i in range(len(grid)):\n        for j in range(len(grid[0])):\n            if grid[i][j]=='1':\n                dfs(i,j); count+=1\n    return count`,
    explanation: { title: 'DFS Flood Fill', content: 'DFS to mark visited land.', keyInsight: 'Flood fill.', steps: ['DFS', 'Mark', 'Count'] },
    complexity: { time: 'O(mn)', space: 'O(mn)', timeDescription: 'All cells', spaceDescription: 'Recursion' }
  },
  {
    id: '28', slug: 'reverse-linked-list', title: 'Reverse Linked List', category: 'Linked List', difficulty: 'Easy',
    description: 'Reverse a singly linked list.',
    example: { input: 'head = [1,2,3,4,5]', output: '[5,4,3,2,1]' },
    code: `def reverseList(head):\n    prev = None\n    curr = head\n    while curr:\n        next = curr.next\n        curr.next = prev\n        prev = curr\n        curr = next\n    return prev`,
    explanation: { title: 'Iterative Reverse', content: 'Iterate and reverse pointers.', keyInsight: 'Track prev/curr.', steps: ['Init prev', 'Iterate', 'Reverse'] },
    complexity: { time: 'O(n)', space: 'O(1)', timeDescription: 'Single pass', spaceDescription: 'Constant' }
  },
  {
    id: '29', slug: 'merge-two-sorted-lists', title: 'Merge Two Sorted Lists', category: 'Linked List', difficulty: 'Easy',
    description: 'Merge two sorted linked lists.',
    example: { input: 'l1 = [1,2,4], l2 = [1,3,4]', output: '[1,1,2,3,4,4]' },
    code: `def mergeTwoLists(l1, l2):\n    dummy = curr = ListNode(0)\n    while l1 and l2:\n        if l1.val < l2.val:\n            curr.next = l1\n            l1 = l1.next\n        else:\n            curr.next = l2\n            l2 = l2.next\n        curr = curr.next\n    curr.next = l1 or l2\n    return dummy.next`,
    explanation: { title: 'Iterative Merge', content: 'Iterate and merge nodes.', keyInsight: 'Dummy node.', steps: ['Init dummy', 'Iterate', 'Merge'] },
    complexity: { time: 'O(n)', space: 'O(1)', timeDescription: 'Single pass', spaceDescription: 'Constant' }
  },
  {
    id: '30', slug: 'linked-list-cycle', title: 'Linked List Cycle', category: 'Linked List', difficulty: 'Easy',
    description: 'Detect if a linked list has a cycle.',
    example: { input: 'head = [3,2,0,-4], pos = 1', output: 'true' },
    code: `def hasCycle(head):\n    slow = fast = head\n    while fast and fast.next:\n        slow = slow.next\n        fast = fast.next.next\n        if slow == fast: return True\n    return False`,
    explanation: { title: 'Floyd’s Cycle Detection', content: 'Use two pointers.', keyInsight: 'Slow/fast pointers.', steps: ['Init pointers', 'Iterate', 'Check match'] },
    complexity: { time: 'O(n)', space: 'O(1)', timeDescription: 'Single pass', spaceDescription: 'Constant' }
  },
  {
    id: '31', slug: 'min-depth-binary-tree', title: 'Minimum Depth of Binary Tree', category: 'Tree', difficulty: 'Easy',
    description: 'Find the minimum depth of a binary tree.',
    example: { input: 'root = [3,9,20,null,null,15,7]', output: '2' },
    code: `def minDepth(root):\n    if not root: return 0\n    if not root.left or not root.right:\n        return 1 + max(minDepth(root.left), minDepth(root.right))\n    return 1 + min(minDepth(root.left), minDepth(root.right))`,
    explanation: { title: 'Recursive DFS', content: 'DFS to find min depth.', keyInsight: 'Base cases for null.', steps: ['Check null', 'Recurse', 'Return min'] },
    complexity: { time: 'O(n)', space: 'O(h)', timeDescription: 'All nodes', spaceDescription: 'Recursion' }
  },
  {
    id: '32', slug: 'invert-binary-tree', title: 'Invert Binary Tree', category: 'Tree', difficulty: 'Easy',
    description: 'Invert a binary tree.',
    example: { input: 'root = [4,2,7,1,3,6,9]', output: '[4,7,2,9,6,3,1]' },
    code: `def invertTree(root):\n    if root:\n        root.left, root.right = invertTree(root.right), invertTree(root.left)\n    return root`,
    explanation: { title: 'Recursive Swap', content: 'Swap left/right recursively.', keyInsight: 'Swap at each node.', steps: ['Check root', 'Swap', 'Recurse'] },
    complexity: { time: 'O(n)', space: 'O(h)', timeDescription: 'All nodes', spaceDescription: 'Recursion' }
  },
  {
    id: '33', slug: 'symmetric-tree', title: 'Symmetric Tree', category: 'Tree', difficulty: 'Easy',
    description: 'Check if a tree is symmetric.',
    example: { input: 'root = [1,2,2,3,4,4,3]', output: 'true' },
    code: `def isSymmetric(root):\n    def isMirror(t1, t2):\n        if not t1 and not t2: return True\n        if not t1 or not t2: return False\n        return t1.val == t2.val and isMirror(t1.left, t2.right) and isMirror(t1.right, t2.left)\n    return isMirror(root, root)`,
    explanation: { title: 'Mirror Recursion', content: 'Check mirror for left/right.', keyInsight: 'Recursive mirror.', steps: ['Check null', 'Compare', 'Recurse'] },
    complexity: { time: 'O(n)', space: 'O(h)', timeDescription: 'All nodes', spaceDescription: 'Recursion' }
  },
  {
    id: '34', slug: 'maximum-depth-binary-tree', title: 'Maximum Depth of Binary Tree', category: 'Tree', difficulty: 'Easy',
    description: 'Find the maximum depth of a binary tree.',
    example: { input: 'root = [3,9,20,null,null,15,7]', output: '3' },
    code: `def maxDepth(root):\n    if not root: return 0\n    return 1 + max(maxDepth(root.left), maxDepth(root.right))`,
    explanation: { title: 'Recursive DFS', content: 'DFS to find max depth.', keyInsight: 'Base cases for null.', steps: ['Check null', 'Recurse', 'Return max'] },
    complexity: { time: 'O(n)', space: 'O(h)', timeDescription: 'All nodes', spaceDescription: 'Recursion' }
  }
];

export const getProblems = (): Problem[] => problems;

export const getProblemBySlug = (slug: string): Problem | undefined => {
  return problems.find(problem => problem.slug === slug);
};

export const getProblemIndex = (slug: string): number => {
  return problems.findIndex(problem => problem.slug === slug);
};

export const getNextProblem = (currentSlug: string): Problem | null => {
  const currentIndex = getProblemIndex(currentSlug);
  if (currentIndex === -1 || currentIndex === problems.length - 1) {
    return null;
  }
  return problems[currentIndex + 1];
};

export const getPreviousProblem = (currentSlug: string): Problem | null => {
  const currentIndex = getProblemIndex(currentSlug);
  if (currentIndex <= 0) {
    return null;
  }
  return problems[currentIndex - 1];
};