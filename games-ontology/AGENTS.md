# AGENTS.md — Games Ontology

## Project Overview
An interactive knowledge graph web application that visualizes games and their relationships to various characteristics such as genre, year, studio, publisher, engine, game mode, and features. Users can explore how games connect through shared attributes. Uses **D3.js with SVG** for all graph rendering.

## File Structure
```
games-ontology/
├── index.html   — HTML structure with D3 CDN, search bar, legend, detail panel
├── style.css    — All styling (Catppuccin Mocha theme)
└── script.js    — D3 force graph, data model, interactions (all JSDoc annotated)
```

## Constraints

### Styling
- **Use Catppuccin Mocha palette** exclusively.
- **No light mode** — dark theme only, always.

### Code Organization
- **Separate CSS and JS from HTML.** Keep styles in `style.css` and logic in `script.js`; never inline them in `index.html`.
- Each file has a single responsibility.
- **JSDoc with type hints required.** All variables, constants, and functions must include JSDoc comments with proper `@typedef`, `@type`, parameter types, and return type annotations.

### Graph Visualization
- Render an interactive force-directed graph using **D3.js v7 with SVG** rendering (no raw Canvas)
- Nodes represent games (circles) and attributes (rounded rectangles)
- Edges represent relationships between games and their attributes
- Node colors vary by type (see Node Types & Colors table below)
- Users can drag nodes to reposition them
- Clicking a node highlights its connections and dims unrelated nodes
- Hovering shows a tooltip with node details
- **Labels inside shapes** — attribute node labels must be centered *inside* their rectangles; game node labels remain below circles
- **Relative, content-based sizing** — attribute rectangle width scales proportionally to label length (no fixed pixel dimensions or type-specific multipliers)
- **Collision radii are relative** — calculated from content size, not hardcoded

### Node Sizing Rules
- Attribute rectangle height is fixed (`TEXT_HEIGHT + vertical padding`)
- Attribute rectangle width calculated from label length using text-width formula: `label.length * BASE_FONT_SIZE * CHAR_WIDTH_FACTOR + horizontalPadding`
- Minimum width of 30 units ensures readability for very short labels
- No type-specific width multipliers (all attribute types use the same formula)

### Data Model
- Games have: name, year, genre(s), studio, publisher, engine, game mode, features
- Attribute types: `game`, `genre`, `year`, `studio`, `publisher`, `engine`, `gamemode`, `feature`
- Sample data included with 9 cataloged games demonstrating the graph

### Features
- Search/filter to highlight specific games or attributes
- Zoom and pan support on the SVG container
- Legend showing node types and their colors
- Collapsible detail panel on node selection showing all relationships

## Catppuccin Mocha Colors (Reference)
| Token      | Hex      | Usage                             |
|------------|----------|-----------------------------------|
| Base       | `#1e1e2e`| Main background                   |
| Mantle     | `#181825`| Container/surface bg              |
| Crust      | `#11111b`| Darkest elements                  |
| Surface 0  | `#313244`| Inputs, cards                     |
| Surface 1  | `#45475a`| Borders, dividers                 |
| Subtext 0  | `#a6adc8`| Labels, secondary text            |
| Text       | `#cdd6f4`| Primary text                      |
| Lavender   | `#b4befe`| Headings, studio nodes            |
| Blue       | `#89b4fa`| Buttons, focus borders, year nodes|
| Mauve      | `#cba6f7`| Section titles, game nodes        |
| Green      | `#a6e3a1`| Genre nodes                       |
| Red        | `#f38ba8`| Errors                            |
| Peach      | `#fab387`| Publisher nodes                   |
| Yellow     | `#f9e2af`| Engine nodes                      |
| Flint      | `#9399b2`| GameMode nodes                    |
| Rosewater  | `#f5c2e7`| Feature nodes                     |

## Node Types & Colors
| Node Type   | Color      | Shape              |
|-------------|------------|-------------------|
| Game        | Mauve      | Circle             |
| Genre       | Green      | Rounded rectangle  |
| Year        | Blue       | Rounded rectangle  |
| Studio      | Lavender   | Rounded rectangle  |
| Publisher   | Peach      | Rounded rectangle  |
| Engine      | Yellow     | Rounded rectangle  |
| GameMode    | Flint      | Rounded rectangle  |
| Feature     | Rosewater  | Rounded rectangle  |
