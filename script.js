// ========================================
// PARTICLE BACKGROUND (Canvas)
// ========================================
(function() {
    const canvas = document.getElementById('particle-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let particles = [];
    const maxParticles = 60;
    let w, h;

    function resize() {
        w = canvas.width = window.innerWidth;
        h = canvas.height = window.innerHeight;
    }
    window.addEventListener('resize', resize);
    resize();

    class Particle {
        constructor() {
            this.reset();
            this.y = Math.random() * h;
        }
        reset() {
            this.x = Math.random() * w;
            this.y = -10;
            this.size = Math.random() * 2 + 0.5;
            this.speedY = Math.random() * 0.4 + 0.1;
            this.speedX = (Math.random() - 0.5) * 0.3;
            this.opacity = Math.random() * 0.5 + 0.1;
        }
        update() {
            this.y += this.speedY;
            this.x += this.speedX;
            if (this.y > h + 10) { this.y = -10; this.x = Math.random() * w; }
            if (this.x > w + 10) this.x = -10;
            if (this.x < -10) this.x = w + 10;
        }
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(167, 139, 250, ${this.opacity})`;
            ctx.fill();
        }
    }

    // Create connecting lines between nearby particles
    function drawLines() {
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 120) {
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.strokeStyle = `rgba(129, 140, 248, ${0.06 * (1 - dist / 120)})`;
                    ctx.lineWidth = 0.5;
                    ctx.stroke();
                }
            }
        }
    }

    for (let i = 0; i < maxParticles; i++) {
        particles.push(new Particle());
    }

    function animate() {
        ctx.clearRect(0, 0, w, h);
        particles.forEach(p => { p.update(); p.draw(); });
        drawLines();
        requestAnimationFrame(animate);
    }
    animate();
})();

// ========================================
// CUSTOM CURSOR
// ========================================
(function() {
    const cursor = document.getElementById('cursor');
    const follower = document.getElementById('cursor-follower');
    if (!cursor || !follower) return;

    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;
    let followerX = 0, followerY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    // Hover effect on interactive elements
    const hoverTargets = document.querySelectorAll('a, button, .btn-primary, .btn-secondary, .btn-send, .expertise-card, .cert-card, .blog-card, .timeline-card, .about-card, input, textarea');
    hoverTargets.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.classList.add('hover');
            follower.classList.add('hover');
        });
        el.addEventListener('mouseleave', () => {
            cursor.classList.remove('hover');
            follower.classList.remove('hover');
        });
    });

    function updateCursor() {
        // Smooth follow for cursor dot
        cursorX += (mouseX - cursorX) * 0.3;
        cursorY += (mouseY - cursorY) * 0.3;
        cursor.style.left = cursorX + 'px';
        cursor.style.top = cursorY + 'px';

        // Slower follow for follower ring
        followerX += (mouseX - followerX) * 0.1;
        followerY += (mouseY - followerY) * 0.1;
        follower.style.left = followerX + 'px';
        follower.style.top = followerY + 'px';

        requestAnimationFrame(updateCursor);
    }
    updateCursor();
})();

// ========================================
// SCROLL PROGRESS BAR
// ========================================
(function() {
    const progressBar = document.getElementById('scroll-progress');
    if (!progressBar) return;

    window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
        progressBar.style.width = scrollPercent + '%';
    });
})();

// ========================================
// TYPEWRITER EFFECT
// ========================================
(function() {
    const el = document.getElementById('typewriter');
    if (!el) return;

    const phrases = [
        'Software Engineer 2',
        'Platform Engineer',
        'DevSecOps Engineer',
        'Cloud & Infrastructure Automation',
    ];
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 80;

    function type() {
        const current = phrases[phraseIndex];

        if (isDeleting) {
            el.textContent = current.substring(0, charIndex - 1);
            charIndex--;
            typeSpeed = 30;
        } else {
            el.textContent = current.substring(0, charIndex + 1);
            charIndex++;
            typeSpeed = 80;
        }

        if (!isDeleting && charIndex === current.length) {
            typeSpeed = 2000; // Pause at end
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            typeSpeed = 400;
        }

        setTimeout(type, typeSpeed);
    }

    // Start after a short delay
    setTimeout(type, 800);
})();

// ========================================
// 3D TILT EFFECT ON CARDS
// ========================================
(function() {
    const cards = document.querySelectorAll('.expertise-card, .cert-card, .timeline-card');

    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = ((y - centerY) / centerY) * -8;
            const rotateY = ((x - centerX) / centerX) * 8;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px) scale(1.04)`;
            card.style.transition = 'transform 0.1s ease-out';
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0) scale(1)';
            card.style.transition = 'transform 0.5s ease-out';
        });
    });
})();

