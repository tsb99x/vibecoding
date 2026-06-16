// Games Ontology - Interactive Knowledge Graph
// D3.js v7 SVG force-directed graph

/* ============================================================================
   Type Definitions
   ========================================================================== */

/**
 * @typedef {'game' | 'genre' | 'year' | 'studio' | 'publisher' | 'engine' | 'gamemode' | 'feature'} NodeType
 */

/**
 * @typedef {Object} NodeData
 * @property {string} id - Unique node identifier
 * @property {NodeType} type - Node category
 * @property {string} label - Display name
 */

/**
 * @typedef {Object} LinkData
 * @property {string} source - Source node ID
 * @property {string} target - Target node ID
 * @property {string} [relation] - Relationship label
 */

/**
 * @typedef {Object} GameEntry
 * @property {string} title - Game name
 * @property {string} year - Release year
 * @property {string} studio - Developer studio
 * @property {string} publisher - Publisher
 * @property {string} engine - Rendering/engine technology
 * @property {string} gamemode - Primary game mode
 * @property {string[]} genre - Genre tags
 * @property {string[]} [features] - Feature tags
 */

/**
 * @typedef {Object} GraphData
 * @property {NodeData[]} nodes - All nodes in the graph
 * @property {LinkData[]} links - All edges in the graph
 */

/* ============================================================================
   Constants
   ========================================================================== */

/** @type {Record<NodeType, string>} Color mapping for each node type */
const NODE_COLORS = {
    game: '#cba6f7',     // Mauve
    genre: '#a6e3a1',    // Green
    year: '#89b4fa',     // Blue
    studio: '#b4befe',   // Lavender
    publisher: '#fab387',// Peach
    engine: '#f9e2af',   // Yellow
    gamemode: '#9399b2', // Flint
    feature: '#f5c2e7',  // Rosewater
};

/** @type {Record<NodeType, string>} Human-readable labels for node types */
const NODE_TYPE_LABELS = {
    game: 'Game',
    genre: 'Genre',
    year: 'Year',
    studio: 'Studio',
    publisher: 'Publisher',
    engine: 'Engine',
    gamemode: 'Game Mode',
    feature: 'Feature',
};

/** @type {Record<string, string>} Display name mapping (kebab/camelcase to readable) */
const DISPLAY_NAMES = {
    'action_adventure': 'Action-Adventure',
    'action_rpg': 'Action RPG',
    'space_combat': 'Space Combat',
    'racing': 'Racing',
    'singleplayer': 'Single Player',
    'multiplayer': 'Multi Player',
    'single_and_multiplayer': 'Single & Multi Player',
    'open_world': 'Open World',
    'trading': 'Trading',
    'avalanche_studios': 'Avalanche Studios',
    'eden_games': 'Eden Games',
    'rockfish_games': 'Rockfish Games',
    'playground_games': 'Playground Games',
    'digital_anvil': 'Digital Anvil',
    'criterion_games': 'Criterion Games',
    'saber_interactive_russia': 'Saber Interactive Russia',
    'cd_project_red': 'CD Project Red',
    'eidos': 'Eidos',
    'atari': 'Atari',
    'xbox_game_studios': 'Xbox Game Studios',
    'microsoft_game_studios': 'Microsoft Game Studios',
    'electronic_arts': 'Electronic Arts',
    'focus_home_interactive': 'Focus Home Interactive',
    'avalanche_engine_1_0': 'Avalanche Engine 1.0',
    'twilight_2': 'Twilight 2',
    'unreal_engine_4': 'Unreal Engine 4',
    'unreal_engine_5': 'Unreal Engine 5',
    'forza_tech': 'Forza Tech',
    'unknown_engine': 'Unknown',
    'renderware': 'RenderWare',
    'swarm_engine': 'Swarm Engine',
    'redengine_4': 'REDengine 4',
};

/* ============================================================================
   Game Catalog Data
   ========================================================================== */

