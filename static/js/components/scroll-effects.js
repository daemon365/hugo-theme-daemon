// ===== Reading Progress Bar =====
(function() {
    const progressBar = document.querySelector('.reading-progress-bar');
    if (progressBar) {
        window.addEventListener('scroll', () => {
            const windowHeight = window.innerHeight;
            const documentHeight = document.documentElement.scrollHeight - windowHeight;
            const scrolled = window.scrollY;
            const progress = documentHeight > 0 ? (scrolled / documentHeight) * 100 : 0;
            progressBar.style.width = progress + '%';
        });
    }
})();

// ===== Header Scroll Effect =====
(function() {
    const header = document.querySelector('.site-header');
    if (!header) return;
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Add shadow on scroll
        header.style.boxShadow = scrollTop > 10 ? '0 2px 8px rgba(0, 0, 0, 0.06)' : 'none';
    });
})();

// ===== Smooth Scroll for Anchor Links =====
(function() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            
            e.preventDefault();
            let target = null;
            try { target = document.querySelector(href); } catch (err) { return; }
            
            if (target) {
                const headerHeight = document.querySelector('.site-header')?.offsetHeight || 0;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
})();
