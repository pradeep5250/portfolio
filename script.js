// ============================================
// HACKER WEBSITE JAVASCRIPT
// ============================================

// ============================================// 1. LOADING ANIMATION
// ============================================
window.addEventListener('load', () => {
  const loaderContainer = document.getElementById('loaderContainer');
  if (loaderContainer) {
    loaderContainer.classList.add('loaded');
    setTimeout(() => {
      loaderContainer.style.display = 'none';
    }, 800);
  }
});

setTimeout(() => {
  const loaderContainer = document.getElementById('loaderContainer');
  if (loaderContainer && !loaderContainer.classList.contains('loaded')) {
    loaderContainer.classList.add('loaded');
    setTimeout(() => {
      loaderContainer.style.display = 'none';
    }, 800);
  }
}, 4000);

// ============================================
// 2. HAMBURGER MENU
// ============================================
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  navMenu.classList.toggle('active');
});

navLinks.forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
  });
});


// ============================================
// 3. SMOOTH SCROLLING
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ============================================
// 4. ACTIVE NAV LINK ON SCROLL
// ============================================
window.addEventListener('scroll', () => {
  const sections = document.querySelectorAll('section, header');
  const navLinks = document.querySelectorAll('.nav-link');
  
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    if (pageYOffset >= sectionTop - 200) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === '#' + current) {
      link.classList.add('active');
    }
  });
});

// ============================================
// 5. PROJECT CARD ANIMATIONS
// ============================================
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.animation = 'slideInUp 0.6s ease forwards';
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

document.querySelectorAll('.project-card').forEach(card => {
  card.style.opacity = '0';
  observer.observe(card);
});

// Add animations
const style = document.createElement('style');
style.textContent = `
  @keyframes slideInUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes slideInLeft {
    from {
      opacity: 0;
      transform: translateX(-50px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }

  @keyframes slideInRight {
    from {
      opacity: 0;
      transform: translateX(50px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }

  @keyframes fadeInScale {
    from {
      opacity: 0;
      transform: scale(0.8);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }

  @keyframes rotateIn {
    from {
      opacity: 0;
      transform: rotate(-10deg) scale(0.9);
    }
    to {
      opacity: 1;
      transform: rotate(0deg) scale(1);
    }
  }

  @keyframes bounceIn {
    0% {
      opacity: 0;
      transform: scale(0.3);
    }
    50% {
      opacity: 1;
      transform: scale(1.05);
    }
    70% {
      transform: scale(0.9);
    }
    100% {
      opacity: 1;
      transform: scale(1);
    }
  }

  @keyframes flipIn {
    from {
      opacity: 0;
      transform: rotateY(-90deg);
    }
    to {
      opacity: 1;
      transform: rotateY(0deg);
    }
  }

  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }

  @keyframes pulse {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.05); }
  }

  @keyframes glow {
    0%, 100% {
      box-shadow: 0 0 10px rgba(0, 255, 0, 0.3);
    }
    50% {
      box-shadow: 0 0 20px rgba(0, 255, 0, 0.6);
    }
  }
`;
document.head.appendChild(style);

// ============================================
// 6. BUTTON INTERACTIONS
// ============================================
document.querySelectorAll('.btn').forEach(btn => {
  btn.addEventListener('mouseenter', function() {
    this.style.transform = 'scale(1.05)';
  });
  
  btn.addEventListener('mouseleave', function() {
    this.style.transform = 'scale(1)';
  });
});



// ============================================
// 7. CONTACT FORM (FINAL & WORKING)
// ============================================

function sendEmail(e) {
  e.preventDefault(); // stop reload

  const from_name = document.getElementById("name").value.trim();
  const from_email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();
  const btn = document.getElementById("sendBtn");

  if (!from_name || !from_email || !message) {
    alert("❌ Please fill all fields");
    return;
  }

  btn.innerText = "Sending...";
  btn.disabled = true;

  const templateParams = {
    name: from_name,
    email: from_email,
    message: message,
    to_email: "peedarp5250@gmail.com"
  };

  emailjs.send("service_uisz659","template_reduwca", templateParams)
  .then(() => {
    alert("✅ Message sent successfully!");
    document.getElementById("contactForm").reset();
    btn.innerText = "Send Message";
    btn.disabled = false;
  })
  .catch((error) => {
    console.error("EmailJS Error:", error);
    alert("❌ Failed to send message");
    btn.innerText = "Send Message";
    btn.disabled = false;
  });
}

