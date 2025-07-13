import React, { useState } from 'react';
import { ChevronDown, ChevronRight, Circle } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { getProblems } from '../data/problems';

const LeftSidebar: React.FC<{ isOpen: boolean }> = ({ isOpen }) => {
  const { slug } = useParams();
  const problems = getProblems();

  // Dynamically group problems by category
  const categoryMap: { [category: string]: { id: string; name: string; slug: string }[] } = {};
  problems.forEach((p) => {
    if (!categoryMap[p.category]) categoryMap[p.category] = [];
    categoryMap[p.category].push({ id: p.id, name: p.title, slug: p.slug });
  });
  const topics = Object.keys(categoryMap).map((cat) => ({
    id: cat.toLowerCase().replace(/\s+/g, '-'),
    name: cat,
    subtopics: categoryMap[cat],
  }));

  const [expandedTopics, setExpandedTopics] = useState<Set<string>>(
    new Set(topics.map((t) => t.id)) // expand all by default
  );

  const toggleTopic = (topicId: string) => {
    const newExpanded = new Set(expandedTopics);
    if (newExpanded.has(topicId)) {
      newExpanded.delete(topicId);
    } else {
      newExpanded.add(topicId);
    }
    setExpandedTopics(newExpanded);
  };

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" />
      )}
      {/* Sidebar */}
      <aside className={`
        fixed left-0 top-16 h-[calc(100vh-4rem)] bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 z-40
        transition-all duration-300 overflow-y-auto
        ${isOpen ? 'w-80' : 'w-16 lg:block hidden'}
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="p-4">
          {isOpen && (
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                DSA Topics
              </h2>
            </div>
          )}
          <nav className="space-y-2">
            {topics.map((topic) => (
              <div key={topic.id}>
                <button
                  onClick={() => toggleTopic(topic.id)}
                  className={`
                    w-full flex items-center space-x-3 px-3 py-2 rounded-lg
                    hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-left
                    ${!isOpen && 'justify-center'}
                  `}
                >
                  {isOpen ? (
                    <>
                      {expandedTopics.has(topic.id) ? (
                        <ChevronDown className="w-4 h-4 text-gray-500" />
                      ) : (
                        <ChevronRight className="w-4 h-4 text-gray-500" />
                      )}
                      <span className="text-gray-700 dark:text-gray-300 font-medium">
                        {topic.name}
                      </span>
                    </>
                  ) : (
                    <Circle className="w-5 h-5 text-gray-500" />
                  )}
                </button>
                {isOpen && expandedTopics.has(topic.id) && (
                  <div className="ml-4 mt-2 space-y-1">
                    {topic.subtopics.map((subtopic) => (
                      <Link
                        key={subtopic.id}
                        to={`/problem/${subtopic.slug}`}
                        className={`
                          flex items-center space-x-3 px-3 py-2 rounded-lg text-sm
                          hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-200
                          ${subtopic.slug === slug
                            ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 border-l-2 border-blue-500' 
                            : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                          }
                        `}
                      >
                        <div className={`w-2 h-2 rounded-full ${
                          subtopic.slug === slug
                            ? 'bg-blue-500'
                            : 'bg-gray-300 dark:bg-gray-600'
                        }`} />
                        <span className="truncate">{subtopic.name}</span>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>
          {isOpen && (
            <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
              <div className="text-xs text-gray-500 dark:text-gray-400 space-y-2">
                <div className="flex justify-between">
                  <span>Progress</span>
                  <span>1/{problems.length} problems</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full transition-all duration-300" 
                    style={{ width: `${(1 / problems.length) * 100}%` }} 
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </aside>
    </>
  );
};

export default LeftSidebar;