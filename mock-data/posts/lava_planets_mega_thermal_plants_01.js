const mock_data = {
  id: 'd5e6f7a8-1b2c-4d3e-9f0a-1b2c3d4e5f6a',
  author: 'Fiona Wilson',
  createdAt: '2025-05-21T08:00:00.000Z',
  content: `
**Harnessing Volcanic Power on Vulcanis Prime: Mega-Thermal Plants**

Building on our habitat discussions, here’s a proposal for **orbital-fed geothermal power stations** anchored above active lava fields:

- **Supercritical steam turbines** (650–800 °C, 100 bar) housed in reinforced containment domes  
- **Magmatic heat exchangers** drilled 2 km into basalt flows, using ceramic–superalloy piping  
- **Dynamic pressure conversion**: pulsating chambers convert oscillating pressures from episodic eruptions into mechanical work  
- **Thermoelectric arrays** on plume capture shields to reclaim waste heat (efficiency ~7 % in current tests)  
- **Power transmission** via superconducting cables along tethers to orbital ring converters  

Key goals:  
1. Sustain 5 GW continuous output per plant  
2. Buffer peaks with molten-salt storage at 900 °C  
3. Integrate with habitat coolant loops for co-generation  

Concerns: material creep under cyclic heat, plume particulate erosion, and emergency shutdown protocols for sudden quakes. Thoughts on improving reactor cycle stability?
  `,
  comments: [
    {
      id: 'e6f7a8b9-2c3d-4e5f-0a1b-2c3d4e5f6a7b',
      author: 'Bob Smith',
      createdAt: '2025-05-21T09:15:00.000Z',
      content: `
Containment domes need composite liners with ceramic tiles rated for 1200 °C.  
Otherwise, thermal fatigue cracks appear within 2 × 10^(4) cycles.
      `,
      replies: [
        {
          id: 'f7a8b9c0-3d4e-5f6a-1b2c-3d4e5f6a7b8c',
          author: 'Fiona Wilson',
          createdAt: '2025-05-21T10:00:00.000Z',
          content: `
Good call. I’ll specify hexagonal tile arrays with active water-cooling channels behind them.  
That should limit surface temps to <800 °C.
          `,
          replies: [
            {
              id: 'a8b9c0d1-4e5f-6a7b-2c3d-4e5f6a7b8c9d',
              author: 'Bob Smith',
              createdAt: '2025-05-21T10:45:00.000Z',
              content: `
Also consider adding a sacrificial outer tile layer—easier to replace after particulate erosion.  
Swap interval: every 1,000 operating hours.
              `,
            },
          ],
        },
      ],
    },
    {
      id: 'b9c0d1e2-5f6a-7b8c-3d4e-5f6a7b8c9d0e',
      author: 'Charlie Brown',
      createdAt: '2025-05-21T11:30:00.000Z',
      content: `
Pulse chambers sound neat, but eruption frequency is irregular.  
Maybe use a **dual-mode**: fallback to steady steam extraction when pulses miss.
      `,
      replies: [
        {
          id: 'c0d1e2f3-6a7b-8c9d-4e5f-6a7b8c9d0e1f',
          author: 'Fiona Wilson',
          createdAt: '2025-05-21T12:15:00.000Z',
          content: `
Agreed. A hybrid cycle with constant-flow bypass valves can maintain 2 GW baseline.  
Pulse boosts to 5 GW for up to 10 min post-eruption.
          `,
          replies: [
            {
              id: 'd1e2f3a4-7b8c-9d0e-5f6a-7b8c9d0e1f2a',
              author: 'Charlie Brown',
              createdAt: '2025-05-21T13:00:00.000Z',
              content: `
Sounds robust. Just ensure bypass valves use **magnetorheological fluids** to handle >100 bar quickly.
              `,
            },
          ],
        },
      ],
    },
    {
      id: 'e2f3a4b5-8c9d-0e1f-6a7b-8c9d0e1f2a3b',
      author: 'Alice Johnson',
      createdAt: '2025-05-21T14:20:00.000Z',
      content: `
Logistics for molten-salt refill will clash with ore shipments—recommend a **dedicated tugline** and thermal shielded containers.  
_Sarcastic aside_: nothing says “romantic sunset” like a 900 °C salt tanker.
      `,
      replies: [
        {
          id: 'f3a4b5c6-9d0e-1f2a-7b8c-9d0e1f2a3b4c',
          author: 'Bob Smith',
          createdAt: '2025-05-21T15:00:00.000Z',
          content: `
Tugline idea is solid. Use **ceramic-coated tether segments** and active coolant flow within the line.  
That preserves salt at 850–900 °C en route.
          `,
        },
      ],
    },
    {
      id: 'a4b5c6d7-0e1f-2a3b-8c9d-0e1f2a3b4c5d',
      author: 'Fiona Wilson',
      createdAt: '2025-05-22T06:45:00.000Z',
      content: `
One last thought: superconducting cables lose efficiency at high radiation—consider embedding them within cooled regolith jackets.  
Could cut resistive losses by ~40 %.
      `,
    },
  ],
}