/** @type {GameEntry[]} Game catalog entries */
const GAMES = [
    {
        title: 'Just Cause',
        year: '2006',
        studio: 'avalanche_studios',
        publisher: 'eidos',
        engine: 'avalanche_engine_1_0',
        gamemode: 'multiplayer',
        genre: ['action_adventure'],
        features: ['open_world'],
    },
    {
        title: 'Test Drive Unlimited',
        year: '2007',
        studio: 'eden_games',
        publisher: 'atari',
        engine: 'twilight_2',
        gamemode: 'singleplayer',
        genre: ['racing'],
        features: ['open_world'],
    },
    {
        title: 'Everspace',
        year: '2017',
        studio: 'rockfish_games',
        publisher: 'rockfish_games',
        engine: 'unreal_engine_4',
        gamemode: 'singleplayer',
        genre: ['space_combat'],
    },
    {
        title: 'Everspace 2',
        year: '2023',
        studio: 'rockfish_games',
        publisher: 'rockfish_games',
        engine: 'unreal_engine_5',
        gamemode: 'singleplayer',
        genre: ['space_combat'],
    },
    {
        title: 'Forza Horizon 5',
        year: '2021',
        studio: 'playground_games',
        publisher: 'xbox_game_studios',
        engine: 'forza_tech',
        gamemode: 'single_and_multiplayer',
        genre: ['racing'],
        features: ['open_world'],
    },
    {
        title: 'Freelancer',
        year: '2003',
        studio: 'digital_anvil',
        publisher: 'microsoft_game_studios',
        engine: 'unknown_engine',
        gamemode: 'singleplayer',
        genre: ['space_combat'],
        features: ['trading', 'open_world'],
    },
    {
        title: 'Burnout Paradise Remastered',
        year: '2018',
        studio: 'criterion_games',
        publisher: 'electronic_arts',
        engine: 'renderware',
        gamemode: 'multiplayer',
        genre: ['racing'],
        features: ['open_world'],
    },
    {
        title: 'SnowRunner',
        year: '2020',
        studio: 'saber_interactive_russia',
        publisher: 'focus_home_interactive',
        engine: 'swarm_engine',
        gamemode: 'singleplayer',
        genre: ['action_adventure'],
    },
    {
        title: 'Cyberpunk 2077',
        year: '2020',
        studio: 'cd_project_red',
        publisher: 'cd_project_red',
        engine: 'redengine_4',
        gamemode: 'singleplayer',
        genre: ['action_rpg'],
        features: ['open_world'],
    },
];

/* ============================================================================
   Utility Functions
   ========================================================================== */

/**
 * Convert a display title to a slug ID.
 * @param {string} title - Display name
 * @returns {string} Slug identifier
 */
function slugify(title) {
    return title.toLowerCase().replace(/[^a-z0-9]+/g, '_').replace(/^_|_$/g, '');
}

/**
 * Get a human-readable display name for an ID.
 * @param {string} id - Node ID
 * @returns {string} Display name
 */
function displayLabel(id) {
    return DISPLAY_NAMES[id] || id.replace(/_/g, ' ');
}

/* ============================================================================
   Graph Data Builder
   ========================================================================== */

/**
 * Build the complete graph data structure from game entries.
 * @returns {GraphData} Nodes and links arrays
 */
