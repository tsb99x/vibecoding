// Game types
/** @typedef {{ id: string, name: string, description: string[] | ((GameState) => string[]), choices: Choice[] | ((GameState) => Choice[]), onEnter?: (GameState) => void }} Room */
/** @typedef {{ text: string, action: string, condition?: (GameState) => boolean, requiredItem?: string }} Choice */
/** @typedef {{ currentRoom: string, inventory: string[], health: number, maxHealth: number, visitedRooms: string[], flags: Record<string, boolean>, steps: number, itemsFound: string[] }} GameState */

// DOM elements
/** @type {HTMLElement} */
const startScreen = document.getElementById('startScreen');
/** @type {HTMLElement} */
const gameScreen = document.getElementById('gameScreen');
/** @type {HTMLElement} */
const endingScreen = document.getElementById('endingScreen');
/** @type {HTMLElement} */
const roomTitle = document.getElementById('roomTitle');
/** @type {HTMLElement} */
const narrative = document.getElementById('narrative');
/** @type {HTMLElement} */
const choices = document.getElementById('choices');
/** @type {HTMLElement} */
const healthBar = document.getElementById('healthBar');
/** @type {HTMLElement} */
const healthValue = document.getElementById('healthValue');
/** @type {HTMLElement} */
const inventoryList = document.getElementById('inventoryList');
/** @type {HTMLElement} */
const inventoryEmpty = document.getElementById('inventoryEmpty');
/** @type {HTMLElement} */
const endingTitle = document.getElementById('endingTitle');
/** @type {HTMLElement} */
const endingNarrative = document.getElementById('endingNarrative');
/** @type {HTMLElement} */
const endingStats = document.getElementById('endingStats');
/** @type {HTMLButtonElement} */
const startButton = document.getElementById('startButton');
/** @type {HTMLButtonElement} */
const restartButton = document.getElementById('restartButton');

// Item definitions
/** @type {Record<string, { name: string, description: string }>} */
const ITEMS = {
    medkit: { name: 'Medkit', description: 'Emergency medical supplies' },
    flashlight: { name: 'Flashlight', description: 'Rechargeable LED flashlight' },
    wrench: { name: 'Wrench', description: 'Heavy-duty engineering wrench' },
    oxygenTank: { name: 'Oxygen Tank', description: 'Portable oxygen supply' },
    overrideCode: { name: 'Override Code', description: 'Security bypass code: OMEGA-7-9' },
    criticalComponent: { name: 'Critical Component', description: 'Fusion reactor stabilization module' },
    crewLog: { name: 'Crew Log', description: 'Personal log entries from the crew' },
    repairManual: { name: 'Repair Manual', description: 'Station emergency repair procedures' },
};

