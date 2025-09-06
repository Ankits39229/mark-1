const HomePage = () => {
  return (
    <div className="animate-fade-in">
      <header className="content-header">
        <div className="p-8">
          <h1 className="text-4xl font-bold text-center text-gray-800">Welcome to Technician App</h1>
          <p className="text-center text-gray-600 mt-4">Your professional desktop application</p>
        </div>
      </header>
      <div className="p-8">
        <h2 className="text-3xl font-light mb-4 text-gray-700">Hello! Welcome to your Electron App</h2>
        <p className="mb-4 text-gray-500">This is a simple Electron desktop application.</p>
        <p className="mb-8 text-gray-500">Built for professional technician workflows and management.</p>

        <div className="feature-cards">
          <div className="card">
            <h3>🚀 Fast & Responsive</h3>
            <p>Built with Electron for cross-platform compatibility</p>
          </div>
          <div className="card">
            <h3>🔧 Professional Tools</h3>
            <p>Designed specifically for technician workflows</p>
          </div>
          <div className="card">
            <h3>� Desktop Experience</h3>
            <p>Full desktop application experience</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
