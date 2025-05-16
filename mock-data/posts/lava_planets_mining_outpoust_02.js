const mock_data = {
  id: 'a9c8b7d6-1234-4e5f-9a0b-1c2d3e4f5a6b',
  author: 'Alice Johnson',
  createdAt: '2025-05-18T07:00:00.000Z',
  content: `
**Pilot Plant Update: Lava-Tube Extraction Module 01**

We’ve completed the first 72-hour run of our cooled lava-tube pilot on **Vulcanis Prime**, and here are the highlights:

- **Thermal performance**: Module interior averaged 320 K with peak exterior at 650 K; coolant loops consumed 85 kW continuously  
- **Structural response**: Ceramic matrix composite anchors showed <0.3 mm creep; nickel-superalloy gasket joints held within tolerance  
- **Resource yield**: Extracted 12 t of silicate ore and 1.2 t of platinum-group concentrates—~1.8× pilot estimate  
- **Safety triggers**: Automated shutdown engaged twice when wall-shift sensors detected 6 cm lateral movement (above our 5 cm threshold)  

Next steps:  
1. Integrate thermo-electric recapture loops to offset coolant power draw  
2. Test mobile scrubbers against localized SO₂ spikes  
3. Validate drone-deployed sensor arrays for remote monitoring  

Questions: can we reduce shutoff sensitivity without compromising safety? Thoughts on optimizing anchor geometry?
  `,
  comments: [
    {
      id: 'b1c2d3e4-2345-4f6a-abc1-2d3e4f5a6b7c',
      author: 'Bob Smith',
      createdAt: '2025-05-18T08:10:00.000Z',
      content: `
Impressive yields. To reduce false positives, maybe recalibrate wall-shift sensors to a 7 cm threshold but add a second verification sensor at 90° offset.  
That should cut nuisance shutdowns in half.
      `,
      replies: [
        {
          id: 'c2d3e4f5-3456-4a7b-bcd2-3e4f5a6b7c8d',
          author: 'Fiona Wilson',
          createdAt: '2025-05-18T09:00:00.000Z',
          content: `
Calibrating to 7 cm is reasonable, but let’s ensure biosensor arrays still detect micro-fractures. Two layers of triangulated sensing could work: one mechanical, one acoustic.
          `,
          replies: [
            {
              id: 'd3e4f5a6-4567-4b8c-cde3-4f5a6b7c8d9e',
              author: 'Bob Smith',
              createdAt: '2025-05-18T09:30:00.000Z',
              content: `
Agreed—I'll spec acoustic piezoelectric nodes for installation in the next maintenance window.  
Should integrate seamlessly with the existing coolant manifold.
              `,
            },
          ],
        },
      ],
    },
    {
      id: 'e4f5a6b7-5678-4c9d-def4-5a6b7c8d9e0f',
      author: 'Charlie Brown',
      createdAt: '2025-05-18T10:15:00.000Z',
      content: `
1.8× yield is nothing to sneeze at. Did you notice any !>silica dust<! build-up in the coolant filters? That stuff gums up pumps fast.
      `,
      replies: [
        {
          id: 'f5a6b7c8-6789-4dae-ef05-6b7c8d9e0f1a',
          author: 'Alice Johnson',
          createdAt: '2025-05-18T11:00:00.000Z',
          content: `
Yes—filter pressure rose 12% after 48 h. We’re swapping to multi-stage cyclonic pre-filters to capture >90% particulates before coolant contact.
          `,
        },
      ],
    },
    {
      id: 'a6b7c8d9-7890-4ebf-f016-7c8d9e0f1a2b',
      author: 'Fiona Wilson',
      createdAt: '2025-05-18T12:30:00.000Z',
      content: `
Thermo-electric recapture is promising, but conversion efficiency maxes at ~6%. We should model whether recovered power covers at least 20% of coolant load to justify complexity.
      `,
    },
    {
      id: 'b7c8d9e0-8901-4fc0-0127-8d9e0f1a2b3c',
      author: 'Bob Smith',
      createdAt: '2025-05-18T13:45:00.000Z',
      content: `
I’ll run a quick FEA on anchor geometry tweaks—maybe a deeper “T” cross-section leg to improve drag in molten basalt flows.  
Will share results by tomorrow morning.
      `,
    },
    {
      id: 'c8d9e0f1-9012-4ad1-1238-9e0f1a2b3c4d',
      author: 'Alice Johnson',
      createdAt: '2025-05-18T15:00:00.000Z',
      content: `
For mobile scrubbers: can we mount them on the same tethered drone network Charlie mentioned? That way they reposition automatically when outgassing spikes.
      `,
      replies: [
        {
          id: 'd9e0f1a2-0123-4be2-2349-0f1a2b3c4d5e',
          author: 'Charlie Brown',
          createdAt: '2025-05-18T15:30:00.000Z',
          content: `
Absolutely. Drones can carry 100 kg scrubber units—just need to route power lines through the cooled cavern ceiling.  
I’ll draft a rigging diagram.
          `,
        },
      ],
    },
    {
      id: 'e0f1a2b3-1234-4cf3-3450-1e0f1a2b3c4d',
      author: 'Fiona Wilson',
      createdAt: '2025-05-18T16:20:00.000Z',
      content: `
One more thought: deploy thermographic cams around the module perimeter to track real-time heat flux.  
Data feed could trigger adaptive cooling rates.
      `,
    },
  ],
}
