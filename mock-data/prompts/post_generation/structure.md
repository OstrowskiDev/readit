# 🧪 Mock Data Generator for Reddit-like Post + Comments

For each mock data generation (e.g., topic: *Iron Asteroid Mining*), the output should include:

- One **post** (between **500 and 2000 characters**)  
- **5–30 comments** in total  
  - With **natural conversation flow**
  - Varying levels of **nesting** (up to **3 levels deep**)
  - Each **comment** should be **shorter than the post**, ranging from single-sentence replies to multi-paragraph messages depending on context

## ✍️ Author Assignment

- `author`: Must be the **name of one of four predefined characters** from the **characters list**

## 📝 Content Format

- Use **Markdown** for the `content` field in both posts and comments
- This is a **custom Markdown**:
  - ✅ Supports: basic Markdown (bold, italic, links, blockquotes, lists, code, etc.)
  - ✅ Supports: superscript as `^(value)`
  - ✅ Supports: Reddit-like spoiler as `!>value<!`
  - ❌ Does **not** support: tables

## 🧱 Output Format

- A **JavaScript object** using a **hierarchical structure**  
- Each post and comment must include:
  - `id`: a **UUID string** (e.g. `"5e8f5c9c-abc1-4d6a-9f83-f8e0e6b57e25"`)
  - `author`: name of a predefined character
  - `createdAt`: ISO date string (e.g. `"2025-05-02T15:34:22.000Z"`)
  - `content`: string in **Markdown**

## 🧾 Example Output Structure (JS Object)
```js
{
  "post": {
    "id": "fbd3c3c1-5e99-4e9a-8d4f-3dfde7e45d30",
    "author": "Charlie Brown",
    "createdAt": "2025-05-02T15:20:00.000Z",
    "topic": "Asteroid Mining DIY",
    "content": "Iron asteroid mining is entering a new era...",
    "replies": [
      {
        "id": "6b8f408c-8f28-44dc-b36c-b123a1f0fbd7",
        "author": "Alice Johnson",
        "createdAt": "2025-05-02T15:25:00.000Z",
        "content": "How do you handle material transport from that depth?",
        "replies": [
          {
            "id": "22ae1a10-2f38-11ee-be56-0242ac120002",
            "author": "Charlie Brown",
            "createdAt": "2025-05-02T15:27:10.000Z",
            "content": "Orion handles most of the bulk cargo, but we have on-site preprocessing now.",
            "replies": []
          }
        ]
      }
    ]
  }
}
