// Page management system using separate page modules
const PageManager = {
    currentPage: null,
    
    // Map page names to their corresponding modules
    pages: {
        home: HomePage,
        dashboard: DashboardPage,
        profile: ProfilePage,
        settings: SettingsPage,
        about: AboutPage
    },
    
    // Load a specific page
    loadPage: function(pageName) {
        const pageModule = this.pages[pageName];
        if (!pageModule) {
            console.error(`Page module not found: ${pageName}`);
            return;
        }
        
        // Cleanup previous page if it exists
        if (this.currentPage && this.currentPage.cleanup) {
            this.currentPage.cleanup();
        }
        
        // Update page title and content
        const pageTitle = document.getElementById('page-title');
        const pageContent = document.getElementById('page-content');
        
        if (pageTitle) {
            pageTitle.textContent = pageModule.title;
        }
        
        if (pageContent) {
            pageContent.innerHTML = pageModule.getContent();
        }
        
        // Initialize the new page
        if (pageModule.init) {
            // Use setTimeout to ensure DOM is updated before initialization
            setTimeout(() => {
                pageModule.init();
            }, 50);
        }
        
        // Set current page
        this.currentPage = pageModule;
        
        console.log(`Loaded page: ${pageName}`);
    }
};

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Add click event listeners to navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            const pageName = link.getAttribute('data-page');
            
            // Remove active class from all nav items
            document.querySelectorAll('.nav-item').forEach(item => {
                item.classList.remove('active');
            });
            
            // Add active class to clicked nav item
            link.parentElement.classList.add('active');
            
            // Load the selected page
            PageManager.loadPage(pageName);
        });
    });

    // Initialize window control buttons
    const minimizeBtn = document.getElementById('minimize-btn');
    const closeBtn = document.getElementById('close-btn');

    if (minimizeBtn) {
        minimizeBtn.addEventListener('click', async () => {
            try {
                await window.electronAPI?.minimizeWindow();
            } catch (error) {
                console.error('Failed to minimize window:', error);
            }
        });
    }

    if (closeBtn) {
        closeBtn.addEventListener('click', async () => {
            try {
                await window.electronAPI?.closeWindow();
            } catch (error) {
                console.error('Failed to close window:', error);
            }
        });
    }

    // Initialize with home page
    PageManager.loadPage('home');
});

// Optional: Add some global functionality
console.log('Electron Sidebar App with modular pages loaded successfully!');
