import pandas as pd
import geopandas as gpd
import numpy as np
from dash import Dash, dcc, html, Input, Output
import plotly.express as px
import plotly.graph_objects as go
from plotly.subplots import make_subplots

# === Load data ===
df_hist = pd.read_csv(r'D:\Summer term\CS661\election-dashboard\data\Loksabha_1962-2019 .csv')
geo = gpd.read_file(r'D:\Summer term\CS661\election-dashboard\data\india_pc_2019_simplified.geojson')

# === Clean and Preprocess ===
df_hist['party'] = df_hist['party'].astype(str).str.strip().str.title()  # Title case to match original names

# ✅ Add this mapping for party names
party_map = {
    'Bharatiya Janata Party': 'BJP',
    'Indian National Congress': 'INC',
    'Bahujan Samaj Party': 'BSP',
    'Aam Aadmi Party': 'AAP',
    'Communist Party Of India (Marxist)': 'CPM',
    'All India Trinamool Congress': 'TMC',
    'Janata Dal (United)': 'JDU',
    'Samajwadi Party': 'SP'
}
df_hist['party'] = df_hist['party'].replace(party_map)

df_hist['year'] = pd.to_numeric(df_hist['year'], errors='coerce')

# Clean & convert turnout, votes, electors
df_hist['Turnout'] = pd.to_numeric(df_hist['Turnout'].astype(str).str.replace('%', '', regex=False), errors='coerce')
df_hist['votes'] = pd.to_numeric(df_hist['votes'].astype(str).str.replace(',', '', regex=False), errors='coerce')
df_hist['electors'] = pd.to_numeric(df_hist['electors'].astype(str).str.replace(',', '', regex=False), errors='coerce')

df_hist = df_hist.dropna(subset=['Turnout', 'votes', 'electors'])
df_hist['Turnout'] = (df_hist['votes'] / df_hist['electors']) * 100

# === Regional Dominance ===
df_dom = df_hist.dropna(subset=['state', 'party', 'year'])
dominant = (
    df_dom.groupby(['state', 'year', 'party'])
    .size()
    .reset_index(name='seats')
    .sort_values(['state', 'year', 'seats'], ascending=[True, True, False])
    .drop_duplicates(['state', 'year'])
)
state_party_dominance = (
    dominant.groupby(['state', 'party'])
    .size()
    .reset_index(name='times_dominated')
)

# === Constituency Map (only 2019) ===
df_2019 = df_hist[df_hist['year'] == 2019][['Pc_name', 'party']].drop_duplicates()
df_2019['Pc_name'] = df_2019['Pc_name'].str.strip().str.title()
geo['pc_name'] = geo['pc_name'].str.strip().str.title()
merged_map = geo.merge(df_2019, left_on='pc_name', right_on='Pc_name', how='left')
merged_map['party'] = merged_map['party'].fillna('OTHER')

# === Turnout Heatmap Data ===
turnout_top = df_hist.sort_values(['state', 'year', 'Turnout'], ascending=[True, True, False]) \
                     .groupby(['state', 'year']).head(10)

# === App Layout ===
app = Dash(__name__)
states = sorted(df_hist['state'].dropna().unique())

app.layout = html.Div(style={'fontFamily': 'Arial'}, children=[
    html.H1("Indian General Elections Dashboard", style={'textAlign': 'center', 'color': '#2c3e50'}),
    dcc.Tabs([
        dcc.Tab(label='🗺️ Constituency Map (2019)', children=[
            dcc.Graph(id='map-graph')
        ]),
        dcc.Tab(label='📈 Historical Party Performance', children=[
            dcc.Graph(id='hist-graph')
        ]),
        dcc.Tab(label='📊 Voter Turnout Analysis', children=[
            html.Label("Select State:", style={'padding': '10px'}),
            dcc.Dropdown(id='state-dropdown',
                         options=[{'label': s, 'value': s} for s in states],
                         value=states[0]),
            dcc.Graph(id='turnout-heatmap')
        ]),
        dcc.Tab(label='🏆 Regional Party Dominance', children=[
            dcc.Graph(id='dominance-graph')
        ]),
    ])
])