// ========================================
// ANIMATED STAT COUNTERS
// ========================================
(function() {
    const statNumbers = document.querySelectorAll('.stat-number');
    if (!statNumbers.length) return;

    let animated = false;

    function animateCounter(el) {
        const target = parseInt(el.getAttribute('data-target'), 10);
        if (isNaN(target)) return;

        const duration = 2000;
        const startTime = performance.now();
        const startVal = 0;

        function update(now) {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // Ease out cubic
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = Math.round(startVal + (target - startVal) * eased);

            el.textContent = current;

            if (progress < 1) {
                requestAnimationFrame(update);
            } else {
                el.textContent = target;
            }
        }

        requestAnimationFrame(update);
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !animated) {
                animated = true;
                statNumbers.forEach(el => animateCounter(el));
                observer.disconnect();
            }
        });
    }, { threshold: 0.3 });

    // Observe the stats section
    const statsSection = document.querySelector('.stats-section');
    if (statsSection) {
        observer.observe(statsSection);
    }
})();

// ========================================
// NAVBAR SCROLL EFFECT
// ========================================
const navbar = document.getElementById('navbar');

function updateNavbar() {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
}

window.addEventListener('scroll', updateNavbar);
updateNavbar();

// ========================================
// MOBILE MENU TOGGLE
// ========================================
const navToggle = document.getElementById('nav-toggle');
const navLinks = document.getElementById('nav-links');

if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navLinks.classList.toggle('open');
    });

    navLinks.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navLinks.classList.remove('open');
        });
    });

    document.addEventListener('click', (e) => {
        if (!navLinks.contains(e.target) && !navToggle.contains(e.target)) {
            navToggle.classList.remove('active');
            navLinks.classList.remove('open');
        }
    });
}

// ========================================
// SMOOTH SCROLL FOR NAV LINKS
// ========================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (!href || href === '#') return;

        const target = document.querySelector(href);
        if (target) {
            e.preventDefault();
            const navHeight = navbar.offsetHeight + 16;
            const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight;
            window.scrollTo({ top: targetPosition, behavior: 'smooth' });
        }
    });
});

// ========================================
// ACTIVE NAV LINK HIGHLIGHTING
// ========================================
const sections = document.querySelectorAll('section[id]');
const navLinksAll = document.querySelectorAll('.nav-link');

function updateActiveLink() {
    let current = '';
    sections.forEach(section => {
        if (window.scrollY >= section.offsetTop - 200) {
            current = section.getAttribute('id');
        }
    });
    navLinksAll.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', updateActiveLink);

// ========================================
// CONTACT FORM
// ========================================
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const name = this.querySelector('#name').value.trim();
        const email = this.querySelector('#email').value.trim();
        const message = this.querySelector('#message').value.trim();
        if (!name || !email || !message) return;

        const button = this.querySelector('.btn-send');
        const origHTML = button.innerHTML;
        button.classList.add('success');
        button.innerHTML = '<span>✓ Message Sent!</span>';

        setTimeout(() => {
            this.reset();
            button.classList.remove('success');
            button.innerHTML = origHTML;
        }, 2500);
    });
}

