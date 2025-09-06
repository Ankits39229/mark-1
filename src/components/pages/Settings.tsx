const SettingsPage = () => {
  const resetSettings = () => {
    if (window.confirm('Are you sure you want to reset all settings? This action cannot be undone.')) {
      localStorage.clear();
      alert('All settings have been reset to default values.');
      // You might want to reload or update state here
    }
  };

  return (
    <div className="p-8 animate-fade-in">
      <h2 className="text-3xl font-light mb-4 text-gray-700">Application Settings</h2>
      <p className="mb-8 text-gray-500">Configure your application preferences and options.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <div className="card">
          <h3 className="text-xl font-semibold mb-4">🌙 Theme Settings</h3>
          <div className="space-y-4">
            <div>
              <label htmlFor="theme-select" className="block text-sm font-medium text-gray-700">Theme</label>
              <select id="theme-select" className="setting-select">
                <option value="light">Light</option>
                <option value="dark">Dark</option>
                <option value="auto">Auto</option>
              </select>
            </div>
          </div>
        </div>
        <div className="card">
          <h3 className="text-xl font-semibold mb-4">🔔 Notification Settings</h3>
          <div className="space-y-4">
            <label className="checkbox-label">
              <input type="checkbox" defaultChecked />
              Enable Desktop Notifications
            </label>
            <label className="checkbox-label">
              <input type="checkbox" />
              Enable Sound Notifications
            </label>
          </div>
        </div>
      </div>

      <div className="feature-cards">
        <div className="card">
          <h3>🌐 Language</h3>
          <p>Select your preferred language</p>
          <select className="setting-select mt-2">
            <option value="en">English</option>
            <option value="es">Español</option>
            <option value="fr">Français</option>
            <option value="de">Deutsch</option>
          </select>
        </div>
        <div className="card">
          <h3>💾 Data Management</h3>
          <p>Backup and restore your data</p>
          <div className="button-group">
            <button className="card-button" onClick={() => alert('Data backup started!')}>Backup Data</button>
            <button className="card-button" onClick={() => alert('Data restore completed!')}>Restore Data</button>
          </div>
        </div>
        <div className="card">
          <h3>🔧 Advanced</h3>
          <p>Advanced application settings</p>
          <button className="card-button" onClick={() => alert('Advanced settings panel would open here!')}>Advanced Settings</button>
        </div>
        <div className="card">
          <h3>🗑️ Reset</h3>
          <p>Reset application to default settings</p>
          <button className="card-button danger" onClick={resetSettings}>Reset All Settings</button>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
