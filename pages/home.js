// Home page content and functionality with Sparkles Header
const HomePage = {
    title: "Welcome Home",
    sparklesInstance: null,
    
    getContent: () => {
        return `
            <div class="welcome-section">
                <h2>Hello! Welcome to your Electron App</h2>
                <p>This is a simple Electron application with a sparkles header and side navigation bar.</p>
                <p>Click on the navigation items in the sidebar to explore different sections.</p>
                
                <div class="feature-cards">
                    <div class="card">
                        <h3>🚀 Fast & Responsive</h3>
                        <p>Built with Electron for cross-platform compatibility</p>
                    </div>
                    <div class="card">
                        <h3>✨ Sparkles Effect</h3>
                        <p>Beautiful animated sparkles header with canvas-based particles</p>
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
        console.log('Home page with sparkles initialized');
        const headerElement = document.querySelector('.content-header');
        if (!headerElement) {
            console.warn('Header element not found for sparkles header');
            return;
        }
        // Preserve original header (with #page-title) so other pages can restore it
        if (!HomePage._originalHeaderHTML) {
            HomePage._originalHeaderHTML = headerElement.innerHTML;
        }
        // Inject sparkles only if not already active
        if (!headerElement.dataset.sparklesActive) {
            headerElement.innerHTML = '<div id="sparkles-header-container"></div>';
            headerElement.dataset.sparklesActive = 'true';
            if (window.createSparklesHeader) {
                HomePage.sparklesInstance = window.createSparklesHeader('sparkles-header-container');
            } else {
                console.warn('Sparkles header function not available');
            }
        }
    },
    
    // Page-specific cleanup function
    cleanup: () => {
        console.log('Home page cleanup');
        const headerElement = document.querySelector('.content-header');
        if (headerElement && HomePage._originalHeaderHTML) {
            // Restore original header so other pages show their titles
            headerElement.innerHTML = HomePage._originalHeaderHTML;
            delete headerElement.dataset.sparklesActive;
        }
        if (HomePage.sparklesInstance && HomePage.sparklesInstance.destroy) {
            HomePage.sparklesInstance.destroy();
            HomePage.sparklesInstance = null;
        }
    }
};

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = HomePage;
} else {
    window.HomePage = HomePage;
}
