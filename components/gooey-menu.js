class GooeyMenu {
    constructor(containerId, options = {}) {
        this.container = document.getElementById(containerId);
        this.isOpen = false;
        this.options = {
            direction: options.direction || 'top',
            items: options.items || [],
            duration: options.duration || 0.5,
            bounce: options.bounce || 0.3,
            onChange: options.onChange || null,
            ...options
        };
        
        this.filterId = `gooey-filter-${Math.random().toString(36).substr(2, 9)}`;
        this.init();
    }

    init() {
        this.createHTML();
        this.bindEvents();
        this.createSVGFilter();
        this.addPulseEffect();
    }

    addPulseEffect() {
        // Add a subtle pulse effect on load to draw attention
        setTimeout(() => {
            this.menuToggle.classList.add('pulse');
            setTimeout(() => {
                this.menuToggle.classList.remove('pulse');
            }, 4000);
        }, 1000);
    }

    createHTML() {
        const menuHTML = `
            <div class="gooey-menu">
                <div class="gooey-menu-container">
                    <div class="gooey-menu-items" role="menu" aria-hidden="true">
                        ${this.options.items.map((item, index) => `
                            <button 
                                class="gooey-menu-item" 
                                data-index="${index}"
                                data-value="${item.value || ''}"
                                aria-label="${item.name || ''}"
                                role="menuitem"
                                tabindex="-1"
                            >
                                ${item.icon}
                                <span class="sr-only">${item.name || ''}</span>
                            </button>
                        `).join('')}
                    </div>
                    
                    <button 
                        class="gooey-menu-toggle" 
                        aria-haspopup="true" 
                        aria-expanded="false"
                        aria-label="Open menu"
                    >
                        <span class="gooey-menu-icon menu-icon">☰</span>
                        <span class="gooey-menu-icon close-icon hidden">✕</span>
                    </button>
                </div>
            </div>
        `;
        
        this.container.innerHTML = menuHTML;
        this.menuToggle = this.container.querySelector('.gooey-menu-toggle');
        this.menuItems = this.container.querySelectorAll('.gooey-menu-item');
        this.menuItemsContainer = this.container.querySelector('.gooey-menu-items');
        this.menuIcon = this.container.querySelector('.menu-icon');
        this.closeIcon = this.container.querySelector('.close-icon');
    }

    bindEvents() {
        // Toggle menu
        this.menuToggle.addEventListener('click', () => this.toggle());
        
        // Menu item clicks
        this.menuItems.forEach((item, index) => {
            item.addEventListener('click', () => this.handleItemClick(index));
        });

        // Close on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isOpen) {
                this.close();
            }
        });

        // Close when clicking outside
        document.addEventListener('click', (e) => {
            if (this.isOpen && !this.container.contains(e.target)) {
                this.close();
            }
        });
    }

    createSVGFilter() {
        if (document.getElementById(this.filterId)) return;
        
        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.classList.add('gooey-svg');
        svg.innerHTML = `
            <defs>
                <filter id="${this.filterId}">
                    <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur-sm"/>
                    <feColorMatrix 
                        in="blur-sm" 
                        mode="matrix" 
                        values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7" 
                        result="goo"
                    />
                    <feBlend in="SourceGraphic" in2="goo"/>
                </filter>
            </defs>
        `;
        
        document.body.appendChild(svg);
        
        // Apply filter to menu container
        const menuContainer = this.container.querySelector('.gooey-menu-container');
        menuContainer.style.filter = `url(#${this.filterId})`;
    }

    toggle() {
        if (this.isOpen) {
            this.close();
        } else {
            this.open();
        }
    }

    open() {
        this.isOpen = true;
        this.menuToggle.setAttribute('aria-expanded', 'true');
        this.menuToggle.setAttribute('aria-label', 'Close menu');
        this.menuItemsContainer.setAttribute('aria-hidden', 'false');
        
        // Update tabindex for accessibility
        this.menuItems.forEach(item => item.setAttribute('tabindex', '0'));
        
        // Animate icon change
        this.animateIconChange(true);
        
        // Animate menu items
        this.animateItems(true);
    }

    close() {
        this.isOpen = false;
        this.menuToggle.setAttribute('aria-expanded', 'false');
        this.menuToggle.setAttribute('aria-label', 'Open menu');
        this.menuItemsContainer.setAttribute('aria-hidden', 'true');
        
        // Update tabindex for accessibility
        this.menuItems.forEach(item => item.setAttribute('tabindex', '-1'));
        
        // Animate icon change
        this.animateIconChange(false);
        
        // Animate menu items
        this.animateItems(false);
    }

    animateIconChange(opening) {
        if (opening) {
            this.menuIcon.classList.add('gooey-icon-animate-out');
            setTimeout(() => {
                this.menuIcon.classList.add('hidden');
                this.closeIcon.classList.remove('hidden');
                this.closeIcon.classList.add('gooey-icon-animate-in');
            }, 100);
        } else {
            this.closeIcon.classList.add('gooey-icon-animate-out');
            setTimeout(() => {
                this.closeIcon.classList.add('hidden');
                this.menuIcon.classList.remove('hidden');
                this.menuIcon.classList.add('gooey-icon-animate-in');
            }, 100);
        }
    }

    animateItems(opening) {
        const direction = this.options.direction;
        const axis = (direction === 'left' || direction === 'right') ? 'X' : 'Y';
        const multiplier = (direction === 'left' || direction === 'top') ? -1 : 1;
        
        this.menuItems.forEach((item, index) => {
            if (opening) {
                const distance = (index + 1) * 100 * multiplier;
                const offset = (index + 1) * 10 * multiplier;
                const transform = axis === 'X' 
                    ? `translateX(calc(${distance}% + ${-offset}px))`
                    : `translateY(calc(${distance}% + ${-offset}px))`;
                
                item.style.transform = transform;
                item.classList.add('animate-out');
            } else {
                item.style.transform = 'translate(0, 0)';
                item.classList.remove('animate-out');
            }
        });
    }

    handleItemClick(index) {
        const item = this.options.items[index];
        this.close();
        
        if (this.options.onChange && typeof this.options.onChange === 'function') {
            this.options.onChange(item, index);
        }
    }
}

