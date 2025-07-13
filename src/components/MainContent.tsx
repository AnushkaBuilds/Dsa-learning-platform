import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Play, Copy } from 'lucide-react';
import CodeEditor from './CodeEditor';

const MainContent: React.FC = () => {
  const [newComment, setNewComment] = useState('');
  const [comments, setComments] = useState([
    {
      id: 1,
      author: 'Alice Chen',
      avatar: 'A',
      time: '2 hours ago',
      content: 'Great explanation! The Dutch National Flag algorithm is so elegant. I initially tried a two-pass approach but this single-pass solution is much more efficient.',
      color: 'blue'
    },
    {
      id: 2,
      author: 'Bob Martinez',
      avatar: 'B',
      time: '5 hours ago',
      content: 'The key insight about maintaining three regions really helped me understand the algorithm. Thanks for the clear walkthrough!',
      color: 'green'
    }
  ]);

  const problems = [
    { id: 'remove-duplicates', name: 'Remove Duplicates' },
    { id: 'sort-colors', name: 'Sort Colors' },
    { id: 'container-water', name: 'Container With Water' }
  ];

  const currentProblemIndex = problems.findIndex(p => p.id === 'sort-colors');

  const handlePreviousProblem = () => {
    if (currentProblemIndex > 0) {
      const prevProblem = problems[currentProblemIndex - 1];
      alert(`Navigating to: ${prevProblem.name}`);
      // In a real app, this would update the URL and load the new problem
      console.log('Navigate to:', prevProblem.id);
    }
  };

  const handleNextProblem = () => {
    if (currentProblemIndex < problems.length - 1) {
      const nextProblem = problems[currentProblemIndex + 1];
      alert(`Navigating to: ${nextProblem.name}`);
      // In a real app, this would update the URL and load the new problem
      console.log('Navigate to:', nextProblem.id);
    }
  };

  const handlePostComment = () => {
    if (newComment.trim()) {
      const colors = ['purple', 'indigo', 'pink', 'teal'];
      const randomColor = colors[Math.floor(Math.random() * colors.length)];
      const newCommentObj = {
        id: comments.length + 1,
        author: 'You',
        avatar: 'Y',
        time: 'just now',
        content: newComment.trim(),
        color: randomColor
      };
      
      setComments([...comments, newCommentObj]);
      setNewComment('');
      
      // Scroll to the new comment
      setTimeout(() => {
        const commentsSection = document.getElementById('comments');
        if (commentsSection) {
          commentsSection.scrollIntoView({ behavior: 'smooth', block: 'end' });
        }
      }, 100);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
      handlePostComment();
    }
  };

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <button 
            onClick={handlePreviousProblem}
            disabled={currentProblemIndex === 0}
            className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>{currentProblemIndex > 0 ? problems[currentProblemIndex - 1].name : 'Previous'}</span>
          </button>
          <button 
            onClick={handleNextProblem}
            disabled={currentProblemIndex === problems.length - 1}
            className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105"
          >
            <span>{currentProblemIndex < problems.length - 1 ? problems[currentProblemIndex + 1].name : 'Next'}</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
        
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Sort Colors
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Two Pointers • Medium • 15 min read
        </p>
      </div>

      {/* Problem Description */}
      <section id="problem-description" className="mb-12">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-8">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
            Problem Description
          </h2>
          
          <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
            Given an array <code className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded text-sm">nums</code> with 
            <code className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded text-sm mx-1">n</code> objects colored red, white, or blue, 
            sort them in-place so that objects of the same color are adjacent, with the colors in the order red, white, and blue.
          </p>
          
          <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
            We will use the integers <code className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded text-sm">0</code>, 
            <code className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded text-sm mx-1">1</code>, and 
            <code className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded text-sm mx-1">2</code> to represent the color red, white, and blue, respectively.
          </p>
          
          <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-6 mb-6">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Example:</h3>
            <div className="space-y-3 font-mono text-sm">
              <div>
                <span className="text-gray-600 dark:text-gray-400">Input:</span>
                <span className="ml-2 text-gray-900 dark:text-white">nums = [2,0,2,1,1,0]</span>
              </div>
              <div>
                <span className="text-gray-600 dark:text-gray-400">Output:</span>
                <span className="ml-2 text-gray-900 dark:text-white">[0,0,1,1,2,2]</span>
              </div>
            </div>
          </div>
          
          <div className="border-l-4 border-orange-500 pl-4">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              <strong>Follow up:</strong> Could you come up with a one-pass algorithm using only constant extra space?
            </p>
          </div>
        </div>
      </section>

      {/* Code Editor */}
      <section id="code-editor" className="mb-12">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
          <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              Solution
            </h2>
          </div>
          <CodeEditor />
        </div>
      </section>

      {/* Explanation */}
      <section id="explanation" className="mb-12">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-8">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
            Explanation
          </h2>
          
          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Dutch National Flag Algorithm
              </h3>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                This problem can be solved efficiently using the Dutch National Flag algorithm, which uses three pointers 
                to partition the array in a single pass.
              </p>
              
              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6">
                <h4 className="font-semibold text-blue-900 dark:text-blue-300 mb-3">
                  Key Insight
                </h4>
                <p className="text-blue-800 dark:text-blue-200 text-sm leading-relaxed">
                  We maintain three regions: processed 0s, unprocessed elements, and processed 2s. 
                  The unprocessed region shrinks as we iterate through the array.
                </p>
              </div>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Algorithm Steps
              </h3>
              <ol className="list-decimal list-inside space-y-3 text-gray-700 dark:text-gray-300">
                <li>Initialize three pointers: <code className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded text-sm">left = 0</code>, <code className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded text-sm">curr = 0</code>, <code className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded text-sm">right = n-1</code></li>
                <li>While <code className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded text-sm">curr ≤ right</code>:</li>
                <li className="ml-6">If <code className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded text-sm">nums[curr] = 0</code>: swap with <code className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded text-sm">nums[left]</code> and increment both pointers</li>
                <li className="ml-6">If <code className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded text-sm">nums[curr] = 1</code>: just increment <code className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded text-sm">curr</code></li>
                <li className="ml-6">If <code className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded text-sm">nums[curr] = 2</code>: swap with <code className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded text-sm">nums[right]</code> and decrement <code className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded text-sm">right</code></li>
              </ol>
            </div>
          </div>
        </div>
      </section>

      {/* Final Solution */}
      <section id="solution" className="mb-12">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-8">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
            Complexity Analysis
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-6">
              <h3 className="font-semibold text-green-900 dark:text-green-300 mb-2">
                Time Complexity
              </h3>
              <p className="text-green-800 dark:text-green-200 text-sm">
                <code className="bg-green-100 dark:bg-green-800 px-2 py-1 rounded">O(n)</code> - Single pass through the array
              </p>
            </div>
            
            <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-6">
              <h3 className="font-semibold text-purple-900 dark:text-purple-300 mb-2">
                Space Complexity
              </h3>
              <p className="text-purple-800 dark:text-purple-200 text-sm">
                <code className="bg-purple-100 dark:bg-purple-800 px-2 py-1 rounded">O(1)</code> - Only constant extra space
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Comments */}
      <section id="comments" className="mb-12">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-8">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
            Discussion ({comments.length})
          </h2>
          
          <div className="space-y-6 mb-8">
            {comments.map((comment) => (
              <div key={comment.id} className={`border-l-4 border-${comment.color}-500 pl-6`}>
                <div className="flex items-center space-x-3 mb-2">
                  <div className={`w-8 h-8 bg-${comment.color}-600 rounded-full flex items-center justify-center text-white text-sm font-medium`}>
                    {comment.avatar}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">{comment.author}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{comment.time}</p>
                  </div>
                </div>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  {comment.content}
                </p>
              </div>
            ))}
          </div>
          
          <div className="pt-6 border-t border-gray-200 dark:border-gray-700">
            <div className="mb-4">
              <label htmlFor="comment" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Add your comment
              </label>
              <textarea
                id="comment"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="Share your thoughts about this solution... (Ctrl/Cmd + Enter to post)"
                className="w-full p-4 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none transition-all duration-200"
                rows={3}
              />
            </div>
            <div className="flex justify-between items-center">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Tip: Use Ctrl/Cmd + Enter to post quickly
              </p>
              <button 
                onClick={handlePostComment}
                disabled={!newComment.trim()}
                className="px-6 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white rounded-lg font-medium transition-all duration-200 hover:scale-105 disabled:hover:scale-100"
              >
                Post Comment
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default MainContent;