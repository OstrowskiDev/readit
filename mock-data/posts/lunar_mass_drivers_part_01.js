const mock_data = {
  post: {
    id: 'c8a08b32-843e-4b35-a121-fcae19965d9e',
    author: 'Bob Smith',
    createdAt: '2025-05-02T12:00:00Z',
    content:
      '**Mass Drivers on the Moon: Structural Notes from the Assembly Ring**\n\nWith the increasing load demand from lunar regolith transfer to orbital foundries, Helios has greenlit the reactivation and scaling of several mass driver lines across the Lunar equator. Each installation is projected to launch payloads exceeding 15 tons at regular intervals—raising key structural considerations.\n\nLaunch rail stability, vibration damping under cyclical thermal expansion, and radiation shielding for control nodes are currently our biggest bottlenecks. We’re seeing harmonics above spec during twilight transitions, and some support pylons are exhibiting microfracture patterns earlier than expected.\n\nHelios welcomes technical insights from any ops teams currently coordinating nearside driver schedules, particularly on redundancy planning and safe fallback modes during partial power outages.',
  },
  comments: [
    {
      id: '1993e51e-2581-4625-8e30-94e6019f2890',
      author: 'Alice Johnson',
      createdAt: '2025-05-02T12:34:00Z',
      content:
        'Would appreciate sync with ops planning. We’ve had to delay two Mars-bound shipments this week due to lunar outbound schedules slipping without notice. If fallback mode isn’t ready, at least stagger the driver cycles to ease strain on the outbound lanes.',
      replies: [
        {
          id: '4d0f4bc5-46dc-4d66-8f63-19f36ac7c244',
          author: 'Bob Smith',
          createdAt: '2025-05-02T12:58:00Z',
          content:
            "Staggering is possible if power availability is predictable. But with the current lunar array maintenance, we’re operating under constrained redundancy. I'll raise the issue in the next systems check-in.",
          replies: [],
        },
      ],
    },
    {
      id: '0ae7a7bc-b535-4594-9b34-14f2044b5a26',
      author: 'Charlie Brown',
      createdAt: '2025-05-02T13:16:00Z',
      content:
        'Last time we ran nearside ops, we had to pause ore extraction twice due to vibration warnings from the embedded sensors. You might want to double-check the resonance calculations around terminator crossings. We used to apply a damping buffer of 3.2 meters.',
      replies: [
        {
          id: '0f03d997-6ff6-4406-9ec2-1d774e5dbd3d',
          author: 'Bob Smith',
          createdAt: '2025-05-02T13:33:00Z',
          content:
            "Noted. We're reviewing structural harmonics again this cycle. Most issues cluster around older segments built pre-automation—likely due to weld inconsistencies.",
          replies: [],
        },
        {
          id: '3e042a91-0a29-44b5-bd20-b25639e85a04',
          author: 'Fiona Wilson',
          createdAt: '2025-05-02T13:45:00Z',
          content:
            'Microfractures near habitat zones could compromise life support shielding. Has there been any water vapor leakage logged yet? Even minor escapes can cascade into environmental imbalance.',
          replies: [
            {
              id: '68b3b3be-61ef-442b-aeec-72e54024f12d',
              author: 'Bob Smith',
              createdAt: '2025-05-02T13:58:00Z',
              content:
                'No vapor leaks so far. Monitoring is tight near the southern arc, but I’ll cross-reference your concern with our thermal fatigue model updates.',
              replies: [],
            },
          ],
        },
      ],
    },
    {
      id: '3e8968f7-c53e-4c2c-b7e7-09b0c01b35a2',
      author: 'Fiona Wilson',
      createdAt: '2025-05-02T14:12:00Z',
      content:
        "There's been chatter in the biodome forums about electromagnetic interference during mass driver cycles. Some sensor nodes are misreporting atmospheric nitrate levels—likely a timing sync issue, but it’s worth flagging before resupply.",
      replies: [],
    },
    {
      id: '40411342-7ef3-4d41-a5c1-e2a79ddedc3b',
      author: 'Charlie Brown',
      createdAt: '2025-05-02T14:25:00Z',
      content:
        'Honestly, I still think burying the driver rails under regolith was smarter. We did it on Thebe and got much better heat control. Lunar dust is a pain, sure, but it insulates better than open exposure.',
      replies: [],
    },
  ],
}
