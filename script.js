'use strict';

function sanitizeInput(input) {
    if (!input || typeof input !== 'string') return '';
    const div = document.createElement('div');
    div.textContent = input;
    return div.textContent.trim();
}

function isValidEmail(email) {
    if (!email || typeof email !== 'string' || email.length > 254) return false;
    return /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(email);
}

function generateCSRFToken() {
    const array = new Uint8Array(32);
    if (window.crypto && window.crypto.getRandomValues) {
        window.crypto.getRandomValues(array);
    } else {
        for (let i = 0; i < 32; i++) {
            array[i] = Math.floor(Math.random() * 256);
        }
    }
    return Array.from(array, b => b.toString(16).padStart(2, '0')).join('');
}

function safeSetText(element, text) {
    if (element) {
        element.textContent = text;
    }
}

function safeInsertTerminalHTML(element, html) {
    if (!element) return;

    const safeClasses = new Set([
        'text-green', 'text-cyan', 'text-white', 'text-yellow', 'text-dim'
    ]);

    const temp = document.createElement('div');
    temp.textContent = html;

    element.innerHTML = '';

    const lines = [
        { text: 'Starting Nmap 7.94 ( https://nmap.org )', cls: 'text-dim' },
        { text: 'Scanning target.com [1000 ports]', cls: 'text-dim' },
        { text: 'Discovered open port 22/tcp on target.com', cls: 'text-green' },
        { text: 'Discovered open port 80/tcp on target.com', cls: 'text-green' },
        { text: 'Discovered open port 443/tcp on target.com', cls: 'text-green' },
        { text: 'Discovered open port 8080/tcp on target.com', cls: 'text-green' },
        { text: 'Nmap done: 1 IP address (1 host up) scanned in 12.34 seconds', cls: 'text-yellow' }
    ];

    lines.forEach(line => {
        const p = document.createElement('p');
        p.textContent = line.text;
        if (safeClasses.has(line.cls)) {
            p.className = line.cls;
        }
        element.appendChild(p);
    });
}

const activeIntervals = [];
const activeObservers = [];

function trackInterval(id) {
    activeIntervals.push(id);
    return id;
}

function trackObserver(observer) {
    activeObservers.push(observer);
    return observer;
}

function cleanup() {
    activeIntervals.forEach(id => clearInterval(id));
    activeIntervals.length = 0;
    activeObservers.forEach(obs => obs.disconnect());
    activeObservers.length = 0;
}

document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
    
document.addEventListener('DOMContentLoaded', function () {
    initMatrix();
    initLoader();
    initNavbar();
    initCounters();
    initToolsFilter();
    initChecklist();
    initContactForm();
    initBackToTop();
    initScrollReveal();
    initCSRFToken();
});

function initCSRFToken() {
    const csrfField = document.getElementById('csrfToken');
    if (csrfField) {
        csrfField.value = generateCSRFToken();
    }
}

