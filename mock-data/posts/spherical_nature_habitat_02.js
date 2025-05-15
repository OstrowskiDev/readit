const mock_data = {
  post: {
    id: '9baf57fc-9204-4f4e-8feb-991a33d13100',
    author: 'Alice Johnson',
    createdAt: '2025-05-03T14:00:00Z',
    topic: 'Rewilding Orbit: Conservation Beyond Earth',
    content: `We’re moving past the idea of orbital habitats as mere survival structures. What if they became **natural sanctuaries** — not just for humans but for endangered species?
      Picture this: an orbital biome where the Okapi roams again, where coral reefs are monitored from all angles, where species once thought extinct can **flourish without terrestrial pressure**.
      Rather than rewilding Earth, maybe the next frontier is **rewilding orbit**. A full-scale conservation station, climate-controlled and shielded from planetary risks.
      Challenges? Of course. Genetic diversity, psychological effects on fauna, adapting migratory behavior in zero-G. But we've cracked harder things.Anyone with ideas for simulating predator-prey balance, or experience with deep space vivariums?`,
    replies: [
      {
        id: '6dbf1b0d-acb4-47bb-838a-6f035d5f58d8',
        author: 'Charlie Brown',
        createdAt: '2025-05-03T14:05:00Z',
        content:
          'Predator-prey systems are *extremely* sensitive to enclosed environments. Without predation gradients or escape zones, you’ll need daily micro-adjustments. AI helps, but don’t expect a stable cycle longer than a few weeks.',
        replies: [
          {
            id: 'b566b46b-93b4-4515-a002-ecd7c810d6e2',
            author: 'Alice Johnson',
            createdAt: '2025-05-03T14:07:00Z',
            content:
              'I love this idea, but we need to talk enrichment. Animals with no predators often spiral into depressive or hyperaggressive loops in enclosures. !>Enrichment is not optional<!.',
            replies: [],
          },
        ],
      },
      {
        id: 'cf58a86b-ed6a-42a8-9a95-fb097a4544c4',
        author: 'Bob Smith',
        createdAt: '2025-05-03T14:10:00Z',
        content:
          'Vivariums in L5 rings are already testing flock dynamics in zero-G. Birds adapt better than expected — as long as you manage airflow and offer magnetic perch zones.',
        replies: [
          {
            id: 'b47dd788-b464-48f8-af22-01f0c6d8cd46',
            author: 'Fiona Wilson',
            createdAt: '2025-05-03T14:22:00Z',
            content:
              'Interesting — hadn’t heard about the magnetic perch trials. Makes sense though. Do we know how they navigate without gravity-based orientation cues?',
            replies: [],
          },
        ],
      },
      {
        id: '607c42b2-b990-49f6-94cc-0de63d1ba218',
        author: 'Fiona Wilson',
        createdAt: '2025-05-03T14:15:00Z',
        content:
          'I’d propose we start with species already accustomed to confined terrains — alpine goats, reef fish, certain burrowing mammals. Give them what they already handle well, and scale up.',
        replies: [],
      },
    ],
  },
}
