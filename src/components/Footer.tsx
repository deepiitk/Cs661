import React from 'react';
import { motion } from 'framer-motion';
import { Github, Mail, Twitter, Linkedin, Heart } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-parliament text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 rounded-full india-gradient flex items-center justify-center">
                <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center">
                  <div className="w-3 h-3 rounded-full bg-navy"></div>
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold">Indian Elections Analytics</h3>
                <p className="text-gray-300 text-sm">Data-Driven Democracy</p>
              </div>
            </div>
            <p className="text-gray-300 mb-4 max-w-md">
              Empowering citizens with transparent, accessible election data and insights. 
              Our mission is to strengthen democratic participation through data literacy.
            </p>
            <div className="flex space-x-4">
              <motion.a
                href="https://github.com/your-repo/indian-elections-analysis"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-white bg-opacity-10 rounded-full hover:bg-opacity-20 transition-all"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Github size={20} />
              </motion.a>
              <motion.a
                href="mailto:contact@indianelections.com"
                className="p-2 bg-white bg-opacity-10 rounded-full hover:bg-opacity-20 transition-all"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Mail size={20} />
              </motion.a>
              <motion.a
                href="https://twitter.com/indianelections"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-white bg-opacity-10 rounded-full hover:bg-opacity-20 transition-all"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Twitter size={20} />
              </motion.a>
              <motion.a
                href="https://linkedin.com/company/indianelections"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-white bg-opacity-10 rounded-full hover:bg-opacity-20 transition-all"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Linkedin size={20} />
              </motion.a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-gray-300">
              <li><a href="#map" className="hover:text-white transition-colors">Constituency Map</a></li>
              <li><a href="#performance" className="hover:text-white transition-colors">Historical Data</a></li>
              <li><a href="#analysis" className="hover:text-white transition-colors">Analysis</a></li>
              <li><a href="#methodology" className="hover:text-white transition-colors">Methodology</a></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-semibold mb-4">Resources</h4>
            <ul className="space-y-2 text-gray-300">
              <li><a href="https://github.com/your-repo" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Source Code</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Raw Data</a></li>
              <li><a href="#" className="hover:text-white transition-colors">API Documentation</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Research Papers</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-600 mt-8 pt-8 text-center">
          <p className="text-gray-300 flex items-center justify-center space-x-2">
            <span>Made with</span>
            <Heart size={16} className="text-red-400" />
            <span>for Indian Democracy</span>
          </p>
          <p className="text-gray-400 text-sm mt-2">
            © 2024 Indian Elections Analytics. Data sourced from Election Commission of India.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;