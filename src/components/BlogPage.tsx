import React from 'react';
import { Calendar, Clock, User } from 'lucide-react';

const BlogPage: React.FC = () => {
  const blogPosts = [
    {
      id: 1,
      title: 'Mastering the Two Pointers Technique',
      excerpt: 'Learn how to solve array problems efficiently using the two pointers approach. This fundamental technique can help you optimize solutions from O(n²) to O(n).',
      author: 'Sarah Chen',
      date: '2024-01-15',
      readTime: '8 min read',
      category: 'Algorithms',
      image: 'https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=800'
    },
    {
      id: 2,
      title: 'Dynamic Programming: From Beginner to Expert',
      excerpt: 'A comprehensive guide to understanding dynamic programming concepts, patterns, and when to apply them in coding interviews.',
      author: 'Mike Johnson',
      date: '2024-01-12',
      readTime: '12 min read',
      category: 'Dynamic Programming',
      image: 'https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg?auto=compress&cs=tinysrgb&w=800'
    },
    {
      id: 3,
      title: 'Graph Algorithms Every Developer Should Know',
      excerpt: 'Explore essential graph algorithms including BFS, DFS, Dijkstra\'s algorithm, and their real-world applications.',
      author: 'Alex Rodriguez',
      date: '2024-01-10',
      readTime: '10 min read',
      category: 'Graph Theory',
      image: 'https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg?auto=compress&cs=tinysrgb&w=800'
    },
    {
      id: 4,
      title: 'Time and Space Complexity Analysis',
      excerpt: 'Master Big O notation and learn how to analyze the efficiency of your algorithms. Essential knowledge for technical interviews.',
      author: 'Emily Davis',
      date: '2024-01-08',
      readTime: '6 min read',
      category: 'Fundamentals',
      image: 'https://images.pexels.com/photos/1181298/pexels-photo-1181298.jpeg?auto=compress&cs=tinysrgb&w=800'
    },
    {
      id: 5,
      title: 'Binary Search: Beyond the Basics',
      excerpt: 'Discover advanced binary search patterns and how to apply them to solve complex problems efficiently.',
      author: 'David Kim',
      date: '2024-01-05',
      readTime: '9 min read',
      category: 'Search Algorithms',
      image: 'https://images.pexels.com/photos/1181316/pexels-photo-1181316.jpeg?auto=compress&cs=tinysrgb&w=800'
    },
    {
      id: 6,
      title: 'Preparing for Technical Interviews',
      excerpt: 'A complete guide to acing your technical interviews, including what to study, how to practice, and common mistakes to avoid.',
      author: 'Lisa Wang',
      date: '2024-01-03',
      readTime: '15 min read',
      category: 'Interview Prep',
      image: 'https://images.pexels.com/photos/1181345/pexels-photo-1181345.jpeg?auto=compress&cs=tinysrgb&w=800'
    }
  ];

  const categories = ['All', 'Algorithms', 'Dynamic Programming', 'Graph Theory', 'Fundamentals', 'Search Algorithms', 'Interview Prep'];
  const [selectedCategory, setSelectedCategory] = React.useState('All');

  const filteredPosts = selectedCategory === 'All' 
    ? blogPosts 
    : blogPosts.filter(post => post.category === selectedCategory);

  const handlePostClick = (postId: number) => {
    alert(`Opening blog post #${postId}...\n\nThis would normally navigate to the full blog post.`);
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          DSA Learning Blog
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Insights, tutorials, and tips to help you master data structures and algorithms.
        </p>
      </div>

      {/* Category Filter */}
      <div className="mb-8">
        <div className="flex flex-wrap gap-2">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                selectedCategory === category
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Featured Post */}
      {selectedCategory === 'All' && (
        <div className="mb-12">
          <div 
            onClick={() => handlePostClick(blogPosts[0].id)}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden cursor-pointer hover:shadow-xl transition-all duration-200 hover:scale-[1.02]"
          >
            <div className="md:flex">
              <div className="md:w-1/2">
                <img 
                  src={blogPosts[0].image} 
                  alt={blogPosts[0].title}
                  className="w-full h-64 md:h-full object-cover"
                />
              </div>
              <div className="md:w-1/2 p-8">
                <div className="flex items-center space-x-4 mb-4">
                  <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-400 rounded-full text-sm font-medium">
                    Featured
                  </span>
                  <span className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm">
                    {blogPosts[0].category}
                  </span>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  {blogPosts[0].title}
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                  {blogPosts[0].excerpt}
                </p>
                <div className="flex items-center space-x-6 text-sm text-gray-500 dark:text-gray-400">
                  <div className="flex items-center space-x-2">
                    <User className="w-4 h-4" />
                    <span>{blogPosts[0].author}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4" />
                    <span>{new Date(blogPosts[0].date).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4" />
                    <span>{blogPosts[0].readTime}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Blog Posts Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredPosts.slice(selectedCategory === 'All' ? 1 : 0).map(post => (
          <article
            key={post.id}
            onClick={() => handlePostClick(post.id)}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden cursor-pointer hover:shadow-lg transition-all duration-200 hover:scale-105"
          >
            <img 
              src={post.image} 
              alt={post.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <div className="flex items-center justify-between mb-3">
                <span className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-xs font-medium">
                  {post.category}
                </span>
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  {post.readTime}
                </span>
              </div>
              
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 line-clamp-2">
                {post.title}
              </h3>
              
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-3">
                {post.excerpt}
              </p>
              
              <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                <div className="flex items-center space-x-2">
                  <User className="w-3 h-3" />
                  <span>{post.author}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Calendar className="w-3 h-3" />
                  <span>{new Date(post.date).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>

      {filteredPosts.length === 0 && (
        <div className="text-center py-12">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            No posts found
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            No blog posts match the selected category.
          </p>
        </div>
      )}

      {/* Newsletter Signup */}
      <div className="mt-16 bg-gradient-to-r from-blue-50 to-indigo-100 dark:from-gray-800 dark:to-gray-700 rounded-2xl p-8 text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Stay Updated
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Get the latest DSA tips, tutorials, and problem-solving strategies delivered to your inbox.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
          <input
            type="email"
            placeholder="Enter your email"
            className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <button 
            onClick={() => alert('Newsletter signup coming soon! 📧')}
            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-all duration-200 hover:scale-105"
          >
            Subscribe
          </button>
        </div>
      </div>
    </div>
  );
};

export default BlogPage;