// Navigation Toggle
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');

if (navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });
}

// Smooth Scroll for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            navMenu.classList.remove('active');
        }
    });
});

// Active Navigation Link
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

function updateActiveNav() {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', updateActiveNav);
updateActiveNav();

// Tab Switching
const tabButtons = document.querySelectorAll('.tab-btn');
tabButtons.forEach(button => {
    button.addEventListener('click', () => {
        const tabContainer = button.closest('.code-tabs');
        const tabName = button.getAttribute('data-tab');
        
        // Remove active class from all buttons and panes
        tabContainer.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
        tabContainer.querySelectorAll('.tab-pane').forEach(pane => pane.classList.remove('active'));
        
        // Add active class to clicked button and corresponding pane
        button.classList.add('active');
        const targetPane = tabContainer.querySelector(`#${tabName}`);
        if (targetPane) {
            targetPane.classList.add('active');
        }
    });
});

// Copy to Clipboard
const copyButtons = document.querySelectorAll('.copy-btn');
copyButtons.forEach(button => {
    button.addEventListener('click', async () => {
        const codeText = button.getAttribute('data-copy');
        const icon = button.querySelector('i');
        
        try {
            await navigator.clipboard.writeText(codeText);
            
            // Visual feedback
            const originalIcon = icon.className;
            icon.className = 'fas fa-check';
            button.style.background = 'var(--success)';
            button.style.borderColor = 'var(--success)';
            
            setTimeout(() => {
                icon.className = originalIcon;
                button.style.background = '';
                button.style.borderColor = '';
            }, 2000);
        } catch (err) {
            console.error('Failed to copy:', err);
            // Fallback for older browsers
            const textArea = document.createElement('textarea');
            textArea.value = codeText;
            textArea.style.position = 'fixed';
            textArea.style.opacity = '0';
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
            
            const originalIcon = icon.className;
            icon.className = 'fas fa-check';
            setTimeout(() => {
                icon.className = originalIcon;
            }, 2000);
        }
    });
});

// Intersection Observer for Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.step-card, .feature-card, .feature-item, .doc-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!navMenu.contains(e.target) && !navToggle.contains(e.target)) {
        navMenu.classList.remove('active');
    }
});

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
    }
});

// Code syntax highlighting (simple version)
document.querySelectorAll('code.language-bash').forEach(block => {
    const text = block.textContent;
    // Highlight comments
    block.innerHTML = text.replace(/#.*$/gm, '<span style="color: var(--text-muted)">$&</span>');
});

console.log('%cGetLainux Documentation', 'color: #6366f1; font-size: 20px; font-weight: bold;');
console.log('%cBuilt with ❤️ by Nishant Gaurav', 'color: #94a3b8; font-size: 12px;');