// ========================================
// SCROLL ANIMATIONS
// ========================================
function initScrollAnimations() {
    document.body.classList.add('animate-ready');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) entry.target.classList.add('animate-in');
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    document.querySelectorAll('.expertise-card, .about-card, .timeline-card, .cert-card, .blog-card').forEach((card, i) => {
        card.style.animationDelay = (i % 3) * 0.1 + 's';
        observer.observe(card);
    });

    document.querySelectorAll('.section-title').forEach(title => observer.observe(title));
}

// ========================================
// BLOG LOADING
// ========================================
async function loadBlogsIntoSection() {
    const container = document.getElementById('blogs-grid');
    if (!container) return;
    try {
        const posts = await fetchSoftwareEngineeringBlogs();
        renderBlogCards(posts, container);
    } catch (e) {
        container.innerHTML = '<p class="loading-text">Unable to load articles right now.</p>';
    }
}

function renderBlogCards(posts, container) {
    container.innerHTML = '';
    if (!posts || posts.length === 0) {
        container.innerHTML = '<p class="loading-text">No articles found. Check back soon!</p>';
        return;
    }
    posts.sort((a, b) => new Date(b.pubDate) - new Date(a.pubDate))
        .slice(0, 6)
        .forEach((post, i) => {
            const card = document.createElement('div');
            card.className = 'blog-card';
            card.style.animationDelay = (i * 0.1) + 's';

            const title = document.createElement('h3');
            title.textContent = post.title;

            const date = document.createElement('p');
            date.className = 'blog-date';
            date.textContent = new Date(post.pubDate).toDateString();

            const link = document.createElement('a');
            link.href = post.link;
            link.target = '_blank';
            link.rel = 'noopener noreferrer';
            link.className = 'blog-link';
            link.textContent = 'Read on Medium →';

            card.appendChild(title);
            card.appendChild(date);
            card.appendChild(link);
            container.appendChild(card);

            // Re-observe for scroll animation
            if (document.body.classList.contains('animate-ready')) {
                const obs = new IntersectionObserver((entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) entry.target.classList.add('animate-in');
                    });
                }, { threshold: 0.1 });
                obs.observe(card);
            }

            // Add tilt effect to blog cards
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const rotateX = ((y - rect.height / 2) / (rect.height / 2)) * -5;
                const rotateY = ((x - rect.width / 2) / (rect.width / 2)) * 5;
                card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px) scale(1.04)`;
                card.style.transition = 'transform 0.1s ease-out';
            });
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg) translateY(0) scale(1)';
                card.style.transition = 'transform 0.5s ease-out';
            });
        });
}

// ========================================
// INITIALIZE ON PAGE LOAD
// ========================================
window.addEventListener('load', () => {
    updateActiveLink();
    initScrollAnimations();

    // Hero entrance animations
    const heroText = document.querySelector('.hero-text');
    const heroVisual = document.querySelector('.hero-visual');
    if (heroText) {
        heroText.style.opacity = '0';
        heroText.style.transform = 'translateY(30px)';
        setTimeout(() => {
            heroText.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
            heroText.style.opacity = '1';
            heroText.style.transform = 'translateY(0)';
        }, 150);
    }
    if (heroVisual) {
        heroVisual.style.opacity = '0';
        heroVisual.style.transform = 'scale(0.95)';
        setTimeout(() => {
            heroVisual.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
            heroVisual.style.opacity = '1';
            heroVisual.style.transform = 'scale(1)';
        }, 300);
    }

    loadBlogsIntoSection();

    // Fallback: replace broken tech icons with text label
    document.querySelectorAll('.tech-tag img').forEach(img => {
        img.addEventListener('error', function() {
            const tag = this.parentElement;
            const tooltip = tag.getAttribute('data-tooltip') || this.alt;
            tag.textContent = tooltip;
            tag.style.width = 'auto';
            tag.style.height = 'auto';
            tag.style.padding = '6px 14px';
            tag.style.fontSize = '12px';
            tag.style.borderRadius = '20px';
        });
    });
});