function buildGraph() {
    /** @type {NodeData[]} */
    const nodes = [];
    /** @type {LinkData[]} */
    const links = [];

    /** @type {Set<string>} Track node IDs to avoid duplicates */
    const nodeIds = new Set();

    /**
     * Add a node if it doesn't exist yet.
     * @param {string} id - Node ID
     * @param {NodeType} type - Node type
     * @param {string} label - Display label
     */
    function addNode(id, type, label) {
        if (!nodeIds.has(id)) {
            nodeIds.add(id);
            nodes.push({ id, type, label });
        }
    }

    // Create nodes and links for each game
    for (const game of GAMES) {
        const gameId = slugify(game.title);

        addNode(gameId, 'game', game.title);
        addNode(game.year, 'year', game.year);
        addNode(game.studio, 'studio', displayLabel(game.studio));
        addNode(game.publisher, 'publisher', displayLabel(game.publisher));
        addNode(game.engine, 'engine', displayLabel(game.engine));
        addNode(game.gamemode, 'gamemode', displayLabel(game.gamemode));

        for (const g of game.genre) {
            addNode(g, 'genre', displayLabel(g));
        }

        if (game.features) {
            for (const f of game.features) {
                addNode(f, 'feature', displayLabel(f));
            }
        }

        // Links: game -> attributes
        links.push({ source: gameId, target: game.year });
        links.push({ source: gameId, target: game.studio, relation: 'developed-by' });
        links.push({ source: gameId, target: game.publisher, relation: 'published-by' });
        links.push({ source: gameId, target: game.engine, relation: 'uses' });
        links.push({ source: gameId, target: game.gamemode, relation: 'mode' });

        for (const g of game.genre) {
            links.push({ source: gameId, target: g, relation: 'genre' });
        }

        if (game.features) {
            for (const f of game.features) {
                links.push({ source: gameId, target: f, relation: 'feature' });
            }
        }

    }

    return { nodes, links };
}

/* ============================================================================
   D3 Graph Rendering
   ========================================================================== */

/** @type {d3.Simulation<d3.SimulationNodeDatum, undefined> | null} Current simulation instance */
let simulation = null;

/** @type {d3.Selection<SVGSVGElement, {}, undefined, undefined>} Main SVG reference */
let svg = null;

/** @type {d3.ZoomTransition<d3.Selection<SVGSVGElement, {}, undefined, undefined>, {}> | null} Zoom behavior */
let zoom = null;

/** @type {d3.Selection<SVGGElement, d3.SimulationNodeDatum, HTMLElement, undefined>} Nodes group */
let nodeGroups = null;

/** @type {d3.Selection<SVGLineElement, d3.SimulationLinkDatum<d3.SimulationNodeDatum>, HTMLElement, undefined>} Links group */
let linkElements = null;

/** @type {GraphData} Current graph data */
let graphData = null;

/** @type {string | null} Currently selected node ID */
let selectedNodeId = null;

/**
 * Initialize and render the force-directed graph.
 */
