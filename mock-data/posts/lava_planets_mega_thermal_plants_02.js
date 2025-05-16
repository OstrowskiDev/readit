const mock_data = {
  id: 'g7h8i9j0-2k3l-4m5n-6o7p-8q9r0s1t2u3v',
  author: 'Fiona Wilson',
  createdAt: '2025-05-22T10:00:00.000Z',
  content: `
**Post-Incident Review: Meta-Thermal Plant #3 Failure Modes & Design Updates**

During the third 5 GW plant’s pulse test on Vulcanis Prime, a breach occurred in the magmatic heat exchanger manifold at 720 °C / 95 bar. Rapid pressure oscillations coupled with particulate erosion led to a coolant leak and an unscheduled shutdown. 

Key failure points:
- **Manifold joint fatigue** under cyclic stress  
- **Particle impingement** eroding internal ceramic lining  
- **Bypass valve sticking** due to silica dust accumulation  

Proposed design revisions:
1. **Reinforced manifold geometry** with 15 cm wall thickness and graded composite layering  
2. **Inline cyclonic separators** upstream of valves to trap >99 % particulates  
3. **Magnetorheological bypass valves** for rapid response to transient surges  
4. **Automated acoustic monitoring** on piping to detect erosion events in real time  

Seeking feedback on materials compatibility and sensor placement. How do we validate improved reliability before full-scale rollout?
  `,
  comments: [
    {
      id: 'h1i2j3k4-3456-4l7m-8n9o-0p1q2r3s4t5u',
      author: 'Bob Smith',
      createdAt: '2025-05-22T11:15:00.000Z',
      content: `
15 cm walls are good, but graded layers risk interface shear if thermal expansion differs.  
Recommend adding compliant slip-joint liners between composite strata.
      `,
      replies: [
        {
          id: 'i2j3k4l5-4567-4m8n-9o0p-1q2r3s4t5u6v',
          author: 'Fiona Wilson',
          createdAt: '2025-05-22T12:00:00.000Z',
          content: `
Slip joints could work—will specify high-temperature braided metal bellows there.  
Placement: every 2 m along the manifold run.
          `,
          replies: [
            {
              id: 'j3k4l5m6-5678-4n9o-0p1q-2r3s4t5u6v7w',
              author: 'Bob Smith',
              createdAt: '2025-05-22T12:30:00.000Z',
              content: `
Braided bellows rated to 800 °C are available.  
Ensure welds use nickel-based filler to match creep rates.
              `,
            },
          ],
        },
      ],
    },
    {
      id: 'k4l5m6n7-6789-4o0p-1q2r-3s4t5u6v7w8x',
      author: 'Charlie Brown',
      createdAt: '2025-05-22T13:45:00.000Z',
      content: `
Cyclonic separators are fine, but what about valve freeze-up if dust cake forms?  
Maybe schedule micro-backflush cycles every 30 min.
      `,
      replies: [
        {
          id: 'l5m6n7o8-7890-4p1q-2r3s-4t5u6v7w8x9y',
          author: 'Alice Johnson',
          createdAt: '2025-05-22T14:30:00.000Z',
          content: `
Backflush idea is solid. Incorporate a small reserve of high-pressure gas (argon) for pulse cleaning—won’t contaminate coolant.
          `,
        },
      ],
    },
    {
      id: 'm6n7o8p9-8901-4q2r-3s4t-5u6v7w8x9y0z',
      author: 'Fiona Wilson',
      createdAt: '2025-05-23T06:00:00.000Z',
      content: `
Acoustic sensors: planning array of piezo pickups every 1 m, linked to FPGA analysis for frequency shifts.  
Concerned about false positives from normal flow noise—ideas?
      `,
    },
    {
      id: 'n7o8p9q0-9012-4r3s-4t5u-6v7w8x9y0z1a',
      author: 'Bob Smith',
      createdAt: '2025-05-23T07:20:00.000Z',
      content: `
Use band-pass filters tuned to erosion signature frequencies (~8–12 kHz).  
That should reject pump and flow noise under 2 kHz.
      `,
    },
    {
      id: 'o8p9q0r1-0123-4s4t-5u6v-7w8x9y0z1a2b',
      author: 'Charlie Brown',
      createdAt: '2025-05-23T08:45:00.000Z',
      content: `
We’ll need a small on-site test rig—maybe repurpose Plant #1 manifold section for a stress cycle bench.  
Can we allocate drone time for that?
      `,
      replies: [
        {
          id: 'p9q0r1s2-1234-4t5u-6v7w-8x9y0z1a2b3c',
          author: 'Alice Johnson',
          createdAt: '2025-05-23T09:15:00.000Z',
          content: `
Drone availability is tight, but we can carve out a 12 h slot tomorrow on the maintenance window.  
Scheduling update incoming.
          `,
        },
      ],
    },
    {
      id: 'q0r1s2t3-2345-4u6v-7w8x-9y0z1a2b3c4d',
      author: 'Fiona Wilson',
      createdAt: '2025-05-23T10:30:00.000Z',
      content: `
Perfect—once we validate the backflush and acoustic tuning, we can roll changes into all three plants.  
Thanks team!
      `,
    },
  ],
}
