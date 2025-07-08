import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Map, TrendingUp, Activity, BarChart3 } from 'lucide-react';
import ConstituencyMap from './visualizations/ConstituencyMap';
import HistoricalPerformance from './visualizations/HistoricalPerformance';
import TurnoutHeatmap from './visualizations/TurnoutHeatmap';
import CloseContests from './visualizations/CloseContests';

const VisualizationSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState('map');

  const tabs = [
    { id: 'map', label: 'Constituency Map', icon: Map, description: 'Interactive choropleth showing 2019 election results' },
    { id: 'performance', label: 'Historical Performance', icon: TrendingUp, description: 'Long-term trends for major political parties' },
    { id: 'turnout', label: 'Voter Turnout', icon: Activity, description: 'Participation levels across regions' },
    { id: 'contests', label: 'Close Contests', icon: BarChart3, description: 'Razor-thin victory margins' }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const renderVisualization = () => {
    switch (activeTab) {
      case 'map':
        return <ConstituencyMap />;
      case 'performance':
        return <HistoricalPerformance />;
      case 'turnout':
        return <TurnoutHeatmap />;
      case 'contests':
        return <CloseContests />;
      default:
        return <ConstituencyMap />;
    }
  };

  return (
    <section id="visualizations" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.div variants={itemVariants} className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-parliament mb-6">
              Interactive Data Visualizations
            </h2>
            <div className="w-24 h-1 bg-saffron mx-auto mb-6" />
            <p className="text-lg text-gray-700 max-w-3xl mx-auto">
              Each chart is designed for clarity, deep-dive exploration, and an immersive 
              understanding of the electoral landscape.
            </p>
          </motion.div>

          {/* Tab Navigation */}
          <motion.div variants={itemVariants} className="mb-8">
            <div className="flex flex-wrap justify-center gap-2 mb-8">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                    activeTab === tab.id
                      ? 'bg-parliament text-white shadow-lg'
                      : 'bg-white text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <tab.icon size={18} />
                  <span>{tab.label}</span>
                </button>
              ))}
            </div>
            
            {/* Active Tab Description */}
            <div className="text-center">
              <p className="text-gray-600 max-w-2xl mx-auto">
                {tabs.find(tab => tab.id === activeTab)?.description}
              </p>
            </div>
          </motion.div>

          {/* Visualization Container */}
          <motion.div
            variants={itemVariants}
            className="chart-container p-6 min-h-[600px]"
          >
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="h-full"
            >
              {renderVisualization()}
            </motion.div>
          </motion.div>

          {/* Interactivity Guide */}
          <motion.div variants={itemVariants} className="mt-8">
            <div className="bg-blue-50 rounded-xl p-6 max-w-4xl mx-auto">
              <h3 className="text-lg font-semibold text-parliament mb-4 text-center">
                💡 Interactivity Guide
              </h3>
              <div className="grid md:grid-cols-3 gap-4 text-sm text-gray-700">
                <div className="text-center">
                  <div className="font-medium mb-2">🖱️ Hover</div>
                  <p>Reveal detailed data points and insights</p>
                </div>
                <div className="text-center">
                  <div className="font-medium mb-2">🔍 Zoom & Pan</div>
                  <p>Navigate maps and charts for closer examination</p>
                </div>
                <div className="text-center">
                  <div className="font-medium mb-2">🎛️ Filter</div>
                  <p>Customize views by state, party, or time period</p>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default VisualizationSection;