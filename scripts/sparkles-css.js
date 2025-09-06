// CSS-based sparkles effect (fallback)
window.createSparklesHeaderCSS = function(containerId) {
  const container = document.getElementById(containerId);
  if (!container) {
    console.error('Container not found:', containerId);
    return null;
  }
  
  // Generate random sparkles
  let sparklesHTML = '';
  for (let i = 0; i < 50; i++) {
    const left = Math.random() * 100;
    const top = Math.random() * 100;
    const delay = Math.random() * 4;
    const duration = 2 + Math.random() * 3;
    const size = 2 + Math.random() * 4;
    
    sparklesHTML += `
      <div class="css-sparkle" style="
        left: ${left}%;
        top: ${top}%;
        animation-delay: ${delay}s;
        animation-duration: ${duration}s;
        width: ${size}px;
        height: ${size}px;
      "></div>
    `;
  }
  
  // Create the sparkles header HTML with CSS sparkles
  const headerHTML = `
    <div class="sparkles-header">
      <h1 class="sparkles-title">Technician</h1>
      <div class="sparkles-canvas-container">
        <!-- Gradient elements -->
        <div class="gradient-line gradient-1"></div>
        <div class="gradient-line gradient-2"></div>
        <div class="gradient-line gradient-3"></div>
        <div class="gradient-line gradient-4"></div>
        
        <!-- CSS-based sparkles -->
        <div class="css-sparkles-container">
          ${sparklesHTML}
        </div>
        
        <!-- Radial gradient mask -->
        <div class="sparkles-mask"></div>
      </div>
    </div>
  `;
  
  container.innerHTML = headerHTML;
  
  console.log('CSS Sparkles header created successfully');
  return { type: 'css' };
};

// Add CSS for the sparkles animation
const sparklesAnimationCSS = `
.css-sparkles-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: 10;
}

.css-sparkle {
  position: absolute;
  background: #6b9080;
  border-radius: 50%;
  animation: sparkle-twinkle infinite ease-in-out;
  box-shadow: 0 0 10px rgba(107, 144, 128, 0.8);
}

@keyframes sparkle-twinkle {
  0%, 100% {
    opacity: 0;
    transform: scale(0.5);
  }
  50% {
    opacity: 1;
    transform: scale(1.2);
  }
}

/* Floating animation for some sparkles */
.css-sparkle:nth-child(3n) {
  animation: sparkle-float 6s infinite linear;
}

@keyframes sparkle-float {
  0% {
    opacity: 0;
    transform: translateY(0) scale(0.5);
  }
  10% {
    opacity: 1;
  }
  90% {
    opacity: 1;
  }
  100% {
    opacity: 0;
    transform: translateY(-20px) scale(1.5);
  }
}
`;

// Add the CSS to the document
const styleElement = document.createElement('style');
styleElement.textContent = sparklesAnimationCSS;
document.head.appendChild(styleElement);
