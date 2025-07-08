import React, { useEffect, useState } from 'react';
import Plot from 'react-plotly.js';
import { motion } from 'framer-motion';

const ConstituencyMap: React.FC = () => {
  const [mapData, setMapData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Mock data - replace with actual data loading
  useEffect(() => {
    // Simulate data loading
    setTimeout(() => {
      const mockData = {
        type: 'choropleth',
        locationmode: 'geojson-id',
        z: [1, 2, 3, 1, 2, 1, 3, 2, 1, 3], // Party codes
        locations: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
        text: [
          'Constituency A - BJP Won',
          'Constituency B - INC Won',
          'Constituency C - AAP Won',
          'Constituency D - BJP Won',
          'Constituency E - INC Won',
          'Constituency F - BJP Won',
          'Constituency G - AAP Won',
          'Constituency H - INC Won',
          'Constituency I - BJP Won',
          'Constituency J - AAP Won'
        ],
        hovertemplate: '<b>%{text}</b><br>Vote Share: %{customdata}%<extra></extra>',
        customdata: [45.2, 38.7, 42.1, 48.9, 41.3, 46.8, 39.5, 44.2, 47.1, 40.8],
        colorscale: [
          [0, '#FF9933'], // BJP - Saffron
          [0.33, '#008000'], // INC - Green
          [0.66, '#00CED1'], // AAP - Cyan
          [1, '#808080'] // Others - Gray
        ],
        showscale: false
      };
      setMapData(mockData);
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="w-12 h-12 border-4 border-parliament border-t-transparent rounded-full"
        />
      </div>
    );
  }

  return (
    <div className="w-full h-full">
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-parliament mb-2">
          🗺️ Constituency Map (2019 Elections)
        </h3>
        <p className="text-gray-600">
          Begin your journey with our interactive Constituency Map, providing a granular view 
          of election outcomes across India. Each constituency is color-coded by winning party.
        </p>
      </div>

      <div className="bg-white rounded-lg p-4 shadow-sm">
        <Plot
          data={[mapData]}
          layout={{
            title: {
              text: 'Winning Party by Constituency (2019)',
              font: { size: 18, color: '#2c3e50' }
            },
            geo: {
              scope: 'asia',
              showland: true,
              landcolor: 'rgb(243, 243, 243)',
              coastlinecolor: 'rgb(204, 204, 204)',
              projection: { type: 'mercator' },
              lonaxis: { range: [68, 97] },
              lataxis: { range: [6, 38] }
            },
            margin: { t: 50, r: 0, b: 0, l: 0 },
            height: 500
          }}
          config={{
            displayModeBar: true,
            displaylogo: false,
            modeBarButtonsToRemove: ['pan2d', 'lasso2d', 'select2d']
          }}
          className="w-full"
        />
      </div>

      <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-saffron rounded"></div>
          <span>BJP</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-green rounded"></div>
          <span>INC</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-cyan-400 rounded"></div>
          <span>AAP</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-gray-500 rounded"></div>
          <span>Others</span>
        </div>
      </div>
    </div>
  );
};

export default ConstituencyMap;