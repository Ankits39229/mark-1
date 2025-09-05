// About page content and functionality
const AboutPage = {
    title: "About",
    
    getContent: () => {
        return `
            <div class="about-section">
                <h2>About This Application</h2>
                <p>Learn more about this Electron application and its features.</p>
                
                <div class="app-info-section">
                    <div class="card app-info-card">
                        <div class="app-logo">
                            <div class="logo-placeholder">📱</div>
                            <h3>Electron Sidebar App</h3>
                            <p class="version-info">Version 1.0.0</p>
                        </div>
                        <div class="app-details">
                            <p><strong>Build Date:</strong> <span id="build-date">September 5, 2025</span></p>
                            <p><strong>Platform:</strong> <span id="platform-info">Loading...</span></p>
                            <p><strong>Node.js:</strong> <span id="node-version">Loading...</span></p>
                            <p><strong>Electron:</strong> <span id="electron-version">Loading...</span></p>
                        </div>
                    </div>
                </div>
                
                <div class="feature-cards">
                    <div class="card">
                        <h3>📱 Electron Framework</h3>
                        <p>Built with Electron.js for cross-platform desktop applications</p>
                        <a href="#" onclick="AboutPage.openElectronDocs()" class="card-link">Learn More</a>
                    </div>
                    <div class="card">
                        <h3>🚀 Modern Technologies</h3>
                        <p>HTML5, CSS3, JavaScript ES6+, and Node.js</p>
                        <button class="card-button" onclick="AboutPage.showTechStack()">View Tech Stack</button>
                    </div>
                    <div class="card">
                        <h3>💡 Open Source</h3>
                        <p>Built with modern web technologies and open source tools</p>
                        <button class="card-button" onclick="AboutPage.showLicenses()">View Licenses</button>
                    </div>
                    <div class="card">
                        <h3>🛠️ Development</h3>
                        <p>Created as a template for desktop applications</p>
                        <div class="development-info">
                            <small>GitHub Copilot assisted development</small>
                        </div>
                    </div>
                </div>
                
                <div id="additional-info" class="additional-info-section">
                    <!-- Dynamic content will be loaded here -->
                </div>
            </div>
        `;
    },
    
    init: () => {
        console.log('About page initialized');
        AboutPage.loadSystemInfo();
        AboutPage.loadBuildInfo();
    },
    
    cleanup: () => {
        console.log('About page cleanup');
    },
    
    // About page specific methods
    loadSystemInfo: () => {
        // Load system information
        setTimeout(() => {
            const platformInfo = document.getElementById('platform-info');
            const nodeVersion = document.getElementById('node-version');
            const electronVersion = document.getElementById('electron-version');
            
            if (platformInfo) {
                platformInfo.textContent = process.platform || 'Unknown';
            }
            if (nodeVersion) {
                nodeVersion.textContent = process.versions.node || 'Unknown';
            }
            if (electronVersion) {
                electronVersion.textContent = process.versions.electron || 'Unknown';
            }
        }, 100);
    },
    
    loadBuildInfo: () => {
        // Load additional build information
        const buildDate = document.getElementById('build-date');
        if (buildDate) {
            const now = new Date();
            buildDate.textContent = now.toLocaleDateString();
        }
    },
    
    openElectronDocs: () => {
        // In a real app, you might use electron's shell.openExternal
        alert('Would open Electron documentation in default browser');
    },
    
    showTechStack: () => {
        const additionalInfo = document.getElementById('additional-info');
        if (additionalInfo) {
            additionalInfo.innerHTML = `
                <div class="card tech-stack-card">
                    <h3>Technology Stack</h3>
                    <div class="tech-list">
                        <div class="tech-item">
                            <strong>Frontend:</strong> HTML5, CSS3, JavaScript ES6+
                        </div>
                        <div class="tech-item">
                            <strong>Desktop Framework:</strong> Electron.js
                        </div>
                        <div class="tech-item">
                            <strong>Runtime:</strong> Node.js ${process.versions.node}
                        </div>
                        <div class="tech-item">
                            <strong>Package Manager:</strong> npm
                        </div>
                        <div class="tech-item">
                            <strong>Development Tools:</strong> VS Code, GitHub Copilot
                        </div>
                    </div>
                    <button class="card-button" onclick="AboutPage.hideTechStack()">Hide</button>
                </div>
            `;
        }
    },
    
    hideTechStack: () => {
        const additionalInfo = document.getElementById('additional-info');
        if (additionalInfo) {
            additionalInfo.innerHTML = '';
        }
    },
    
    showLicenses: () => {
        alert('License Information:\n\n' +
              'This application: MIT License\n' +
              'Electron: MIT License\n' +
              'Node.js: MIT License\n\n' +
              'For detailed license information, check the node_modules folder.');
    }
};

if (typeof module !== 'undefined' && module.exports) {
    module.exports = AboutPage;
} else {
    window.AboutPage = AboutPage;
}
