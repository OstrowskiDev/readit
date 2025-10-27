const mock_data = {
  id: 'e4f6a7b8-9c0d-4e1f-8a2b-3c4d5e6f7a8b',
  author: 'Charlie Brown',
  createdAt: '2025-05-16T09:00:00.000Z',
  content: `
**Mining Operations on Mercury: Realistic or Reckless?** 

We’re evaluating a proposal to establish **surface and subsurface** extraction facilities on high-temperature volcanic planets—think Io-class bodies with average surface temps exceeding 700 K. Key questions:

- **Structural viability**: Can we anchor modules in basalt flows flowing at 100–300 °C?  
- **Thermal management**: What cooling cycles are required to protect equipment and habitats?  
- **Resource yield**: Sulfur, silicates, and rare metals—does the higher concentration justify the engineering risk?  
- **Safety protocols**: Automated shutdowns if ambient > 400 °C or if lava tube walls shift > 5 cm.

I’m especially keen on feedback regarding realistic materials and cooling strategies. Is building there truly feasible, or are we courting disaster for a marginal resource gain?

> *“Hot enough to fry your boots, but rich enough to pay the bill.”*  
  `,
  comments: [
    {
      id: 'a1b2c3d4-5678-4e9f-9012-3a4b5c6d7e8f',
      author: 'Bob Smith',
      createdAt: '2025-05-16T09:30:00.000Z',
      content: `
Concrete basalt anchors will degrade under cyclic heat at 300 °C.  
Recommend **ceramic matrix composites** with reflective coatings and active coolant loops to maintain structural integrity.
      `,
      replies: [
        {
          id: 'b2c3d4e5-6789-4f0a-9123-4b5c6d7e8f9a',
          author: 'Fiona Wilson',
          createdAt: '2025-05-16T10:00:00.000Z',
          content: `
Cooled cavities in lava tubes could buffer temperature spikes, but **biosensor arrays** must handle thermal gradients >300 K.  
Don’t forget the impact on closed-loop air and water cycles.
          `,
          replies: [
            {
              id: 'c3d4e5f6-7890-4a1b-9234-5c6d7e8f9a0b',
              author: 'Bob Smith',
              createdAt: '2025-05-16T10:30:00.000Z',
              content: `
Agreed. We’ll specify coolant flow at 2 L/s per module and embed strain gauges at 0.5 m intervals to detect wall shifts.  
That should catch any movement >5 cm in real time.
              `,
              replies: [
                {
                  id: 'd4e5f6a7-8901-4b2c-0345-6d7e8f9a0b1c',
                  author: 'Fiona Wilson',
                  createdAt: '2025-05-16T11:00:00.000Z',
                  content: `
Perfect. I’ll update the ecosystem risk model with those parameters and run a Monte Carlo on heat flux variability.  
Expect results in 48 hours.
                  `,
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'e5f6a7b8-9012-4c3d-1456-7e8f9a0b1c2d',
      author: 'Alice Johnson',
      createdAt: '2025-05-16T11:45:00.000Z',
      content: `
Transporting heavy ceramic panels to a lava field orbit is nontrivial.  
Suggest staging at cryo‐depot in L2, then use **heat‐shielded tethers** for descent.  
_Sarcastic aside_: because nothing says “welcome to hell” like a flaming cargo hook.
      `,
      replies: [
        {
          id: 'f6a7b8c9-0123-4d4e-2567-8f9a0b1c2d3e',
          author: 'Charlie Brown',
          createdAt: '2025-05-16T12:15:00.000Z',
          content: `
Good call. Tethers need ablative coating to survive reentry friction in the 500–700 °C range.  
Also, consider automated drones for last‐mile placement inside cooled tubes.
          `,
          replies: [
            {
              id: 'a7b8c9d0-1234-4e5f-3678-9a0b1c2d3e4f',
              author: 'Alice Johnson',
              createdAt: '2025-05-16T12:45:00.000Z',
              content: `
Understood. I’ll coordinate with drone ops to test payloads in the 20–50 kg range first.  
Expect a trial run by 2025-05-18T03:00Z.
              `,
            },
          ],
        },
      ],
    },
    {
      id: 'b7c8d9e0-2345-4f6a-4789-0b1c2d3e4f5a',
      author: 'Charlie Brown',
      createdAt: '2025-05-16T13:30:00.000Z',
      content: `
Economically, the metal grade is 2× high than main‐belt averages, but *energy cost per ton* mined jumps by ~150%.  
Is the margin worth the heat stress on hardware?
      `,
      replies: [
        {
          id: 'c8d9e0f1-3456-4a7b-5890-1c2d3e4f5a6b',
          author: 'Fiona Wilson',
          createdAt: '2025-05-16T14:00:00.000Z',
          content: `
Unless you can recycle >80% of heat energy via thermo‐electric converters, the net yield falls below break-even.  
We need a pilot plant data point before scaling.
          `,
        },
      ],
    },
    {
      id: 'd9e0f1a2-4567-4b8c-6901-2d3e4f5a6b7c',
      author: 'Fiona Wilson',
      createdAt: '2025-05-17T08:20:00.000Z',
      content: `
Environmental risk: volcanic outgassing (SO₂, H₂S) could overwhelm scrubbers in closed habitats.  
Recommend deploying **mobile scrubber units** with catalytic conversion layers.
      `,
    },
    {
      id: 'e0f1a2b3-5678-4c9d-7a02-3e4f5a6b7c8d',
      author: 'Bob Smith',
      createdAt: '2025-05-17T09:15:00.000Z',
      content: `
Ceramic composites look promising, but joint seals at 600 °C will creep over time.  
We might need nickel‐based superalloy gaskets for critical interfaces.
      `,
      replies: [
        {
          id: 'f1a2b3c4-6789-4dae-8b13-4f5a6b7c8d9e',
          author: 'Charlie Brown',
          createdAt: '2025-05-17T09:45:00.000Z',
          content: `
Let’s include a maintenance cycle every 500 operational hours to inspect gaskets.  
That should limit creep deformation to <1 mm.
          `,
        },
      ],
    },
  ],
}