function fallbackToMailto(name, email, message, button, originalText) {
  // Create mailto link
  const subject = encodeURIComponent('Contact Form Message from ' + name);
  const body = encodeURIComponent(
    'Name: ' + name + '\n' +
    'Email: ' + email + '\n\n' +
    'Message:\n' + message
  );
  
  const mailtoLink = 'mailto:peedarp5250@gmail.com?subject=' + subject + '&body=' + body;
  
  // Open email client
  window.location.href = mailtoLink;
  
  button.textContent = '✓ Opening Email Client...';
  button.style.background = 'linear-gradient(135deg, #00ccff, #0066ff)';
  button.style.boxShadow = '0 0 30px rgba(0, 204, 255, 0.8)';
  
  setTimeout(() => {
    button.textContent = originalText;
    button.style.background = '';
    button.style.boxShadow = '';
    contactForm.reset();
  }, 3000);
}

// ============================================
// 8. KEYBOARD NAVIGATION
// ============================================
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && navMenu?.classList.contains('active')) {
    hamburger?.classList.remove('active');
    navMenu.classList.remove('active');
  }
});

// ============================================
// 9. SCROLL TO TOP BUTTON
// ============================================
function createScrollToTopButton() {
  const scrollBtn = document.createElement('button');
  scrollBtn.id = 'scrollToTop';
  scrollBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
  scrollBtn.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 50px;
    height: 50px;
    background: linear-gradient(135deg, #0066ff, #00ccff);
    color: #000000;
    border: 2px solid #0066ff;
    border-radius: 4px;
    cursor: pointer;
    display: none;
    align-items: center;
    justify-content: center;
    font-size: 1.2rem;
    z-index: 999;
    box-shadow: 0 0 15px rgba(0, 102, 255, 0.4);
    transition: all 0.3s ease;
    font-weight: bold;
  `;
  
  document.body.appendChild(scrollBtn);
  
  window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
      scrollBtn.style.display = 'flex';
    } else {
      scrollBtn.style.display = 'none';
    }
  });
  
  scrollBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
  
  scrollBtn.addEventListener('mouseenter', function() {
    this.style.transform = 'scale(1.1)';
    this.style.boxShadow = '0 0 30px rgba(0, 102, 255, 0.8)';
  });
  
  scrollBtn.addEventListener('mouseleave', function() {
    this.style.transform = 'scale(1)';
    this.style.boxShadow = '0 0 15px rgba(0, 102, 255, 0.4)';
  });
}

createScrollToTopButton();

// ============================================
// 10. ABOUT CARD ANIMATIONS
// ============================================
const aboutObserver = new IntersectionObserver(function(entries) {
  entries.forEach((entry, index) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.style.animation = 'slideInUp 0.6s ease forwards';
      }, index * 100);
      aboutObserver.unobserve(entry.target);
    }
  });
}, observerOptions);

document.querySelectorAll('.about-card').forEach(card => {
  card.style.opacity = '0';
  aboutObserver.observe(card);
});

// ============================================
// 11. SECTION SCROLL ANIMATIONS
// ============================================
const sectionAnimations = [
  { selector: '.hero-content', animation: 'fadeInScale 0.8s ease forwards' },
  { selector: '.section-title', animation: 'slideInUp 0.6s ease forwards' },
  { selector: '.project-card:nth-child(odd)', animation: 'slideInLeft 0.6s ease forwards' },
  { selector: '.project-card:nth-child(even)', animation: 'slideInRight 0.6s ease forwards' },
  { selector: '.about-card:nth-child(odd)', animation: 'bounceIn 0.8s ease forwards' },
  { selector: '.about-card:nth-child(even)', animation: 'flipIn 0.8s ease forwards' },
  { selector: '.skills-section h3', animation: 'slideInUp 0.6s ease forwards' },
  { selector: '.skills-section p', animation: 'fadeIn 0.6s ease forwards 0.2s' },
  { selector: '.skill-item:nth-child(1)', animation: 'skillFadeInUp 0.6s ease forwards 0.3s' },
  { selector: '.skill-item:nth-child(2)', animation: 'skillFadeInUp 0.6s ease forwards 0.4s' },
  { selector: '.skill-item:nth-child(3)', animation: 'skillFadeInUp 0.6s ease forwards 0.5s' },
  { selector: '.skill-item:nth-child(4)', animation: 'skillFadeInUp 0.6s ease forwards 0.6s' },
  { selector: '.skill-item:nth-child(5)', animation: 'skillFadeInUp 0.6s ease forwards 0.7s' },
  { selector: '.skill-item:nth-child(6)', animation: 'skillFadeInUp 0.6s ease forwards 0.8s' },
  { selector: '.skill-item:nth-child(7)', animation: 'skillFadeInUp 0.6s ease forwards 0.9s' },
  { selector: '.contact-form', animation: 'rotateIn 0.7s ease forwards' },
  { selector: '.stats-section .stat-box', animation: 'fadeInScale 0.6s ease forwards' },
  { selector: '.footer-section', animation: 'slideInUp 0.6s ease forwards' }
];

const scrollObserver = new IntersectionObserver(function(entries) {
  entries.forEach((entry, index) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.style.opacity = '1';
        entry.target.style.animation = entry.target.dataset.animation || 'fadeIn 0.6s ease forwards';
      }, index * 150);
      scrollObserver.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
});

sectionAnimations.forEach(({ selector, animation }) => {
  document.querySelectorAll(selector).forEach(element => {
    element.style.opacity = '0';
    element.dataset.animation = animation;
    scrollObserver.observe(element);
  });
});

// ============================================
// 12. PARALLAX SCROLL EFFECT
// ============================================
let parallaxElements = document.querySelectorAll('.hero, .about-section');

window.addEventListener('scroll', () => {
  let scrolled = window.pageYOffset;
  let rate = scrolled * -0.5;

  parallaxElements.forEach(element => {
    element.style.transform = `translateY(${rate * 0.1}px)`;
  });
});

// ============================================
// 13. NAVBAR SCROLL EFFECT
// ============================================
let lastScrollTop = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
  let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  
  if (scrollTop > 100) {
    navbar.style.boxShadow = '0 0 30px rgba(0, 255, 0, 0.2)';
  } else {
    navbar.style.boxShadow = '0 0 10px rgba(0, 255, 0, 0.1)';
  }
  
  lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
});

// ============================================
// 14. FORM INPUT GLOW EFFECT
// ============================================
document.querySelectorAll('.contact-form input, .contact-form textarea').forEach(input => {
  input.addEventListener('focus', function() {
    this.style.boxShadow = '0 0 20px rgba(0, 255, 0, 0.3)';
  });
  
  input.addEventListener('blur', function() {
    this.style.boxShadow = '';
  });
});

// ============================================
// 15. CONSOLE WELCOME MESSAGE
// ============================================
console.log('%c╔════════════════════════════════════════╗', 'color: #00ff00; font-weight: bold;');
console.log('%c║  WELCOME TO ELITE HACKERS COMMUNITY  ║', 'color: #00ff00; font-weight: bold;');
console.log('%c╚════════════════════════════════════════╝', 'color: #00ff00; font-weight: bold;');
console.log('%c\n[SYSTEM] Ethical Hacking & Security\n[LEVEL] Advanced\n[STATUS] Online\n', 'color: #0033ff; font-weight: bold; font-family: monospace;');

// ============================================
// 16. PAGE LOAD ANIMATION
// ============================================
window.addEventListener('load', () => {
  document.body.style.animation = 'fadeIn 0.5s ease';
  
  const heroContent = document.querySelector('.hero-content');
  if (heroContent) {
    heroContent.style.opacity = '0';
    heroContent.style.animation = 'slideInUp 0.8s ease forwards';
  }
});

// ============================================
// 17. STAT COUNTER ANIMATION
// ============================================
function animateCounter(element, target, duration = 2000) {
  let current = 0;
  const increment = target / (duration / 16);
  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      element.textContent = target;
      clearInterval(timer);
    } else {
      element.textContent = Math.floor(current);
    }
  }, 16);
}

const statObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const numbers = entry.target.querySelectorAll('.stat-number');
      numbers.forEach(number => {
        const value = parseInt(number.textContent);
        animateCounter(number, value, 2000);
      });
      statObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

const statsSection = document.querySelector('.stats-section');
if (statsSection) {
  statObserver.observe(statsSection);
}

// ============================================
// 18. RESPONSIVE BEHAVIOR
// ============================================
function handleResponsive() {
  const isMobile = window.innerWidth < 768;
  
  if (isMobile) {
    document.querySelectorAll('.project-card').forEach(card => {
      card.style.maxWidth = '100%';
    });
  }
}

window.addEventListener('resize', handleResponsive);
handleResponsive();

// ============================================
// 19. MATRIX EFFECT (OPTIONAL)
// ============================================
function addMatrixEffect() {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  
  // Only on desktop
  if (window.innerWidth > 768) {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    canvas.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      z-index: -1;
      opacity: 0.1;
      pointer-events: none;
    `;
    document.body.appendChild(canvas);
  }
}

