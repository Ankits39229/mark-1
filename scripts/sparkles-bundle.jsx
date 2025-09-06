import React from 'react';
import { createRoot } from 'react-dom/client';
import { SparklesCore } from '../src/components/ui/shadcn-io/sparkles';

// Create the sparkles header component
const SparklesHeader = () => {
  return (
    <div style={{
      height: '40rem',
      width: '100%',
      backgroundColor: 'black',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden',
      borderRadius: '0.375rem'
    }}>
      <h1 style={{
        fontSize: 'clamp(3rem, 8vw, 9rem)',
        fontWeight: 'bold',
        textAlign: 'center',
        color: 'white',
        position: 'relative',
        zIndex: 20,
        margin: 0,
        fontFamily: 'system-ui, -apple-system, sans-serif'
      }}>
        Acme
      </h1>
      <div style={{
        width: '40rem',
        height: '10rem',
        position: 'relative',
        maxWidth: '90vw'
      }}>
        {/* Gradients */}
        <div style={{
          position: 'absolute',
          left: '5rem',
          right: '5rem',
          top: 0,
          background: 'linear-gradient(to right, transparent, rgb(99 102 241), transparent)',
          height: '2px',
          width: '75%',
          filter: 'blur(1px)'
        }} />
        <div style={{
          position: 'absolute',
          left: '5rem',
          right: '5rem',
          top: 0,
          background: 'linear-gradient(to right, transparent, rgb(99 102 241), transparent)',
          height: '1px',
          width: '75%'
        }} />
        <div style={{
          position: 'absolute',
          left: '15rem',
          right: '15rem',
          top: 0,
          background: 'linear-gradient(to right, transparent, rgb(14 165 233), transparent)',
          height: '5px',
          width: '25%',
          filter: 'blur(1px)'
        }} />
        <div style={{
          position: 'absolute',
          left: '15rem',
          right: '15rem',
          top: 0,
          background: 'linear-gradient(to right, transparent, rgb(14 165 233), transparent)',
          height: '1px',
          width: '25%'
        }} />
        {/* Core component */}
        <SparklesCore
          background="transparent"
          minSize={0.4}
          maxSize={1}
          particleDensity={1200}
          className="sparkles-core"
          particleColor="#FFFFFF"
        />
        {/* Radial Gradient to prevent sharp edges */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'black',
          WebkitMask: 'radial-gradient(350px 200px at top, transparent 20%, white)',
          mask: 'radial-gradient(350px 200px at top, transparent 20%, white)'
        }}></div>
      </div>
    </div>
  );
};

// Global function to mount sparkles header
window.mountSparklesHeader = function(containerId) {
  const container = document.getElementById(containerId);
  if (container) {
    const root = createRoot(container);
    root.render(<SparklesHeader />);
    console.log('Sparkles header mounted successfully');
    return root;
  } else {
    console.error('Container not found for sparkles header:', containerId);
    return null;
  }
};

// CSS for the sparkles core
const sparklesStyle = document.createElement('style');
sparklesStyle.textContent = `
  .sparkles-core {
    width: 100% !important;
    height: 100% !important;
  }
`;
document.head.appendChild(sparklesStyle);
