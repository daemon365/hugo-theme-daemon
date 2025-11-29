// ===== Floating TOC =====
(function() {
    const tocButton = document.getElementById('tocButton');
    const tocPanel = document.getElementById('tocPanel');
    const tocClose = document.getElementById('tocClose');
    const tocNav = document.querySelector('.toc-panel-nav');
    
    // Only show TOC button if there's content
    if (tocButton && tocNav && tocNav.querySelector('ul')) {
        // Show TOC button
        tocButton.classList.add('visible');
        
        // Toggle TOC panel with button only
        tocButton.addEventListener('click', (e) => {
            e.stopPropagation();
            const isActive = tocPanel.classList.contains('active');
            if (isActive) {
                tocPanel.classList.remove('active');
                tocButton.classList.remove('active');
            } else {
                tocPanel.classList.add('active');
                tocButton.classList.add('active');
            }
        });
        
        // Close button
        tocClose.addEventListener('click', (e) => {
            e.stopPropagation();
            tocPanel.classList.remove('active');
            tocButton.classList.remove('active');
        });
        
        const headings = document.querySelectorAll('.post-body h2, .post-body h3, .post-body h4');
        const tocLinks = tocNav.querySelectorAll('a');

        // Smooth scroll to heading
        tocLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                
                const href = link.getAttribute('href');
                if (!href || !href.startsWith('#')) {
                    return;
                }
                
                const targetId = href.substring(1);
                const target = document.getElementById(targetId);
                
                if (target) {
                    const headerHeight = document.querySelector('.site-header')?.offsetHeight || 60;
                    const targetPosition = target.offsetTop - headerHeight - 20;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                    
                    // Close panel on mobile after a short delay
                    setTimeout(() => {
                        if (window.innerWidth <= 768) {
                            tocPanel.classList.remove('active');
                            tocButton.classList.remove('active');
                        }
                    }, 300);
                }
            });
        });

        // Highlight active section in TOC
        const observerOptions = {
            rootMargin: '-80px 0px -80% 0px',
            threshold: 0
        };

        const observerCallback = (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const id = entry.target.getAttribute('id');
                    tocLinks.forEach(link => {
                        link.classList.remove('active');
                        if (link.getAttribute('href') === `#${id}`) {
                            link.classList.add('active');
                        }
                    });
                }
            });
        };

        const observer = new IntersectionObserver(observerCallback, observerOptions);
        headings.forEach(heading => {
            if (heading.id) {
                observer.observe(heading);
            }
        });
    } else if (tocButton) {
        // Hide TOC button if no content
        tocButton.style.display = 'none';
    }
})();
