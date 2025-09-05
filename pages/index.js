// Pages index - centralized page module exports
// This file can be used to manage all page imports in one place

// Import all page modules (for Node.js environments)
if (typeof require !== 'undefined') {
    try {
        const HomePage = require('./home.js');
        const DashboardPage = require('./dashboard.js');
        const ProfilePage = require('./profile.js');
        const SettingsPage = require('./settings.js');
        const AboutPage = require('./about.js');
        
        module.exports = {
            HomePage,
            DashboardPage,
            ProfilePage,
            SettingsPage,
            AboutPage
        };
    } catch (error) {
        console.log('Running in browser environment - individual page scripts loaded');
    }
}

// Page registry for browser environment
if (typeof window !== 'undefined') {
    window.PageRegistry = {
        home: 'HomePage',
        dashboard: 'DashboardPage', 
        profile: 'ProfilePage',
        settings: 'SettingsPage',
        about: 'AboutPage'
    };
}

// Page loading utility
const PageLoader = {
    // Get all available pages
    getAvailablePages: function() {
        if (typeof window !== 'undefined') {
            return Object.keys(window.PageRegistry || {});
        }
        return ['home', 'dashboard', 'profile', 'settings', 'about'];
    },
    
    // Validate if a page exists
    pageExists: function(pageName) {
        return this.getAvailablePages().includes(pageName);
    },
    
    // Get page module by name
    getPageModule: function(pageName) {
        if (typeof window !== 'undefined') {
            const moduleVariableName = window.PageRegistry[pageName];
            return window[moduleVariableName];
        }
        return null;
    }
};

// Export PageLoader utility
if (typeof module !== 'undefined' && module.exports) {
    module.exports.PageLoader = PageLoader;
} else if (typeof window !== 'undefined') {
    window.PageLoader = PageLoader;
}
