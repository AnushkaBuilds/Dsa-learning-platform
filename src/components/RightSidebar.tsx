import React from 'react';

interface RightSidebarProps {
  activeSection: string;
}

const sections = [
  { id: 'problem-description', label: 'Problem Description' },
  { id: 'code-editor', label: 'Solution' },
  { id: 'explanation', label: 'Explanation' },
  { id: 'solution', label: 'Complexity' },
  { id: 'comments', label: 'Discussion' },
];

const RightSidebar: React.FC<RightSidebarProps> = ({ activeSection }) => {
  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    });
  };

  return (
    <aside className="hidden xl:block w-64 ml-8">
      <div className="sticky top-24">
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-xl border border-gray-200 dark:border-gray-700 p-6">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
            On This Page
          </h3>
          
          <nav className="space-y-2">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => scrollToSection(section.id)}
                className={`
                  w-full text-left px-3 py-2 rounded-lg text-sm transition-all duration-200
                  ${activeSection === section.id
                    ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 border-l-2 border-blue-500'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-700'
                  }
                `}
              >
                {section.label}
              </button>
            ))}
          </nav>
          
          <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
            <div className="text-xs text-gray-500 dark:text-gray-400 space-y-1">
              <p>Progress: 1/24 problems</p>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div className="bg-blue-600 h-2 rounded-full" style={{ width: '4%' }} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default RightSidebar;