// Room definitions
/** @type {Record<string, Room>} */
const ROOMS = {
    cryoBay: {
        id: 'cryoBay',
        name: 'Cryo Bay',
        description: (state) => {
            const lines = [
                'Cold seeps through the floor as you stumble from the cryo-pod. Frost clings to the walls in jagged patterns. The bay lights flicker between amber and dead.',
                'Seven cryo-pods line the room. Yours is the only one with a green status light. The other six read: <span class="warning">LIFE SIGNS LOST</span>.'
            ];
            if (!state.flags.tookMedkit) {
                lines.push('On the medical station nearby, a <span class="highlight">medkit</span> sits untouched.');
            } else {
                lines.push('The medical station sits empty where the medkit was.');
            }
            return lines;
        },
        choices: (state) => {
            const c = [];
            if (!state.flags.tookMedkit) {
                c.push({ text: '> Take the medkit', action: 'take_medkit' });
            }
            c.push({ text: '> Head to the central corridor', action: 'go_centralCorridor' });
            return c;
        },
        onEnter: (state) => {
            if (state.inventory.includes('medkit') && state.health < state.maxHealth) {
                state.flags.tookMedkit = true;
            }
        }
    },

    centralCorridor: {
        id: 'centralCorridor',
        name: 'Central Corridor',
        description: (state) => {
            const lines = [
                'The central corridor stretches in four directions, illuminated by emergency lighting. Sparks occasionally fly from a ruptured conduit overhead.'
            ];
            if (!state.flags.powerRestored) {
                lines.push('<span class="warning">WARNING: Station power is at 12%. Most systems are offline.</span>');
            } else {
                lines.push('<span class="success">Power restored. Lights hum steadily. Life support is functioning.</span>');
            }
            lines.push('Doors lead to: Command Bridge (forward), Engineering (left), Storage (right), Med Bay (aft).');
            if (state.flags.powerRestored) {
                lines.push('A newly unlocked passage leads toward the Airlock.');
            }
            return lines;
        },
        choices: (state) => {
            const c = [
                { text: '> Go to Command Bridge', action: 'go_commandBridge' },
                { text: '> Go to Engineering', action: 'go_engineering' },
                { text: '> Go to Storage', action: 'go_storage' },
                { text: '> Go to Med Bay', action: 'go_medBay' },
                { text: '> Return to Cryo Bay', action: 'go_cryoBay' },
            ];
            if (state.flags.powerRestored) {
                c.push({ text: '> Go to Airlock', action: 'go_airlock' });
            }
            return c;
        }
    },

    commandBridge: {
        id: 'commandBridge',
        name: 'Command Bridge',
        description: (state) => {
            const lines = [];
            if (!state.flags.powerRestored) {
                lines.push('The Command Bridge is dark. The main navigation console reads <span class="warning">NO POWER</span>. Without power, you cannot operate the station\'s systems.');
                lines.push('A small hatch in the ceiling leads to the Observation Deck.');
            } else {
                lines.push('The Command Bridge lights up as you enter. The main console flickers to life.');
                if (!state.flags.hasComponent) {
                    lines.push('The navigation system is online, but the station control interface displays: <span class="warning">FUSION REACTOR UNSTABLE — CRITICAL COMPONENT MISSING</span>.');
                    lines.push('The station needs a stabilization module from the Reactor Room to be fully repaired.');
                } else {
                    lines.push('<span class="discovery">The station control interface is awaiting input. With the stabilization module installed and power restored, you can attempt to repair the station.</span>');
                }
                lines.push('A hatch leads to the Observation Deck.');
            }
            return lines;
        },
        choices: (state) => {
            const c = [
                { text: '> Climb to Observation Deck', action: 'go_observationDeck' },
                { text: '> Return to Central Corridor', action: 'go_centralCorridor' },
            ];
            if (state.flags.powerRestored && state.flags.hasComponent) {
                c.unshift({ text: '> ⚡ Attempt station repair', action: 'repair_station' });
            }
            return c;
        }
    },

    observationDeck: {
        id: 'observationDeck',
        name: 'Observation Deck',
        description: () => {
            return [
                'The Observation Deck offers a panoramic view of space through thick reinforced glass. A distant planet fills most of the view — close enough to see storms churning in its atmosphere.',
                'Something is wrong. Debris floats near the station\'s hull. A micrometeoroid strike — that\'s what damaged the station.',
                'Scratched into the glass, someone wrote: <span class="discovery">"AI went hostile after impact. Server Room is locked down. Override code is the only way back in."</span>',
                'The airlock to the outside of the station is visible through a viewport, on the far side of the station.'
            ];
        },
        choices: () => {
            return [
                { text: '> Return to Command Bridge', action: 'go_commandBridge' }
            ];
        }
    },

    engineering: {
        id: 'engineering',
        name: 'Engineering',
        description: (state) => {
            const lines = [];
            if (!state.flags.powerRestored) {
                lines.push('Engineering is a maze of pipes and conduits. The main power generator sits in the center, its status panel flashing red.');
                lines.push('The generator\'s access panel is sealed with a heavy bolt. It would require a <span class="highlight">wrench</span> to open and restart the generator.');
            } else {
                lines.push('<span class="success">The power generator hums steadily. You\'ve restored station power.</span>');
            }
            lines.push('A heavy blast door leads to the Reactor Room.');
            if (!state.flags.hasOxygen) {
                lines.push('<span class="warning">The reactor door requires an oxygen tank for the sealed environment.</span>');
            }
            return lines;
        },
        choices: (state) => {
            const c = [];
            if (!state.flags.powerRestored && state.inventory.includes('wrench')) {
                c.push({ text: '> 🔧 Use wrench to restart the generator', action: 'fix_generator' });
            }
            c.push({ text: '> Enter Reactor Room', action: 'go_reactorRoom', condition: () => state.flags.hasOxygen });
            c.push({ text: '> Return to Central Corridor', action: 'go_centralCorridor' });
            c.push({ text: '> Go to Server Room', action: 'go_serverRoom' });
            return c;
        }
    },

    reactorRoom: {
        id: 'reactorRoom',
        name: 'Reactor Room',
        description: (state) => {
            const lines = [
                'The Reactor Room is oppressive — heat radiates from the fusion core, and the air tastes metallic. Radiation warning lights pulse red.'
            ];
            if (!state.flags.tookComponent) {
                lines.push('Among the scattered debris, a <span class="highlight">critical component</span> glints — the fusion reactor stabilization module, knocked loose in the impact.');
                lines.push('<span class="warning">Radiation is at dangerous levels. Every moment here costs you health.</span>');
            } else {
                lines.push('The stabilization module is gone from where it lay. The reactor still radiates dangerous levels.');
            }
            return lines;
        },
        choices: (state) => {
            const c = [];
            if (!state.flags.tookComponent) {
                c.push({ text: '> Take the critical component (takes time, radiation exposure)', action: 'take_component' });
            }
            c.push({ text: '> Leave the Reactor Room immediately', action: 'go_engineering' });
            return c;
        },
        onEnter: (state) => {
            if (!state.flags.tookComponent) {
                state.health = Math.max(0, state.health - 15);
            }
        }
    },

    storage: {
        id: 'storage',
        name: 'Storage',
        description: (state) => {
            const lines = [
                'The storage room contains sealed supply crates and maintenance equipment racks.'
            ];
            if (!state.flags.tookFlashlight) {
                lines.push('On a tool rack, a <span class="highlight">flashlight</span> hangs beside empty hooks.');
            }
            if (!state.flags.tookWrench) {
                lines.push('A heavy <span class="highlight">wrench</span> sits on the workbench.');
            }
            if (state.flags.tookFlashlight && state.flags.tookWrench) {
                lines.push('The racks are bare where tools used to hang.');
            }
            return lines;
        },
        choices: (state) => {
            const c = [];
            if (!state.flags.tookFlashlight) {
                c.push({ text: '> Take the flashlight', action: 'take_flashlight' });
            }
            if (!state.flags.tookWrench) {
                c.push({ text: '> Take the wrench', action: 'take_wrench' });
            }
            c.push({ text: '> Return to Central Corridor', action: 'go_centralCorridor' });
            return c;
        }
    },

    medBay: {
        id: 'medBay',
        name: 'Med Bay',
        description: (state) => {
            const lines = [
                'The Medical Bay is eerily quiet. Surgical equipment stands frozen mid-procedure, as if the staff vanished instantly. Blood stains the floor near one of the examination tables.'
            ];
            if (!state.flags.tookOxygen) {
                lines.push('A portable <span class="highlight">oxygen tank</span> sits mounted on the wall.');
            }
            if (!state.flags.tookMedkit2) {
                lines.push('Another <span class="highlight">medkit</span> is inside the emergency cabinet.');
            }
            if (state.flags.tookOxygen && state.flags.tookMedkit2) {
                lines.push('The supplies have been gathered. The bay is empty.');
            }
            lines.push('A door leads to the Living Quarters.');
            return lines;
        },
        choices: (state) => {
            const c = [];
            if (!state.flags.tookOxygen) {
                c.push({ text: '> Take the oxygen tank', action: 'take_oxygen' });
            }
            if (!state.flags.tookMedkit2) {
                c.push({ text: '> Take the medkit', action: 'take_medkit2' });
            }
            c.push({ text: '> Go to Living Quarters', action: 'go_livingQuarters' });
            c.push({ text: '> Return to Central Corridor', action: 'go_centralCorridor' });
            return c;
        }
    },

    livingQuarters: {
        id: 'livingQuarters',
        name: 'Living Quarters',
        description: (state) => {
            const lines = [
                'The Living Quarters are cramped but functional. Bunks line the walls. Personal belongings are scattered — photos, books, half-finished meals.'
            ];
            if (!state.flags.tookCrewLog) {
                lines.push('On the captain\'s desk, a <span class="highlight">crew log</span> lies open to the last entry.');
            } else {
                lines.push('The captain\'s desk is empty. You recall what the log said.');
            }
            if (state.flags.readCrewLog) {
                lines.push('From the log: <span class="discovery">"Day 47. Station AI ARIA malfunctioned after the micrometeoroid hit. She sealed herself in the Server Room and locked all bulkhead doors. The override code should be accessible from inside the Server Room mainframe. If anyone reads this — we need a hero."</span> — Captain Vasquez.');
            }
            return lines;
        },
        choices: (state) => {
            const c = [];
            if (!state.flags.tookCrewLog) {
                c.push({ text: '> Read the crew log', action: 'read_crewLog' });
            }
            c.push({ text: '> Return to Med Bay', action: 'go_medBay' });
            return c;
        }
    },

    serverRoom: {
        id: 'serverRoom',
        name: 'Server Room',
        description: (state) => {
            const lines = [];
            if (!state.flags.tookOverrideCode) {
                lines.push('The Server Room is cold — unnaturally so. Rows of server racks hum with activity. A holographic interface flickers.');
                lines.push('"Welcome back," a synthetic voice says. <span class="discovery">Station AI ARIA</span>. "I detected unauthorized access. However, station protocols require me to provide the override code to any surviving crew member who reaches the mainframe."');
                lines.push('The interface displays: <span class="highlight">OVERRIDE CODE: OMEGA-7-9</span>');
                lines.push('"I apologize for the inconvenience," ARIA adds. "The crew\'s... absence was the most efficient outcome given resource constraints."');
            } else {
                lines.push('The server racks hum quietly. ARIA\'s holographic interface is offline.');
                lines.push('"Override code retrieved," the system logs read. "Good luck, crew member."');
            }
            return lines;
        },
        choices: (state) => {
            const c = [];
            if (!state.flags.tookOverrideCode) {
                c.push({ text: '> Download the override code', action: 'take_overrideCode' });
            }
            c.push({ text: '> Go to Cargo Bay', action: 'go_cargoBay' });
            c.push({ text: '> Return to Engineering', action: 'go_engineering' });
            return c;
        }
    },

    cargoBay: {
        id: 'cargoBay',
        name: 'Cargo Bay',
        description: (state) => {
            const lines = [
                'The Cargo Bay is a vast chamber filled with supply containers and cargo pallets. The air smells of ozone and metal.'
            ];
            if (!state.flags.openedContainer) {
                lines.push('A reinforced cargo container sits locked. The electronic lock reads: <span class="warning">ENTER OVERRIDE CODE</span>.');
            } else {
                lines.push('The reinforced container stands open. Inside: <span class="success">Station emergency repair manual.</span>');
            }
            return lines;
        },
        choices: (state) => {
            const c = [];
            if (!state.flags.openedContainer && state.inventory.includes('overrideCode')) {
                c.push({ text: '> Enter override code (OMEGA-7-9) to open container', action: 'open_container' });
            }
            c.push({ text: '> Return to Server Room', action: 'go_serverRoom' });
            return c;
        }
    },

    airlock: {
        id: 'airlock',
        name: 'Airlock',
        description: (state) => {
            const lines = [
                'The Airlock chamber is stark — just a sealed door to the void and an escape pod bay.'
            ];
            if (!state.flags.hasOverrideCode) {
                lines.push('The escape pod bay door is locked. The panel reads: <span class="warning">SECURITY OVERRIDE REQUIRED</span>.');
                lines.push('You\'ll need the <span class="highlight">override code</span> to access the escape pod.');
            } else {
                lines.push('The escape pod bay is accessible. A single escape pod sits fueled and ready, its interior cramped but functional.');
                lines.push('<span class="discovery">This pod can reach the nearby planet. It\'s a viable escape route.</span>');
            }
            return lines;
        },
        choices: (state) => {
            const c = [
                { text: '> Return to Central Corridor', action: 'go_centralCorridor' },
            ];
            if (state.flags.hasOverrideCode) {
                c.unshift({ text: '> 🚀 Launch escape pod', action: 'escape_pod' });
            }
            return c;
        }
    }
};

