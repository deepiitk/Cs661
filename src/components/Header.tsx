import React from 'react';
import { motion } from 'framer-motion';
import { Github, BarChart3, Map, TrendingUp } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="bg-white shadow-lg sticky top-0 z-40"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full india-gradient flex items-center justify-center">
              <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center">
                <div className="w-3 h-3 rounded-full bg-navy"></div>
              </div>
            </div>
            <div>
              <h1 className="text-xl font-bold text-parliament">Indian Elections</h1>
              <p className="text-sm text-gray-600">Data-Driven Democracy</p>
            </div>
          </div>
          
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#map" className="flex items-center space-x-2 text-gray-700 hover:text-parliament transition-colors">
              <Map size={18} />
              <span>Constituency Map</span>
            </a>
            <a href="#performance" className="flex items-center space-x-2 text-gray-700 hover:text-parliament transition-colors">
              <TrendingUp size={18} />
              <span>Performance</span>
            </a>
            <a href="#analysis" className="flex items-center space-x-2 text-gray-700 hover:text-parliament transition-colors">
              <BarChart3 size={18} />
              <span>Analysis</span>
            </a>
            <a
              href="https://github.com/your-repo/indian-elections-analysis"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 bg-parliament text-white px-4 py-2 rounded-full hover:bg-opacity-90 transition-all"
            >
              <Github size={18} />
              <span>GitHub</span>
            </a>
          </nav>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;