function initGraph() {
    const container = document.getElementById('graph-container');
    const width = container.clientWidth;
    const height = container.clientHeight;

    // Build graph data
    graphData = buildGraph();

    // Create SVG element
    svg = d3.select('#graph-container')
        .append('svg')
        .attr('width', width)
        .attr('height', height)
        .attr('viewBox', [0, 0, width, height]);

    // Glow filter for highlighted nodes
    const defs = svg.append('defs');
    const filter = defs.append('filter').attr('id', 'glow');
    filter.append('feGaussianBlur').attr('stdDeviation', '3').attr('result', 'coloredBlur');
    const feMerge = filter.append('feMerge');
    feMerge.append('feMergeNode').attr('in', 'coloredBlur');
    feMerge.append('feMergeNode').attr('in', 'SourceGraphic');

    // Main group for zoomable content
    const graphGroup = svg.append('g');

    // Zoom and pan behavior
    zoom = d3.zoom()
        .scaleExtent([0.2, 4])
        .on('zoom', (event) => {
            graphGroup.attr('transform', event.transform);
        });

    svg.call(zoom);

    // Center the graph initially
    const initialTransform = d3.zoomIdentity
        .translate(width / 2, height / 2)
        .scale(0.85);
    svg.call(zoom.transform, initialTransform);

    // Create link elements
    linkElements = graphGroup.append('g')
        .attr('class', 'links')
        .selectAll('line')
        .data(graphData.links)
        .join('line')
        .attr('class', 'link');

    // Create node groups
    nodeGroups = graphGroup.append('g')
        .attr('class', 'nodes')
        .selectAll('g')
        .data(graphData.nodes)
        .join('g')
        .attr('class', 'node-group');

    // Relative sizing constants (in SVG user units)
    const H_PADDING = 10;   // horizontal padding inside rectangle
    const V_PADDING = 6;    // vertical padding inside rectangle
    const TEXT_HEIGHT = 14; // approximate text height

    // Sizing constants
    const BASE_FONT_SIZE = 9;  // matches .node-label-attribute font-size
    const CHAR_WIDTH_FACTOR = 0.6; // approximate character width factor at 9px
    const MIN_NODE_RADIUS = 15; // minimum collision radius for attribute nodes

    /**
     * Get width of a node's rectangle based on its label length.
     * @param {string} label - Label text
     * @param {NodeType} type - Node type
     * @returns {number} Rectangle width
     */
    function getNodeWidthByLabel(label) {
        const textWidth = label.length * BASE_FONT_SIZE * CHAR_WIDTH_FACTOR;
        const horizontalPad = H_PADDING * 2;
        return Math.max(textWidth + horizontalPad, 30);
    }

    /**
     * Get collision radius for a node based on its type and size.
     * @param {d3.SimulationNodeDatum} d - Node data
     * @returns {number} Collision radius
     */
    function getCollisionRadius(d) {
        if (d.type === 'game') return 20;
        const w = getNodeWidthByLabel(d.label);
        return Math.max(w / 2 + 5, MIN_NODE_RADIUS);
    }

    // Draw node shapes
    nodeGroups.each(function (node) {
        /** @type {d3.Selection<SVGGElement, d3.SimulationNodeDatum, HTMLElement, undefined>} */
        const g = d3.select(this);
        if (node.type === 'game') {
            g.append('circle')
                .attr('class', 'node-shape')
                .attr('r', 10)
                .attr('fill', NODE_COLORS[node.type])
                .attr('stroke', 'transparent')
                .attr('stroke-width', 1.5);
        } else {
            const nodeW = getNodeWidthByLabel(node.label);
            const nodeH = TEXT_HEIGHT + V_PADDING * 2;
            g.append('rect')
                .attr('class', 'node-shape')
                .attr('x', -nodeW / 2)
                .attr('y', -nodeH / 2)
                .attr('width', nodeW)
                .attr('height', nodeH)
                .attr('rx', 5)
                .attr('ry', 5)
                .attr('fill', NODE_COLORS[node.type])
                .attr('stroke', 'transparent')
                .attr('stroke-width', 1.5);
        }
    });

    // Add labels for game nodes (below circles)
    nodeGroups.filter((d) => d.type === 'game')
        .append('text')
        .attr('class', 'node-label node-label-game')
        .attr('dy', 20)
        .text((d) => d.label);

    // Labels for attribute nodes (inside rectangles) — no truncation needed, width is relative
    nodeGroups.filter((d) => d.type !== 'game')
        .append('text')
        .attr('class', 'node-label node-label-attribute')
        .attr('dy', 0)
        .text((d) => d.label);

    // Force simulation
    simulation = d3.forceSimulation(graphData.nodes)
        .force('link', d3.forceLink(graphData.links).id((d) => d.id).distance(140))
        .force('charge', d3.forceManyBody().strength((d) => {
            if (d.type === 'game') return -700;
            return -350;
        }))
        .force('center', d3.forceCenter(0, 0).strength(0.05))
        .force('collide', d3.forceCollide(getCollisionRadius))
        .force('x', d3.forceX(0).strength(0.02))
        .force('y', d3.forceY(0).strength(0.02))
        .on('tick', ticked);

    // Drag behavior
    /** @type {d3.DragBehavior<HTMLElement, d3.SimulationNodeDatum, d3.SimulationNodeDatum>} */
    const drag = d3.drag()
        .on('start', dragStarted)
        .on('drag', dragged)
        .on('end', dragEnded);

    nodeGroups.call(drag);

    // Click handler for highlight
    nodeGroups.on('click', (event, d) => {
        event.stopPropagation();
        handleNodeClick(d);
    });

    // Click on background to clear selection
    svg.on('click', () => {
        clearSelection();
    });

    // Hover tooltip
    const tooltip = document.getElementById('tooltip');

    nodeGroups.on('mouseenter', (event, d) => {
        const typeName = NODE_TYPE_LABELS[d.type] || d.type;
        tooltip.innerHTML = `
            <div class="tooltip-name">${d.label}</div>
            <div class="tooltip-type">${typeName}</div>
        `;
        tooltip.classList.add('visible');
    });

    nodeGroups.on('mousemove', (event) => {
        const x = event.clientX + 14;
        const y = event.clientY - 10;
        tooltip.style.left = x + 'px';
        tooltip.style.top = y + 'px';
    });

    nodeGroups.on('mouseleave', () => {
        tooltip.classList.remove('visible');
    });
}

