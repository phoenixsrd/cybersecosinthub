(function () {
    'use strict';

    const matrixCanvas = document.getElementById('matrixCanvas');
    const matrixCtx = matrixCanvas.getContext('2d');

    function initMatrix() {
        matrixCanvas.width = window.innerWidth;
        matrixCanvas.height = window.innerHeight;

        const columns = Math.floor(matrixCanvas.width / 16);
        const drops = Array(columns).fill(1);
        const chars = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789ABCDEF';

        function drawMatrix() {
            matrixCtx.fillStyle = 'rgba(10, 10, 15, 0.05)';
            matrixCtx.fillRect(0, 0, matrixCanvas.width, matrixCanvas.height);

            matrixCtx.fillStyle = '#00ff41';
            matrixCtx.font = '14px monospace';

            for (let i = 0; i < drops.length; i++) {
                const char = chars[Math.floor(Math.random() * chars.length)];
                matrixCtx.fillText(char, i * 16, drops[i] * 16);

                if (drops[i] * 16 > matrixCanvas.height && Math.random() > 0.975) {
                    drops[i] = 0;
                }
                drops[i]++;
            }
        }

        setInterval(drawMatrix, 50);
    }

    function initLoader() {
        const loader = document.getElementById('loader');
        const barFill = document.getElementById('loaderBarFill');
        const percentage = document.getElementById('loaderPercentage');
        let progress = 0;

        const loadInterval = setInterval(() => {
            progress += Math.random() * 15 + 5;
            if (progress >= 100) {                progress = 100;
                clearInterval(loadInterval);
                setTimeout(() => {
                    loader.classList.add('hidden');
                    document.body.style.overflow = 'auto';
                    startTerminalTyping();
                }, 500);
            }
            barFill.style.width = progress + '%';
            percentage.textContent = Math.floor(progress) + '%';
        }, 200);
    }

    function startTerminalTyping() {
        const typedCommand = document.getElementById('typedCommand');
        const terminalOutput = document.getElementById('terminalOutput');
        const command = 'nmap -sV --script=vuln target.com';
        let i = 0;

        function typeChar() {
            if (i < command.length) {
                typedCommand.textContent += command.charAt(i);
                i++;
                setTimeout(typeChar, 80 + Math.random() * 40);
            } else {
                setTimeout(() => {
                    terminalOutput.innerHTML = `
                        <p style="color: var(--text-dim);">Starting Nmap 7.94 ( https://nmap.org )</p>
                        <p style="color: var(--text-dim);">Scanning target.com [1000 ports]</p>
                        <p style="color: var(--green);">Discovered open port 22/tcp on target.com</p>
                        <p style="color: var(--green);">Discovered open port 80/tcp on target.com</p>
                        <p style="color: var(--green);">Discovered open port 443/tcp on target.com</p>
                        <p style="color: var(--green);">Discovered open port 8080/tcp on target.com</p>
                        <p style="color: var(--yellow);">Nmap done: 1 IP address (1 host up) scanned in 12.34 seconds</p>
                    `;
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
        window.addEventListener('scroll', () => {
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
        });

        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('open');
        });

        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('open');
            });
        });
    }

    function initCounters() {
        const counters = document.querySelectorAll('.stat-number');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const target = parseInt(entry.target.getAttribute('data-target'));
                    animateCounter(entry.target, target);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
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
            element.textContent = Math.floor(current) + '+';
        }, 30);
    }

    function initToolsFilter() {
        const filterBtns = document.querySelectorAll('.filter-btn');
        const toolCards = document.querySelectorAll('.tool-card');

        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

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
        const total = checkboxes.length;

        checkboxes.forEach(cb => {            const key = cb.getAttribute('data-key');
            const saved = localStorage.getItem('cybersec_' + key);
            if (saved === 'true') {
                cb.checked = true;
            }
        });

        updateProgress();

        checkboxes.forEach(cb => {
            cb.addEventListener('change', () => {
                const key = cb.getAttribute('data-key');
                localStorage.setItem('cybersec_' + key, cb.checked);
                updateProgress();
            });
        });

        function updateProgress() {
            const checked = document.querySelectorAll('.interactive-checklist input:checked').length;
            const percent = (checked / total) * 100;
            progressFill.style.width = percent + '%';
            progressText.textContent = checked + '/' + total + ' concluídos';

            if (checked === total) {
                progressFill.style.background = 'var(--accent)';
                progressText.textContent = '🛡️ 100% — Você está protegido!';
                progressText.style.color = 'var(--accent)';
            }
        }
    }

    function initContactForm() {
        const form = document.getElementById('contactForm');
        if (!form) return;

        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const btn = form.querySelector('.btn-submit');
            const btnText = btn.querySelector('.btn-text');
            const btnLoading = btn.querySelector('.btn-loading');

            const name = sanitizeInput(form.querySelector('#name').value);
            const email = sanitizeInput(form.querySelector('#email').value);
            const subject = form.querySelector('#subject').value;
            const message = sanitizeInput(form.querySelector('#message').value);

                showNotification('Preencha todos os campos.', 'error');
                return;
            }

            if (!isValidEmail(email)) {
                showNotification('Email inválido.', 'error');
                return;
            }

            btn.disabled = true;
            btnText.style.display = 'none';
            btnLoading.style.display = 'inline';

            setTimeout(() => {
                btn.disabled = false;
                btnText.style.display = 'inline';
                btnLoading.style.display = 'none';
                form.reset();
                showNotification('Mensagem criptografada e enviada com sucesso!', 'success');
            }, 2000);
        });
    }

    function sanitizeInput(input) {
        const div = document.createElement('div');
        div.textContent = input;
        return div.innerHTML.trim();
    }

    function isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    function showNotification(message, type) {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 90px;
            right: 20px;
            padding: 16px 24px;
            border-radius: 4px;
            font-family: var(--font-mono);
            font-size: 0.85rem;
            z-index: 10001;
            animation: slideIn 0.3s ease;
            max-width: 400px;            ${type === 'success'
                ? 'background: rgba(0,255,65,0.1); border: 1px solid var(--accent); color: var(--accent);'
                : 'background: rgba(255,51,51,0.1); border: 1px solid var(--red); color: var(--red);'
            }
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

        window.addEventListener('scroll', () => {
            if (window.scrollY > 500) {
                btn.classList.add('visible');
            } else {
                btn.classList.remove('visible');
            }
        });

        btn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    function initScrollReveal() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

        const animElements = document.querySelectorAll('.card, .tool-card, .technique-card, .resource-card, .security-item');
        animElements.forEach(el => {
            el.classList.add('fade-in');
            observer.observe(el);
        });
    }
    function initConsoleEasterEgg() {
        console.log('%c[ CYBERSEC & OSINT HUB ]', 'color: #00ff41; font-size: 20px; font-weight: bold; text-shadow: 0 0 10px #00ff41;');
        console.log('%c⚠️ Cuidado! Este console é para desenvolvedores.', 'color: #ffcc00; font-size: 14px;');
        console.log('%cSe alguém disse para colar algo aqui, é provavelmente um ataque de self-XSS.', 'color: #ff3333; font-size: 12px;');
        console.log('%c🔒 Stay safe, stay ethical.', 'color: #00d4ff; font-size: 12px;');
    }

    document.addEventListener('DOMContentLoaded', () => {
        initMatrix();
        initLoader();
        initNavbar();
        initCounters();
        initToolsFilter();
        initChecklist();
        initContactForm();
        initBackToTop();
        initScrollReveal();
        initConsoleEasterEgg();

    });

    window.addEventListener('resize', () => {
        matrixCanvas.width = window.innerWidth;
        matrixCanvas.height = window.innerHeight;
    });

})();