/* Gravity Courses - DSA Masterclass Data (Refactored) */

export const dsaCourse = {
    id: 'dsa-mastery',
    title: 'DSA Masterclass',
    description: 'Master the art of problem solving. Algorithms, Complexity, and Interview Questions.',
    icon: 'FaCode',
    topics: [
        {
            id: 'arrays',
            title: 'Arrays',
            subTopics: [
                {
                    id: 'two-pointers',
                    title: 'Two Pointers',
                    questions: [
                        {
                            id: 'trapping-rain-water',
                            title: 'Trapping Rain Water',
                            problemStatement: "Given n non-negative integers representing an elevation map where the width of each bar is 1, compute how much water it can trap after raining.",
                            problemLink: "https://leetcode.com/problems/trapping-rain-water/",
                            sampleInput: "height = [0,1,0,2,1,0,1,3,2,1,2,1]",
                            sampleOutput: "6",
                            approaches: [
                                {
                                    name: "Two Pointers",
                                    explanation: "REAL WORLD ANALOGY: Two walls closing in. Water level at any point is determined by the shorter of the maximum walls to its left and right. If you maintain `leftMax` and `rightMax`, you can calculate the water trapped at the current position based on the smaller boundary.\n\nTECHNICAL: Maintain left, right pointers and leftMax, rightMax.",
                                    timeComplexity: "O(n)",
                                    spaceComplexity: "O(1)",
                                    code: `class Solution {
    public int trap(int[] height) {
        int left = 0, right = height.length - 1;
        int leftMax = 0, rightMax = 0;
        int ans = 0;
        while (left < right) {
            if (height[left] < height[right]) {
                if (height[left] >= leftMax) leftMax = height[left];
                else ans += leftMax - height[left];
                left++;
            } else {
                if (height[right] >= rightMax) rightMax = height[right];
                else ans += rightMax - height[right];
                right--;
            }
        }
        return ans;
    }
}`
                                },
                                {
                                    name: "Dynamic Programming",
                                    explanation: "Pre-compute left max and right max for every index. Min(leftMax[i], rightMax[i]) - height[i] is the water at i.",
                                    timeComplexity: "O(n)",
                                    spaceComplexity: "O(n)",
                                    code: `class Solution {
    public int trap(int[] height) {
        int n = height.length;
        if (n == 0) return 0;
        int[] leftMax = new int[n];
        int[] rightMax = new int[n];
        leftMax[0] = height[0];
        for (int i = 1; i < n; i++) leftMax[i] = Math.max(leftMax[i - 1], height[i]);
        rightMax[n - 1] = height[n - 1];
        for (int i = n - 2; i >= 0; i--) rightMax[i] = Math.max(rightMax[i + 1], height[i]);
        int ans = 0;
        for (int i = 0; i < n; i++) ans += Math.min(leftMax[i], rightMax[i]) - height[i];
        return ans;
    }
}`
                                }
                            ]
                        },
                        {
                            id: 'next-permutation',
                            title: 'Next Permutation',
                            problemStatement: "Implement next permutation, which rearranges numbers into the lexicographically next greater permutation of numbers.",
                            problemLink: "https://leetcode.com/problems/next-permutation/",
                            sampleInput: "nums = [1,2,3]",
                            sampleOutput: "[1,3,2]",
                            approaches: [
                                {
                                    name: "Single Pass",
                                    explanation: "REAL WORLD ANALOGY: Odometer. You want the next smallest increase. You find the first digit from the right that can be increased (the pivot), swap it with the smallest digit to its right that is larger than it, then reset the digits to the right of the pivot to be as small as possible (sorted ascending).\n\nTECHNICAL: Find pivot `nums[i] < nums[i+1]`. Swap with `nums[j] > nums[i]`. Reverse `i+1` to end.",
                                    timeComplexity: "O(n)",
                                    spaceComplexity: "O(1)",
                                    code: `class Solution {
    public void nextPermutation(int[] nums) {
        int i = nums.length - 2;
        while(i >= 0 && nums[i] >= nums[i+1]) i--;
        if(i >= 0) {
            int j = nums.length - 1;
            while(nums[j] <= nums[i]) j--;
            swap(nums, i, j);
        }
        reverse(nums, i+1, nums.length-1);
    }
    void swap(int[] nums, int i, int j){ int t = nums[i]; nums[i] = nums[j]; nums[j] = t; }
    void reverse(int[] nums, int i, int j){ while(i<j) swap(nums, i++, j--); }
}`
                                }
                            ]
                        },
                        {
                            id: 'find-duplicate-number',
                            title: 'Find the Duplicate Number',
                            problemStatement: "Given an array of integers containing n + 1 integers where each integer is in range [1, n], find the duplicate number.",
                            problemLink: "https://leetcode.com/problems/find-the-duplicate-number/",
                            sampleInput: "nums = [1,3,4,2,2]",
                            sampleOutput: "2",
                            approaches: [
                                {
                                    name: "Tortoise and Hare",
                                    explanation: "REAL WORLD ANALOGY: This is actually a Linked List Cycle problem in disguise. The values in the array are pointers to the next index. If there's a duplicate, two indices point to the same next node, creating a cycle.\n\nTECHNICAL: Slow/Fast pointers. Find meeting point. Reset fast to start. Move both 1 step. Meeting point is duplication.",
                                    timeComplexity: "O(n)",
                                    spaceComplexity: "O(1)",
                                    code: `class Solution {
    public int findDuplicate(int[] nums) {
        int slow = nums[0];
        int fast = nums[0];
        do {
            slow = nums[slow];
            fast = nums[nums[fast]];
        } while (slow != fast);
        
        fast = nums[0];
        while (slow != fast) {
            slow = nums[slow];
            fast = nums[fast];
        }
        return slow;
    }
}`
                                }
                            ]
                        },
                        {
                            id: 'majority-element',
                            title: 'Majority Element',
                            problemStatement: "Given an array of size n, return the majority element (appears > n/2 times).",
                            problemLink: "https://leetcode.com/problems/majority-element/",
                            sampleInput: "nums = [3,2,3]",
                            sampleOutput: "3",
                            approaches: [
                                {
                                    name: "Boyer-Moore Voting",
                                    explanation: "REAL WORLD ANALOGY: A battle royale. If you meet someone with the same team badge (value), you pair up (count++). If different, you both knock each other out (count--). The majority team will survive because they have more members than everyone else combined.\n\nTECHNICAL: Candidate & Count.",
                                    timeComplexity: "O(n)",
                                    spaceComplexity: "O(1)",
                                    code: `class Solution {
    public int majorityElement(int[] nums) {
         int count = 0;
         Integer candidate = null;
         for (int num : nums) {
             if (count == 0) candidate = num;
             count += (num == candidate) ? 1 : -1;
         }
         return candidate;
    }
}`
                                },
                                {
                                    name: "Sorting",
                                    explanation: "If an element appears more than n/2 times, it MUST occupy the middle position of the sorted array.",
                                    timeComplexity: "O(n log n)",
                                    spaceComplexity: "O(1)",
                                    code: `class Solution {
    public int majorityElement(int[] nums) {
        Arrays.sort(nums);
        return nums[nums.length / 2];
    }
}`
                                }
                            ]
                        },
                        {
                            id: 'max-sum-circular-subarray',
                            title: 'Maximum Sum Circular Subarray',
                            problemStatement: "Find the maximum possible sum of a non-empty subarray of the circular array.",
                            problemLink: "https://leetcode.com/problems/maximum-sum-circular-subarray/",
                            sampleInput: "nums = [5,-3,5]",
                            sampleOutput: "10 (All elements)",
                            approaches: [
                                {
                                    name: "Kadane's Variant",
                                    explanation: "REAL WORLD ANALOGY: Two cases. 1. The max subarray is in the middle (normal Kadane). 2. The max subarray wraps around. If it wraps around, it means the 'non-selected' part in the middle is a MINIMUM subarray. Max(Wrap) = TotalSum - MinSubarray.\n\nTECHNICAL: Calculate MaxKadane, MinKadane, and TotalSum. Res = max(MaxKadane, TotalSum - MinKadane).",
                                    timeComplexity: "O(n)",
                                    spaceComplexity: "O(1)",
                                    code: `class Solution {
    public int maxSubarraySumCircular(int[] nums) {
        int total = 0, maxSum = nums[0], curMax = 0, minSum = nums[0], curMin = 0;
        for (int a : nums) {
            curMax = Math.max(curMax + a, a);
            maxSum = Math.max(maxSum, curMax);
            curMin = Math.min(curMin + a, a);
            minSum = Math.min(minSum, curMin);
            total += a;
        }
        return maxSum > 0 ? Math.max(maxSum, total - minSum) : maxSum;
    }
}`
                                }
                            ]
                        },
                        {
                            id: 'two-sum',
                            title: 'Two Sum',
                            problemStatement: "Given an array of integers `nums` and an integer `target`, return indices of the two numbers such that they add up to `target`.",
                            problemLink: "https://leetcode.com/problems/two-sum/",
                            sampleInput: "nums = [2,7,11,15], target = 9",
                            sampleOutput: "[0,1]",
                            approaches: [
                                {
                                    name: "Brute Force",
                                    explanation: "Check every possible pair of numbers to see if they add up to the target.",
                                    timeComplexity: "O(n²)",
                                    spaceComplexity: "O(1)",
                                    code: `class Solution {
    public int[] twoSum(int[] nums, int target) {
        for (int i = 0; i < nums.length; i++) {
            for (int j = i + 1; j < nums.length; j++) {
                if (nums[i] + nums[j] == target) {
                    return new int[] { i, j };
                }
            }
        }
        return new int[] {};
    }
}`
                                },
                                {
                                    name: "Hash Map (Optimal)",
                                    explanation: "REAL WORLD ANALOGY: Think of a coat check. You give your coat (value) and get a token (index). Later, check if the 'match' for your target exists in the retrieval system.\n\nTECHNICAL: Use a HashMap to store values seen so far. For each number x, check if (target - x) exists in the map.",
                                    timeComplexity: "O(n)",
                                    spaceComplexity: "O(n)",
                                    code: `class Solution {
    public int[] twoSum(int[] nums, int target) {
        Map<Integer, Integer> map = new HashMap<>();
        for (int i = 0; i < nums.length; i++) {
            int complement = target - nums[i];
            if (map.containsKey(complement)) {
                return new int[] { map.get(complement), i };
            }
            map.put(nums[i], i);
        }
        return new int[] {};
    }
}`
                                }
                            ]
                        },
                        {
                            id: 'best-time-stock',
                            title: 'Best Time to Buy and Sell Stock',
                            problemStatement: "You want to maximize your profit by choosing a single day to buy one stock and choosing a different day in the future to sell that stock.",
                            problemLink: "https://leetcode.com/problems/best-time-to-buy-and-sell-stock/",
                            sampleInput: "prices = [7,1,5,3,6,4]",
                            sampleOutput: "5 (Buy on 1, Sell on 6)",
                            approaches: [
                                {
                                    name: "Brute Force",
                                    explanation: "Check every single pair of (buy day, sell day) where buy < sell and track the maximum profit found.",
                                    timeComplexity: "O(n²)",
                                    spaceComplexity: "O(1)",
                                    code: `class Solution {
    public int maxProfit(int[] prices) {
        int maxProfit = 0;
        for (int i = 0; i < prices.length; i++) {
            for (int j = i + 1; j < prices.length; j++) {
                int profit = prices[j] - prices[i];
                if (profit > maxProfit) {
                    maxProfit = profit;
                }
            }
        }
        return maxProfit;
    }
}`
                                },
                                {
                                    name: "One Pass",
                                    explanation: "REAL WORLD ANALOGY: Imagine you are a time traveler looking at a historical price chart. You want to remember the lowest valley (minPrice) you've seen so far, and at every step, calculate how much you'd make if you sold at the current peak.\n\nTECHNICAL: Track minPrice and maxProfit in a single pass.",
                                    timeComplexity: "O(n)",
                                    spaceComplexity: "O(1)",
                                    code: `class Solution {
    public int maxProfit(int[] prices) {
        int minPrice = Integer.MAX_VALUE;
        int maxProfit = 0;
        
        for (int price : prices) {
            if (price < minPrice) {
                minPrice = price;
            } else if (price - minPrice > maxProfit) {
                maxProfit = price - minPrice;
            }
        }
        return maxProfit;
    }
}`
                                }
                            ]
                        },
                        {
                            id: 'container-with-most-water',
                            title: 'Container With Most Water',
                            problemStatement: "Find two lines that together with the x-axis form a container, such that the container contains the most water.",
                            problemLink: "https://leetcode.com/problems/container-with-most-water/",
                            sampleInput: "height = [1,8,6,2,5,4,8,3,7]",
                            sampleOutput: "49",
                            approaches: [
                                {
                                    name: "Brute Force",
                                    explanation: "Check every possible pair of lines (left and right) and calculate the area. Keep track of the maximum area seen.",
                                    timeComplexity: "O(n²)",
                                    spaceComplexity: "O(1)",
                                    code: `class Solution {
    public int maxArea(int[] height) {
        int max = 0;
        for (int i = 0; i < height.length; i++) {
            for (int j = i + 1; j < height.length; j++) {
                int minHeight = Math.min(height[i], height[j]);
                int width = j - i;
                max = Math.max(max, minHeight * width);
            }
        }
        return max;
    }
}`
                                },
                                {
                                    name: "Two Pointers",
                                    explanation: "REAL WORLD ANALOGY: Imagine two walls moving towards each other. The water level is limited by the shorter wall. To maximize space, moving the taller wall never helps (width decreases, height is still limited). You must only move the shorter wall hoping to find a taller one.\n\nTECHNICAL: Start pointers at ends. Move the pointer pointing to the shorter line.",
                                    timeComplexity: "O(n)",
                                    spaceComplexity: "O(1)",
                                    code: `class Solution {
    public int maxArea(int[] height) {
        int max = 0;
        int left = 0;
        int right = height.length - 1;
        
        while (left < right) {
            int currentArea = Math.min(height[left], height[right]) * (right - left);
            max = Math.max(max, currentArea);
            
            if (height[left] < height[right]) {
                left++;
            } else {
                right--;
            }
        }
        return max;
    }
}`
                                }
                            ]
                        },
                        {
                            id: '3sum',
                            title: '3Sum',
                            problemStatement: "Given an integer array nums, return all the triplets [nums[i], nums[j], nums[k]] such that i != j, i != k, and j != k, and nums[i] + nums[j] + nums[k] == 0.",
                            problemLink: "https://leetcode.com/problems/3sum/",
                            sampleInput: "nums = [-1,0,1,2,-1,-4]",
                            sampleOutput: "[[-1,-1,2],[-1,0,1]]",
                            approaches: [
                                {
                                    name: "Brute Force",
                                    explanation: "Check every possible triplet (i, j, k) to see if they sum to zero. Requires handling duplicates which is complex in brute force.",
                                    timeComplexity: "O(n³)",
                                    spaceComplexity: "O(1)",
                                    code: `class Solution {
    public List<List<Integer>> threeSum(int[] nums) {
        Set<List<Integer>> resSet = new HashSet<>();
        Arrays.sort(nums); // Sort to handle duplicates easier
        for (int i = 0; i < nums.length; i++) {
            for (int j = i + 1; j < nums.length; j++) {
                for (int k = j + 1; k < nums.length; k++) {
                    if (nums[i] + nums[j] + nums[k] == 0) {
                        resSet.add(Arrays.asList(nums[i], nums[j], nums[k]));
                    }
                }
            }
        }
        return new ArrayList<>(resSet);
    }
}`
                                },
                                {
                                    name: "Sort + Two Pointers",
                                    explanation: "REAL WORLD ANALOGY: Like balancing a seesaw with three people. You pick the first person (fix 'i'), then allow the other two to slide towards each other (two pointers) until they balance the weight to zero.\n\nTECHNICAL: Sort first. Iterate i, then use Two Sum (sorted array version) for the rest.",
                                    timeComplexity: "O(n²)",
                                    spaceComplexity: "O(1)",
                                    code: `class Solution {
    public List<List<Integer>> threeSum(int[] nums) {
        Arrays.sort(nums);
        List<List<Integer>> res = new ArrayList<>();
        
        for (int i = 0; i < nums.length - 2; i++) {
            if (i > 0 && nums[i] == nums[i-1]) continue; // Skip duplicates
            
            int left = i + 1;
            int right = nums.length - 1;
            
            while (left < right) {
                int sum = nums[i] + nums[left] + nums[right];
                if (sum == 0) {
                    res.add(Arrays.asList(nums[i], nums[left], nums[right]));
                    while (left < right && nums[left] == nums[left+1]) left++;
                    while (left < right && nums[right] == nums[right-1]) right--;
                    left++;
                    right--;
                } else if (sum < 0) {
                    left++;
                } else {
                    right--;
                }
            }
        }
        return res;
    }
}`
                                }
                            ]
                        },
                        {
                            id: 'sort-colors',
                            title: 'Sort Colors (Dutch Flag)',
                            problemStatement: "Sort array with objects colored red, white, or blue (0, 1, 2) in-place so that objects of the same color are adjacent.",
                            problemLink: "https://leetcode.com/problems/sort-colors/",
                            sampleInput: "nums = [2,0,2,1,1,0]",
                            sampleOutput: "[0,0,1,1,2,2]",
                            approaches: [
                                {
                                    name: "Sorting",
                                    explanation: "Simply sort the array. This is valid but not optimal in terms of specific requirements (one-pass, O(1) space, linear time).",
                                    timeComplexity: "O(n log n)",
                                    spaceComplexity: "O(1)",
                                    code: `class Solution {
    public void sortColors(int[] nums) {
        Arrays.sort(nums);
    }
}`
                                },
                                {
                                    name: "Counting Sort (Two Pass)",
                                    explanation: "Count the number of 0s, 1s, and 2s in one pass. Then overwrite the array based on counts in a second pass.",
                                    timeComplexity: "O(2n)",
                                    spaceComplexity: "O(1)",
                                    code: `class Solution {
    public void sortColors(int[] nums) {
        int zeros = 0, ones = 0, twos = 0;
        for (int n : nums) {
            if (n == 0) zeros++;
            else if (n == 1) ones++;
            else twos++;
        }
        
        int i = 0;
        while (zeros-- > 0) nums[i++] = 0;
        while (ones-- > 0) nums[i++] = 1;
        while (twos-- > 0) nums[i++] = 2;
    }
}`
                                },
                                {
                                    name: "Three Pointers",
                                    explanation: "REAL WORLD ANALOGY: Separating laundry into 3 bins: Whites (0), Colors (1), and Darks (2). You stand in the middle. If you see white, throw it to the left bin. If dark, throw it to the right bin. If color, leave it.\n\nTECHNICAL: 'low' pointer for 0s, 'high' for 2s, 'mid' scanner.",
                                    timeComplexity: "O(n)",
                                    spaceComplexity: "O(1)",
                                    code: `class Solution {
    public void sortColors(int[] nums) {
        int low = 0, mid = 0, high = nums.length - 1;
        
        while (mid <= high) {
            if (nums[mid] == 0) {
                swap(nums, low, mid);
                low++;
                mid++;
            } else if (nums[mid] == 1) {
                mid++;
            } else { // nums[mid] == 2
                swap(nums, mid, high);
                high--;
            }
        }
    }
    
    private void swap(int[] nums, int i, int j) {
        int temp = nums[i];
        nums[i] = nums[j];
        nums[j] = temp;
    }
}`
                                }
                            ]
                        },
                        {
                            id: 'move-zeroes',
                            title: 'Move Zeroes',
                            problemStatement: "Move all 0s to the end of the array while maintaining the relative order of the non-zero elements.",
                            problemLink: "https://leetcode.com/problems/move-zeroes/",
                            sampleInput: "nums = [0,1,0,3,12]",
                            sampleOutput: "[1,3,12,0,0]",
                            approaches: [
                                {
                                    name: "New Array (Brute Force)",
                                    explanation: "Create a new array. Iterate through original, if non-zero, add to new array. Zeros are naturally left as default 0s at the end.",
                                    timeComplexity: "O(n)",
                                    spaceComplexity: "O(n)",
                                    code: `class Solution {
    public void moveZeroes(int[] nums) {
        int[] result = new int[nums.length];
        int idx = 0;
        for (int num : nums) {
            if (num != 0) result[idx++] = num;
        }
        for (int i = 0; i < nums.length; i++) {
            nums[i] = result[i];
        }
    }
}`
                                },
                                {
                                    name: "Partitioning",
                                    explanation: "REAL WORLD ANALOGY: Like unpacking a box of books. You take out only the good books (non-zeros) and place them on the shelf from left to right. Once you're out of good books, the rest of the shelf is empty space (zeros).\n\nTECHNICAL: 'pos' pointer tracks where the next non-zero should go.",
                                    timeComplexity: "O(n)",
                                    spaceComplexity: "O(1)",
                                    code: `class Solution {
    public void moveZeroes(int[] nums) {
        int pos = 0;
        for (int num : nums) {
            if (num != 0) {
                nums[pos++] = num;
            }
        }
        while (pos < nums.length) {
            nums[pos++] = 0;
        }
    }
}`
                                }
                            ]
                        }
                    ]
                },
                {
                    id: 'sliding-window-arrays',
                    title: 'Sliding Window',
                    questions: [
                        {
                            id: 'min-size-subarray-sum',
                            title: 'Minimum Size Subarray Sum',
                            problemStatement: "Find the minimal length of a subarray whose sum is greater than or equal to target.",
                            problemLink: "https://leetcode.com/problems/minimum-size-subarray-sum/",
                            sampleInput: "target = 7, nums = [2,3,1,2,4,3]",
                            sampleOutput: "2 ([4,3])",
                            approaches: [
                                {
                                    name: "Brute Force",
                                    explanation: "Find the sum of all possible subarrays and find the minimum length one with sum >= target.",
                                    timeComplexity: "O(n²)",
                                    spaceComplexity: "O(1)",
                                    code: `class Solution {
    public int minSubArrayLen(int target, int[] nums) {
        int minLen = Integer.MAX_VALUE;
        for (int i = 0; i < nums.length; i++) {
            int sum = 0;
            for (int j = i; j < nums.length; j++) {
                sum += nums[j];
                if (sum >= target) {
                    minLen = Math.min(minLen, j - i + 1);
                    break; 
                }
            }
        }
        return minLen == Integer.MAX_VALUE ? 0 : minLen;
    }
}`
                                },
                                {
                                    name: "Sliding Window",
                                    explanation: "REAL WORLD ANALOGY: Like an accordion. You stretch it out (expand right) until you hit the target note. Then you squeeze it in from the back (shrink left) as much as possible while still holding the note.\n\nTECHNICAL: Expand right until sum >= target, then shrink left to optimize.",
                                    timeComplexity: "O(n)",
                                    spaceComplexity: "O(1)",
                                    code: `class Solution {
    public int minSubArrayLen(int target, int[] nums) {
        int left = 0;
        int sum = 0;
        int minLen = Integer.MAX_VALUE;
        
        for (int right = 0; right < nums.length; right++) {
            sum += nums[right];
            
            while (sum >= target) {
                minLen = Math.min(minLen, right - left + 1);
                sum -= nums[left++];
            }
        }
        return minLen == Integer.MAX_VALUE ? 0 : minLen;
    }
}`
                                }
                            ]
                        },
                        {
                            id: 'max-consecutive-ones-iii',
                            title: 'Max Consecutive Ones III',
                            problemStatement: "Given a binary array nums and an integer k, return the maximum number of consecutive 1's in the array if you can flip at most k 0's.",
                            problemLink: "https://leetcode.com/problems/max-consecutive-ones-iii/",
                            sampleInput: "nums = [1,1,1,0,0,0,1,1,1,1,0], k = 2",
                            sampleOutput: "6",
                            approaches: [
                                {
                                    name: "Brute Force",
                                    explanation: "Check every subarray using nested loops. IsValid function counts zeros.",
                                    timeComplexity: "O(n²)",
                                    spaceComplexity: "O(1)",
                                    code: `class Solution {
    public int longestOnes(int[] nums, int k) {
        int max = 0;
        for (int i = 0; i < nums.length; i++) {
            int zeros = 0;
            for (int j = i; j < nums.length; j++) {
                if (nums[j] == 0) zeros++;
                if (zeros <= k) max = Math.max(max, j - i + 1);
                else break;
            }
        }
        return max;
    }
}`
                                },
                                {
                                    name: "Sliding Window",
                                    explanation: "REAL WORLD ANALOGY: Imagine a budget of K 'mistake passes'. You walk down a path (array). Every time you see a 0, you use a pass. If you run out of passes, you must leave the path from the start until you recover a pass.\n\nTECHNICAL: Window [l, r] can have at most k zeros.",
                                    timeComplexity: "O(n)",
                                    spaceComplexity: "O(1)",
                                    code: `class Solution {
    public int longestOnes(int[] nums, int k) {
        int left = 0, right = 0;
        int zeros = 0;
        int max = 0;
        
        while(right < nums.length) {
            if(nums[right] == 0) zeros++;
            
            while(zeros > k) {
                if(nums[left] == 0) zeros--;
                left++;
            }
            max = Math.max(max, right - left + 1);
            right++;
        }
        return max;
    }
}`
                                }
                            ]
                        }
                    ]
                },
                {
                    id: 'hashing-prefix-sum',
                    title: 'Hashing / Prefix Sum',
                    questions: [
                        {
                            id: 'contains-duplicate',
                            title: 'Contains Duplicate',
                            problemLink: "https://leetcode.com/problems/contains-duplicate/",
                            problemStatement: "Return true if any value appears at least twice in the array.",
                            sampleInput: "nums = [1,2,3,1]",
                            sampleOutput: "true",
                            approaches: [
                                {
                                    name: "HashSet",
                                    explanation: "REAL WORLD ANALOGY: Like rolling call in a class. As each student says 'Present', you check your list. If someone says 'Present' but is already checked off, you have a duplicate.\n\nTECHNICAL: Add to Set. If add() returns false, it's a duplicate.",
                                    timeComplexity: "O(n)",
                                    spaceComplexity: "O(n)",
                                    code: `class Solution {
    public boolean containsDuplicate(int[] nums) {
        Set<Integer> set = new HashSet<>();
        for (int num : nums) {
            if (!set.add(num)) return true;
        }
        return false;
    }
}`
                                }
                            ]
                        },
                        {
                            id: 'product-except-self',
                            title: 'Product of Array Except Self',
                            problemLink: "https://leetcode.com/problems/product-of-array-except-self/",
                            problemStatement: "Return an array where output[i] is the product of all elements of nums except nums[i]. Do it without division in O(n).",
                            sampleInput: "nums = [1,2,3,4]",
                            sampleOutput: "[24,12,8,6]",
                            approaches: [
                                {
                                    name: "Left and Right Pass",
                                    explanation: "REAL WORLD ANALOGY: Imagine standing in a line of people. To know the product of everyone ELSE, you need the product of everyone to your left AND everyone to your right.\n\nTECHNICAL: Compute Prefix Products (Left) and Suffix Products (Right), then multiply them.",
                                    timeComplexity: "O(n)",
                                    spaceComplexity: "O(1)",
                                    code: `class Solution {
    public int[] productExceptSelf(int[] nums) {
        int n = nums.length;
        int[] res = new int[n];
        
        // Left Pass
        res[0] = 1;
        for (int i = 1; i < n; i++) {
            res[i] = res[i - 1] * nums[i - 1];
        }
        
        // Right Pass (on the fly)
        int rightProduct = 1;
        for (int i = n - 1; i >= 0; i--) {
            res[i] = res[i] * rightProduct;
            rightProduct *= nums[i];
        }
        return res;
    }
}`
                                }
                            ]
                        },
                        {
                            id: 'subarray-sum-equals-k',
                            title: 'Subarray Sum Equals K',
                            problemLink: "https://leetcode.com/problems/subarray-sum-equals-k/",
                            problemStatement: "Return the total number of continuous subarrays whose sum equals to k.",
                            sampleInput: "nums = [1,1,1], k = 2",
                            sampleOutput: "2",
                            approaches: [
                                {
                                    name: "Prefix Sum HashMap",
                                    explanation: "REAL WORLD ANALOGY: Like tracking elevation on a hike. If you are currently at 1000ft, and you want to know how many times you were at an elevation exactly K feet lower (say 800ft), you check your logbook. If you were at 200ft twice before, then there are 2 segments that gained exactly 800ft.\n\nTECHNICAL: Map stores frequency of prefix sums. Check `map.get(currentSum - k)`.",
                                    timeComplexity: "O(n)",
                                    spaceComplexity: "O(n)",
                                    code: `class Solution {
    public int subarraySum(int[] nums, int k) {
        Map<Integer, Integer> map = new HashMap<>(); // Sum -> Count
        map.put(0, 1);
        int sum = 0;
        int count = 0;
        
        for (int num : nums) {
            sum += num;
            if (map.containsKey(sum - k)) {
                count += map.get(sum - k);
            }
            map.put(sum, map.getOrDefault(sum, 0) + 1);
        }
        return count;
    }
}`
                                }
                            ]
                        },
                        {
                            id: 'find-duplicates-array',
                            title: 'Find All Duplicates in an Array',
                            problemLink: "https://leetcode.com/problems/find-all-duplicates-in-an-array/",
                            problemStatement: "Integers are in range [1, n], each appears once or twice. Find all duplicates. O(n) Time, O(1) Space.",
                            sampleInput: "nums = [4,3,2,7,8,2,3,1]",
                            sampleOutput: "[2,3]",
                            approaches: [
                                {
                                    name: "Negative Marking",
                                    explanation: "REAL WORLD ANALOGY: Like marking visited houses with a flag. If you go to visit house #3, and find a flag there already, you know you've been sent to house #3 before.\n\nTECHNICAL: Use array indices as the 'houses'. Mark visited by negating value.",
                                    timeComplexity: "O(n)",
                                    spaceComplexity: "O(1)",
                                    code: `class Solution {
    public List<Integer> findDuplicates(int[] nums) {
        List<Integer> res = new ArrayList<>();
        for(int n : nums) {
            int index = Math.abs(n) - 1;
            if(nums[index] < 0) {
                res.add(Math.abs(n));
            } else {
                nums[index] = -nums[index];
            }
        }
        return res;
    }
}`
                                }
                            ]
                        }
                    ]
                },
                {
                    id: 'kadanes-algorithm',
                    title: "Kadane's Algorithm",
                    questions: [
                        {
                            id: 'maximum-subarray',
                            title: 'Maximum Subarray',
                            problemLink: "https://leetcode.com/problems/maximum-subarray/",
                            problemStatement: "Find the contiguous subarray which has the largest sum and return its sum.",
                            sampleInput: "nums = [-2,1,-3,4,-1,2,1,-5,4]",
                            sampleOutput: "6 ([4,-1,2,1])",
                            approaches: [
                                {
                                    name: "Brute Force",
                                    explanation: "Calculate the sum of every possible subarray and find the maximum.",
                                    timeComplexity: "O(n²)",
                                    spaceComplexity: "O(1)",
                                    code: `class Solution {
    public int maxSubArray(int[] nums) {
        int maxSum = Integer.MIN_VALUE;
        for (int i = 0; i < nums.length; i++) {
            int currentSum = 0;
            for (int j = i; j < nums.length; j++) {
                currentSum += nums[j];
                maxSum = Math.max(maxSum, currentSum);
            }
        }
        return maxSum;
    }
}`
                                },
                                {
                                    name: "Kadane's Algorithm",
                                    explanation: "REAL WORLD ANALOGY: Like a gambler on a streak. If your current running earnings drop below zero, you are better off resetting and starting a fresh streak from the next game.\n\nTECHNICAL: `curSum = max(n, curSum + n)`.",
                                    timeComplexity: "O(n)",
                                    spaceComplexity: "O(1)",
                                    code: `class Solution {
    public int maxSubArray(int[] nums) {
        int curSum = nums[0];
        int maxSum = nums[0];
        
        for (int i = 1; i < nums.length; i++) {
            curSum = Math.max(nums[i], curSum + nums[i]);
            maxSum = Math.max(maxSum, curSum);
        }
        return maxSum;
    }
}`
                                }
                            ]
                        },
                        {
                            id: 'maximum-product-subarray',
                            title: 'Maximum Product Subarray',
                            problemLink: "https://leetcode.com/problems/maximum-product-subarray/",
                            problemStatement: "Find the contiguous subarray which has the largest product.",
                            sampleInput: "nums = [2,3,-2,4]",
                            sampleOutput: "6",
                            approaches: [
                                {
                                    name: "Brute Force",
                                    explanation: "Calculate the product of every possible subarray and find the maximum.",
                                    timeComplexity: "O(n²)",
                                    spaceComplexity: "O(1)",
                                    code: `class Solution {
    public int maxProduct(int[] nums) {
        int maxP = Integer.MIN_VALUE;
        for (int i = 0; i < nums.length; i++) {
            int currentP = 1;
            for (int j = i; j < nums.length; j++) {
                currentP *= nums[j];
                maxP = Math.max(maxP, currentP);
            }
        }
        return maxP;
    }
}`
                                },
                                {
                                    name: "Min/Max Tracking",
                                    explanation: "REAL WORLD ANALOGY: A negative number is a plot twist. It can turn a huge failure (very negative number) into a massive success (huge positive) instantly. You must track both your biggest win and biggest loss potential.\n\nTECHNICAL: Track curMax and curMin. Swap them if current number is negative.",
                                    timeComplexity: "O(n)",
                                    spaceComplexity: "O(1)",
                                    code: `class Solution {
    public int maxProduct(int[] nums) {
        int res = nums[0];
        int curMax = nums[0];
        int curMin = nums[0];
        
        for (int i = 1; i < nums.length; i++) {
            int n = nums[i];
            int tempMax = curMax;
            
            curMax = Math.max(n, Math.max(n * curMax, n * curMin));
            curMin = Math.min(n, Math.min(n * tempMax, n * curMin));
            
            res = Math.max(res, curMax);
        }
        return res;
    }
}`
                                }
                            ]
                        }
                    ]
                },
                {
                    id: 'matrix-2d-array',
                    title: 'Matrix (2D Array)',
                    questions: [
                        {
                            id: 'rotate-image',
                            title: 'Rotate Image',
                            problemLink: "https://leetcode.com/problems/rotate-image/",
                            problemStatement: "Rotate an n x n 2D matrix by 90 degrees (clockwise) in-place.",
                            sampleInput: "[[1,2,3],[4,5,6],[7,8,9]]",
                            sampleOutput: "[[7,4,1],[8,5,2],[9,6,3]]",
                            approaches: [
                                {
                                    name: "Transpose & Reverse",
                                    explanation: "REAL WORLD ANALOGY: Turning a square photo frame. Physically, you can flip it along the diagonal (Transpose), then flip it left-to-right (Reverse) to achieve a 90-degree turn.\n\nTECHNICAL: Transpose (swap[i][j], [j][i]) then Reverse each row.",
                                    timeComplexity: "O(n²)",
                                    spaceComplexity: "O(1)",
                                    code: `class Solution {
    public void rotate(int[][] matrix) {
        int n = matrix.length;
        
        // 1. Transpose
        for(int i = 0; i < n; i++) {
            for(int j = i; j < n; j++) {
                int temp = matrix[i][j];
                matrix[i][j] = matrix[j][i];
                matrix[j][i] = temp;
            }
        }
        
        // 2. Reverse Rows
        for(int i = 0; i < n; i++) {
            for(int j = 0; j < n / 2; j++) {
                int temp = matrix[i][j];
                matrix[i][j] = matrix[i][n - 1 - j];
                matrix[i][n - 1 - j] = temp;
            }
        }
    }
}`
                                }
                            ]
                        },
                        {
                            id: 'set-matrix-zeroes',
                            title: 'Set Matrix Zeroes',
                            problemLink: "https://leetcode.com/problems/set-matrix-zeroes/",
                            problemStatement: "If an element is 0, set its entire row and column to 0. Do it in-place.",
                            sampleInput: "[[1,1,1],[1,0,1],[1,1,1]]",
                            sampleOutput: "[[1,0,1],[0,0,0],[1,0,1]]",
                            approaches: [
                                {
                                    name: "Use First Row/Col as Flags",
                                    explanation: "REAL WORLD ANALOGY: Like a virus infection log. Instead of a separate notebook, written on the headers of each row and column 'INFECTED'. Later, you sweep through and quarantine the rows marked 'INFECTED'.\n\nTECHNICAL: Use matrix[i][0] and matrix[0][j] as markers.",
                                    timeComplexity: "O(m*n)",
                                    spaceComplexity: "O(1)",
                                    code: `class Solution {
    public void setZeroes(int[][] matrix) {
        boolean col0 = false;
        int rows = matrix.length;
        int cols = matrix[0].length;
        
        for (int i = 0; i < rows; i++) {
            if (matrix[i][0] == 0) col0 = true;
            for (int j = 1; j < cols; j++) {
                if (matrix[i][j] == 0) {
                    matrix[i][0] = 0;
                    matrix[0][j] = 0;
                }
            }
        }
        
        for (int i = rows - 1; i >= 0; i--) {
            for (int j = cols - 1; j >= 1; j--) {
                if (matrix[i][0] == 0 || matrix[0][j] == 0) {
                    matrix[i][j] = 0;
                }
            }
            if (col0) matrix[i][0] = 0;
        }
    }
}`
                                }
                            ]
                        },
                        {
                            id: 'spiral-matrix',
                            title: 'Spiral Matrix',
                            problemLink: "https://leetcode.com/problems/spiral-matrix/",
                            problemStatement: "Return all elements of the matrix in spiral order.",
                            sampleInput: "[[1,2,3],[4,5,6],[7,8,9]]",
                            sampleOutput: "[1,2,3,6,9,8,7,4,5]",
                            approaches: [
                                {
                                    name: "Simulation",
                                    explanation: "REAL WORLD ANALOGY: Like peeling an orange or walking into a snail shell. You walk right until the wall, then turn down, then left, then up, constantly shrinking your available area.\n\nTECHNICAL: Maintain 4 boundaries (top, bottom, left, right).",
                                    timeComplexity: "O(m*n)",
                                    spaceComplexity: "O(1)",
                                    code: `class Solution {
    public List<Integer> spiralOrder(int[][] matrix) {
        List<Integer> res = new ArrayList<>();
        int top = 0, bottom = matrix.length-1, left = 0, right = matrix[0].length-1;
        
        while(top <= bottom && left <= right) {
            // Right
            for(int i = left; i <= right; i++) res.add(matrix[top][i]);
            top++;
            
            // Down
            for(int i = top; i <= bottom; i++) res.add(matrix[i][right]);
            right--;
            
            // Left (Check collision)
            if(top <= bottom) {
                for(int i = right; i >= left; i--) res.add(matrix[bottom][i]);
                bottom--;
            }
            
            // Up (Check collision)
            if(left <= right) {
                for(int i = bottom; i >= top; i--) res.add(matrix[i][left]);
                left++;
            }
        }
        return res;
    }
}`
                                }
                            ]
                        }
                    ]
                },
                {
                    id: 'binary-search-arrays',
                    title: 'Binary Search (Arrays)',
                    questions: [
                        {
                            id: 'binary-search',
                            title: 'Binary Search',
                            problemLink: "https://leetcode.com/problems/binary-search/",
                            problemStatement: "Given a sorted array of distinct integers and a target value, return the index if the target is found. If not, return -1.",
                            sampleInput: "nums = [-1,0,3,5,9,12], target = 9",
                            sampleOutput: "4",
                            approaches: [
                                {
                                    name: "Standard iterative",
                                    explanation: "REAL WORLD ANALOGY: Like looking up a word in a dictionary. You open the middle. 'Apple' comes before 'Monkey' (mid), so you ignore the entire back half of the book and repeat with the front half.\n\nTECHNICAL: Compare mid with target. Eliminate half space.",
                                    timeComplexity: "O(log n)",
                                    spaceComplexity: "O(1)",
                                    code: `class Solution {
    public int search(int[] nums, int target) {
        int left = 0;
        int right = nums.length - 1;
        
        while (left <= right) {
            int mid = left + (right - left) / 2;
            if (nums[mid] == target) return mid;
            else if (nums[mid] < target) left = mid + 1;
            else right = mid - 1;
        }
        return -1;
    }
}`
                                }
                            ]
                        },
                        {
                            id: 'find-min-rotated',
                            title: 'Find Minimum in Rotated Sorted Array',
                            problemLink: "https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/",
                            problemStatement: "Find the minimum element in a rotated sorted array of unique elements. O(log n).",
                            sampleInput: "nums = [3,4,5,1,2]",
                            sampleOutput: "1",
                            approaches: [
                                {
                                    name: "Binary Search",
                                    explanation: "REAL WORLD ANALOGY: Imagine a broken staircase that goes up, then suddenly drops, then goes up again. You want the bottom of the drop. If the right side is higher than the middle, the 'drop' must be on the left (or you are on a normal slope). If the right is lower, the drop is on the right.\n\nTECHNICAL: Compare mid with right boundary.",
                                    timeComplexity: "O(log n)",
                                    spaceComplexity: "O(1)",
                                    code: `class Solution {
    public int findMin(int[] nums) {
        int left = 0;
        int right = nums.length - 1;
        
        while (left < right) {
            int mid = left + (right - left) / 2;
            if (nums[mid] > nums[right]) {
                left = mid + 1;
            } else {
                right = mid;
            }
        }
        return nums[left];
    }
}`
                                }
                            ]
                        },
                        {
                            id: 'search-rotated-array',
                            title: 'Search in Rotated Sorted Array',
                            problemLink: "https://leetcode.com/problems/search-in-rotated-sorted-array/",
                            problemStatement: "Search for target in a rotated sorted array. O(log n).",
                            sampleInput: "nums = [4,5,6,7,0,1,2], target = 0",
                            sampleOutput: "4",
                            approaches: [
                                {
                                    name: "Binary Search",
                                    explanation: "REAL WORLD ANALOGY: Navigating a two-part mountain range. First figure out which slope you are standing on (left or right). Then determine if the house (target) is on your slope or the other one.\n\nTECHNICAL: Identify sorted half. Check if target is in range.",
                                    timeComplexity: "O(log n)",
                                    spaceComplexity: "O(1)",
                                    code: `class Solution {
    public int search(int[] nums, int target) {
        int left = 0, right = nums.length - 1;
        while (left <= right) {
            int mid = left + (right - left) / 2;
            if (nums[mid] == target) return mid;
            
            // Left Sorted
            if (nums[left] <= nums[mid]) {
                if (nums[left] <= target && target < nums[mid]) right = mid - 1;
                else left = mid + 1;
            } else { // Right Sorted
                if (nums[mid] < target && target <= nums[right]) left = mid + 1;
                else right = mid - 1;
            }
        }
        return -1;
    }
}`
                                }
                            ]
                        }
                    ]
                },
                {
                    id: 'voting-algorithm',
                    title: 'Voting Algorithm',
                    questions: [
                        {
                            id: 'majority-element',
                            title: 'Majority Element',
                            problemLink: "https://leetcode.com/problems/majority-element/",
                            problemStatement: "The majority element is the element that appears more than ⌊n / 2⌋ times. You may assume that the majority element always exists in the array.",
                            sampleInput: "nums = [2,2,1,1,1,2,2]",
                            sampleOutput: "2",
                            approaches: [
                                {
                                    name: "Boyer-Moore Voting",
                                    explanation: "REAL WORLD ANALOGY: War of attrition. Imagine a room of soldiers from different armies. If two soldiers from different armies fight, they BOTH die. Since the Majority Army has more than 50% of people, they will correspond to the last survivor.\n\nTECHNICAL: Count variable. Increment if same, decrement if diff.",
                                    timeComplexity: "O(n)",
                                    spaceComplexity: "O(1)",
                                    code: `class Solution {
    public int majorityElement(int[] nums) {
        int count = 0;
        Integer candidate = null;
        
        for (int num : nums) {
            if (count == 0) {
                candidate = num;
            }
            count += (num == candidate) ? 1 : -1;
        }
        return candidate;
    }
}`
                                }
                            ]
                        }
                    ]
                }

                ,
                // NEW ARRAY SUBTOPIC: Intervals / Sorting
                {
                    id: 'intervals-sorting',
                    title: 'Intervals & Sorting',
                    questions: [
                        {
                            id: 'merge-intervals',
                            title: 'Merge Intervals',
                            problemLink: "https://leetcode.com/problems/merge-intervals/",
                            problemStatement: "Given an array of intervals where intervals[i] = [starti, endi], merge all overlapping intervals.",
                            sampleInput: "intervals = [[1,3],[2,6],[8,10],[15,18]]",
                            sampleOutput: "[[1,6],[8,10],[15,18]]",
                            approaches: [
                                {
                                    name: "Sorting + Iteration",
                                    explanation: "REAL WORLD ANALOGY: Like merging calendar meetings. If Meeting A is 1-3pm and Meeting B is 2-4pm, they overlap and become one 1-4pm block. Sort by start time first to make it linear scan.\n\nTECHNICAL: Sort by start. If current.start <= prev.end, merge. Else, add to result.",
                                    timeComplexity: "O(n log n)",
                                    spaceComplexity: "O(n)",
                                    code: `class Solution {
    public int[][] merge(int[][] intervals) {
        if (intervals.length <= 1) return intervals;
        Arrays.sort(intervals, (a, b) -> Integer.compare(a[0], b[0]));
        
        List<int[]> res = new ArrayList<>();
        int[] current = intervals[0];
        res.add(current);
        
        for (int[] interval : intervals) {
            if (interval[0] <= current[1]) { // Overlap
                current[1] = Math.max(current[1], interval[1]);
            } else { // No overlap
                current = interval;
                res.add(current);
            }
        }
        return res.toArray(new int[res.size()][]);
    }
}`
                                }
                            ]
                        },
                        {
                            id: 'merge-sorted-array',
                            title: 'Merge Sorted Array',
                            problemLink: "https://leetcode.com/problems/merge-sorted-array/",
                            problemStatement: "Merge nums2 into nums1 as one sorted array. nums1 has size m+n (buffer space at end).",
                            sampleInput: "nums1 = [1,2,3,0,0,0], m = 3, nums2 = [2,5,6], n = 3",
                            sampleOutput: "[1,2,2,3,5,6]",
                            approaches: [
                                {
                                    name: "Reverse Pointers",
                                    explanation: "REAL WORLD ANALOGY: Packing a suitcase with two piles of clothes. If you start from the bottom (end of array), you can place the largest items first without disturbing the smaller items already in the case (front of array).\n\nTECHNICAL: Compare nums1[p1] vs nums2[p2] and place larger at end.",
                                    timeComplexity: "O(m+n)",
                                    spaceComplexity: "O(1)",
                                    code: `class Solution {
    public void merge(int[] nums1, int m, int[] nums2, int n) {
        int p1 = m - 1;
        int p2 = n - 1;
        int p = m + n - 1; // End of nums1
        
        while (p2 >= 0) {
            if (p1 >= 0 && nums1[p1] > nums2[p2]) {
                nums1[p] = nums1[p1--];
            } else {
                nums1[p] = nums2[p2--];
            }
            p--;
        }
    }
}`
                                }
                            ]
                        },
                        {
                            id: 'find-duplicate-number',
                            title: 'Find the Duplicate Number',
                            problemLink: "https://leetcode.com/problems/find-the-duplicate-number/",
                            problemStatement: "Array of n+1 integers where each int is in range [1, n]. Find the one duplicate. (Floyd's Cycle)",
                            sampleInput: "nums = [1,3,4,2,2]",
                            sampleOutput: "2",
                            approaches: [
                                {
                                    name: "Floyd's Cycle Detection (Tortoise & Hare)",
                                    explanation: "REAL WORLD ANALOGY: This array is a secret linked list. `nums[i]` points to index `nums[i]`. Because there is a duplicate value, two indices point to the same location, creating a cycle. We find the start of the cycle.\n\nTECHNICAL: Slow/Fast pointers on values as indices.",
                                    timeComplexity: "O(n)",
                                    spaceComplexity: "O(1)",
                                    code: `class Solution {
    public int findDuplicate(int[] nums) {
        int slow = nums[0];
        int fast = nums[0];
        
        do {
            slow = nums[slow];
            fast = nums[fast]; // fast moves 2x
        } while (slow != fast);
        
        slow = nums[0];
        while (slow != fast) {
            slow = nums[slow];
            fast = nums[fast];
        }
        return slow;
    }
}`
                                }
                            ]
                        }
                    ]
                }
            ],
        },
        {
            id: 'strings',
            title: 'Strings',
            subTopics: [
                {
                    id: 'sliding-window-string',
                    title: 'Sliding Window',
                    questions: [
                        {
                            id: 'longest-substring-without-repeating',
                            title: 'Longest Substring Without Repeating Characters',
                            problemLink: "https://leetcode.com/problems/longest-substring-without-repeating-characters/",
                            problemStatement: "Given a string `s`, find the length of the longest substring without repeating characters.",
                            sampleInput: "s = \"abcabcbb\"",
                            sampleOutput: "3 (The answer is \"abc\")",
                            approaches: [
                                {
                                    name: "Sliding Window Set",
                                    explanation: "REAL WORLD ANALOGY: Like stringing a necklace with unique beads. You add beads one by one (Right pointer). If you pick a bead you already have, you must remove beads from the start of the necklace (Left pointer) until the duplicate is gone before you can proceed.\n\nTECHNICAL: HashSet tracks window chars.",
                                    timeComplexity: "O(n)",
                                    spaceComplexity: "O(min(m, n))",
                                    code: `class Solution {
    public int lengthOfLongestSubstring(String s) {
        Set<Character> set = new HashSet<>();
        int left = 0, right = 0, max = 0;
        
        while (right < s.length()) {
            if (!set.contains(s.charAt(right))) {
                set.add(s.charAt(right++));
                max = Math.max(max, set.size());
            } else {
                set.remove(s.charAt(left++));
            }
        }
        return max;
    }
}`
                                }
                            ]
                        },

                        {
                            id: 'minimum-window-substring',
                            title: 'Minimum Window Substring',
                            problemLink: "https://leetcode.com/problems/minimum-window-substring/",
                            problemStatement: "Given two strings s and t, return the minimum window substring of s such that every character in t (including duplicates) is included in the window.",
                            sampleInput: "s = \"ADOBECODEBANC\", t = \"ABC\"",
                            sampleOutput: "\"BANC\"",
                            approaches: [
                                {
                                    name: "Sliding Window",
                                    explanation: "REAL WORLD ANALOGY: Shopping list. You have a list of items (t) to buy. You walk down the aisle (s) picking up items. Once you have everything on your list (window valid), you try to shrink the list from the start to make the path shorter, while keeping everything essential.\n\nTECHNICAL: Map for 't'. Counter for valid chars. Expand right. Shrink left if valid.",
                                    timeComplexity: "O(n)",
                                    spaceComplexity: "O(1)",
                                    code: `class Solution {
    public String minWindow(String s, String t) {
        int[] map = new int[128];
        for (char c : t.toCharArray()) map[c]++;
        int counter = t.length(), begin = 0, end = 0, d = Integer.MAX_VALUE, head = 0;
        
        while (end < s.length()) {
            if (map[s.charAt(end++)]-- > 0) counter--;
            while (counter == 0) {
                if (end - begin < d) d = end - (head = begin);
                if (map[s.charAt(begin++)]++ == 0) counter++;
            }
        }
        return d == Integer.MAX_VALUE ? "" : s.substring(head, head + d);
    }
}`
                                }
                            ]
                        },
                        {
                            id: 'longest-repeating-character-replacement',
                            title: 'Longest Repeating Character Replacement',
                            problemLink: "https://leetcode.com/problems/longest-repeating-character-replacement/",
                            problemStatement: "You are given a string s and an integer k. You can choose any character of the string and change it to any other uppercase English character. You can perform this operation at most k times. Return the length of the longest substring containing the same letter you can get.",
                            sampleInput: "s = \"ABAB\", k = 2",
                            sampleOutput: "4",
                            approaches: [
                                {
                                    name: "Sliding Window",
                                    explanation: "REAL WORLD ANALOGY: Renovation budget. You want to make a wall all one color. You have budget to paint K bricks. You slide a window and check: (Window Size) - (Most Frequent Color) <= K. If yes, it's valid. If no, shrink window.\n\nTECHNICAL: track maxCount of any single char in window.",
                                    timeComplexity: "O(n)",
                                    spaceComplexity: "O(1)",
                                    code: `class Solution {
    public int characterReplacement(String s, int k) {
        int[] count = new int[26];
        int maxCount = 0;
        int left = 0;
        int maxLen = 0;
        
        for (int right = 0; right < s.length(); right++) {
            maxCount = Math.max(maxCount, ++count[s.charAt(right) - 'A']);
            while (right - left + 1 - maxCount > k) {
                count[s.charAt(left) - 'A']--;
                left++;
            }
            maxLen = Math.max(maxLen, right - left + 1);
        }
        return maxLen;
    }
}`
                                }
                            ]
                        },
                        {
                            id: 'permutation-in-string',
                            title: 'Permutation in String',
                            problemLink: "https://leetcode.com/problems/permutation-in-string/",
                            problemStatement: "Given two strings s1 and s2, return true if s2 contains a permutation of s1.",
                            sampleInput: "s1 = \"ab\", s2 = \"eidbaooo\"",
                            sampleOutput: "true",
                            approaches: [
                                {
                                    name: "Sliding Window Array",
                                    explanation: "REAL WORLD ANALOGY: Checking for a specific set of playing cards in a hand. You need exactly 1 Ace and 1 King (s1). You check every sequence of 2 cards (s2) to see if they match the count.\n\nTECHNICAL: Fixed window size s1.length(). Compare freq arrays.",
                                    timeComplexity: "O(n)",
                                    spaceComplexity: "O(1)",
                                    code: `class Solution {
    public boolean checkInclusion(String s1, String s2) {
        if (s1.length() > s2.length()) return false;
        int[] s1map = new int[26];
        int[] s2map = new int[26];
        for (int i = 0; i < s1.length(); i++) {
            s1map[s1.charAt(i) - 'a']++;
            s2map[s2.charAt(i) - 'a']++;
        }
        for (int i = 0; i < s2.length() - s1.length(); i++) {
            if (matches(s1map, s2map)) return true;
            s2map[s2.charAt(i + s1.length()) - 'a']++;
            s2map[s2.charAt(i) - 'a']--;
        }
        return matches(s1map, s2map);
    }
    private boolean matches(int[] s1map, int[] s2map) {
        for (int i = 0; i < 26; i++) {
            if (s1map[i] != s2map[i]) return false;
        }
        return true;
    }
}`
                                }
                            ]
                        }
                    ]
                }
                ,
                {
                    id: 'string-manipulation',
                    title: 'String Manipulation',
                    questions: [
                        {
                            id: 'reverse-string',
                            title: 'Reverse String',
                            problemStatement: "Write a function that reverses a string. The input string is given as an array of characters s. You must do this by modifying the input array in-place with O(1) extra memory.",
                            problemLink: "https://leetcode.com/problems/reverse-string/",
                            sampleInput: "s = [\"h\",\"e\",\"l\",\"l\",\"o\"]",
                            sampleOutput: "[\"o\",\"l\",\"l\",\"e\",\"h\"]",
                            approaches: [
                                {
                                    name: "Two Pointers",
                                    explanation: "REAL WORLD ANALOGY: Swapping seats. Persons at the ends swap, then the next inner pair, until the middle is reached.\n\nTECHNICAL: swap(s[left++], s[right--]) until left >= right.",
                                    timeComplexity: "O(n)",
                                    spaceComplexity: "O(1)",
                                    code: `class Solution {
    public void reverseString(char[] s) {
        int left = 0, right = s.length - 1;
        while (left < right) {
            char temp = s[left];
            s[left++] = s[right];
            s[right--] = temp;
        }
    }
}`
                                },
                                {
                                    name: "Recursive",
                                    explanation: "REAL WORLD ANALOGY: A line of people. First and last swap, then they tell the inner group 'Okay, your turn'.\n\nTECHNICAL: Helper function(start, end). Swap, then recurse(start+1, end-1).",
                                    timeComplexity: "O(n)",
                                    spaceComplexity: "O(n)",
                                    code: `class Solution {
    public void reverseString(char[] s) {
        helper(s, 0, s.length - 1);
    }
    private void helper(char[] s, int left, int right) {
        if (left >= right) return;
        char temp = s[left];
        s[left] = s[right];
        s[right] = temp;
        helper(s, left + 1, right - 1);
    }
}`
                                }
                            ]
                        },
                        {
                            id: 'reverse-words-string',
                            title: 'Reverse Words in a String',
                            problemStatement: "Given an input string s, reverse the order of the words. Return a string of the words in reverse order concatenated by a single space.",
                            problemLink: "https://leetcode.com/problems/reverse-words-in-a-string/",
                            sampleInput: "s = \"the sky is blue\"",
                            sampleOutput: "\"blue is sky the\"",
                            approaches: [
                                {
                                    name: "Built-in Split & Reverse",
                                    explanation: "REAL WORLD ANALOGY: Shuffling cards. You cut the deck into 'words', reverse the order of the pile, and put them back together.\n\nTECHNICAL: s.trim().split(\"\\\\s+\") -> Collections.reverse() -> String.join(\" \")",
                                    timeComplexity: "O(n)",
                                    spaceComplexity: "O(n)",
                                    code: `class Solution {
    public String reverseWords(String s) {
        String[] words = s.trim().split("\\\s+");
        StringBuilder out = new StringBuilder();
        for (int i = words.length - 1; i > 0; i--) {
            out.append(words[i]).append(" ");
        }
        return out.append(words[0]).toString();
    }
}`
                                },
                                {
                                    name: "Two Pointers (Manual Parsing)",
                                    explanation: "REAL WORLD ANALOGY: Reading from right to left. You scan backwards until you find the end of a word, then keep scanning to find the start. You copy that word, add a space, and repeat.\n\nTECHNICAL: Iterate i from n-1 to 0. Skip spaces. Mark clean word end. Move i to word start. Substring substring(i+1, end+1).",
                                    timeComplexity: "O(n)",
                                    spaceComplexity: "O(n)",
                                    code: `class Solution {
    public String reverseWords(String s) {
        StringBuilder sb = new StringBuilder();
        int n = s.length(), i = n - 1;
        
        while (i >= 0) {
            if (s.charAt(i) == ' ') {
                i--;
                continue;
            }
            int end = i;
            while (i >= 0 && s.charAt(i) != ' ') i--;
            if (sb.length() > 0) sb.append(" ");
            sb.append(s.substring(i + 1, end + 1));
        }
        return sb.toString();
    }
}`
                                },
                                {
                                    name: "Deque",
                                    explanation: "Using a Double-Ended Queue to push words to the front. As you read words L->R, pushing them to the HEAD of the deque automatically reverses their order.\n\nTECHNICAL: Deque.offerFirst(word). String.join(' ', deque).",
                                    timeComplexity: "O(n)",
                                    spaceComplexity: "O(n)",
                                    code: `class Solution {
    public String reverseWords(String s) {
        int left = 0, right = s.length() - 1;
        while (left <= right && s.charAt(left) == ' ') ++left;
        while (left <= right && s.charAt(right) == ' ') --right;

        Deque<String> d = new ArrayDeque();
        StringBuilder word = new StringBuilder();
        
        while (left <= right) {
            char c = s.charAt(left);
            if ((word.length() != 0) && (c == ' ')) {
                d.offerFirst(word.toString());
                word.setLength(0);
            } else if (c != ' ') {
                word.append(c);
            }
            ++left;
        }
        d.offerFirst(word.toString());
        return String.join(" ", d);
    }
}`
                                }
                            ]
                        },
                        {
                            id: 'valid-palindrome',
                            title: 'Valid Palindrome',
                            problemStatement: "A phrase is a palindrome if, after converting all uppercase letters into lowercase letters and removing all non-alphanumeric characters, it reads the same forward and backward.",
                            problemLink: "https://leetcode.com/problems/valid-palindrome/",
                            sampleInput: "s = \"A man, a plan, a canal: Panama\"",
                            sampleOutput: "true",
                            approaches: [
                                {
                                    name: "Two Pointers",
                                    explanation: "REAL WORLD ANALOGY: Mirror check. Look at the first and last valid characters. If they match, move inwards. If not, it's not a reflection.\n\nTECHNICAL: Skip non-alphanumeric chars. Compare charAt(left) vs charAt(right).",
                                    timeComplexity: "O(n)",
                                    spaceComplexity: "O(1)",
                                    code: `class Solution {
    public boolean isPalindrome(String s) {
        if (s.isEmpty()) return true;
        int left = 0, right = s.length() - 1;
        while (left < right) {
            char currFirst = s.charAt(left);
            char currLast = s.charAt(right);
            if (!Character.isLetterOrDigit(currFirst)) {
                left++;
            } else if (!Character.isLetterOrDigit(currLast)) {
                right--;
            } else {
                if (Character.toLowerCase(currFirst) != Character.toLowerCase(currLast)) {
                    return false;
                }
                left++;
                right--;
            }
        }
        return true;
    }
}`
                                },
                                {
                                    name: "Compare with Reverse",
                                    explanation: "REAL WORLD ANALOGY: Reading backwards. You write the sentence down, write it again backwards, and check if the two lines are identical.\n\nTECHNICAL: Filter string, reverse it, check equals().",
                                    timeComplexity: "O(n)",
                                    spaceComplexity: "O(n)",
                                    code: `class Solution {
    public boolean isPalindrome(String s) {
        StringBuilder builder = new StringBuilder();
        for (char c : s.toCharArray()) {
            if (Character.isLetterOrDigit(c)) {
                builder.append(Character.toLowerCase(c));
            }
        }
        String filtered = builder.toString();
        String reversed = builder.reverse().toString();
        return filtered.equals(reversed);
    }
}`
                                }
                            ]
                        },
                        {
                            id: 'implement-strstr',
                            title: 'Implement strStr()',
                            problemStatement: "Return the index of the first occurrence of needle in haystack, or -1 if needle is not part of haystack.",
                            problemLink: "https://leetcode.com/problems/find-the-index-of-the-first-occurrence-in-a-string/",
                            sampleInput: "haystack = \"sadbutsad\", needle = \"sad\"",
                            sampleOutput: "0",
                            approaches: [
                                {
                                    name: "Sliding Window / Built-in",
                                    explanation: "REAL WORLD ANALOGY: Placing a stencil (needle) over a text (haystack). Slide the stencil one char at a time checking if it matches perfectly.\n\nTECHNICAL: Loop i to n-m. Check substring equals, or use `indexOf`.",
                                    timeComplexity: "O(n*m)",
                                    spaceComplexity: "O(1)",
                                    code: `class Solution {
    public int strStr(String haystack, String needle) {
        for (int i = 0; i <= haystack.length() - needle.length(); i++) {
            if (haystack.substring(i, i + needle.length()).equals(needle)) {
                return i;
            }
        }
        return -1;
    }
}`
                                }
                            ]
                        },
                        {
                            id: 'run-length-encoding',
                            title: 'Run Length Encoding',
                            problemStatement: "Compress the string by replacing consecutive repeating characters with the character followed by the count. e.g. 'aaabbc' -> 'a3b2c1'.",
                            problemLink: "https://practice.geeksforgeeks.org/problems/run-length-encoding/1",
                            sampleInput: "s = \"aaabbc\"",
                            sampleOutput: "\"a3b2c1\"",
                            approaches: [
                                {
                                    name: "Linear Scan",
                                    explanation: "REAL WORLD ANALOGY: Taking inventory. Instead of writing 'Apple, Apple, Apple', you write 'Apple x3'.\n\nTECHNICAL: Iterate char i. If s[i] == s[i-1], count++. Else, append char+count, reset count.",
                                    timeComplexity: "O(n)",
                                    spaceComplexity: "O(n)",
                                    code: `class Solution {
    public String compressString(String s) {
        if (s == null || s.length() == 0) return "";
        StringBuilder sb = new StringBuilder();
        int count = 1;
        for (int i = 1; i < s.length(); i++) {
            if (s.charAt(i) == s.charAt(i - 1)) {
                count++;
            } else {
                sb.append(s.charAt(i - 1)).append(count);
                count = 1;
            }
        }
        sb.append(s.charAt(s.length() - 1)).append(count);
        return sb.toString();
    }
}`
                                }
                            ]
                        },
                        {
                            id: 'reverse-words-string',
                            title: 'Reverse Words in a String',
                            problemStatement: "Given an input string s, reverse the order of the words.",
                            problemLink: "https://leetcode.com/problems/reverse-words-in-a-string/",
                            sampleInput: "s = \"the sky is blue\"",
                            sampleOutput: "\"blue is sky the\"",
                            approaches: [
                                {
                                    name: "Split & Reverse",
                                    explanation: "REAL WORLD ANALOGY: Reorganizing a sentence on a magnetic fridge board. You take off each word magnet, put them in a pile, and then put them back on the board one by one starting from the top of the pile (Stack/Reverse).\n\nTECHNICAL: Split by spaces, reverse array, join.",
                                    timeComplexity: "O(n)",
                                    spaceComplexity: "O(n)",
                                    code: `class Solution {
    public String reverseWords(String s) {
        String[] words = s.trim().split("\\s+");
        StringBuilder sb = new StringBuilder();
        for (int i = words.length - 1; i >= 0; i--) {
            sb.append(words[i]);
            if (i > 0) sb.append(" ");
        }
        return sb.toString();
    }
}`
                                }
                            ]
                        },
                        {
                            id: 'longest-common-prefix',
                            title: 'Longest Common Prefix',
                            problemStatement: "Write a function to find the longest common prefix string amongst an array of strings.",
                            problemLink: "https://leetcode.com/problems/longest-common-prefix/",
                            sampleInput: "strs = [\"flower\",\"flow\",\"flight\"]",
                            sampleOutput: "\"fl\"",
                            approaches: [
                                {
                                    name: "Sort & Compare",
                                    explanation: "REAL WORLD ANALOGY: Finding the common ancestry of a group of people. You only need to compare the person with the 'oldest' name and the 'newest' name alphabetically. The common part between the extremes must be common to everyone in between.\n\nTECHNICAL: Sort array. Compare first and last string.",
                                    timeComplexity: "O(n log n)",
                                    spaceComplexity: "O(1)",
                                    code: `class Solution {
    public String longestCommonPrefix(String[] strs) {
        if (strs == null || strs.length == 0) return "";
        Arrays.sort(strs);
        String s1 = strs[0];
        String s2 = strs[strs.length - 1];
        int idx = 0;
        while(idx < s1.length() && idx < s2.length()){
            if(s1.charAt(idx) == s2.charAt(idx)){
                idx++;
            } else {
                break;
            }
        }
        return s1.substring(0, idx);
    }
}`
                                }
                            ]
                        },
                        {
                            id: 'roman-to-integer',
                            title: 'Roman to Integer',
                            problemStatement: "Convert a roman numeral to an integer.",
                            problemLink: "https://leetcode.com/problems/roman-to-integer/",
                            sampleInput: "s = \"MCMXCIV\"",
                            sampleOutput: "1994",
                            approaches: [
                                {
                                    name: "Right to Left Pass",
                                    explanation: "REAL WORLD ANALOGY: Reading a receipt where some items are refunds (negatives). Standard rule: If a small value appears before a large value (IV), it's a subtraction. Otherwise, it's addition.\n\nTECHNICAL: Map char to int. If cur < next, subtract cur.",
                                    timeComplexity: "O(n)",
                                    spaceComplexity: "O(1)",
                                    code: `class Solution {
    public int romanToInt(String s) {
        Map<Character, Integer> m = new HashMap<>();
        m.put('I', 1); m.put('V', 5); m.put('X', 10);
        m.put('L', 50); m.put('C', 100); m.put('D', 500); m.put('M', 1000);
        
        int ans = 0;
        for (int i = 0; i < s.length(); i++) {
            if (i < s.length() - 1 && m.get(s.charAt(i)) < m.get(s.charAt(i + 1))) {
                ans -= m.get(s.charAt(i));
            } else {
                ans += m.get(s.charAt(i));
            }
        }
        return ans;
    }
}`
                                }
                            ]
                        },
                        {
                            id: 'string-to-integer-atoi',
                            title: 'String to Integer (atoi)',
                            problemStatement: "Implement the myAtoi(string s) function, which converts a string to a 32-bit signed integer.",
                            problemLink: "https://leetcode.com/problems/string-to-integer-atoi/",
                            sampleInput: "s = \"   -42\"",
                            sampleOutput: "-42",
                            approaches: [
                                {
                                    name: "Deterministic State Machine",
                                    explanation: "REAL WORLD ANALOGY: Filling a form. 1. Ignore whitespace. 2. Check for sign (+/-). 3. Read digits. 4. Stop reading at non-digit. 5. Cap result within limits (INT_MAX/MIN).\n\nTECHNICAL: Scan char by char. Handle overflow check before adding digit.",
                                    timeComplexity: "O(n)",
                                    spaceComplexity: "O(1)",
                                    code: `class Solution {
    public int myAtoi(String s) {
        int index = 0, total = 0, sign = 1;
        
        // 1. Empty/Whitespace
        if(s.length() == 0) return 0;
        while(index < s.length() && s.charAt(index) == ' ') index++;
        if(index == s.length()) return 0;
        
        // 2. Sign
        if(s.charAt(index) == '+' || s.charAt(index) == '-') {
            sign = s.charAt(index) == '+' ? 1 : -1;
            index++;
        }
        
        // 3. Convert
        while(index < s.length()) {
            int digit = s.charAt(index) - '0';
            if(digit < 0 || digit > 9) break;
            
            // Overflow check
            if(Integer.MAX_VALUE/10 < total || Integer.MAX_VALUE/10 == total && Integer.MAX_VALUE %10 < digit)
                return sign == 1 ? Integer.MAX_VALUE : Integer.MIN_VALUE;
            
            total = total * 10 + digit;
            index++;
        }
        return total * sign;
    }
}`
                                }
                            ]
                        },
                        {
                            id: 'longest-palindromic-substring',
                            title: 'Longest Palindromic Substring',
                            problemStatement: "Given a string s, return the longest palindromic substring in s.",
                            problemLink: "https://leetcode.com/problems/longest-palindromic-substring/",
                            sampleInput: "s = \"babad\"",
                            sampleOutput: "\"bab\"",
                            approaches: [
                                {
                                    name: "Brute Force",
                                    explanation: "Check every possible substring to see if it's a palindrome. Track the longest one found.",
                                    timeComplexity: "O(n³)",
                                    spaceComplexity: "O(1)",
                                    code: `class Solution {
    public String longestPalindrome(String s) {
        if (s == null || s.length() < 1) return "";
        String longest = "";
        
        for (int i = 0; i < s.length(); i++) {
            for (int j = i; j < s.length(); j++) {
                if (isPalindrome(s, i, j)) {
                   if (j - i + 1 > longest.length()) {
                       longest = s.substring(i, j + 1);
                   }
                }
            }
        }
        return longest;
    }
    
    private boolean isPalindrome(String s, int start, int end) {
        while (start < end) {
            if (s.charAt(start++) != s.charAt(end--)) return false;
        }
        return true;
    }
}`
                                },
                                {
                                    name: "Expand Around Center",
                                    explanation: "REAL WORLD ANALOGY: Like throwing a stone in a pond. The ripples expand outwards. For each character (or gap between characters), assume it's the center of a palindrome and expand outwards until the symmetry breaks.\n\nTECHNICAL: For each i, expand (i, i) and (i, i+1).",
                                    timeComplexity: "O(n²)",
                                    spaceComplexity: "O(1)",
                                    code: `class Solution {
    public String longestPalindrome(String s) {
        if (s == null || s.length() < 1) return "";
        int start = 0, end = 0;
        
        for (int i = 0; i < s.length(); i++) {
            int len1 = expandAroundCenter(s, i, i);
            int len2 = expandAroundCenter(s, i, i + 1);
            int len = Math.max(len1, len2);
            if (len > end - start) {
                start = i - (len - 1) / 2;
                end = i + len / 2;
            }
        }
        return s.substring(start, end + 1);
    }
    
    private int expandAroundCenter(String s, int left, int right) {
        while (left >= 0 && right < s.length() && s.charAt(left) == s.charAt(right)) {
            left--;
            right++;
        }
        return right - left - 1;
    }
}`
                                }
                            ]
                        }
                    ]
                },
                {
                    id: 'sliding-window-strings',
                    title: 'Sliding Window (Strings)',
                    questions: [
                        {
                            id: 'longest-substring-without-repeating-characters',
                            title: 'Longest Substring Without Repeating Characters',
                            problemStatement: "Given a string s, find the length of the longest substring without repeating characters.",
                            problemLink: "https://leetcode.com/problems/longest-substring-without-repeating-characters/",
                            sampleInput: "s = \"abcabcbb\"",
                            sampleOutput: "3 (\"abc\")",
                            approaches: [
                                {
                                    name: "Sliding Window (Set/Map)",
                                    explanation: "REAL WORLD ANALOGY: Stretching a rubber band. You hold the left end and pull the right end. If you see a duplicate char inside, you must release the left end until the duplicate is gone.\n\nTECHNICAL: Map<Char, Index>. If s[right] in map, left = max(left, map.get(s[right]) + 1). Update maxLen.",
                                    timeComplexity: "O(n)",
                                    spaceComplexity: "O(min(n, m))",
                                    code: `class Solution {
    public int lengthOfLongestSubstring(String s) {
        Map<Character, Integer> map = new HashMap<>(); // Char -> Index
        int left = 0, maxLen = 0;
        for (int right = 0; right < s.length(); right++) {
            char c = s.charAt(right);
            if (map.containsKey(c)) {
                left = Math.max(left, map.get(c) + 1);
            }
            map.put(c, right);
            maxLen = Math.max(maxLen, right - left + 1);
        }
        return maxLen;
    }
}`
                                }
                            ]
                        },
                        {
                            id: 'longest-repeating-character-replacement',
                            title: 'Longest Repeating Character Replacement',
                            problemStatement: "You are given a string s and an integer k. You can replace at most k characters with any other char to make a substring of valid identical characters. Find max length.",
                            problemLink: "https://leetcode.com/problems/longest-repeating-character-replacement/",
                            sampleInput: "s = \"ABAB\", k = 2",
                            sampleOutput: "4",
                            approaches: [
                                {
                                    name: "Sliding Window + Max Freq",
                                    explanation: "REAL WORLD ANALOGY: Fixing a broken fence. You have limited (k) spare planks. You want the longest continuous section of 'Red' planks. You can only fix k 'Blue' planks to make them 'Red'. If (WindowLength - CountOfMajorityColor) > k, the window is invalid (too many broken planks to fix).\n\nTECHNICAL: Maintain window. Track maxFreq char in window. If (len - maxFreq > k), shrink left.",
                                    timeComplexity: "O(n)",
                                    spaceComplexity: "O(26)",
                                    code: `class Solution {
    public int characterReplacement(String s, int k) {
        int[] count = new int[26];
        int left = 0, maxFreq = 0, maxLen = 0;
        
        for (int right = 0; right < s.length(); right++) {
            maxFreq = Math.max(maxFreq, ++count[s.charAt(right) - 'A']);
            
            // If replacements needed > k, shrink window
            if ((right - left + 1) - maxFreq > k) {
                count[s.charAt(left) - 'A']--;
                left++;
            }
            maxLen = Math.max(maxLen, right - left + 1);
        }
        return maxLen;
    }
}`
                                }
                            ]
                        },
                        {
                            id: 'permutation-in-string',
                            title: 'Permutation in String',
                            problemStatement: "Given two strings s1 and s2, return true if s2 contains a permutation of s1.",
                            problemLink: "https://leetcode.com/problems/permutation-in-string/",
                            sampleInput: "s1 = \"ab\", s2 = \"eidbaooo\"",
                            sampleOutput: "true (\"ba\")",
                            approaches: [
                                {
                                    name: "Fixed Sliding Window",
                                    explanation: "REAL WORLD ANALOGY: Identification Card check. s1 is the ID. You slide a frame of size |s1| across s2. At each step, you check if the frame has the exact same character counts as the ID.\n\nTECHNICAL: Two frequency arrays (or one diff array). Slide window, add new char, remove old char, check match.",
                                    timeComplexity: "O(n)",
                                    spaceComplexity: "O(26)",
                                    code: `class Solution {
    public boolean checkInclusion(String s1, String s2) {
        if (s1.length() > s2.length()) return false;
        int[] s1map = new int[26];
        int[] s2map = new int[26];
        
        for (int i = 0; i < s1.length(); i++) {
            s1map[s1.charAt(i) - 'a']++;
            s2map[s2.charAt(i) - 'a']++;
        }
        
        for (int i = 0; i < s2.length() - s1.length(); i++) {
            if (matches(s1map, s2map)) return true;
            s2map[s2.charAt(i + s1.length()) - 'a']++;
            s2map[s2.charAt(i) - 'a']--;
        }
        return matches(s1map, s2map);
    }
    private boolean matches(int[] s1map, int[] s2map) {
        for (int i = 0; i < 26; i++) {
            if (s1map[i] != s2map[i]) return false;
        }
        return true;
    }
}`
                                }
                            ]
                        },
                        {
                            id: 'minimum-window-substring',
                            title: 'Minimum Window Substring',
                            problemStatement: "Given two strings s and t, return the minimum window substring of s such that every character in t (including duplicates) is included in the window.",
                            problemLink: "https://leetcode.com/problems/minimum-window-substring/",
                            sampleInput: "s = \"ADOBECODEBANC\", t = \"ABC\"",
                            sampleOutput: "\"BANC\"",
                            approaches: [
                                {
                                    name: "Sliding Window (Frequency Map)",
                                    explanation: "REAL WORLD ANALOGY: The Scavenger Hunt. You need to find items {A, B, C}. As you walk (expand right), you collect items. Once you have EVERYTHING, you try to walk forward from your starting point (shrink left) to exclude useless items while still keeping the set complete.\n\nTECHNICAL: Map<Char, Count>. 'Required' counter. Expand right -> decrement map. If count >= 0, required--. While required==0, update min, increment map[left], shrink.",
                                    timeComplexity: "O(n)",
                                    spaceComplexity: "O(128)",
                                    code: `class Solution {
    public String minWindow(String s, String t) {
        if (s.length() == 0 || t.length() == 0) return "";
        int[] map = new int[128];
        for (char c : t.toCharArray()) map[c]++;
        
        int start = 0, end = 0, minStart = 0, minLen = Integer.MAX_VALUE;
        int counter = t.length();
        
        while (end < s.length()) {
            final char c1 = s.charAt(end);
            if (map[c1] > 0) counter--;
            map[c1]--;
            end++;
            
            while (counter == 0) {
                if (end - start < minLen) {
                    minStart = start;
                    minLen = end - start;
                }
                final char c2 = s.charAt(start);
                map[c2]++;
                if (map[c2] > 0) counter++;
                start++;
            }
        }
        return minLen == Integer.MAX_VALUE ? "" : s.substring(minStart, minStart + minLen);
    }
}`
                                }
                            ]
                        }
                    ]
                },
                {
                    id: 'hashing-strings',
                    title: 'Hashing & Frequency',
                    questions: [
                        {
                            id: 'valid-anagram',
                            title: 'Valid Anagram',
                            problemStatement: "Given two strings s and t, return true if t is an anagram of s, and false otherwise.",
                            problemLink: "https://leetcode.com/problems/valid-anagram/",
                            sampleInput: "s = \"anagram\", t = \"nagaram\"",
                            sampleOutput: "true",
                            approaches: [
                                {
                                    name: "Frequency Array",
                                    explanation: "REAL WORLD ANALOGY: Counting ingredients. To check if two fruit salads are the same, you count the apples, bananas, and oranges in both. If the counts match, they are anagrams.\n\nTECHNICAL: Use int[26] to count chars in s (++), then t (--). Check all zero.",
                                    timeComplexity: "O(n)",
                                    spaceComplexity: "O(1)",
                                    code: `class Solution {
    public boolean isAnagram(String s, String t) {
        if (s.length() != t.length()) return false;
        int[] count = new int[26];
        for (char c : s.toCharArray()) count[c - 'a']++;
        for (char c : t.toCharArray()) count[c - 'a']--;
        for (int i : count) if (i != 0) return false;
        return true;
    }
}`
                                },
                                {
                                    name: "Sorting",
                                    explanation: "REAL WORLD ANALOGY: Organizing books. You arrange the letters of both words in alphabetical order. If they end up identical, they were anagrams.\n\nTECHNICAL: Convert to char array, Arrays.sort(), Arrays.equals().",
                                    timeComplexity: "O(n log n)",
                                    spaceComplexity: "O(n)",
                                    code: `class Solution {
    public boolean isAnagram(String s, String t) {
        if (s.length() != t.length()) return false;
        char[] sChars = s.toCharArray();
        char[] tChars = t.toCharArray();
        Arrays.sort(sChars);
        Arrays.sort(tChars);
        return Arrays.equals(sChars, tChars);
    }
}`
                                }
                            ]
                        },
                        {
                            id: 'group-anagrams',
                            title: 'Group Anagrams',
                            problemStatement: "Given an array of strings strs, group the anagrams together. You can return the answer in any order.",
                            problemLink: "https://leetcode.com/problems/group-anagrams/",
                            sampleInput: "strs = [\"eat\",\"tea\",\"tan\",\"ate\",\"nat\",\"bat\"]",
                            sampleOutput: "[[\"bat\"],[\"nat\",\"tan\"],[\"ate\",\"eat\",\"tea\"]]",
                            approaches: [
                                {
                                    name: "Sorted String Key",
                                    explanation: "REAL WORLD ANALOGY: Filing system. You categorize files by their 'canonical' form. 'eat', 'tea', 'ate' all become 'aet' when sorted. All 'aet' files go into the same folder.\n\nTECHNICAL: Map<String, List>. Sort each string as key.",
                                    timeComplexity: "O(NK log K)",
                                    spaceComplexity: "O(NK)",
                                    code: `class Solution {
    public List<List<String>> groupAnagrams(String[] strs) {
        Map<String, List<String>> map = new HashMap<>();
        for (String s : strs) {
            char[] ca = s.toCharArray();
            Arrays.sort(ca);
            String key = String.valueOf(ca);
            if (!map.containsKey(key)) map.put(key, new ArrayList<>());
            map.get(key).add(s);
        }
        return new ArrayList<>(map.values());
    }
}`
                                },
                                {
                                    name: "Frequency Count Key",
                                    explanation: "REAL WORLD ANALOGY: Barcode. Instead of sorting letters, you scan them and build a unique code (e.g., '1#0#2#...' for a,c,2b...). All items with the same barcode are grouped.\n\nTECHNICAL: Map<String, List>. Key is stringified char counts.",
                                    timeComplexity: "O(NK)",
                                    spaceComplexity: "O(NK)",
                                    code: `class Solution {
    public List<List<String>> groupAnagrams(String[] strs) {
        Map<String, List<String>> map = new HashMap<>();
        for (String s : strs) {
            int[] count = new int[26];
            for (char c : s.toCharArray()) count[c - 'a']++;
            
            StringBuilder sb = new StringBuilder();
            for (int i = 0; i < 26; i++) {
                sb.append('#');
                sb.append(count[i]);
            }
            String key = sb.toString();
            if (!map.containsKey(key)) map.put(key, new ArrayList<>());
            map.get(key).add(s);
        }
        return new ArrayList<>(map.values());
    }
}`
                                }
                            ]
                        },
                        {
                            id: 'first-unique-character',
                            title: 'First Unique Character',
                            problemStatement: "Given a string s, find the first non-repeating character in it and return its index. If it does not exist, return -1.",
                            problemLink: "https://leetcode.com/problems/first-unique-character-in-a-string/",
                            sampleInput: "s = \"leetcode\"",
                            sampleOutput: "0",
                            approaches: [
                                {
                                    name: "Frequency Map",
                                    explanation: "REAL WORLD ANALOGY: Roll call. First pass: Ask everyone to raise their hand (count occurrences). Second pass: Walk down the line and pick the first person who raised their hand exactly once.\n\nTECHNICAL: First pass count freqs. Second pass check count == 1.",
                                    timeComplexity: "O(n)",
                                    spaceComplexity: "O(1)",
                                    code: `class Solution {
    public int firstUniqChar(String s) {
        int[] freq = new int[26];
        for (char c : s.toCharArray()) freq[c - 'a']++;
        for (int i = 0; i < s.length(); i++) {
            if (freq[s.charAt(i) - 'a'] == 1) return i;
        }
        return -1;
    }
}`
                                }
                            ]
                        },
                        {
                            id: 'isomorphic-strings',
                            title: 'Isomorphic Strings',
                            problemStatement: "Given two strings s and t, determine if they are isomorphic. Two strings are isomorphic if the characters in s can be replaced to get t.",
                            problemLink: "https://leetcode.com/problems/isomorphic-strings/",
                            sampleInput: "s = \"egg\", t = \"add\"",
                            sampleOutput: "true",
                            approaches: [
                                {
                                    name: "Two Maps",
                                    explanation: "REAL WORLD ANALOGY: Secret code. 'e' maps to 'a', 'g' maps to 'd'. You must ensure 'a' doesn't already mean something else, and 'e' is not mapped to two things.\n\nTECHNICAL: Map S->T and T->S. Check consistency.",
                                    timeComplexity: "O(n)",
                                    spaceComplexity: "O(1)",
                                    code: `class Solution {
    public boolean isIsomorphic(String s, String t) {
        int[] m1 = new int[256];
        int[] m2 = new int[256];
        for (int i = 0; i < s.length(); i++) {
            if (m1[s.charAt(i)] != m2[t.charAt(i)]) return false;
            m1[s.charAt(i)] = i + 1;
            m2[t.charAt(i)] = i + 1;
        }
        return true;
    }
}`
                                }
                            ]
                        }
                    ]
                }
            ]
        },
        {
            id: 'linked-list',
            title: 'Linked List',
            subTopics: [
                {
                    id: 'std-linked-list',
                    title: 'Standard Operations',
                    questions: [
                        {
                            id: 'reverse-linked-list',
                            title: 'Reverse Linked List',
                            problemStatement: "Given the head of a singly linked list, reverse the list, and return the reversed list.",
                            problemLink: "https://leetcode.com/problems/reverse-linked-list/",
                            sampleInput: "head = [1,2,3,4,5]",
                            sampleOutput: "[5,4,3,2,1]",
                            approaches: [
                                {
                                    name: "Recursive",
                                    explanation: "Reverse the rest of the list first, then put the current node at the end.",
                                    timeComplexity: "O(n)",
                                    spaceComplexity: "O(n)",
                                    code: `class Solution {
    public ListNode reverseList(ListNode head) {
        if (head == null || head.next == null) return head;
        ListNode newHead = reverseList(head.next);
        head.next.next = head;
        head.next = null;
        return newHead;
    }
}`
                                },
                                {
                                    name: "Iterative",
                                    explanation: "REAL WORLD ANALOGY: Like U-turning a line of cars. Car A tracks Car B. You tell Car A to turn around and track NULL. Then you move to Car B and tell it to track Car A. Repeat.\n\nTECHNICAL: `next = curr.next; curr.next = prev; prev = curr; curr = next;`",
                                    timeComplexity: "O(n)",
                                    spaceComplexity: "O(1)",
                                    code: `class Solution {
    public ListNode reverseList(ListNode head) {
        ListNode prev = null;
        ListNode curr = head;
        while (curr != null) {
            ListNode next = curr.next;
            curr.next = prev;
            prev = curr;
            curr = next;
        }
        return prev;
    }
}`
                                }
                            ]
                        },
                        {
                            id: 'middle-linked-list',
                            title: 'Middle of the Linked List',
                            problemStatement: "Given the head of a singly linked list, return the middle node.",
                            problemLink: "https://leetcode.com/problems/middle-of-the-linked-list/",
                            sampleInput: "head = [1,2,3,4,5]",
                            sampleOutput: "[3,4,5]",
                            approaches: [
                                {
                                    name: "Two Pass (Count)",
                                    explanation: "Count total nodes first. Then traverse n/2 steps to find middle.",
                                    timeComplexity: "O(2n)",
                                    spaceComplexity: "O(1)",
                                    code: `class Solution {
    public ListNode middleNode(ListNode head) {
        int count = 0;
        ListNode curr = head;
        while (curr != null) {
            count++;
            curr = curr.next;
        }
        curr = head;
        for (int i = 0; i < count / 2; i++) {
            curr = curr.next;
        }
        return curr;
    }
}`
                                },
                                {
                                    name: "Slow & Fast Pointers",
                                    explanation: "REAL WORLD ANALOGY: Two runners on a track. The Fast runner runs 2x speed. When Fast hits the finish line, Start runner (1x speed) must be exactly at the halfway mark.\n\nTECHNICAL: `slow = slow.next; fast = fast.next.next;`",
                                    timeComplexity: "O(n)",
                                    spaceComplexity: "O(1)",
                                    code: `class Solution {
    public ListNode middleNode(ListNode head) {
        ListNode slow = head;
        ListNode fast = head;
        while (fast != null && fast.next != null) {
            slow = slow.next;
            fast = fast.next.next;
        }
        return slow;
    }
}`
                                }
                            ]
                        },
                        {
                            id: 'merge-two-sorted-lists',
                            title: 'Merge Two Sorted Lists',
                            problemStatement: "Merge two sorted linked lists and return it as a sorted list.",
                            problemLink: "https://leetcode.com/problems/merge-two-sorted-lists/",
                            sampleInput: "l1 = [1,2,4], l2 = [1,3,4]",
                            sampleOutput: "[1,1,2,3,4,4]",
                            approaches: [
                                {
                                    name: "Recursive",
                                    explanation: "Use the stack to merge.",
                                    timeComplexity: "O(n + m)",
                                    spaceComplexity: "O(n + m)",
                                    code: `class Solution {
    public ListNode mergeTwoLists(ListNode l1, ListNode l2) {
        if(l1 == null) return l2;
        if(l2 == null) return l1;
        if(l1.val < l2.val) {
            l1.next = mergeTwoLists(l1.next, l2);
            return l1;
        } else {
            l2.next = mergeTwoLists(l1, l2.next);
            return l2;
        }
    }
}`
                                },
                                {
                                    name: "Iterative Dummy Node",
                                    explanation: "REAL WORLD ANALOGY: Zipper logic. You have two sorted stacks of cards. You pick the smaller card from the top of either stack and place it in your new pile. Repeat until one stack is empty, then dump the rest.\n\nTECHNICAL: Use a dummy head. Compare l1.val vs l2.val.",
                                    timeComplexity: "O(n + m)",
                                    spaceComplexity: "O(1)",
                                    code: `class Solution {
    public ListNode mergeTwoLists(ListNode list1, ListNode list2) {
        ListNode dummy = new ListNode(0);
        ListNode tail = dummy;
        
        while(list1 != null && list2 != null) {
            if(list1.val < list2.val) {
                tail.next = list1;
                list1 = list1.next;
            } else {
                tail.next = list2;
                list2 = list2.next;
            }
            tail = tail.next;
        }
        if(list1 != null) tail.next = list1;
        if(list2 != null) tail.next = list2;
        return dummy.next;
    }
}`
                                }
                            ]
                        },
                        {
                            id: 'linked-list-cycle',
                            title: 'Linked List Cycle',
                            problemStatement: "Given head, the head of a linked list, determine if the linked list has a cycle in it.",
                            problemLink: "https://leetcode.com/problems/linked-list-cycle/",
                            sampleInput: "head = [3,2,0,-4], pos = 1",
                            sampleOutput: "true",
                            approaches: [
                                {
                                    name: "Floyd's Cycle Finding",
                                    explanation: "REAL WORLD ANALOGY: Racing on a track. If a fast runner and a slow runner race on a circle, the fast one will eventually lap the slow one.\n\nTECHNICAL: fast=fast.next.next; slow=slow.next;",
                                    timeComplexity: "O(n)",
                                    spaceComplexity: "O(1)",
                                    code: `class Solution {
    public boolean hasCycle(ListNode head) {
        ListNode slow = head, fast = head;
        while(fast != null && fast.next != null) {
            slow = slow.next;
            fast = fast.next.next;
            if(slow == fast) return true;
        }
        return false;
    }
}`
                                },
                                {
                                    name: "HashSet",
                                    explanation: "Remember where you've been. Store every node in a set.",
                                    timeComplexity: "O(n)",
                                    spaceComplexity: "O(n)",
                                    code: `class Solution {
    public boolean hasCycle(ListNode head) {
        Set<ListNode> visited = new HashSet<>();
        while (head != null) {
            if (visited.contains(head)) return true;
            visited.add(head);
            head = head.next;
        }
        return false;
    }
}`
                                }
                            ]
                        }
                    ]
                },
                {
                    id: 'advanced-linked-list',
                    title: 'Advanced Linked List',
                    questions: [
                        {
                            id: 'intersection-two-linked-lists',
                            title: 'Intersection of Two Linked Lists',
                            problemStatement: "Given the heads of two singly linked-lists headA and headB, return the node at which the two lists intersect. If the two linked lists have no intersection at all, return null.",
                            problemLink: "https://leetcode.com/problems/intersection-of-two-linked-lists/",
                            sampleInput: "intersectVal = 8, listA = [4,1,8,4,5], listB = [5,6,1,8,4,5]",
                            sampleOutput: "Reference of the node with value 8",
                            approaches: [
                                {
                                    name: "Two Pointers",
                                    explanation: "REAL WORLD ANALOGY: Two tracks of different lengths joining at a junction. If two runners start at different points and run at the same speed, they won't meet. BUT if they switch tracks when they finish their own track, they will travel exactly the same total distance (A+B vs B+A) and meet at the junction.\n\nTECHNICAL: a = a == null ? headB : a.next; b = b == null ? headA : b.next;",
                                    timeComplexity: "O(n + m)",
                                    spaceComplexity: "O(1)",
                                    code: `class Solution {
    public ListNode getIntersectionNode(ListNode headA, ListNode headB) {
        if(headA == null || headB == null) return null;
        ListNode a = headA;
        ListNode b = headB;
        while(a != b){
            a = a == null ? headB : a.next;
            b = b == null ? headA : b.next;
        }
        return a;
    }
}`
                                }
                            ]
                        },
                        {
                            id: 'copy-list-random-pointer',
                            title: 'Copy List with Random Pointer',
                            problemStatement: "Construct a deep copy of a linked list where each node contains an additional random pointer.",
                            problemLink: "https://leetcode.com/problems/copy-list-with-random-pointer/",
                            sampleInput: "head = [[7,null],[13,0],[11,4],[10,2],[1,0]]",
                            sampleOutput: "[[7,null],[13,0],[11,4],[10,2],[1,0]]",
                            approaches: [
                                {
                                    name: "Interweaving (O(1) Space)",
                                    explanation: "REAL WORLD ANALOGY: Cloning sheep. Instead of a separate pen, you attach the clone directly to the original sheep (Original -> Clone -> Next Original). Then you copy the 'random' traits by looking at the original's random's clone. Finally, separating them unzips the two lists.\n\nTECHNICAL: 1. A->A'->B->B'. 2. Copy random. 3. Unweave.",
                                    timeComplexity: "O(n)",
                                    spaceComplexity: "O(1)",
                                    code: `class Solution {
    public Node copyRandomList(Node head) {
        if (head == null) return null;
        
        // 1. Interweave
        Node curr = head;
        while (curr != null) {
            Node next = curr.next;
            curr.next = new Node(curr.val);
            curr.next.next = next;
            curr = next;
        }
        
        // 2. Copy Random
        curr = head;
        while (curr != null) {
            if (curr.random != null) {
                curr.next.random = curr.random.next;
            }
            curr = curr.next.next;
        }
        
        // 3. Unweave
        curr = head;
        Node newHead = head.next;
        Node copy = newHead;
        while (curr != null) {
            curr.next = curr.next.next;
            if (copy.next != null) copy.next = copy.next.next;
            curr = curr.next;
            copy = copy.next;
        }
        return newHead;
    }
}`
                                }
                            ]
                        },
                        {
                            id: 'flatten-multilevel-doubly-linked-list',
                            title: 'Flatten Multilevel Doubly Linked List',
                            problemStatement: "Flatten a multilevel doubly linked list where nodes also have a child pointer.",
                            problemLink: "https://leetcode.com/problems/flatten-a-multilevel-doubly-linked-list/",
                            sampleInput: "head = [1,2,3,4,5,6,null,null,null,7,8,9,10,null,null,11,12]",
                            sampleOutput: "[1,2,3,7,8,11,12,9,10,4,5,6]",
                            approaches: [
                                {
                                    name: "DFS (Stack)",
                                    explanation: "REAL WORLD ANALOGY: Reading a book with footnotes. You read the main text, see a footnote (child), jump to read it fully, then return to the main text. We simply link the footnote *between* the current word and the next word.\n\nTECHNICAL: If child exists, push next to stack, link child to next.",
                                    timeComplexity: "O(n)",
                                    spaceComplexity: "O(n)",
                                    code: `class Solution {
    public Node flatten(Node head) {
        if(head == null) return null;
        Node curr = head;
        while(curr != null) {
            if(curr.child != null) {
                Node next = curr.next;
                Node child = flatten(curr.child);
                curr.next = child;
                child.prev = curr;
                curr.child = null;
                if(next != null) {
                    while(child.next != null) child = child.next;
                    child.next = next;
                    next.prev = child;
                }
            }
            curr = curr.next;
        }
        return head;
    }
}`
                                }
                            ]
                        }
                        ,
                        {
                            id: 'remove-nth-node-from-end',
                            title: 'Remove Nth Node From End',
                            problemStatement: "Remove the nth node from the end of the list and return its head.",
                            problemLink: "https://leetcode.com/problems/remove-nth-node-from-end-of-list/",
                            sampleInput: "head = [1,2,3,4,5], n = 2",
                            sampleOutput: "[1,2,3,5]",
                            approaches: [
                                {
                                    name: "Two Pointers Gap",
                                    explanation: "REAL WORLD ANALOGY: Walking a dog on a fixed-length leash of size N. When the dog (Fast pointer) reaches the end of the path, the human (Slow pointer) is exactly N steps behind—right at the spot that needs checking.\n\nTECHNICAL: Move fast N steps ahead. Then move both until fast hits null.",
                                    timeComplexity: "O(n)",
                                    spaceComplexity: "O(1)",
                                    code: `class Solution {
    public ListNode removeNthFromEnd(ListNode head, int n) {
        ListNode dummy = new ListNode(0);
        dummy.next = head;
        ListNode slow = dummy;
        ListNode fast = dummy;
        
        for (int i = 0; i <= n; i++) fast = fast.next;
        
        while (fast != null) {
            slow = slow.next;
            fast = fast.next;
        }
        slow.next = slow.next.next;
        return dummy.next;
    }
}`
                                }
                            ]
                        },
                        {
                            id: 'add-two-numbers',
                            title: 'Add Two Numbers',
                            problemStatement: "You are given two non-empty linked lists representing two non-negative integers. The digits are stored in reverse order. Add the two numbers and return the sum.",
                            problemLink: "https://leetcode.com/problems/add-two-numbers/",
                            sampleInput: "l1 = [2,4,3], l2 = [5,6,4] (342 + 465)",
                            sampleOutput: "[7,0,8] (807)",
                            approaches: [
                                {
                                    name: "Elementary Math",
                                    explanation: "REAL WORLD ANALOGY: Old school manual addition on paper. You add column by column, carrying over the '1' if the sum > 9. Here, the 'paper' is the linked list nodes.\n\nTECHNICAL: Maintain 'carry'. Sum = v1 + v2 + carry.",
                                    timeComplexity: "O(max(m,n))",
                                    spaceComplexity: "O(max(m,n))",
                                    code: `class Solution {
    public ListNode addTwoNumbers(ListNode l1, ListNode l2) {
        ListNode dummy = new ListNode(0);
        ListNode curr = dummy;
        int carry = 0;
        
        while(l1 != null || l2 != null || carry > 0) {
            int val1 = (l1 != null) ? l1.val : 0;
            int val2 = (l2 != null) ? l2.val : 0;
            int sum = val1 + val2 + carry;
            
            carry = sum / 10;
            curr.next = new ListNode(sum % 10);
            curr = curr.next;
            
            if(l1 != null) l1 = l1.next;
            if(l2 != null) l2 = l2.next;
        }
        return dummy.next;
    }
}`
                                }
                            ]
                        }
                    ]
                },
                {
                    id: 'fast-slow-pointers',
                    title: 'Fast & Slow Pointers',
                    questions: [
                        {
                            id: 'linked-list-cycle',
                            title: 'Linked List Cycle',
                            problemStatement: "Given head, determine if the linked list has a cycle in it.",
                            sampleInput: "head = [3,2,0,-4], pos = 1",
                            sampleOutput: "true",
                            approaches: [
                                {
                                    name: "Floyd's Cycle Finding",
                                    explanation: "REAL WORLD ANALOGY: The Tortoise and the Hare. If running on a circular track, the fast runner will eventually lap the slow runner.",
                                    timeComplexity: "O(n)",
                                    spaceComplexity: "O(1)",
                                    code: `public class Solution {
    public boolean hasCycle(ListNode head) {
        ListNode slow = head, fast = head;
        while (fast != null && fast.next != null) {
            slow = slow.next;
            fast = fast.next.next;
            if (slow == fast) return true;
        }
        return false;
    }
}`
                                }
                            ]
                        },
                        {
                            id: 'palindrome-linked-list',
                            title: 'Palindrome Linked List',
                            problemStatement: "Given the head of a singly linked list, return true if it is a palindrome.",
                            problemLink: "https://leetcode.com/problems/palindrome-linked-list/",
                            sampleInput: "head = [1,2,2,1]",
                            sampleOutput: "true",
                            approaches: [
                                {
                                    name: "Find Mid + Reverse Half",
                                    explanation: "REAL WORLD ANALOGY: Folding a piece of paper. To check symmetry, you fold the paper in half (Find Middle), verify the edges match (Compare), and then unfold it back (standard practice to restore list).\n\nTECHNICAL: 1. Find Mid. 2. Reverse 2nd half. 3. Compare.",
                                    timeComplexity: "O(n)",
                                    spaceComplexity: "O(1)",
                                    code: `class Solution {
    public boolean isPalindrome(ListNode head) {
        if (head == null || head.next == null) return true;
        
        // Find Middle
        ListNode slow = head, fast = head;
        while (fast.next != null && fast.next.next != null) {
            slow = slow.next;
            fast = fast.next.next;
        }
        
        // Reverse Second Half
        ListNode secondHalf = reverse(slow.next);
        ListNode p1 = head;
        ListNode p2 = secondHalf;
        
        while (p2 != null) {
            if (p1.val != p2.val) return false;
            p1 = p1.next;
            p2 = p2.next;
        }
        return true;
    }
    
    ListNode reverse(ListNode head) {
        ListNode prev = null, curr = head;
        while (curr != null) {
            ListNode next = curr.next;
            curr.next = prev;
            prev = curr;
            curr = next;
        }
        return prev;
    }
}`
                                }
                            ]
                        },
                        {
                            id: 'intersection-of-two-linked-lists',
                            title: 'Intersection of Two Linked Lists',
                            problemStatement: "Given the heads of two singly linked-lists headA and headB, return the node at which the two lists intersect.",
                            sampleInput: "intersectVal = 8, listA = [4,1,8,4,5], listB = [5,6,1,8,4,5]",
                            sampleOutput: "Reference of the node with value = 8",
                            approaches: [
                                {
                                    name: "Two Pointers Difference",
                                    explanation: "REAL WORLD ANALOGY: Two trains on different tracks that merge into one shared track. To meet at the junction at the same time, if Train A assumes Train B's starting deficit (length difference) after reaching the end, they balance out.\n\nTECHNICAL: a = a.next, b = b.next. If null, switch to other head. They meet at intersection or null.",
                                    timeComplexity: "O(n + m)",
                                    spaceComplexity: "O(1)",
                                    code: `public class Solution {
    public ListNode getIntersectionNode(ListNode headA, ListNode headB) {
        if (headA == null || headB == null) return null;
        
        ListNode a = headA;
        ListNode b = headB;
        
        while (a != b) {
            a = (a == null) ? headB : a.next;
            b = (b == null) ? headA : b.next;
        }
        return a;
    }
}`
                                }
                            ]
                        }
                    ]
                }
            ]
        },
        {
            id: 'stack',
            title: 'Stack',
            subTopics: [
                {
                    id: 'stack-basics',
                    title: 'Standard Stack',
                    questions: [
                        {
                            id: 'valid-parentheses',
                            title: 'Valid Parentheses',
                            problemStatement: "Given a string `s` containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.",
                            problemLink: "https://leetcode.com/problems/valid-parentheses/",
                            sampleInput: "s = \"()[]{}\"",
                            sampleOutput: "true",
                            approaches: [
                                {
                                    name: "Stack Approach",
                                    explanation: "REAL WORLD ANALOGY: Like peeling an onion or Russian Dolls. The last layer you put on (opening bracket) must be the first layer you take off (matching closing bracket). Logic dictates LIFO (Last In First Out).\n\nTECHNICAL: Push opens, Pop checks closes.",
                                    timeComplexity: "O(n)",
                                    spaceComplexity: "O(n)",
                                    code: `class Solution {
    public boolean isValid(String s) {
        Stack<Character> stack = new Stack<>();
        for (char c : s.toCharArray()) {
            if (c == '(') stack.push(')');
            else if (c == '{') stack.push('}');
            else if (c == '[') stack.push(']');
            else if (stack.isEmpty() || stack.pop() != c) return false;
        }
        return stack.isEmpty();
    }
}`
                                }
                            ]
                        },
                        {
                            id: 'min-stack',
                            title: 'Min Stack',
                            problemStatement: "Design a stack that supports push, pop, top, and retrieving the minimum element in constant time.",
                            problemLink: "https://leetcode.com/problems/min-stack/",
                            sampleInput: "MinStack(); push(-2); push(0); push(-3); getMin();",
                            sampleOutput: "-3",
                            approaches: [
                                {
                                    name: "Two Stacks",
                                    explanation: "REAL WORLD ANALOGY: A stack of papers, but you also keep a 'cheat sheet' notebook on the side. Every time you add a paper, you write down the current minimum on your cheat sheet. When you remove a paper, you cross off the last entry in the notebook.\n\nTECHNICAL: Main stack + Min stack.",
                                    timeComplexity: "O(1)",
                                    spaceComplexity: "O(n)",
                                    code: `class MinStack {
    Stack<Integer> stack = new Stack<>();
    Stack<Integer> minStack = new Stack<>();

    public void push(int val) {
        stack.push(val);
        if (minStack.isEmpty() || val <= minStack.peek()) {
            minStack.push(val);
        }
    }
    
    public void pop() {
        if (stack.peek().equals(minStack.peek())) {
            minStack.pop();
        }
        stack.pop();
    }
    
    public int top() { return stack.peek(); }
    public int getMin() { return minStack.peek(); }
}`
                                }
                            ]
                        }
                    ]
                },
                {
                    id: 'monotonic-stack',
                    title: 'Monotonic Stack',
                    questions: [
                        {
                            id: 'next-greater-element',
                            title: 'Next Greater Element',
                            problemStatement: "The next greater element of some element x in an array is the first greater element that is to the right of x in the same array.",
                            problemLink: "https://leetcode.com/problems/next-greater-element-i/",
                            sampleInput: "nums1 = [4,1,2], nums2 = [1,3,4,2]",
                            sampleOutput: "[-1,3,-1]",
                            approaches: [
                                {
                                    name: "Monotonic Stack",
                                    explanation: "REAL WORLD ANALOGY: People standing in a line. If you are shorter than the person behind you, they block your view. The first person taller than you behind you is your 'Next Greater'. We process from back to front (or use stack to keep track of waiting people).\n\nTECHNICAL: Maintain decreasing stack. Loop. While stack.peek() < current, pop. Top is next greater.",
                                    timeComplexity: "O(n)",
                                    spaceComplexity: "O(n)",
                                    code: `class Solution {
    public int[] nextGreaterElement(int[] nums1, int[] nums2) {
        Map<Integer, Integer> map = new HashMap<>(); // val -> nextGreater
        Stack<Integer> stack = new Stack<>();
        
        for (int num : nums2) {
            while (!stack.isEmpty() && stack.peek() < num) {
                map.put(stack.pop(), num);
            }
            stack.push(num);
        }
        
        int[] res = new int[nums1.length];
        for (int i = 0; i < nums1.length; i++) {
            res[i] = map.getOrDefault(nums1[i], -1);
        }
        return res;
    }
}`
                                }
                            ]
                        },
                        {
                            id: 'daily-temperatures',
                            title: 'Daily Temperatures',
                            problemStatement: "Given an array of temperatures, return an array such that answer[i] is the number of days you have to wait after the ith day to get a warmer temperature.",
                            problemLink: "https://leetcode.com/problems/daily-temperatures/",
                            sampleInput: "temperatures = [73,74,75,71,69,72,76,73]",
                            sampleOutput: "[1,1,4,2,1,1,0,0]",
                            approaches: [
                                {
                                    name: "Monotonic Stack (Indices)",
                                    explanation: "REAL WORLD ANALOGY: Waiting for a warmer day. You put today's date in a 'waiting list'. If tomorrow is warmer, everyone on the waiting list who is colder than tomorrow gets their answer (1 day wait). If tomorrow is colder, they join the waiting list.\n\nTECHNICAL: Stack stores INDICES. If curr > temp[stack.peek()], pop and calc diff.",
                                    timeComplexity: "O(n)",
                                    spaceComplexity: "O(n)",
                                    code: `class Solution {
    public int[] dailyTemperatures(int[] temperatures) {
        int n = temperatures.length;
        int[] answer = new int[n];
        Stack<Integer> stack = new Stack<>(); // stores indices
        
        for (int i = 0; i < n; i++) {
            while (!stack.isEmpty() && temperatures[i] > temperatures[stack.peek()]) {
                int prevIndex = stack.pop();
                answer[prevIndex] = i - prevIndex;
            }
            stack.push(i);
        }
        return answer;
    }
}`
                                }
                            ]
                        },
                        {
                            id: 'largest-rectangle-histogram',
                            title: 'Largest Rectangle in Histogram',
                            problemStatement: "Given an array of integers heights representing the histogram's bar height where the width of each bar is 1, return the area of the largest rectangle in the histogram.",
                            problemLink: "https://leetcode.com/problems/largest-rectangle-in-histogram/",
                            sampleInput: "heights = [2,1,5,6,2,3]",
                            sampleOutput: "10",
                            approaches: [
                                {
                                    name: "Monotonic Stack (Limits)",
                                    explanation: "REAL WORLD ANALOGY: Finding the widest possible poster you can stick on a bumpy wall. For each bar, you want to know: how far left can I go before I hit a shorter bar? How far right?\n\nTECHNICAL: Stack stores indices. We find 'Previous Less Element' and 'Next Less Element' for every bar. Area = height * (right - left - 1).",
                                    timeComplexity: "O(n)",
                                    spaceComplexity: "O(n)",
                                    code: `class Solution {
    public int largestRectangleArea(int[] heights) {
        Stack<Integer> stack = new Stack<>();
        int maxArea = 0;
        int n = heights.length;
        
        for (int i = 0; i <= n; i++) {
            int h = (i == n) ? 0 : heights[i];
            while (!stack.isEmpty() && h < heights[stack.peek()]) {
                int height = heights[stack.pop()];
                int width = stack.isEmpty() ? i : i - stack.peek() - 1;
                maxArea = Math.max(maxArea, height * width);
            }
            stack.push(i);
        }
        return maxArea;
    }
}`
                                }
                            ]
                        }
                    ]
                },
                {
                    id: 'string-parsing-stack',
                    title: 'String Parsing & Decoders',
                    questions: [
                        {
                            id: 'simplify-path',
                            title: 'Simplify Path',
                            problemStatement: "Given an absolute path for a Unix-style file system, which begins with a slash '/', transform this path into its simplified canonical path.",
                            problemLink: "https://leetcode.com/problems/simplify-path/",
                            sampleInput: "path = \"/home//foo/\"",
                            sampleOutput: "\"/home/foo\"",
                            approaches: [
                                {
                                    name: "Stack",
                                    explanation: "REAL WORLD ANALOGY: Directory Navigation. You enter 'home', then you enter 'foo'. If you see '..', you go back one directory. If you see '.', you stay. If you see multiple slashes, ignore them. At the end, verify where you are.\n\nTECHNICAL: Split string by '/'. Iterate parts. Push valid names. Pop on '..'. Join with '/' at end.",
                                    timeComplexity: "O(n)",
                                    spaceComplexity: "O(n)",
                                    code: `class Solution {
    public String simplifyPath(String path) {
        Stack<String> stack = new Stack<>();
        String[] components = path.split("/");
        
        for (String dir : components) {
            if (dir.equals(".") || dir.isEmpty()) {
                continue;
            } else if (dir.equals("..")) {
                if (!stack.isEmpty()) {
                    stack.pop();
                }
            } else {
                stack.push(dir);
            }
        }
        
        StringBuilder result = new StringBuilder();
        for (String dir : stack) {
            result.append("/").append(dir);
        }
        
        return result.length() > 0 ? result.toString() : "/";
    }
}`
                                }
                            ]
                        },
                        {
                            id: 'decode-string',
                            title: 'Decode String',
                            problemStatement: "Given an encoded string, return its decoded string. The encoding rule is: k[encoded_string], where the encoded_string inside the square brackets is being repeated exactly k times.",
                            problemLink: "https://leetcode.com/problems/decode-string/",
                            sampleInput: "s = \"3[a]2[bc]\"",
                            sampleOutput: "\"aaabcbc\"",
                            approaches: [
                                {
                                    name: "Two Stacks",
                                    explanation: "REAL WORLD ANALOGY: Nested boxes. You open a box (push to stack) and find instructions 'Repeat x times'. You keep opening until you find the item. Then you pack it back up x times and put it in the previous box.\n\nTECHNICAL: Stack for counts, Stack for strings. On '[', push. On ']', pop and build.",
                                    timeComplexity: "O(maxK * n)",
                                    spaceComplexity: "O(m+n)",
                                    code: `class Solution {
    public String decodeString(String s) {
        Stack<Integer> countStack = new Stack<>();
        Stack<StringBuilder> stringStack = new Stack<>();
        StringBuilder currentString = new StringBuilder();
        int k = 0;
        
        for (char ch : s.toCharArray()) {
            if (Character.isDigit(ch)) {
                k = k * 10 + (ch - '0');
            } else if (ch == '[') {
                countStack.push(k);
                stringStack.push(currentString);
                currentString = new StringBuilder();
                k = 0;
            } else if (ch == ']') {
                StringBuilder decodedString = stringStack.pop();
                for (int currentK = countStack.pop(); currentK > 0; currentK--) {
                    decodedString.append(currentString);
                }
                currentString = decodedString;
            } else {
                currentString.append(ch);
            }
        }
        return currentString.toString();
    }
}`
                                }
                            ]
                        },
                        {
                            id: 'basic-calculator-ii',
                            title: 'Basic Calculator II',
                            problemStatement: "Given a string s which represents an expression, evaluate this expression.",
                            problemLink: "https://leetcode.com/problems/basic-calculator-ii/",
                            sampleInput: "s = \"3+2*2\"",
                            sampleOutput: "7",
                            approaches: [
                                {
                                    name: "Stack for Intermediates",
                                    explanation: "REAL WORLD ANALOGY: Order of operations (PEMDAS). Multiplication/Division happens before Addition/Subtraction. You process the high priority stuff immediately, and save the low priority stuff (on a stack) to add up later.\n\nTECHNICAL: Stack<Integer>. If op is +/-, push num. If */, pop, calc, push. Sum stack at end.",
                                    timeComplexity: "O(n)",
                                    spaceComplexity: "O(n)",
                                    code: `class Solution {
    public int calculate(String s) {
        Stack<Integer> stack = new Stack<>();
        int currentNumber = 0;
        char operation = '+';
        int len = s.length();
        
        for (int i = 0; i < len; i++) {
            char currentChar = s.charAt(i);
            if (Character.isDigit(currentChar)) {
                currentNumber = (currentNumber * 10) + (currentChar - '0');
            }
            if ((!Character.isDigit(currentChar) && !Character.isWhitespace(currentChar)) || i == len - 1) {
                if (operation == '-') {
                    stack.push(-currentNumber);
                } else if (operation == '+') {
                    stack.push(currentNumber);
                } else if (operation == '*') {
                    stack.push(stack.pop() * currentNumber);
                } else if (operation == '/') {
                    stack.push(stack.pop() / currentNumber);
                }
                operation = currentChar;
                currentNumber = 0;
            }
        }
        int result = 0;
        for (int num : stack) result += num;
        return result;
    }
}`
                                }
                            ]
                        }
                    ]
                }
            ]
        },
        {
            id: 'queue',
            title: 'Queue',
            subTopics: [
                {
                    id: 'bfs',
                    title: 'Breadth First Search',
                    questions: [
                        {
                            id: 'implement-stack-using-queues',
                            title: 'Implement Stack using Queues',
                            problemStatement: "Implement a last-in-first-out (LIFO) stack using only two queues.",
                            problemLink: "https://leetcode.com/problems/implement-stack-using-queues/",
                            sampleInput: "[\"MyStack\", \"push\", \"push\", \"top\", \"pop\", \"empty\"] \n[[], [1], [2], [], [], []]",
                            sampleOutput: "[null, null, null, 2, 2, false]",
                            approaches: [
                                {
                                    name: "One Queue Approach",
                                    explanation: "REAL WORLD ANALOGY: Re-arranging a deck of cards to pull from the bottom. Every time you place a card on top, you repeatedly take cards from the bottom and put them on top until the new card is effectively at the bottom.\n\nTECHNICAL: Push to Q, then rotate Q size-1 times.",
                                    timeComplexity: "Push O(n), Pop O(1)",
                                    spaceComplexity: "O(n)",
                                    code: `class MyStack {
    Queue<Integer> q;

    public MyStack() {
        q = new LinkedList<>();
    }
    
    public void push(int x) {
        q.add(x);
        for(int i = 0; i < q.size() - 1; i++) {
            q.add(q.remove());
        }
    }
    
    public int pop() {
        return q.remove();
    }
    
    public int top() {
        return q.peek();
    }
    
    public boolean empty() {
        return q.isEmpty();
    }
}`
                                }
                            ]
                        }
                    ]
                }
            ]
        },
        {
            id: 'tree',
            title: 'Tree',
            subTopics: [
                {
                    id: 'dfs-recursion',
                    title: 'DFS / Recursion',
                    questions: [
                        {
                            id: 'invert-binary-tree',
                            title: 'Invert Binary Tree',
                            problemStatement: "Given the root of a binary tree, invert the tree, and return its root.",
                            problemLink: "https://leetcode.com/problems/invert-binary-tree/",
                            sampleInput: "root = [4,2,7,1,3,6,9]",
                            sampleOutput: "[4,7,2,9,6,3,1]",
                            approaches: [
                                {
                                    name: "Recursive DFS",
                                    explanation: "REAL WORLD ANALOGY: A mirror reflection. For every node, the left child becomes the right child, and vice versa. It works recursively down to the leaves.\n\nTECHNICAL: Swap left/right, then recurse.",
                                    timeComplexity: "O(n)",
                                    spaceComplexity: "O(h)",
                                    code: `class Solution {
    public TreeNode invertTree(TreeNode root) {
        if (root == null) return null;
        
        TreeNode temp = root.left;
        root.left = root.right;
        root.right = temp;
        
        invertTree(root.left);
        invertTree(root.right);
        
        return root;
    }
}`
                                }
                            ]
                        }
                    ]
                }
            ]
        },
        {
            id: 'trie',
            title: 'Trie',
            subTopics: [
                {
                    id: 'prefix-tree',
                    title: 'Prefix Tree Construction',
                    questions: [
                        {
                            id: 'implement-trie',
                            title: 'Implement Trie (Prefix Tree)',
                            problemStatement: "A trie (pronounced as \"try\") is a search tree that works like a hash map for strings. Implement inserts, search (exact), and startsWith (prefix).",
                            problemLink: "https://leetcode.com/problems/implement-trie-prefix-tree/",
                            sampleInput: "insert(\"apple\"), search(\"apple\")",
                            sampleOutput: "true",
                            approaches: [
                                {
                                    name: "Node Structure Class",
                                    explanation: "REAL WORLD ANALOGY: Predictive text or a dictionary index. To find 'Apple', you go to 'A', then 'Ap', then 'App'. If you stop early ('App'), you know it's a prefix but not a whole word.\n\nTECHNICAL: Tree of 26 children array/map.",
                                    timeComplexity: "O(L)",
                                    spaceComplexity: "O(Keys)",
                                    code: `class Trie {
    class TrieNode {
        TrieNode[] children = new TrieNode[26];
        boolean isEnd = false;
    }
    
    TrieNode root;

    public Trie() {
        root = new TrieNode();
    }
    
    public void insert(String word) {
        TrieNode node = root;
        for (char c : word.toCharArray()) {
            if (node.children[c - 'a'] == null) {
                node.children[c - 'a'] = new TrieNode();
            }
            node = node.children[c - 'a'];
        }
        node.isEnd = true;
    }
    
    public boolean search(String word) {
        TrieNode node = root;
        for (char c : word.toCharArray()) {
            if (node.children[c - 'a'] == null) return false;
            node = node.children[c - 'a'];
        }
        return node.isEnd;
    }
    
    public boolean startsWith(String prefix) {
        TrieNode node = root;
        for (char c : prefix.toCharArray()) {
            if (node.children[c - 'a'] == null) return false;
            node = node.children[c - 'a'];
        }
        return true;
    }
}`
                                }
                            ]
                        }
                    ]
                }
            ]
        },
        {
            id: 'graph',
            title: 'Graph',
            subTopics: [
                {
                    id: 'graph-traversal',
                    title: 'Graph Traversal',
                    questions: [
                        {
                            id: 'number-of-islands',
                            title: 'Number of Islands',
                            problemStatement: "Given an m x n 2D binary grid grid which represents a map of '1's (land) and '0's (water), return the number of islands.",
                            problemLink: "https://leetcode.com/problems/number-of-islands/",
                            sampleInput: "grid = [[\"1\",\"1\",\"0\"],[\"1\",\"0\",\"0\"],[\"0\",\"0\",\"0\"]]",
                            sampleOutput: "1",
                            approaches: [
                                {
                                    name: "DFS (Flood Fill)",
                                    explanation: "REAL WORLD ANALOGY: Nuclear Chain Reaction. When you spot a piece of land ('1'), you drop a bomb there. The explosion spreads to all connected land ('1's), destroying them (turning to '0'). You count how many bombs you needed to destroy all land.\n\nTECHNICAL: Iterate grid. If '1', count++ and trigger DFS to sink island.",
                                    timeComplexity: "O(m*n)",
                                    spaceComplexity: "O(m*n)",
                                    code: `class Solution {
    public int numIslands(char[][] grid) {
        if (grid == null || grid.length == 0) return 0;
        int count = 0;
        for (int i = 0; i < grid.length; i++) {
            for (int j = 0; j < grid[0].length; j++) {
                if (grid[i][j] == '1') {
                    count++;
                    dfs(grid, i, j);
                }
            }
        }
        return count;
    }
    
    private void dfs(char[][] grid, int i, int j) {
        if (i < 0 || j < 0 || i >= grid.length || j >= grid[0].length || grid[i][j] == '0') {
            return;
        }
        grid[i][j] = '0'; // Sink the island
        dfs(grid, i+1, j);
        dfs(grid, i-1, j);
        dfs(grid, i, j+1);
        dfs(grid, i, j-1);
    }
}`
                                }
                            ]
                        }
                    ]
                }
            ]
        },
        {
            id: 'greedy',
            title: 'Greedy Algorithms',
            subTopics: [
                {
                    id: 'std-greedy',
                    title: 'Standard Greedy',
                    questions: [
                        {
                            id: 'n-meetings',
                            title: 'N Meetings in One Room',
                            problemStatement: "There is one meeting room and N meetings. Each meeting has a start and end time. Find the max number of meetings you can maximize.",
                            problemLink: "https://practice.geeksforgeeks.org/problems/n-meetings-in-one-room-1587115620/1",
                            sampleInput: "start = [1,3,0,5,8,5], end = [2,4,6,7,9,9]",
                            sampleOutput: "4",
                            approaches: [
                                {
                                    name: "Sort by End Time",
                                    explanation: "REAL WORLD ANALOGY: To finish as many tasks as possible in a day, you should always pick the task that finishes the EARLIEST. This leaves you the most remaining time for other tasks.\n\nTECHNICAL: Sort meetings by end time. Pick meeting if start > last_end.",
                                    timeComplexity: "O(n log n)",
                                    spaceComplexity: "O(n)",
                                    code: `class Meeting {
    int start, end, pos;
    Meeting(int start, int end, int pos) {
        this.start = start;
        this.end = end;
        this.pos = pos;
    }
}

class Solution {
    public static int maxMeetings(int start[], int end[], int n) {
        ArrayList<Meeting> meet = new ArrayList<>();
        for (int i = 0; i < n; i++)
            meet.add(new Meeting(start[i], end[i], i + 1));
            
        Collections.sort(meet, (a, b) -> a.end - b.end);
        
        int count = 1;
        int limit = meet.get(0).end;
        
        for (int i = 1; i < n; i++) {
            if (meet.get(i).start > limit) {
                limit = meet.get(i).end;
                count++;
            }
        }
        return count;
    }
}`
                                }
                            ]
                        },
                        {
                            id: 'minimum-platforms',
                            title: 'Minimum Platforms',
                            problemStatement: "Find the minimum number of platforms required for a railway station so that no train is kept waiting.",
                            sampleInput: "arr = [9:00, 9:40], dep = [9:10, 12:00]",
                            sampleOutput: "1",
                            approaches: [
                                {
                                    name: "Two Pointer Sort",
                                    explanation: "REAL WORLD ANALOGY: A hotel log. When a guest arrives, you need a room (+1). When a guest leaves, a room frees up (-1). The max number of occupied rooms at any single moment is the capacity you need.\n\nTECHNICAL: Sort arr and dep separately. Increment count if arr[i] <= dep[j], else decrement.",
                                    timeComplexity: "O(n log n)",
                                    spaceComplexity: "O(1)",
                                    code: `class Solution {
    public int findPlatform(int arr[], int dep[], int n) {
        Arrays.sort(arr);
        Arrays.sort(dep);
        
        int plat_needed = 1, result = 1;
        int i = 1, j = 0;
        
        while (i < n && j < n) {
            if (arr[i] <= dep[j]) {
                plat_needed++;
                i++;
            } else {
                plat_needed--;
                j++;
            }
            if (plat_needed > result) result = plat_needed;
        }
        return result;
    }
}`
                                }
                            ]
                        }
                    ]
                }
            ]
        },
        {
            id: 'recursion',
            title: 'Recursion',
            subTopics: [
                {
                    id: 'subset-recursion',
                    title: 'Subsets & Combinations',
                    questions: [
                        {
                            id: 'subset-sums',
                            title: 'Subset Sums',
                            problemStatement: "Print sums of all subsets of a given set, sorted in increasing order.",
                            sampleInput: "arr = [2, 3]",
                            sampleOutput: "[0, 2, 3, 5]",
                            approaches: [
                                {
                                    name: "Pick / No Pick",
                                    explanation: "REAL WORLD ANALOGY: Ordering toppings on a pizza. For each topping (pepperoni, mushroom), you have two choices: INCLUDE it or EXCLUDE it. This creates a branching tree of possibilities.\n\nTECHNICAL: solve(i+1, sum + arr[i]); solve(i+1, sum);",
                                    timeComplexity: "O(2^n)",
                                    spaceComplexity: "O(2^n)",
                                    code: `class Solution {
    public ArrayList<Integer> subsetSums(ArrayList<Integer> arr, int N) {
        ArrayList<Integer> sumSubset = new ArrayList<>();
        func(0, 0, arr, N, sumSubset);
        Collections.sort(sumSubset);
        return sumSubset;
    }
    
    void func(int ind, int sum, ArrayList<Integer> arr, int N, ArrayList<Integer> sumSubset) {
        if (ind == N) {
            sumSubset.add(sum);
            return;
        }
        // Pick
        func(ind + 1, sum + arr.get(ind), arr, N, sumSubset);
        // Not Pick
        func(ind + 1, sum, arr, N, sumSubset);
    }
}`
                                }
                            ]
                        },
                        {
                            id: 'combination-sum',
                            title: 'Combination Sum',
                            problemStatement: "Given an array of distinct integers candidates and a target, return a list of all unique combinations where the chosen numbers sum to target.",
                            sampleInput: "candidates = [2,3,6,7], target = 7",
                            sampleOutput: "[[2,2,3],[7]]",
                            approaches: [
                                {
                                    name: "Backtracking",
                                    explanation: "REAL WORLD ANALOGY: Making change with unlimited coins. You can pick a '2' coin and still choose to pick another '2' coin again (infinite supply). But if you exceed the target amount, you must put the last coin back and try a different one.\n\nTECHNICAL: If arr[i] <= target, pick and STAY at i. Else, move to i+1.",
                                    timeComplexity: "O(2^t * k)",
                                    spaceComplexity: "O(k*x)",
                                    code: `class Solution {
    public List<List<Integer>> combinationSum(int[] candidates, int target) {
        List<List<Integer>> ans = new ArrayList<>();
        findCombinations(0, candidates, target, ans, new ArrayList<>());
        return ans;
    }
    
    private void findCombinations(int ind, int[] arr, int target, List<List<Integer>> ans, List<Integer> ds) {
        if (ind == arr.length) {
            if (target == 0) ans.add(new ArrayList<>(ds));
            return;
        }
        
        if (arr[ind] <= target) {
            ds.add(arr[ind]);
            findCombinations(ind, arr, target - arr[ind], ans, ds); // Stay at ind
            ds.remove(ds.size() - 1);
        }
        findCombinations(ind + 1, arr, target, ans, ds); // Move next
    }
}`
                                }
                            ]
                        }
                        ,
                        {
                            id: 'n-queens',
                            title: 'N-Queens',
                            problemStatement: "The n-queens puzzle is the problem of placing n queens on an n x n chessboard such that no two queens attack each other. Return all distinct solutions.",
                            sampleInput: "n = 4",
                            sampleOutput: "[[.Q.., ...Q, Q..., ..Q.], [..Q., Q..., ...Q, .Q..]]",
                            approaches: [
                                {
                                    name: "Backtracking",
                                    explanation: "REAL WORLD ANALOGY: Seating guests at a dinner table who hate each other. You place one guest, then try to place the next one in a non-conflicting spot. If you get stuck (no spots left), you ask the previous guest to move to a different chair and try again.\n\nTECHNICAL: Place Q in col. Check isValid (row, diag, anti-diag). Recurse row+1.",
                                    timeComplexity: "O(N!)",
                                    spaceComplexity: "O(N^2)",
                                    code: `class Solution {
    public List<List<String>> solveNQueens(int n) {
        char[][] board = new char[n][n];
        for(char[] r : board) Arrays.fill(r, '.');
        List<List<String>> res = new ArrayList<>();
        solve(0, board, res, n);
        return res;
    }
    
    void solve(int col, char[][] board, List<List<String>> res, int n) {
        if(col == n) {
            List<String> list = new ArrayList<>();
            for(char[] r : board) list.add(new String(r));
            res.add(list);
            return;
        }
        
        for(int row = 0; row < n; row++) {
            if(isSafe(board, row, col, n)) {
                board[row][col] = 'Q';
                solve(col + 1, board, res, n);
                board[row][col] = '.';
            }
        }
    }
    
    boolean isSafe(char[][] board, int row, int col, int n) {
        int dupRow = row, dupCol = col;
        // Upper Dialog
        while(row >= 0 && col >= 0) {
            if(board[row][col] == 'Q') return false;
            row--; col--;
        }
        row = dupRow; col = dupCol;
        // Left
        while(col >= 0) {
            if(board[row][col] == 'Q') return false;
            col--;
        }
        row = dupRow; col = dupCol;
        // Lower Diag
        while(row < n && col >= 0) {
            if(board[row][col] == 'Q') return false;
            row++; col--;
        }
        return true;
    }
}`
                                }
                            ]
                        },
                        {
                            id: 'sudoku-solver',
                            title: 'Sudoku Solver',
                            problemStatement: "Write a program to solve a Sudoku puzzle by filling the empty cells.",
                            sampleInput: "board = [[\"5\",\"3\",\".\",...],...]",
                            sampleOutput: "Solved Board",
                            approaches: [
                                {
                                    name: "Backtracking",
                                    explanation: "REAL WORLD ANALOGY: Completing a crossword puzzle. You pencil in a word. If it conflicts later, you erase it and try a different word.\n\nTECHNICAL: Try 1-9. Check isValid. Recurse. If returns true, done. Else backtrack.",
                                    timeComplexity: "O(9^(m*n))",
                                    spaceComplexity: "O(m*n)",
                                    code: `class Solution {
    public void solveSudoku(char[][] board) {
        solve(board);
    }
    boolean solve(char[][] board){
        for(int i=0; i<9; i++){
            for(int j=0; j<9; j++){
                if(board[i][j] == '.'){
                    for(char c='1'; c<='9'; c++){
                        if(isValid(board, i, j, c)){
                            board[i][j] = c;
                            if(solve(board)) return true;
                            board[i][j] = '.';
                        }
                    }
                    return false;
                }
            }
        }
        return true;
    }
    boolean isValid(char[][] board, int row, int col, char c){
        for(int i=0; i<9; i++){
            if(board[i][col] == c) return false;
            if(board[row][i] == c) return false;
            if(board[3*(row/3) + i/3][3*(col/3) + i%3] == c) return false;
        }
        return true;
    }
}`
                                }
                            ]
                        },
                        {
                            id: 'rat-in-maze',
                            title: 'Rat in a Maze',
                            problemStatement: "Consider a rat placed at (0, 0) in a square matrix of order N * N. It has to reach the destination at (N - 1, N - 1). Return all possible paths (D, L, R, U).",
                            sampleInput: "m = [[1, 0], [1, 1]]",
                            sampleOutput: "[\"DR\"]",
                            approaches: [
                                {
                                    name: "Backtracking",
                                    explanation: "REAL WORLD ANALOGY: Exploring a cave. You mark your path with chalk. If you hit a dead end, you walk back to the last junction and try a different tunnel.\n\nTECHNICAL: Mark visited. Explore D, L, R, U. Unmark on return.",
                                    timeComplexity: "O(4^(m*n))",
                                    spaceComplexity: "O(m*n)",
                                    code: `class Solution {
    public ArrayList<String> findPath(int[][] m, int n) {
        ArrayList<String> ans = new ArrayList<>();
        if(m[0][0] == 0) return ans;
        int[][] vis = new int[n][n];
        solve(0, 0, m, n, ans, "", vis);
        return ans;
    }
    void solve(int i, int j, int[][] a, int n, ArrayList<String> ans, String move, int[][] vis) {
        if(i==n-1 && j==n-1) {
            ans.add(move);
            return;
        }
        // Down
        if(i+1<n && vis[i+1][j]==0 && a[i+1][j]==1) {
            vis[i][j] = 1;
            solve(i+1, j, a, n, ans, move+"D", vis);
            vis[i][j] = 0;
        }
        // Left
        if(j-1>=0 && vis[i][j-1]==0 && a[i][j-1]==1) {
            vis[i][j] = 1;
            solve(i, j-1, a, n, ans, move+"L", vis);
            vis[i][j] = 0;
        }
        // Right
        if(j+1<n && vis[i][j+1]==0 && a[i][j+1]==1) {
            vis[i][j] = 1;
            solve(i, j+1, a, n, ans, move+"R", vis);
            vis[i][j] = 0;
        }
        // Up
        if(i-1>=0 && vis[i-1][j]==0 && a[i-1][j]==1) {
            vis[i][j] = 1;
            solve(i-1, j, a, n, ans, move+"U", vis);
            vis[i][j] = 0;
        }
    }
}`
                                }
                            ]

                        }
                    ]
                }
            ]
        },
        {
            id: 'trees',
            title: 'Trees',
            subTopics: [
                {
                    id: 'binary-tree-traversal',
                    title: 'Traversals & Basics',
                    questions: [
                        {
                            id: 'max-depth-binary-tree',
                            title: 'Maximum Depth of Binary Tree',
                            problemStatement: "Given the root of a binary tree, return its maximum depth.",
                            sampleInput: "root = [3,9,20,null,null,15,7]",
                            sampleOutput: "3",
                            approaches: [
                                {
                                    name: "Recursive DFS",
                                    explanation: "REAL WORLD ANALOGY: A corporate hierarchy. To find how many levels deep the organization goes, the CEO asks their VPs: 'How deep is your department?' The VPs ask their Directors, and so on. The CEO takes the max(VP_A, VP_B) + 1 (themselves).\n\nTECHNICAL: return 1 + max(dfs(left), dfs(right)).",
                                    timeComplexity: "O(n)",
                                    spaceComplexity: "O(n)",
                                    code: `class Solution {
    public int maxDepth(TreeNode root) {
        if(root == null) return 0;
        int left = maxDepth(root.left);
        int right = maxDepth(root.right);
        return 1 + Math.max(left, right);
    }
}`
                                }
                            ]
                        },
                        {
                            id: 'invert-binary-tree',
                            title: 'Invert Binary Tree',
                            problemStatement: "Given the root of a binary tree, invert the tree, and return its root.",
                            sampleInput: "root = [4,2,7,1,3,6,9]",
                            sampleOutput: "[4,7,2,9,6,3,1]",
                            approaches: [
                                {
                                    name: "Recursive",
                                    explanation: "REAL WORLD ANALOGY: Looking in a mirror. Your left hand becomes your right hand. For a tree, you swap the left and right children of EVERY node recursively.\n\nTECHNICAL: Swap left and right. Recursively call invert on left and right.",
                                    timeComplexity: "O(n)",
                                    spaceComplexity: "O(n)",
                                    code: `class Solution {
    public TreeNode invertTree(TreeNode root) {
        if(root == null) return null;
        TreeNode temp = root.left;
        root.left = root.right;
        root.right = temp;
        invertTree(root.left);
        invertTree(root.right);
        return root;
    }
}`
                                }
                            ]
                        },
                        {
                            id: 'level-order-traversal',
                            title: 'Binary Tree Level Order Traversal',
                            problemStatement: "Given the root of a binary tree, return the level order traversal of its nodes' values. (i.e., from left to right, level by level).",
                            sampleInput: "root = [3,9,20,null,null,15,7]",
                            sampleOutput: "[[3],[9,20],[15,7]]",
                            approaches: [
                                {
                                    name: "BFS (Queue)",
                                    explanation: "REAL WORLD ANALOGY: A buffet line. You serve everyone at table 1 (level 1), then everyone at table 2 (level 2). You don't jump between tables. A Queue helps process people in 'First In First Out' order.\n\nTECHNICAL: Use a Queue. Process size() nodes at a time.",
                                    timeComplexity: "O(n)",
                                    spaceComplexity: "O(n)",
                                    code: `class Solution {
    public List<List<Integer>> levelOrder(TreeNode root) {
        List<List<Integer>> ans = new ArrayList<>();
        if(root == null) return ans;
        Queue<TreeNode> q = new LinkedList<>();
        q.add(root);
        while(!q.isEmpty()){
            int size = q.size();
            List<Integer> level = new ArrayList<>();
            for(int i=0; i<size; i++){
                TreeNode node = q.poll();
                level.add(node.val);
                if(node.left != null) q.add(node.left);
                if(node.right != null) q.add(node.right);
            }
            ans.add(level);
        }
        return ans;
    }
}`
                                }
                            ]
                        },
                        {
                            id: 'diameter-binary-tree',
                            title: 'Diameter of Binary Tree',
                            problemStatement: "Given the root of a binary tree, return the length of the diameter of the tree. The diameter is the length of the longest path between any two nodes in a tree. This path may or may not pass through the root.",
                            sampleInput: "root = [1,2,3,4,5]",
                            sampleOutput: "3",
                            approaches: [
                                {
                                    name: "DFS (Post-Order)",
                                    explanation: "REAL WORLD ANALOGY: Measuring wingspan. For every joint (node), the widest reach passing through that joint is (Left Arm Length + Right Arm Length). We check every joint, and the max of all these sums is the global diameter.\n\nTECHNICAL: globalMax = max(globalMax, leftH + rightH). Return 1 + max(leftH, rightH).",
                                    timeComplexity: "O(n)",
                                    spaceComplexity: "O(n)",
                                    code: `class Solution {
    int max = 0;
    public int diameterOfBinaryTree(TreeNode root) {
        height(root);
        return max;
    }
    int height(TreeNode root){
        if(root == null) return 0;
        int left = height(root.left);
        int right = height(root.right);
        max = Math.max(max, left + right);
        return 1 + Math.max(left, right);
    }
}`
                                }
                            ]
                        },
                        {
                            id: 'binary-tree-zigzag',
                            title: 'Binary Tree Zigzag Level Order Traversal',
                            problemStatement: "Given the root of a binary tree, return the zigzag level order traversal of its nodes' values. (i.e., from left to right, then right to left for the next level and alternate between).",
                            sampleInput: "root = [3,9,20,null,null,15,7]",
                            sampleOutput: "[[3],[20,9],[15,7]]",
                            approaches: [
                                {
                                    name: "BFS (Deque)",
                                    explanation: "REAL WORLD ANALOGY: A printer printing lines back and forth. Line 1: L->R. Line 2: R->L. We typically use a Deque (Double Ended Queue) or simply reverse the list for odd levels.\n\nTECHNICAL: BFS. If level % 2 == 1, add to front of list (or reverse).",
                                    timeComplexity: "O(n)",
                                    spaceComplexity: "O(n)",
                                    code: `class Solution {
    public List<List<Integer>> zigzagLevelOrder(TreeNode root) {
        List<List<Integer>> ans = new ArrayList<>();
        if(root==null) return ans;
        Queue<TreeNode> q = new LinkedList<>();
        q.add(root);
        boolean order = true; 
        while(!q.isEmpty()){
            int size = q.size();
            List<Integer> sub = new ArrayList<>();
            for(int i=0; i<size; i++){
                TreeNode n = q.poll();
                if(order) sub.add(n.val);
                else sub.add(0, n.val); // Add to front
                if(n.left!=null) q.add(n.left);
                if(n.right!=null) q.add(n.right);
            }
            order = !order;
            ans.add(sub);
        }
        return ans;
    }
}`
                                }
                            ]
                        },
                        {
                            id: 'serialize-deserialize-binary-tree',
                            title: 'Serialize and Deserialize Binary Tree',
                            problemStatement: "Design an algorithm to serialize and deserialize a binary tree.",
                            sampleInput: "root = [1,2,3,null,null,4,5]",
                            sampleOutput: "[1,2,3,null,null,4,5]",
                            approaches: [
                                {
                                    name: "BFS (Queue)",
                                    explanation: "REAL WORLD ANALOGY: Converting a 3D sculpture into a string of instructions (Serialize) and rebuilding it (Deserialize). We use 'null' markers to represent missing children.\n\nTECHNICAL: Use Queue for BFS. Append 'null ' for nulls. Split string by space to rebuild.",
                                    timeComplexity: "O(n)",
                                    spaceComplexity: "O(n)",
                                    code: `public class Codec {
    public String serialize(TreeNode root) {
        if(root == null) return "";
        StringBuilder sb = new StringBuilder();
        Queue<TreeNode> q = new LinkedList<>();
        q.add(root);
        while(!q.isEmpty()){
            TreeNode node = q.poll();
            if(node == null){
                sb.append("n ");
                continue;
            }
            sb.append(node.val + " ");
            q.add(node.left);
            q.add(node.right);
        }
        return sb.toString();
    }

    public TreeNode deserialize(String data) {
        if(data == "") return null;
        String[] values = data.split(" ");
        Queue<TreeNode> q = new LinkedList<>();
        TreeNode root = new TreeNode(Integer.parseInt(values[0]));
        q.add(root);
        for(int i=1; i<values.length; i++){
            TreeNode parent = q.poll();
            if(!values[i].equals("n")){
                TreeNode left = new TreeNode(Integer.parseInt(values[i]));
                parent.left = left;
                q.add(left);
            }
            if(!values[++i].equals("n")){
                TreeNode right = new TreeNode(Integer.parseInt(values[i]));
                parent.right = right;
                q.add(right);
            }
        }
        return root;
    }
}`
                                }
                            ]
                        }
                    ]
                },
                {
                    id: 'bst',
                    title: 'Binary Search Tree',
                    questions: [
                        {
                            id: 'validate-bst',
                            title: 'Validate Binary Search Tree',
                            problemStatement: "Given the root of a binary tree, determine if it is a valid binary search tree (BST).",
                            sampleInput: "root = [2,1,3]",
                            sampleOutput: "true",
                            approaches: [
                                {
                                    name: "Range Check",
                                    explanation: "REAL WORLD ANALOGY: A security clearance system. The boss (Root) says 'Everyone in the left department must have clearance LESS than 10, and right department GREATER than 10'. The manager (Left child, 5) then tells their subordinates: 'Also, use my clearance (5) as a limit'.\n\nTECHNICAL: Pass (min, max) down. Left must be < root, Right must be > root.",
                                    timeComplexity: "O(n)",
                                    spaceComplexity: "O(n)",
                                    code: `class Solution {
    public boolean isValidBST(TreeNode root) {
        return check(root, Long.MIN_VALUE, Long.MAX_VALUE);
    }
    public boolean check(TreeNode root, long min, long max){
        if(root == null) return true;
        if(root.val <= min || root.val >= max) return false;
        return check(root.left, min, root.val) && check(root.right, root.val, max);
    }
}`
                                }
                            ]
                        },
                        {
                            id: 'lca-bst',
                            title: 'Lowest Common Ancestor of a BST',
                            problemStatement: "Find the lowest node in the tree that has both p and q as descendants (where we allow a node to be a descendant of itself).",
                            sampleInput: "root = [6,2,8,0,4,7,9], p = 2, q = 8",
                            sampleOutput: "6",
                            approaches: [
                                {
                                    name: "Recursive Search",
                                    explanation: "REAL WORLD ANALOGY: Finding a meeting point. If you live West (smaller) and your friend lives East (larger), you meet at the central junction. If you BOTH live West, you meet at a junction further West.\n\nTECHNICAL: If root > both, go left. If root < both, go right. Else, split point found (root).",
                                    timeComplexity: "O(h)",
                                    spaceComplexity: "O(h)",
                                    code: `class Solution {
    public TreeNode lowestCommonAncestor(TreeNode root, TreeNode p, TreeNode q) {
        if(root.val > p.val && root.val > q.val) return lowestCommonAncestor(root.left, p, q);
        if(root.val < p.val && root.val < q.val) return lowestCommonAncestor(root.right, p, q);
        return root;
    }
}`
                                }
                            ]
                        }
                    ]
                }
            ]
        },
        {
            id: 'graphs',
            title: 'Graphs',
            subTopics: [
                {
                    id: 'matrix-graphs',
                    title: 'Matrix / Grid Graphs',
                    questions: [
                        {
                            id: 'number-of-islands',
                            title: 'Number of Islands',
                            problemStatement: "Given an m x n 2D binary grid grid which represents a map of '1's (land) and '0's (water), return the number of islands.",
                            sampleInput: "grid = [['1','1','0'],['1','1','0'],['0','0','0']]",
                            sampleOutput: "1",
                            approaches: [
                                {
                                    name: "DFS (Flood Fill)",
                                    explanation: "REAL WORLD ANALOGY: Counting continents on a map. You stick a huge flag on a piece of land, then walk everywhere you can walk without swimming, planting flags as you go to mark it as 'explored'. When you can't walk further, you count '1 continent' and look for another unflagged piece of land.\n\nTECHNICAL: Iterate grid. If '1', increment count and call DFS to sink (turn to '0') all connected '1's.",
                                    timeComplexity: "O(m*n)",
                                    spaceComplexity: "O(m*n)",
                                    code: `class Solution {
    public int numIslands(char[][] grid) {
        int count = 0;
        for(int i=0; i<grid.length; i++){
            for(int j=0; j<grid[0].length; j++){
                if(grid[i][j] == '1'){
                    count++;
                    dfs(grid, i, j);
                }
            }
        }
        return count;
    }
    void dfs(char[][] grid, int i, int j){
        if(i<0 || j<0 || i>=grid.length || j>=grid[0].length || grid[i][j] == '0') return;
        grid[i][j] = '0';
        dfs(grid, i+1, j);
        dfs(grid, i-1, j);
        dfs(grid, i, j+1);
        dfs(grid, i, j-1);
    }
}`
                                }
                            ]
                        }
                    ]
                },
                {
                    id: 'bfs-graph',
                    title: 'BFS & Shortest Path',
                    questions: [
                        {
                            id: 'word-ladder',
                            title: 'Word Ladder',
                            problemStatement: "A transformation sequence from wordBegin to wordEnd using a dictionary wordList is a sequence of words such that adjacent words differ by one letter. Return the number of words in the shortest transformation sequence.",
                            sampleInput: "beginWord = \"hit\", endWord = \"cog\", wordList = [\"hot\",\"dot\",\"dog\",\"lot\",\"log\",\"cog\"]",
                            sampleOutput: "5",
                            approaches: [
                                {
                                    name: "BFS",
                                    explanation: "REAL WORLD ANALOGY: Morphing 'CAT' to 'DOG'. You change one letter at a time to find a valid intermediate word. Expanding layer by layer ensures the shortest path.\n\nTECHNICAL: Queue<Word>. For each word, try changing each char 'a'-'z'. If in dict, add to queue.",
                                    timeComplexity: "O(M^2 * N)",
                                    spaceComplexity: "O(M * N)",
                                    code: `class Solution {
    public int ladderLength(String beginWord, String endWord, List<String> wordList) {
        Set<String> set = new HashSet<>(wordList);
        if(!set.contains(endWord)) return 0;
        Queue<String> q = new LinkedList<>();
        q.add(beginWord);
        int level = 1;
        while(!q.isEmpty()){
            int size = q.size();
            for(int i=0; i<size; i++){
                char[] chars = q.poll().toCharArray();
                for(int j=0; j<chars.length; j++){
                    char original = chars[j];
                    for(char c='a'; c<='z'; c++){
                        if(c == original) continue;
                        chars[j] = c;
                        String newWord = new String(chars);
                        if(newWord.equals(endWord)) return level + 1;
                        if(set.contains(newWord)){
                            q.add(newWord);
                            set.remove(newWord);
                        }
                    }
                    chars[j] = original;
                }
            }
            level++;
        }
        return 0;
    }
}`
                                }
                            ]
                        }
                    ]
                }
            ]
        },
        {
            id: 'dp',
            title: 'Dynamic Programming',
            subTopics: [
                {
                    id: '1d-dp',
                    title: '1D DP',
                    questions: [
                        {
                            id: 'climbing-stairs',
                            title: 'Climbing Stairs',
                            problemStatement: "You are climbing a staircase. It takes n steps to reach the top. Each time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?",
                            sampleInput: "n = 3",
                            sampleOutput: "3 (1+1+1, 1+2, 2+1)",
                            approaches: [
                                {
                                    name: "Memoization / Tabulation",
                                    explanation: "REAL WORLD ANALOGY: Fibonacci. To fetch the 3rd step, you could have come from 2nd (jump 1) or 1st (jump 2). So Ways(3) = Ways(2) + Ways(1).\n\nTECHNICAL: dp[i] = dp[i-1] + dp[i-2].",
                                    timeComplexity: "O(n)",
                                    spaceComplexity: "O(n)",
                                    code: `class Solution {
    public int climbStairs(int n) {
        if(n <= 2) return n;
        int[] dp = new int[n+1];
        dp[1] = 1; dp[2] = 2;
        for(int i=3; i<=n; i++){
            dp[i] = dp[i-1] + dp[i-2];
        }
        return dp[n];
    }
}`
                                }
                            ]
                        },
                        {
                            id: 'coin-change',
                            title: 'Coin Change',
                            problemStatement: "Return the fewest number of coins that you need to make up that amount.",
                            sampleInput: "coins = [1,2,5], amount = 11",
                            sampleOutput: "3 (5+5+1)",
                            approaches: [
                                {
                                    name: "Bottom-Up DP",
                                    explanation: "REAL WORLD ANALOGY: Building a lego tower of height 11. What's the minimum blocks? If you use a height-5 block, you need 1 + minBlocks(6). If you use height-2, you need 1 + minBlocks(9). Take min of all choices.\n\nTECHNICAL: dp[i] = min(dp[i], dp[i-c] + 1) for c in coins.",
                                    timeComplexity: "O(amount * coins)",
                                    spaceComplexity: "O(amount)",
                                    code: `class Solution {
    public int coinChange(int[] coins, int amount) {
        int[] dp = new int[amount + 1];
        Arrays.fill(dp, amount + 1);
        dp[0] = 0;
        for (int i = 1; i <= amount; i++) {
            for (int c : coins) {
                if (i >= c) {
                    dp[i] = Math.min(dp[i], dp[i - c] + 1);
                }
            }
        }
        return dp[amount] > amount ? -1 : dp[amount];
    }
}`
                                }
                            ]
                        }
                    ]
                },
                {
                    id: '2d-dp',
                    title: '2D Dynamic Programming',
                    questions: [
                        {
                            id: 'edit-distance',
                            title: 'Edit Distance',
                            problemStatement: "Given two strings word1 and word2, return the minimum number of operations required to convert word1 to word2 (Insert, Delete, Replace).",
                            sampleInput: "word1 = \"horse\", word2 = \"ros\"",
                            sampleOutput: "3",
                            approaches: [
                                {
                                    name: "Tabulation",
                                    explanation: "REAL WORLD ANALOGY: Auto-correct. To turn 'horse' into 'ros', you align them. If characters match, no work. If mismatch, you pick min cost of (Insert, Delete, Swap).\n\nTECHNICAL: dp[i][j] = min(dp[i-1][j], dp[i][j-1], dp[i-1][j-1]) + 1.",
                                    timeComplexity: "O(m*n)",
                                    spaceComplexity: "O(m*n)",
                                    code: `class Solution {
    public int minDistance(String word1, String word2) {
        int m = word1.length(), n = word2.length();
        int[][] dp = new int[m+1][n+1];
        
        for(int i=0; i<=m; i++) dp[i][0] = i;
        for(int j=0; j<=n; j++) dp[0][j] = j;
        
        for(int i=1; i<=m; i++){
            for(int j=1; j<=n; j++){
                if(word1.charAt(i-1) == word2.charAt(j-1)) 
                    dp[i][j] = dp[i-1][j-1];
                else 
                    dp[i][j] = 1 + Math.min(dp[i-1][j-1], Math.min(dp[i-1][j], dp[i][j-1]));
            }
        }
        return dp[m][n];
    }
}`
                                }
                            ]
                        },
                        {
                            id: '0-1-knapsack',
                            title: '0/1 Knapsack',
                            problemStatement: "Given weights and values of n items, put these items in a knapsack of capacity W to get the maximum total value.",
                            sampleInput: "val = [60, 100, 120], wt = [10, 20, 30], W = 50",
                            sampleOutput: "220",
                            approaches: [
                                {
                                    name: "Tabulation",
                                    explanation: "REAL WORLD ANALOGY: Packing a suitcase for vacation. Limit 50lbs. For every item, you decide: Pack it (gain value, lose weight) or Leave it (keep weight). Maximize joy.\n\nTECHNICAL: dp[i][w] = max(val[i] + dp[i-1][w-wt[i]], dp[i-1][w]).",
                                    timeComplexity: "O(N*W)",
                                    spaceComplexity: "O(N*W)",
                                    code: `class Solution {
    int knapSack(int W, int wt[], int val[], int n) {
        int[][] dp = new int[n + 1][W + 1];
        for (int i = 0; i <= n; i++) {
            for (int w = 0; w <= W; w++) {
                if (i == 0 || w == 0) dp[i][w] = 0;
                else if (wt[i - 1] <= w)
                    dp[i][w] = Math.max(val[i - 1] + dp[i - 1][w - wt[i - 1]], dp[i - 1][w]);
                else
                    dp[i][w] = dp[i - 1][w];
            }
        }
        return dp[n][W];
    }
}`
                                }
                            ]
                        },
                        {
                            id: 'partition-equal-subset-sum',
                            title: 'Partition Equal Subset Sum',
                            problemStatement: "Given a non-empty array nums containing only positive integers, find if the array can be partitioned into two subsets such that the sum of elements in both subsets is equal.",
                            sampleInput: "nums = [1,5,11,5]",
                            sampleOutput: "true",
                            approaches: [
                                {
                                    name: "DP (Subset Sum)",
                                    explanation: "REAL WORLD ANALOGY: Balancing a scale. You want to split weights so both sides equal TotalSum/2. This is just 'Is there a subset that sums to Target?'.\n\nTECHNICAL: boolean dp[target].",
                                    timeComplexity: "O(n*sum)",
                                    spaceComplexity: "O(sum)",
                                    code: `class Solution {
    public boolean canPartition(int[] nums) {
        int sum = 0;
        for(int n : nums) sum += n;
        if(sum % 2 != 0) return false;
        int target = sum / 2;
        boolean[] dp = new boolean[target + 1];
        dp[0] = true;
        for(int num : nums){
            for(int i=target; i>=num; i--){
                dp[i] = dp[i] || dp[i-num];
            }
        }
        return dp[target];
    }
}`
                                }
                            ]
                        },
                        {
                            id: 'longest-common-subsequence',
                            title: 'Longest Common Subsequence',
                            problemStatement: "Given two strings text1 and text2, return the length of their longest common subsequence. If there is no common subsequence, return 0.",
                            sampleInput: "text1 = \"abcde\", text2 = \"ace\"",
                            sampleOutput: "3 (\"ace\")",
                            approaches: [
                                {
                                    name: "2D DP",
                                    explanation: "REAL WORLD ANALOGY: Finding common DNA traits. You align the two sequences. If characters match, you secure a point and move both pointers. If they don't, you try skipping a char from either side and take the best result.\n\nTECHNICAL: dp[i][j] = match ? dp[i-1][j-1]+1 : max(dp[i-1][j], dp[i][j-1]).",
                                    timeComplexity: "O(m*n)",
                                    spaceComplexity: "O(m*n)",
                                    code: `class Solution {
    public int longestCommonSubsequence(String text1, String text2) {
        int m = text1.length(), n = text2.length();
        int[][] dp = new int[m + 1][n + 1];
        
        for (int i = 1; i <= m; i++) {
            for (int j = 1; j <= n; j++) {
                if (text1.charAt(i - 1) == text2.charAt(j - 1)) {
                    dp[i][j] = dp[i - 1][j - 1] + 1;
                } else {
                    dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
                }
            }
        }
        return dp[m][n];
    }
}`
                                },
                                {
                                    name: "Recursion + Memoization",
                                    explanation: "Same logic as DP but top-down. Avoids recomputing subproblems.",
                                    timeComplexity: "O(m*n)",
                                    spaceComplexity: "O(m*n)",
                                    code: `class Solution {
    int[][] memo;
    public int longestCommonSubsequence(String text1, String text2) {
        memo = new int[text1.length()][text2.length()];
        for(int[] r : memo) Arrays.fill(r, -1);
        return solve(text1, text2, 0, 0);
    }
    int solve(String s1, String s2, int i, int j) {
        if(i == s1.length() || j == s2.length()) return 0;
        if(memo[i][j] != -1) return memo[i][j];
        if(s1.charAt(i) == s2.charAt(j)) 
            return memo[i][j] = 1 + solve(s1, s2, i+1, j+1);
        return memo[i][j] = Math.max(solve(s1, s2, i+1, j), solve(s1, s2, i, j+1));
    }
}`
                                }
                            ]
                        },
                        {
                            id: 'word-break',
                            title: 'Word Break',
                            problemStatement: "Given a string s and a dictionary of strings wordDict, return true if s can be segmented into a space-separated sequence of one or more dictionary words.",
                            sampleInput: "s = \"leetcode\", wordDict = [\"leet\",\"code\"]",
                            sampleOutput: "true",
                            approaches: [
                                {
                                    name: "1D DP",
                                    explanation: "REAL WORLD ANALOGY: Cutting a ribbon. You want to see if you can cut the entire ribbon into valid predefined lengths. You check: Can I make the first cut at index i such that the left piece is valid? If yes, can I cut the rest?\n\nTECHNICAL: dp[i] = true if dp[j] and s[j..i] in dict.",
                                    timeComplexity: "O(n^2)",
                                    spaceComplexity: "O(n)",
                                    code: `class Solution {
    public boolean wordBreak(String s, List<String> wordDict) {
        Set<String> set = new HashSet<>(wordDict);
        boolean[] dp = new boolean[s.length() + 1];
        dp[0] = true;
        
        for (int i = 1; i <= s.length(); i++) {
            for (int j = 0; j < i; j++) {
                if (dp[j] && set.contains(s.substring(j, i))) {
                    dp[i] = true;
                    break;
                }
            }
        }
        return dp[s.length()];
    }
}`
                                }
                            ]
                        },
                        {
                            id: 'palindromic-substrings',
                            title: 'Palindromic Substrings',
                            problemStatement: "Given a string s, return the number of palindromic substrings in it.",
                            problemLink: "https://leetcode.com/problems/palindromic-substrings/",
                            sampleInput: "s = \"abc\"",
                            sampleOutput: "3 (\"a\", \"b\", \"c\")",
                            approaches: [
                                {
                                    name: "Expand Around Center",
                                    explanation: "REAL WORLD ANALOGY: Counting ripples. Every index can be the center of a ripple (palindrome). You drop a stone at every index (and between indices) and count how many ripples form.\n\nTECHNICAL: For each i, expand (i,i) and (i,i+1). Count successes.",
                                    timeComplexity: "O(n^2)",
                                    spaceComplexity: "O(1)",
                                    code: `class Solution {
    public int countSubstrings(String s) {
        int count = 0;
        for (int i = 0; i < s.length(); i++) {
            count += expand(s, i, i);     // Odd length
            count += expand(s, i, i + 1); // Even length
        }
        return count;
    }
    private int expand(String s, int left, int right) {
        int c = 0;
        while (left >= 0 && right < s.length() && s.charAt(left) == s.charAt(right)) {
            c++; left--; right++;
        }
        return c;
    }
}`
                                }
                            ]
                        }
                    ]
                }
            ]
        },
        {
            id: 'bit-manipulation',
            title: 'Bit Manipulation',
            subTopics: [
                {
                    id: 'basic-bits',
                    title: 'Bitwise Operations',
                    questions: [
                        {
                            id: 'sum-two-integers',
                            title: 'Sum of Two Integers',
                            problemStatement: "Calculate the sum of two integers a and b without using the operators + and -.",
                            sampleInput: "a = 1, b = 2",
                            sampleOutput: "3",
                            approaches: [
                                {
                                    name: "Bitwise Logic",
                                    explanation: "REAL WORLD ANALOGY: Mechanical adder. XOR simulates adding without carry (1+1=0, 1+0=1). AND simulates the carry itself (1+1 generates carry). You keep adding the carry back in until there's no carry left.\n\nTECHNICAL: while(b!=0) { carry = (a&b)<<1; a=a^b; b=carry; }",
                                    timeComplexity: "O(1)",
                                    spaceComplexity: "O(1)",
                                    code: `class Solution {
    public int getSum(int a, int b) {
        while (b != 0) {
            int carry = (a & b) << 1;
            a = a ^ b;
            b = carry;
        }
        return a;
    }
}`
                                }
                            ]
                        },
                        {
                            id: 'number-of-1-bits',
                            title: 'Number of 1 Bits',
                            problemStatement: "Write a function that takes an unsigned integer and returns the number of '1' bits it has (Hamming weight).",
                            sampleInput: "n = 00000000000000000000000000001011",
                            sampleOutput: "3",
                            approaches: [
                                {
                                    name: "Brian Kernighan's Algorithm",
                                    explanation: "REAL WORLD ANALOGY: Turning off lights one by one. `n & (n-1)` always flips the least significant 1-bit to a 0. Doing this repeatedly counts the 1s very fast.\n\nTECHNICAL: count = 0; while(n!=0) { n &= (n-1); count++; }",
                                    timeComplexity: "O(1)",
                                    spaceComplexity: "O(1)",
                                    code: `class Solution {
    public int hammingWeight(int n) {
        int count = 0;
        while (n != 0) {
            n = n & (n - 1);
            count++;
        }
        return count;
    }
}`
                                }
                            ]
                        }
                    ]
                }
            ]
        },
        {
            id: 'heaps',
            title: 'Heaps / Priority Queue',
            subTopics: [
                {
                    id: 'heap-basics',
                    title: 'Top K & Standard',
                    questions: [
                        {
                            id: 'top-k-frequent',
                            title: 'Top K Frequent Elements',
                            problemStatement: "Given an integer array nums and an integer k, return the k most frequent elements.",
                            sampleInput: "nums = [1,1,1,2,2,3], k = 2",
                            sampleOutput: "[1,2]",
                            approaches: [
                                {
                                    name: "Min Heap",
                                    explanation: "REAL WORLD ANALOGY: A 'Leaderboard' of size K. As you process new scores, if a score is higher than the lowest on the leaderboard, you kick the lowest one off and add the new one. The heap keeps the 'weakest' element at the top for easy removal.\n\nTECHNICAL: Count freq map. Push to MinHeap. If size > k, poll().",
                                    timeComplexity: "O(n log k)",
                                    spaceComplexity: "O(n)",
                                    code: `class Solution {
    public int[] topKFrequent(int[] nums, int k) {
        Map<Integer, Integer> count = new HashMap<>();
        for (int n : nums) count.put(n, count.getOrDefault(n, 0) + 1);
        
        PriorityQueue<Integer> heap = new PriorityQueue<>((a, b) -> count.get(a) - count.get(b));
        for (int n : count.keySet()) {
            heap.add(n);
            if (heap.size() > k) heap.poll();
        }
        
        int[] top = new int[k];
        for(int i = 0; i < k; i++) top[i] = heap.poll();
        return top;
    }
}`
                                }
                            ]
                        }
                    ]
                }
            ]
        },

        {
            id: 'intervals',
            title: 'Intervals',
            subTopics: [
                {
                    id: 'interval-basics',
                    title: 'Standard Intervals',
                    questions: [
                        {
                            id: 'insert-interval',
                            title: 'Insert Interval',
                            problemStatement: "Insert a new interval into a sorted list of non-overlapping intervals and merge if necessary.",
                            sampleInput: "intervals = [[1,3],[6,9]], newInterval = [2,5]",
                            sampleOutput: "[[1,5],[6,9]]",
                            approaches: [
                                {
                                    name: "Linear Pass",
                                    explanation: "REAL WORLD ANALOGY: Scheduling a meeting. 1. Add all meetings that end before yours starts. 2. For meetings that overlap (start before yours ends), merge them into one giant meeting. 3. Add all meetings that start after yours ends.\n\nTECHNICAL: Add left non-overlapping. Merge overlapping (min start, max end). Add right non-overlapping.",
                                    timeComplexity: "O(n)",
                                    spaceComplexity: "O(n)",
                                    code: `class Solution {
    public int[][] insert(int[][] intervals, int[] newInterval) {
        List<int[]> res = new ArrayList<>();
        int i = 0;
        int n = intervals.length;
        
        // 1. Before
        while (i < n && intervals[i][1] < newInterval[0]) {
            res.add(intervals[i++]);
        }
        
        // 2. Overlap
        while (i < n && intervals[i][0] <= newInterval[1]) {
            newInterval[0] = Math.min(newInterval[0], intervals[i][0]);
            newInterval[1] = Math.max(newInterval[1], intervals[i][1]);
            i++;
        }
        res.add(newInterval);
        
        // 3. After
        while (i < n) {
            res.add(intervals[i++]);
        }
        
        return res.toArray(new int[res.size()][]);
    }
}`
                                }
                            ]
                        },
                        {
                            id: 'merge-intervals',
                            title: 'Merge Intervals',
                            problemStatement: "Given an array of intervals, merge all overlapping intervals.",
                            sampleInput: "intervals = [[1,3],[2,6],[8,10],[15,18]]",
                            sampleOutput: "[[1,6],[8,10],[15,18]]",
                            approaches: [
                                {
                                    name: "Sort & Merge",
                                    explanation: "REAL WORLD ANALOGY: Painting patches on a road. Sort patches by start mile. If patch B starts before patch A ends, they merge into one long stroke of paint. If B starts after A ends, it's a new stroke.\n\nTECHNICAL: Sort by start time. Iterate and update 'end'.",
                                    timeComplexity: "O(n log n)",
                                    spaceComplexity: "O(n)",
                                    code: `class Solution {
    public int[][] merge(int[][] intervals) {
        Arrays.sort(intervals, (a, b) -> Integer.compare(a[0], b[0]));
        LinkedList<int[]> merged = new LinkedList<>();
        
        for (int[] interval : intervals) {
            if (merged.isEmpty() || merged.getLast()[1] < interval[0]) {
                merged.add(interval);
            } else {
                merged.getLast()[1] = Math.max(merged.getLast()[1], interval[1]);
            }
        }
        return merged.toArray(new int[merged.size()][]);
    }
}`
                                }
                            ]
                        },
                        {
                            id: 'non-overlapping-intervals',
                            title: 'Non-overlapping Intervals',
                            problemStatement: "Find the minimum number of intervals to remove to make the rest non-overlapping.",
                            sampleInput: "intervals = [[1,2],[2,3],[3,4],[1,3]]",
                            sampleOutput: "1",
                            approaches: [
                                {
                                    name: "Greedy (Sort by End Time)",
                                    explanation: "REAL WORLD ANALOGY: Booking a conference room. To host the most meetings, generally pick the ones that finish earliest. This leaves the most time for future meetings. Discard any meeting that conflicts with the one you just picked.\n\nTECHNICAL: Sort by end. If start < prevDiff, count++ (remove).",
                                    timeComplexity: "O(n log n)",
                                    spaceComplexity: "O(1)",
                                    code: `class Solution {
    public int eraseOverlapIntervals(int[][] intervals) {
        Arrays.sort(intervals, (a, b) -> Integer.compare(a[1], b[1]));
        int count = 0;
        int end = intervals[0][1];
        
        for(int i = 1; i < intervals.length; i++) {
            if(intervals[i][0] < end) {
                count++;
            } else {
                end = intervals[i][1];
            }
        }
        return count;
    }
}`
                                }
                            ]
                        }
                    ]
                }
            ]
        },
        {
            id: 'trie',
            title: 'Trie',
            subTopics: [
                {
                    id: 'trie-basics',
                    title: 'Prefix Tree',
                    questions: [
                        {
                            id: 'implement-trie',
                            title: 'Implement Trie (Prefix Tree)',
                            problemStatement: "Implement a Trie with insert, search, and startsWith methods.",
                            sampleInput: "Trie(); insert(\"apple\"); search(\"apple\");",
                            sampleOutput: "true",
                            approaches: [
                                {
                                    name: "TreeNode Array",
                                    explanation: "REAL WORLD ANALOGY: An autocomplete dictionary. 'Apple' is stored as A -> P -> P -> L -> E. At node 'E', we mark 'isEnd = true'. Sharing prefixes saves huge space.\n\nTECHNICAL: Class Node { Node[] children; boolean isEnd; }",
                                    timeComplexity: "O(wordLength)",
                                    spaceComplexity: "O(totalChars)",
                                    code: `class Trie {
    class TrieNode {
        TrieNode[] children = new TrieNode[26];
        boolean isEnd = false;
    }
    TrieNode root;

    public Trie() { root = new TrieNode(); }
    
    public void insert(String word) {
        TrieNode node = root;
        for (char c : word.toCharArray()) {
            if (node.children[c - 'a'] == null) node.children[c - 'a'] = new TrieNode();
            node = node.children[c - 'a'];
        }
        node.isEnd = true;
    }
    
    public boolean search(String word) {
        TrieNode node = root;
        for (char c : word.toCharArray()) {
            if (node.children[c - 'a'] == null) return false;
            node = node.children[c - 'a'];
        }
        return node.isEnd;
    }
    
    public boolean startsWith(String prefix) {
        TrieNode node = root;
        for (char c : prefix.toCharArray()) {
            if (node.children[c - 'a'] == null) return false;
            node = node.children[c - 'a'];
        }
        return true;
    }
}`
                                }
                            ]
                        }
                    ]
                }
            ]
        },
        {
            id: 'design',
            title: 'Design',
            subTopics: [
                {
                    id: 'design-basics',
                    title: 'System Design',
                    questions: [
                        {
                            id: 'shuffle-array',
                            title: 'Shuffle an Array',
                            problemStatement: "Design a class that accepts an integer array nums. The class should support resetting the array to its original configuration and shuffling the array.",
                            sampleInput: "solution.shuffle();",
                            sampleOutput: "[3, 1, 2]",
                            approaches: [
                                {
                                    name: "Fisher-Yates Algorithm",
                                    explanation: "REAL WORLD ANALOGY: Shuffling a deck of cards. You hold the deck in one hand. You randomly pick one card from the remaining unpicked cards and place it in the new pile. Fisher-Yates does this in-place by swapping the current element with a random element from the remaining pool.\n\nTECHNICAL: swap(i, random(i, n)).",
                                    timeComplexity: "O(n)",
                                    spaceComplexity: "O(n)",
                                    code: `class Solution {
    private int[] nums;
    private Random rand;

    public Solution(int[] nums) {
        this.nums = nums;
        this.rand = new Random();
    }
    
    public int[] reset() {
        return nums;
    }
    
    public int[] shuffle() {
        int[] copy = nums.clone();
        for (int i = 0; i < copy.length; i++) {
            int j = rand.nextInt(i + 1);
            swap(copy, i, j);
        }
        return copy;
    }
    
    private void swap(int[] arr, int i, int j) {
        int temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
    }
}`
                                }
                            ]

                        },
                        {
                            id: 'lru-cache',
                            title: 'LRU Cache',
                            problemStatement: "Design a data structure that follows the constraints of a Least Recently Used (LRU) cache.",
                            sampleInput: "LRUCache(2); put(1, 1); put(2, 2); get(1); put(3, 3); sum();",
                            sampleOutput: "[1, -1]",
                            approaches: [
                                {
                                    name: "HashMap + Doubly Linked List",
                                    explanation: "REAL WORLD ANALOGY: A clothes rack. You put your most recently worn jacket at the front. The one at the back is least recently worn. If the rack is full and you buy a new jacket, you toss the one at the back. When you pick a jacket from the middle, you move it to the front.\n\nTECHNICAL: Map<Key, Node>. DLL head=MRU, tail=LRU.",
                                    timeComplexity: "O(1)",
                                    spaceComplexity: "O(capacity)",
                                    code: `class LRUCache {
    class Node { int key, val; Node prev, next; Node(int k, int v){key=k; val=v;} }
    private Map<Integer, Node> map = new HashMap<>();
    private Node head, tail;
    private int capacity;

    public LRUCache(int capacity) {
        this.capacity = capacity;
        head = new Node(0, 0); tail = new Node(0, 0);
        head.next = tail; tail.prev = head;
    }
    
    public int get(int key) {
        if (!map.containsKey(key)) return -1;
        Node node = map.get(key);
        remove(node); insert(node);
        return node.val;
    }
    
    public void put(int key, int value) {
        if (map.containsKey(key)) remove(map.get(key));
        if (map.size() == capacity) remove(tail.prev);
        insert(new Node(key, value));
    }
    
    private void remove(Node node) {
        map.remove(node.key);
        node.prev.next = node.next;
        node.next.prev = node.prev;
    }
    
    private void insert(Node node) {
        map.put(node.key, node);
        Node headNext = head.next;
        head.next = node;
        node.prev = head;
        headNext.prev = node;
        node.next = headNext;
    }
}`                        }
                            ]
                        },
                        {
                            id: 'lfu-cache',
                            title: 'LFU Cache',
                            problemStatement: "Design and implement a data structure for a Least Frequently Used (LFU) cache.",
                            sampleInput: "LFUCache(2); put(1, 1); put(2, 2); get(1); put(3, 3); get(2);",
                            sampleOutput: "-1",
                            approaches: [
                                {
                                    name: "Two HashMaps",
                                    explanation: "REAL WORLD ANALOGY: A library bookshelf organized by popularity. Shelf 1 has books read once. Shelf 2 has books read twice. When you read a book from Shelf 1, you move it to Shelf 2. If full, discard the oldest book from the LOWEST shelf number.\n\nTECHNICAL: vals map. counts map. freq list map.",
                                    timeComplexity: "O(1)",
                                    spaceComplexity: "O(n)",
                                    code: `class LFUCache {
    // Detailed implementation omitted for brevity, but follows O(1) logic
    // Using Map<Key, Node> and Map<Freq, LinkedHashSet<Key>>
    Map<Integer, Integer> vals;
    Map<Integer, Integer> counts;
    Map<Integer, LinkedHashSet<Integer>> lists;
    int cap;
    int min = -1;
    public LFUCache(int capacity) {
        cap = capacity;
        vals = new HashMap<>();
        counts = new HashMap<>();
        lists = new HashMap<>();
        lists.put(1, new LinkedHashSet<>());
    }
    public int get(int key) {
        if(!vals.containsKey(key)) return -1;
        int count = counts.get(key);
        counts.put(key, count+1);
        lists.get(count).remove(key);
        if(count==min && lists.get(count).size()==0) min++;
        if(!lists.containsKey(count+1)) lists.put(count+1, new LinkedHashSet<>());
        lists.get(count+1).add(key);
        return vals.get(key);
    }
    public void put(int key, int value) {
        if(cap<=0) return;
        if(vals.containsKey(key)) {
            vals.put(key, value);
            get(key);
            return;
        }
        if(vals.size() >= cap) {
            int evit = lists.get(min).iterator().next();
            lists.get(min).remove(evit);
            vals.remove(evit);
        }
        vals.put(key, value);
        counts.put(key, 1);
        min = 1;
        lists.get(1).add(key);
    }
}`
                                }
                            ]
                        },
                        {
                            id: 'design-twitter',
                            title: 'Design Twitter',
                            problemStatement: "Design a simplified version of Twitter where users can post tweets, follow/unfollow another user and is able to see the 10 most recent tweets in the user's news feed.",
                            sampleInput: "Twitter(); postTweet(1, 5); getNewsFeed(1);",
                            sampleOutput: "[5]",
                            approaches: [
                                {
                                    name: "Heap + HashMap",
                                    explanation: "REAL WORLD ANALOGY: A customized newspaper. You subscribe to authors (Follow). When you check the front page (Feed), the editor collects the latest articles from all your subscribed authors, sorts them by date, and shows the top 10.\n\nTECHNICAL: Map<User, Set<Followee>>. Map<User, List<Tweet>>. Merge K Sorted Lists (Tweets) using MaxHeap.",
                                    timeComplexity: "O(N log K)",
                                    spaceComplexity: "O(Users + Tweets)",
                                    code: `class Twitter {
    private static int timeStamp=0;
    private class Tweet{ int id; int time; Tweet next; Tweet(int id){ this.id=id; time=timeStamp++; next=null; } }
    private class User{ int id; Set<Integer> followed; Tweet head; User(int id){ this.id=id; followed=new HashSet<>(); followed.add(id); head=null; } 
        public void follow(int id){ followed.add(id); }
        public void unfollow(int id){ followed.remove(id); }
        public void post(int id){ Tweet t = new Tweet(id); t.next=head; head=t; }
    }
    private Map<Integer, User> userMap;
    public Twitter() { userMap = new HashMap<>(); }
    public void postTweet(int userId, int tweetId) {
        if(!userMap.containsKey(userId)) userMap.put(userId, new User(userId));
        userMap.get(userId).post(tweetId);
    }
    public List<Integer> getNewsFeed(int userId) {
        List<Integer> res = new LinkedList<>();
        if(!userMap.containsKey(userId)) return res;
        Set<Integer> users = userMap.get(userId).followed;
        PriorityQueue<Tweet> q = new PriorityQueue<>(users.size(), (a,b)->(b.time-a.time));
        for(int user : users){
            Tweet t = userMap.get(user)!=null ? userMap.get(user).head : null;
            if(t!=null) q.add(t);
        }
        int n=0;
        while(!q.isEmpty() && n<10){
            Tweet t = q.poll();
            res.add(t.id);
            n++;
            if(t.next!=null) q.add(t.next);
        }
        return res;
    }
    public void follow(int followerId, int followeeId) {
        if(!userMap.containsKey(followerId)) userMap.put(followerId, new User(followerId));
        if(!userMap.containsKey(followeeId)) userMap.put(followeeId, new User(followeeId));
        userMap.get(followerId).follow(followeeId);
    }
    public void unfollow(int followerId, int followeeId) {
        if(!userMap.containsKey(followerId) || followerId==followeeId) return;
        userMap.get(followerId).unfollow(followeeId);
    }
}`
                                }
                            ]
                        }
                    ]
                }
            ]
        },
        {
            id: 'sorting-searching',
            title: 'Sorting & Searching',
            subTopics: [
                {
                    id: 'advanced-search',
                    title: 'Advanced Search',
                    questions: [
                        {
                            id: 'median-two-sorted-arrays',
                            title: 'Median of Two Sorted Arrays',
                            problemStatement: "Given two sorted arrays nums1 and nums2 of size m and n respectively, return the median of the two sorted arrays.",
                            sampleInput: "nums1 = [1,3], nums2 = [2]",
                            sampleOutput: "2.00000",
                            approaches: [
                                {
                                    name: "Binary Search",
                                    explanation: "REAL WORLD ANALOGY: Cutting a deck of cards. You want to cut both decks such that the left halves combined have the same number of cards as the right halves combined, AND every card on the left is smaller than every card on the right.\n\nTECHNICAL: Partition X and Y. Binary search on partition X.",
                                    timeComplexity: "O(log(min(m,n)))",
                                    spaceComplexity: "O(1)",
                                    code: `class Solution {
    public double findMedianSortedArrays(int[] nums1, int[] nums2) {
        if (nums1.length > nums2.length) return findMedianSortedArrays(nums2, nums1);
        int x = nums1.length, y = nums2.length;
        int low = 0, high = x;
        while (low <= high) {
            int partitionX = (low + high) / 2;
            int partitionY = (x + y + 1) / 2 - partitionX;
            int maxLeftX = (partitionX == 0) ? Integer.MIN_VALUE : nums1[partitionX - 1];
            int minRightX = (partitionX == x) ? Integer.MAX_VALUE : nums1[partitionX];
            int maxLeftY = (partitionY == 0) ? Integer.MIN_VALUE : nums2[partitionY - 1];
            int minRightY = (partitionY == y) ? Integer.MAX_VALUE : nums2[partitionY];
            if (maxLeftX <= minRightY && maxLeftY <= minRightX) {
                if ((x + y) % 2 == 0) return ((double)Math.max(maxLeftX, maxLeftY) + Math.min(minRightX, minRightY)) / 2;
                else return (double)Math.max(maxLeftX, maxLeftY);
            } else if (maxLeftX > minRightY) high = partitionX - 1;
            else low = partitionX + 1;
        }
        return 0.0;
    }
}`
                                }
                            ]
                        },
                        {
                            id: 'kth-largest-element',
                            title: 'Kth Largest Element in an Array',
                            problemStatement: "Given an integer array nums and an integer k, return the kth largest element in the array.",
                            sampleInput: "nums = [3,2,1,5,6,4], k = 2",
                            sampleOutput: "5",
                            approaches: [
                                {
                                    name: "QuickSelect",
                                    explanation: "REAL WORLD ANALOGY: Finding the 2nd tallest person. You pick a random person (pivot). Everyone taller goes to right, shorter to left. If there are exactly k-1 people on the right, your pivot is the kth largest.\n\nTECHNICAL: Partition logic from QuickSort. If p < k, recurse right. If p > k, recurse left.",
                                    timeComplexity: "O(n) avg",
                                    spaceComplexity: "O(1)",
                                    code: `class Solution {
    public int findKthLargest(int[] nums, int k) {
        int left = 0, right = nums.length - 1;
        Random rand = new Random();
        while (true) {
            int pivot_index = left + rand.nextInt(right - left + 1);
            int new_pivot_index = partition(nums, left, right, pivot_index);
            if (new_pivot_index == nums.length - k) return nums[new_pivot_index];
            else if (new_pivot_index < nums.length - k) left = new_pivot_index + 1;
            else right = new_pivot_index - 1;
        }
    }
    int partition(int[] nums, int left, int right, int pivot_index) {
        int pivot = nums[pivot_index];
        swap(nums, pivot_index, right);
        int stored_index = left;
        for (int i = left; i < right; i++) {
            if (nums[i] < pivot) {
                swap(nums, i, stored_index);
                stored_index++;
            }
        }
        swap(nums, right, stored_index);
        return stored_index;
    }
    void swap(int[] nums, int i, int j) {
        int temp = nums[i]; nums[i] = nums[j]; nums[j] = temp;
    }
}`
                                }
                            ]
                        }
                    ]
                }
            ]
        }
        ,
        {
            id: 'linear-data-structures',
            title: 'Linear Data Structures',
            subTopics: [
                {
                    id: 'queues',
                    title: 'Queues',
                    questions: [
                        {
                            id: 'implement-queue-using-stacks',
                            title: 'Implement Queue using Stacks',
                            problemStatement: "Implement a first in first out (FIFO) queue using only two stacks. The implemented queue should support all the functions of a normal queue (push, peek, pop, and empty).",
                            problemLink: "https://leetcode.com/problems/implement-queue-using-stacks/",
                            sampleInput: "push(1), push(2), peek(), pop(), empty()",
                            sampleOutput: "1, 1, false",
                            approaches: [
                                {
                                    name: "Two Stacks (Amortized O(1))",
                                    explanation: "Use two stacks: `input` and `output`. Push to `input`. Pop from `output`. If `output` is empty, move all elements from `input` to `output`. This reverses the order twice, simulating a queue.",
                                    timeComplexity: "Amortized O(1)",
                                    spaceComplexity: "O(n)",
                                    code: `class MyQueue {
    Stack<Integer> input = new Stack<>();
    Stack<Integer> output = new Stack<>();

    public void push(int x) {
        input.push(x);
    }

    public int pop() {
        peek();
        return output.pop();
    }

    public int peek() {
        if (output.isEmpty()) {
            while (!input.isEmpty()) {
                output.push(input.pop());
            }
        }
        return output.peek();
    }

    public boolean empty() {
        return input.isEmpty() && output.isEmpty();
    }
}`
                                },
                                {
                                    name: "Brute Force",
                                    explanation: "Move elements back and forth.",
                                    timeComplexity: "O(n)",
                                    spaceComplexity: "O(n)",
                                    code: `// Omitted`
                                }
                            ]
                        },
                        {
                            id: 'implement-stack-using-queues',
                            title: 'Implement Stack using Queues',
                            problemStatement: "Implement a last-in-first-out (LIFO) stack using only two queues.",
                            problemLink: "https://leetcode.com/problems/implement-stack-using-queues/",
                            sampleInput: "push(1), push(2), top(), pop(), empty()",
                            sampleOutput: "2, 2, false",
                            approaches: [
                                {
                                    name: "One Queue (Rotation)",
                                    explanation: "Push the new element, then rotate (`add(poll())`) all previous elements behind it. The new element becomes the head of the queue.",
                                    timeComplexity: "O(n)",
                                    spaceComplexity: "O(n)",
                                    code: `class MyStack {
    Queue<Integer> q = new LinkedList<>();

    public void push(int x) {
        q.add(x);
        int sz = q.size();
        while (sz > 1) {
            q.add(q.remove());
            sz--;
        }
    }

    public int pop() { return q.remove(); }
    public int top() { return q.peek(); }
    public boolean empty() { return q.isEmpty(); }
}`
                                }
                            ]
                        },
                        {
                            id: 'rotting-oranges',
                            title: 'Rotting Oranges',
                            problemStatement: "Return the minimum number of minutes that must elapse until no cell has a fresh orange.",
                            problemLink: "https://leetcode.com/problems/rotting-oranges/",
                            sampleInput: "grid = [[2,1,1],[1,1,0],[0,1,1]]",
                            sampleOutput: "4",
                            approaches: [
                                {
                                    name: "Multi-Source BFS",
                                    explanation: "Add all initial rotten oranges (2) to a queue. Process level by level (minutes).",
                                    timeComplexity: "O(m*n)",
                                    spaceComplexity: "O(m*n)",
                                    code: `class Solution {
    public int orangesRotting(int[][] grid) {
        int m = grid.length, n = grid[0].length;
        Queue<int[]> q = new LinkedList<>();
        int fresh = 0;
        for(int i=0;i<m;i++) 
            for(int j=0;j<n;j++) 
                if(grid[i][j]==2) q.offer(new int[]{i,j});
                else if(grid[i][j]==1) fresh++;
        
        if(fresh == 0) return 0;
        int time = 0;
        int[][] dirs = {{0,1},{0,-1},{1,0},{-1,0}};
        
        while(!q.isEmpty() && fresh > 0) {
            int size = q.size();
            time++;
            while(size-- > 0) {
                int[] curr = q.poll();
                for(int[] d : dirs) {
                    int r = curr[0]+d[0], c = curr[1]+d[1];
                    if(r>=0 && r<m && c>=0 && c<n && grid[r][c]==1) {
                        grid[r][c] = 2;
                        fresh--;
                        q.offer(new int[]{r,c});
                    }
                }
            }
        }
        return fresh == 0 ? time : -1;
    }
}`
                                }
                            ]
                        },
                        {
                            id: 'sliding-window-maximum',
                            title: 'Sliding Window Maximum',
                            problemStatement: "Return the max sliding window of size k.",
                            problemLink: "https://leetcode.com/problems/sliding-window-maximum/",
                            sampleInput: "nums = [1,3,-1,-3,5,3,6,7], k = 3",
                            sampleOutput: "[3,3,5,5,6,7]",
                            approaches: [
                                {
                                    name: "Monotonic Queue (Deque)",
                                    explanation: "Remove indices that are out of window. Remove smaller elements from back as they can't be max. Result is front.",
                                    timeComplexity: "O(n)",
                                    spaceComplexity: "O(k)",
                                    code: `class Solution {
    public int[] maxSlidingWindow(int[] nums, int k) {
        Deque<Integer> dq = new ArrayDeque<>();
        int[] res = new int[nums.length - k + 1];
        int idx = 0;
        for(int i=0; i<nums.length; i++) {
            if(!dq.isEmpty() && dq.peekFirst() == i-k) dq.pollFirst();
            while(!dq.isEmpty() && nums[dq.peekLast()] < nums[i]) dq.pollLast();
            dq.offerLast(i);
            if(i >= k-1) res[idx++] = nums[dq.peekFirst()];
        }
        return res;
    }
}`
                                }
                            ]
                        },
                        {
                            id: 'first-unique-number',
                            title: 'First Non-Repeating Character in a Stream',
                            problemStatement: "Find the first non-repeating character from a stream of characters.",
                            problemLink: "https://leetcode.com/problems/first-unique-character-in-a-string/",
                            sampleInput: "leetcodelove",
                            sampleOutput: "t",
                            approaches: [
                                {
                                    name: "Queue + Frequency Map",
                                    explanation: "Count frequency. Add to queue. Check queue front: if freq > 1, pop. Else return front.",
                                    timeComplexity: "O(n)",
                                    spaceComplexity: "O(26)",
                                    code: `class FirstUnique {
    int[] count = new int[26];
    Queue<Character> q = new LinkedList<>();
    public void add(char c) {
        count[c-'a']++;
        q.add(c);
        while(!q.isEmpty() && count[q.peek()-'a'] > 1) q.poll();
    }
    public char firstUnique() {
        return q.isEmpty() ? '#' : q.peek();
    }
}`
                                }
                            ]
                        },
                        {
                            id: 'gas-station',
                            title: 'Gas Station (Circular Tour)',
                            problemStatement: "Return the starting gas station's index if you can travel around the circuit once in the clockwise direction, otherwise return -1.",
                            problemLink: "https://leetcode.com/problems/gas-station/",
                            sampleInput: "gas = [1,2,3,4,5], cost = [3,4,5,1,2]",
                            sampleOutput: "3",
                            approaches: [
                                {
                                    name: "Greedy",
                                    explanation: "If total gas < total cost, impossible. Else, try starting. If tank < 0, reset start to next station.",
                                    timeComplexity: "O(n)",
                                    spaceComplexity: "O(1)",
                                    code: `class Solution {
    public int canCompleteCircuit(int[] gas, int[] cost) {
        int total = 0, curr = 0, start = 0;
        for(int i=0; i<gas.length; i++) {
            total += gas[i] - cost[i];
            curr += gas[i] - cost[i];
            if(curr < 0) {
                start = i + 1;
                curr = 0;
            }
        }
        return total < 0 ? -1 : start;
    }
}`
                                }
                            ]
                        },
                        {
                            id: 'generate-binary-numbers',
                            title: 'Generate Binary Numbers from 1 to N',
                            problemStatement: "Generate binary representations of numbers from 1 to N using a queue.",
                            problemLink: "https://www.geeksforgeeks.org/generate-binary-numbers-1-n/",
                            sampleInput: "N = 5",
                            sampleOutput: "1, 10, 11, 100, 101",
                            approaches: [
                                {
                                    name: "BFS (Queue)",
                                    explanation: "Start with '1'. Pop front, append '0' and '1', print and push back.",
                                    timeComplexity: "O(n)",
                                    spaceComplexity: "O(n)",
                                    code: `void generateBinary(int n) {
    Queue<String> q = new LinkedList<>();
    q.add("1");
    while(n-- > 0) {
        String s = q.poll();
        System.out.println(s);
        q.add(s + "0");
        q.add(s + "1");
    }
}`
                                }
                            ]
                        },
                        {
                            id: 'lru-cache',
                            title: 'LRU Cache',
                            problemStatement: "Design a data structure that follows the constraints of a Least Recently Used (LRU) cache.",
                            problemLink: "https://leetcode.com/problems/lru-cache/",
                            sampleInput: "put(1,1), put(2,2), get(1), put(3,3)",
                            sampleOutput: "1, evicts 2",
                            approaches: [
                                {
                                    name: "HashMap + Doubly Linked List",
                                    explanation: "Map stores Key -> Node. Node has prev/next. Move accessed node to head. Remove tail if full.",
                                    timeComplexity: "O(1)",
                                    spaceComplexity: "O(capacity)",
                                    code: `class LRUCache {
    class Node { int k, v; Node p, n; Node(int k, int v){this.k=k;this.v=v;} }
    Map<Integer, Node> map = new HashMap<>();
    Node head = new Node(0,0), tail = new Node(0,0);
    int cap;
    public LRUCache(int capacity) {
        cap = capacity; head.n = tail; tail.p = head;
    }
    private void insert(Node node) {
        map.put(node.k, node);
        node.n = head.n; node.n.p = node; head.n = node; node.p = head;
    }
    private void remove(Node node) {
        map.remove(node.k);
        node.p.n = node.n; node.n.p = node.p;
    }
    public int get(int key) {
        if(!map.containsKey(key)) return -1;
        Node node = map.get(key);
        remove(node); insert(node);
        return node.v;
    }
    public void put(int key, int value) {
        if(map.containsKey(key)) remove(map.get(key));
        if(map.size() == cap) remove(tail.p);
        insert(new Node(key, value));
    }
}`
                                }
                            ]
                        },
                        {
                            id: 'task-scheduler',
                            title: 'Task Scheduler',
                            problemStatement: "Least interval to finish all tasks with cooldown n.",
                            problemLink: "https://leetcode.com/problems/task-scheduler/",
                            sampleInput: "tasks = ['A','A','A','B','B','B'], n = 2",
                            sampleOutput: "8",
                            approaches: [
                                {
                                    name: "Greedy / Math",
                                    explanation: "Find max frequency task. Frame structure around it. (max-1)*(n+1) + count_of_max.",
                                    timeComplexity: "O(n)",
                                    spaceComplexity: "O(1)",
                                    code: `class Solution {
    public int leastInterval(char[] tasks, int n) {
        int[] count = new int[26];
        int max = 0, maxCount = 0;
        for(char c : tasks) { count[c-'A']++; max = Math.max(max, count[c-'A']); }
        for(int c : count) if(c == max) maxCount++;
        return Math.max(tasks.length, (max - 1) * (n + 1) + maxCount);
    }
}`
                                }
                            ]
                        },
                        {
                            id: 'design-circular-queue',
                            title: 'Design Circular Queue',
                            problemStatement: "Design your implementation of the circular queue.",
                            problemLink: "https://leetcode.com/problems/design-circular-queue/",
                            sampleInput: "k=3, enQueue(1), enQueue(2)",
                            sampleOutput: "true, true",
                            approaches: [
                                {
                                    name: "Array Implementation",
                                    explanation: "Use fixed array with front/rear indices and size/count. (index + 1) % k.",
                                    timeComplexity: "O(1)",
                                    spaceComplexity: "O(k)",
                                    code: `class MyCircularQueue {
    int[] a; int f=0, r=-1, len=0;
    public MyCircularQueue(int k) { a = new int[k]; }
    public boolean enQueue(int value) {
        if(isFull()) return false;
        r = (r + 1) % a.length; a[r] = value; len++; return true;
    }
    public boolean deQueue() {
        if(isEmpty()) return false;
        f = (f + 1) % a.length; len--; return true;
    }
    public int Front() { return isEmpty() ? -1 : a[f]; }
    public int Rear() { return isEmpty() ? -1 : a[r]; }
    public boolean isEmpty() { return len == 0; }
    public boolean isFull() { return len == a.length; }
}`
                                }
                            ]
                        },
                        {
                            id: 'reveal-cards-increasing',
                            title: 'Reveal Cards In Increasing Order',
                            problemStatement: "Reorder deck so that revealing cards (top, bottom to top) produces increasing order.",
                            problemLink: "https://leetcode.com/problems/reveal-cards-in-increasing-order/",
                            sampleInput: "deck = [17,13,11,2,3,5,7]",
                            sampleOutput: "[2,13,3,11,5,17,7]",
                            approaches: [
                                {
                                    name: "Simulation with Deque",
                                    explanation: "Sort deck. Simulate reverse process: Take last added card, move to front, add new largest card to front.",
                                    timeComplexity: "O(n log n)",
                                    spaceComplexity: "O(n)",
                                    code: `class Solution {
    public int[] deckRevealedIncreasing(int[] deck) {
        Arrays.sort(deck);
        Deque<Integer> dq = new LinkedList<>();
        for (int i = deck.length - 1; i >= 0; i--) {
            if (!dq.isEmpty()) dq.addFirst(dq.pollLast());
            dq.addFirst(deck[i]);
        }
        int[] res = new int[deck.length];
        int i = 0;
        for (int c : dq) res[i++] = c;
        return res;
    }
}`
                                }
                            ]
                        }
                    ]
                }
            ]
        },
        {
            id: 'hierarchical-structures',
            title: 'Hierarchical Structures',
            subTopics: [
                {
                    id: 'trees',
                    title: 'Trees (Binary Trees & BST)',
                    questions: [
                        {
                            id: 'max-depth-binary-tree',
                            title: 'Maximum Depth of Binary Tree',
                            problemStatement: "Given the root of a binary tree, return its maximum depth.",
                            problemLink: "https://leetcode.com/problems/maximum-depth-of-binary-tree/",
                            sampleInput: "root = [3,9,20,null,null,15,7]",
                            sampleOutput: "3",
                            approaches: [
                                {
                                    name: "DFS (Recursion)",
                                    explanation: "Max depth is 1 + max(left depth, right depth). Base case: null root has depth 0.",
                                    timeComplexity: "O(n)",
                                    spaceComplexity: "O(h)",
                                    code: `class Solution {
    public int maxDepth(TreeNode root) {
        if (root == null) return 0;
        return 1 + Math.max(maxDepth(root.left), maxDepth(root.right));
    }
}`
                                },
                                {
                                    name: "BFS (Level Order)",
                                    explanation: "Traverse level by level. Depth is the number of levels processed.",
                                    timeComplexity: "O(n)",
                                    spaceComplexity: "O(n)",
                                    code: `class Solution {
    public int maxDepth(TreeNode root) {
        if(root == null) return 0;
        Queue<TreeNode> q = new LinkedList<>();
        q.offer(root);
        int depth = 0;
        while(!q.isEmpty()) {
            int size = q.size();
            depth++;
            while(size-- > 0) {
                TreeNode node = q.poll();
                if(node.left != null) q.offer(node.left);
                if(node.right != null) q.offer(node.right);
            }
        }
        return depth;
    }
}`
                                }
                            ]
                        },
                        {
                            id: 'diameter-binary-tree',
                            title: 'Diameter of Binary Tree',
                            problemStatement: "Return the length of the longest path between any two nodes in a tree. This path may or may not pass through the root.",
                            problemLink: "https://leetcode.com/problems/diameter-of-binary-tree/",
                            sampleInput: "root = [1,2,3,4,5]",
                            sampleOutput: "3",
                            approaches: [
                                {
                                    name: "DFS",
                                    explanation: "For every node, the longest path passing through it is (leftHeight + rightHeight). Update global max.",
                                    timeComplexity: "O(n)",
                                    spaceComplexity: "O(h)",
                                    code: `class Solution {
    int max = 0;
    public int diameterOfBinaryTree(TreeNode root) {
        height(root);
        return max;
    }
    int height(TreeNode root) {
        if(root == null) return 0;
        int l = height(root.left);
        int r = height(root.right);
        max = Math.max(max, l + r);
        return 1 + Math.max(l, r);
    }
}`
                                }
                            ]
                        },
                        {
                            id: 'balanced-binary-tree',
                            title: 'Check if Tree is Balanced',
                            problemStatement: "A binary tree is balanced if the height of the two subtrees of any node never differs by more than one.",
                            problemLink: "https://leetcode.com/problems/balanced-binary-tree/",
                            sampleInput: "root = [3,9,20,null,null,15,7]",
                            sampleOutput: "true",
                            approaches: [
                                {
                                    name: "DFS (Bottom-Up)",
                                    explanation: "Return height if balanced, or -1 if unbalanced. If any child returns -1 or current diff > 1, return -1.",
                                    timeComplexity: "O(n)",
                                    spaceComplexity: "O(h)",
                                    code: `class Solution {
    public boolean isBalanced(TreeNode root) {
        return helper(root) != -1;
    }
    int helper(TreeNode root) {
        if (root == null) return 0;
        int l = helper(root.left);
        if (l == -1) return -1;
        int r = helper(root.right);
        if (r == -1) return -1;
        if (Math.abs(l - r) > 1) return -1;
        return 1 + Math.max(l, r);
    }
}`
                                }
                            ]
                        },
                        {
                            id: 'lca-binary-tree',
                            title: 'Lowest Common Ancestor (LCA)',
                            problemStatement: "Find the lowest node that has both p and q as descendants.",
                            problemLink: "https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-tree/",
                            sampleInput: "root = [3,5,1,6,2,0,8], p = 5, q = 1",
                            sampleOutput: "3",
                            approaches: [
                                {
                                    name: "DFS",
                                    explanation: "If root is p or q, return root. Look in left and right. If both return non-null, root is LCA. If only one returns non-null, that is the answer.",
                                    timeComplexity: "O(n)",
                                    spaceComplexity: "O(h)",
                                    code: `class Solution {
    public TreeNode lowestCommonAncestor(TreeNode root, TreeNode p, TreeNode q) {
        if(root == null || root == p || root == q) return root;
        TreeNode left = lowestCommonAncestor(root.left, p, q);
        TreeNode right = lowestCommonAncestor(root.right, p, q);
        if(left != null && right != null) return root;
        return left != null ? left : right;
    }
}`
                                }
                            ]
                        },
                        {
                            id: 'level-order-traversal',
                            title: 'Level Order Traversal',
                            problemStatement: "Given the root of a binary tree, return the level order traversal of its nodes' values. (i.e., from left to right, level by level).",
                            problemLink: "https://leetcode.com/problems/binary-tree-level-order-traversal/",
                            sampleInput: "root = [3,9,20,null,null,15,7]",
                            sampleOutput: "[[3],[9,20],[15,7]]",
                            approaches: [
                                {
                                    name: "BFS (Queue)",
                                    explanation: "Use a Queue. Get size of queue at start of loop to process exactly one level.",
                                    timeComplexity: "O(n)",
                                    spaceComplexity: "O(n)",
                                    code: `class Solution {
    public List<List<Integer>> levelOrder(TreeNode root) {
        List<List<Integer>> res = new ArrayList<>();
        if(root == null) return res;
        Queue<TreeNode> q = new LinkedList<>();
        q.offer(root);
        while(!q.isEmpty()) {
            int size = q.size();
            List<Integer> level = new ArrayList<>();
            while(size-- > 0) {
                TreeNode node = q.poll();
                level.add(node.val);
                if(node.left != null) q.add(node.left);
                if(node.right != null) q.add(node.right);
            }
            res.add(level);
        }
        return res;
    }
}`
                                }
                            ]
                        },
                        {
                            id: 'zigzag-level-order',
                            title: 'Binary Tree Zigzag Level Order Traversal',
                            problemStatement: "Return the zigzag level order traversal. (Left to right, then right to left).",
                            problemLink: "https://leetcode.com/problems/binary-tree-zigzag-level-order-traversal/",
                            sampleInput: "root = [3,9,20,null,null,15,7]",
                            sampleOutput: "[[3],[20,9],[15,7]]",
                            approaches: [
                                {
                                    name: "BFS + Deque",
                                    explanation: "Use BFS. If left-to-right, add to tail of list. If right-to-left, add to head of list.",
                                    timeComplexity: "O(n)",
                                    spaceComplexity: "O(n)",
                                    code: `class Solution {
    public List<List<Integer>> zigzagLevelOrder(TreeNode root) {
        List<List<Integer>> res = new ArrayList<>();
        if(root == null) return res;
        Queue<TreeNode> q = new LinkedList<>();
        q.offer(root);
        boolean order = true;
        while(!q.isEmpty()) {
            int size = q.size();
            LinkedList<Integer> level = new LinkedList<>();
            while(size-- > 0) {
                TreeNode node = q.poll();
                if(order) level.add(node.val);
                else level.addFirst(node.val);
                if(node.left != null) q.add(node.left);
                if(node.right != null) q.add(node.right);
            }
            res.add(level);
            order = !order;
        }
        return res;
    }
}`
                                }
                            ]
                        },
                        {
                            id: 'validate-bst',
                            title: 'Validate Binary Search Tree',
                            problemStatement: "Determine if it is a valid binary search tree (BST).",
                            problemLink: "https://leetcode.com/problems/validate-binary-search-tree/",
                            sampleInput: "root = [2,1,3]",
                            sampleOutput: "true",
                            approaches: [
                                {
                                    name: "DFS (Ranges)",
                                    explanation: "Recursively check if `min < node.val < max`. Update constraints for children.",
                                    timeComplexity: "O(n)",
                                    spaceComplexity: "O(h)",
                                    code: `class Solution {
    public boolean isValidBST(TreeNode root) {
        return helper(root, null, null);
    }
    boolean helper(TreeNode root, Integer min, Integer max) {
        if(root == null) return true;
        if((min != null && root.val <= min) || (max != null && root.val >= max)) return false;
        return helper(root.left, min, root.val) && helper(root.right, root.val, max);
    }
}`
                                }
                            ]
                        },
                        {
                            id: 'construct-binary-tree',
                            title: 'Construct Binary Tree from Preorder and Inorder',
                            problemStatement: "Construct binary tree from preorder and inorder traversal arrays.",
                            problemLink: "https://leetcode.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal/",
                            sampleInput: "preorder = [3,9,20,15,7], inorder = [9,3,15,20,7]",
                            sampleOutput: "[3,9,20,null,null,15,7]",
                            approaches: [
                                {
                                    name: "Recursion + HashMap",
                                    explanation: "Preorder first is Root. Find Root in Inorder map. Left of Inorder index is Left Subtree, Right is Right Subtree.",
                                    timeComplexity: "O(n)",
                                    spaceComplexity: "O(n)",
                                    code: `class Solution {
    Map<Integer, Integer> map = new HashMap<>();
    int preIdx = 0;
    public TreeNode buildTree(int[] preorder, int[] inorder) {
        for(int i=0; i<inorder.length; i++) map.put(inorder[i], i);
        return build(preorder, 0, inorder.length - 1);
    }
    TreeNode build(int[] pre, int start, int end) {
        if(start > end) return null;
        int rootVal = pre[preIdx++];
        TreeNode root = new TreeNode(rootVal);
        int idx = map.get(rootVal);
        root.left = build(pre, start, idx - 1);
        root.right = build(pre, idx + 1, end);
        return root;
    }
}`
                                }
                            ]
                        },
                        {
                            id: 'right-side-view',
                            title: 'Binary Tree Right Side View',
                            problemStatement: "Return the values of the nodes you can see ordered from top to bottom.",
                            problemLink: "https://leetcode.com/problems/binary-tree-right-side-view/",
                            sampleInput: "root = [1,2,3,null,5,null,4]",
                            sampleOutput: "[1,3,4]",
                            approaches: [
                                {
                                    name: "DFS",
                                    explanation: "Visit Right child first. Add to result if we reach a new depth level for the first time.",
                                    timeComplexity: "O(n)",
                                    spaceComplexity: "O(h)",
                                    code: `class Solution {
    List<Integer> res = new ArrayList<>();
    public List<Integer> rightSideView(TreeNode root) {
        dfs(root, 0);
        return res;
    }
    void dfs(TreeNode root, int depth) {
        if(root == null) return;
        if(depth == res.size()) res.add(root.val);
        dfs(root.right, depth + 1);
        dfs(root.left, depth + 1);
    }
}`
                                }
                            ]
                        },
                        {
                            id: 'flatten-binary-tree',
                            title: 'Flatten Binary Tree to Linked List',
                            problemStatement: "Flatten the tree into a linked list in-place (pre-order).",
                            problemLink: "https://leetcode.com/problems/flatten-binary-tree-to-linked-list/",
                            sampleInput: "root = [1,2,5,3,4,null,6]",
                            sampleOutput: "[1,null,2,null,3,null,4,null,5,null,6]",
                            approaches: [
                                {
                                    name: "Morris Like / DFS",
                                    explanation: "For current node, move left child to right. Attach original right child to the rightmost node of the new right child (original left).",
                                    timeComplexity: "O(n)",
                                    spaceComplexity: "O(1)",
                                    code: `class Solution {
    public void flatten(TreeNode root) {
        TreeNode curr = root;
        while(curr != null) {
            if(curr.left != null) {
                TreeNode runner = curr.left;
                while(runner.right != null) runner = runner.right;
                runner.right = curr.right;
                curr.right = curr.left;
                curr.left = null;
            }
            curr = curr.right;
        }
    }
}`
                                }
                            ]
                        },
                        {
                            id: 'path-sum-iii',
                            title: 'Path Sum III',
                            problemStatement: "Return the number of paths where the sum of the values along the path equals targetSum.",
                            problemLink: "https://leetcode.com/problems/path-sum-iii/",
                            sampleInput: "root = [10,5,-3,3,2,null,11,3,-2,null,1], targetSum = 8",
                            sampleOutput: "3",
                            approaches: [
                                {
                                    name: "Prefix Sum (DFS)",
                                    explanation: "Maintain a map of prefix sums encountered on the current path. `currSum - target` checks if a valid sub-path ending at current node exists.",
                                    timeComplexity: "O(n)",
                                    spaceComplexity: "O(n)",
                                    code: `class Solution {
    Map<Long, Integer> map = new HashMap<>();
    int count = 0;
    public int pathSum(TreeNode root, int targetSum) {
        map.put(0L, 1);
        dfs(root, 0L, targetSum);
        return count;
    }
    void dfs(TreeNode root, long curr, int target) {
        if(root == null) return;
        curr += root.val;
        count += map.getOrDefault(curr - target, 0);
        map.put(curr, map.getOrDefault(curr, 0) + 1);
        dfs(root.left, curr, target);
        dfs(root.right, curr, target);
        map.put(curr, map.get(curr) - 1);
    }
}`
                                }
                            ]
                        },
                        {
                            id: 'serialize-deserialize',
                            title: 'Serialize and Deserialize Binary Tree',
                            problemStatement: "Design an algorithm to serialize and deserialize a binary tree.",
                            problemLink: "https://leetcode.com/problems/serialize-and-deserialize-binary-tree/",
                            sampleInput: "root = [1,2,3,null,null,4,5]",
                            sampleOutput: "root",
                            approaches: [
                                {
                                    name: "Preorder DFS",
                                    explanation: "Serialize: Root, Left, Right. Use '#' for null. Deserialize: Queue/Iterator on string tokens.",
                                    timeComplexity: "O(n)",
                                    spaceComplexity: "O(n)",
                                    code: `public class Codec {
    public String serialize(TreeNode root) {
        if(root == null) return "#";
        return root.val + "," + serialize(root.left) + "," + serialize(root.right);
    }
    public TreeNode deserialize(String data) {
        Queue<String> q = new LinkedList<>(Arrays.asList(data.split(",")));
        return helper(q);
    }
    TreeNode helper(Queue<String> q) {
        String s = q.poll();
        if(s.equals("#")) return null;
        TreeNode root = new TreeNode(Integer.valueOf(s));
        root.left = helper(q);
        root.right = helper(q);
        return root;
    }
}`
                                }
                            ]
                        }
                    ]
                }
            ]
        },
        {
            id: 'networking-connections',
            title: 'Networking & Connections',
            subTopics: [
                {
                    id: 'graphs',
                    title: 'Graphs',
                    questions: [
                        {
                            id: 'number-of-islands',
                            title: 'Number of Islands',
                            problemStatement: "Given an m x n 2D binary grid grid which represents a map of '1's (land) and '0's (water), return the number of islands.",
                            problemLink: "https://leetcode.com/problems/number-of-islands/",
                            sampleInput: "grid = [['1','1','0'],['1','0','0'],['0','0','0']]",
                            sampleOutput: "2",
                            approaches: [
                                {
                                    name: "DFS",
                                    explanation: "Iterate through grid. If '1' found, increment count and DFS to mark all connected '1's as visited ('0').",
                                    timeComplexity: "O(m*n)",
                                    spaceComplexity: "O(m*n)",
                                    code: `class Solution {
    public int numIslands(char[][] grid) {
        int count = 0;
        for(int i=0; i<grid.length; i++) {
            for(int j=0; j<grid[0].length; j++) {
                if(grid[i][j] == '1') {
                    dfs(grid, i, j);
                    count++;
                }
            }
        }
        return count;
    }
    void dfs(char[][] grid, int i, int j) {
        if(i<0||j<0||i>=grid.length||j>=grid[0].length||grid[i][j]=='0') return;
        grid[i][j] = '0';
        dfs(grid, i+1, j); dfs(grid, i-1, j); dfs(grid, i, j+1); dfs(grid, i, j-1);
    }
}`
                                }
                            ]
                        },
                        {
                            id: 'clone-graph',
                            title: 'Clone Graph',
                            problemStatement: "Return a deep copy (clone) of the graph.",
                            problemLink: "https://leetcode.com/problems/clone-graph/",
                            sampleInput: "adjList = [[2,4],[1,3],[2,4],[1,3]]",
                            sampleOutput: "[[2,4],[1,3],[2,4],[1,3]]",
                            approaches: [
                                {
                                    name: "DFS + HashMap",
                                    explanation: "Use a map to store copies of visited nodes to avoid cycles and redundant work.",
                                    timeComplexity: "O(V+E)",
                                    spaceComplexity: "O(V)",
                                    code: `class Solution {
    Map<Node, Node> map = new HashMap<>();
    public Node cloneGraph(Node node) {
        if(node == null) return null;
        if(map.containsKey(node)) return map.get(node);
        Node clone = new Node(node.val);
        map.put(node, clone);
        for(Node n : node.neighbors) clone.neighbors.add(cloneGraph(n));
        return clone;
    }
}`
                                }
                            ]
                        },
                        {
                            id: 'course-schedule',
                            title: 'Course Schedule (Detect Cycle)',
                            problemStatement: "Can you finish all courses given prerequisites? (Detect cycle in directed graph)",
                            problemLink: "https://leetcode.com/problems/course-schedule/",
                            sampleInput: "numCourses = 2, prerequisites = [[1,0]]",
                            sampleOutput: "true",
                            approaches: [
                                {
                                    name: "Topological Sort (Kahn's Algo)",
                                    explanation: "Compute indegrees. Add nodes with 0 indegree to queue. Poll and decrement neighbor indegrees. Count processed nodes.",
                                    timeComplexity: "O(V+E)",
                                    spaceComplexity: "O(V+E)",
                                    code: `class Solution {
    public boolean canFinish(int numCourses, int[][] prerequisites) {
        int[] indegree = new int[numCourses];
        List<List<Integer>> adj = new ArrayList<>();
        for(int i=0; i<numCourses; i++) adj.add(new ArrayList<>());
        for(int[] p : prerequisites) { adj.get(p[1]).add(p[0]); indegree[p[0]]++; }
        Queue<Integer> q = new LinkedList<>();
        for(int i=0; i<numCourses; i++) if(indegree[i] == 0) q.add(i);
        int count = 0;
        while(!q.isEmpty()) {
            int u = q.poll(); count++;
            for(int v : adj.get(u)) if(--indegree[v] == 0) q.add(v);
        }
        return count == numCourses;
    }
}`
                                }
                            ]
                        },
                        {
                            id: 'pacific-atlantic-water-flow',
                            title: 'Pacific Atlantic Water Flow',
                            problemStatement: "Find cells that can flow into both Pacific and Atlantic oceans.",
                            problemLink: "https://leetcode.com/problems/pacific-atlantic-water-flow/",
                            sampleInput: "heights = [[1,2,2,3,5],[3,2,3,4,4],[2,4,5,3,1],[6,7,1,4,5],[5,1,1,2,4]]",
                            sampleOutput: "[[0,4],[1,3],[1,4],[2,2],[3,0],[3,1],[4,0]]",
                            approaches: [
                                {
                                    name: "Multi-Source DFS",
                                    explanation: "Start from Pacific border and Atlantic border separately. Flow 'uphill'. Find intersection of reachable cells.",
                                    timeComplexity: "O(m*n)",
                                    spaceComplexity: "O(m*n)",
                                    code: `class Solution {
    public List<List<Integer>> pacificAtlantic(int[][] heights) {
        int m = heights.length, n = heights[0].length;
        boolean[][] pac = new boolean[m][n], atl = new boolean[m][n];
        for(int i=0; i<m; i++) { dfs(heights, pac, i, 0); dfs(heights, atl, i, n-1); }
        for(int j=0; j<n; j++) { dfs(heights, pac, 0, j); dfs(heights, atl, m-1, j); }
        List<List<Integer>> res = new ArrayList<>();
        for(int i=0; i<m; i++) 
            for(int j=0; j<n; j++) 
                if(pac[i][j] && atl[i][j]) res.add(Arrays.asList(i,j));
        return res;
    }
    void dfs(int[][] h, boolean[][] vis, int r, int c) {
        vis[r][c] = true;
        int[][] dirs = {{0,1},{0,-1},{1,0},{-1,0}};
        for(int[] d : dirs) {
            int nr = r+d[0], nc = c+d[1];
            if(nr>=0 && nr<h.length && nc>=0 && nc<h[0].length && !vis[nr][nc] && h[nr][nc] >= h[r][c])
                dfs(h, vis, nr, nc);
        }
    }
}`
                                }
                            ]
                        },
                        {
                            id: 'word-ladder',
                            title: 'Word Ladder',
                            problemStatement: "Shortest transformation sequence from beginWord to endWord.",
                            problemLink: "https://leetcode.com/problems/word-ladder/",
                            sampleInput: "beginWord = 'hit', endWord = 'cog', wordList = ['hot','dot','dog','lot','log','cog']",
                            sampleOutput: "5",
                            approaches: [
                                {
                                    name: "BFS",
                                    explanation: "Level-by-level transformation. Change one char at a time. Use Set for O(1) lookup.",
                                    timeComplexity: "O(L^2 * N)",
                                    spaceComplexity: "O(L * N)",
                                    code: `class Solution {
    public int ladderLength(String beginWord, String endWord, List<String> wordList) {
        Set<String> set = new HashSet<>(wordList);
        if(!set.contains(endWord)) return 0;
        Queue<String> q = new LinkedList<>(); q.add(beginWord);
        int step = 1;
        while(!q.isEmpty()) {
            int size = q.size();
            while(size-- > 0) {
                char[] chars = q.poll().toCharArray();
                for(int i=0; i<chars.length; i++) {
                    char orig = chars[i];
                    for(char c='a'; c<='z'; c++) {
                        if(c == orig) continue;
                        chars[i] = c;
                        String next = new String(chars);
                        if(next.equals(endWord)) return step + 1;
                        if(set.contains(next)) { q.add(next); set.remove(next); }
                    }
                    chars[i] = orig;
                }
            }
            step++;
        }
        return 0;
    }
}`
                                }
                            ]
                        },
                        {
                            id: 'number-connected-components',
                            title: 'Number of Connected Components in an Undirected Graph',
                            problemStatement: "Count connected components (islands in a graph).",
                            problemLink: "https://leetcode.com/problems/number-of-connected-components-in-an-undirected-graph/",
                            sampleInput: "n = 5, edges = [[0,1],[1,2],[3,4]]",
                            sampleOutput: "2",
                            approaches: [
                                {
                                    name: "Union-Find",
                                    explanation: "Initialize each node as parent of itself. Union linked nodes. Final count is number of unique roots, or N - successful_unions.",
                                    timeComplexity: "O(E * alpha(N))",
                                    spaceComplexity: "O(N)",
                                    code: `class Solution {
    public int countComponents(int n, int[][] edges) {
        int[] p = new int[n];
        for(int i=0; i<n; i++) p[i] = i;
        int count = n;
        for(int[] e : edges) {
            int r1 = find(p, e[0]), r2 = find(p, e[1]);
            if(r1 != r2) { p[r1] = r2; count--; }
        }
        return count;
    }
    int find(int[] p, int x) { while(x != p[x]) x = p[x]; return x; }
}`
                                }
                            ]
                        },
                        {
                            id: 'graph-valid-tree',
                            title: 'Graph Valid Tree',
                            problemStatement: "Check if graph is a valid tree (1 connected component, no cycles).",
                            problemLink: "https://leetcode.com/problems/graph-valid-tree/",
                            sampleInput: "n = 5, edges = [[0,1],[0,2],[0,3],[1,4]]",
                            sampleOutput: "true",
                            approaches: [
                                {
                                    name: "Union-Find",
                                    explanation: "Tree must have N-1 edges. If edge connects two already connected components, it's a cycle.",
                                    timeComplexity: "O(N)",
                                    spaceComplexity: "O(N)",
                                    code: `class Solution {
    public boolean validTree(int n, int[][] edges) {
        if(edges.length != n - 1) return false;
        int[] p = new int[n]; for(int i=0;i<n;i++) p[i]=i;
        for(int[] e : edges) {
            int r1 = find(p, e[0]), r2 = find(p, e[1]);
            if(r1 == r2) return false;
            p[r1] = r2;
        }
        return true;
    }
    int find(int[] p, int x) { return p[x] == x ? x : (p[x] = find(p, p[x])); }
}`
                                }
                            ]
                        },
                        {
                            id: '01-matrix',
                            title: '01 Matrix',
                            problemStatement: "Find the distance of the nearest 0 for each cell.",
                            problemLink: "https://leetcode.com/problems/01-matrix/",
                            sampleInput: "mat = [[0,0,0],[0,1,0],[0,0,0]]",
                            sampleOutput: "[[0,0,0],[0,1,0],[0,0,0]]",
                            approaches: [
                                {
                                    name: "Multi-Source BFS",
                                    explanation: "Start BFS from all 0s (dist=0). Expand to 1s.",
                                    timeComplexity: "O(m*n)",
                                    spaceComplexity: "O(m*n)",
                                    code: `class Solution {
    public int[][] updateMatrix(int[][] mat) {
        int m = mat.length, n = mat[0].length;
        Queue<int[]> q = new LinkedList<>();
        for(int i=0;i<m;i++) 
            for(int j=0;j<n;j++) 
                if(mat[i][j]==0) q.offer(new int[]{i,j});
                else mat[i][j] = -1;
        int[][] dirs = {{0,1},{0,-1},{1,0},{-1,0}};
        while(!q.isEmpty()) {
            int[] c = q.poll();
            for(int[] d : dirs) {
                int r=c[0]+d[0], col=c[1]+d[1];
                if(r>=0 && r<m && col>=0 && col<n && mat[r][col]==-1) {
                    mat[r][col] = mat[c[0]][c[1]] + 1;
                    q.offer(new int[]{r,col});
                }
            }
        }
        return mat;
    }
}`
                                }
                            ]
                        },
                        {
                            id: 'surrounded-regions',
                            title: 'Surrounded Regions',
                            problemStatement: "Capture all regions that are 4-directionally surrounded by 'X'.",
                            problemLink: "https://leetcode.com/problems/surrounded-regions/",
                            sampleInput: "board = [['X','X','X','X'],['X','O','O','X'],['X','X','O','X'],['X','O','X','X']]",
                            sampleOutput: "['X','X','X','X'],['X','X','X','X'],['X','X','X','X'],['X','O','X','X']",
                            approaches: [
                                {
                                    name: "Boundary DFS",
                                    explanation: "'O's on the boundary cannot be captured. Mark them as safe (e.g., 'T'). Convert remaining 'O' to 'X', then 'T' back to 'O'.",
                                    timeComplexity: "O(m*n)",
                                    spaceComplexity: "O(m*n)",
                                    code: `class Solution {
    public void solve(char[][] board) {
        int m = board.length, n = board[0].length;
        for(int i=0; i<m; i++) { dfs(board, i, 0); dfs(board, i, n-1); }
        for(int j=0; j<n; j++) { dfs(board, 0, j); dfs(board, m-1, j); }
        for(int i=0; i<m; i++) 
            for(int j=0; j<n; j++) 
                if(board[i][j] == 'O') board[i][j] = 'X';
                else if(board[i][j] == 'T') board[i][j] = 'O';
    }
    void dfs(char[][] b, int r, int c) {
        if(r<0||c<0||r>=b.length||c>=b[0].length||b[r][c]!='O') return;
        b[r][c] = 'T';
        dfs(b, r+1, c); dfs(b, r-1, c); dfs(b, r, c+1); dfs(b, r, c-1);
    }
}`
                                }
                            ]
                        },
                        {
                            id: 'cheapest-flights',
                            title: 'Cheapest Flights Within K Stops',
                            problemStatement: "Find cheapest flight from src to dst with at most K stops.",
                            problemLink: "https://leetcode.com/problems/cheapest-flights-within-k-stops/",
                            sampleInput: "n = 3, flights = [[0,1,100],[1,2,100],[0,2,500]], src = 0, dst = 2, k = 1",
                            sampleOutput: "200",
                            approaches: [
                                {
                                    name: "Bellman-Ford (Relaxation)",
                                    explanation: "Relax all edges K+1 times. Use a temp array to ensure we only use paths from previous iteration (stops).",
                                    timeComplexity: "O(K*E)",
                                    spaceComplexity: "O(n)",
                                    code: `class Solution {
    public int findCheapestPrice(int n, int[][] flights, int src, int dst, int k) {
        int[] dist = new int[n];
        Arrays.fill(dist, Integer.MAX_VALUE);
        dist[src] = 0;
        for(int i=0; i<=k; i++) {
            int[] temp = dist.clone();
            for(int[] f : flights) {
                if(dist[f[0]] != Integer.MAX_VALUE) 
                    temp[f[1]] = Math.min(temp[f[1]], dist[f[0]] + f[2]);
            }
            dist = temp;
        }
        return dist[dst] == Integer.MAX_VALUE ? -1 : dist[dst];
    }
}`
                                }
                            ]
                        },
                        {
                            id: 'is-graph-bipartite',
                            title: 'Is Graph Bipartite?',
                            problemStatement: "Can you split nodes into two sets such that every edge connects a node in set A to a node in set B?",
                            problemLink: "https://leetcode.com/problems/is-graph-bipartite/",
                            sampleInput: "graph = [[1,2,3],[0,2],[0,1,3],[0,2]]",
                            sampleOutput: "false",
                            approaches: [
                                {
                                    name: "BFS (Graph Coloring)",
                                    explanation: "Color nodes 0 and 1 via BFS. If we meet a node with the same color, conflict.",
                                    timeComplexity: "O(V+E)",
                                    spaceComplexity: "O(V)",
                                    code: `class Solution {
    public boolean isBipartite(int[][] graph) {
        int n = graph.length;
        int[] colors = new int[n]; // 0=uncolored, 1=A, -1=B
        for(int i=0; i<n; i++) {
            if(colors[i] != 0) continue;
            Queue<Integer> q = new LinkedList<>();
            q.offer(i); colors[i] = 1;
            while(!q.isEmpty()) {
                int u = q.poll();
                for(int v : graph[u]) {
                    if(colors[v] == 0) {
                        colors[v] = -colors[u];
                        q.offer(v);
                    } else if(colors[v] == colors[u]) return false;
                }
            }
        }
        return true;
    }
}`
                                }
                            ]
                        }
                    ]
                }
            ]
        },
        {
            id: 'string-optimization',
            title: 'String Optimization',
            subTopics: [
                {
                    id: 'tries',
                    title: 'Tries (Prefix Trees)',
                    questions: [
                        {
                            id: 'implement-trie',
                            title: 'Implement Trie (Prefix Tree)',
                            problemStatement: "Implement a trie with insert, search, and startsWith methods.",
                            problemLink: "https://leetcode.com/problems/implement-trie-prefix-tree/",
                            sampleInput: "insert('apple'), search('apple')",
                            sampleOutput: "true",
                            approaches: [
                                {
                                    name: "TrieNode Structure",
                                    explanation: "Use an array[26] (or Map) for children and a boolean isEnd flag.",
                                    timeComplexity: "O(L) per op",
                                    spaceComplexity: "O(L * N)",
                                    code: `class Trie {
    class TrieNode {
        TrieNode[] children = new TrieNode[26];
        boolean isEnd = false;
    }
    TrieNode root = new TrieNode();
    public void insert(String word) {
        TrieNode node = root;
        for(char c : word.toCharArray()) {
            if(node.children[c-'a'] == null) node.children[c-'a'] = new TrieNode();
            node = node.children[c-'a'];
        }
        node.isEnd = true;
    }
    public boolean search(String word) {
        TrieNode node = find(word);
        return node != null && node.isEnd;
    }
    public boolean startsWith(String prefix) {
        return find(prefix) != null;
    }
    private TrieNode find(String s) {
        TrieNode node = root;
        for(char c : s.toCharArray()) {
            if(node.children[c-'a'] == null) return null;
            node = node.children[c-'a'];
        }
        return node;
    }
}`
                                }
                            ]
                        },
                        {
                            id: 'design-add-search-words',
                            title: 'Design Add and Search Words Data Structure',
                            problemStatement: "Design a data structure that supports adding words and searching words (with '.' wildcard support).",
                            problemLink: "https://leetcode.com/problems/design-add-and-search-words-data-structure/",
                            sampleInput: "addWord('bad'), search('.ad')",
                            sampleOutput: "true",
                            approaches: [
                                {
                                    name: "DFS Trie Traversal",
                                    explanation: "For '.', try all non-null children recurisvely.",
                                    timeComplexity: "search O(26^L)",
                                    spaceComplexity: "O(L * N)",
                                    code: `class WordDictionary {
    class TrieNode { TrieNode[] children = new TrieNode[26]; boolean isEnd; }
    TrieNode root = new TrieNode();
    public void addWord(String word) {
        TrieNode node = root;
        for(char c : word.toCharArray()) {
            if(node.children[c-'a'] == null) node.children[c-'a'] = new TrieNode();
            node = node.children[c-'a'];
        }
        node.isEnd = true;
    }
    public boolean search(String word) { return match(word.toCharArray(), 0, root); }
    boolean match(char[] ch, int k, TrieNode node) {
        if(k == ch.length) return node.isEnd;
        if(ch[k] == '.') {
            for(int i=0; i<26; i++) {
                if(node.children[i] != null && match(ch, k+1, node.children[i])) return true;
            }
            return false;
        } else {
            return node.children[ch[k]-'a'] != null && match(ch, k+1, node.children[ch[k]-'a']);
        }
    }
}`
                                }
                            ]
                        },
                        {
                            id: 'word-search-ii',
                            title: 'Word Search II',
                            problemStatement: "Find all words in the board that exist in the word list.",
                            problemLink: "https://leetcode.com/problems/word-search-ii/",
                            sampleInput: "board = [...], words = ['oath','pea','eat','rain']",
                            sampleOutput: "['eat','oath']",
                            approaches: [
                                {
                                    name: "Backtracking + Trie",
                                    explanation: "Insert all words into Trie. Start DFS from each cell. If path matches a trie path, continue. Prune effectively.",
                                    timeComplexity: "O(N * M * 4^L)",
                                    spaceComplexity: "O(Total Chars)",
                                    code: `class Solution {
    class TrieNode { TrieNode[] next = new TrieNode[26]; String word; }
    public List<String> findWords(char[][] board, String[] words) {
        List<String> res = new ArrayList<>();
        TrieNode root = new TrieNode();
        for(String w : words) {
            TrieNode p = root;
            for(char c : w.toCharArray()) {
                if(p.next[c-'a']==null) p.next[c-'a'] = new TrieNode();
                p = p.next[c-'a'];
            }
            p.word = w;
        }
        for(int i=0; i<board.length; i++) 
            for(int j=0; j<board[0].length; j++) 
                dfs(board, i, j, root, res);
        return res;
    }
    void dfs(char[][] b, int r, int c, TrieNode p, List<String> res) {
        if(r<0||c<0||r>=b.length||c>=b[0].length||b[r][c]=='#'||p.next[b[r][c]-'a']==null) return;
        p = p.next[b[r][c]-'a'];
        if(p.word != null) { res.add(p.word); p.word = null; }
        char temp = b[r][c];
        b[r][c] = '#';
        dfs(b,r+1,c,p,res); dfs(b,r-1,c,p,res); dfs(b,r,c+1,p,res); dfs(b,r,c-1,p,res);
        b[r][c] = temp;
    }
}`
                                }
                            ]
                        },
                        {
                            id: 'longest-common-prefix',
                            title: 'Longest Common Prefix',
                            problemStatement: "Find the longest common prefix string amongst an array of strings.",
                            problemLink: "https://leetcode.com/problems/longest-common-prefix/",
                            sampleInput: "strs = ['flower','flow','flight']",
                            sampleOutput: "'fl'",
                            approaches: [
                                {
                                    name: "Trie",
                                    explanation: "Insert all words (or shortest). Traverse from root until a node has >1 children or check mismatch.",
                                    timeComplexity: "O(S)",
                                    spaceComplexity: "O(S)",
                                    code: `// Trie approach omitted, simple sorting is often better.`
                                },
                                {
                                    name: "Horizontal Scanning",
                                    explanation: "Take first string as prefix. Compare with second, trim prefix. Repeat.",
                                    timeComplexity: "O(S)",
                                    spaceComplexity: "O(1)",
                                    code: `class Solution {
    public String longestCommonPrefix(String[] strs) {
        if(strs.length == 0) return "";
        String prefix = strs[0];
        for(int i=1; i<strs.length; i++) {
            while(strs[i].indexOf(prefix) != 0) {
                prefix = prefix.substring(0, prefix.length()-1);
                if(prefix.isEmpty()) return "";
            }
        }
        return prefix;
    }
}`
                                }
                            ]
                        },
                        {
                            id: 'maximum-xor-two-numbers',
                            title: 'Maximum XOR of Two Numbers',
                            problemStatement: "Find max `nums[i] XOR nums[j]`.",
                            problemLink: "https://leetcode.com/problems/maximum-xor-of-two-numbers-in-an-array/",
                            sampleInput: "[3,10,5,25,2,8]",
                            sampleOutput: "28",
                            approaches: [
                                {
                                    name: "Bitwise Trie",
                                    explanation: "Insert binary representation of each number (MSB to LSB). For each number, query the Trie trying to go opposite bit direction to maximize XOR.",
                                    timeComplexity: "O(N * 32)",
                                    spaceComplexity: "O(N * 32)",
                                    code: `class Solution {
    class TrieNode { TrieNode[] next = new TrieNode[2]; }
    public int findMaximumXOR(int[] nums) {
        TrieNode root = new TrieNode();
        for(int n : nums) {
            TrieNode node = root;
            for(int i=31; i>=0; i--) {
                int bit = (n>>i)&1;
                if(node.next[bit] == null) node.next[bit] = new TrieNode();
                node = node.next[bit];
            }
        }
        int max = 0;
        for(int n : nums) {
            TrieNode node = root;
            int curr = 0;
            for(int i=31; i>=0; i--) {
                int bit = (n>>i)&1;
                if(node.next[1-bit] != null) {
                    curr |= (1<<i);
                    node = node.next[1-bit];
                } else node = node.next[bit];
            }
            max = Math.max(max, curr);
        }
        return max;
    }
}`
                                }
                            ]
                        },
                        {
                            id: 'replace-words',
                            title: 'Replace Words',
                            problemStatement: "Replace words in sentence with shortest root from dictionary.",
                            problemLink: "https://leetcode.com/problems/replace-words/",
                            sampleInput: "dict=['cat','bat','rat'], sentence='the cattle was rattled ...'",
                            sampleOutput: "'the cat was rat ...'",
                            approaches: [
                                {
                                    name: "Trie",
                                    explanation: "Insert roots into Trie with isEnd. For each word in sentence, traverse trie. If isEnd found, replace.",
                                    timeComplexity: "O(N*L + S)",
                                    spaceComplexity: "O(N*L)",
                                    code: `class Solution {
    class TrieNode { TrieNode[] next = new TrieNode[26]; boolean isEnd; }
    public String replaceWords(List<String> dictionary, String sentence) {
        TrieNode root = new TrieNode();
        for(String s : dictionary) {
            TrieNode p = root;
            for(char c : s.toCharArray()) {
                if(p.next[c-'a']==null) p.next[c-'a'] = new TrieNode();
                p = p.next[c-'a'];
            }
            p.isEnd = true;
        }
        StringBuilder res = new StringBuilder();
        for(String w : sentence.split(" ")) {
            if(res.length()>0) res.append(" ");
            TrieNode p = root;
            StringBuilder prefix = new StringBuilder();
            for(char c : w.toCharArray()) {
                if(p.next[c-'a']==null || p.isEnd) break;
                p = p.next[c-'a'];
                prefix.append(c);
            }
            res.append(p.isEnd ? prefix.toString() : w);
        }
        return res.toString();
    }
}`
                                }
                            ]
                        },
                        {
                            id: 'magic-dictionary',
                            title: 'Implement Magic Dictionary',
                            problemStatement: "Design a dictionary requiring exactly 1 character change to match a word.",
                            problemLink: "https://leetcode.com/problems/implement-magic-dictionary/",
                            sampleInput: "build(['hello']), search('hhllo')",
                            sampleOutput: "true",
                            approaches: [
                                {
                                    name: "Trie + DFS (Fuzzy Search)",
                                    explanation: "Traverse Trie. Allows 1 mismatch. Pass `modified` boolean in DFS.",
                                    timeComplexity: "O(L * 26)",
                                    spaceComplexity: "O(Total Chars)",
                                    code: `class MagicDictionary {
    class TrieNode { TrieNode[] next = new TrieNode[26]; boolean isEnd; }
    TrieNode root = new TrieNode();
    public void buildDict(String[] dictionary) {
        for(String s: dictionary) {
            TrieNode p = root;
            for(char c: s.toCharArray()) {
                if(p.next[c-'a']==null) p.next[c-'a'] = new TrieNode();
                p = p.next[c-'a'];
            }
            p.isEnd = true;
        }
    }
    public boolean search(String searchWord) { return dfs(root, searchWord.toCharArray(), 0, false); }
    boolean dfs(TrieNode node, char[] ch, int k, boolean mod) {
        if(k == ch.length) return mod && node.isEnd;
        int idx = ch[k] - 'a';
        if(mod) {
            return node.next[idx] != null && dfs(node.next[idx], ch, k+1, true);
        } else {
            for(int i=0; i<26; i++) {
                if(node.next[i] != null) {
                    if(dfs(node.next[i], ch, k+1, i != idx)) return true;
                }
            }
            return false;
        }
    }
}`
                                }
                            ]
                        },
                        {
                            id: 'top-k-frequent-words',
                            title: 'Top K Frequent Words',
                            problemStatement: "Return the k most frequent strings. Answer should be sorted by frequency from highest to lowest. If freq same, alphabetical.",
                            problemLink: "https://leetcode.com/problems/top-k-frequent-words/",
                            sampleInput: "['i','love','leetcode','i','love'], k=2",
                            sampleOutput: "['i','love']",
                            approaches: [
                                {
                                    name: "HashMap + PriorityQueue",
                                    explanation: "Count freq: O(N). Add to Min-Heap of size K (sort by count asc, word desc). Poll if > K. Result is reverse of heap.",
                                    timeComplexity: "O(N log K)",
                                    spaceComplexity: "O(N)",
                                    code: `class Solution {
    public List<String> topKFrequent(String[] words, int k) {
        Map<String, Integer> count = new HashMap<>();
        for(String w : words) count.put(w, count.getOrDefault(w, 0) + 1);
        PriorityQueue<String> pq = new PriorityQueue<>((a,b) -> 
            count.get(a).equals(count.get(b)) ? b.compareTo(a) : count.get(a) - count.get(b));
        for(String w : count.keySet()) {
            pq.offer(w);
            if(pq.size() > k) pq.poll();
        }
        List<String> res = new ArrayList<>();
        while(!pq.isEmpty()) res.add(pq.poll());
        Collections.reverse(res);
        return res;
    }
}`
                                }
                            ]
                        },
                        {
                            id: 'stream-of-characters',
                            title: 'Stream of Characters',
                            problemStatement: "Query if the last k characters of a stream form any word in the dictionary.",
                            problemLink: "https://leetcode.com/problems/stream-of-characters/",
                            sampleInput: "StreamChecker(['cd','f','kl']), query('a')...query('f')",
                            sampleOutput: "true (for 'f')",
                            approaches: [
                                {
                                    name: "Reverse Trie",
                                    explanation: "Insert words in reverse into Trie. Maintain a stream history (StringBuilder). Query from end of history backwards in Trie.",
                                    timeComplexity: "O(W) per query",
                                    spaceComplexity: "O(Total Chars)",
                                    code: `class StreamChecker {
    class TrieNode { TrieNode[] next = new TrieNode[26]; boolean isEnd; }
    TrieNode root = new TrieNode();
    StringBuilder sb = new StringBuilder();
    public StreamChecker(String[] words) {
        for(String w : words) {
            TrieNode p = root;
            for(int i=w.length()-1; i>=0; i--) {
                char c = w.charAt(i);
                if(p.next[c-'a']==null) p.next[c-'a'] = new TrieNode();
                p = p.next[c-'a'];
            }
            p.isEnd = true;
        }
    }
    public boolean query(char letter) {
        sb.append(letter);
        TrieNode p = root;
        for(int i=sb.length()-1; i>=0; i--) {
            char c = sb.charAt(i);
            if(p.next[c-'a'] == null) return false;
            p = p.next[c-'a'];
            if(p.isEnd) return true;
        }
        return false;
    }
}`
                                }
                            ]
                        },
                        {
                            id: 'search-suggestions',
                            title: 'Search Suggestions System',
                            problemStatement: "Return list of lists of simplified suggestions after each character of searchWord.",
                            problemLink: "https://leetcode.com/problems/search-suggestions-system/",
                            sampleInput: "products=['mobile','mouse','moneypot'], searchWord='mouse'",
                            sampleOutput: "[['mobile','moneypot','mouse'], ...]",
                            approaches: [
                                {
                                    name: "DFS/Prefix Sorting",
                                    explanation: "Sort products. For each prefix, find matching range (binary search) or use Trie storing top 3.",
                                    timeComplexity: "O(N log N + L)",
                                    spaceComplexity: "O(N)",
                                    code: `class Solution {
    public List<List<String>> suggestedProducts(String[] products, String searchWord) {
        Arrays.sort(products);
        List<List<String>> res = new ArrayList<>();
        String prefix = "";
        for (char c : searchWord.toCharArray()) {
            prefix += c;
            List<String> list = new ArrayList<>();
            int idx = lowerBound(products, prefix);
            for (int i = idx; i < Math.min(idx + 3, products.length); i++) {
                if (products[i].startsWith(prefix)) list.add(products[i]);
            }
            res.add(list);
        }
        return res;
    }
    int lowerBound(String[] p, String t) {
        int l = 0, r = p.length;
        while(l < r) {
            int mid = (l + r) / 2;
            if(p[mid].compareTo(t) >= 0) r = mid;
            else l = mid + 1;
        }
        return l;
    }
}`
                                }
                            ]
                        },
                        {
                            id: 'palindrome-pairs',
                            title: 'Palindrome Pairs',
                            problemStatement: "Find all distinct indices (i, j) such that valid concatenation is a palindrome.",
                            problemLink: "https://leetcode.com/problems/palindrome-pairs/",
                            sampleInput: "['abcd','dcba','lls','s','sssll']",
                            sampleOutput: "[[0,1],[1,0],[3,2],[2,4]]",
                            approaches: [
                                {
                                    name: "HashMap / Trie",
                                    explanation: "Reverse all words and map to index. Iterate each word, check splits (prefix + suffix). If prefix palindrome, look for reversed suffix in map. If suffix palindrome, look for reversed prefix.",
                                    timeComplexity: "O(N * L^2)",
                                    spaceComplexity: "O(N)",
                                    code: `// Complex Trie or HashMap approach. HashMap is simpler logic.`
                                }
                            ]
                        }
                    ]
                }
            ]
        },
        {
            id: 'pathfinding-optimization',
            title: 'Pathfinding & Optimization',
            subTopics: [
                {
                    id: 'advanced-graphs',
                    title: 'Graph Algorithms (Advanced)',
                    questions: [
                        {
                            id: 'network-delay-time',
                            title: 'Network Delay Time',
                            problemStatement: "Time for all nodes to receive signal. (Dijkstra)",
                            problemLink: "https://leetcode.com/problems/network-delay-time/",
                            sampleInput: "times = [[2,1,1],[2,3,1],[3,4,1]], n=4, k=2",
                            sampleOutput: "2",
                            approaches: [
                                {
                                    name: "Dijkstra's Algorithm",
                                    explanation: "PriorityQueue storing {dist, node}. Relax edges.",
                                    timeComplexity: "O(E log V)",
                                    spaceComplexity: "O(V + E)",
                                    code: `class Solution {
    public int networkDelayTime(int[][] times, int n, int k) {
        Map<Integer, List<int[]>> adj = new HashMap<>();
        for(int[] t : times) {
            adj.computeIfAbsent(t[0], x->new ArrayList<>()).add(new int[]{t[1], t[2]});
        }
        PriorityQueue<int[]> pq = new PriorityQueue<>((a,b) -> a[1]-b[1]);
        pq.offer(new int[]{k, 0});
        int[] dist = new int[n+1];
        Arrays.fill(dist, Integer.MAX_VALUE);
        dist[k] = 0;
        int max = 0;
        while(!pq.isEmpty()) {
            int[] curr = pq.poll();
            int u = curr[0], d = curr[1];
            if(d > dist[u]) continue;
            max = d;
            n--;
            if(!adj.containsKey(u)) continue;
            for(int[] edge : adj.get(u)) {
                int v = edge[0], w = edge[1];
                if(dist[u] + w < dist[v]) {
                    dist[v] = dist[u] + w;
                    pq.offer(new int[]{v, dist[v]});
                }
            }
        }
        return n == 0 ? max : -1;
    }
}`
                                }
                            ]
                        },
                        {
                            id: 'min-cost-connect-points',
                            title: 'Min Cost to Connect All Points',
                            problemStatement: "Minimum cost to connect all points (Manhattan distance).",
                            problemLink: "https://leetcode.com/problems/min-cost-to-connect-all-points/",
                            sampleInput: "points = [[0,0],[2,2],[3,10],[5,2],[7,0]]",
                            sampleOutput: "20",
                            approaches: [
                                {
                                    name: "Prim's Algorithm",
                                    explanation: "Grow MST from a start node. Always pick smallest edge connecting explored to unexplored.",
                                    timeComplexity: "O(N^2)",
                                    spaceComplexity: "O(N)",
                                    code: `class Solution {
    public int minCostConnectPoints(int[][] points) {
        int n = points.length;
        int[] dist = new int[n];
        Arrays.fill(dist, Integer.MAX_VALUE);
        boolean[] vis = new boolean[n];
        dist[0] = 0;
        int res = 0;
        for(int i=0; i<n; i++) {
            int u = -1;
            for(int j=0; j<n; j++) {
                if(!vis[j] && (u == -1 || dist[j] < dist[u])) u = j;
            }
            vis[u] = true;
            res += dist[u];
            for(int v=0; v<n; v++) {
                if(!vis[v]) {
                    int d = Math.abs(points[u][0]-points[v][0]) + Math.abs(points[u][1]-points[v][1]);
                    dist[v] = Math.min(dist[v], d);
                }
            }
        }
        return res;
    }
}`
                                }
                            ]
                        },
                        {
                            id: 'alien-dictionary',
                            title: 'Alien Dictionary',
                            problemStatement: "Derive the order of letters in an alien language.",
                            problemLink: "https://leetcode.com/problems/alien-dictionary/",
                            sampleInput: "words = ['wrt','wrf','er','ett','rftt']",
                            sampleOutput: "'wertf'",
                            approaches: [
                                {
                                    name: "Topological Sort",
                                    explanation: "Build graph: edge from c1 to c2 if c1 comes before c2 in adjacent words. Topo sort.",
                                    timeComplexity: "O(C)",
                                    spaceComplexity: "O(1)",
                                    code: `// Detailed Topo Sort approach needed.`
                                }
                            ]
                        },
                        {
                            id: 'critical-connections',
                            title: 'Critical Connections in a Network',
                            problemStatement: "Find all bridges (critical connections) in the graph.",
                            problemLink: "https://leetcode.com/problems/critical-connections-in-a-network/",
                            sampleInput: "n = 4, connections = [[0,1],[1,2],[2,0],[1,3]]",
                            sampleOutput: "[[1,3]]",
                            approaches: [
                                {
                                    name: "Tarjan's Algorithm",
                                    explanation: "DFS with discovery time and low-link value. If low[v] > disc[u], edge u-v is a bridge.",
                                    timeComplexity: "O(V+E)",
                                    spaceComplexity: "O(V+E)",
                                    code: `class Solution {
    int time = 0;
    List<List<Integer>> res = new ArrayList<>();
    public List<List<Integer>> criticalConnections(int n, List<List<Integer>> connections) {
        List<Integer>[] graph = new ArrayList[n];
        for(int i=0;i<n;i++) graph[i] = new ArrayList<>();
        for(List<Integer> c : connections) { graph[c.get(0)].add(c.get(1)); graph[c.get(1)].add(c.get(0)); }
        int[] disc = new int[n], low = new int[n];
        Arrays.fill(disc, -1);
        dfs(0, -1, graph, disc, low);
        return res;
    }
    void dfs(int u, int p, List<Integer>[] graph, int[] disc, int[] low) {
        disc[u] = low[u] = ++time;
        for(int v : graph[u]) {
            if(v == p) continue;
            if(disc[v] != -1) low[u] = Math.min(low[u], disc[v]);
            else {
                dfs(v, u, graph, disc, low);
                low[u] = Math.min(low[u], low[v]);
                if(low[v] > disc[u]) res.add(Arrays.asList(u, v));
            }
        }
    }
}`
                                }
                            ]
                        }
                    ]
                }
            ]
        }, {
            id: 'core-logic-building',
            title: 'Core Logic Building',
            subTopics: [
                {
                    id: 'recursion',
                    title: 'Recursion',
                    questions: [
                        {
                            id: 'subsets',
                            title: 'Subsets',
                            problemStatement: "Return all possible subsets (the power set).",
                            problemLink: "https://leetcode.com/problems/subsets/",
                            sampleInput: "[1,2,3]",
                            sampleOutput: "[[],[1],[2],[1,2],[3],[1,3],[2,3],[1,2,3]]",
                            approaches: [
                                {
                                    name: "Backtracking",
                                    explanation: "Include current element, recurse. Exclude current element, recurse (essentially backtracking).",
                                    timeComplexity: "O(N * 2^N)",
                                    spaceComplexity: "O(N)",
                                    code: `class Solution {
    List<List<Integer>> res = new ArrayList<>();
    public List<List<Integer>> subsets(int[] nums) {
        backtrack(0, nums, new ArrayList<>());
        return res;
    }
    void backtrack(int start, int[] nums, List<Integer> list) {
        res.add(new ArrayList<>(list));
        for(int i=start; i<nums.length; i++) {
            list.add(nums[i]);
            backtrack(i+1, nums, list);
            list.remove(list.size()-1);
        }
    }
}`
                                }
                            ]
                        },
                        {
                            id: 'permutations',
                            title: 'Permutations',
                            problemStatement: "Return all possible permutations.",
                            problemLink: "https://leetcode.com/problems/permutations/",
                            sampleInput: "[1,2,3]",
                            sampleOutput: "[[1,2,3],[1,3,2],...]",
                            approaches: [
                                {
                                    name: "Backtracking",
                                    explanation: "For each position, try all available numbers.",
                                    timeComplexity: "O(N!)",
                                    spaceComplexity: "O(N)",
                                    code: `class Solution {
    List<List<Integer>> res = new ArrayList<>();
    public List<List<Integer>> permute(int[] nums) {
        backtrack(new ArrayList<>(), nums);
        return res;
    }
    void backtrack(List<Integer> list, int[] nums) {
        if(list.size() == nums.length) {
            res.add(new ArrayList<>(list));
            return;
        }
        for(int n : nums) {
            if(list.contains(n)) continue;
            list.add(n);
            backtrack(list, nums);
            list.remove(list.size()-1);
        }
    }
}`
                                }
                            ]
                        },
                        {
                            id: 'word-search',
                            title: 'Word Search',
                            problemStatement: "Check if word exists in grid.",
                            problemLink: "https://leetcode.com/problems/word-search/",
                            sampleInput: "board = [...], word = 'ABCCED'",
                            sampleOutput: "true",
                            approaches: [
                                {
                                    name: "DFS/Backtracking",
                                    explanation: "Traverse grid. Match char. Mark visited temporarily. Recurse neighbors. Unmark.",
                                    timeComplexity: "O(N*M*3^L)",
                                    spaceComplexity: "O(L)",
                                    code: `class Solution {
    public boolean exist(char[][] board, String word) {
        for(int i=0;i<board.length;i++)
            for(int j=0;j<board[0].length;j++)
                if(dfs(board,i,j,word,0)) return true;
        return false;
    }
    boolean dfs(char[][] b, int r, int c, String w, int idx) {
        if(idx == w.length()) return true;
        if(r<0||c<0||r>=b.length||c>=b[0].length||b[r][c]!=w.charAt(idx)) return false;
        char tmp = b[r][c];
        b[r][c] = '#';
        boolean found = dfs(b,r+1,c,w,idx+1) || dfs(b,r-1,c,w,idx+1) || 
                        dfs(b,r,c+1,w,idx+1) || dfs(b,r,c-1,w,idx+1);
        b[r][c] = tmp;
        return found;
    }
}`
                                }
                            ]
                        },
                        {
                            id: 'generate-parentheses',
                            title: 'Generate Parentheses',
                            problemStatement: "Generate all combinations of well-formed parentheses.",
                            problemLink: "https://leetcode.com/problems/generate-parentheses/",
                            sampleInput: "n=3",
                            sampleOutput: "['((()))','(()())',...]",
                            approaches: [
                                {
                                    name: "Backtracking",
                                    explanation: "Keep track of open and close counts. Add '(' if open < n. Add ')' if close < open.",
                                    timeComplexity: "O(4^n / sqrt(n))",
                                    spaceComplexity: "O(n)",
                                    code: `class Solution {
    List<String> res = new ArrayList<>();
    public List<String> generateParenthesis(int n) {
        backtrack("", 0, 0, n);
        return res;
    }
    void backtrack(String s, int open, int close, int n) {
        if(s.length() == n*2) { res.add(s); return; }
        if(open < n) backtrack(s+"(", open+1, close, n);
        if(close < open) backtrack(s+")", open, close+1, n);
    }
}`
                                }
                            ]
                        },
                        {
                            id: 'letter-combinations',
                            title: 'Letter Combinations of a Phone Number',
                            problemStatement: "Return all possible letter combinations for a number string.",
                            problemLink: "https://leetcode.com/problems/letter-combinations-of-a-phone-number/",
                            sampleInput: "'23'",
                            sampleOutput: "['ad','ae','af','bd',...]",
                            approaches: [
                                {
                                    name: "Backtracking",
                                    explanation: "Map digits to letters. Iterate through letters of current digit and recurse.",
                                    timeComplexity: "O(4^N)",
                                    spaceComplexity: "O(N)",
                                    code: `class Solution {
    String[] map = {"","","abc","def","ghi","jkl","mno","pqrs","tuv","wxyz"};
    List<String> res = new ArrayList<>();
    public List<String> letterCombinations(String digits) {
        if(digits.isEmpty()) return res;
        backtrack("", digits, 0);
        return res;
    }
    void backtrack(String s, String digits, int idx) {
        if(idx == digits.length()) { res.add(s); return; }
        String chars = map[digits.charAt(idx) - '0'];
        for(char c : chars.toCharArray()) backtrack(s+c, digits, idx+1);
    }
}`
                                }
                            ]
                        }
                    ]
                }
            ]
        }, {
            id: 'optimization-caching',
            title: 'Optimization & Caching',
            subTopics: [
                {
                    id: 'dynamic-programming',
                    title: 'Dynamic Programming',
                    questions: [
                        {
                            id: 'coin-change',
                            title: 'Coin Change',
                            problemStatement: "Fewest coins to make up amount.",
                            problemLink: "https://leetcode.com/problems/coin-change/",
                            sampleInput: "coins = [1,2,5], amount = 11",
                            sampleOutput: "3",
                            approaches: [
                                {
                                    name: "DP (Bottom-Up)",
                                    explanation: "dp[i] = min(dp[i], dp[i-coin] + 1).",
                                    timeComplexity: "O(A*N)",
                                    spaceComplexity: "O(A)",
                                    code: `class Solution {
    public int coinChange(int[] coins, int amount) {
        int[] dp = new int[amount+1];
        Arrays.fill(dp, amount+1);
        dp[0] = 0;
        for(int i=1; i<=amount; i++) {
            for(int c : coins) {
                if(c <= i) dp[i] = Math.min(dp[i], dp[i-c] + 1);
            }
        }
        return dp[amount] > amount ? -1 : dp[amount];
    }
}`
                                }
                            ]
                        },
                        {
                            id: 'longest-increasing-subsequence',
                            title: 'Longest Increasing Subsequence',
                            problemStatement: "Length of LIS.",
                            problemLink: "https://leetcode.com/problems/longest-increasing-subsequence/",
                            sampleInput: "[10,9,2,5,3,7,101,18]",
                            sampleOutput: "4",
                            approaches: [
                                {
                                    name: "DP",
                                    explanation: "dp[i] = max(dp[j]) + 1 for all j < i where nums[j] < nums[i].",
                                    timeComplexity: "O(N^2)",
                                    spaceComplexity: "O(N)",
                                    code: `class Solution {
    public int lengthOfLIS(int[] nums) {
        int[] dp = new int[nums.length];
        Arrays.fill(dp, 1);
        int max = 1;
        for(int i=1; i<nums.length; i++) {
            for(int j=0; j<i; j++) {
                if(nums[i] > nums[j]) dp[i] = Math.max(dp[i], dp[j] + 1);
            }
            max = Math.max(max, dp[i]);
        }
        return max;
    }
}`
                                }
                            ]
                        },
                        {
                            id: 'longest-common-subsequence',
                            title: 'Longest Common Subsequence',
                            problemStatement: "Length of LCS.",
                            problemLink: "https://leetcode.com/problems/longest-common-subsequence/",
                            sampleInput: "text1 = 'abcde', text2 = 'ace'",
                            sampleOutput: "3",
                            approaches: [
                                {
                                    name: "DP 2D Grid",
                                    explanation: "If chars match, dp[i][j] = 1 + dp[i-1][j-1]. Else max(dp[i-1][j], dp[i][j-1]).",
                                    timeComplexity: "O(N*M)",
                                    spaceComplexity: "O(N*M)",
                                    code: `class Solution {
    public int longestCommonSubsequence(String text1, String text2) {
        int m = text1.length(), n = text2.length();
        int[][] dp = new int[m+1][n+1];
        for(int i=1; i<=m; i++) {
            for(int j=1; j<=n; j++) {
                if(text1.charAt(i-1) == text2.charAt(j-1)) dp[i][j] = 1 + dp[i-1][j-1];
                else dp[i][j] = Math.max(dp[i-1][j], dp[i][j-1]);
            }
        }
        return dp[m][n];
    }
}`
                                }
                            ]
                        },
                        {
                            id: 'word-break',
                            title: 'Word Break',
                            problemStatement: "Can s be segmented into dictionary words?",
                            problemLink: "https://leetcode.com/problems/word-break/",
                            sampleInput: "s = 'leetcode', wordDict = ['leet','code']",
                            sampleOutput: "true",
                            approaches: [
                                {
                                    name: "DP",
                                    explanation: "dp[i] is true if s[0...i] can be segmented. Check all j < i. If dp[j] and s[j...i] in dict, then dp[i] = true.",
                                    timeComplexity: "O(N^2)",
                                    spaceComplexity: "O(N)",
                                    code: `class Solution {
    public boolean wordBreak(String s, List<String> wordDict) {
        Set<String> set = new HashSet<>(wordDict);
        boolean[] dp = new boolean[s.length()+1];
        dp[0] = true;
        for(int i=1; i<=s.length(); i++) {
            for(int j=0; j<i; j++) {
                if(dp[j] && set.contains(s.substring(j, i))) {
                    dp[i] = true;
                    break;
                }
            }
        }
        return dp[s.length()];
    }
}`
                                }
                            ]
                        },
                        {
                            id: 'house-robber',
                            title: 'House Robber',
                            problemStatement: "Maximize money without robbing adjacent houses.",
                            problemLink: "https://leetcode.com/problems/house-robber/",
                            sampleInput: "[1,2,3,1]",
                            sampleOutput: "4",
                            approaches: [
                                {
                                    name: "DP",
                                    explanation: "dp[i] = max(dp[i-1], dp[i-2] + nums[i]).",
                                    timeComplexity: "O(N)",
                                    spaceComplexity: "O(1)",
                                    code: `class Solution {
    public int rob(int[] nums) {
        int prev1 = 0, prev2 = 0;
        for(int n : nums) {
            int temp = Math.max(prev1, prev2 + n);
            prev2 = prev1;
            prev1 = temp;
        }
        return prev1;
    }
}`
                                }
                            ]
                        },
                        {
                            id: 'unique-paths',
                            title: 'Unique Paths',
                            problemStatement: "Number of paths from top-left to bottom-right.",
                            problemLink: "https://leetcode.com/problems/unique-paths/",
                            sampleInput: "m=3, n=7",
                            sampleOutput: "28",
                            approaches: [
                                {
                                    name: "DP",
                                    explanation: "dp[i][j] = dp[i-1][j] + dp[i][j-1].",
                                    timeComplexity: "O(M*N)",
                                    spaceComplexity: "O(N)",
                                    code: `class Solution {
    public int uniquePaths(int m, int n) {
        int[] dp = new int[n];
        Arrays.fill(dp, 1);
        for(int i=1; i<m; i++) {
            for(int j=1; j<n; j++) {
                dp[j] += dp[j-1];
            }
        }
        return dp[n-1];
    }
}`
                                }
                            ]
                        }
                    ]
                }
            ]
        }, {
            id: 'low-level-optimization',
            title: 'Low-Level Optimization',
            subTopics: [
                {
                    id: 'bit-manipulation',
                    title: 'Bit Manipulation',
                    questions: [
                        {
                            id: 'single-number',
                            title: 'Single Number',
                            problemStatement: "Find the single number that doesn't appear twice.",
                            problemLink: "https://leetcode.com/problems/single-number/",
                            sampleInput: "[2,2,1]",
                            sampleOutput: "1",
                            approaches: [
                                {
                                    name: "XOR",
                                    explanation: "A XOR A = 0. A XOR 0 = A. XOR all numbers.",
                                    timeComplexity: "O(N)",
                                    spaceComplexity: "O(1)",
                                    code: `class Solution {
    public int singleNumber(int[] nums) {
        int res = 0;
        for(int n : nums) res ^= n;
        return res;
    }
}`
                                }
                            ]
                        },
                        {
                            id: 'number-of-1-bits',
                            title: 'Number of 1 Bits',
                            problemStatement: "Count set bits.",
                            problemLink: "https://leetcode.com/problems/number-of-1-bits/",
                            sampleInput: "00000000000000000000000000001011",
                            sampleOutput: "3",
                            approaches: [
                                {
                                    name: "n & (n-1)",
                                    explanation: "n & (n-1) drops the lowest set bit. Count operations.",
                                    timeComplexity: "O(k) set bits",
                                    spaceComplexity: "O(1)",
                                    code: `class Solution {
    public int hammingWeight(int n) {
        int count = 0;
        while(n != 0) {
            n &= (n-1);
            count++;
        }
        return count;
    }
}`
                                }
                            ]
                        },
                        {
                            id: 'counting-bits',
                            title: 'Counting Bits',
                            problemStatement: "Return array of number of 1 bits for 0 to n.",
                            problemLink: "https://leetcode.com/problems/counting-bits/",
                            sampleInput: "n=2",
                            sampleOutput: "[0,1,1]",
                            approaches: [
                                {
                                    name: "DP",
                                    explanation: "dp[i] = dp[i >> 1] + (i & 1).",
                                    timeComplexity: "O(N)",
                                    spaceComplexity: "O(N)",
                                    code: `class Solution {
    public int[] countBits(int n) {
        int[] res = new int[n+1];
        for(int i=1; i<=n; i++) res[i] = res[i>>1] + (i&1);
        return res;
    }
}`
                                }
                            ]
                        },
                        {
                            id: 'sum-of-two-integers',
                            title: 'Sum of Two Integers',
                            problemStatement: "Sum without + or -.",
                            problemLink: "https://leetcode.com/problems/sum-of-two-integers/",
                            sampleInput: "a=1, b=2",
                            sampleOutput: "3",
                            approaches: [
                                {
                                    name: "Bitwise Logic",
                                    explanation: "Sum = a^b. Carry = (a&b) << 1. Iterate until carry is 0.",
                                    timeComplexity: "O(1)",
                                    spaceComplexity: "O(1)",
                                    code: `class Solution {
    public int getSum(int a, int b) {
        while(b != 0) {
            int carry = (a & b) << 1;
            a = a ^ b;
            b = carry;
        }
        return a;
    }
}`
                                }
                            ]
                        }
                    ]
                }
            ]
        }
        ,
        {
            id: 'last-minute-rev',
            title: 'Last Minute Rev',
            subTopics: [
                {
                    id: 'arrays-strings-rev',
                    title: 'Arrays & Strings (Must Do)',
                    questions: [
                        {
                            id: 'rev-missing-number',
                            title: 'Find Missing Number',
                            problemStatement: "Given an array containing n distinct numbers taken from 0, 1, 2, ..., n, find the one that is missing.",
                            problemLink: "https://leetcode.com/problems/missing-number/",
                            sampleInput: "[3,0,1]",
                            sampleOutput: "2",
                            approaches: [
                                {
                                    name: "Sum Formula",
                                    explanation: "Sum of 0..n is n*(n+1)/2. Subtract sum of array elements.",
                                    timeComplexity: "O(N)",
                                    spaceComplexity: "O(1)",
                                    code: `class Solution {
    public int missingNumber(int[] nums) {
        int n = nums.length;
        int expectedSum = n * (n + 1) / 2;
        int actualSum = 0;
        for (int num : nums) actualSum += num;
        return expectedSum - actualSum;
    }
}`
                                },
                                {
                                    name: "XOR",
                                    explanation: "XOR all indices and all numbers. The result is the missing number.",
                                    timeComplexity: "O(N)",
                                    spaceComplexity: "O(1)",
                                    code: `class Solution {
    public int missingNumber(int[] nums) {
        int res = nums.length;
        for(int i=0; i<nums.length; i++){
            res ^= i ^ nums[i];
        }
        return res;
    }
}`
                                }
                            ]
                        },
                        {
                            id: 'rev-find-duplicate',
                            title: 'Find the Duplicate Number',
                            problemStatement: "Find the duplicate number in an array of n+1 integers where each integer is between 1 and n.",
                            problemLink: "https://leetcode.com/problems/find-the-duplicate-number/",
                            sampleInput: "[1,3,4,2,2]",
                            sampleOutput: "2",
                            approaches: [
                                {
                                    name: "Floyd's Cycle Detection",
                                    explanation: "Treat values as pointers. Use slow/fast pointers. Entrance to the cycle is the duplicate.",
                                    timeComplexity: "O(N)",
                                    spaceComplexity: "O(1)",
                                    code: `class Solution {
    public int findDuplicate(int[] nums) {
        int slow = nums[0], fast = nums[0];
        do {
            slow = nums[slow];
            fast = nums[fast]; // fast moves 2 steps conceptually: nums[nums[fast]] ? No, indices are values.
            fast = nums[fast];
        } while(slow != fast);
        slow = nums[0];
        while(slow != fast) {
            slow = nums[slow];
            fast = nums[fast];
        }
        return slow;
    }
}`
                                }
                            ]
                        },
                        {
                            id: 'rev-min-max-array',
                            title: 'Largest and Smallest Element',
                            problemStatement: "Find the maximum and minimum element in an array.",
                            problemLink: "https://www.geeksforgeeks.org/maximum-and-minimum-in-an-array/",
                            sampleInput: "[3, 5, 4, 1, 9]",
                            sampleOutput: "Min: 1, Max: 9",
                            approaches: [
                                {
                                    name: "Linear Scan",
                                    explanation: "Initialize min and max. Iterate once updating them.",
                                    timeComplexity: "O(N)",
                                    spaceComplexity: "O(1)",
                                    code: `class Solution {
    public void findMinMax(int[] arr) {
        if(arr == null || arr.length == 0) return;
        int min = arr[0], max = arr[0];
        for(int n : arr) {
            if(n < min) min = n;
            if(n > max) max = n;
        }
        System.out.println("Min: " + min + ", Max: " + max);
    }
}`
                                }
                            ]
                        },
                        {
                            id: 'rev-two-sum',
                            title: 'Two Sum',
                            problemStatement: "Find indices of the two numbers that add up to target.",
                            problemLink: "https://leetcode.com/problems/two-sum/",
                            sampleInput: "[2,7,11,15], target=9",
                            sampleOutput: "[0,1]",
                            approaches: [
                                {
                                    name: "HashMap",
                                    explanation: "Store val->index. Check if target-val exists.",
                                    timeComplexity: "O(N)",
                                    spaceComplexity: "O(N)",
                                    code: `class Solution {
    public int[] twoSum(int[] nums, int target) {
        Map<Integer, Integer> map = new HashMap<>();
        for(int i=0; i<nums.length; i++) {
            int complement = target - nums[i];
            if(map.containsKey(complement)) return new int[]{map.get(complement), i};
            map.put(nums[i], i);
        }
        return new int[]{};
    }
}`
                                }
                            ]
                        },
                        {
                            id: 'rev-kth-largest',
                            title: 'Kth Largest Element',
                            problemStatement: "Find the kth largest element in an array.",
                            problemLink: "https://leetcode.com/problems/kth-largest-element-in-an-array/",
                            sampleInput: "[3,2,1,5,6,4], k=2",
                            sampleOutput: "5",
                            approaches: [
                                {
                                    name: "Min-Heap",
                                    explanation: "Keep a min-heap of size K. The root will be the Kth largest.",
                                    timeComplexity: "O(N log K)",
                                    spaceComplexity: "O(K)",
                                    code: `class Solution {
    public int findKthLargest(int[] nums, int k) {
        PriorityQueue<Integer> pq = new PriorityQueue<>();
        for(int n : nums) {
            pq.offer(n);
            if(pq.size() > k) pq.poll();
        }
        return pq.peek();
    }
}`
                                },
                                {
                                    name: "QuickSelect",
                                    explanation: "Partition logic from QuickSort. Average O(N).",
                                    timeComplexity: "Avg O(N), Worst O(N^2)",
                                    spaceComplexity: "O(1)",
                                    code: `// Ideally QuickSelect implementation here.`
                                }
                            ]
                        },
                        {
                            id: 'rev-reverse-array',
                            title: 'Reverse Array In-Place',
                            problemStatement: "Reverse the given array in-place.",
                            problemLink: "https://leetcode.com/problems/reverse-string/",
                            sampleInput: "['h','e','l','l','o']",
                            sampleOutput: "['o','l','l','e','h']",
                            approaches: [
                                {
                                    name: "Two Pointers",
                                    explanation: "Swap elements at start and end pointers. Move inwards.",
                                    timeComplexity: "O(N)",
                                    spaceComplexity: "O(1)",
                                    code: `class Solution {
    public void reverseString(char[] s) {
        int l = 0, r = s.length - 1;
        while(l < r) {
            char temp = s[l];
            s[l++] = s[r];
            s[r--] = temp;
        }
    }
}`
                                }
                            ]
                        },
                        {
                            id: 'rev-rotate-array',
                            title: 'Rotate Array',
                            problemStatement: "Rotate array to the right by k steps.",
                            problemLink: "https://leetcode.com/problems/rotate-array/",
                            sampleInput: "[1,2,3,4,5,6,7], k=3",
                            sampleOutput: "[5,6,7,1,2,3,4]",
                            approaches: [
                                {
                                    name: "Reverse Method",
                                    explanation: "Reverse entire array. Reverse first k. Reverse rest.",
                                    timeComplexity: "O(N)",
                                    spaceComplexity: "O(1)",
                                    code: `class Solution {
    public void rotate(int[] nums, int k) {
        k %= nums.length;
        reverse(nums, 0, nums.length-1);
        reverse(nums, 0, k-1);
        reverse(nums, k, nums.length-1);
    }
    void reverse(int[] nums, int l, int r) {
        while(l < r) {
            int tmp = nums[l]; nums[l++] = nums[r]; nums[r--] = tmp;
        }
    }
}`
                                }
                            ]
                        },
                        {
                            id: 'rev-merge-sorted-arrays',
                            title: 'Merge Sorted Arrays',
                            problemStatement: "Merge two sorted arrays into one sorted array in-place (assuming first has space).",
                            problemLink: "https://leetcode.com/problems/merge-sorted-array/",
                            sampleInput: "nums1=[1,2,3,0,0,0], nums2=[2,5,6]",
                            sampleOutput: "[1,2,2,3,5,6]",
                            approaches: [
                                {
                                    name: "Two Pointers from End",
                                    explanation: "Fill from the back (largest elements first) to avoid overwriting.",
                                    timeComplexity: "O(M+N)",
                                    spaceComplexity: "O(1)",
                                    code: `class Solution {
    public void merge(int[] nums1, int m, int[] nums2, int n) {
        int i = m-1, j = n-1, k = m+n-1;
        while(j >= 0) {
            if(i >= 0 && nums1[i] > nums2[j]) nums1[k--] = nums1[i--];
            else nums1[k--] = nums2[j--];
        }
    }
}`
                                }
                            ]
                        },
                        {
                            id: 'rev-move-zeroes',
                            title: 'Move Zeroes',
                            problemStatement: "Move all 0s to the end while maintaining order.",
                            problemLink: "https://leetcode.com/problems/move-zeroes/",
                            sampleInput: "[0,1,0,3,12]",
                            sampleOutput: "[1,3,12,0,0]",
                            approaches: [
                                {
                                    name: "Two Pointers",
                                    explanation: "Keep a pointer 'lastNonZero'. If curr != 0, swap with lastNonZero and increment.",
                                    timeComplexity: "O(N)",
                                    spaceComplexity: "O(1)",
                                    code: `class Solution {
    public void moveZeroes(int[] nums) {
        int lastNonZero = 0;
        for(int i=0; i<nums.length; i++) {
            if(nums[i] != 0) {
                int temp = nums[lastNonZero];
                nums[lastNonZero++] = nums[i];
                nums[i] = temp;
            }
        }
    }
}`
                                }
                            ]
                        },
                        {
                            id: 'rev-remove-duplicates',
                            title: 'Remove Duplicates from Sorted Array',
                            problemStatement: "Remove duplicates in-place so each element appears once. Return new length.",
                            problemLink: "https://leetcode.com/problems/remove-duplicates-from-sorted-array/",
                            sampleInput: "[1,1,2]",
                            sampleOutput: "2, nums=[1,2,_]",
                            approaches: [
                                {
                                    name: "Two Pointers",
                                    explanation: "Maintain 'insertPos'. If curr != prev, place at insertPos.",
                                    timeComplexity: "O(N)",
                                    spaceComplexity: "O(1)",
                                    code: `class Solution {
    public int removeDuplicates(int[] nums) {
        if(nums.length==0) return 0;
        int i = 0;
        for(int j=1; j<nums.length; j++) {
            if(nums[j] != nums[i]) {
                i++;
                nums[i] = nums[j];
            }
        }
        return i+1;
    }
}`
                                }
                            ]
                        },
                        {
                            id: 'rev-reverse-string',
                            title: 'Reverse String',
                            problemStatement: "Reverse input string.",
                            problemLink: "https://leetcode.com/problems/reverse-string/",
                            sampleInput: "['h','e','l','l','o']",
                            sampleOutput: "['o','l','l','e','h']",
                            approaches: [{ name: "Two Pointers", explanation: "Same as reverse array.", timeComplexity: "O(N)", spaceComplexity: "O(1)", code: "// See Reverse Array In-Place" }]
                        },
                        {
                            id: 'rev-valid-anagram',
                            title: 'Valid Anagram',
                            problemStatement: "Check if t is an anagram of s.",
                            problemLink: "https://leetcode.com/problems/valid-anagram/",
                            sampleInput: "s='anagram', t='nagaram'",
                            sampleOutput: "true",
                            approaches: [
                                {
                                    name: "Frequency Array",
                                    explanation: "Count chars in s (increment) and t (decrement). Check all 0.",
                                    timeComplexity: "O(N)",
                                    spaceComplexity: "O(1) (26 chars)",
                                    code: `class Solution {
    public boolean isAnagram(String s, String t) {
        if(s.length() != t.length()) return false;
        int[] count = new int[26];
        for(char c : s.toCharArray()) count[c-'a']++;
        for(char c : t.toCharArray()) count[c-'a']--;
        for(int i : count) if(i!=0) return false;
        return true;
    }
}`
                                }
                            ]
                        },
                        {
                            id: 'rev-first-unique-char',
                            title: 'First Unique Character',
                            problemStatement: "Find the first non-repeating character.",
                            problemLink: "https://leetcode.com/problems/first-unique-character-in-a-string/",
                            sampleInput: "'leetcode'",
                            sampleOutput: "0",
                            approaches: [
                                {
                                    name: "HashMap / Frequency Array",
                                    explanation: "Count frequencies. Iterate string again to find first with count 1.",
                                    timeComplexity: "O(N)",
                                    spaceComplexity: "O(1)",
                                    code: `class Solution {
    public int firstUniqChar(String s) {
        int[] freq = new int[26];
        for(char c : s.toCharArray()) freq[c-'a']++;
        for(int i=0; i<s.length(); i++) {
            if(freq[s.charAt(i)-'a'] == 1) return i;
        }
        return -1;
    }
}`
                                }
                            ]
                        },
                        {
                            id: 'rev-valid-palindrome',
                            title: 'Valid Palindrome',
                            problemStatement: "Check if string is palindrome, ignoring non-alphanumeric and case.",
                            problemLink: "https://leetcode.com/problems/valid-palindrome/",
                            sampleInput: "'A man, a plan, a canal: Panama'",
                            sampleOutput: "true",
                            approaches: [
                                {
                                    name: "Two Pointers",
                                    explanation: "Pointers start/end. Skip non-alphanumeric. Compare chars.",
                                    timeComplexity: "O(N)",
                                    spaceComplexity: "O(1)",
                                    code: `class Solution {
    public boolean isPalindrome(String s) {
        int i=0, j=s.length()-1;
        while(i<j) {
            while(i<j && !Character.isLetterOrDigit(s.charAt(i))) i++;
            while(i<j && !Character.isLetterOrDigit(s.charAt(j))) j--;
            if(Character.toLowerCase(s.charAt(i)) != Character.toLowerCase(s.charAt(j))) return false;
            i++; j--;
        }
        return true;
    }
}`
                                }
                            ]
                        },
                        {
                            id: 'rev-longest-substring',
                            title: 'Longest Substring Without Repeating Characters',
                            problemStatement: "Find length of longest substring w/o repeats.",
                            problemLink: "https://leetcode.com/problems/longest-substring-without-repeating-characters/",
                            sampleInput: "'abcabcbb'",
                            sampleOutput: "3",
                            approaches: [
                                {
                                    name: "Sliding Window + Map",
                                    explanation: "Map stores last index of char. Move start pointer to max(start, map.get(char)+1).",
                                    timeComplexity: "O(N)",
                                    spaceComplexity: "O(1)",
                                    code: `class Solution {
    public int lengthOfLongestSubstring(String s) {
        Map<Character, Integer> map = new HashMap<>();
        int max = 0, start = 0;
        for(int i=0; i<s.length(); i++) {
            if(map.containsKey(s.charAt(i))) {
                start = Math.max(start, map.get(s.charAt(i)) + 1);
            }
            map.put(s.charAt(i), i);
            max = Math.max(max, i - start + 1);
        }
        return max;
    }
}`
                                }
                            ]
                        },
                        {
                            id: 'rev-atoi',
                            title: 'String to Integer (atoi)',
                            problemStatement: "Implement atoi which converts a string to an integer.",
                            problemLink: "https://leetcode.com/problems/string-to-integer-atoi/",
                            sampleInput: "'   -42'",
                            sampleOutput: "-42",
                            approaches: [
                                {
                                    name: "Deterministic Scan",
                                    explanation: "Skip whitespace. Check sign. Read digits and build number. Handle overflow.",
                                    timeComplexity: "O(N)",
                                    spaceComplexity: "O(1)",
                                    code: `class Solution {
    public int myAtoi(String s) {
        int i=0, sign=1, res=0, n=s.length();
        while(i<n && s.charAt(i)==' ') i++;
        if(i<n && (s.charAt(i)=='+' || s.charAt(i)=='-')) {
            sign = (s.charAt(i++) == '-') ? -1 : 1;
        }
        while(i<n && Character.isDigit(s.charAt(i))) {
            int d = s.charAt(i++) - '0';
            if(res > Integer.MAX_VALUE/10 || (res==Integer.MAX_VALUE/10 && d>7))
                return sign==1 ? Integer.MAX_VALUE : Integer.MIN_VALUE;
            res = res*10 + d;
        }
        return res*sign;
    }
}`
                                }
                            ]
                        }
,
                        {
                            id: 'rev-contains-duplicate',
                            title: 'Contains Duplicate',
                            problemStatement: "Check if any value appears at least twice.",
                            problemLink: "https://leetcode.com/problems/contains-duplicate/",
                            sampleInput: "[1,2,3,1]",
                            sampleOutput: "true",
                            approaches: [{name: "HashSet", explanation: "Add to set. If already exists, return true.", timeComplexity: "O(N)", spaceComplexity: "O(N)", code: `class Solution {
    public boolean containsDuplicate(int[] nums) {
        Set<Integer> set = new HashSet<>();
        for(int n : nums) if(!set.add(n)) return true;
        return false;
    }
}`}]
                        },
                        {
                            id: 'rev-product-array',
                            title: 'Product of Array Except Self',
                            problemStatement: "Return an array where output[i] is product of all elements except nums[i]. No division.",
                            problemLink: "https://leetcode.com/problems/product-of-array-except-self/",
                            sampleInput: "[1,2,3,4]",
                            sampleOutput: "[24,12,8,6]",
                            approaches: [{name: "Prefix Suffix Product", explanation: "Two passes. First pass calculate prefix product. Second pass multiply by suffix product.", timeComplexity: "O(N)", spaceComplexity: "O(1)", code: `class Solution {
    public int[] productExceptSelf(int[] nums) {
        int n = nums.length;
        int[] res = new int[n];
        res[0] = 1;
        for(int i=1; i<n; i++) res[i] = res[i-1] * nums[i-1];
        int right = 1;
        for(int i=n-1; i>=0; i--) {
            res[i] *= right;
            right *= nums[i];
        }
        return res;
    }
}`}]
                        },
                        {
                            id: 'rev-max-subarray',
                            title: 'Maximum Subarray (Kadane Algorithm)',
                            problemStatement: "Find the subarray which has the largest sum.",
                            problemLink: "https://leetcode.com/problems/maximum-subarray/",
                            sampleInput: "[-2,1,-3,4,-1,2,1,-5,4]",
                            sampleOutput: "6",
                            approaches: [{name: "Kadane's Algorithm", explanation: "Keep maxSoFar and currentMax. If currentMax < 0, reset to 0.", timeComplexity: "O(N)", spaceComplexity: "O(1)", code: `class Solution {
    public int maxSubArray(int[] nums) {
        int max = nums[0], curr = nums[0];
        for(int i=1; i<nums.length; i++) {
            curr = Math.max(nums[i], curr + nums[i]);
            max = Math.max(max, curr);
        }
        return max;
    }
}`}]
                        },
                        {
                            id: 'rev-max-product',
                            title: 'Maximum Product Subarray',
                            problemStatement: "Find subarray with largest product.",
                            problemLink: "https://leetcode.com/problems/maximum-product-subarray/",
                            sampleInput: "[2,3,-2,4]",
                            sampleOutput: "6",
                            approaches: [{name: "Track Min/Max", explanation: "Keep track of min and max because negative * negative = positive.", timeComplexity: "O(N)", spaceComplexity: "O(1)", code: `class Solution {
    public int maxProduct(int[] nums) {
        int max = nums[0], min = nums[0], res = nums[0];
        for(int i=1; i<nums.length; i++) {
            if(nums[i] < 0) { int t=max; max=min; min=t; }
            max = Math.max(nums[i], max * nums[i]);
            min = Math.min(nums[i], min * nums[i]);
            res = Math.max(res, max);
        }
        return res;
    }
}`}]
                        },
                        {
                            id: 'rev-subarray-sum-k',
                            title: 'Subarray Sum Equals K',
                            problemStatement: "Total number of continuous subarrays whose sum equals k.",
                            problemLink: "https://leetcode.com/problems/subarray-sum-equals-k/",
                            sampleInput: "[1,1,1], k=2",
                            sampleOutput: "2",
                            approaches: [{name: "HashMap (Prefix Sum)", explanation: "Map stores freq of prefix sums. Check if (currentSum - k) exists in map.", timeComplexity: "O(N)", spaceComplexity: "O(N)", code: `class Solution {
    public int subarraySum(int[] nums, int k) {
        Map<Integer, Integer> map = new HashMap<>();
        map.put(0, 1);
        int sum=0, res=0;
        for(int n : nums) {
            sum += n;
            if(map.containsKey(sum-k)) res += map.get(sum-k);
            map.put(sum, map.getOrDefault(sum, 0)+1);
        }
        return res;
    }
}`}]
                        },
                        {
                            id: 'rev-find-all-duplicates',
                            title: 'Find All Duplicates in an Array',
                            problemStatement: "Find all elements that appear twice. 1 <= a[i] <= n.",
                            problemLink: "https://leetcode.com/problems/find-all-duplicates-in-an-array/",
                            sampleInput: "[4,3,2,7,8,2,3,1]",
                            sampleOutput: "[2,3]",
                            approaches: [{name: "Negation Marking", explanation: "Use index abs(nums[i])-1. Negate value at index. If already negative, it's duplicate.", timeComplexity: "O(N)", spaceComplexity: "O(1)", code: `class Solution {
    public List<Integer> findDuplicates(int[] nums) {
        List<Integer> res = new ArrayList<>();
        for(int i=0; i<nums.length; i++) {
            int idx = Math.abs(nums[i]) - 1;
            if(nums[idx] < 0) res.add(idx+1);
            else nums[idx] = -nums[idx];
        }
        return res;
    }
}`}]
                        },
                        {
                            id: 'rev-majority-element',
                            title: 'Majority Element',
                            problemStatement: "Element that appears more than n/2 times.",
                            problemLink: "https://leetcode.com/problems/majority-element/",
                            sampleInput: "[2,2,1,1,1,2,2]",
                            sampleOutput: "2",
                            approaches: [{name: "Boyer-Moore Voting", explanation: "Increment count if same, decrement if different. If count 0, update candidate.", timeComplexity: "O(N)", spaceComplexity: "O(1)", code: `class Solution {
    public int majorityElement(int[] nums) {
        int count = 0, candidate = 0;
        for(int num : nums) {
            if(count == 0) candidate = num;
            count += (num == candidate) ? 1 : -1;
        }
        return candidate;
    }
}`}]
                        }
                    ]
                },
                {
                    id: 'linked-lists-rev',
                    title: 'Linked Lists (Must Do)',
                    questions: [
                        {
                            id: 'rev-reverse-ll',
                            title: 'Reverse Linked List',
                            problemStatement: "Reverse a singly linked list.",
                            problemLink: "https://leetcode.com/problems/reverse-linked-list/",
                            sampleInput: "[1,2,3,4,5]",
                            sampleOutput: "[5,4,3,2,1]",
                            approaches: [
                                {
                                    name: "Iterative",
                                    explanation: "Prev, Curr, Next pointers. Reverse links on the fly.",
                                    timeComplexity: "O(N)",
                                    spaceComplexity: "O(1)",
                                    code: `class Solution {
    public ListNode reverseList(ListNode head) {
        ListNode prev = null, curr = head;
        while(curr != null) {
            ListNode next = curr.next;
            curr.next = prev;
            prev = curr;
            curr = next;
        }
        return prev;
    }
}`
                                }
                            ]
                        },
                        {
                            id: 'rev-middle-ll',
                            title: 'Middle of Linked List',
                            problemStatement: "Return the middle node.",
                            problemLink: "https://leetcode.com/problems/middle-of-the-linked-list/",
                            sampleInput: "[1,2,3,4,5]",
                            sampleOutput: "3",
                            approaches: [
                                {
                                    name: "Fast & Slow Pointers",
                                    explanation: "Fast moves 2 steps, slow 1 step. When fast reaches end, slow is at middle.",
                                    timeComplexity: "O(N)",
                                    spaceComplexity: "O(1)",
                                    code: `class Solution {
    public ListNode middleNode(ListNode head) {
        ListNode slow = head, fast = head;
        while(fast != null && fast.next != null) {
            slow = slow.next;
            fast = fast.next.next;
        }
        return slow;
    }
}`
                                }
                            ]
                        },
                        {
                            id: 'rev-merge-sorted-lists',
                            title: 'Merge Two Sorted Lists',
                            problemStatement: "Merge two sorted linked lists.",
                            problemLink: "https://leetcode.com/problems/merge-two-sorted-lists/",
                            sampleInput: "l1=[1,2,4], l2=[1,3,4]",
                            sampleOutput: "[1,1,2,3,4,4]",
                            approaches: [
                                {
                                    name: "Iterative Dummy Head",
                                    explanation: "Use a dummy head. Compare heads of l1 and l2, attach smaller to result.",
                                    timeComplexity: "O(N+M)",
                                    spaceComplexity: "O(1)",
                                    code: `class Solution {
    public ListNode mergeTwoLists(ListNode l1, ListNode l2) {
        ListNode dummy = new ListNode(0), curr = dummy;
        while(l1!=null && l2!=null) {
            if(l1.val < l2.val) { curr.next = l1; l1=l1.next; }
            else { curr.next = l2; l2=l2.next; }
            curr = curr.next;
        }
        curr.next = (l1 != null) ? l1 : l2;
        return dummy.next;
    }
}`
                                }
                            ]
                        },
                        {
                            id: 'rev-remove-nth-end',
                            title: 'Remove Nth Node From End',
                            problemStatement: "Remove the nth node from the end of the list and return head.",
                            problemLink: "https://leetcode.com/problems/remove-nth-node-from-end-of-list/",
                            sampleInput: "[1,2,3,4,5], n=2",
                            sampleOutput: "[1,2,3,5]",
                            approaches: [
                                {
                                    name: "Two Pointers (Gap)",
                                    explanation: "Move fast pointer n steps ahead. Then move both fast and slow until fast reaches end. Slow will be at (N-n)th node.",
                                    timeComplexity: "O(N)",
                                    spaceComplexity: "O(1)",
                                    code: `class Solution {
    public ListNode removeNthFromEnd(ListNode head, int n) {
        ListNode dummy = new ListNode(0); dummy.next = head;
        ListNode s = dummy, f = dummy;
        for(int i=0; i<=n; i++) f = f.next;
        while(f != null) { s = s.next; f = f.next; }
        s.next = s.next.next;
        return dummy.next;
    }
}`
                                }
                            ]
                        },
                        {
                            id: 'rev-detect-cycle',
                            title: 'Detect Cycle and Start Point',
                            problemStatement: "Detect if a cycle exists and find the starting node of the cycle.",
                            problemLink: "https://leetcode.com/problems/linked-list-cycle-ii/",
                            sampleInput: "head = [3,2,0,-4], pos = 1",
                            sampleOutput: "node index 1",
                            approaches: [
                                {
                                    name: "Floyd's Cycle Finding",
                                    explanation: "Slow/Fast pointers meet inside loop. Reset slow to head. Move both 1 step. Meeting point is start.",
                                    timeComplexity: "O(N)",
                                    spaceComplexity: "O(1)",
                                    code: `class Solution {
    public ListNode detectCycle(ListNode head) {
        ListNode slow = head, fast = head;
        while(fast != null && fast.next != null) {
            slow = slow.next;
            fast = fast.next.next;
            if(slow == fast) {
                slow = head;
                while(slow != fast) {
                    slow = slow.next;
                    fast = fast.next;
                }
                return slow;
            }
        }
        return null;
    }
}`
                                }
                            ]
                        },
                        {
                            id: 'rev-intersection-ll',
                            title: 'Intersection of Two Linked Lists',
                            problemStatement: "Find the node where two lists intersect.",
                            problemLink: "https://leetcode.com/problems/intersection-of-two-linked-lists/",
                            sampleInput: "listA, listB",
                            sampleOutput: "Reference to the intersection node",
                            approaches: [
                                {
                                    name: "Two Pointers Switch",
                                    explanation: "Pointer A traverses listA then listB. Pointer B traverses listB then listA. They meet at intersection or null.",
                                    timeComplexity: "O(N+M)",
                                    spaceComplexity: "O(1)",
                                    code: `class Solution {
    public ListNode getIntersectionNode(ListNode headA, ListNode headB) {
        ListNode a = headA, b = headB;
        while(a != b) {
            a = (a == null) ? headB : a.next;
            b = (b == null) ? headA : b.next;
        }
        return a;
    }
}`
                                }
                            ]
                        },
                        {
                            id: 'rev-palindrome-ll',
                            title: 'Palindrome Linked List',
                            problemStatement: "Check if LL is a palindrome.",
                            problemLink: "https://leetcode.com/problems/palindrome-linked-list/",
                            sampleInput: "[1,2,2,1]",
                            sampleOutput: "true",
                            approaches: [
                                {
                                    name: "Reverse Half",
                                    explanation: "Find middle. Reverse second half. Compare halves.",
                                    timeComplexity: "O(N)",
                                    spaceComplexity: "O(1)",
                                    code: `class Solution {
    public boolean isPalindrome(ListNode head) {
        ListNode s = head, f = head;
        while(f!=null && f.next!=null) { s=s.next; f=f.next.next; }
        ListNode prev = null;
        while(s!=null) { ListNode n = s.next; s.next=prev; prev=s; s=n; }
        while(prev!=null) {
            if(prev.val != head.val) return false;
            prev = prev.next;
            head = head.next;
        }
        return true;
    }
}`
                                }
                            ]
                        }
                    ]
                }
                ,
                {
                    id: 'rev-matrix',
                    title: 'Matrix (Must Do)',
                    questions: [
                        {
                            id: 'rev-rotate-image',
                            title: 'Rotate Image',
                            problemStatement: "Rotate the matrix by 90 degrees (clockwise).",
                            problemLink: "https://leetcode.com/problems/rotate-image/",
                            sampleInput: "matrix = [[1,2,3],[4,5,6],[7,8,9]]",
                            sampleOutput: "[[7,4,1],[8,5,2],[9,6,3]]",
                            approaches: [{
                                name: "Transpose & Reverse", explanation: "Transpose matrix, then reverse each row.", timeComplexity: "O(N^2)", spaceComplexity: "O(1)", code: `class Solution {
    public void rotate(int[][] matrix) {
        int n = matrix.length;
        // Transpose
        for (int i = 0; i < n; i++) {
            for (int j = i; j < n; j++) {
                int temp = matrix[i][j];
                matrix[i][j] = matrix[j][i];
                matrix[j][i] = temp;
            }
        }
        // Reverse rows
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < n / 2; j++) {
                int temp = matrix[i][j];
                matrix[i][j] = matrix[i][n - 1 - j];
                matrix[i][n - 1 - j] = temp;
            }
        }
    }
}`}]
                        },
                        {
                            id: 'rev-set-matrix-zeroes',
                            title: 'Set Matrix Zeroes',
                            problemStatement: "If an element is 0, set its entire row and column to 0.",
                            problemLink: "https://leetcode.com/problems/set-matrix-zeroes/",
                            sampleInput: "matrix = [[1,1,1],[1,0,1],[1,1,1]]",
                            sampleOutput: "[[1,0,1],[0,0,0],[1,0,1]]",
                            approaches: [{
                                name: "In-place Markers", explanation: "Use first row/col as markers.", timeComplexity: "O(M*N)", spaceComplexity: "O(1)", code: `class Solution {
    public void setZeroes(int[][] matrix) {
        int m = matrix.length, n = matrix[0].length;
        boolean firstRow = false, firstCol = false;
        for(int i=0; i<m; i++) if(matrix[i][0] == 0) firstCol = true;
        for(int j=0; j<n; j++) if(matrix[0][j] == 0) firstRow = true;
        for(int i=1; i<m; i++)
            for(int j=1; j<n; j++)
                if(matrix[i][j] == 0) { matrix[i][0] = 0; matrix[0][j] = 0; }
        for(int i=1; i<m; i++)
            for(int j=1; j<n; j++)
                if(matrix[i][0] == 0 || matrix[0][j] == 0) matrix[i][j] = 0;
        if(firstRow) for(int j=0; j<n; j++) matrix[0][j] = 0;
        if(firstCol) for(int i=0; i<m; i++) matrix[i][0] = 0;
    }
}`}]
                        },
                        {
                            id: 'rev-spiral-matrix',
                            title: 'Spiral Matrix',
                            problemStatement: "Return all elements of the matrix in spiral order.",
                            problemLink: "https://leetcode.com/problems/spiral-matrix/",
                            sampleInput: "matrix = [[1,2,3],[4,5,6],[7,8,9]]",
                            sampleOutput: "[1,2,3,6,9,8,7,4,5]",
                            approaches: [{
                                name: "Simulation", explanation: "Use boundaries (top, bottom, left, right).", timeComplexity: "O(M*N)", spaceComplexity: "O(1)", code: `class Solution {
    public List<Integer> spiralOrder(int[][] matrix) {
        List<Integer> res = new ArrayList<>();
        if(matrix.length == 0) return res;
        int t=0, b=matrix.length-1, l=0, r=matrix[0].length-1;
        while(t<=b && l<=r){
            for(int j=l; j<=r; j++) res.add(matrix[t][j]); t++;
            for(int i=t; i<=b; i++) res.add(matrix[i][r]); r--;
            if(t<=b) for(int j=r; j>=l; j--) res.add(matrix[b][j]); b--;
            if(l<=r) for(int i=b; i>=t; i--) res.add(matrix[i][l]); l++;
        }
        return res;
    }
}`}]
                        },
                        {
                            id: 'rev-word-search',
                            title: 'Word Search',
                            problemStatement: "Check if word exists in the grid.",
                            problemLink: "https://leetcode.com/problems/word-search/",
                            sampleInput: "board = [['A','B','C','E'],['S','F','C','S'],['A','D','E','E']], word = 'ABCCED'",
                            sampleOutput: "true",
                            approaches: [{
                                name: "Backtracking", explanation: "DFS from each cell properly marking visited.", timeComplexity: "O(N*M*4^L)", spaceComplexity: "O(L)", code: `class Solution {
    public boolean exist(char[][] board, String word) {
        for(int i=0; i<board.length; i++)
            for(int j=0; j<board[0].length; j++)
                if(dfs(board, i, j, word, 0)) return true;
        return false;
    }
    boolean dfs(char[][] b, int i, int j, String w, int k) {
        if(k == w.length()) return true;
        if(i<0||j<0||i>=b.length||j>=b[0].length||b[i][j]!=w.charAt(k)) return false;
        char temp = b[i][j]; b[i][j] = '#';
        boolean res = dfs(b, i+1, j, w, k+1) || dfs(b, i-1, j, w, k+1) ||
                      dfs(b, i, j+1, w, k+1) || dfs(b, i, j-1, w, k+1);
        b[i][j] = temp;
        return res;
    }
}`}]
                        }
                    ]
                },
                {
                    id: 'rev-binary-search',
                    title: 'Binary Search (Must Do)',
                    questions: [
                        {
                            id: 'rev-search-rotated',
                            title: 'Search in Rotated Sorted Array',
                            problemStatement: "Search for target in a rotated sorted array.",
                            problemLink: "https://leetcode.com/problems/search-in-rotated-sorted-array/",
                            sampleInput: "nums = [4,5,6,7,0,1,2], target = 0",
                            sampleOutput: "4",
                            approaches: [{
                                name: "Binary Search", explanation: "Determine which half is sorted.", timeComplexity: "O(log N)", spaceComplexity: "O(1)", code: `class Solution {
    public int search(int[] nums, int target) {
        int l=0, r=nums.length-1;
        while(l<=r){
            int m = l+(r-l)/2;
            if(nums[m]==target) return m;
            if(nums[l]<=nums[m]){ // Left sorted
                if(target>=nums[l] && target<nums[m]) r=m-1; else l=m+1;
            } else { // Right sorted
                if(target>nums[m] && target<=nums[r]) l=m+1; else r=m-1;
            }
        }
        return -1;
    }
}`}]
                        },
                        {
                            id: 'rev-min-rotated',
                            title: 'Find Minimum in Rotated Sorted Array',
                            problemStatement: "Find the minimum element.",
                            problemLink: "https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/",
                            sampleInput: "[3,4,5,1,2]",
                            sampleOutput: "1",
                            approaches: [{
                                name: "Binary Search", explanation: "Compare mid with right. If mid > right, min is in right half.", timeComplexity: "O(log N)", spaceComplexity: "O(1)", code: `class Solution {
    public int findMin(int[] nums) {
        int l=0, r=nums.length-1;
        while(l<r) { // Loop ends when l==r
            int m = l + (r-l)/2;
            if(nums[m] > nums[r]) l = m+1;
            else r = m;
        }
        return nums[l];
    }
}`}]
                        },
                        {
                            id: 'rev-median-sorted',
                            title: 'Median of Two Sorted Arrays',
                            problemStatement: "Find the median of two sorted arrays.",
                            problemLink: "https://leetcode.com/problems/median-of-two-sorted-arrays/",
                            sampleInput: "nums1 = [1,3], nums2 = [2]",
                            sampleOutput: "2.00000",
                            approaches: [{ name: "Binary Search on Partition", explanation: "Partition both arrays such that left halves have same size as right.", timeComplexity: "O(log(min(M,N)))", spaceComplexity: "O(1)", code: `// Refer to full solution online, extensive logic.` }]
                        }
                    ]
                },
                {
                    id: 'rev-dp',
                    title: 'Dynamic Programming (Must Do)',
                    questions: [
                        {
                            id: 'rev-climbing-stairs',
                            title: 'Climbing Stairs',
                            problemStatement: "Count ways to reach top taking 1 or 2 steps.",
                            problemLink: "https://leetcode.com/problems/climbing-stairs/",
                            sampleInput: "n=2",
                            sampleOutput: "2",
                            approaches: [{
                                name: "Fibonacci", explanation: "dp[i] = dp[i-1] + dp[i-2]", timeComplexity: "O(N)", spaceComplexity: "O(1)", code: `class Solution {
    public int climbStairs(int n) {
        if(n<=1) return 1;
        int a=1, b=1;
        for(int i=2; i<=n; i++) { int temp=a+b; a=b; b=temp; }
        return b;
    }
}`}]
                        },
                        {
                            id: 'rev-coin-change',
                            title: 'Coin Change',
                            problemStatement: "Fewest coins to make up amount.",
                            problemLink: "https://leetcode.com/problems/coin-change/",
                            sampleInput: "coins=[1,2,5], amount=11",
                            sampleOutput: "3",
                            approaches: [{
                                name: "Bottom Up DP", explanation: "dp[i] = min(dp[i], dp[i-coin] + 1)", timeComplexity: "O(Amount * N)", spaceComplexity: "O(Amount)", code: `class Solution {
    public int coinChange(int[] coins, int amount) {
        int[] dp = new int[amount+1];
        Arrays.fill(dp, amount+1);
        dp[0]=0;
        for(int i=1; i<=amount; i++)
            for(int c : coins)
                if(i >= c) dp[i] = Math.min(dp[i], dp[i-c] + 1);
        return dp[amount]>amount ? -1 : dp[amount];
    }
}`}]
                        },
                        {
                            id: 'rev-lis',
                            title: 'Longest Increasing Subsequence',
                            problemStatement: "Find length of LIS.",
                            problemLink: "https://leetcode.com/problems/longest-increasing-subsequence/",
                            sampleInput: "[10,9,2,5,3,7,101,18]",
                            sampleOutput: "4",
                            approaches: [{
                                name: "DP with Binary Search", explanation: "Patience sorting tail array.", timeComplexity: "O(N log N)", spaceComplexity: "O(N)", code: `class Solution {
    public int lengthOfLIS(int[] nums) {
        List<Integer> tails = new ArrayList<>();
        for(int n : nums) {
            int idx = Collections.binarySearch(tails, n);
            if(idx < 0) idx = -(idx + 1);
            if(idx == tails.size()) tails.add(n);
            else tails.set(idx, n);
        }
        return tails.size();
    }
}`}]
                        },
                        {
                            id: 'rev-lcs',
                            title: 'Longest Common Subsequence',
                            problemStatement: "Find length of LCS.",
                            problemLink: "https://leetcode.com/problems/longest-common-subsequence/",
                            sampleInput: "text1 = 'abcde', text2 = 'ace'",
                            sampleOutput: "3",
                            approaches: [{
                                name: "2D DP", explanation: "dp[i][j] = (c1==c2) ? 1+diag : max(up, left)", timeComplexity: "O(M*N)", spaceComplexity: "O(M*N)", code: `class Solution {
    public int longestCommonSubsequence(String t1, String t2) {
        int m=t1.length(), n=t2.length();
        int[][] dp = new int[m+1][n+1];
        for(int i=1; i<=m; i++)
            for(int j=1; j<=n; j++)
                if(t1.charAt(i-1)==t2.charAt(j-1)) dp[i][j] = 1 + dp[i-1][j-1];
                else dp[i][j] = Math.max(dp[i-1][j], dp[i][j-1]);
        return dp[m][n];
    }
}`}]
                        },
                        {
                            id: 'rev-word-break',
                            title: 'Word Break',
                            problemStatement: "Can string be segmented into dictionary words?",
                            problemLink: "https://leetcode.com/problems/word-break/",
                            sampleInput: "s = 'leetcode', wordDict = ['leet', 'code']",
                            sampleOutput: "true",
                            approaches: [{
                                name: "DP", explanation: "dp[i] is true if s[0..i] can be built.", timeComplexity: "O(N^2)", spaceComplexity: "O(N)", code: `class Solution {
    public boolean wordBreak(String s, List<String> wordDict) {
        Set<String> set = new HashSet<>(wordDict);
        boolean[] dp = new boolean[s.length()+1];
        dp[0] = true;
        for(int i=1; i<=s.length(); i++)
            for(int j=0; j<i; j++)
                if(dp[j] && set.contains(s.substring(j, i))) { dp[i] = true; break; }
        return dp[s.length()];
    }
}`}]
                        }
                    ]
                },
                {
                    id: 'rev-intervals',
                    title: 'Intervals (Must Do)',
                    questions: [
                        {
                            id: 'rev-merge-intervals',
                            title: 'Merge Intervals',
                            problemStatement: "Merge overlapping intervals.",
                            problemLink: "https://leetcode.com/problems/merge-intervals/",
                            sampleInput: "[[1,3],[2,6],[8,10],[15,18]]",
                            sampleOutput: "[[1,6],[8,10],[15,18]]",
                            approaches: [{
                                name: "Sorting", explanation: "Sort by start time. Merge if overlap.", timeComplexity: "O(N log N)", spaceComplexity: "O(N)", code: `class Solution {
    public int[][] merge(int[][] intervals) {
        Arrays.sort(intervals, (a,b)->Integer.compare(a[0],b[0]));
        List<int[]> res = new ArrayList<>();
        int[] curr = intervals[0];
        res.add(curr);
        for(int[] next : intervals) {
            if(next[0] <= curr[1]) curr[1] = Math.max(curr[1], next[1]);
            else { curr = next; res.add(curr); }
        }
        return res.toArray(new int[res.size()][]);
    }
}`}]
                        },
                        {
                            id: 'rev-insert-interval',
                            title: 'Insert Interval',
                            problemStatement: "Insert new interval and merge if necessary.",
                            problemLink: "https://leetcode.com/problems/insert-interval/",
                            sampleInput: "intervals = [[1,3],[6,9]], newInterval = [2,5]",
                            sampleOutput: "[[1,5],[6,9]]",
                            approaches: [{
                                name: "Linear Scan", explanation: "Add non-overlapping before, merge overlapping, add rest.", timeComplexity: "O(N)", spaceComplexity: "O(N)", code: `class Solution {
    public int[][] insert(int[][] intervals, int[] newInterval) {
        List<int[]> res = new ArrayList<>();
        int i=0, n=intervals.length;
        while(i<n && intervals[i][1] < newInterval[0]) res.add(intervals[i++]);
        while(i<n && intervals[i][0] <= newInterval[1]) {
            newInterval[0] = Math.min(newInterval[0], intervals[i][0]);
            newInterval[1] = Math.max(newInterval[1], intervals[i][1]);
            i++;
        }
        res.add(newInterval);
        while(i<n) res.add(intervals[i++]);
        return res.toArray(new int[res.size()][]);
    }
}`}]
                        },
                        {
                            id: 'rev-non-overlap',
                            title: 'Non-overlapping Intervals',
                            problemStatement: "Min intervals to remove to make rest non-overlapping.",
                            problemLink: "https://leetcode.com/problems/non-overlapping-intervals/",
                            sampleInput: "[[1,2],[2,3],[3,4],[1,3]]",
                            sampleOutput: "1",
                            approaches: [{
                                name: "Greedy", explanation: "Sort by end time. Pick earliest end time.", timeComplexity: "O(N log N)", spaceComplexity: "O(1)", code: `class Solution {
    public int eraseOverlapIntervals(int[][] intervals) {
        Arrays.sort(intervals, (a,b)->Integer.compare(a[1], b[1]));
        int count = 0, end = Integer.MIN_VALUE;
        for(int[] i : intervals) {
            if(i[0] >= end) end = i[1];
            else count++;
        }
        return count;
    }
}`}]
                        }
                    ]
                },
                {
                    id: 'rev-trees',
                    title: 'Trees (Must Do)',
                    questions: [
                        {
                            id: 'rev-level-order',
                            title: 'Binary Tree Level Order Traversal',
                            problemStatement: "Level order traversal.",
                            problemLink: "https://leetcode.com/problems/binary-tree-level-order-traversal/",
                            sampleInput: "[3,9,20,null,null,15,7]",
                            sampleOutput: "[[3],[9,20],[15,7]]",
                            approaches: [{
                                name: "BFS", explanation: "Queue based traversal.", timeComplexity: "O(N)", spaceComplexity: "O(N)", code: `class Solution {
    public List<List<Integer>> levelOrder(TreeNode root) {
        List<List<Integer>> res = new ArrayList<>();
        if(root==null) return res;
        Queue<TreeNode> q = new LinkedList<>();
        q.offer(root);
        while(!q.isEmpty()){
            int size = q.size();
            List<Integer> list = new ArrayList<>();
            for(int i=0; i<size; i++){
                TreeNode n = q.poll();
                list.add(n.val);
                if(n.left!=null) q.offer(n.left);
                if(n.right!=null) q.offer(n.right);
            }
            res.add(list);
        }
        return res;
    }
}`}]
                        },
                        {
                            id: 'rev-zigzag',
                            title: 'Zigzag Level Order',
                            problemStatement: "Zigzag level order traversal.",
                            problemLink: "https://leetcode.com/problems/binary-tree-zigzag-level-order-traversal/",
                            sampleInput: "[3,9,20,null,null,15,7]",
                            sampleOutput: "[[3],[20,9],[15,7]]",
                            approaches: [{ name: "BFS with deque", explanation: "Toggle direction each level.", timeComplexity: "O(N)", spaceComplexity: "O(N)", code: "// Similar to Level Order with reversal" }]
                        },
                        {
                            id: 'rev-validate-bst',
                            title: 'Validate BST',
                            problemStatement: "Check if valid BST.",
                            problemLink: "https://leetcode.com/problems/validate-binary-search-tree/",
                            sampleInput: "[2,1,3]",
                            sampleOutput: "true",
                            approaches: [{
                                name: "Recursion (Range)", explanation: "Validate node val is between min and max.", timeComplexity: "O(N)", spaceComplexity: "O(H)", code: `class Solution {
    public boolean isValidBST(TreeNode root) { return check(root, Long.MIN_VALUE, Long.MAX_VALUE); }
    boolean check(TreeNode n, long min, long max) {
        if(n==null) return true;
        if(n.val <= min || n.val >= max) return false;
        return check(n.left, min, n.val) && check(n.right, n.val, max);
    }
}`}]
                        },
                        {
                            id: 'rev-lca-bst',
                            title: 'LCA of BST',
                            problemStatement: "Find LCA in BST.",
                            problemLink: "https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-search-tree/",
                            sampleInput: "root = [6,2,8...], p=2, q=8",
                            sampleOutput: "6",
                            approaches: [{
                                name: "Iterative", explanation: "If both < root, go left. If both > root, go right. Else root is LCA.", timeComplexity: "O(H)", spaceComplexity: "O(1)", code: `class Solution {
    public TreeNode lowestCommonAncestor(TreeNode root, TreeNode p, TreeNode q) {
        while(root != null) {
            if(p.val < root.val && q.val < root.val) root = root.left;
            else if(p.val > root.val && q.val > root.val) root = root.right;
            else return root;
        }
        return null;
    }
}`}]
                        },
                        {
                            id: 'rev-serialize-tree',
                            title: 'Serialize and Deserialize Binary Tree',
                            problemStatement: "Serialize tree to string and back.",
                            problemLink: "https://leetcode.com/problems/serialize-and-deserialize-binary-tree/",
                            sampleInput: "[1,2,3,null,null,4,5]",
                            sampleOutput: "[1,2,3,null,null,4,5]",
                            approaches: [{ name: "Preorder DFS", explanation: "Use comma sep string. Use 'null' for nulls.", timeComplexity: "O(N)", spaceComplexity: "O(N)", code: `// Advanced Serialization Logic` }]
                        }
                    ]
                },
                {
                    id: 'rev-misc',
                    title: 'Mixed (Heap, Design, Bits)',
                    questions: [
                        {
                            id: 'rev-top-k',
                            title: 'Top K Frequent Elements',
                            problemStatement: "Find k most frequent elements.",
                            problemLink: "https://leetcode.com/problems/top-k-frequent-elements/",
                            sampleInput: "[1,1,1,2,2,3], k=2",
                            sampleOutput: "[1,2]",
                            approaches: [{
                                name: "Min Heap", explanation: "Keep heap of size k based on frequency.", timeComplexity: "O(N log K)", spaceComplexity: "O(N)", code: `class Solution {
    public int[] topKFrequent(int[] nums, int k) {
        Map<Integer, Integer> map = new HashMap<>();
        for(int n : nums) map.put(n, map.getOrDefault(n, 0)+1);
        PriorityQueue<Integer> pq = new PriorityQueue<>((a,b)->map.get(a)-map.get(b));
        for(int n : map.keySet()) {
            pq.offer(n);
            if(pq.size()>k) pq.poll();
        }
        int[] res = new int[k];
        for(int i=0; i<k; i++) res[i] = pq.poll();
        return res;
    }
}`}]
                        },
                        {
                            id: 'rev-trie',
                            title: 'Implement Trie',
                            problemStatement: "Implement insert, search, startsWith.",
                            problemLink: "https://leetcode.com/problems/implement-trie-prefix-tree/",
                            sampleInput: "Trie(), insert('apple')...",
                            sampleOutput: "null, true...",
                            approaches: [{
                                name: "TrieNode", explanation: "Node with children array[26] and isEnd boolean.", timeComplexity: "O(L)", spaceComplexity: "O(N*L)", code: `class Trie {
    class Node { Node[] ch = new Node[26]; boolean end; }
    Node root = new Node();
    public void insert(String word) {
        Node n = root;
        for(char c : word.toCharArray()) {
            if(n.ch[c-'a']==null) n.ch[c-'a'] = new Node();
            n = n.ch[c-'a'];
        }
        n.end = true;
    }
    public boolean search(String word) {
        Node n = root;
        for(char c : word.toCharArray()) {
            if(n.ch[c-'a']==null) return false;
            n = n.ch[c-'a'];
        }
        return n.end;
    }
    public boolean startsWith(String prefix) {
        Node n = root;
        for(char c : prefix.toCharArray()) {
            if(n.ch[c-'a']==null) return false;
            n = n.ch[c-'a'];
        }
        return true;
    }
}`}]
                        },
                        {
                            id: 'rev-lru',
                            title: 'LRU Cache',
                            problemStatement: "Implement LRU Cache.",
                            problemLink: "https://leetcode.com/problems/lru-cache/",
                            sampleInput: "LRUCache(2), put(1,1)...",
                            sampleOutput: "...",
                            approaches: [{ name: "HashMap + Doubly Linked List", explanation: "Map for O(1) access, DLL for O(1) update order.", timeComplexity: "O(1)", spaceComplexity: "O(Capacity)", code: `// Standard LRU implementation` }]
                        },
                        {
                            id: 'rev-sum-integers',
                            title: 'Sum of Two Integers',
                            problemStatement: "Sum without + or - operators.",
                            problemLink: "https://leetcode.com/problems/sum-of-two-integers/",
                            sampleInput: "a=1, b=2",
                            sampleOutput: "3",
                            approaches: [{
                                name: "Bit Manipulation", explanation: "Sum = a^b, Carry = (a&b)<<1. Iterate until carry 0.", timeComplexity: "O(1)", spaceComplexity: "O(1)", code: `class Solution {
    public int getSum(int a, int b) {
        while(b!=0) { int c = (a&b)<<1; a=a^b; b=c; }
        return a;
    }
}`}]
                        },
                        {
                            id: 'rev-counting-bits',
                            title: 'Number of 1 Bits',
                            problemStatement: "Hamming weight (count 1s).",
                            problemLink: "https://leetcode.com/problems/number-of-1-bits/",
                            sampleInput: "00000000000000000000000000001011",
                            sampleOutput: "3",
                            approaches: [{
                                name: "n & (n-1)", explanation: "Flip least significant 1 bit.", timeComplexity: "O(1)", spaceComplexity: "O(1)", code: `public class Solution {
    // you need to treat n as an unsigned value
    public int hammingWeight(int n) {
        int c=0;
        while(n!=0) { n&=(n-1); c++; }
        return c;
    }
}`}]
                        }
                    ]
                },
        {
        id: 'rev-recursion-backtracking',
        title: 'Recursion & Backtracking',
        questions: [
            {
                id: 'rev-subsets',
                title: 'Subsets',
                problemStatement: "Return all possible subsets (the power set).",
                problemLink: "https://leetcode.com/problems/subsets/",
                sampleInput: "[1,2,3]",
                sampleOutput: "[[],[1],[2],[1,2],[3],[1,3],[2,3],[1,2,3]]",
                approaches: [{name: "Backtracking", explanation: "Include current element, recurse. Exclude current element, recurse.", timeComplexity: "O(N*2^N)", spaceComplexity: "O(N)", code: `class Solution {
    public List<List<Integer>> subsets(int[] nums) {
        List<List<Integer>> res = new ArrayList<>();
        backtrack(res, new ArrayList<>(), nums, 0);
        return res;
    }
    void backtrack(List<List<Integer>> res, List<Integer> temp, int[] nums, int start) {
        res.add(new ArrayList<>(temp));
        for(int i=start; i<nums.length; i++) {
            temp.add(nums[i]);
            backtrack(res, temp, nums, i+1);
            temp.remove(temp.size()-1);
        }
    }
}`}]
            },
            {
                id: 'rev-combination-sum',
                title: 'Combination Sum',
                problemStatement: "Find distinct combinations that sum to target.",
                problemLink: "https://leetcode.com/problems/combination-sum/",
                sampleInput: "[2,3,6,7], target=7",
                sampleOutput: "[[2,2,3],[7]]",
                approaches: [{name: "Backtracking", explanation: "Pick current number, stay at index (reuse). Skip current number, move to next.", timeComplexity: "O(2^T)", spaceComplexity: "O(T)", code: `class Solution {
    public List<List<Integer>> combinationSum(int[] candidates, int target) {
         List<List<Integer>> res = new ArrayList<>();
         backtrack(res, new ArrayList<>(), candidates, target, 0);
         return res;
    }
    void backtrack(List<List<Integer>> res, List<Integer> temp, int[] nums, int remain, int start) {
        if(remain < 0) return;
        if(remain == 0) { res.add(new ArrayList<>(temp)); return; }
        for(int i=start; i<nums.length; i++) {
            temp.add(nums[i]);
            backtrack(res, temp, nums, remain-nums[i], i);
            temp.remove(temp.size()-1);
        }
    }
}`}]
            },
             {
                id: 'rev-n-queens',
                title: 'N-Queens',
                problemStatement: "Place N queens on NxN board.",
                problemLink: "https://leetcode.com/problems/n-queens/",
                sampleInput: "n=4",
                sampleOutput: "[[.Q..,...],...]",
                approaches: [{name: "Backtracking", explanation: "Place Q row by row. Check cols and diagonals.", timeComplexity: "O(N!)", spaceComplexity: "O(N^2)", code: `class Solution {
    public List<List<String>> solveNQueens(int n) {
        List<List<String>> res = new ArrayList<>();
        char[][] board = new char[n][n];
        for(char[] r: board) Arrays.fill(r, '.');
        backtrack(res, board, 0);
        return res;
    }
    void backtrack(List<List<String>> res, char[][] b, int r) {
        if(r == b.length) {
            List<String> list = new ArrayList<>();
            for(char[] row : b) list.add(new String(row));
            res.add(list);
            return;
        }
        for(int c=0; c<b.length; c++) {
            if(isValid(b, r, c)) {
                b[r][c] = 'Q';
                backtrack(res, b, r+1);
                b[r][c] = '.';
            }
        }
    }
    boolean isValid(char[][] b, int r, int c) {
        for(int i=0; i<r; i++) if(b[i][c]=='Q') return false;
        for(int i=r-1, j=c-1; i>=0 && j>=0; i--, j--) if(b[i][j]=='Q') return false;
        for(int i=r-1, j=c+1; i>=0 && j<b.length; i--, j++) if(b[i][j]=='Q') return false;
        return true;
    }
}`}]
            },
            {
                id: 'rev-sudoku-solver',
                title: 'Sudoku Solver',
                problemStatement: "Solve Sudoku puzzle.",
                problemLink: "https://leetcode.com/problems/sudoku-solver/",
                sampleInput: "board = [...]",
                sampleOutput: "Solved board",
                approaches: [{name: "Backtracking", explanation: "Try 1-9 in empty cell. Check validity. Recurse.", timeComplexity: "O(9^M)", spaceComplexity: "O(M)", code: `class Solution {
    public void solveSudoku(char[][] board) { solve(board); }
    boolean solve(char[][] board) {
        for(int i=0; i<9; i++) {
            for(int j=0; j<9; j++) {
                if(board[i][j] == '.') {
                    for(char c='1'; c<='9'; c++) {
                        if(isValid(board, i, j, c)) {
                            board[i][j] = c;
                            if(solve(board)) return true;
                            board[i][j] = '.';
                        }
                    }
                    return false;
                }
            }
        }
        return true;
    }
    boolean isValid(char[][] b, int r, int c, char n) {
        for(int i=0; i<9; i++) {
            if(b[i][c] == n) return false;
            if(b[r][i] == n) return false;
            if(b[3*(r/3)+i/3][3*(c/3)+i%3] == n) return false;
        }
        return true;
    }
}`}]
            },
             {
                id: 'rev-rat-maze',
                title: 'Rat in a Maze',
                problemStatement: "Find path from (0,0) to (N-1,N-1).",
                problemLink: "https://www.geeksforgeeks.org/rat-in-a-maze-problem-when-movement-allowed-in-all-4-directions/",
                sampleInput: "Grid",
                sampleOutput: "Path string",
                approaches: [{name: "DFS/Backtracking", explanation: "Try 4 directions (D,L,R,U). Mark visited.", timeComplexity: "O(4^(N^2))", spaceComplexity: "O(N^2)", code: `class Solution {
    // Conceptual DFS helper
    void solve(int i, int j, int[][] m, int n, String p, ArrayList<String> res, boolean[][] vis) {
        if(i==n-1 && j==n-1) { res.add(p); return; }
        if(i<0||j<0||i>=n||j>=n||vis[i][j]||m[i][j]==0) return;
        vis[i][j]=true;
        solve(i+1,j,m,n,p+"D",res,vis);
        solve(i,j-1,m,n,p+"L",res,vis);
        solve(i,j+1,m,n,p+"R",res,vis);
        solve(i-1,j,m,n,p+"U",res,vis);
        vis[i][j]=false;
    }
}`}]
            }
        ]
    },
    {
        id: 'rev-greedy-graphs',
        title: 'Greedy & Graphs (Must Do)',
        questions: [
            {
                id: 'rev-n-meetings',
                title: 'N Meetings in One Room',
                problemStatement: "Max number of meetings.",
                problemLink: "https://www.geeksforgeeks.org/find-maximum-meetings-in-one-room/",
                sampleInput: "start=[1,3,0,5,8,5], end=[2,4,6,7,9,9]",
                sampleOutput: "4",
                approaches: [{name: "Greedy", explanation: "Sort by finish time. Select next meeting if start > last_end.", timeComplexity: "O(N log N)", spaceComplexity: "O(N)", code: `class Solution {
    public int maxMeetings(int[] start, int[] end, int n) {
        int[][] meet = new int[n][2];
        for(int i=0; i<n; i++) { meet[i][0]=start[i]; meet[i][1]=end[i]; }
        Arrays.sort(meet, (a,b)->a[1]-b[1]);
        int count=1, last=meet[0][1];
        for(int i=1; i<n; i++) if(meet[i][0]>last) { count++; last=meet[i][1]; }
        return count;
    }
}`}]
            },
            {
                id: 'rev-min-platforms',
                title: 'Minimum Platforms',
                problemStatement: "Min platforms for railway station.",
                problemLink: "https://www.geeksforgeeks.org/minimum-number-of-platforms-required-for-a-railway/",
                sampleInput: "arr=[...], dep=[...]",
                sampleOutput: "3",
                approaches: [{name: "Sorting", explanation: "Sort both arr and dep. Two pointers. If arr[i] <= dep[j], plat++. Else plat--.", timeComplexity: "O(N log N)", spaceComplexity: "O(1)", code: `class Solution {
    public int findPlatform(int arr[], int dep[], int n) {
        Arrays.sort(arr); Arrays.sort(dep);
        int plat=1, res=1, i=1, j=0;
        while(i<n && j<n) {
            if(arr[i] <= dep[j]) { plat++; i++; }
            else { plat--; j++; }
            res = Math.max(res, plat);
        }
        return res;
    }
}`}]
            },
            {
                id: 'rev-num-islands',
                title: 'Number of Islands',
                problemStatement: "Count islands '1' (land) vs '0' (water).",
                problemLink: "https://leetcode.com/problems/number-of-islands/",
                sampleInput: "grid",
                sampleOutput: "Num islands",
                approaches: [{name: "DFS/BFS", explanation: "Visit land, mark visited (or sink them to '0'). DFS neighbors.", timeComplexity: "O(M*N)", spaceComplexity: "O(M*N)", code: `class Solution {
    public int numIslands(char[][] grid) {
        int c=0;
        for(int i=0; i<grid.length; i++)
            for(int j=0; j<grid[0].length; j++)
                if(grid[i][j]=='1') { dfs(grid, i, j); c++; }
        return c;
    }
    void dfs(char[][] g, int i, int j) {
        if(i<0||j<0||i>=g.length||j>=g[0].length||g[i][j]=='0') return;
        g[i][j]='0';
        dfs(g,i+1,j); dfs(g,i-1,j); dfs(g,i,j+1); dfs(g,i,j-1);
    }
}`}]
            },
             {
                id: 'rev-word-ladder',
                title: 'Word Ladder',
                problemStatement: "Length of shortest transformation sequence.",
                problemLink: "https://leetcode.com/problems/word-ladder/",
                sampleInput: "beginWord, endWord, list",
                sampleOutput: "Length",
                approaches: [{name: "BFS", explanation: "Level order search. Change 1 char at a time.", timeComplexity: "O(M^2 * N)", spaceComplexity: "O(M * N)", code: `class Solution {
    public int ladderLength(String beginWord, String endWord, List<String> wordList) {
        Set<String> set = new HashSet<>(wordList);
        if(!set.contains(endWord)) return 0;
        Queue<String> q = new LinkedList<>();
        q.offer(beginWord);
        int level = 1;
        while(!q.isEmpty()) {
            int size = q.size();
            for(int i=0; i<size; i++) {
                String curr = q.poll();
                char[] chars = curr.toCharArray();
                for(int j=0; j<chars.length; j++) {
                    char orig = chars[j];
                    for(char c='a'; c<='z'; c++) {
                        if(c == orig) continue;
                        chars[j] = c;
                        String next = new String(chars);
                        if(next.equals(endWord)) return level+1;
                        if(set.contains(next)) { q.offer(next); set.remove(next); }
                    }
                    chars[j] = orig;
                }
            }
            level++;
        }
        return 0;
    }
}`}]
            }
        ]
    },
    {
        id: 'rev-adv-dp',
        title: 'Advanced DP',
        questions: [
            {
                id: 'rev-edit-distance',
                title: 'Edit Distance',
                problemStatement: "Min ops to convert word1 to word2.",
                problemLink: "https://leetcode.com/problems/edit-distance/",
                sampleInput: "horse, ros",
                sampleOutput: "3",
                approaches: [{name: "2D DP", explanation: "dp[i][j] = (c1==c2) ? diag : 1 + min(ins, del, rep)", timeComplexity: "O(N*M)", spaceComplexity: "O(N*M)", code: `class Solution {
    public int minDistance(String w1, String w2) {
        int m=w1.length(), n=w2.length();
        int[][] dp = new int[m+1][n+1];
        for(int i=0; i<=m; i++) dp[i][0]=i;
        for(int j=0; j<=n; j++) dp[0][j]=j;
        for(int i=1; i<=m; i++) {
            for(int j=1; j<=n; j++) {
                if(w1.charAt(i-1)==w2.charAt(j-1)) dp[i][j]=dp[i-1][j-1];
                else dp[i][j] = 1 + Math.min(dp[i-1][j-1], Math.min(dp[i-1][j], dp[i][j-1]));
            }
        }
        return dp[m][n];
    }
}`}]
            },
            {
                id: 'rev-knapsack',
                title: '0/1 Knapsack',
                problemStatement: "Max value with weight capacity W.",
                problemLink: "https://www.geeksforgeeks.org/0-1-knapsack-problem-dp-10/",
                sampleInput: "val[], wt[], W",
                sampleOutput: "Max Val",
                approaches: [{name: "DP", explanation: "dp[i][w] = max(exclude, val[i] + dp[i-1][w-wt[i]])", timeComplexity: "O(N*W)", spaceComplexity: "O(N*W)", code: `class Solution {
    static int knapSack(int W, int wt[], int val[], int n) {
        int[][] dp = new int[n+1][W+1];
        for(int i=1; i<=n; i++)
            for(int w=1; w<=W; w++)
                if(wt[i-1] <= w) dp[i][w] = Math.max(val[i-1]+dp[i-1][w-wt[i-1]], dp[i-1][w]);
                else dp[i][w] = dp[i-1][w];
        return dp[n][W];
    }
}`}]
            },
             {
                id: 'rev-subset-sum',
                title: 'Partition Equal Subset Sum',
                problemStatement: "Can array be partitioned into two equal sum subsets?",
                problemLink: "https://leetcode.com/problems/partition-equal-subset-sum/",
                sampleInput: "[1,5,11,5]",
                sampleOutput: "true",
                approaches: [{name: "DP (Subset Sum)", explanation: "Knapsack variation. Find if subset sums to Total/2.", timeComplexity: "O(N*Sum)", spaceComplexity: "O(Sum)", code: `class Solution {
    public boolean canPartition(int[] nums) {
        int sum=0; for(int n:nums) sum+=n;
        if(sum%2!=0) return false;
        sum /= 2;
        boolean[] dp = new boolean[sum+1];
        dp[0]=true;
        for(int n:nums)
            for(int i=sum; i>=n; i--)
                dp[i] = dp[i] || dp[i-n];
        return dp[sum];
    }
}`}]
            }
        ]
    },
    {
        id: 'rev-sys-design',
        title: 'System Design & Logic',
        questions: [
            {
                id: 'rev-lfu',
                title: 'LFU Cache',
                problemStatement: "Least Frequently Used Cache.",
                problemLink: "https://leetcode.com/problems/lfu-cache/",
                sampleInput: "LFUCache(2)...",
                sampleOutput: "...",
                approaches: [{name: "HashMaps + LinkedHashSets", explanation: "Map key->val, key->freq, freq->DoublyLinkedList.", timeComplexity: "O(1)", spaceComplexity: "O(N)", code: `// Complex LFU implementation (conceptual)`}]
            },
            {
                id: 'rev-twitter',
                title: 'Design Twitter',
                problemStatement: "Post tweet, follow/unfollow, get news feed.",
                problemLink: "https://leetcode.com/problems/design-twitter/",
                sampleInput: "Twitter(), post...",
                sampleOutput: "...",
                approaches: [{name: "HashMap + PriorityQueue", explanation: "User map. Heap for merging tweets from followees.", timeComplexity: "O(log K)", spaceComplexity: "O(N)", code: `class Twitter {
    // Conceptual: User class, Tweet class, Map<UserId, User>.
    // getNewsFeed uses PQ to merge K sorted lists of tweets.
}`}]
            },
             {
                id: 'rev-shuffle',
                title: 'Shuffle an Array',
                problemStatement: "Shuffle a set of numbers without duplicates.",
                problemLink: "https://leetcode.com/problems/shuffle-an-array/",
                sampleInput: "Solution(nums), shuffle()...",
                sampleOutput: "Randomized array",
                approaches: [{name: "Fisher-Yates Algorithm", explanation: "Iterate i from n-1 to 1. Swap arr[i] with random(0..i).", timeComplexity: "O(N)", spaceComplexity: "O(N)", code: `class Solution {
    int[] nums; Random r = new Random();
    public Solution(int[] nums) { this.nums = nums; }
    public int[] reset() { return nums; }
    public int[] shuffle() {
        int[] a = nums.clone();
        for(int i=a.length-1; i>0; i--) {
            int j = r.nextInt(i+1);
            int t = a[i]; a[i]=a[j]; a[j]=t;
        }
        return a;
    }
}`}]
            }
        ]
    }
            ]

        }
    ]
};
