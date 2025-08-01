// Futuristic Experience for Killer Zorse

// 1. Futuristic animated light sweep on CTA button
document.addEventListener('DOMContentLoaded', () => {
  // CTA sweep on all buttons with .cta-button
  document.querySelectorAll('.cta-button').forEach(cta => {
    cta.addEventListener('mousemove', function(e) {
      const rect = cta.getBoundingClientRect();
      const x = e.clientX - rect.left;
      cta.style.setProperty('--x', `${x}px`);
    });
    cta.addEventListener('mouseleave', function() {
      cta.style.setProperty('--x', `50%`);
    });
  });

  // Particle effect in hero visual (only on homepage)
  const visual = document.querySelector('.hero-visual');
  if (visual) {
    if (!visual.querySelector('canvas')) {
      const canvas = document.createElement('canvas');
      canvas.width = visual.offsetWidth;
      canvas.height = visual.offsetHeight;
      canvas.style.position = 'absolute';
      canvas.style.left = "0";
      canvas.style.top = "0";
      canvas.style.pointerEvents = "none";
      visual.style.position = 'relative';
      visual.appendChild(canvas);

      // Simple glowing particle system
      const ctx = canvas.getContext('2d');
      const particles = [];
      const count = 16;
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          r: 7 + Math.random() * 8,
          dx: -0.3 + Math.random() * 0.6,
          dy: -0.3 + Math.random() * 0.6,
          alpha: 0.5 + Math.random() * 0.5
        });
      }

      function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (let p of particles) {
          ctx.save();
          const grad = ctx.createRadialGradient(
            p.x, p.y, 0.1,
            p.x, p.y, p.r
          );
          grad.addColorStop(0, `rgba(64,217,255,${p.alpha})`);
          grad.addColorStop(1, 'rgba(64,217,255,0)');
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
          ctx.fillStyle = grad;
          ctx.fill();
          ctx.restore();

          p.x += p.dx;
          p.y += p.dy;
          if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
          if (p.y < 0 || p.y > canvas.height) p.dy *= -1;
        }
        requestAnimationFrame(draw);
      }
      draw();

      // Responsive: resize canvas if needed
      window.addEventListener('resize', () => {
        canvas.width = visual.offsetWidth;
        canvas.height = visual.offsetHeight;
      });
    }
  }

  // Neon flicker effect on headline (if present)
  const headline = document.querySelector('.hero h1');
  if (headline) {
    let flickerTimeout;
    function flicker() {
      headline.style.textShadow = `
        0 0 8px #40d9ff,
        0 0 22px #40d9ff,
        0 0 32px #8844ee,
        0 0 8px #40d9ff
      `;
      setTimeout(() => {
        headline.style.textShadow = '';
        flickerTimeout = setTimeout(flicker, 2500 + Math.random() * 2000);
      }, 80 + Math.random() * 120);
    }
    flickerTimeout = setTimeout(flicker, 1800);
  }

  // AUTH FORMS: Demo "success" for login/signup (no backend)
  // Replace with real backend logic as needed!
  function showError(form, message) {
    let err = form.querySelector('.form-error');
    if (!err) {
      err = document.createElement('div');
      err.className = 'form-error';
      form.insertBefore(err, form.firstChild.nextSibling);
    }
    err.textContent = message;
  }
  function clearError(form) {
    const err = form.querySelector('.form-error');
    if (err) err.remove();
  }

  // Signup form
  const signupForm = document.getElementById('signup-form');
  if (signupForm) {
    signupForm.addEventListener('submit', function(e) {
      e.preventDefault();
      clearError(signupForm);
      const user = signupForm.username.value.trim();
      const email = signupForm.email.value.trim();
      const pass = signupForm.password.value;
      if (!user || !email || !pass) {
        showError(signupForm, 'Please fill in all fields.');
        return;
      }
      // Simulate success
      signupForm.querySelector('.cta-button').textContent = 'Creating...';
      setTimeout(() => {
        window.location.href = 'dashboard.html';
      }, 650);
    });
  }
  // Login form
  const loginForm = document.getElementById('login-form');
  if (loginForm) {
    loginForm.addEventListener('submit', function(e) {
      e.preventDefault();
      clearError(loginForm);
      const email = loginForm.email.value.trim();
      const pass = loginForm.password.value;
      if (!email || !pass) {
        showError(loginForm, 'Please enter your email and password.');
        return;
      }
      // Simulate login
      loginForm.querySelector('.cta-button').textContent = 'Signing In...';
      setTimeout(() => {
        window.location.href = 'dashboard.html';
      }, 650);
    });
  }
});