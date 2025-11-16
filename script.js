document.addEventListener('DOMContentLoaded', () => {

    /* ---------------- Smooth Scrolling ---------------- */
    document.querySelectorAll('nav a[href^="#"]').forEach(link => {
        link.addEventListener('click', e => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const target = document.querySelector(targetId);
            if (target) {
                const offsetTop = target.offsetTop - 80;
                window.scrollTo({ top: offsetTop, behavior: 'smooth' });
                history.replaceState(null, null, ' ');
            }
        });
    });

    /* ---------------- Skill Bar Fill ---------------- */
    const skillObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            const bars = entry.target.querySelectorAll('.skill-progress');
            bars.forEach(bar => {
                bar.style.width = "100%"; // always blue fill
            });
            skillObserver.unobserve(entry.target);
        });
    }, { threshold: 0.3 });

    document.querySelectorAll('.skill-category').forEach(cat => skillObserver.observe(cat));

    /* ---------------- Contact Form ---------------- */
    const form = document.querySelector('.contact-form');
    if (form) {
        const inputs = form.querySelectorAll('input[required], textarea[required]');
        inputs.forEach(input => {
            input.addEventListener('input', () => {
                if (input.value.trim()) input.style.borderColor = '#2ecc71';
                else input.style.borderColor = '#ccc';
            });
        });

        form.addEventListener('submit', e => {
            e.preventDefault();
            let valid = true;
            inputs.forEach(el => {
                if (!el.value.trim()) {
                    valid = false;
                    el.style.borderColor = '#e74c3c';
                    el.style.animation = 'shake 0.5s ease-in-out';
                    setTimeout(() => el.style.animation = '', 500);
                } else el.style.borderColor = '#ccc';
            });
            if (!valid) {
                inputs.forEach(el => { if (!el.value.trim()) el.focus(); });
                return;
            }

            const btn = form.querySelector('button[type="submit"]');
            const origText = btn.textContent;
            const origBg = btn.style.background;

            btn.textContent = 'Sending...';
            btn.disabled = true;

            setTimeout(() => {
                btn.textContent = 'Message Sent!';
                btn.style.background = '#27ae60';
                form.reset();
                setTimeout(() => {
                    btn.textContent = origText;
                    btn.disabled = false;
                    btn.style.background = origBg;
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
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

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
                    if (link.getAttribute('href') === `#${id}`) link.classList.add('active');
                });
            }
        });
    }, { threshold: 0.5 });

    sections.forEach(section => sectionObserver.observe(section));

    /* ---------------- Resume Download ---------------- */
    const resumeBtn = document.querySelector('nav a.resume-btn');
    if (resumeBtn) {
        resumeBtn.addEventListener('click', () => {
            const link = document.createElement('a');
            link.href = '/resume.pdf'; // replace with your resume path
            link.download = 'Resume.pdf';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        });
    }

    /* ---------------- Shake Animation CSS ---------------- */
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
    `;
    document.head.appendChild(style);

});
