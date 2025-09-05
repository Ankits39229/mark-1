// Help page content and functionality
const HelpPage = {
    title: "Help",
    
    getContent: () => {
        return `
            <div class="help-section">
                <h2>Help</h2>
                <p>Welcome to the help section.</p>
                
                <div class="feature-cards">
                    <div class="card">
                        <h3>📅 Help Feature 1</h3>
                        <p>Description of the first help feature</p>
                        <button class="card-button" onclick="HelpPage.feature1()">Try Feature 1</button>
                    </div>
                    <div class="card">
                        <h3>⚙️ Help Feature 2</h3>
                        <p>Description of the second help feature</p>
                        <button class="card-button" onclick="HelpPage.feature2()">Try Feature 2</button>
                    </div>
                    <div class="card">
                        <h3>📊 Help Statistics</h3>
                        <p>View help related statistics and data</p>
                        <div id="help-stats" class="stats-container">
                            <small>Loading statistics...</small>
                        </div>
                    </div>
                </div>
            </div>
        `;
    },
    
    init: () => {
        console.log('Help page initialized');
        HelpPage.loadStats();
    },
    
    cleanup: () => {
        console.log('Help page cleanup');
    },
    
    // Help-specific methods
    loadStats: () => {
        setTimeout(() => {
            const statsContainer = document.getElementById('help-stats');
            if (statsContainer) {
                statsContainer.innerHTML = '<small>No statistics available yet.</small>';
            }
        }, 500);
    },
    
    feature1: () => {
        alert('Help Feature 1 activated!');
    },
    
    feature2: () => {
        alert('Help Feature 2 activated!');
    }
};

if (typeof module !== 'undefined' && module.exports) {
    module.exports = HelpPage;
} else {
    window.HelpPage = HelpPage;
}