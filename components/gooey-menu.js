class GooeyMenu {
    constructor(containerId, options = {}) {
        this.container = document.getElementById(containerId);
        this.isOpen = false;
        this.isAnimating = false;
        
        this.options = {
            direction: options.direction || 'top',
            items: options.items || [],
            duration: options.duration || 300, // Consistent timing in ms
            stagger: options.stagger || 50,    // Stagger delay between items
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
        this.addInitialPulse();
    }

    addInitialPulse() {
        // Single subtle pulse effect on initialization
        setTimeout(() => {
            this.menuToggle.classList.add('pulse');
            setTimeout(() => {
                this.menuToggle.classList.remove('pulse');
            }, 2000);
        }, 800);
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
                        <span class="gooey-menu-icon menu-icon">~</span>
                        <span class="gooey-menu-icon close-icon">~</span>
                    </button>
                </div>
            </div>
        `;
        
        this.container.innerHTML = menuHTML;
        this.cacheElements();
    }

    cacheElements() {
        this.menuToggle = this.container.querySelector('.gooey-menu-toggle');
        this.menuItems = this.container.querySelectorAll('.gooey-menu-item');
        this.menuItemsContainer = this.container.querySelector('.gooey-menu-items');
        this.menuIcon = this.container.querySelector('.menu-icon');
        this.closeIcon = this.container.querySelector('.close-icon');
    }

    bindEvents() {
        this.menuToggle.addEventListener('click', () => this.toggle());
        
        this.menuItems.forEach((item, index) => {
            item.addEventListener('click', () => this.handleItemClick(index));
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isOpen) {
                this.close();
            }
        });

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
        
        const menuContainer = this.container.querySelector('.gooey-menu-container');
        menuContainer.style.filter = `url(#${this.filterId})`;
    }

    toggle() {
        if (this.isAnimating) return;
        
        if (this.isOpen) {
            this.close();
        } else {
            this.open();
        }
    }

    async open() {
        if (this.isAnimating) return;
        
        this.isAnimating = true;
        this.isOpen = true;
        
        this.updateAccessibilityAttributes(true);
        
        // Animate toggle button icon and items simultaneously
        await Promise.all([
            this.animateToggleIcon(true),
            this.animateMenuItems(true)
        ]);
        
        this.isAnimating = false;
    }

    async close() {
        if (this.isAnimating) return;
        
        this.isAnimating = true;
        
        this.updateAccessibilityAttributes(false);
        
        // Animate toggle button icon and items simultaneously
        await Promise.all([
            this.animateToggleIcon(false),
            this.animateMenuItems(false)
        ]);
        
        this.isOpen = false;
        this.isAnimating = false;
    }

    updateAccessibilityAttributes(opening) {
        this.menuToggle.setAttribute('aria-expanded', opening.toString());
        this.menuToggle.setAttribute('aria-label', opening ? 'Close menu' : 'Open menu');
        this.menuItemsContainer.setAttribute('aria-hidden', (!opening).toString());
        
        const tabIndex = opening ? '0' : '-1';
        this.menuItems.forEach(item => item.setAttribute('tabindex', tabIndex));
    }

    animateToggleIcon(opening) {
        return new Promise(resolve => {
            const showIcon = opening ? this.closeIcon : this.menuIcon;
            const hideIcon = opening ? this.menuIcon : this.closeIcon;
            
            // Smooth transition using CSS classes
            hideIcon.classList.add('icon-hide');
            showIcon.classList.add('icon-show');
            
            setTimeout(() => {
                hideIcon.classList.remove('icon-hide');
                showIcon.classList.remove('icon-show');
                resolve();
            }, this.options.duration);
        });
    }

    animateMenuItems(opening) {
        return new Promise(resolve => {
            const { direction, duration, stagger } = this.options;
            const totalDuration = duration + (this.menuItems.length - 1) * stagger;
            
            this.menuItems.forEach((item, index) => {
                const delay = opening ? index * stagger : (this.menuItems.length - index - 1) * stagger;
                
                setTimeout(() => {
                    if (opening) {
                        const transform = this.getItemTransform(index);
                        item.style.transform = transform;
                        item.classList.add('menu-item-active');
                    } else {
                        item.style.transform = 'translate(0, 0) scale(0.8)';
                        item.classList.remove('menu-item-active');
                    }
                }, delay);
            });
            
            setTimeout(resolve, totalDuration);
        });
    }

    getItemTransform(index) {
        const { direction } = this.options;
        const distance = (index + 1) * 80; // Reduced for smoother feel
        const offset = (index + 1) * 8;    // Reduced spacing
        
        switch (direction) {
            case 'left':
                return `translateX(calc(-${distance}% - ${offset}px)) scale(1)`;
            case 'right':
                return `translateX(calc(${distance}% + ${offset}px)) scale(1)`;
            case 'top':
                return `translateY(calc(-${distance}% - ${offset}px)) scale(1)`;
            case 'bottom':
                return `translateY(calc(${distance}% + ${offset}px)) scale(1)`;
            default:
                return `translateY(calc(-${distance}% - ${offset}px)) scale(1)`;
        }
    }

    handleItemClick(index) {
        const item = this.options.items[index];
        
        // Add click feedback
        const clickedItem = this.menuItems[index];
        clickedItem.classList.add('item-clicked');
        
        setTimeout(() => {
            clickedItem.classList.remove('item-clicked');
            this.close();
            
            if (this.options.onChange && typeof this.options.onChange === 'function') {
                this.options.onChange(item, index);
            }
        }, 150);
    }
}

// Application Integration
class MenuManager {
    constructor() {
        this.theme = localStorage.getItem('theme') || 'light';
        this.notifications = JSON.parse(localStorage.getItem('notifications') || 'true');
        this.init();
    }

    init() {
        this.initializeMenu();
        this.applyTheme();
    }

    initializeMenu() {
        const menuItems = [
            { icon: '🔄', name: 'Check for Updates', value: 'updates' },
            { icon: '🔔', name: 'Notifications', value: 'notifications' },
            { icon: this.theme === 'dark' ? '☀️' : '🌙', name: 'Theme Toggle', value: 'theme' }
        ];

        this.menu = new GooeyMenu('gooey-menu-bottom-right', {
            items: menuItems,
            direction: 'left',
            duration: 250,
            stagger: 40,
            onChange: (item, index) => this.handleMenuAction(item.value, item)
        });
    }

    handleMenuAction(action, item) {
        switch (action) {
            case 'updates':
                this.checkForUpdates();
                break;
            case 'notifications':
                this.toggleNotifications();
                break;
            case 'theme':
                this.toggleTheme();
                break;
            default:
                console.warn('Unknown menu action:', action);
        }
    }

    checkForUpdates() {
        this.showNotification('Checking for updates...', 'info');
        
        // Simulate update check
        setTimeout(() => {
            this.showNotification('Your app is up to date!', 'success');
        }, 2000);
    }

    toggleNotifications() {
        this.notifications = !this.notifications;
        localStorage.setItem('notifications', JSON.stringify(this.notifications));
        
        const status = this.notifications ? 'enabled' : 'disabled';
        this.showNotification(`Notifications ${status}`, 'info');
    }

    toggleTheme() {
        this.theme = this.theme === 'dark' ? 'light' : 'dark';
        localStorage.setItem('theme', this.theme);
        
        this.applyTheme();
        this.updateThemeIcon();
        
        const themeName = this.theme.charAt(0).toUpperCase() + this.theme.slice(1);
        this.showNotification(`Switched to ${themeName} Theme`, 'success');
    }

    applyTheme() {
        document.body.classList.toggle('dark-theme', this.theme === 'dark');
    }

    updateThemeIcon() {
        const themeButton = document.querySelector('[data-value="theme"]');
        if (themeButton) {
            const newIcon = this.theme === 'dark' ? '☀️' : '🌙';
            themeButton.innerHTML = `${newIcon}<span class="sr-only">Theme Toggle</span>`;
        }
    }

    showNotification(message, type = 'info') {
        if (!this.notifications) return;

        const notification = document.createElement('div');
        notification.className = `notification notification--${type}`;
        notification.textContent = message;
        
        document.body.appendChild(notification);

        // Trigger animation
        requestAnimationFrame(() => {
            notification.classList.add('notification--show');
        });

        // Auto-remove after 3 seconds
        setTimeout(() => {
            notification.classList.remove('notification--show');
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new MenuManager();
});