/**
 * Called on each simulation tick to update positions.
 */
function ticked() {
    if (!linkElements || !nodeGroups) return;

    linkElements
        .attr('x1', (d) => d.source.x)
        .attr('y1', (d) => d.source.y)
        .attr('x2', (d) => d.target.x)
        .attr('y2', (d) => d.target.y);

    nodeGroups.attr('transform', (d) => `translate(${d.x},${d.y})`);
}

/**
 * Drag start handler.
 * @param {d3.DragEvent<HTMLElement, d3.SimulationNodeDatum, d3.SimulationNodeDatum>} event
 */
function dragStarted(event) {
    if (!simulation) return;
    if (!event.active) simulation.alphaTarget(0.3).restart();
    event.subject.fx = event.subject.x;
    event.subject.fy = event.subject.y;
}

/**
 * Drag handler.
 * @param {d3.DragEvent<HTMLElement, d3.SimulationNodeDatum, d3.SimulationNodeDatum>} event
 */
function dragged(event) {
    event.subject.fx = event.x;
    event.subject.fy = event.y;
}

/**
 * Drag end handler.
 * @param {d3.DragEvent<HTMLElement, d3.SimulationNodeDatum, d3.SimulationNodeDatum>} event
 */
function dragEnded(event) {
    if (!simulation) return;
    if (!event.active) simulation.alphaTarget(0);
    // Keep node pinned where dropped
    // event.subject.fx = null;
    // event.subject.fy = null;
}

/* ============================================================================
   Node Click & Highlight Logic
   ========================================================================== */

/**
 * Handle clicking on a node — highlight connections, populate detail panel.
 * @param {d3.SimulationNodeDatum} nodeData
 */
function handleNodeClick(nodeData) {
    if (!graphData || !nodeGroups || !linkElements) return;

    selectedNodeId = nodeData.id;

    // Find all connected node IDs
    const connectedIds = new Set();
    connectedIds.add(nodeData.id);

    /** @type {Set<string>} Connected link keys */
    const connectedLinkKeys = new Set();

    for (const link of graphData.links) {
        const sourceId = typeof link.source === 'object' ? link.source.id : link.source;
        const targetId = typeof link.target === 'object' ? link.target.id : link.target;
        const linkKey = sourceId + '|' + targetId;

        if (sourceId === nodeData.id || targetId === nodeData.id) {
            connectedIds.add(sourceId);
            connectedIds.add(targetId);
            connectedLinkKeys.add(linkKey);
        }
    }

    // Apply dim/highlight classes
    nodeGroups.classed('graph-dimmed', (d) => !connectedIds.has(d.id));
    nodeGroups.classed('graph-highlighted', (d) => connectedIds.has(d.id));

    linkElements.classed('graph-dimmed', (d) => {
        const sourceId = typeof d.source === 'object' ? d.source.id : d.source;
        const targetId = typeof d.target === 'object' ? d.target.id : d.target;
        return !connectedLinkKeys.has(sourceId + '|' + targetId);
    });
    linkElements.classed('graph-highlighted', (d) => {
        const sourceId = typeof d.source === 'object' ? d.source.id : d.source;
        const targetId = typeof d.target === 'object' ? d.target.id : d.target;
        return connectedLinkKeys.has(sourceId + '|' + targetId);
    });

    // Populate detail panel
    populateDetailPanel(nodeData, connectedIds);
}

