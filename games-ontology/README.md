# Games Ontology

An interactive knowledge graph that visualizes games and their relationships to genre, year, studio, publisher, engine, game mode, and features. Explore how games connect through shared attributes using a force-directed graph.

## Features

- **Force-directed graph** — Interactive D3.js v7 visualization with SVG rendering
- **8 node types** — Game, Genre, Year, Studio, Publisher, Engine, GameMode, Feature, each color-coded
- **Draggable nodes** — Reposition nodes to explore different layouts
- **Click to highlight** — Click a node to highlight its connections and dim unrelated nodes
- **Search and filter** — Find specific games or attributes
- **Zoom and pan** — Navigate large graphs smoothly
- **Detail panel** — Click a node to see all its relationships
- **Catppuccin Mocha theme** — Dark-only with color-coded node types

## How to Use

Open `index.html` in a web browser. Drag nodes to rearrange the graph. Click a node to highlight connections and view details. Use the search bar to filter specific games or attributes. Scroll to zoom, click and drag the background to pan.

## Files

| File | Description |
|------|-------------|
| `index.html` | HTML structure with D3 CDN, search bar, legend, and detail panel |
| `style.css` | Catppuccin Mocha styling |
| `script.js` | D3 force graph, data model, and interaction logic |
