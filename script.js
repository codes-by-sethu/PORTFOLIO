document.addEventListener('DOMContentLoaded', () => {

    /* ---------------- Smooth Scrolling ---------------- */
    document.querySelectorAll('nav a').forEach(link => {
        link.addEventListener('click', e => {
            e.preventDefault();
            const target = document.querySelector(link.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    /* ---------------- Skill Bar Animation ---------------- */
    const skillObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            const card = entry.target;
            const level = card.dataset.level;
            const fill = card.querySelector('.skill-progress-fill');

            setTimeout(() => { fill.style.width = level + '%'; }, 200);
            skillObserver.unobserve(card);
        });
    }, { threshold: 0.5 });

    document.querySelectorAll('.skill-card').forEach(card => skillObserver.observe(card));

    /* ---------------- Contact Form ---------------- */
    const form = document.querySelector('.contact-form');
    if (form) {
        form.addEventListener('submit', e => {
            e.preventDefault();

            const required = form.querySelectorAll('input[required], textarea[required]');
            let valid = true;

            required.forEach(el => {
                if (!el.value.trim()) {
                    valid = false;
                    el.style.borderColor = '#e74c3c';
                } else {
                    el.style.borderColor = '#ccc';
                }
            });

            if (!valid) return;

            const btn = form.querySelector('button[type="submit"]');
            const original = btn.textContent;

            btn.textContent = 'Sending...';
            btn.disabled = true;

            setTimeout(() => {
                btn.textContent = 'Message Sent!';
                btn.style.background = '#27ae60';
                form.reset();

                setTimeout(() => {
                    btn.textContent = original;
                    btn.disabled = false;
                    btn.style.background = '';
                }, 3000);
            }, 1500);
        });
    }

    /* ---------------- Project Card Reveal ---------------- */
    const projectObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.project-container').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        projectObserver.observe(card);
    });
});
