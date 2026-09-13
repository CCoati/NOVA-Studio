/**
 * NOVA STUDIO — Interactive Constellation Hero Canvas
 * Renders an animated particle constellation grid with interactive cursor physics.
 */

export function initHeroCanvas() {
  const canvas = document.getElementById('heroCanvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  let width, height;
  let particles = [];
  const mouse = { x: null, y: null, radius: 150 };
  let animationFrameId;

  class Particle {
    constructor() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.size = Math.random() * 1.8 + 0.8;
      this.baseX = this.x;
      this.baseY = this.y;
      this.vx = (Math.random() - 0.5) * 0.4;
      this.vy = (Math.random() - 0.5) * 0.4;
      this.alpha = Math.random() * 0.5 + 0.2;
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;

      if (this.x < 0 || this.x > width) this.vx *= -1;
      if (this.y < 0 || this.y > height) this.vy *= -1;

      if (mouse.x !== null && mouse.y !== null) {
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < mouse.radius) {
          const force = (mouse.radius - dist) / mouse.radius;
          const dirX = (dx / dist) * force * 15;
          const dirY = (dy / dist) * force * 15;
          this.x -= dirX;
          this.y -= dirY;
        }
      }
    }

    draw() {
      ctx.fillStyle = `rgba(255, 255, 255, ${this.alpha})`;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  function initParticles() {
    particles = [];
    const count = Math.floor((width * height) / 16000);
    for (let i = 0; i < Math.min(count, 90); i++) {
      particles.push(new Particle());
    }
  }

  function resizeCanvas() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
    initParticles();
  }

  function animateParticles() {
    ctx.clearRect(0, 0, width, height);

    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 130) {
          const alpha = (1 - dist / 130) * 0.12;
          ctx.strokeStyle = `rgba(255, 255, 255, ${alpha})`;
          ctx.lineWidth = 0.75;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }
    }

    particles.forEach(p => {
      p.update();
      p.draw();
    });

    animationFrameId = requestAnimationFrame(animateParticles);
  }

  window.addEventListener('resize', resizeCanvas);
  window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });
  window.addEventListener('mouseleave', () => {
    mouse.x = null;
    mouse.y = null;
  });

  resizeCanvas();
  animateParticles();

  return () => {
    cancelAnimationFrame(animationFrameId);
    window.removeEventListener('resize', resizeCanvas);
  };
}
