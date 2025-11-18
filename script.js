document.addEventListener('DOMContentLoaded', () => {
    /* ---------------- Smooth Scrolling ---------------- */
    document.querySelectorAll('nav a[href^="#"]').forEach(link => {
        link.addEventListener('click', e => {
            e.preventDefault();
            const target = document.querySelector(link.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 80;
                window.scrollTo({ top: offsetTop, behavior: 'smooth' });
                history.replaceState(null, null, ' ');
            }
        });
    });

    /* ---------------- Skill Bar Animation ---------------- */
    const skillObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            entry.target.querySelectorAll('.skill-progress').forEach((bar, i) => {
                setTimeout(() => bar.style.width = bar.dataset.level + '%', i * 150);
            });
            skillObserver.unobserve(entry.target);
        });
    }, { threshold: 0.3 });

    document.querySelectorAll('.skill-category').forEach(cat => skillObserver.observe(cat));

    /* ---------------- Project Card Reveal ---------------- */
    const projectObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const delay = Array.from(entry.target.parentNode.children).indexOf(entry.target) * 100;
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, delay);
                projectObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    document.querySelectorAll('.project-container').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        projectObserver.observe(card);
    });

    /* ---------------- Contact & Language Animation ---------------- */
    const observerWithFade = (selector, property='translateX(-30px)') => {
        const obs = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const items = entry.target.querySelectorAll(selector);
                    items.forEach((item, i) => {
                        item.style.opacity = '0';
                        item.style.transform = property;
                        item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                        setTimeout(() => {
                            item.style.opacity = '1';
                            item.style.transform = 'translateX(0)';
                        }, i*150);
                    });
                    obs.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });
        return obs;
    };

    observerWithFade('.contact-item').observe(document.querySelector('#contact'));
    observerWithFade('.languages div', 'scale(0.8)').observe(document.querySelector('#languages'));
    observerWithFade('.certifications div', 'translateY(20px)').observe(document.querySelector('#certifications'));

    /* ---------------- Header Scroll ---------------- */
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            header.style.background = 'rgba(26, 26, 26, 0.95)';
            header.style.backdropFilter = 'blur(10px)';
        } else {
            header.style.background = '#1a1a1a';
            header.style.backdropFilter = 'none';
        }
    });

    /* ---------------- Active Nav Link ---------------- */
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('nav a[href^="#"]');
    const sectionObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navLinks.forEach(link => link.classList.toggle('active', link.getAttribute('href') === `#${id}`));
            }
        });
    }, { threshold: 0.5 });
    sections.forEach(sec => sectionObserver.observe(sec));

    /* ---------------- Download Button Animation ---------------- */
    const downloadBtn = document.querySelector('.resume-download');
    if(downloadBtn){
        downloadBtn.addEventListener('mouseenter', ()=> downloadBtn.style.transform='translateY(-2px) scale(1.05)');
        downloadBtn.addEventListener('mouseleave', ()=> downloadBtn.style.transform='translateY(0) scale(1)');
        downloadBtn.addEventListener('click', e=>{
            e.target.style.transform='scale(0.95)';
            setTimeout(()=> e.target.style.transform='scale(1)',150);
        });
    }
});
