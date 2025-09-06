const AboutPage = () => {
  return (
    <div className="p-8 animate-fade-in">
      <h2 className="text-3xl font-light mb-4 text-gray-700">About This Application</h2>
      <p className="mb-8 text-gray-500">Learn more about this Electron application and its features.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="card">
          <div className="flex flex-col items-center text-center">
            <div className="text-6xl mb-4">📱</div>
            <h3 className="text-xl font-semibold">Electron Sidebar App</h3>
            <p className="text-gray-500">Version 1.0.0</p>
            <div className="mt-4 text-left bg-gray-50 p-4 rounded-lg w-full">
              <p><strong>Build Date:</strong> <span>{new Date().toLocaleDateString()}</span></p>
              <p><strong>Platform:</strong> <span>{process.platform || 'Unknown'}</span></p>
              <p><strong>Node.js:</strong> <span>{process.versions.node || 'Unknown'}</span></p>
              <p><strong>Electron:</strong> <span>{process.versions.electron || 'Unknown'}</span></p>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="card">
            <h3 className="text-lg font-semibold mb-2">📱 Electron Framework</h3>
            <p>Built with Electron.js for cross-platform desktop applications.</p>
          </div>
          <div className="card">
            <h3 className="text-lg font-semibold mb-2">🚀 Modern Technologies</h3>
            <p>React, TypeScript, Tailwind CSS, and Vite.</p>
          </div>
          <div className="card">
            <h3 className="text-lg font-semibold mb-2">💡 Open Source</h3>
            <p>Built with modern web technologies and open source tools.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