function initMatrix() {
    const canvas = document.getElementById('matrixCanvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationId = null;

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const columns = Math.floor(canvas.width / 16);
    const drops = Array(columns).fill(1);
    const chars = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789ABCDEF';

    function drawMatrix() {
        ctx.fillStyle = 'rgba(10, 10, 15, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = '#00ff41';
        ctx.font = '14px monospace';

        for (let i = 0; i < drops.length; i++) {
            const char = chars[Math.floor(Math.random() * chars.length)];
            ctx.fillText(char, i * 16, drops[i] * 16);

            if (drops[i] * 16 > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i]++;
        }

        if (!document.hidden) {
            animationId = requestAnimationFrame(() => {
                setTimeout(drawMatrix, 50);
            });
        } else {
            animationId = setTimeout(drawMatrix, 500);
        }
    }

    drawMatrix();

    canvas._cleanup = () => {
        if (animationId) {
            cancelAnimationFrame(animationId);
            clearTimeout(animationId);
        }
    };
}

function initLoader() {
    const loader = document.getElementById('loader');
    const barFill = document.getElementById('loaderBarFill');
    const percentage = document.getElementById('loaderPercentage');

    if (!loader || !barFill || !percentage) return;

    let progress = 0;
    const loadInterval = setInterval(() => {
        progress += Math.random() * 10 + 5;

        if (progress >= 100) {
            progress = 100;
            clearInterval(loadInterval);

            barFill.style.width = progress + '%';
            safeSetText(percentage, '100%');

            setTimeout(() => {
                loader.classList.add('hidden');
                document.body.style.overflow = 'auto';
                startTerminalTyping();
            }, 800);
        } else {
            barFill.style.width = progress + '%';
            safeSetText(percentage, Math.floor(progress) + '%');
        }
    }, 150);

    trackInterval(loadInterval);

    const failSafe = setTimeout(() => {
        if (loader && !loader.classList.contains('hidden')) {
            loader.classList.add('hidden');
            document.body.style.overflow = 'auto';
            startTerminalTyping();
        }
    }, 5000);

    loader.addEventListener('transitionend', () => clearTimeout(failSafe), { once: true });
}

function startTerminalTyping() {
    const typedCommand = document.getElementById('typedCommand');
    const terminalOutput = document.getElementById('terminalOutput');

    if (!typedCommand) return;

    const command = 'nmap -sV --script=vuln target.com';
    let i = 0;
    let typingInterval = null;

    function typeChar() {
        if (i < command.length && typedCommand) {
            typedCommand.textContent += command.charAt(i);
            i++;
            typingInterval = setTimeout(typeChar, 80 + Math.random() * 40);
        } else if (terminalOutput) {
            setTimeout(() => {
                safeInsertTerminalHTML(terminalOutput);
            }, 500);
        }
    }

    typeChar();
}

function initNavbar() {
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (!navbar) return;

    let scrollTicking = false;
    window.addEventListener('scroll', () => {
        if (!scrollTicking) {
            requestAnimationFrame(() => {
                handleScroll(navbar, navLinks);
                scrollTicking = false;
            });
            scrollTicking = true;
        }
    });

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            const isOpen = navMenu.classList.toggle('open');
            navToggle.setAttribute('aria-expanded', isOpen);
        });

        navToggle.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                navToggle.click();
            }
        });

        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('open');
                navToggle.setAttribute('aria-expanded', 'false');
            });
        });
    }
}

function handleScroll(navbar, navLinks) {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    const sections = document.querySelectorAll('.section');
    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        if (window.scrollY >= sectionTop) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('data-section') === current) {
            link.classList.add('active');
        }
    });
}

function initCounters() {
    const counters = document.querySelectorAll('.stat-number');
    if (counters.length === 0) return;

    const observer = trackObserver(new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.getAttribute('data-target'), 10);
                if (!isNaN(target)) {
                    animateCounter(entry.target, target);
                }
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 }));

    counters.forEach(counter => observer.observe(counter));
}

function animateCounter(element, target) {
    let current = 0;
    const increment = target / 60;
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        safeSetText(element, Math.floor(current) + '+');
    }, 30);

    trackInterval(timer);
}

function initToolsFilter() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const toolCards = document.querySelectorAll('.tool-card');

    if (filterBtns.length === 0 || toolCards.length === 0) return;

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => {
                b.classList.remove('active');
                b.setAttribute('aria-selected', 'false');
            });
            btn.classList.add('active');
            btn.setAttribute('aria-selected', 'true');

            const filter = btn.getAttribute('data-filter');

            toolCards.forEach(card => {
                if (filter === 'all' || card.getAttribute('data-category') === filter) {
                    card.classList.remove('hidden');
                    card.style.animation = 'fadeInUp 0.5s ease forwards';
                } else {
                    card.classList.add('hidden');
                }
            });
        });
    });
}

function initChecklist() {
    const checkboxes = document.querySelectorAll('.interactive-checklist input[type="checkbox"]');
    const progressFill = document.getElementById('checklistProgress');
    const progressText = document.getElementById('checklistText');

    if (checkboxes.length === 0) return;

    const total = checkboxes.length;

    checkboxes.forEach(cb => {
        const key = cb.getAttribute('data-key');
        if (key && isValidStorageKey(key)) {
            try {
                const saved = localStorage.getItem('cybersec_' + key);
                if (saved === 'true') {
                    cb.checked = true;
                }
            } catch (e) {
            }
        }
    });

    updateProgress();

    checkboxes.forEach(cb => {
        cb.addEventListener('change', () => {
            const key = cb.getAttribute('data-key');
            if (key && isValidStorageKey(key)) {
                try {
                    localStorage.setItem('cybersec_' + key, cb.checked);
                } catch (e) {
                }
            }
            updateProgress();
        });
    });

    function updateProgress() {
        if (!progressFill || !progressText) return;

        const checked = document.querySelectorAll('.interactive-checklist input:checked').length;
        const percent = (checked / total) * 100;
        progressFill.style.width = percent + '%';
        safeSetText(progressText, checked + '/' + total + ' concluídos');

        if (checked === total) {
            safeSetText(progressText, '🛡️ 100% — Você está protegido!');
            progressText.style.color = 'var(--accent)';
        } else {
            progressText.style.color = '';
        }
    }
}

