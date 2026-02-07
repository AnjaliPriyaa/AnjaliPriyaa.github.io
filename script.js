// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const href = this.getAttribute('href');
        // Skip if href is just '#' or invalid
        if (!href || href === '#' || href.length <= 1) {
            return;
        }
        const target = document.querySelector(href);
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Active navigation highlighting
const sections = document.querySelectorAll('.section');
const navLinks = document.querySelectorAll('.nav-link');

function updateActiveLink() {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').substring(1) === current) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', updateActiveLink);

// Contact form handling
const contactForm = document.querySelector('.contact-form-new');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = this.querySelector('input[name="name"]').value;
        const email = this.querySelector('input[name="email"]').value;
        const message = this.querySelector('textarea[name="message"]').value;
        
        // Validate inputs
        if (!name || !email || !message) {
            return;
        }
        
        // Show success message
        const button = this.querySelector('.btn-send');
        const originalText = button.textContent;
        button.textContent = '✓ Message Sent!';
        button.style.backgroundColor = 'var(--accent-green, #00ff88)';
        
        // Reset form after 2 seconds
        setTimeout(() => {
            this.reset();
            button.textContent = originalText;
            button.style.backgroundColor = '';
        }, 2000);
    });
}

// Add scroll animations - Initialize after DOM loads
function initScrollAnimations() {
    // Add class to enable animation states
    document.body.classList.add('animate-ready');
    
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Observe all animated elements with staggered delays
    document.querySelectorAll('.expertise-card, .timeline-card, .cert-card, .blog-card').forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
        observer.observe(card);
    });

    // Observe section titles
    document.querySelectorAll('.section-title').forEach(title => {
        observer.observe(title);
    });

    // Observe contact form
    const contactForm = document.querySelector('.contact-form-new');
    if (contactForm) {
        observer.observe(contactForm);
    }
}

// Initialize on page load
window.addEventListener('load', function() {
    updateActiveLink();
    
    // Initialize scroll animations
    initScrollAnimations();
    
    // Add entrance animation to hero content
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.style.opacity = '0';
        heroContent.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            heroContent.style.transition = 'opacity 1s ease, transform 1s ease';
            heroContent.style.opacity = '1';
            heroContent.style.transform = 'translateY(0)';
        }, 100);
    }
    
    // Load tech blogs on page load
    loadBlogsIntoSection();
});

// Sanitize HTML to prevent XSS
function sanitizeHTML(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
}

// Medium Blogs Modal Functionality
function renderTechBlogs(posts, containerId = "tech-blogs") {
    const container = document.getElementById(containerId);
    
    if (!container) {
        return;
    }
    
    container.innerHTML = "";
    
    if (posts.length === 0) {
        container.innerHTML = "<p class='no-blogs'>No software engineering articles found with the tech tag yet.</p>";
        return;
    }
    
    posts
        .sort((a, b) => new Date(b.pubDate) - new Date(a.pubDate))
        .forEach((post, index) => {
            const card = document.createElement("div");
            card.className = "blog-card";
            card.style.animationDelay = `${index * 0.1}s`;
            
            const title = document.createElement('h3');
            title.textContent = post.title;
            
            const date = document.createElement('p');
            date.className = 'blog-date';
            date.textContent = new Date(post.pubDate).toDateString();
            
            const link = document.createElement('a');
            link.href = sanitizeHTML(post.link);
            link.target = '_blank';
            link.rel = 'noopener noreferrer';
            link.className = 'blog-link';
            link.textContent = 'Read on Medium →';
            
            card.appendChild(title);
            card.appendChild(date);
            card.appendChild(link);
            container.appendChild(card);
        });
}

// Load blogs into the main page section
async function loadBlogsIntoSection() {
    const container = document.getElementById("blogs-grid");
    if (!container) return;
    
    try {
        const posts = await fetchSoftwareEngineeringBlogs();
        renderTechBlogs(posts, "blogs-grid");
    } catch (error) {
        container.innerHTML = "<p class='no-blogs'>Unable to load articles at this time.</p>";
    }
}

// Modal Controls
const modal = document.getElementById("blogs-modal");
const mediumLink = document.getElementById("medium-link");
const closeBtn = document.querySelector(".modal-close");

if (mediumLink && modal) {
    mediumLink.addEventListener("click", async function(e) {
        e.preventDefault();
        modal.style.display = "block";
        document.body.style.overflow = "hidden";
        
        const container = document.getElementById("tech-blogs");
        if (container) {
            container.innerHTML = "<p class='loading'>Loading articles...</p>";
            const posts = await fetchSoftwareEngineeringBlogs();
            renderTechBlogs(posts, "tech-blogs");
        }
    });
}

if (closeBtn) {
    closeBtn.addEventListener("click", function() {
        modal.style.display = "none";
        document.body.style.overflow = "auto";
    });
}

// Close modal when clicking outside
window.addEventListener("click", function(e) {
    if (e.target === modal) {
        modal.style.display = "none";
        document.body.style.overflow = "auto";
    }
});
