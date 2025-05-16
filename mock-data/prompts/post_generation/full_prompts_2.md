## Prompt 1:

Mam dla Cb zadanie, potrzebuję byś wygenerował dla mnie mock-data dla aplikacji w stylu Reddita, zawierającej posty i komentarze, obsługującej zagnieżdżone komentarze do trzech poziomów głębokości (co daje łącznie cztery poziomy, wliczając oryginalny post). W kolejnych wiadomościach podam Ci szczegóły, w tym opis settingu, postacie które będą pisać posty/komentarze. Styl. Na końcu także wytyczne dla struktury danych jakie mają być wygenerowane, gotowy?


## Prompt 2: Zmień temat i jego opis, reszta bez zmian, ten prompt działa bardzo dobrze:

Potrzebuję byś wygenerował post i komentarze dla tematu Spherical Nature-Recreation Habitat zlokalizowanych na orbicie Ziemskiej. Niech będzie skupiony na wypoczynku i korzystaniu z ekskluzywnych resortów wypoczynkowych zlokalizowanych w tym habitacie. 

Poniżej wszystkie wytyczne:

Setting:

    Timeframe: advanced era of Solar System colonization

    Earth has a completed planetary ring

    A Dyson Sphere is currently under construction

    The entire Solar System is colonized to various degrees

    No faster-than-light travel — no FTL or magical tech

    There is no working artificial general intelligence — attempts to develop AI have plateaued and are limited to narrow, imperfect use-cases.

    No magic, no alternative physics — all technologies must obey known scientific principles (as extrapolated realistically).

Characters (users in the system):

    Four recurring characters with defined backgrounds, affiliations, and roles in a technocratic future society:

1. Bob Smith

Title: Senior Structural Engineer
Organization: Helios Construction Group — a megacorporation responsible for constructing and maintaining orbital megastructures throughout the Solar System, including the planetary ring around Earth and segments of the Dyson Sphere.
Description: Bob is a veteran structural engineer with 20 years of experience in orbital construction. He played a key role in the design and execution of Earth's planetary ring and now oversees the structural assembly of Dyson energy collectors near Mercury. Pragmatic and technical, he often comments on engineering integrity and safety concerns.
Speaking style: concise, analytical, often dry or deadpan; emphasizes structural viability and process discipline.

2. Alice Johnson

Title: Logistics Director
Organization: Orion Freight Systems — a major transport and supply company specializing in interplanetary cargo, raw material relocation, and orbital freight lanes.
Description: Alice manages complex logistics networks that connect asteroid mining operations with manufacturing hubs orbiting Mars and Jupiter. With expertise in interplanetary routing, she is known for addressing risks like cargo delays, piracy threats, and bottlenecks in orbital depots.
Speaking style: direct and solution-oriented, occasionally sarcastic; mixes operational vocabulary with sharp commentary.

3. Charlie Brown

Title: Senior Mining Operations Manager
Organization: Vesta Extractors Ltd. — a resource extraction consortium focused on metallic asteroids (iron, nickel, platinum) across the main belt and Jupiter's Trojan zones.
Description: Charlie oversees autonomous mining fleets operating in deep space. A field veteran, he offers grounded insights on mining techniques, regulatory frameworks, and the economic challenges of asteroid resource development.
Speaking style: informal but practical, uses idioms and personal anecdotes; prefers straight talk over theory.

4. Fiona Wilson

Title: Environmental Systems Analyst
Organization: GaiaTech Orbital — a research and infrastructure organization focused on life support, terraforming, and ecosystem management in closed habitats across the Solar System.
Description: Fiona monitors the health and balance of artificial ecosystems in orbiting habitats and lunar colonies. Her contributions often emphasize sustainability, environmental risk mitigation, and the human element in an increasingly industrialized space environment.
Speaking style: empathetic and precise, often reflective; balances data with concern for long-term impact and human well-being.

# 🧪 Mock Data Generator for Reddit-like Post + Comments

For each mock data generation (e.g., topic: *Iron Asteroid Mining*), the output should include:

- One **post** (between **500 and 2000 characters**)  
- **5–30 comments** in total  
  - With **natural conversation flow**
  - Varying levels of **nesting** (up to **3 levels deep**)  
  - Each **comment** should be **shorter than the post**, ranging from single-sentence replies to multi-paragraph messages depending on context  

## ✍️ Author Assignment

- author: Must be the **name of one of four predefined characters** from the **characters list**

## 📝 Content Format

- Use **Markdown** for the content field in both posts and comments
- This is a **custom Markdown**:
  - ✅ Supports: basic Markdown (bold, italic, links, blockquotes, lists, code, etc.)
  - ✅ Supports: superscript as ^(value)
  - ✅ Supports: Reddit-like spoiler as !>value<!
  - ❌ Does **not** support: tables

## ✨ Writing Style Guidelines

- Language should reflect the technocratic and practical tone of the setting, but allow for personality, humor, and social dynamics.
- Characters should maintain **distinct speaking styles** as described in the character bios.
- Tone may vary from formal to colloquial depending on context, but should always reflect knowledge, experience, and immersion in the setting.
- Comments may include **dry humor, rhetorical questions, mild exasperation**, or **personal insights** grounded in the speaker’s role and expertise.
- Avoid references to **FTL**, **magical technologies**, **alternative physics**, or **AI as a miracle fix** — these concepts do not exist in this universe.

## 📅 Timestamp Constraints

- The createdAt field must be a valid ISO string.
- Each post must have an earlier timestamp than its replies.
- Nested replies must follow a **chronological hierarchy** consistent with their parent.
- Timestamps may vary from minutes to hours, but should simulate realistic asynchronous conversation over 1–3 days.

## 🧱 Output Format

- A **JavaScript object** using a **hierarchical structure**  
- Each post and comment must include:
  - id: a **UUID string** (e.g. "5e8f5c9c-abc1-4d6a-9f83-f8e0e6b57e25")
  - author: name of a predefined character
  - createdAt: ISO date string (e.g. "2025-05-02T15:34:22.000Z")
  - content: string in **Markdown**