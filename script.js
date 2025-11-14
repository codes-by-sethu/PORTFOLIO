document.addEventListener('DOMContentLoaded', () => {
    /* ---------------- Smooth Scrolling ---------------- */
    document.querySelectorAll('nav a[href^="#"]').forEach(link => {
        link.addEventListener('click', e => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const target = document.querySelector(targetId);
            
            if (target) {
                const offsetTop = target.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
                
                // Update URL without jumping
            history.replaceState(null, null, ' ');
            }
        });
    });

    /* ---------------- Skill Bar Animation ---------------- */
const skillObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    
    const skillItems = entry.target.querySelectorAll('.skill-item');
    skillItems.forEach((item, index) => {
      const progressBar = item.querySelector('.skill-progress');
      const level = progressBar.dataset.level;
      
      setTimeout(() => {
        progressBar.style.width = level + '%';
      }, index * 150); // Staggered animation
    });
    
    skillObserver.unobserve(entry.target);
  });
}, { threshold: 0.3 });

// Observe each skill category instead of individual cards
document.querySelectorAll('.skill-category').forEach(category => {
  skillObserver.observe(category);
});

    /* ---------------- Contact Form ---------------- */
    const form = document.querySelector('.contact-form');
    if (form) {
        // Real-time validation
        const inputs = form.querySelectorAll('input[required], textarea[required]');
        inputs.forEach(input => {
            input.addEventListener('input', () => {
                if (input.value.trim()) {
                    input.style.borderColor = '#2ecc71';
                    setTimeout(() => {
                        input.style.borderColor = '#ccc';
                    }, 2000);
                }
            });
        });

        form.addEventListener('submit', e => {
            e.preventDefault();

            const required = form.querySelectorAll('input[required], textarea[required]');
            let valid = true;

            required.forEach(el => {
                if (!el.value.trim()) {
                    valid = false;
                    el.style.borderColor = '#e74c3c';
                    // Add shake animation for invalid fields
                    el.style.animation = 'shake 0.5s ease-in-out';
                    setTimeout(() => el.style.animation = '', 500);
                } else {
                    el.style.borderColor = '#ccc';
                }
            });

            if (!valid) {
                // Focus first invalid field
                const firstInvalid = Array.from(required).find(el => !el.value.trim());
                firstInvalid?.focus();
                return;
            }

            const btn = form.querySelector('button[type="submit"]');
            const original = btn.textContent;
            const originalBg = btn.style.background;

            btn.textContent = 'Sending...';
            btn.disabled = true;

            // Simulate API call
            setTimeout(() => {
                btn.textContent = 'Message Sent!';
                btn.style.background = '#27ae60';
                form.reset();

                setTimeout(() => {
                    btn.textContent = original;
                    btn.disabled = false;
                    btn.style.background = originalBg;
                }, 3000);
            }, 1500);
        });
    }

    /* ---------------- Project Card Reveal ---------------- */
    const projectObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const card = entry.target;
                const delay = Array.from(card.parentNode.children).indexOf(card) * 100;
                
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, delay);
                
                projectObserver.unobserve(card);
            }
        });
    }, { 
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    document.querySelectorAll('.project-container').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        projectObserver.observe(card);
    });

    /* ---------------- Header Background on Scroll ---------------- */
    const header = document.querySelector('header');
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                header.style.background = 'rgba(26, 26, 26, 0.95)';
                header.style.backdropFilter = 'blur(10px)';
            } else {
                header.style.background = '#1a1a1a';
                header.style.backdropFilter = 'none';
            }
        });
    }

    /* ---------------- Active Navigation Link ---------------- */
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('nav a[href^="#"]');

    const sectionObserver = new IntersectionObserver(entries => {
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
    }, { threshold: 0.5 });

    sections.forEach(section => sectionObserver.observe(section));
});

// Add this CSS for the shake animation and active nav link
const style = document.createElement('style');
style.textContent = `
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-5px); }
        75% { transform: translateX(5px); }
    }
    
    nav a.active {
        color: #00bfff !important;
        font-weight: 600;
    }
    
    nav a.active::after {
        content: '';
        position: absolute;
        bottom: -5px;
        left: 0;
        width: 100%;
        height: 2px;
        background: #00bfff;
    }
    
    header {
        transition: all 0.3s ease;
    }
    
    nav a {
        position: relative;
        transition: color 0.3s ease;
    }
`;
document.head.appendChild(style);