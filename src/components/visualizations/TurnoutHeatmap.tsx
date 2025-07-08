import React, { useState } from 'react';
import Plot from 'react-plotly.js';

const TurnoutHeatmap: React.FC = () => {
  const [selectedState, setSelectedState] = useState('Uttar Pradesh');

  const states = [
    'Uttar Pradesh', 'Maharashtra', 'West Bengal', 'Bihar', 'Tamil Nadu',
    'Karnataka', 'Gujarat', 'Rajasthan', 'Odisha', 'Kerala'
  ];

  // Mock data for demonstration
  const generateHeatmapData = (state: string) => {
    const constituencies = [
      'Constituency A', 'Constituency B', 'Constituency C', 'Constituency D',
      'Constituency E', 'Constituency F', 'Constituency G', 'Constituency H',
      'Constituency I', 'Constituency J'
    ];
    
    const years = [2004, 2009, 2014, 2019];
    
    const data = constituencies.map(() => 
      years.map(() => Math.random() * 30 + 50) // Random turnout between 50-80%
    );

    return {
      z: data,
      x: years,
      y: constituencies,
      type: 'heatmap' as const,
      colorscale: 'Viridis',
      hoverongaps: false,
      hovertemplate: '<b>%{y}</b><br>Year: %{x}<br>Turnout: %{z:.1f}%<extra></extra>'
    };
  };

  return (
    <div className="w-full h-full">
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-parliament mb-2">
          🔥 Voter Turnout Heatmap
        </h3>
        <p className="text-gray-600 mb-4">
          Understand the pulse of the electorate with our Voter Turnout Heatmap, 
          illustrating participation levels across different regions.
        </p>
        
        <div className="flex items-center space-x-4">
          <label className="font-medium text-gray-700">Select State:</label>
          <select
            value={selectedState}
            onChange={(e) => setSelectedState(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-parliament focus:border-transparent"
          >
            {states.map(state => (
              <option key={state} value={state}>{state}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="bg-white rounded-lg p-4 shadow-sm">
        <Plot
          data={[generateHeatmapData(selectedState)]}
          layout={{
            title: {
              text: `Top 10 Turnout Constituencies in ${selectedState}`,
              font: { size: 18, color: '#2c3e50' }
            },
            xaxis: {
              title: 'Election Year',
              side: 'top'
            },
            yaxis: {
              title: 'Constituency',
              autorange: 'reversed'
            },
            margin: { t: 80, r: 20, b: 40, l: 150 },
            height: 500,
            plot_bgcolor: 'rgba(0,0,0,0)',
            paper_bgcolor: 'rgba(0,0,0,0)'
          }}
          config={{
            displayModeBar: true,
            displaylogo: false,
            modeBarButtonsToRemove: ['pan2d', 'lasso2d', 'select2d']
          }}
          className="w-full"
        />
      </div>

      <div className="mt-4 grid md:grid-cols-2 gap-4">
        <div className="bg-green-50 rounded-lg p-4">
          <h4 className="font-semibold text-green-800 mb-2">High Turnout Indicators:</h4>
          <ul className="text-sm text-green-700 space-y-1">
            <li>• Strong local leadership</li>
            <li>• Competitive contests</li>
            <li>• Effective voter education</li>
            <li>• Accessible polling stations</li>
          </ul>
        </div>
        
        <div className="bg-orange-50 rounded-lg p-4">
          <h4 className="font-semibold text-orange-800 mb-2">Factors Affecting Turnout:</h4>
          <ul className="text-sm text-orange-700 space-y-1">
            <li>• Weather conditions</li>
            <li>• Urban vs rural dynamics</li>
            <li>• Security concerns</li>
            <li>• Voter apathy in safe seats</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TurnoutHeatmap;