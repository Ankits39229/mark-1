// Settings page content and functionality
const SettingsPage = {
    title: "Settings",
    
    getContent: () => {
        return `
            <div class="settings-section">
                <h2>Application Settings</h2>
                <p>Configure your application preferences and options.</p>
                
                <div class="settings-panels">
                    <div class="card settings-card">
                        <h3>🌙 Theme Settings</h3>
                        <div class="setting-item">
                            <label for="theme-select">Theme:</label>
                            <select id="theme-select" class="setting-select" onchange="SettingsPage.changeTheme()">
                                <option value="light">Light</option>
                                <option value="dark">Dark</option>
                                <option value="auto">Auto</option>
                            </select>
                        </div>
                    </div>
                    
                    <div class="card settings-card">
                        <h3>🔔 Notification Settings</h3>
                        <div class="setting-item">
                            <label class="checkbox-label">
                                <input type="checkbox" id="desktop-notifications" checked onchange="SettingsPage.toggleNotifications('desktop')">
                                Enable Desktop Notifications
                            </label>
                        </div>
                        <div class="setting-item">
                            <label class="checkbox-label">
                                <input type="checkbox" id="sound-notifications" onchange="SettingsPage.toggleNotifications('sound')">
                                Enable Sound Notifications
                            </label>
                        </div>
                    </div>
                </div>
                
                <div class="feature-cards">
                    <div class="card">
                        <h3>🌐 Language</h3>
                        <p>Select your preferred language</p>
                        <select id="language-select" class="setting-select" onchange="SettingsPage.changeLanguage()">
                            <option value="en">English</option>
                            <option value="es">Español</option>
                            <option value="fr">Français</option>
                            <option value="de">Deutsch</option>
                        </select>
                    </div>
                    <div class="card">
                        <h3>💾 Data Management</h3>
                        <p>Backup and restore your data</p>
                        <div class="button-group">
                            <button class="card-button" onclick="SettingsPage.backupData()">Backup Data</button>
                            <button class="card-button" onclick="SettingsPage.restoreData()">Restore Data</button>
                        </div>
                    </div>
                    <div class="card">
                        <h3>🔧 Advanced</h3>
                        <p>Advanced application settings</p>
                        <button class="card-button" onclick="SettingsPage.openAdvanced()">Advanced Settings</button>
                    </div>
                    <div class="card">
                        <h3>🗑️ Reset</h3>
                        <p>Reset application to default settings</p>
                        <button class="card-button danger" onclick="SettingsPage.resetSettings()">Reset All Settings</button>
                    </div>
                </div>
            </div>
        `;
    },
    
    init: () => {
        console.log('Settings page initialized');
        SettingsPage.loadSettings();
    },
    
    cleanup: () => {
        console.log('Settings page cleanup');
    },
    
    // Settings-specific methods
    loadSettings: () => {
        // Load saved settings from localStorage or other storage
        const savedTheme = localStorage.getItem('app-theme') || 'light';
        const themeSelect = document.getElementById('theme-select');
        if (themeSelect) {
            themeSelect.value = savedTheme;
        }
        
        const savedLanguage = localStorage.getItem('app-language') || 'en';
        const languageSelect = document.getElementById('language-select');
        if (languageSelect) {
            languageSelect.value = savedLanguage;
        }
    },
    
    changeTheme: () => {
        const theme = document.getElementById('theme-select').value;
        localStorage.setItem('app-theme', theme);
        alert(`Theme changed to: ${theme}`);
        // Here you could actually apply the theme
    },
    
    toggleNotifications: (type) => {
        const checkbox = document.getElementById(`${type}-notifications`);
        const isEnabled = checkbox.checked;
        localStorage.setItem(`${type}-notifications`, isEnabled);
        console.log(`${type} notifications: ${isEnabled ? 'enabled' : 'disabled'}`);
    },
    
    changeLanguage: () => {
        const language = document.getElementById('language-select').value;
        localStorage.setItem('app-language', language);
        alert(`Language changed to: ${language}`);
        // Here you could implement actual language switching
    },
    
    backupData: () => {
        // Simulate backup process
        alert('Data backup started! Your data will be saved to the default backup location.');
    },
    
    restoreData: () => {
        const confirm = window.confirm('Are you sure you want to restore data? This will overwrite current data.');
        if (confirm) {
            alert('Data restore completed!');
        }
    },
    
    openAdvanced: () => {
        alert('Advanced settings panel would open here!');
    },
    
    resetSettings: () => {
        const confirm = window.confirm('Are you sure you want to reset all settings? This action cannot be undone.');
        if (confirm) {
            localStorage.clear();
            alert('All settings have been reset to default values.');
            SettingsPage.loadSettings();
        }
    }
};

if (typeof module !== 'undefined' && module.exports) {
    module.exports = SettingsPage;
} else {
    window.SettingsPage = SettingsPage;
}
