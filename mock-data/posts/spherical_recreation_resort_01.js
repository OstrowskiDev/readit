const mock_data = {
  id: 'd3f5a9e2-7c1b-4a6e-9f1a-2b3c4d5e6f70',
  author: 'Charlie Brown',
  createdAt: '2025-05-13T08:15:00.000Z',
  content: `
**Spherical Nature-Recreation Habitat** now operational in low Earth orbit! 🌱✨

After decades of incremental habitat construction, the **Orbital Biosphere Consortium** has opened its flagship _Recreation Ring_—a series of interconnected, rotating spheres designed to simulate Earthlike gravity and ecosystems. Highlights include:

- **Floating rainforests** under geodesic domes, complete with microclimates and bird sanctuaries  
- **Artificial lakes** for paddle-boating, with real freshwater cycles powered by closed-loop water reclamation  
- **Zero-G “skywalk”** tunnels between spheres for thrill-seekers  
- **Luxury resorts** offering panoramic Earth vistas from private transparent floors  

Bookings open now for summer 2155 🌞. Packages range from _eco-retreat_ cabins nestled in moss gardens to _gravity spa_ experiences with periodic spin adjustments (up to 0.8 g). Early reviews praise the seamless integration of nature and orbital mechanics, but some engineers warn of potential **micro-vibration resonance** between adjacent spheres.

Are we looking at the future of leisure tourism or just another megastructure to maintain? Comments welcome!

> *“It’s like Earth, only you can’t fall off the edge.”* — Anonymous test pilot
  `,
  comments: [
    {
      id: 'a1b2c3d4-1111-4e5f-8888-9a0b1c2d3e4f',
      author: 'Bob Smith',
      createdAt: '2025-05-13T09:02:00.000Z',
      content: `
Dry run reports are solid, but I’m curious about the long-term fatigue on the primary truss at 0.8 g.  
If resonance modes aren’t actively damped, you’ll see micro-fractures in the weld seams by year five.
      `,
      replies: [
        {
          id: 'b2c3d4e5-2222-4f6a-9999-0b1c2d3e4f5a',
          author: 'Fiona Wilson',
          createdAt: '2025-05-13T10:15:00.000Z',
          content: `
I ran a preliminary vibro-acoustic simulation last quarter—damping algorithms reduce peak amplitude by ~30%. Still, we need **redundant isolation mounts** at each node to keep ecosystem structures stable.  
Don’t underestimate bio-system sensitivity to mechanical stress.
          `,
          replies: [
            {
              id: 'c3d4e5f6-3333-4a7b-aaaa-1c2d3e4f5a6b',
              author: 'Bob Smith',
              createdAt: '2025-05-13T11:00:00.000Z',
              content: `
Agreed. I’ll push for isolators rated for 150 Hz–2 kHz. That covers the main spin harmonics.  
Let’s sync with GaiaTech’s materials team for composite mount prototypes.
              `,
              replies: [
                {
                  id: 'd4e5f6a7-4444-4b8c-bbbb-2d3e4f5a6b7c',
                  author: 'Fiona Wilson',
                  createdAt: '2025-05-13T11:30:00.000Z',
                  content: `
Sounds like a plan. I’ll circulate the environmental impact memo once mounts specs are finalized.  
Expect feedback by end of day tomorrow.
                  `,
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'e5f6a7b8-5555-4c9d-cccc-3e4f5a6b7c8d',
      author: 'Alice Johnson',
      createdAt: '2025-05-13T12:45:00.000Z',
      content: `
Logistics note: supply runs to the Recreation Ring face orbital slot conflicts with asteroid freighters.  
Recommend shifting resupply windows to UTC 02:00–06:00 to avoid peak traffic on the LEO freight corridor.  
_Sarcastic aside_: nothing says “luxury spa” like waiting three days for fresh bananas.
      `,
      replies: [
        {
          id: 'f6a7b8c9-6666-4daf-dddd-4f5a6b7c8d9e',
          author: 'Charlie Brown',
          createdAt: '2025-05-13T13:10:00.000Z',
          content: `
Heh, tell that to the coconut water suppliers—they still jam the queue. Maybe we need a “priority pineapple” surcharge?  
Also, have we considered in-habitat hydroponic gardens for perishable produce?
          `,
          replies: [
            {
              id: 'a7b8c9d0-7777-4eb0-eeee-5a6b7c8d9e0f',
              author: 'Alice Johnson',
              createdAt: '2025-05-13T14:00:00.000Z',
              content: `
Hydroponics are on standby—module H-47 should come online next month.  
Until then, I’ll reroute pineapples via the geostationary relay ring to shave off two days.
              `,
            },
          ],
        },
      ],
    },
    {
      id: 'b7c8d9e0-8888-4fc1-ffff-6b7c8d9e0f1a',
      author: 'Fiona Wilson',
      createdAt: '2025-05-14T07:20:00.000Z',
      content: `
Impressed by the closed-loop water system—evapotranspiration rates hit 85% recovery in testing.  
Just please monitor for !>salinity spikes<! around the lake margins; halophyte filters are still experimental.
      `,
    },
    {
      id: 'c8d9e0f1-9999-4ad2-1111-7c8d9e0f1a2b',
      author: 'Charlie Brown',
      createdAt: '2025-05-14T08:45:00.000Z',
      content: `
I’ve volunteered for the first paddle-boat trial next week—nothing beats telling stories over 200 km/h orbital breeze! 🌬️  
Also, anyone read the !>fine print<! on liability if you drift into low-gravity buffer zones?
      `,
      replies: [
        {
          id: 'd9e0f1a2-aaaa-4be3-2222-8d9e0f1a2b3c',
          author: 'Bob Smith',
          createdAt: '2025-05-14T09:10:00.000Z',
          content: `
Liability’s covered under Clause 17.3b: “User assumes risk of micro-trajectory deviation.”  
In practice, emergency clamps engage at 1.2 m from sphere walls.
          `,
        },
      ],
    },
    {
      id: 'e0f1a2b3-bbbb-4cf4-3333-9e0f1a2b3c4d',
      author: 'Alice Johnson',
      createdAt: '2025-05-15T10:00:00.000Z',
      content: `
Update: catering pods are now using orbital refueling points to top off hydrogen for cooking grills.  
Should eliminate that weird “vacuum-taste” complaint.  
Anyone got feedback from the spa cocktail menu?
      `,
      replies: [
        {
          id: 'f1a2b3c4-cccc-4d05-4444-0f1a2b3c4d5e',
          author: 'Fiona Wilson',
          createdAt: '2025-05-15T11:30:00.000Z',
          content: `
Tried the _Zero-G Mojito_—mint leaves float too much, but taste is spot on.  
Next iteration needs slightly heavier garnish or a magnetic coaster.
          `,
        },
      ],
    },
  ],
}
