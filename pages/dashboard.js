// Dashboard page content and functionality
const DashboardPage = {
    title: "Dashboard",
    
    getContent: () => {
        return `
            <div class="dashboard-section">
                <h2>Dashboard Overview</h2>
                <p>Welcome to your application dashboard. Here you can view key metrics and information.</p>
                
                <div class="feature-cards">
                    <div class="card">
                        <h3>📈 Analytics</h3>
                        <p>View your application metrics and usage statistics</p>
                        <button class="card-button" onclick="DashboardPage.showAnalytics()">View Analytics</button>
                    </div>
                    <div class="card">
                        <h3>📊 Reports</h3>
                        <p>Generate and view detailed reports</p>
                        <button class="card-button" onclick="DashboardPage.generateReport()">Generate Report</button>
                    </div>
                    <div class="card">
                        <h3>🔔 Notifications</h3>
                        <p>Stay updated with important alerts and messages</p>
                        <div id="notification-count" class="notification-badge">3</div>
                    </div>
                    <div class="card">
                        <h3>⚡ Quick Actions</h3>
                        <p>Perform common tasks with one click</p>
                        <button class="card-button" onclick="DashboardPage.quickAction()">Quick Action</button>
                    </div>
                </div>
                
                <div id="dashboard-content" class="dashboard-dynamic-content">
                    <!-- Dynamic content will be loaded here -->
                </div>
            </div>
        `;
    },
    
    init: () => {
        console.log('Dashboard page initialized');
        DashboardPage.loadMetrics();
    },
    
    cleanup: () => {
        console.log('Dashboard page cleanup');
    },
    
    // Dashboard-specific methods
    loadMetrics: () => {
        // Simulate loading metrics
        setTimeout(() => {
            const dynamicContent = document.getElementById('dashboard-content');
            if (dynamicContent) {
                dynamicContent.innerHTML = `
                    <div class="metrics-section">
                        <h3>Today's Metrics</h3>
                        <div class="metrics-grid">
                            <div class="metric-item">
                                <span class="metric-value">1,234</span>
                                <span class="metric-label">Active Users</span>
                            </div>
                            <div class="metric-item">
                                <span class="metric-value">56</span>
                                <span class="metric-label">New Reports</span>
                            </div>
                            <div class="metric-item">
                                <span class="metric-value">89%</span>
                                <span class="metric-label">System Health</span>
                            </div>
                        </div>
                    </div>
                `;
            }
        }, 500);
    },
    
    showAnalytics: () => {
        alert('Analytics feature would open here!');
    },
    
    generateReport: () => {
        alert('Report generation started!');
    },
    
    quickAction: () => {
        alert('Quick action performed!');
    }
};

if (typeof module !== 'undefined' && module.exports) {
    module.exports = DashboardPage;
} else {
    window.DashboardPage = DashboardPage;
}
