const DashboardPage = () => {
  return (
    <div className="p-8 animate-fade-in">
      <h2 className="text-3xl font-light mb-4 text-gray-700">Dashboard Overview</h2>
      <p className="mb-8 text-gray-500">Welcome to your application dashboard. Here you can view key metrics and information.</p>

      <div className="feature-cards">
        <div className="card">
          <h3>📈 Analytics</h3>
          <p>View your application metrics and usage statistics</p>
          <button className="card-button" onClick={() => alert('Analytics feature would open here!')}>View Analytics</button>
        </div>
        <div className="card">
          <h3>📊 Reports</h3>
          <p>Generate and view detailed reports</p>
          <button className="card-button" onClick={() => alert('Report generation started!')}>Generate Report</button>
        </div>
        <div className="card relative">
          <h3>🔔 Notifications</h3>
          <p>Stay updated with important alerts and messages</p>
          <div className="notification-badge">3</div>
        </div>
        <div className="card">
          <h3>⚡ Quick Actions</h3>
          <p>Perform common tasks with one click</p>
          <button className="card-button" onClick={() => alert('Quick action performed!')}>Quick Action</button>
        </div>
      </div>

      <div className="mt-8">
        <div className="metrics-section">
          <h3 className="text-2xl font-light text-gray-600 mb-4">Today's Metrics</h3>
          <div className="metrics-grid">
            <div className="metric-item">
              <span className="metric-value">1,234</span>
              <span className="metric-label">Active Users</span>
            </div>
            <div className="metric-item">
              <span className="metric-value">56</span>
              <span className="metric-label">New Reports</span>
            </div>
            <div className="metric-item">
              <span className="metric-value">89%</span>
              <span className="metric-label">System Health</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
