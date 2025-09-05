// Profile page content and functionality
const ProfilePage = {
    title: "User Profile",
    
    getContent: () => {
        return `
            <div class="profile-section">
                <h2>User Profile</h2>
                <p>Manage your profile information and preferences.</p>
                
                <div class="profile-form-section">
                    <div class="card profile-card">
                        <h3>👤 Personal Information</h3>
                        <form id="profile-form" class="profile-form">
                            <div class="form-group">
                                <label for="username">Username:</label>
                                <input type="text" id="username" name="username" value="user123" class="form-input">
                            </div>
                            <div class="form-group">
                                <label for="email">Email:</label>
                                <input type="email" id="email" name="email" value="user@example.com" class="form-input">
                            </div>
                            <div class="form-group">
                                <label for="fullname">Full Name:</label>
                                <input type="text" id="fullname" name="fullname" value="John Doe" class="form-input">
                            </div>
                            <button type="button" onclick="ProfilePage.updateProfile()" class="card-button">Update Profile</button>
                        </form>
                    </div>
                </div>
                
                <div class="feature-cards">
                    <div class="card">
                        <h3>🔒 Security</h3>
                        <p>Change password and security settings</p>
                        <button class="card-button" onclick="ProfilePage.changePassword()">Change Password</button>
                    </div>
                    <div class="card">
                        <h3>🎨 Preferences</h3>
                        <p>Customize your application experience</p>
                        <button class="card-button" onclick="ProfilePage.openPreferences()">Open Preferences</button>
                    </div>
                    <div class="card">
                        <h3>📱 Device Info</h3>
                        <p>View your device and session information</p>
                        <div id="device-info" class="device-info">
                            <small>Last login: Today at 2:30 PM</small>
                        </div>
                    </div>
                </div>
            </div>
        `;
    },
    
    init: () => {
        console.log('Profile page initialized');
        ProfilePage.loadUserData();
    },
    
    cleanup: () => {
        console.log('Profile page cleanup');
    },
    
    // Profile-specific methods
    loadUserData: () => {
        // Simulate loading user data
        console.log('Loading user profile data...');
    },
    
    updateProfile: () => {
        const username = document.getElementById('username').value;
        const email = document.getElementById('email').value;
        const fullname = document.getElementById('fullname').value;
        
        // Simulate profile update
        alert(`Profile updated!\nUsername: ${username}\nEmail: ${email}\nFull Name: ${fullname}`);
    },
    
    changePassword: () => {
        const newPassword = prompt('Enter new password:');
        if (newPassword) {
            alert('Password changed successfully!');
        }
    },
    
    openPreferences: () => {
        alert('Preferences panel would open here!');
    }
};

if (typeof module !== 'undefined' && module.exports) {
    module.exports = ProfilePage;
} else {
    window.ProfilePage = ProfilePage;
}