// ============================================
// 20. TERMINAL TYPING ANIMATION
// ============================================
function initTerminalAnimation() {
  const terminalLines = [
    "Welcome to my Portfolio Website",
    "I am Pradeep S ,......",
    "I Am Cyber Security Student | Learn Cyber Attacks"
  ];
  
  const terminalBody = document.querySelector('.terminal-body');
  const cursor = document.querySelector('.terminal-cursor');
  
  if (!terminalBody || !cursor) {
    console.error('Terminal elements not found:', { terminalBody, cursor });
    return;
  }
  
  // Clear existing content
  terminalBody.innerHTML = '';
  
  // Re-add the cursor
  const newCursor = document.createElement('div');
  newCursor.className = 'terminal-cursor';
  newCursor.textContent = '█';
  newCursor.style.display = 'none';
  terminalBody.appendChild(newCursor);
  
  let currentLineIndex = 0;
  let currentCharIndex = 0;
  let isTyping = false;
  
  function typeWriter() {
    if (currentLineIndex >= terminalLines.length) {
      // Animation complete, show cursor
      newCursor.style.display = 'inline';
      return;
    }
    
    if (!isTyping) {
      // Create new line
      const lineDiv = document.createElement('div');
      lineDiv.className = 'terminal-line';
      lineDiv.style.opacity = '1'; // Make sure it's visible immediately
      
      const promptSpan = document.createElement('span');
      promptSpan.className = 'terminal-prompt';
      promptSpan.textContent = '$';
      
      const textSpan = document.createElement('span');
      textSpan.className = 'typing-text';
      
      lineDiv.appendChild(promptSpan);
      lineDiv.appendChild(textSpan);
      terminalBody.appendChild(lineDiv);
      
      isTyping = true;
      currentCharIndex = 0;
    }
    
    const currentLine = terminalLines[currentLineIndex];
    const currentTextSpan = terminalBody.querySelectorAll('.typing-text')[currentLineIndex];
    
    if (currentTextSpan && currentCharIndex < currentLine.length) {
      currentTextSpan.textContent += currentLine.charAt(currentCharIndex);
      currentCharIndex++;
      
      // Add typing effect with cursor blink during typing
      currentTextSpan.style.borderRight = '2px solid var(--primary-color)';
      
      // Random typing speed for realism (30-120ms) with occasional pauses
      let typingSpeed = Math.random() * 90 + 30;
      
      // Add occasional longer pauses to simulate thinking
      if (Math.random() < 0.05) { // 5% chance
        typingSpeed += 200;
      }
      
      // Add occasional glitches
      if (Math.random() < 0.02) { // 2% chance
        setTimeout(() => {
          if (currentTextSpan) {
            currentTextSpan.style.color = '#ff0000';
            // Add vibration effect
            currentTextSpan.style.animation = 'vibrate 0.1s ease-in-out';
            setTimeout(() => {
              if (currentTextSpan) {
                currentTextSpan.style.color = 'var(--secondary-color)';
                currentTextSpan.style.animation = '';
              }
            }, 100);
          }
        }, typingSpeed / 2);
      }
      
      setTimeout(typeWriter, typingSpeed);
    } else if (currentTextSpan) {
      // Line complete, remove cursor and move to next line
      currentTextSpan.style.borderRight = 'none';
      currentLineIndex++;
      isTyping = false;
      
      // Pause before next line (1-2 seconds)
      const pauseTime = Math.random() * 1000 + 1000;
      setTimeout(typeWriter, pauseTime);
    }
  }
  
  // Start typing animation after a delay
  setTimeout(() => {
    newCursor.style.display = 'none';
    typeWriter();
  }, 1000);
}

// Initialize terminal animation when page loads
document.addEventListener('DOMContentLoaded', function() {
  // Try to initialize terminal animation
  try {
    initTerminalAnimation();
  } catch (error) {
    console.error('Terminal animation failed:', error);
    // Fallback: show static content
    showStaticTerminal();
  }
});

function showStaticTerminal() {
  const terminalLines = document.querySelectorAll('.terminal-line');
  const cursor = document.querySelector('.terminal-cursor');
  
  terminalLines.forEach((line, index) => {
    line.style.display = 'flex';
    line.style.opacity = '1';
    setTimeout(() => {
      line.style.animation = 'fadeInLine 0.5s ease forwards';
    }, index * 200);
  });
  
  if (cursor) {
    cursor.style.display = 'inline';
  }
}
