import React from 'react';
import { createRoot } from 'react-dom/client';
import SparklesHeader from '../src/components/SparklesHeader';
import '../src/globals.css';

const HomePageWithSparkles = () => {
  return (
    <div className="home-page-with-sparkles">
      <SparklesHeader />
      
      {/* Original home content below the sparkles header */}
      <div className="welcome-section p-8">
        <h2 className="text-2xl font-bold mb-4">Hello! Welcome to your Electron App</h2>
        <p className="mb-4">This is a simple Electron application with a side navigation bar and sparkles!</p>
        <p className="mb-8">Click on the navigation items in the sidebar to explore different sections.</p>
        
        <div className="feature-cards grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="card p-6 bg-card rounded-lg border">
            <h3 className="text-xl font-semibold mb-2">🚀 Fast & Responsive</h3>
            <p>Built with Electron for cross-platform compatibility</p>
          </div>
          <div className="card p-6 bg-card rounded-lg border">
            <h3 className="text-xl font-semibold mb-2">🎨 Clean Design</h3>
            <p>Simple and intuitive user interface with sparkles</p>
          </div>
          <div className="card p-6 bg-card rounded-lg border">
            <h3 className="text-xl font-semibold mb-2">📱 Navigation</h3>
            <p>Easy-to-use sidebar navigation</p>
          </div>
        </div>
      </div>
    </div>
  );
};

// Function to mount the React component when home page is loaded
export const mountHomePageWithSparkles = (containerId = 'main-content') => {
  const container = document.getElementById(containerId);
  if (container) {
    const root = createRoot(container);
    root.render(<HomePageWithSparkles />);
    return root;
  }
  return null;
};

export default HomePageWithSparkles;
