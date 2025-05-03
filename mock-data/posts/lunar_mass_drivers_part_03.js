const mock_data = {
  post: {
    id: 'c79883aa-46f1-4e26-9a7b-961147b8a79c',
    author: 'Bob Smith',
    createdAt: '2025-05-03T13:00:00Z',
    title: 'Suborbital Junkyard: Rethinking Recovery in Lunar Launch Mishaps',
    content: `
**Post-Failure Recovery and Trajectory Constraint Review**

We’ve now logged three partial mass driver ejections in the past six lunar cycles—two near Tycho Array and one from the Mare Orientale platform. All three resulted in compromised capsules failing to reach stable orbit and entering erratic suborbital drift.

Recovery has been unpredictable. Ground crews are operating beyond safe EVA thresholds, and auto-deorbit packages aren't triggering due to inconsistent telemetry locks at launch.

We're requesting input on:

- Feasible redundancy for burn package ignition in low-power tumbling capsules
- Trajectory sandboxing during partial boosts
- Orbital tow capacity from micro-tug fleets

Unless we resolve this, we're looking at a pattern of lunar debris accumulation with no clear mitigation path.
`,
  },
  comments: [
    {
      id: '9c1d18e3-6d92-41c2-a6bc-d6402121d537',
      author: 'Charlie Brown',
      createdAt: '2025-05-03T13:22:00Z',
      content:
        "We've got a similar issue with old hopper shells drifting near Vesta Station. If you're depending on auto-ignition after a failed boost, you're gambling. Nothing lights clean after it’s spinning and bleeding voltage.",
      replies: [
        {
          id: '4d2156dc-f7cf-4a61-b6db-0edec2c76e9a',
          author: 'Bob Smith',
          createdAt: '2025-05-03T13:31:00Z',
          content:
            "Exactly. We built in dual triggers—mechanical and timed relay—but tumbling nulls both. The kinetic profile post-partial-launch isn't consistent enough to predict spin stabilization windows.",
          replies: [],
        },
      ],
    },
    {
      id: 'a99b2bc9-d011-4211-90c2-6491449b3f4b',
      author: 'Fiona Wilson',
      createdAt: '2025-05-03T13:40:00Z',
      content:
        'From an environmental standpoint, this is unsustainable. Each failed capsule adds microfractures to the regolith and increases risk to bio-sealed domes. We’re now tracking three with incomplete trajectories that skim Selene’s exo-zone every 11 hours.',
      replies: [
        {
          id: '56603763-f958-4c56-bdd5-0b9a62a63a1f',
          author: 'Bob Smith',
          createdAt: '2025-05-03T13:48:00Z',
          content:
            'We logged those. One nearly clipped a GaiaTech sensor pod. We’ll need zone exclusion markers around the mid-altitude drift corridor until cleared.',
          replies: [],
        },
      ],
    },
    {
      id: 'fbd5cbcc-3930-4f70-997a-0ea986fe27e1',
      author: 'Alice Johnson',
      createdAt: '2025-05-03T14:00:00Z',
      content:
        'Tug fleet’s overbooked already. If you want us to start capturing dead capsules mid-drift, you’ll need to write that into the load profile. Nobody budgeted thrust margin for lunar garbage towing.',
      replies: [
        {
          id: 'e3abeb25-f5b5-4f3a-a715-dc7a1dc61bc3',
          author: 'Charlie Brown',
          createdAt: '2025-05-03T14:10:00Z',
          content:
            'If Helios starts covering tug delta-v, I’m happy to throw in two of ours during low-cycle windows. Otherwise, it’s just another line item no one wants to own.',
          replies: [],
        },
      ],
    },
  ],
}
