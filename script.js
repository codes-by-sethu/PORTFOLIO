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

    /* ---------------- Contact Details Animation ---------------- */
    const contactObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const contactItems = entry.target.querySelectorAll('.contact-item');
                contactItems.forEach((item, index) => {
                    item.style.opacity = '0';
                    item.style.transform = 'translateX(-30px)';
                    item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                    
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'translateX(0)';
                    }, index * 200);
                });
                
                contactObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });

    const contactSection = document.querySelector('#contact');
    if (contactSection) {
        contactObserver.observe(contactSection);
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

    /* ---------------- Download Button Animation ---------------- */
    const downloadBtn = document.querySelector('.resume-download');
    if (downloadBtn) {
        downloadBtn.addEventListener('mouseenter', () => {
            downloadBtn.style.transform = 'translateY(-2px) scale(1.05)';
        });
        
        downloadBtn.addEventListener('mouseleave', () => {
            downloadBtn.style.transform = 'translateY(0) scale(1)';
        });
        
        downloadBtn.addEventListener('click', (e) => {
            // Add click feedback
            e.target.style.transform = 'scale(0.95)';
            setTimeout(() => {
                e.target.style.transform = 'scale(1)';
            }, 150);
        });
    }

    /* ---------------- Certification Hover Effects ---------------- */
    const certificationItems = document.querySelectorAll('.certifications div');
    certificationItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            item.style.transform = 'translateY(-8px) scale(1.02)';
        });
        
        item.addEventListener('mouseleave', () => {
            item.style.transform = 'translateY(0) scale(1)';
        });
    });

    /* ---------------- Language Items Animation ---------------- */
    const languageObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const languageItems = entry.target.querySelectorAll('.languages div');
                languageItems.forEach((item, index) => {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.8)';
                    item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                    
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, index * 150);
                });
                
                languageObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });

    const languagesSection = document.querySelector('#languages');
    if (languagesSection) {
        languageObserver.observe(languagesSection);
    }
});

// Add this CSS for animations and active nav link
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
    
    .resume-download {
        transition: all 0.3s ease !important;
    }
    
    .contact-item {
        transition: all 0.3s ease !important;
    }
    
    .certifications div, .languages div {
        transition: all 0.3s ease !important;
    }
    
    /* Loading animation for images */
    .project-image {
        transition: opacity 0.5s ease;
    }
    
    .project-image:not([src]) {
        opacity: 0;
    }
    
    .project-image[src] {
        opacity: 1;
    }
`;
document.head.appendChild(style);