function isValidStorageKey(key) {
    return /^[a-zA-Z0-9\-_]{1,50}$/.test(key);
}

function initContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;

    let lastSubmitTime = 0;
    const RATE_LIMIT_MS = 5000;

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const now = Date.now();
        if (now - lastSubmitTime < RATE_LIMIT_MS) {
            showNotification('Aguarde antes de enviar novamente.', 'error');
            return;
        }

        const honeypot = form.querySelector('#website');
        if (honeypot && honeypot.value) {
            showNotification('Mensagem enviada com sucesso!', 'success');
            form.reset();
            return;
        }

        const btn = form.querySelector('.btn-submit');
        const btnText = btn.querySelector('.btn-text');
        const btnLoading = btn.querySelector('.btn-loading');

        const nameEl = form.querySelector('#name');
        const emailEl = form.querySelector('#email');
        const subjectEl = form.querySelector('#subject');
        const messageEl = form.querySelector('#message');

        if (!nameEl || !emailEl || !subjectEl || !messageEl) {
            showNotification('Erro no formulário.', 'error');
            return;
        }

        const name = sanitizeInput(nameEl.value);
        const email = sanitizeInput(emailEl.value);
        const subject = subjectEl.value;
        const message = sanitizeInput(messageEl.value);

        if (!name || !email || !subject || !message) {
            showNotification('Preencha todos os campos.', 'error');
            return;
        }

        if (name.length < 2 || name.length > 100) {
            showNotification('Nome deve ter entre 2 e 100 caracteres.', 'error');
            return;
        }

        if (!isValidEmail(email)) {
            showNotification('Email inválido.', 'error');
            return;
        }

        if (message.length < 10) {
            showNotification('Mensagem muito curta.', 'error');
            return;
        }

        const csrfField = document.getElementById('csrfToken');
        if (!csrfField || !csrfField.value) {
            showNotification('Erro de segurança. Recarregue a página.', 'error');
            return;
        }

        lastSubmitTime = now;

        btn.disabled = true;
        btnText.style.display = 'none';
        btnLoading.style.display = 'inline';

        setTimeout(() => {
            btn.disabled = false;
            btnText.style.display = 'inline';
            btnLoading.style.display = 'none';
            form.reset();

            initCSRFToken();

            showNotification('Mensagem criptografada e enviada com sucesso!', 'success');
        }, 2000);
    });
}

function showNotification(message, type) {
    const existing = document.querySelectorAll('.notification');
    existing.forEach(n => n.remove());

    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.setAttribute('role', 'alert');
    notification.setAttribute('aria-live', 'polite');

    safeSetText(notification, message);

    const isSuccess = type === 'success';
    notification.style.cssText = `
        position: fixed;
        top: 90px;
        right: 20px;
        padding: 16px 24px;
        border-radius: 4px;
        font-family: var(--font-mono, 'Fira Code', monospace);
        font-size: 0.85rem;
        z-index: 10001;
        animation: slideIn 0.3s ease;
        max-width: 400px;
        background: ${isSuccess ? 'rgba(0,255,65,0.1)' : 'rgba(255,51,51,0.1)'};
        border: 1px solid ${isSuccess ? '#00ff41' : '#ff3333'};
        color: ${isSuccess ? '#00ff41' : '#ff3333'};
    `;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transition = 'opacity 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 4000);
}

function initBackToTop() {
    const btn = document.getElementById('backToTop');
    if (!btn) return;

    let scrollTicking = false;
    window.addEventListener('scroll', () => {
        if (!scrollTicking) {
            requestAnimationFrame(() => {
                if (window.scrollY > 500) {
                    btn.classList.add('visible');
                } else {
                    btn.classList.remove('visible');
                }
                scrollTicking = false;
            });
            scrollTicking = true;
        }
    });

    btn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

function initScrollReveal() {
    const observer = trackObserver(new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }));

    const animElements = document.querySelectorAll('.card, .tool-card, .technique-card, .resource-card, .security-item, .cve-item');
    animElements.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
}