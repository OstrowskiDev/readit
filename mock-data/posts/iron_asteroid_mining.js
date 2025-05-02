const mock_data = {
  id: 'd05ef20d-2a25-4627-8599-284d194db69c',
  author: 'Charlie Brown',
  createdAt: '2025-05-01T12:00:00Z',
  content: `Ever since we established Site Theta on that iron-rich asteroid in the outer Kuiper Belt, extraction efficiency has gone up by 23%. The laser-ablation array—mounted across the spine of the station—operates continuously thanks to the cryogenic sink in the sub-surface layer. It’s elegant engineering, if you ask me.

But efficiency isn’t our only concern. Stabilizing the regolith to prevent debris scatter during continuous beam operation remains a challenge. We've started testing synchronized drones to pre-sinter the surface ahead of extraction cycles.

Most people think mining is just 'point laser, melt rock'. Truth is, in zero-gravity environments, even molten iron behaves like a hostile gas if containment isn’t perfect. Makes me wonder how many more of these stations we can build before risk management becomes our bottleneck.`,
  comments: [
    {
      id: 'f1a3f52e-610f-498a-b231-2766cf68df84',
      author: 'Bob Smith',
      createdAt: '2025-05-01T12:15:00Z',
      content:
        "Structural load on those spines must be unreal. Hope you've stress-tested for micro-impacts at that distance.",
      comments: [],
    },
    {
      id: '3919429e-9d38-4f89-82b3-eedb8a74884e',
      author: 'Alice Johnson',
      createdAt: '2025-05-01T12:35:00Z',
      content:
        'Debris scatter is going to mess with our outbound shipping lanes if containment isn’t airtight. Have you mapped exit vectors?',
      comments: [],
    },
    {
      id: 'b5cf70ec-ffb0-4de4-81fc-53512a9a33d1',
      author: 'Fiona Wilson',
      createdAt: '2025-05-01T12:50:00Z',
      content:
        'Any plan for post-mining ecosystem stabilization? You don’t want iron dust migrating into shared traffic zones.',
      comments: [
        {
          id: '86b3fbd0-3b20-4010-b2f8-18858e7a885b',
          author: 'Charlie Brown',
          createdAt: '2025-05-01T13:10:00Z',
          content:
            'We’ve got thermal models aligned with flight ops. But I’ll admit—Kuiper currents are harder to predict than we’d like.',
          comments: [
            {
              id: 'a5567765-041f-49b1-bd02-1f3142eb194b',
              author: 'Alice Johnson',
              createdAt: '2025-05-01T13:30:00Z',
              content:
                'Use vector shielding at key nodes. We did that near Ganymede and reduced particulate drift by 40%.',
              comments: [],
            },
          ],
        },
      ],
    },
    {
      id: '1cfb3a0a-1943-4ee8-944b-43b0de6f66e0',
      author: 'Bob Smith',
      createdAt: '2025-05-01T13:45:00Z',
      content:
        'Doesn’t solve for beam flare in unstable fields. What’s your plan when containment dips mid-cycle?',
      comments: [
        {
          id: '842321cc-11df-4f55-b1e7-cac4e2eddb46',
          author: 'Charlie Brown',
          createdAt: '2025-05-01T14:10:00Z',
          content:
            'Manual override with drone-coordinated freeze cycles. Expensive, but safer than magnetic dampers out here.',
          comments: [],
        },
      ],
    },
    {
      id: 'd4b9e2f0-9a96-42dc-b4e9-c7d7f4cd1527',
      author: 'Fiona Wilson',
      createdAt: '2025-05-01T14:40:00Z',
      content:
        'Still wondering if harvesting from shallow belts wouldn’t offset all this deep-space risk.',
      comments: [
        {
          id: '6f631fc3-636a-45a1-8c39-7a0f8f91d9c5',
          author: 'Charlie Brown',
          createdAt: '2025-05-01T15:00:00Z',
          content:
            'Maybe. But iron density out here makes the ROI worth the headaches—at least for now.',
          comments: [],
        },
      ],
    },
  ],
}