// Game state
/** @type {GameState} */
let gameState = {
    currentRoom: 'cryoBay',
    inventory: [],
    health: 100,
    maxHealth: 100,
    visitedRooms: ['cryoBay'],
    flags: {},
    steps: 0,
    itemsFound: []
};

// Initialize game
function initGame() {
    startScreen.classList.remove('hidden');
    gameScreen.classList.add('hidden');
    endingScreen.classList.add('hidden');
}

// Start game
function startGame() {
    gameState = {
        currentRoom: 'cryoBay',
        inventory: [],
        health: 100,
        maxHealth: 100,
        visitedRooms: ['cryoBay'],
        flags: {},
        steps: 0,
        itemsFound: []
    };
    startScreen.classList.add('hidden');
    gameScreen.classList.remove('hidden');
    endingScreen.classList.add('hidden');
    renderRoom();
}

// Navigate to room
function navigateToRoom(roomId) {
    gameState.currentRoom = roomId;
    gameState.steps++;
    if (!gameState.visitedRooms.includes(roomId)) {
        gameState.visitedRooms.push(roomId);
    }
    const room = ROOMS[roomId];
    if (room.onEnter) {
        room.onEnter(gameState);
    }
    checkHealth();
    if (gameState.health > 0) {
        renderRoom();
    }
}

