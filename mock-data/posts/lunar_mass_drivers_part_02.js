const mock_data = {
  post: {
    id: '6a1f0c02-3dc9-495a-b33c-e24640a1b0b9',
    author: 'Fiona Wilson',
    createdAt: '2025-05-03T09:00:00Z',
    title: 'Debris at Dawn: The Case for a Unified Lunar Launch Protocol',
    content: `
## Policy Review Request: Autonomous Launch Windows and Regulatory Drift

After the last unexpected **debris dispersal incident** over *Selene Crater*, we’re initiating a call for interagency review of the automated launch approval systems governing **mass drivers**.

While autonomy enables throughput, we're increasingly seeing:
- overlapping trajectories
- **debris vector conflicts** — especially between *privately scheduled launches* and **Helios** heavy lift operations

Current orbital clearance checks are **lagging by up to 9 minutes** during peak hours.

We propose:
- Mandatory harmonization via a shared **orbital traffic API**
- Per-launch **signoff protocol**

Comments are open for technical feasibility — especially from operators using **non-standard driver lengths** or **custom acceleration curves**.
`,
  },
  comments: [
    {
      id: '34c6a9f6-d839-4f09-aec9-18a68e3bb21e',
      author: 'Bob Smith',
      createdAt: '2025-05-03T09:20:00Z',
      content:
        "Agreed on the need for synchronization. We've had to perform two last-second vector nudges this week. Not sustainable. Our internal scheduler isn’t getting upstream updates fast enough—likely a queue prioritization bug on the L2 sync relay.",
      replies: [
        {
          id: '71fd3db6-3f2f-4c8e-909d-e3793b128dea',
          author: 'Fiona Wilson',
          createdAt: '2025-05-03T09:33:00Z',
          content:
            'We’re testing fallback to direct lunar uplink on the south ridge drivers. Latency’s better, but only when solar coverage is full. We may need to revisit power reserve margins if we make that mandatory.',
          replies: [],
        },
      ],
    },
    {
      id: '1b9b28fa-8449-4e2e-9e4f-5c8a7413e0da',
      author: 'Charlie Brown',
      createdAt: '2025-05-03T09:45:00Z',
      content:
        'Regulatory harmonization sounds great until you have to explain a 20-minute delay to a paying cargo client. Unless we can build in real-time exception overrides, private ops will keep ghost-routing their launch paths.',
      replies: [
        {
          id: '8e4d4224-f5c1-443b-bc0b-01d884f0b50b',
          author: 'Fiona Wilson',
          createdAt: '2025-05-03T10:02:00Z',
          content:
            'Understood. But ghost-routing leads to collisions. We’re not talking hypotheticals anymore—we had shrapnel hit a nav relay near Newton Station last week. It’s only a matter of time before it’s a crew habitat.',
          replies: [],
        },
      ],
    },
    {
      id: 'f89f404d-fcd9-4d4c-9356-367ceefb7ef1',
      author: 'Alice Johnson',
      createdAt: '2025-05-03T10:11:00Z',
      content:
        'Could we adapt the Martian launch permit algorithm? It already handles staggered low-energy windows well, even for asynchronous payload bursts. Might need tweaks for lunar gravity profiles, though.',
      replies: [],
    },
    {
      id: '6e979841-35c4-4c27-90f7-0b93f6f482f4',
      author: 'Charlie Brown',
      createdAt: '2025-05-03T10:22:00Z',
      content:
        "Also: let’s not ignore human operators. Every time there's a manual override in the middle of an auto-launch cycle, we increase risk. If you're proposing mandatory review, include tactile locks and fallback roles for station control crews.",
      replies: [],
    },
  ],
}
