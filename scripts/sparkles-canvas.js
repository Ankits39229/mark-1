// Pure JavaScript Sparkles Effect
class SparklesCanvas {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.particles = [];
    this.animationId = null;
    
    this.init();
  }
  
  init() {
    this.resizeCanvas();
    this.createParticles();
    this.animate();
    
    // Handle window resize
    window.addEventListener('resize', () => this.resizeCanvas());
  }
  
  resizeCanvas() {
    const rect = this.canvas.parentElement.getBoundingClientRect();
    this.canvas.width = rect.width;
    this.canvas.height = rect.height;
  }
  
  createParticles() {
    // Density-based particle count suited for ribbon height
    const area = this.canvas.width * this.canvas.height;
    const density = 0.00045; // adjust for visual fullness
    const particleCount = Math.max(50, Math.min(110, Math.floor(area * density)));
    this.particles = [];
    for (let i = 0; i < particleCount; i++) {
      this.particles.push({
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height,
        size: Math.random() * 2.2 + 0.4, // slightly smaller for compact look
        speedX: (Math.random() - 0.5) * 1.2,
        speedY: (Math.random() - 0.5) * 1.2,
        opacity: Math.random(),
        opacitySpeed: (Math.random() - 0.5) * 0.015
      });
    }
  }
  
  updateParticles() {
    this.particles.forEach(particle => {
      // Update position
      particle.x += particle.speedX;
      particle.y += particle.speedY;
      
      // Update opacity
      particle.opacity += particle.opacitySpeed;
      
      // Bounce off edges
      if (particle.x <= 0 || particle.x >= this.canvas.width) {
        particle.speedX *= -1;
      }
      if (particle.y <= 0 || particle.y >= this.canvas.height) {
        particle.speedY *= -1;
      }
      
      // Keep opacity in bounds
      if (particle.opacity <= 0 || particle.opacity >= 1) {
        particle.opacitySpeed *= -1;
      }
      
      // Keep particles in bounds
      particle.x = Math.max(0, Math.min(this.canvas.width, particle.x));
      particle.y = Math.max(0, Math.min(this.canvas.height, particle.y));
    });
  }
  
  drawParticles() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    
    this.particles.forEach(particle => {
      this.ctx.save();
      this.ctx.globalAlpha = particle.opacity;
      this.ctx.fillStyle = '#6b9080';
      this.ctx.shadowBlur = 10;
      this.ctx.shadowColor = '#6b9080';
      
      this.ctx.beginPath();
      this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      this.ctx.fill();
      
      this.ctx.restore();
    });
  }
  
  animate() {
    this.updateParticles();
    this.drawParticles();
    this.animationId = requestAnimationFrame(() => this.animate());
  }
  
  destroy() {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }
    window.removeEventListener('resize', () => this.resizeCanvas());
  }
}

// Function to create sparkles header
window.createSparklesHeader = function(containerId) {
  const container = document.getElementById(containerId);
  if (!container) {
    console.error('Container not found:', containerId);
    return null;
  }
  
  // Create the sparkles header HTML
  const sparklesHTML = `
    <div class="sparkles-header">
      <h1 class="sparkles-title">Technician</h1>
      <div class="sparkles-canvas-container">
        <div class="gradient-line gradient-1"></div>
        <div class="gradient-line gradient-2"></div>
        <div class="gradient-line gradient-3"></div>
        <div class="gradient-line gradient-4"></div>
        <canvas class="sparkles-canvas" id="sparkles-canvas-${Date.now()}"></canvas>
        <div class="sparkles-mask"></div>
      </div>
    </div>`;
  
  container.innerHTML = sparklesHTML;
  
  // Initialize sparkles canvas
  const canvas = container.querySelector('.sparkles-canvas');
  const sparklesInstance = new SparklesCanvas(canvas);
  
  console.log('Sparkles header created successfully');
  return sparklesInstance;
};