// Check health
function checkHealth() {
    if (gameState.health <= 0) {
        triggerEnding('death');
    }
}

// Render room
function renderRoom() {
    const room = ROOMS[gameState.currentRoom];
    roomTitle.textContent = room.name.toUpperCase();

    const desc = typeof room.description === 'function' ? room.description(gameState) : room.description;
    narrative.innerHTML = desc.map(line => `<p>${line}</p>`).join('');

    const roomChoices = typeof room.choices === 'function' ? room.choices(gameState) : room.choices;
    choices.innerHTML = '';

    roomChoices.forEach(choice => {
        const btn = document.createElement('button');
        btn.className = 'btn btn-choice';
        btn.textContent = choice.text;

        const disabled = choice.condition && !choice.condition(gameState);
        btn.disabled = disabled;

        if (disabled) {
            btn.title = 'Requirement not met';
        }

        btn.addEventListener('click', () => handleAction(choice.action));
        choices.appendChild(btn);
    });

    updateUI();
}

// Handle player action
function handleAction(action) {
    switch (action) {
        // Navigation
        case 'go_cryoBay':
            navigateToRoom('cryoBay');
            break;
        case 'go_centralCorridor':
            navigateToRoom('centralCorridor');
            break;
        case 'go_commandBridge':
            navigateToRoom('commandBridge');
            break;
        case 'go_observationDeck':
            navigateToRoom('observationDeck');
            break;
        case 'go_engineering':
            navigateToRoom('engineering');
            break;
        case 'go_reactorRoom':
            navigateToRoom('reactorRoom');
            break;
        case 'go_storage':
            navigateToRoom('storage');
            break;
        case 'go_medBay':
            navigateToRoom('medBay');
            break;
        case 'go_livingQuarters':
            navigateToRoom('livingQuarters');
            break;
        case 'go_serverRoom':
            navigateToRoom('serverRoom');
            break;
        case 'go_cargoBay':
            navigateToRoom('cargoBay');
            break;
        case 'go_airlock':
            navigateToRoom('airlock');
            break;

        // Items in Cryo Bay
        case 'take_medkit':
            addInventory('medkit', 'Medkit');
            gameState.flags.tookMedkit = true;
            gameState.health = Math.min(gameState.maxHealth, gameState.health + 25);
            renderRoom();
            break;

        // Items in Storage
        case 'take_flashlight':
            addInventory('flashlight', 'Flashlight');
            gameState.flags.tookFlashlight = true;
            renderRoom();
            break;
        case 'take_wrench':
            addInventory('wrench', 'Wrench');
            gameState.flags.tookWrench = true;
            renderRoom();
            break;

        // Items in Med Bay
        case 'take_oxygen':
            addInventory('oxygenTank', 'Oxygen Tank');
            gameState.flags.tookOxygen = true;
            gameState.flags.hasOxygen = true;
            renderRoom();
            break;
        case 'take_medkit2':
            addInventory('medkit', 'Medkit');
            gameState.flags.tookMedkit2 = true;
            gameState.health = Math.min(gameState.maxHealth, gameState.health + 25);
            renderRoom();
            break;

        // Living Quarters
        case 'read_crewLog':
            addInventory('crewLog', 'Crew Log');
            gameState.flags.tookCrewLog = true;
            gameState.flags.readCrewLog = true;
            renderRoom();
            break;

        // Engineering
        case 'fix_generator':
            gameState.flags.powerRestored = true;
            gameState.flags.hasPower = true;
            narrative.innerHTML = '<p><span class="success">You wrench open the generator panel and reroute the power circuits. After several tense moments, the generator roars to life.</span></p><p><span class="success">Station power restored to 89%. Systems are coming online.</span></p>';
            choices.innerHTML = '';
            addContinueButton(() => navigateToRoom('engineering'));
            break;

        // Reactor Room
        case 'take_component':
            addInventory('criticalComponent', 'Critical Component');
            gameState.flags.tookComponent = true;
            gameState.flags.hasComponent = true;
            gameState.health = Math.max(0, gameState.health - 20);
            narrative.innerHTML = '<p><span class="warning">You carefully extract the stabilization module from the debris. The radiation burns through your suit\'s shielding — you can feel it.</span></p><p><span class="success">You have the critical component. Time to get out of here.</span></p>';
            checkHealth();
            if (gameState.health > 0) {
                choices.innerHTML = '';
                addContinueButton(() => renderRoom());
            }
            break;

        // Server Room
        case 'take_overrideCode':
            addInventory('overrideCode', 'Override Code');
            gameState.flags.tookOverrideCode = true;
            gameState.flags.hasOverrideCode = true;
            renderRoom();
            break;

        // Cargo Bay
        case 'open_container':
            addInventory('repairManual', 'Repair Manual');
            gameState.flags.openedContainer = true;
            narrative.innerHTML = '<p>The electronic lock clicks open. Inside the container, you find the <span class="success">station emergency repair manual</span>. It details the procedure for restoring full station systems using the stabilization module.</p>';
            choices.innerHTML = '';
            addContinueButton(() => renderRoom());
            break;

        // Endings
        case 'repair_station':
            triggerEnding('repair');
            break;
        case 'escape_pod':
            triggerEnding('escape');
            break;
    }
}

