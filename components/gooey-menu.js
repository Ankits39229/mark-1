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
    // Default menu items
    const defaultItems = [
        { icon: '🏠', name: 'Home', value: 'home' },
        { icon: '✉️', name: 'Mail', value: 'mail' },
        { icon: '👤', name: 'User', value: 'user' },
        { icon: '⚙️', name: 'Settings', value: 'settings' }
    ];

    // Create gooey menu instances
    const bottomRightMenu = new GooeyMenu('gooey-menu-bottom-right', {
        items: defaultItems,
        direction: 'top',
        onChange: (item, index) => {
            console.log('Menu item clicked:', item.name, item.value);
            // Add your custom logic here
            handleMenuAction(item.value);
        }
    });

    // Handle menu actions
    function handleMenuAction(action) {
        switch(action) {
            case 'home':
                if (typeof loadPage === 'function') loadPage('home');
                break;
            case 'mail':
                console.log('Mail functionality not implemented yet');
                break;
            case 'user':
                if (typeof loadPage === 'function') loadPage('profile');
                break;
            case 'settings':
                if (typeof loadPage === 'function') loadPage('settings');
                break;
            default:
                console.log('Unknown action:', action);
        }
    }
});