# === Callbacks ===

@app.callback(
    Output('map-graph', 'figure'),
    Input('map-graph', 'id')
)
def plot_map(_):
    fig = px.choropleth(merged_map,
                        geojson=merged_map.geometry,
                        locations=merged_map.index,
                        color="party",
                        hover_name="pc_name",
                        title="Winning Party by Constituency (2019)",
                        color_discrete_map={
                            'BJP': '#FF9933', 'INC': '#008000', 'BSP': '#0000FF',
                            'AAP': '#00CED1', 'OTHER': '#808080'
                        })
    fig.update_geos(fitbounds="locations", visible=False)
    fig.update_layout(margin={"r": 0, "t": 30, "l": 0, "b": 0})
    return fig

@app.callback(
    Output('hist-graph', 'figure'),
    Input('hist-graph', 'id')
)
def plot_history(_):
    major_parties = ['BJP', 'INC', 'BSP', 'AAP', 'CPM', 'TMC', 'JDU', 'SP']
    grouped = df_hist[df_hist['party'].isin(major_parties)].groupby(['year', 'party']).agg(
        seats=('Pc_name', 'count'),
        total_votes=('votes', 'sum'),
        avg_turnout=('Turnout', 'mean')
    ).reset_index()

    if grouped.empty:
        return go.Figure().update_layout(title="No historical data available.")

    fig = make_subplots(specs=[[{"secondary_y": True}]])
    for party in grouped['party'].unique():
        df_party = grouped[grouped['party'] == party]
        fig.add_trace(go.Scatter(x=df_party['year'], y=df_party['seats'],
                                 mode='lines+markers', name=party),
                      secondary_y=False)

    votes_total = grouped.groupby('year')['total_votes'].sum().reset_index()
    turnout_mean = grouped.groupby('year')['avg_turnout'].mean().reset_index()

    fig.add_trace(go.Scatter(x=votes_total['year'], y=votes_total['total_votes'],
                             mode='lines', name='Total Votes', line=dict(color='black', dash='dot')),
                  secondary_y=True)
    fig.add_trace(go.Scatter(x=turnout_mean['year'], y=turnout_mean['avg_turnout'],
                             mode='lines', name='Avg Turnout', line=dict(color='gray', dash='dash')),
                  secondary_y=True)

    fig.update_layout(title='Historical Performance (1962–2019)',
                      xaxis_title='Year', yaxis_title='Seats Won',
                      yaxis2_title='Votes / Turnout (%)',
                      hovermode='x unified')
    return fig

@app.callback(
    Output('turnout-heatmap', 'figure'),
    Input('state-dropdown', 'value')
)
def plot_heatmap(state):
    df = turnout_top[turnout_top['state'] == state]

    if df.empty:
        return go.Figure().update_layout(
            title="No data available for selected state.",
            xaxis_title="Year", yaxis_title="Constituency"
        )

    df['Pc_name'] = df['Pc_name'].str.strip().str.title()
    pivot = df.pivot_table(index='Pc_name', columns='year', values='Turnout', aggfunc='mean', fill_value=0)
    top_10 = df.groupby('Pc_name')['Turnout'].mean().sort_values(ascending=False).head(10).index
    data = pivot.loc[top_10]

    fig = px.imshow(data,
                    labels=dict(x="Year", y="Constituency", color="Turnout (%)"),
                    title=f"Top 10 Turnout Constituencies in {state}",
                    color_continuous_scale='Viridis')
    fig.update_xaxes(side="top")
    return fig

@app.callback(
    Output('dominance-graph', 'figure'),
    Input('dominance-graph', 'id')
)
def plot_dom_graph(_):
    top = state_party_dominance.sort_values(by='times_dominated', ascending=False).head(25)
    fig = px.bar(top, x='state', y='times_dominated', color='party',
                 title="Most Dominant Parties by State (1962–2019)")
    return fig

# === Run App ===
if __name__ == '__main__':
    app.run(debug=True)