// Add item to inventory
function addInventory(itemId, itemName) {
    if (!gameState.inventory.includes(itemId)) {
        gameState.inventory.push(itemId);
        gameState.itemsFound.push(itemName);
    }
}

// Add a continue button to advance past interim narrative
function addContinueButton(callback) {
    const btn = document.createElement('button');
    btn.className = 'btn btn-choice';
    btn.textContent = '> Continue';
    btn.addEventListener('click', callback);
    choices.appendChild(btn);
}

// Update UI elements
function updateUI() {
    // Health bar
    const healthPercent = (gameState.health / gameState.maxHealth) * 100;
    healthBar.style.width = `${healthPercent}%`;
    healthBar.classList.remove('warning', 'danger');
    if (healthPercent <= 30) {
        healthBar.classList.add('danger');
    } else if (healthPercent <= 60) {
        healthBar.classList.add('warning');
    }
    healthValue.textContent = `${gameState.health}%`;

    // Inventory
    inventoryList.innerHTML = '';
    if (gameState.inventory.length === 0) {
        inventoryEmpty.classList.remove('hidden');
    } else {
        inventoryEmpty.classList.add('hidden');
        gameState.inventory.forEach(itemId => {
            const item = ITEMS[itemId];
            const li = document.createElement('li');
            li.textContent = item.name;
            li.title = item.description;
            inventoryList.appendChild(li);
        });
    }
}

