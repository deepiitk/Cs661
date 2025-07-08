import React from 'react';
import Plot from 'react-plotly.js';

const HistoricalPerformance: React.FC = () => {
  const years = [1962, 1967, 1971, 1977, 1980, 1984, 1989, 1991, 1996, 1998, 1999, 2004, 2009, 2014, 2019];
  
  const partyData = {
    BJP: [14, 35, 22, 2, 2, 2, 85, 120, 161, 182, 182, 138, 116, 282, 303],
    INC: [361, 283, 352, 154, 353, 414, 197, 232, 140, 141, 114, 145, 206, 44, 52],
    BSP: [0, 0, 0, 0, 0, 0, 3, 1, 0, 0, 0, 19, 21, 0, 10],
    CPM: [29, 19, 25, 22, 35, 22, 33, 35, 32, 21, 17, 43, 16, 9, 3]
  };

  const colors = {
    BJP: '#FF9933',
    INC: '#008000',
    BSP: '#0000FF',
    CPM: '#FF0000'
  };

  const traces = Object.entries(partyData).map(([party, seats]) => ({
    x: years,
    y: seats,
    type: 'scatter' as const,
    mode: 'lines+markers' as const,
    name: party,
    line: { color: colors[party as keyof typeof colors], width: 3 },
    marker: { size: 8, color: colors[party as keyof typeof colors] },
    hovertemplate: `<b>${party}</b><br>Year: %{x}<br>Seats: %{y}<extra></extra>`
  }));

  return (
    <div className="w-full h-full">
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-parliament mb-2">
          📈 Historical Party Performance (1962-2019)
        </h3>
        <p className="text-gray-600">
          Delve into the past with our Historical Performance Graph, showcasing long-term trends 
          and shifts for major political parties over successive elections.
        </p>
      </div>

      <div className="bg-white rounded-lg p-4 shadow-sm">
        <Plot
          data={traces}
          layout={{
            title: {
              text: 'Seats Won by Major Parties Over Time',
              font: { size: 18, color: '#2c3e50' }
            },
            xaxis: {
              title: 'Election Year',
              tickmode: 'array',
              tickvals: years,
              tickangle: -45
            },
            yaxis: {
              title: 'Number of Seats Won',
              range: [0, 450]
            },
            hovermode: 'x unified',
            legend: {
              orientation: 'h',
              y: -0.2,
              x: 0.5,
              xanchor: 'center'
            },
            margin: { t: 50, r: 20, b: 80, l: 60 },
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

      <div className="mt-4 bg-blue-50 rounded-lg p-4">
        <h4 className="font-semibold text-parliament mb-2">Key Insights:</h4>
        <ul className="text-sm text-gray-700 space-y-1">
          <li>• BJP's rise from 2 seats (1984) to 303 seats (2019)</li>
          <li>• INC's decline from its peak of 414 seats (1984) to 52 seats (2019)</li>
          <li>• Regional parties gaining prominence in coalition politics</li>
          <li>• Shift from Congress dominance to multi-party competition</li>
        </ul>
      </div>
    </div>
  );
};

export default HistoricalPerformance;