/**
 * Clear all selection highlighting.
 */
function clearSelection() {
    selectedNodeId = null;

    if (nodeGroups) {
        nodeGroups.classed('graph-dimmed', false);
        nodeGroups.classed('graph-highlighted', false);
    }

    if (linkElements) {
        linkElements.classed('graph-dimmed', false);
        linkElements.classed('graph-highlighted', false);
    }

    clearDetailPanel();
}

/* ============================================================================
   Detail Panel
   ========================================================================== */

/**
 * Populate the sidebar detail panel with node relationship info.
 * @param {d3.SimulationNodeDatum} nodeData - Selected node
 * @param {Set<string>} connectedIds - Connected node IDs (unused, for extensibility)
 */
function populateDetailPanel(nodeData, _connectedIds) {
    const panel = document.getElementById('detail-panel');
    const titleEl = document.getElementById('detail-title');
    const bodyEl = document.getElementById('detail-body');
    const closeBtn = document.getElementById('detail-close');

    titleEl.textContent = nodeData.label;
    closeBtn.classList.remove('hidden');

    const typeName = NODE_TYPE_LABELS[nodeData.type] || nodeData.type;

    let html = `<div class="detail-section">
        <div class="detail-label">Type</div>
        <div class="detail-value" style="color: ${NODE_COLORS[nodeData.type]}">${typeName}</div>
    </div>`;

    // Gather relationships for this node
    if (!graphData) return;

    /** @type {Map<string, string[]>} Category -> related node labels */
    const relationships = new Map();

    for (const link of graphData.links) {
        const sourceId = typeof link.source === 'object' ? link.source.id : link.source;
        const targetId = typeof link.target === 'object' ? link.target.id : link.target;

        let relatedId = null;
        if (sourceId === nodeData.id) relatedId = targetId;
        else if (targetId === nodeData.id) relatedId = sourceId;

        if (relatedId) {
            const relatedNode = graphData.nodes.find((n) => n.id === relatedId);
            if (!relatedNode) continue;

            const category = link.relation || relatedNode.type;
            if (!relationships.has(category)) {
                relationships.set(category, []);
            }
            relationships.get(category).push(relatedNode.label);
        }
    }

    for (const [category, labels] of relationships) {
        const categoryLabel = NODE_TYPE_LABELS[category] || category;
        html += `<div class="detail-section">
            <div class="detail-label">${categoryLabel}</div>
            <ul class="detail-list">`;
        for (const lbl of labels) {
            html += `<li>${lbl}</li>`;
        }
        html += `</ul></div>`;
    }

    bodyEl.innerHTML = html;
}

/**
 * Clear the detail panel content.
 */
function clearDetailPanel() {
    const titleEl = document.getElementById('detail-title');
    const bodyEl = document.getElementById('detail-body');
    const closeBtn = document.getElementById('detail-close');

    titleEl.textContent = 'Node Details';
    bodyEl.innerHTML = '<p class="detail-placeholder">Click a node to see its details</p>';
    closeBtn.classList.add('hidden');
}

/* ============================================================================
   Legend
   ========================================================================== */

/**
 * Render the legend panel in the sidebar.
 */
function renderLegend() {
    const legendEl = document.getElementById('legend');
    let html = '';

    for (const [type, color] of Object.entries(NODE_COLORS)) {
        const label = NODE_TYPE_LABELS[type] || type;
        const shapeClass = type === 'game' ? 'legend-swatch circle' : 'legend-swatch';
        html += `<div class="legend-item">
            <div class="${shapeClass}" style="background-color: ${color}"></div>
            <span>${label}</span>
        </div>`;
    }

    legendEl.innerHTML = html;
}