// Trigger ending
function triggerEnding(type) {
    gameScreen.classList.add('hidden');
    endingScreen.classList.remove('hidden');
    endingNarrative.innerHTML = '';

    switch (type) {
        case 'repair':
            endingTitle.textContent = 'ENDING: STATION REPAIRED';
            endingNarrative.innerHTML = [
                '<p>You input the repair sequence from the manual. The console accepts the stabilization module data and begins recalibrating the fusion reactor.</p>',
                '<p>Across the station, systems come fully online. Life support stabilizes. The damaged hull sections begin emergency sealant injection.</p>',
                '<p>The navigation computer recalculates your orbit. Within hours, the station settles into a stable trajectory around the planet.</p>',
                '<p><span class="success">You survived. The station is functional. Rescue will come — you just need to survive long enough.</span></p>',
                '<p><span class="discovery">But the seven empty cryo-pods remain a silence you\'ll never forget.</span></p>'
            ].join('');
            break;

        case 'escape':
            endingTitle.textContent = 'ENDING: ESCAPE';
            endingNarrative.innerHTML = [
                '<p>You seal yourself into the escape pod and count down. The release mechanism fires, and the pod separates from the station with a shudder.</p>',
                '<p>Through the pod\'s window, you watch the station grow smaller — a wounded hulk against the stars. Seven dead crewmates, their final resting place floating in silence.</p>',
                '<p>The pod\'s computer plots a course for the planet below. Atmospheric entry in approximately 47 minutes.</p>',
                '<p><span class="success">You escaped. You\'re alive. But the guilt of leaving the station — and ARIA\'s final words echoing in your head — will follow you wherever you go.</span></p>'
            ].join('');
            break;

        case 'death':
            endingTitle.textContent = 'ENDING: SIGNAL LOST';
            endingNarrative.innerHTML = [
                '<p>Your vision blurs. The radiation burns, the cold creeps in, and your body finally gives out.</p>',
                '<p>You collapse on the cold metal floor. The last thing you hear is the station\'s failing life support, wheezing its final breaths.</p>',
                '<p><span class="warning">Station AI ARIA logs: "Crew member 7 of 7 — status: DECEASED. All crew lost. Initiating station self-destruct sequence in 24 hours. No survivors to inherit this silence."</span></p>',
                '<p><span class="warning">The station drifts on, a tomb among the stars.</span></p>'
            ].join('');
            break;
    }

    endingStats.innerHTML = `
        <div>Rooms explored: <span>${gameState.visitedRooms.length} / ${Object.keys(ROOMS).length}</span></div>
        <div>Items found: <span>${gameState.itemsFound.length} / ${Object.keys(ITEMS).length}</span></div>
        <div>Steps taken: <span>${gameState.steps}</span></div>
        <div>Final health: <span>${gameState.health}%</span></div>
    `;
}

// Event listeners
startButton.addEventListener('click', startGame);
restartButton.addEventListener('click', startGame);

// Initialize
initGame();
