# AGENTS.md — Games Ontology

## Project Overview
Interactive knowledge graph visualizing games and their relationships (genre, year, studio, publisher, engine, game mode, features). Uses **D3.js v7 with SVG** rendering.

## Graph Visualization
- Force-directed graph: games as circles, attributes as rounded rectangles
- Node colors vary by type (see Node Types table)
- Drag nodes to reposition; click highlights connections and dims unrelated nodes
- Hover shows tooltip with node details
- **Labels inside shapes** — attribute labels centered *inside* rectangles; game labels below circles
- **Relative sizing** — attribute rectangle width scales to label length (no fixed pixels or type-specific multipliers)
- **Collision radii** — calculated from content size via `getCollisionRadius()`, not hardcoded

## Node Sizing Rules
- Attribute height: `TEXT_HEIGHT + vertical padding` (fixed)
- Attribute width: `label.length * BASE_FONT_SIZE * CHAR_WIDTH_FACTOR + horizontalPadding`
- Minimum width: 30 units; no type-specific width multipliers

## Force Simulation
- **Link distance:** 140 units
- **Charge:** `-700` (game nodes), `-350` (attribute nodes)
- **Center force:** 0.05; X/Y forces: 0.02

## Data Model
- Games: name, year, genre(s), studio, publisher, engine, game mode, features
- Attribute types: `game`, `genre`, `year`, `studio`, `publisher`, `engine`, `gamemode`, `feature`
- Sample data: 9 cataloged games

## Features
- Search/filter to highlight games or attributes
- Zoom and pan on SVG container
- Legend showing node types and colors
- Collapsible detail panel on node selection

## Node Types & Colors
| Node Type | Color   | Shape             |
|-----------|---------|-------------------|
| Game      | Mauve   | Circle            |
| Genre     | Green   | Rounded rectangle |
| Year      | Blue    | Rounded rectangle |
| Studio    | Lavender| Rounded rectangle |
| Publisher | Peach   | Rounded rectangle |
| Engine    | Yellow  | Rounded rectangle |
| GameMode  | Flint   | Rounded rectangle |
| Feature   | Rosewater| Rounded rectangle|
