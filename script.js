// Main Script for Windswept Horizons Loading Screen

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    console.log('Windswept Horizons - Loading Screen Initialized');
    
    // Set background image
    setBackgroundImage();
    
    // Load staff team
    loadStaffTeam();
    
    // Load initial player data
    fetchServerData();
    
    // Set up auto-refresh for player list
    setInterval(fetchServerData, updateInterval);
});

// Set background image from config
function setBackgroundImage() {
    const bgElement = document.querySelector('.background-image');
    if (bgElement && backgroundImage) {
        bgElement.style.backgroundImage = `url('${backgroundImage}')`;
    }
}

// Load staff team from config
function loadStaffTeam() {
    const staffList = document.getElementById('staffList');
    
    if (!showStaffTeam) {
        document.querySelector('.staffteam').style.display = 'none';
        return;
    }
    
    staffList.innerHTML = '';
    
    staff_team.forEach(staff => {
        const staffElement = document.createElement('div');
        staffElement.className = 'staff';
        
        staffElement.innerHTML = `
            <div class="info">
                <img src="${staff.image}" class="pfp" alt="${staff.name}">
                <span>${staff.name}</span>
            </div>
            <div class="status">${staff.rank}</div>
        `;
        
        staffList.appendChild(staffElement);
    });
}

// Fetch the Townsfolk list from our Bunny CDN (uploaded by the game server)
async function fetchServerData() {
    const playerList = document.getElementById('playerList');

    if (!showPlayersList) {
        document.querySelector('.playerlist').style.display = 'none';
        return;
    }

    try {
        // Cache-buster: a new "?v=" value every 30 seconds makes the CDN fetch a
        // fresh copy at most every 30s, whatever the pull zone's cache time is.
        // (Requires Bunny pull zone -> Caching -> Vary Cache -> "URL Query String" ON.)
        // no-store = never use the visitor's browser cache.
        const bucket = Math.floor(Date.now() / 30000);
        const response = await fetch(`${apiEndpoint}?v=${bucket}`, { cache: 'no-store' });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        // Stale check: the server uploads every 60s. If the file is old,
        // the server is restarting or offline, so don't show old names as "online".
        const ageMinutes = (Date.now() / 1000 - (data.updatedAt || 0)) / 60;
        if (ageMinutes > staleAfterMinutes) {
            playerList.innerHTML = '<div class="loading-message">The Open Range is resting... check back soon!</div>';
            return;
        }

        updatePlayerList(Array.isArray(data.townsfolk) ? data.townsfolk : []);

    } catch (error) {
        console.error('Error fetching townsfolk data:', error);
        playerList.innerHTML = '<div class="loading-message">Unable to load player data</div>';
    }
}

// Update player list display
function updatePlayerList(players) {
    const playerList = document.getElementById('playerList');

    if (players.length === 0) {
        playerList.innerHTML = '<div class="loading-message">All Townsfolk are resting at Camp!</div>';
        return;
    }

    // Sort A-Z by name (matches the loading screen; server IDs are not shown)
    players.sort((a, b) => String(a.name).localeCompare(String(b.name)));

    playerList.innerHTML = '';

    players.forEach(player => {
        const playerElement = document.createElement('div');
        playerElement.className = 'staff'; // Reusing staff styling for consistency

        playerElement.innerHTML = `
            <div class="info">
                <img src="${playerProfileImage}" class="pfp" alt="">
                <span>${sanitizePlayerName(player.name)}</span>
            </div>
        `;

        playerList.appendChild(playerElement);
    });
}

// Sanitize player names (remove special characters/emojis that might break display)
function sanitizePlayerName(name) {
    // Remove FiveM/RedM color codes
    name = String(name).replace(/\^[0-9]/g, '');
    
    // Basic HTML escaping
    const div = document.createElement('div');
    div.textContent = name;
    return div.innerHTML;
}

// Apply theme colors
function applyTheme() {
    const root = document.documentElement;
    
    const themes = {
        blue: '54, 162, 235',
        red: '235, 54, 54',
        green: '54, 235, 162',
        purple: '162, 54, 235',
        orange: '235, 162, 54'
    };
    
    const themeColor = themes[theme] || themes.blue;
    root.style.setProperty('--main', themeColor);
}

// Apply theme on load
applyTheme();
