// Collapsible Sidebar Component for Electron App
class CollapsibleSidebar {
  constructor(container) {
    this.container = container;
    this.isExpanded = false;
    this.hoverTimeout = null;
    
    // Navigation items configuration
    this.navItems = [
      { id: 'home', icon: '🏠', label: 'Home', page: 'home' },
      { id: 'dashboard', icon: '📊', label: 'Dashboard', page: 'dashboard' },
      { id: 'profile', icon: '👤', label: 'Profile', page: 'profile' },
      { id: 'settings', icon: '⚙️', label: 'Settings', page: 'settings' },
      { id: 'about', icon: 'ℹ️', label: 'About', page: 'about' },
      { id: 'contact', icon: '📞', label: 'Contact', page: 'contact' },
      { id: 'help', icon: '❓', label: 'Help', page: 'help' }
    ];
    
    this.activeItem = 'home';
    this.init();
  }
  
  init() {
    this.render();
    this.attachEventListeners();
  }
  
  render() {
    const sidebarHTML = `
      <div class="collapsible-sidebar">
        <div class="sidebar-content">
          <nav class="nav-list">
            ${this.navItems.map(item => `
              <div class="nav-item ${item.id === this.activeItem ? 'active' : ''}" 
                   data-page="${item.page}" 
                   data-tooltip="${item.label}">
                <div class="nav-icon">${item.icon}</div>
                <div class="nav-label">${item.label}</div>
              </div>
            `).join('')}
          </nav>
        </div>
        <div class="tooltip" id="sidebar-tooltip"></div>
      </div>
    `;
    
    this.container.innerHTML = sidebarHTML;
  }
  
  attachEventListeners() {
    const sidebar = this.container.querySelector('.collapsible-sidebar');
    const navItems = this.container.querySelectorAll('.nav-item');
    const tooltip = this.container.querySelector('#sidebar-tooltip');
    
    // Sidebar hover events
    sidebar.addEventListener('mouseenter', () => {
      clearTimeout(this.hoverTimeout);
      this.expand();
    });
    
    sidebar.addEventListener('mouseleave', () => {
      this.hoverTimeout = setTimeout(() => {
        this.collapse();
      }, 300); // Small delay before collapsing
    });
    
    // Navigation item events
    navItems.forEach(item => {
      // Click handler for navigation
      item.addEventListener('click', () => {
        const page = item.dataset.page;
        this.setActiveItem(page);
        // Trigger the existing page navigation logic
        if (window.navigateToPage) {
          window.navigateToPage(page);
        }
      });
      
      // Tooltip events for collapsed state
      item.addEventListener('mouseenter', (e) => {
        if (!this.isExpanded) {
          this.showTooltip(e.currentTarget, tooltip);
        }
      });
      
      item.addEventListener('mouseleave', () => {
        if (!this.isExpanded) {
          this.hideTooltip(tooltip);
        }
      });
    });
  }
  
  expand() {
    const sidebar = this.container.querySelector('.collapsible-sidebar');
    sidebar.classList.add('expanded');
    this.isExpanded = true;
    
    // Hide tooltips when expanded
    const tooltip = this.container.querySelector('#sidebar-tooltip');
    this.hideTooltip(tooltip);
  }
  
  collapse() {
    const sidebar = this.container.querySelector('.collapsible-sidebar');
    sidebar.classList.remove('expanded');
    this.isExpanded = false;
  }
  
  setActiveItem(page) {
    // Remove active class from all items
    const navItems = this.container.querySelectorAll('.nav-item');
    navItems.forEach(item => item.classList.remove('active'));
    
    // Add active class to selected item
    const activeItem = this.container.querySelector(`[data-page="${page}"]`);
    if (activeItem) {
      activeItem.classList.add('active');
    }
    
    this.activeItem = page;
  }
  
  showTooltip(navItem, tooltip) {
    const label = navItem.dataset.tooltip;
    const rect = navItem.getBoundingClientRect();
    
    tooltip.textContent = label;
    tooltip.style.display = 'block';
    tooltip.style.left = (rect.right + 10) + 'px';
    tooltip.style.top = (rect.top + rect.height / 2) + 'px';
    tooltip.style.transform = 'translateY(-50%)';
  }
  
  hideTooltip(tooltip) {
    tooltip.style.display = 'none';
  }
}

// Export for use in other files
window.CollapsibleSidebar = CollapsibleSidebar;
