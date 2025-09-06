const ProfilePage = () => {
  const updateProfile = () => {
    alert('Profile updated!');
  };

  const changePassword = () => {
    const newPassword = prompt('Enter new password:');
    if (newPassword) {
      alert('Password changed successfully!');
    }
  };

  return (
    <div className="p-8 animate-fade-in">
      <h2 className="text-3xl font-light mb-4 text-gray-700">User Profile</h2>
      <p className="mb-8 text-gray-500">Manage your profile information and preferences.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="card">
          <h3 className="text-xl font-semibold mb-4">👤 Personal Information</h3>
          <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); updateProfile(); }}>
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
              <input type="text" id="username" name="username" defaultValue="user123" className="form-input" />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
              <input type="email" id="email" name="email" defaultValue="user@example.com" className="form-input" />
            </div>
            <div>
              <label htmlFor="fullname" className="block text-sm font-medium text-gray-700">Full Name</label>
              <input type="text" id="fullname" name="fullname" defaultValue="John Doe" className="form-input" />
            </div>
            <button type="submit" className="card-button w-full">Update Profile</button>
          </form>
        </div>

        <div className="space-y-6">
          <div className="card">
            <h3 className="text-lg font-semibold mb-2">🔒 Security</h3>
            <p>Change password and security settings</p>
            <button className="card-button mt-2" onClick={changePassword}>Change Password</button>
          </div>
          <div className="card">
            <h3 className="text-lg font-semibold mb-2">🎨 Preferences</h3>
            <p>Customize your application experience</p>
            <button className="card-button mt-2" onClick={() => alert('Preferences panel would open here!')}>Open Preferences</button>
          </div>
          <div className="card">
            <h3 className="text-lg font-semibold mb-2">📱 Device Info</h3>
            <p>Last login: Today at 2:30 PM</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
