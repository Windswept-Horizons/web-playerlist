// Staff Team Configuration
var staff_team = [
    {
        "name": "Coyote",
        "image": "https://wish-rp.b-cdn.net/Webhook-pics/visionary_feather_purple2.png",
        "rank": "Visionary"
    },
    {
        "name": "Raven",
        "image": "https://wish-rp.b-cdn.net/Webhook-pics/ambassador2.PNG",
        "rank": "Ambassador"
    },
    {
        "name": "Es",
        "image": "https://wish-rp.b-cdn.net/Webhook-pics/ambassador2.PNG",
        "rank": "Ambassador"
    },
    {
        "name": "Guacc",
        "image": "https://wish-rp.b-cdn.net/Webhook-pics/ambassador2.PNG",
        "rank": "Ambassador"
    },
    {
        "name": "Lis",
        "image": "https://wish-rp.b-cdn.net/Webhook-pics/ambassador2.PNG",
        "rank": "Ambassador"
    },
    {
        "name": "Gabi",
        "image": "https://wish-rp.b-cdn.net/Webhook-pics/ambassador2.PNG",
        "rank": "Ambassador"
    },
];

// Server Configuration
const serverName = "Windswept Horizons";

// Display Settings
const showStaffTeam = true;
const showPlayersList = true;
const theme = "blue";

// Player Profile Image
const playerProfileImage = "https://wish-rp.b-cdn.net/WebSite/wish-dot_blue-small.png";

// Background Image URL (you'll need to add your background image here)
const backgroundImage = "https://wish-rp.b-cdn.net/WebSite/blue.png";

// Townsfolk data (2026 update)
// Cfx no longer publishes player names, so the game server (wish_loadingscreen)
// uploads townsfolk.json to our Bunny CDN every 60 seconds. This page reads it.
// >>> Make sure this matches your Bunny PULL ZONE URL <<<
const apiEndpoint = "https://wish-live.b-cdn.net/townsfolk.json";

// If the list is older than this, assume the server is offline/restarting (minutes)
const staleAfterMinutes = 5;

// Update interval (in milliseconds) - default 30 seconds
const updateInterval = 30000;
