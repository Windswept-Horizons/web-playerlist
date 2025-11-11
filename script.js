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

// Fetch server data from CFX.re API
async function fetchServerData() {
    const statusText = document.getElementById('statusText');
    const statusBar = document.getElementById('statusBar');
    const playerList = document.getElementById('playerList');
    
    try {
        statusText.textContent = 'Fetching server data...';
        
        const response = await fetch(apiEndpoint);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        const serverData = data.Data;
        
        // Update status bar
        const playerCount = serverData.clients || 0;
        const maxPlayers = serverData.sv_maxclients || 32;
        const percentage = (playerCount / maxPlayers) * 100;
        
        statusBar.style.width = `${percentage}%`;
        statusText.textContent = `${playerCount}/${maxPlayers} players online`;
        
        // Update player list
        if (showPlayersList) {
            updatePlayerList(serverData.players || []);
        } else {
            document.querySelector('.playerlist').style.display = 'none';
        }
        
    } catch (error) {
        console.error('Error fetching server data:', error);
        statusText.textContent = 'Server offline or unavailable';
        statusBar.style.width = '0%';
        playerList.innerHTML = '<div class="loading-message">Unable to load player data</div>';
    }
}

// Update player list display
function updatePlayerList(players) {
    const playerList = document.getElementById('playerList');
    
    if (players.length === 0) {
        playerList.innerHTML = '<div class="loading-message">No players currently online</div>';
        return;
    }
    
    // Sort players by ID
    players.sort((a, b) => a.id - b.id);
    
    playerList.innerHTML = '';
    
    players.forEach(player => {
        const playerElement = document.createElement('div');
        playerElement.className = 'staff'; // Reusing staff styling for consistency
        
        playerElement.innerHTML = `
            <div class="info">
                <img src="${playerProfileImage}" class="pfp" alt="${player.name}">
                <span>${sanitizePlayerName(player.name)}</span>
            </div>
            <div class="status">${player.id}</div>
        `;
        
        playerList.appendChild(playerElement);
    });
}

// Sanitize player names (remove special characters/emojis that might break display)
function sanitizePlayerName(name) {
    // Remove FiveM/RedM color codes
    name = name.replace(/\^[0-9]/g, '');
    
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
