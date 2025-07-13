import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TopNavigation from './components/TopNavigation';
import LeftSidebar from './components/LeftSidebar';
import ProblemDetail from './components/ProblemDetail';
import HomePage from './components/HomePage';
import ProblemsPage from './components/ProblemsPage';
import PricingPage from './components/PricingPage';
import BlogPage from './components/BlogPage';
import { ThemeProvider } from './contexts/ThemeContext';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <ThemeProvider>
      <Router>
        <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-200">
          <TopNavigation 
            sidebarOpen={sidebarOpen}
            setSidebarOpen={setSidebarOpen}
          />
          
          <div className="flex">
            <LeftSidebar isOpen={sidebarOpen} />
            
            <main className={`flex-1 transition-all duration-300 ${
              sidebarOpen ? 'lg:ml-80' : 'lg:ml-16'
            }`}>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/problems" element={<ProblemsPage />} />
                <Route path="/pricing" element={<PricingPage />} />
                <Route path="/blog" element={<BlogPage />} />
                <Route path="/problem/:slug" element={<ProblemDetail />} />
              </Routes>
            </main>
          </div>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;