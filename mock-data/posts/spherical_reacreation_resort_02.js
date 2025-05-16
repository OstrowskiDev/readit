const mock_data = {
  id: 'f2a3b4c5-1234-4d5e-9f6a-7b8c9d0e1f2a',
  author: 'Fiona Wilson',
  createdAt: '2025-05-15T05:45:00.000Z',
  content: `
**Exploring Orbital Lakes and Mountain Biomes** 🏞️🛰️

The Recreation Ring’s newest modules simulate alpine and lacustrine environments:

- **Crystal Lake Dome**: a 200-meter freshwater lake with submerged viewing lounges and guided amphibious drones  
- **Orbital Alpine Ridge**: engineered rock formations rising to simulated 2,500 m peaks, with thin-air hiking trails and gravity-controlled climbing walls  
- **Geo-thermally powered hot springs** around the lake perimeter, maintaining 38 °C for year-round comfort  
- **Wildflower meadows** on terraced slopes, pollinated by enclosed bee colonies  

Environmental stats:  
> Water clarity: 0.95 NTU  
> Oxygen saturation: 102% at surface  
> Alpine pressure set to 0.7 atm for authentic altitude training  

Feedback wanted on bio-diversity management and visitor safety protocols in high-gradient zones.
  `,
  comments: [
    {
      id: 'a9b8c7d6-2345-4e6f-8a7b-0c9d8e7f6a5b',
      author: 'Bob Smith',
      createdAt: '2025-05-15T07:10:00.000Z',
      content: `
Pressure differentials look well controlled, but those hot spring conduits need seismic dampers.  
Without flexible joints, thermal expansion could induce micro-cracks in the ridge foundation.
      `,
      replies: [
        {
          id: 'b8c7d6e5-3456-4f7a-9b8c-1d0e9f8a7b6c',
          author: 'Fiona Wilson',
          createdAt: '2025-05-15T08:00:00.000Z',
          content: `
Good catch—dampers are on order, but installation windows clash with rock bolting operations.  
I’ll coordinate with Helios teams to sequence work.
          `,
          replies: [
            {
              id: 'c7d6e5f4-4567-4a8b-ab9c-2e1f0a9b8c7d',
              author: 'Bob Smith',
              createdAt: '2025-05-15T08:30:00.000Z',
              content: `
Let’s slot them in before the next thermal cycle. Otherwise, we risk cumulative stress.  
I’ll send you the bolting schedule by EOD.
              `,
            },
          ],
        },
      ],
    },
    {
      id: 'd6e5f4a3-5678-4b9c-bc0d-3f2e1a0b9c8d',
      author: 'Alice Johnson',
      createdAt: '2025-05-15T09:45:00.000Z',
      content: `
Logistics update: transporting fresh trout fingerlings to Crystal Lake conflicts with ore shipments to Mars.  
Proposal: use the Geo-Spring module cargo lift during off-peak hours (UTC 18:00–22:00).  
Otherwise, trouts arrive as !>piscine cubes<!.
      `,
      replies: [
        {
          id: 'e5f4a3b2-6789-4cad-cd1e-4a3b2c1d0e9f',
          author: 'Charlie Brown',
          createdAt: '2025-05-15T10:15:00.000Z',
          content: `
Heh, “piscine cubes” would be a hard sell to eco-tourists. Off-peak lift works—just watch for temperature spikes during ascent.
          `,
          replies: [
            {
              id: 'f4a3b2c1-7890-4dbe-de2f-5b4c3d2e1f0a',
              author: 'Alice Johnson',
              createdAt: '2025-05-15T11:00:00.000Z',
              content: `
Noted. I’ll schedule a cold-chain buffer in the lift’s secondary chamber.  
Trout delivery ETA: 2025-05-17T02:00Z.
              `,
            },
          ],
        },
      ],
    },
    {
      id: 'c5b4a3f2-8901-4ecf-ef30-6c5b4a3f2e1d',
      author: 'Charlie Brown',
      createdAt: '2025-05-15T12:30:00.000Z',
      content: `
Took the alpine trail yesterday—wind simulators nailed the summit gusts. 🌬️  
Pro tip: use the magnetic crampons in Module M-12; the simulated ice is slipperier than expected.
      `,
    },
    {
      id: 'b4a3f2e1-9012-4fd0-f012-7d6c5b4a3f2e',
      author: 'Fiona Wilson',
      createdAt: '2025-05-15T14:00:00.000Z',
      content: `
Thanks for the feedback, Charlie! We’ll ramp up signage at M-12.  
Also, pollen counts in the meadows peaked at 300 grains/m³—planning an extra filter stage in the ventilation.
      `,
    },
    {
      id: 'a3f2e1d0-0123-4fe1-0123-8e7d6c5b4a3f',
      author: 'Alice Johnson',
      createdAt: '2025-05-16T06:20:00.000Z',
      content: `
Reminder: mountain gear rentals are depleting faster than anticipated.  
Suggest deploying the next supply pod from GTO ring tomorrow morning.
      `,
      replies: [
        {
          id: 'f2e1d0c9-1234-4ff2-1234-9f8e7d6c5b4a',
          author: 'Bob Smith',
          createdAt: '2025-05-16T07:00:00.000Z',
          content: `
I’ll check structural clearance in the GTO dock bay—should be a 5-min window before attitude thrusters fire.
          `,
        },
      ],
    },
  ],
}