/* ============================================================================
   Search
   ========================================================================== */

/**
 * Handle search input filtering.
 */
function initSearch() {
    const input = document.getElementById('search-input');
    const clearBtn = document.getElementById('search-clear');

    if (!input || !clearBtn) return;

    input.addEventListener('input', () => {
        const query = input.value.trim().toLowerCase();
        clearBtn.classList.toggle('hidden', query.length === 0);
        applySearchFilter(query);
    });

    clearBtn.addEventListener('click', () => {
        input.value = '';
        clearBtn.classList.add('hidden');
        applySearchFilter('');
        input.focus();
    });
}

/**
 * Apply search filter to highlight matching nodes.
 * @param {string} query - Search query (lowercased)
 */
function applySearchFilter(query) {
    if (!nodeGroups || !linkElements || !graphData) return;

    if (!query) {
        // Clear all search highlighting
        nodeGroups.classed('search-highlight', false);
        nodeGroups.classed('search-dimmed', false);
        linkElements.classed('search-dimmed', false);
        return;
    }

    /** @type {Set<string>} Matching node IDs */
    const matchIds = new Set();

    for (const node of graphData.nodes) {
        const searchable = [
            node.id,
            node.label,
            NODE_TYPE_LABELS[node.type],
            node.type,
        ].join(' ').toLowerCase();

        if (searchable.includes(query)) {
            matchIds.add(node.id);
        }
    }

    // Also include connected nodes of matches
    const expandedIds = new Set(matchIds);
    for (const link of graphData.links) {
        const sourceId = typeof link.source === 'object' ? link.source.id : link.source;
        const targetId = typeof link.target === 'object' ? link.target.id : link.target;
        if (matchIds.has(sourceId)) expandedIds.add(targetId);
        if (matchIds.has(targetId)) expandedIds.add(sourceId);
    }

    nodeGroups.classed('search-highlight', (d) => matchIds.has(d.id));
    nodeGroups.classed('search-dimmed', (d) => !expandedIds.has(d.id));

    const linkKeys = new Set();
    for (const link of graphData.links) {
        const sourceId = typeof link.source === 'object' ? link.source.id : link.source;
        const targetId = typeof link.target === 'object' ? link.target.id : link.target;
        if (matchIds.has(sourceId) || matchIds.has(targetId)) {
            linkKeys.add(sourceId + '|' + targetId);
        }
    }

    linkElements.classed('search-dimmed', (d) => {
        const sourceId = typeof d.source === 'object' ? d.source.id : d.source;
        const targetId = typeof d.target === 'object' ? d.target.id : d.target;
        return !linkKeys.has(sourceId + '|' + targetId);
    });
}

/* ============================================================================
   Window Resize Handler
   ========================================================================== */

/**
 * Handle container resize — update SVG dimensions and simulation center.
 */
function handleResize() {
    const container = document.getElementById('graph-container');
    if (!container || !svg || !simulation) return;

    const width = container.clientWidth;
    const height = container.clientHeight;

    svg.attr('width', width).attr('height', height);

    simulation.force('center', d3.forceCenter(0, 0).strength(0.05));
    simulation.alpha(0.3).restart();
}

/* ============================================================================
   Close Button Handler
   ========================================================================== */

/**
 * Initialize the detail panel close button.
 */
function initCloseButton() {
    const btn = document.getElementById('detail-close');
    if (btn) {
        btn.addEventListener('click', clearSelection);
    }
}

/* ============================================================================
   Initialization
   ========================================================================== */

/**
 * Main entry point — initialize all components.
 */
function init() {
    renderLegend();
    initGraph();
    initSearch();
    initCloseButton();

    // Debounced resize handler
    /** @type {number | undefined} Resize timeout reference */
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = window.setTimeout(handleResize, 200);
    });
}

// Run on DOM ready
document.addEventListener('DOMContentLoaded', init);