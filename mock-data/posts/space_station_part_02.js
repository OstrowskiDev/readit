const mock_data = {
  post: {
    id: '99f3e50d-11d2-4dc1-a042-4723a3557f84',
    author: 'Bob Smith',
    createdAt: '2025-05-03T10:00:00.000Z',
    content:
      "⚠️ *Impact Report: Eos Station Breach, Sector C-5*\n\nWe’re still patching up the ring segment where an interstellar microbody—confirmed by orbital tracebacks to be extra-solar—pierced hull plating and vaporized a third of the mid-level conduit network. Initial shield telemetry read it as debris and let it through. Damage would've been catastrophic if not for the redundancy grid.\n\nThree modules offline, full life support restored after 14 hours. Helios crews working 24/7. Whoever designed the layered flex-matrix in that sector deserves a bonus… and also a better sensor net.\n\nEngineers, operators—anyone else picking up residual EM drift near the impact site?",
    replies: [
      {
        id: 'ff6d49b3-61d0-4c4e-9967-47259b2dc123',
        author: 'Fiona Wilson',
        createdAt: '2025-05-03T10:12:00.000Z',
        content:
          'Not just EM—trace isotope readings are way off solar norms. I’m logging non-terrestrial molecular ratios we’ve only seen in Oort-bound comets. Running a spectrotrace, but someone from core security should review this.',
        replies: [
          {
            id: 'aa6b02f8-afe6-4df4-8c34-c5ed7f50d5ce',
            author: 'Bob Smith',
            createdAt: '2025-05-03T10:15:00.000Z',
            content:
              'Already flagged it to Eos Security. If it carried exotic isotopes, we need to reassess not just shielding, but our core quarantine procedures. Thanks, Fiona.',
            replies: [],
          },
        ],
      },
      {
        id: 'ba4a89c4-f7cb-4b0e-8b0e-8218d498da33',
        author: 'Charlie Brown',
        createdAt: '2025-05-03T10:18:00.000Z',
        content:
          'I was docked during the breach. You’ve never heard a station groan like that—felt like a hullquake. Next shift, I’m sleeping in my suit.',
        replies: [],
      },
      {
        id: 'ed3b69bb-20c4-414f-8f1d-3274f06e4f0e',
        author: 'Alice Johnson',
        createdAt: '2025-05-03T10:24:00.000Z',
        content:
          "This is exactly why freight manifests need dynamic re-routing during high-velocity debris windows. We had two haulers caught in docking queue when it hit. We're lucky none of them were shredded.",
        replies: [
          {
            id: 'fe2c2a10-20f4-41cb-9ad6-9e1ac216f3a4',
            author: 'Bob Smith',
            createdAt: '2025-05-03T10:26:00.000Z',
            content:
              'Routing AI flagged the velocity, but the origin vector was so off-pattern it got dumped to low-priority. That’ll change—starting next cycle, we reweigh extra-solar trajectories as high-risk by default.',
            replies: [],
          },
        ],
      },
    ],
  },
}
