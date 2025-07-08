import React, { useState } from 'react';
import Plot from 'react-plotly.js';

const CloseContests: React.FC = () => {
  const [marginThreshold, setMarginThreshold] = useState(5000);

  // Mock data for close contests
  const closeContests = [
    { constituency: 'Chandni Chowk', winner: 'BJP', margin: 1234, state: 'Delhi' },
    { constituency: 'Patan', winner: 'INC', margin: 1542, state: 'Gujarat' },
    { constituency: 'Indore', winner: 'BJP', margin: 2187, state: 'Madhya Pradesh' },
    { constituency: 'Thiruvananthapuram', winner: 'INC', margin: 2456, state: 'Kerala' },
    { constituency: 'Amethi', winner: 'BJP', margin: 2789, state: 'Uttar Pradesh' },
    { constituency: 'Wayanad', winner: 'INC', margin: 3234, state: 'Kerala' },
    { constituency: 'Gandhinagar', winner: 'BJP', margin: 3567, state: 'Gujarat' },
    { constituency: 'Mumbai North', winner: 'BJP', margin: 4123, state: 'Maharashtra' },
    { constituency: 'Kolkata North', winner: 'TMC', margin: 4456, state: 'West Bengal' },
    { constituency: 'Chennai Central', winner: 'DMK', margin: 4789, state: 'Tamil Nadu' }
  ].filter(contest => contest.margin <= marginThreshold);

  const partyColors: { [key: string]: string } = {
    'BJP': '#FF9933',
    'INC': '#008000',
    'TMC': '#00CED1',
    'DMK': '#FF0000',
    'AAP': '#00CED1'
  };

  const plotData = {
    y: closeContests.map(c => c.constituency),
    x: closeContests.map(c => c.margin),
    type: 'bar' as const,
    orientation: 'h' as const,
    marker: {
      color: closeContests.map(c => partyColors[c.winner] || '#808080')
    },
    text: closeContests.map(c => `${c.winner} (+${c.margin.toLocaleString()})`),
    textposition: 'outside' as const,
    hovertemplate: '<b>%{y}</b><br>Winner: %{text}<br>Margin: %{x:,} votes<extra></extra>'
  };

  return (
    <div className="w-full h-full">
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-parliament mb-2">
          ⚔️ Close Contest Analysis
        </h3>
        <p className="text-gray-600 mb-4">
          Experience the tension with our Close Contest Bar Graph, highlighting constituencies 
          where the margin of victory was razor-thin.
        </p>
        
        <div className="flex items-center space-x-4">
          <label className="font-medium text-gray-700">Victory Margin Threshold:</label>
          <select
            value={marginThreshold}
            onChange={(e) => setMarginThreshold(Number(e.target.value))}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-parliament focus:border-transparent"
          >
            <option value={2000}>Under 2,000 votes</option>
            <option value={5000}>Under 5,000 votes</option>
            <option value={10000}>Under 10,000 votes</option>
            <option value={25000}>Under 25,000 votes</option>
          </select>
        </div>
      </div>

      <div className="bg-white rounded-lg p-4 shadow-sm">
        <Plot
          data={[plotData]}
          layout={{
            title: {
              text: `Closest Contests (Margin < ${marginThreshold.toLocaleString()} votes)`,
              font: { size: 18, color: '#2c3e50' }
            },
            xaxis: {
              title: 'Victory Margin (Votes)',
              tickformat: ',d'
            },
            yaxis: {
              title: 'Constituency',
              autorange: 'reversed'
            },
            margin: { t: 50, r: 100, b: 60, l: 150 },
            height: Math.max(400, closeContests.length * 40),
            plot_bgcolor: 'rgba(0,0,0,0)',
            paper_bgcolor: 'rgba(0,0,0,0)',
            showlegend: false
          }}
          config={{
            displayModeBar: true,
            displaylogo: false,
            modeBarButtonsToRemove: ['pan2d', 'lasso2d', 'select2d']
          }}
          className="w-full"
        />
      </div>

      <div className="mt-4 grid md:grid-cols-3 gap-4">
        <div className="bg-red-50 rounded-lg p-4">
          <h4 className="font-semibold text-red-800 mb-2">Nail-biting Finishes:</h4>
          <p className="text-sm text-red-700">
            {closeContests.filter(c => c.margin < 1000).length} constituencies 
            decided by less than 1,000 votes
          </p>
        </div>
        
        <div className="bg-yellow-50 rounded-lg p-4">
          <h4 className="font-semibold text-yellow-800 mb-2">Close Battles:</h4>
          <p className="text-sm text-yellow-700">
            {closeContests.length} total constituencies with margins 
            under {marginThreshold.toLocaleString()} votes
          </p>
        </div>
        
        <div className="bg-blue-50 rounded-lg p-4">
          <h4 className="font-semibold text-blue-800 mb-2">Impact Factor:</h4>
          <p className="text-sm text-blue-700">
            Every vote counts - these results could have changed 
            with minimal vote shifts
          </p>
        </div>
      </div>
    </div>
  );
};

export default CloseContests;