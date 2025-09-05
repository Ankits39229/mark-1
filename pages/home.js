// Home page content and functionality
const HomePage = {
    title: "Welcome Home",
    
    getContent: () => {
        return `
            <div class="welcome-section">
                <h2>Hello! Welcome to your Electron App</h2>
                <p>This is a simple Electron application with a side navigation bar.</p>
                <p>Click on the navigation items in the sidebar to explore different sections.</p>
                
                <div class="feature-cards">
                    <div class="card">
                        <h3>🚀 Fast & Responsive</h3>
                        <p>Built with Electron for cross-platform compatibility</p>
                    </div>
                    <div class="card">
                        <h3>🎨 Clean Design</h3>
                        <p>Simple and intuitive user interface</p>
                    </div>
                    <div class="card">
                        <h3>📱 Navigation</h3>
                        <p>Easy-to-use sidebar navigation</p>
                    </div>
                </div>
            </div>
        `;
    },
    
    // Page-specific initialization function
    init: () => {
        console.log('Home page initialized');
        // Add any home page specific event listeners or functionality here
    },
    
    // Page-specific cleanup function
    cleanup: () => {
        console.log('Home page cleanup');
        // Remove any page-specific event listeners here
    }
};

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = HomePage;
} else {
    window.HomePage = HomePage;
}
