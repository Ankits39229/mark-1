#!/usr/bin/env node

/**
 * Page Generator Script for Electron Sidebar App
 * 
 * This script helps generate new page modules quickly.
 * Usage: node scripts/generate-page.js <pageName> [displayName] [icon]
 * 
 * Example: node scripts/generate-page.js calendar "Calendar" "📅"
 */

const fs = require('fs');
const path = require('path');

// Get command line arguments
const args = process.argv.slice(2);
const pageName = args[0];
const displayName = args[1] || capitalize(pageName);
const icon = args[2] || '📄';

if (!pageName) {
    console.error('Error: Page name is required');
    console.log('Usage: node scripts/generate-page.js <pageName> [displayName] [icon]');
    process.exit(1);
}

// Helper function to capitalize string
function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

// Generate page module content
function generatePageModule(name, display) {
    const className = `${capitalize(name)}Page`;
    
    return `// ${display} page content and functionality
const ${className} = {
    title: "${display}",
    
    getContent: () => {
        return \`
            <div class="${name}-section">
                <h2>${display}</h2>
                <p>Welcome to the ${display.toLowerCase()} section.</p>
                
                <div class="feature-cards">
                    <div class="card">
                        <h3>${icon} ${display} Feature 1</h3>
                        <p>Description of the first ${display.toLowerCase()} feature</p>
                        <button class="card-button" onclick="${className}.feature1()">Try Feature 1</button>
                    </div>
                    <div class="card">
                        <h3>⚙️ ${display} Feature 2</h3>
                        <p>Description of the second ${display.toLowerCase()} feature</p>
                        <button class="card-button" onclick="${className}.feature2()">Try Feature 2</button>
                    </div>
                    <div class="card">
                        <h3>📊 ${display} Statistics</h3>
                        <p>View ${display.toLowerCase()} related statistics and data</p>
                        <div id="${name}-stats" class="stats-container">
                            <small>Loading statistics...</small>
                        </div>
                    </div>
                </div>
            </div>
        \`;
    },
    
    init: () => {
        console.log('${display} page initialized');
        ${className}.loadStats();
    },
    
    cleanup: () => {
        console.log('${display} page cleanup');
    },
    
    // ${display}-specific methods
    loadStats: () => {
        setTimeout(() => {
            const statsContainer = document.getElementById('${name}-stats');
            if (statsContainer) {
                statsContainer.innerHTML = '<small>No statistics available yet.</small>';
            }
        }, 500);
    },
    
    feature1: () => {
        alert('${display} Feature 1 activated!');
    },
    
    feature2: () => {
        alert('${display} Feature 2 activated!');
    }
};

if (typeof module !== 'undefined' && module.exports) {
    module.exports = ${className};
} else {
    window.${className} = ${className};
}`;
}

// Generate navigation item HTML
function generateNavItem(name, display, iconSymbol) {
    return `                <li class="nav-item">
                    <a href="#" data-page="${name}" class="nav-link">
                        <span class="nav-icon">${iconSymbol}</span>
                        <span class="nav-text">${display}</span>
                    </a>
                </li>`;
}

// Main generation logic
try {
    // Create pages directory if it doesn't exist
    const pagesDir = path.join(process.cwd(), 'pages');
    if (!fs.existsSync(pagesDir)) {
        fs.mkdirSync(pagesDir);
    }
    
    // Generate page file
    const pageFile = path.join(pagesDir, `${pageName}.js`);
    const pageContent = generatePageModule(pageName, displayName);
    
    if (fs.existsSync(pageFile)) {
        console.error(`Error: Page file already exists: ${pageFile}`);
        process.exit(1);
    }
    
    fs.writeFileSync(pageFile, pageContent);
    console.log(`✅ Generated page file: ${pageFile}`);
    
    // Generate navigation item
    const navItem = generateNavItem(pageName, displayName, icon);
    console.log('\\n📝 Add this navigation item to index.html:');
    console.log(navItem);
    
    // Generate script tag
    console.log('\\n📝 Add this script tag to index.html:');
    console.log(`    <script src="pages/${pageName}.js"></script>`);
    
    // Generate page registration
    console.log('\\n📝 Add this to the pages object in renderer.js:');
    console.log(`    ${pageName}: ${capitalize(pageName)}Page,`);
    
    console.log(`\\n🎉 Successfully generated ${displayName} page!`);
    console.log('\\nNext steps:');
    console.log('1. Add the navigation item to index.html');
    console.log('2. Include the script tag in index.html');
    console.log('3. Register the page in renderer.js');
    console.log('4. Restart your Electron app');
    
} catch (error) {
    console.error('Error generating page:', error.message);
    process.exit(1);
}
