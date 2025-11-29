// ===== Back to Top with Percentage =====
(function() {
    const backToTop = document.createElement('button');
    backToTop.className = 'back-to-top';
    backToTop.setAttribute('aria-label', 'Back to top');
    backToTop.innerHTML = `
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="12" y1="19" x2="12" y2="5"></line>
            <polyline points="5 12 12 5 19 12"></polyline>
        </svg>
        <span class="scroll-percent">0%</span>
    `;
    
    backToTop.style.cssText = `
        position: fixed;
        bottom: 2rem;
        right: 2rem;
        width: 48px;
        height: 48px;
        background: var(--color-bg);
        border: 1px solid var(--color-border-light);
        border-radius: 50%;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s;
        box-shadow: var(--shadow-md);
        color: var(--color-text-secondary);
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        z-index: 999;
        font-size: 10px;
        font-weight: 600;
        padding: 4px;
    `;
    
    document.body.appendChild(backToTop);
    const scrollPercent = backToTop.querySelector('.scroll-percent');

    window.addEventListener('scroll', () => {
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight - windowHeight;
        const scrolled = window.scrollY;
        const progress = Math.round((scrolled / documentHeight) * 100);
        
        if (scrollPercent) {
            scrollPercent.textContent = progress + '%';
        }
        
        if (window.pageYOffset > 300) {
            backToTop.style.opacity = '1';
            backToTop.style.visibility = 'visible';
        } else {
            backToTop.style.opacity = '0';
            backToTop.style.visibility = 'hidden';
        }
    });

    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    backToTop.addEventListener('mouseenter', () => {
        backToTop.style.background = 'var(--color-accent)';
        backToTop.style.color = 'white';
        backToTop.style.transform = 'translateY(-2px)';
    });

    backToTop.addEventListener('mouseleave', () => {
        backToTop.style.background = 'var(--color-bg)';
        backToTop.style.color = 'var(--color-text-secondary)';
        backToTop.style.transform = 'translateY(0)';
    });
})();
