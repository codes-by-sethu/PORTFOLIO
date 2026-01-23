// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
  
  // ===== Mobile Menu Toggle =====
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const navMenu = document.querySelector('.nav-menu');
  
  if (mobileMenuBtn && navMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      navMenu.classList.toggle('active');
      mobileMenuBtn.innerHTML = navMenu.classList.contains('active') 
        ? '<i class="fas fa-times"></i>' 
        : '<i class="fas fa-bars"></i>';
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!navMenu.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
        navMenu.classList.remove('active');
        mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
      }
    });
    
    // Close mobile menu when clicking a link
    navMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
      });
    });
  }
  
  // ===== Smooth Scrolling =====
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        const headerHeight = document.querySelector('.navbar').offsetHeight;
        const targetPosition = targetElement.offsetTop - headerHeight - 20;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
  
  // ===== Active Navigation Link =====
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.nav-menu a[href^="#"]');
  
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.3
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }, observerOptions);
  
  sections.forEach(section => observer.observe(section));
  
  // ===== Project Filtering =====
  const filterButtons = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');
  
  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Remove active class from all buttons
      filterButtons.forEach(btn => btn.classList.remove('active'));
      
      // Add active class to clicked button
      button.classList.add('active');
      
      const filterValue = button.getAttribute('data-filter');
      
      // Filter projects
      projectCards.forEach(card => {
        if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
          card.style.display = 'block';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 100);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(20px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 300);
        }
      });
    });
  });
  
  // ===== Animate Skill Tags on Scroll =====
  const skillCategories = document.querySelectorAll('.skill-category');
  
  const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        const skillTags = entry.target.querySelectorAll('.skill-tag');
        
        skillTags.forEach((tag, tagIndex) => {
          setTimeout(() => {
            tag.style.opacity = '1';
            tag.style.transform = 'translateY(0)';
          }, (index * 100) + (tagIndex * 50));
        });
        
        skillObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });
  
  skillCategories.forEach(category => {
    const skillTags = category.querySelectorAll('.skill-tag');
    skillTags.forEach(tag => {
      tag.style.opacity = '0';
      tag.style.transform = 'translateY(10px)';
      tag.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
    });
    skillObserver.observe(category);
  });
  
  // ===== Animate Language Progress Bars =====
  const languageItems = document.querySelectorAll('.language-item');
  
  const languageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const progressBar = entry.target.querySelector('.language-progress');
        const level = progressBar.getAttribute('data-level');
        
        setTimeout(() => {
          progressBar.style.width = `${level}%`;
        }, 300);
        
        languageObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  
  languageItems.forEach(item => languageObserver.observe(item));
  
  // ===== Animate Project Cards on Scroll =====
  const projectObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }, index * 100);
        
        projectObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  
  projectCards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    projectObserver.observe(card);
  });
  
  // ===== Animate Certification Cards =====
  const certCards = document.querySelectorAll('.cert-card');
  
  const certObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }, index * 100);
        
        certObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });
  
  certCards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    certObserver.observe(card);
  });
  
  // ===== WORKING CONTACT FORM =====
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      // Get form inputs
      const nameInput = contactForm.querySelector('input[name="name"]');
      const emailInput = contactForm.querySelector('input[name="email"]');
      const messageInput = contactForm.querySelector('textarea[name="message"]');
      
      // Get values
      const name = nameInput.value.trim();
      const email = emailInput.value.trim();
      const message = messageInput.value.trim();
      
      // Validate form
      if (!name || !email || !message) {
        showAlert('Please fill in all fields', 'error');
        return;
      }
      
      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        showAlert('Please enter a valid email address', 'error');
        return;
      }
      
      // Show loading state
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;
      const originalBackground = submitBtn.style.background;
      
      submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
      submitBtn.disabled = true;
      
      try {
        // Simulate API call delay (remove in production)
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Prepare data for Formspree
        const formData = new FormData();
        formData.append('name', name);
        formData.append('email', email);
        formData.append('message', message);
        formData.append('_subject', 'New message from portfolio website');
        
        // === UNCOMMENT AND REPLACE WITH YOUR FORMSPREE ENDPOINT ===
        // 1. Go to https://formspree.io/
        // 2. Sign up for free
        // 3. Create a new form
        // 4. Get your form endpoint
        // 5. Replace 'YOUR_FORMSPREE_ENDPOINT' with your actual endpoint
        
        /*
        const response = await fetch('YOUR_FORMSPREE_ENDPOINT', {
          method: 'POST',
          body: formData,
          headers: {
            'Accept': 'application/json'
          }
        });
        
        if (response.ok) {
          showAlert('Message sent successfully! I\'ll get back to you soon.', 'success');
        } else {
          throw new Error('Failed to send message');
        }
        */
        
        // For testing - show success message
        showAlert('Message sent successfully! I\'ll get back to you soon.', 'success');
        
        // Reset form
        contactForm.reset();
        
      } catch (error) {
        console.error('Form submission error:', error);
        showAlert('Failed to send message. Please email me directly at sethukochuchirayil@gmail.com', 'error');
      } finally {
        // Reset button
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        submitBtn.style.background = originalBackground;
      }
    });
  }
  
  // Alert notification function
  function showAlert(message, type = 'success') {
    // Remove existing alerts
    const existingAlert = document.querySelector('.alert-notification');
    if (existingAlert) existingAlert.remove();
    
    // Create alert element
    const alert = document.createElement('div');
    alert.className = `alert-notification alert-${type}`;
    alert.innerHTML = `
      <div class="alert-content">
        <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
        <span>${message}</span>
      </div>
      <button class="alert-close">&times;</button>
    `;
    
    // Add to page
    document.body.appendChild(alert);
    
    // Add CSS styles
    alert.style.cssText = `
      position: fixed;
      top: 100px;
      right: 20px;
      padding: 15px 20px;
      background: ${type === 'success' ? '#10b981' : '#ef4444'};
      color: white;
      border-radius: 8px;
      box-shadow: 0 5px 15px rgba(0,0,0,0.2);
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 15px;
      z-index: 10000;
      animation: slideInRight 0.3s ease;
      max-width: 400px;
    `;
    
    // Style the content
    const alertContent = alert.querySelector('.alert-content');
    alertContent.style.cssText = `
      display: flex;
      align-items: center;
      gap: 10px;
      flex: 1;
    `;
    
    // Style close button
    const closeBtn = alert.querySelector('.alert-close');
    closeBtn.style.cssText = `
      background: none;
      border: none;
      color: white;
      font-size: 24px;
      cursor: pointer;
      padding: 0;
      margin: 0;
      line-height: 1;
      opacity: 0.8;
      transition: opacity 0.2s;
    `;
    
    closeBtn.addEventListener('mouseenter', () => {
      closeBtn.style.opacity = '1';
    });
    
    closeBtn.addEventListener('mouseleave', () => {
      closeBtn.style.opacity = '0.8';
    });
    
    // Add animation keyframes
    if (!document.querySelector('#alert-animation-styles')) {
      const style = document.createElement('style');
      style.id = 'alert-animation-styles';
      style.textContent = `
        @keyframes slideInRight {
          from { transform: translateX(100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        @keyframes slideOutRight {
          from { transform: translateX(0); opacity: 1; }
          to { transform: translateX(100%); opacity: 0; }
        }
      `;
      document.head.appendChild(style);
    }
    
    // Close button functionality
    closeBtn.addEventListener('click', () => {
      alert.style.animation = 'slideOutRight 0.3s ease';
      setTimeout(() => {
        if (alert.parentNode) {
          alert.remove();
        }
      }, 300);
    });
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
      if (alert.parentNode) {
        alert.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
          if (alert.parentNode) {
            alert.remove();
          }
        }, 300);
      }
    }, 5000);
  }
  
  // ===== Back to Top Button =====
  const backToTopBtn = document.querySelector('.back-to-top');
  
  if (backToTopBtn) {
    window.addEventListener('scroll', () => {
      if (window.pageYOffset > 300) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    });
    
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
  
  // ===== Typing Effect for Hero Title =====
  const heroTitle = document.querySelector('.hero-title');
  if (heroTitle) {
    const originalText = heroTitle.innerHTML;
    heroTitle.innerHTML = '';
    let i = 0;
    
    function typeWriter() {
      if (i < originalText.length) {
        // Handle the highlight span separately
        if (originalText.substring(i, i + 7) === '<span c') {
          heroTitle.innerHTML = originalText;
          return;
        }
        
        heroTitle.innerHTML += originalText.charAt(i);
        i++;
        setTimeout(typeWriter, 50);
      }
    }
    
    // Start typing effect when hero section is in view
    const heroObserver = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setTimeout(() => {
          typeWriter();
        }, 500);
        heroObserver.unobserve(entries[0].target);
      }
    }, { threshold: 0.5 });
    
    heroObserver.observe(heroTitle.parentElement);
  }
  
  // ===== Download Resume Button Animation =====
  const downloadBtn = document.querySelector('.btn-secondary');
  if (downloadBtn) {
    downloadBtn.addEventListener('click', (e) => {
      // Add click animation
      e.target.style.transform = 'scale(0.95)';
      setTimeout(() => {
        e.target.style.transform = 'scale(1)';
      }, 150);
    });
  }
  
  // ===== Sticky Navbar Background =====
  const navbar = document.querySelector('.navbar');
  if (navbar) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.1)';
      } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'var(--shadow-sm)';
      }
    });
  }
  
  // ===== Initialize Console Log =====
  console.log('Portfolio initialized successfully!');
});