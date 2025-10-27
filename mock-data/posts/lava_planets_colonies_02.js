const mock_data = {
  id: 'f3e2d1c0-8765-4b9a-8d7e-6c5b4a3f2e1d',
  author: 'Bob Smith',
  createdAt: '2025-05-20T06:30:00.000Z',
  content: `
**Orbital Habitat Construction Plan for Vulcanis Prime** 

Following consensus to build off-planet rather than surface, here’s the high-level blueprint for the **Vulcanis Orbital Ring**:

1. **Module Prefabrication**  
   - Carbon–titanium composite frames manufactured in LEO  
   - Integrated thermal shields rated for 800 K exterior flux  

2. **Assembly Sequence**  
   - Launch batch of 6 modules every 48 h via heavy lift tethers  
   - Automated robotic welders and clamp gangs to connect truss segments  

3. **Environmental Control**  
   - Dual-layer radiation shielding with water–regolith mix for CME protection  
   - Closed-loop life support: 98% O₂/H₂O reclamation, biofilter gardens in each module  

4. **Resource Transfer**  
   - Tethered drones ferry lava-extracted ore from skimmer stations  
   - Docking ports with magnetic grapples for secure transfer  

5. **Redundancy & Safety**  
   - Six independent coolant loops per quadrant  
   - Seismic dampers on each truss node to mitigate micro-meteoroid impacts  

Next milestone: complete first 12 modules and verify ring stiffness at 0.5 g by 2025-06-15. Feedback on assembly timing and tether capacity welcome.
  `,
  comments: [
    {
      id: 'a1f2e3d4-5678-4c9b-8d7f-0e1c2b3a4d5e',
      author: 'Alice Johnson',
      createdAt: '2025-05-20T07:10:00.000Z',
      content: `
Prefabrication cadence looks good, but heavy lift tethers will conflict with Mars supply runs at L2 staging.  
Recommend staggering launches in UTC 04:00–08:00 windows to avoid peak traffic.
      `,
      replies: [
        {
          id: 'b2e3d4c5-6789-4dab-9e7f-1f2c3b4a5d6e',
          author: 'Bob Smith',
          createdAt: '2025-05-20T08:00:00.000Z',
          content: `
Good point. I’ll adjust the manifest to UTC 05:00–09:00 and notify Orion Freight for slot reservation.  
That gives us a 2 h buffer before asteroid convoy departure.
          `,
        },
      ],
    },
    {
      id: 'c3d4e5f6-7890-4ebc-0a1f-2g3h4j5k6l7m',
      author: 'Fiona Wilson',
      createdAt: '2025-05-20T09:15:00.000Z',
      content: `
Environmental controls: ensure biofilter gardens have UV-transparent panels to boost photosynthesis under lower solar flux.  
Also, circulating algae bioreactors can supplement O₂ by 5% during peak crew activity.
      `,
      replies: [
        {
          id: 'd4e5f6a7-8901-4bcd-1g2h-3j4k5l6m7n8o',
          author: 'Charlie Brown',
          createdAt: '2025-05-20T10:00:00.000Z',
          content: `
Algae bioreactors are solid, but watch for !>biofilm clogging<! in the tubing.  
Add inline ultrasonic cleaners to prevent buildup.
          `,
          replies: [
            {
              id: 'e5f6a7b8-9012-4ced-2h3i-4k5l6m7n8o9p',
              author: 'Fiona Wilson',
              createdAt: '2025-05-20T10:30:00.000Z',
              content: `
Excellent suggestion. I’ll specify ultrasonic transducers at 500 kHz in feed lines.  
That should keep flow rates above 2 L/min per reactor.
              `,
            },
          ],
        },
      ],
    },
    {
      id: 'f6a7b8c9-0123-4def-3i4j-5l6m7n8o9p0q',
      author: 'Charlie Brown',
      createdAt: '2025-05-20T11:45:00.000Z',
      content: `
On ring stiffness: have we modeled thermal expansion at day/night cycles?  
A 10 K swing in composite trusses could introduce ±2 cm deformation.
      `,
      replies: [
        {
          id: 'g7b8c9d0-1234-4ef0-4j5k-6m7n8o9p0q1r',
          author: 'Bob Smith',
          createdAt: '2025-05-20T12:30:00.000Z',
          content: `
Yes—FEA shows ±1.5 cm at 10 K swing with expansion joints.  
We’ll add telescoping couplers at every third node for an extra 1 cm margin.
          `,
        },
      ],
    },
    {
      id: 'h8c9d0e1-2345-4f01-5k6l-7n8o9p0q1r2s',
      author: 'Alice Johnson',
      createdAt: '2025-05-20T13:50:00.000Z',
      content: `
Resource transfer via tethered drones is promising—what’s the payload cycle time?  
At 500 kg per run and 2 km tether, we need under 20 min round-trip to meet target.
      `,
      replies: [
        {
          id: 'i9d0e1f2-3456-4g12-6l7m-8o9p0q1r2s3t',
          author: 'Charlie Brown',
          createdAt: '2025-05-20T14:20:00.000Z',
          content: `
Current drone prototypes do 2.5 km HTOL in ~8 min loaded, ~6 min empty.  
Round-trip ~14 min—within margin. Fuel reserves rated for 25 flights before recharge.
          `,
        },
      ],
    },
    {
      id: 'j0e1f2g3-4567-4h23-7m8n-9p0q1r2s3t4u',
      author: 'Fiona Wilson',
      createdAt: '2025-05-20T15:30:00.000Z',
      content: `
Life support redundancy is robust, but consider relocating crew quarters away from seam welds.  
Heat flux concentrates at the clamp joints—low-traffic zones preferred for cabins.
      `,
    },
  ],
}
