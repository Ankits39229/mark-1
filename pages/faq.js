// faq page content and functionality
const FaqPage = {
    title: "faq",
    
    getContent: () => {
        return `
            <div class="faq-section">
                <h2>faq</h2>
                <p>Welcome to the faq section.</p>
                
                <div class="feature-cards">
                    <div class="card">
                        <h3>📅 faq Feature 1</h3>
                        <p>Description of the first faq feature</p>
                        <button class="card-button" onclick="FaqPage.feature1()">Try Feature 1</button>
                    </div>
                    <div class="card">
                        <h3>⚙️ faq Feature 2</h3>
                        <p>Description of the second faq feature</p>
                        <button class="card-button" onclick="FaqPage.feature2()">Try Feature 2</button>
                    </div>
                    <div class="card">
                        <h3>📊 faq Statistics</h3>
                        <p>View faq related statistics and data</p>
                        <div id="faq-stats" class="stats-container">
                            <small>Loading statistics...</small>
                        </div>
                    </div>
                </div>
            </div>
        `;
    },
    
    init: () => {
        console.log('faq page initialized');
        FaqPage.loadStats();
    },
    
    cleanup: () => {
        console.log('faq page cleanup');
    },
    
    // faq-specific methods
    loadStats: () => {
        setTimeout(() => {
            const statsContainer = document.getElementById('faq-stats');
            if (statsContainer) {
                statsContainer.innerHTML = '<small>No statistics available yet.</small>';
            }
        }, 500);
    },
    
    feature1: () => {
        alert('faq Feature 1 activated!');
    },
    
    feature2: () => {
        alert('faq Feature 2 activated!');
    }
};

if (typeof module !== 'undefined' && module.exports) {
    module.exports = FaqPage;
} else {
    window.FaqPage = FaqPage;
}