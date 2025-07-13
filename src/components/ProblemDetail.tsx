import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { getProblemBySlug, getNextProblem, getPreviousProblem } from '../data/problems';
import CodeEditor from './CodeEditor';
import RightSidebar from './RightSidebar';

const ProblemDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [activeSection, setActiveSection] = useState('');
  const [newComment, setNewComment] = useState('');
  const [comments, setComments] = useState([
    {
      id: 1,
      author: 'Alice Chen',
      avatar: 'A',
      time: '2 hours ago',
      content: 'Great explanation! The algorithm is so elegant. I initially tried a different approach but this solution is much more efficient.',
      color: 'blue'
    },
    {
      id: 2,
      author: 'Bob Martinez',
      avatar: 'B',
      time: '5 hours ago',
      content: 'The key insight about the algorithm really helped me understand it. Thanks for the clear walkthrough!',
      color: 'green'
    }
  ]);

  const problem = slug ? getProblemBySlug(slug) : null;
  const nextProblem = slug ? getNextProblem(slug) : null;
  const previousProblem = slug ? getPreviousProblem(slug) : null;

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['problem-description', 'code-editor', 'explanation', 'solution', 'comments'];
      const currentSection = sections.find(id => {
        const element = document.getElementById(id);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 150 && rect.bottom >= 150;
        }
        return false;
      });
      
      if (currentSection && currentSection !== activeSection) {
        setActiveSection(currentSection);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [activeSection]);

  // Reset scroll position when problem changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

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

  if (!problem) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Problem Not Found
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            The problem you're looking for doesn't exist.
          </p>
          <Link 
            to="/problems"
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
          >
            Browse All Problems
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex">
      <div className="flex-1 min-w-0">
        <div className="max-w-4xl mx-auto px-6 py-8">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              {previousProblem ? (
                <Link 
                  to={`/problem/${previousProblem.slug}`}
                  className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-all duration-200 hover:scale-105"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span className="truncate max-w-[200px]">{previousProblem.title}</span>
                </Link>
              ) : (
                <div className="flex items-center space-x-2 text-gray-400 cursor-not-allowed">
                  <ChevronLeft className="w-4 h-4" />
                  <span>Previous</span>
                </div>
              )}
              
              {nextProblem ? (
                <Link 
                  to={`/problem/${nextProblem.slug}`}
                  className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-all duration-200 hover:scale-105"
                >
                  <span className="truncate max-w-[200px]">{nextProblem.title}</span>
                  <ChevronRight className="w-4 h-4" />
                </Link>
              ) : (
                <div className="flex items-center space-x-2 text-gray-400 cursor-not-allowed">
                  <span>Next</span>
                  <ChevronRight className="w-4 h-4" />
                </div>
              )}
            </div>
            
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              {problem.title}
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              {problem.category} • {problem.difficulty} • 15 min read
            </p>
          </div>

          {/* Problem Description */}
          <section id="problem-description" className="mb-12">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
                Problem Description
              </h2>
              
              <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                {problem.description}
              </p>
              
              <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-6 mb-6">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Example:</h3>
                <div className="space-y-3 font-mono text-sm">
                  <div>
                    <span className="text-gray-600 dark:text-gray-400">Input:</span>
                    <span className="ml-2 text-gray-900 dark:text-white">{problem.example.input}</span>
                  </div>
                  <div>
                    <span className="text-gray-600 dark:text-gray-400">Output:</span>
                    <span className="ml-2 text-gray-900 dark:text-white">{problem.example.output}</span>
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
              <CodeEditor code={problem.code} />
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
                    {problem.explanation.title}
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                    {problem.explanation.content}
                  </p>
                  
                  <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6">
                    <h4 className="font-semibold text-blue-900 dark:text-blue-300 mb-3">
                      Key Insight
                    </h4>
                    <p className="text-blue-800 dark:text-blue-200 text-sm leading-relaxed">
                      {problem.explanation.keyInsight}
                    </p>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                    Algorithm Steps
                  </h3>
                  <ol className="list-decimal list-inside space-y-3 text-gray-700 dark:text-gray-300">
                    {problem.explanation.steps.map((step, index) => (
                      <li key={index} className="leading-relaxed">
                        {step}
                      </li>
                    ))}
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
                  <p className="text-green-800 dark:text-green-200 text-sm mb-2">
                    <code className="bg-green-100 dark:bg-green-800 px-2 py-1 rounded">{problem.complexity.time}</code>
                  </p>
                  <p className="text-green-700 dark:text-green-300 text-xs">
                    {problem.complexity.timeDescription}
                  </p>
                </div>
                
                <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-6">
                  <h3 className="font-semibold text-purple-900 dark:text-purple-300 mb-2">
                    Space Complexity
                  </h3>
                  <p className="text-purple-800 dark:text-purple-200 text-sm mb-2">
                    <code className="bg-purple-100 dark:bg-purple-800 px-2 py-1 rounded">{problem.complexity.space}</code>
                  </p>
                  <p className="text-purple-700 dark:text-purple-300 text-xs">
                    {problem.complexity.spaceDescription}
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
      </div>
      <RightSidebar activeSection={activeSection} />
    </div>
  );
};

export default ProblemDetail;