// Initialize gooey menu when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Custom menu items for your app
    const customItems = [
        { icon: '🔄', name: 'Check for Updates', value: 'updates' },
        { icon: '🔔', name: 'Notifications', value: 'notifications' },
        { icon: '🌙', name: 'Theme Toggle', value: 'theme' }
    ];

    // Create gooey menu instances
    const bottomRightMenu = new GooeyMenu('gooey-menu-bottom-right', {
        items: customItems,
        direction: 'left',
        onChange: (item, index) => {
            console.log('Menu item clicked:', item.name, item.value);
            // Add your custom logic here
            handleMenuAction(item.value);
        }
    });

    // Handle menu actions
    function handleMenuAction(action) {
        switch(action) {
            case 'updates':
                checkForUpdates();
                break;
            case 'notifications':
                toggleNotifications();
                break;
            case 'theme':
                toggleTheme();
                break;
            default:
                console.log('Unknown action:', action);
        }
    }

    // Custom action functions
    function checkForUpdates() {
        console.log('Checking for updates...');
        // Show a notification or modal
        showNotification('Checking for updates...', 'info');
    }

    function toggleNotifications() {
        console.log('Toggling notifications...');
        // Toggle notification panel or settings
        showNotification('Notifications panel opened', 'info');
    }

    function toggleTheme() {
        console.log('Toggling theme...');
        // Toggle between light and dark theme
        const body = document.body;
        const isCurrentlyDark = body.classList.contains('dark-theme');
        
        if (isCurrentlyDark) {
            body.classList.remove('dark-theme');
            localStorage.setItem('theme', 'light');
            updateThemeIcon('🌙');
            showNotification('Switched to Light Theme', 'success');
        } else {
            body.classList.add('dark-theme');
            localStorage.setItem('theme', 'dark');
            updateThemeIcon('☀️');
            showNotification('Switched to Dark Theme', 'success');
        }
    }

    function updateThemeIcon(newIcon) {
        const themeButton = document.querySelector('[data-value="theme"]');
        if (themeButton) {
            themeButton.innerHTML = newIcon + '<span class="sr-only">Theme Toggle</span>';
        }
    }

    function showNotification(message, type = 'info') {
        // Create a simple notification
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'success' ? '#4CAF50' : type === 'error' ? '#f44336' : '#2196F3'};
            color: white;
            padding: 12px 20px;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.3);
            z-index: 10000;
            font-family: inherit;
            font-size: 14px;
            opacity: 0;
            transform: translateX(100%);
            transition: all 0.3s ease;
        `;
        notification.textContent = message;
        document.body.appendChild(notification);

        // Animate in
        setTimeout(() => {
            notification.style.opacity = '1';
            notification.style.transform = 'translateX(0)';
        }, 10);

        // Remove after 3 seconds
        setTimeout(() => {
            notification.style.opacity = '0';
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }

    // Load saved theme on startup and set appropriate icon
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-theme');
        setTimeout(() => updateThemeIcon('☀️'), 500);
    } else {
        setTimeout(() => updateThemeIcon('🌙'), 500);
    }
});
