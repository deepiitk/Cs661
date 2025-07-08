import React from 'react';
import { motion } from 'framer-motion';
import { Code, Database, Github, Users, BarChart, MapPin } from 'lucide-react';

const IntroSection: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  const stats = [
    { icon: Users, value: "543", label: "Constituencies" },
    { icon: BarChart, value: "15+", label: "Elections Analyzed" },
    { icon: MapPin, value: "28", label: "States & UTs" },
    { icon: Database, value: "1M+", label: "Data Points" }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.h2
            variants={itemVariants}
            className="text-4xl md:text-5xl font-bold text-parliament mb-6"
          >
            Our Analysis: Unraveling the Mandate
          </motion.h2>
          
          <motion.div
            variants={itemVariants}
            className="w-24 h-1 bg-saffron mx-auto mb-8"
          />
          
          <motion.p
            variants={itemVariants}
            className="text-lg md:text-xl text-gray-700 max-w-4xl mx-auto leading-relaxed mb-12"
          >
            At <strong>Indian Elections Analytics</strong>, we believe in making complex data accessible. 
            Our dedicated team has meticulously analyzed election trends, voter behavior, and constituency 
            insights to bring you a comprehensive overview of the Indian electoral landscape.
          </motion.p>

          {/* Stats Grid */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                className="text-center"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="w-16 h-16 mx-auto mb-4 bg-white rounded-full flex items-center justify-center shadow-lg">
                  <stat.icon className="w-8 h-8 text-parliament" />
                </div>
                <div className="text-3xl font-bold text-parliament mb-2">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>

          {/* Powered by Section */}
          <motion.div
            variants={itemVariants}
            className="bg-white rounded-2xl p-8 shadow-xl max-w-4xl mx-auto"
          >
            <div className="flex items-center justify-center mb-6">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-parliament rounded-full">
                  <Code className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-parliament">Powered by Python & GitHub</h3>
              </div>
            </div>
            
            <p className="text-gray-700 mb-6 leading-relaxed">
              Below, we bring you the heart of our analysis – a series of meticulously crafted, 
              interactive visualizations generated directly from our robust Python code, with the 
              raw data and scripts openly accessible on our GitHub repository.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.a
                href="https://github.com/your-repo/indian-elections-analysis"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-6 py-3 bg-parliament text-white rounded-full hover:bg-opacity-90 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Github className="w-5 h-5 mr-2" />
                Explore the Code & Data on GitHub
              </motion.a>
              
              <motion.button
                className="inline-flex items-center px-6 py-3 border-2 border-parliament text-parliament rounded-full hover:bg-parliament hover:text-white transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Database className="w-5 h-5 mr-2" />
                View Raw Data
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default IntroSection;