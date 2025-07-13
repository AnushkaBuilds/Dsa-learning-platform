import React from 'react';
import { Link } from 'react-router-dom';
import { Code, BookOpen, Target, Users } from 'lucide-react';

const HomePage: React.FC = () => {
  const featuredProblems = [
    {
      slug: 'sort-colors',
      title: 'Sort Colors',
      category: 'Two Pointers',
      difficulty: 'Medium'
    },
    {
      slug: 'remove-duplicates',
      title: 'Remove Duplicates',
      category: 'Two Pointers',
      difficulty: 'Easy'
    },
    {
      slug: 'longest-substring-without-repeating',
      title: 'Longest Substring',
      category: 'Sliding Window',
      difficulty: 'Medium'
    }
  ];

  const features = [
    {
      icon: Code,
      title: 'Interactive Code Editor',
      description: 'Practice with our built-in code editor with syntax highlighting and instant feedback.'
    },
    {
      icon: BookOpen,
      title: 'Detailed Explanations',
      description: 'Learn with step-by-step explanations and visual diagrams for every problem.'
    },
    {
      icon: Target,
      title: 'Structured Learning',
      description: 'Follow our curated learning paths designed by industry experts.'
    },
    {
      icon: Users,
      title: 'Community Discussion',
      description: 'Engage with other learners and share different approaches to problems.'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 py-20">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Master Data Structures & Algorithms
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
            Learn DSA concepts through interactive problems, detailed explanations, and hands-on coding practice. 
            Perfect for interview preparation and skill development.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/problems"
              className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-all duration-200 hover:scale-105 hover:shadow-lg"
            >
              Start Learning
            </Link>
            <Link 
              to="/problem/sort-colors"
              className="px-8 py-3 border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg font-medium transition-all duration-200 hover:scale-105"
            >
              Try a Problem
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Why Choose DSA Learn?
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Our platform is designed to make learning data structures and algorithms engaging and effective.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center p-6 rounded-xl bg-gray-50 dark:bg-gray-800 hover:shadow-lg transition-all duration-200 hover:scale-105">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Problems */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Featured Problems
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Start with these popular problems to get familiar with our platform.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {featuredProblems.map((problem, index) => (
              <Link
                key={index}
                to={`/problem/${problem.slug}`}
                className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-200 hover:scale-105"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    problem.difficulty === 'Easy' 
                      ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                      : problem.difficulty === 'Medium'
                      ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400'
                      : 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
                  }`}>
                    {problem.difficulty}
                  </span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {problem.category}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {problem.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Click to start solving this problem
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600 dark:bg-blue-700">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Start Your DSA Journey?
          </h2>
          <p className="text-blue-100 mb-8 text-lg">
            Join thousands of developers who have improved their problem-solving skills with our platform.
          </p>
          <Link 
            to="/problems"
            className="px-8 py-3 bg-white text-blue-600 rounded-lg font-medium hover:bg-gray-100 transition-all duration-200 hover:scale-105 hover:shadow-lg"
          >
            Browse All Problems
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;