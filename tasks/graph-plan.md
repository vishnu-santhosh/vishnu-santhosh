# Bidirectional Linking with Graph View - Implementation Plan

## Overview
Add Obsidian-like bidirectional linking to the terminal blog with a visual graph to explore connected ideas.

---

## Requirements

### Link Types (Both)
1. **Tags-based links** - Existing tags connect articles (already implemented)
2. **Wikilinks** - `[[article-slug]]` syntax in markdown content

### Graph View
- Library: D3.js
- Access: Separate `/graph` page
- Visualization: Force-directed graph showing connections between articles

---

## Implementation Plan

### Phase 1: Link Parsing

#### 1.1 Create Graph Data Builder (`src/utils/graph.js`)
```javascript
// Extract links from articles:
// 1. Parse [[wikilinks]] from content → convert to article slugs
// 2. Use existing tags as implicit links
// Build adjacency list: { "article-slug": ["related-slug-1", "related-slug-2", ...] }
```

#### 1.2 Update Build Script
- Parse wikilinks when generating articles.json
- Store outgoing links and incoming links (backlinks)

### Phase 2: Graph Visualization

#### 2.1 Create Graph Page (`src/pages/Graph.jsx`)
- Full-page force-directed graph
- Nodes = articles (sized by link count)
- Edges = connections (tags + wikilinks)
- Click node → navigate to article
- Hover → show article title

#### 2.2 Add Route
- `/graph` → GraphPage component

#### 2.3 Navigation
- Add "graph" link to nav bar

### Phase 3: UI/UX Enhancements

#### 3.1 Backlinks Section
- Show "Linked from" section at bottom of each article
- Display other articles that link TO this article

#### 3.2 Link Highlighting
- Render wikilinks in article content as clickable links

---

## Files to Create/Modify

### New Files
- `src/utils/graph.js` - Link extraction and graph data builder
- `src/pages/Graph.jsx` - Graph visualization page

### Modified Files
- `scripts/build-content.js` - Parse wikilinks
- `src/App.jsx` - Add /graph route
- `src/pages/Article.jsx` - Render wikilinks, show backlinks
- `src/pages/Home.jsx` - Add graph link to nav (optional)

---

## Technical Details

### Wikilink Parsing
- Regex: `/\[\[([^\]]+)\]\]/g`
- Convert `[[article-slug]]` to link `/articles/article-slug`
- Handle display text: `[[article-slug|display text]]`

### Graph Data Structure
```javascript
{
  nodes: [
    { id: "article-slug", title: "Article Title", linkCount: 5 }
  ],
  links: [
    { source: "article-slug", target: "related-slug" }
  ]
}
```

### D3.js Force Graph
- Force simulation with charge, center, link forces
- Drag nodes, zoom, pan
- Color coding by year or tag

---

## Questions for Implementation

1. Should wikilinks use exact slug matching or fuzzy matching?
2. How should orphan articles (no connections) appear in graph?
3. Limit to show? (e.g., top 50 most connected)

---

## Complexity Assessment

- **Medium complexity** - Parsing wikilinks is straightforward
- **Graph visualization** - D3.js has learning curve but manageable
- **Backlinks** - Simple array filtering

**Estimated time**: 2-3 hours for full implementation

---

*Ready to implement?*
