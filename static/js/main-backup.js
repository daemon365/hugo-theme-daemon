// ===== Hugo Theme Daemon - Main JavaScript =====

(function() {
    'use strict';

    // ===== Search Functionality =====
    const searchModal = document.getElementById('searchModal');
    const searchInput = document.getElementById('searchInput');
    const searchResults = document.getElementById('searchResults');
    const searchTrigger = document.querySelector('.search-trigger');
    const searchClose = document.querySelector('.search-close');
    const searchBackdrop = document.querySelector('.search-modal-backdrop');

    let searchIndex = [];
    let fuse;

    // Open search modal
    function openSearch() {
        searchModal.classList.add('active');
        document.body.style.overflow = 'hidden';
        setTimeout(() => searchInput.focus(), 100);
        
        // Load search index if not already loaded
        if (searchIndex.length === 0) {
            loadSearchIndex();
        }
    }

    // Close search modal
    function closeSearch() {
        searchModal.classList.remove('active');
        document.body.style.overflow = '';
        searchInput.value = '';
        searchResults.innerHTML = '<p class="search-hint">Enter 2 or more characters to start searching</p>';
    }

    // Load search index
    async function loadSearchIndex() {
        try {
            const response = await fetch('/index.json');
            searchIndex = await response.json();
            
            // Initialize Fuse.js for fuzzy search
            if (typeof Fuse !== 'undefined') {
                fuse = new Fuse(searchIndex, {
                    keys: ['title', 'content', 'tags', 'categories'],
                    threshold: 0.3,
                    includeMatches: true,
                    minMatchCharLength: 2
                });
            }
        } catch (error) {
            console.error('Failed to load search index:', error);
        }
    }

    // Perform search
    function performSearch(query) {
        if (!query || query.length < 2) {
            searchResults.innerHTML = '<p class="search-hint">Enter 2 or more characters to start searching</p>';
            return;
        }

        let results;
        
        if (fuse) {
            // Use Fuse.js if available
            results = fuse.search(query).slice(0, 10);
            displaySearchResults(results.map(r => r.item), query);
        } else {
            // Simple fallback search
            results = searchIndex.filter(item => {
                const searchText = `${item.title} ${item.content} ${item.tags} ${item.categories}`.toLowerCase();
                return searchText.includes(query.toLowerCase());
            }).slice(0, 10);
            displaySearchResults(results, query);
        }
    }

    // Display search results
    function displaySearchResults(results, query) {
        if (results.length === 0) {
            searchResults.innerHTML = '<p class="search-hint">No matching results found</p>';
            return;
        }

        const resultsHTML = results.map(result => {
            const excerpt = getExcerpt(result.content, query);
            return `
                <div class="search-result-item">
                    <h4 class="search-result-title">
                        <a href="${result.permalink}">${highlightText(result.title, query)}</a>
                    </h4>
                    <p class="search-result-excerpt">${excerpt}</p>
                </div>
            `;
        }).join('');

        searchResults.innerHTML = resultsHTML;
    }

    // Get excerpt around search term
    function getExcerpt(content, query) {
        const index = content.toLowerCase().indexOf(query.toLowerCase());
        if (index === -1) return content.substring(0, 150) + '...';
        
        const start = Math.max(0, index - 75);
        const end = Math.min(content.length, index + query.length + 75);
        let excerpt = content.substring(start, end);
        
        if (start > 0) excerpt = '...' + excerpt;
        if (end < content.length) excerpt = excerpt + '...';
        
        return highlightText(excerpt, query);
    }

    // Highlight search term
    function highlightText(text, query) {
        const regex = new RegExp(`(${escapeRegex(query)})`, 'gi');
        return text.replace(regex, '<mark>$1</mark>');
    }

    // Escape regex special characters
    function escapeRegex(string) {
        return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    }

    // Event listeners for search
    if (searchTrigger) {
        searchTrigger.addEventListener('click', openSearch);
    }

    if (searchClose) {
        searchClose.addEventListener('click', closeSearch);
    }

    if (searchBackdrop) {
        searchBackdrop.addEventListener('click', closeSearch);
    }

    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            performSearch(e.target.value);
        });
    }

    // Keyboard shortcuts
    document.addEventListener('keydown', (e) => {
        // Open search with Cmd/Ctrl + K
        if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
            e.preventDefault();
            openSearch();
        }
        
        // Close search with Escape
        if (e.key === 'Escape' && searchModal.classList.contains('active')) {
            closeSearch();
        }
    });

    // ===== Floating TOC =====
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

    // ===== Header Scroll Effect =====
    const header = document.querySelector('.site-header');
    let lastScrollTop = 0;

    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Add shadow on scroll
        if (scrollTop > 10) {
            header.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.06)';
        } else {
            header.style.boxShadow = 'none';
        }

        lastScrollTop = scrollTop;
    });

    // ===== Smooth Scroll for Anchor Links =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            
            e.preventDefault();
            const target = document.querySelector(href);
            
            if (target) {
                const headerHeight = document.querySelector('.site-header').offsetHeight;
                const targetPosition = target.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ===== Code Block Copy Button =====
    document.querySelectorAll('pre').forEach((pre) => {
        // Skip if already has button
        if (pre.querySelector('.code-copy-btn')) return;
        
        const code = pre.querySelector('code');
        if (!code) return;
        
        // Create copy button
        const button = document.createElement('button');
        button.className = 'code-copy-btn';
        button.setAttribute('aria-label', 'Copy code');
        button.innerHTML = `
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
            </svg>
        `;
        
        // Add button styling
        Object.assign(button.style, {
            position: 'absolute',
            top: '0.5rem',
            right: '0.5rem',
            padding: '0.4rem 0.6rem',
            background: 'rgba(255, 255, 255, 0.95)',
            border: '1px solid #d2d2d7',
            borderRadius: '6px',
            cursor: 'pointer',
            transition: 'all 0.2s',
            color: '#6e6e73',
            zIndex: '10',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        });
        
        // Make pre relative for absolute positioning
        pre.style.position = 'relative';
        
        // Hover effects
        button.addEventListener('mouseenter', () => {
            button.style.background = 'rgba(255, 255, 255, 1)';
            button.style.borderColor = '#007aff';
            button.style.color = '#007aff';
        });
        
        button.addEventListener('mouseleave', () => {
            button.style.background = 'rgba(255, 255, 255, 0.95)';
            button.style.borderColor = '#d2d2d7';
            button.style.color = '#6e6e73';
        });
        
        // Copy to clipboard
        button.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            const text = code.textContent || code.innerText;
            
            if (navigator.clipboard && navigator.clipboard.writeText) {
                navigator.clipboard.writeText(text).then(() => {
                    button.innerHTML = `
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                    `;
                    button.style.color = '#34c759';
                    button.style.borderColor = '#34c759';
                    
                    setTimeout(() => {
                        button.innerHTML = `
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                            </svg>
                        `;
                        button.style.color = '#6e6e73';
                        button.style.borderColor = '#d2d2d7';
                    }, 2000);
                }).catch(err => {
                    console.error('Failed to copy:', err);
                });
            } else {
                // Fallback for older browsers
                const textarea = document.createElement('textarea');
                textarea.value = text;
                textarea.style.position = 'fixed';
                textarea.style.opacity = '0';
                document.body.appendChild(textarea);
                textarea.select();
                try {
                    document.execCommand('copy');
                    button.innerHTML = `
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                    `;
                    button.style.color = '#34c759';
                    setTimeout(() => {
                        button.innerHTML = `
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2 2v1"></path>
                            </svg>
                        `;
                        button.style.color = '#6e6e73';
                    }, 2000);
                } catch (err) {
                    console.error('Failed to copy:', err);
                }
                document.body.removeChild(textarea);
            }
        });
        
        pre.appendChild(button);
    });

    // ===== Image Lazy Loading =====
    if ('loading' in HTMLImageElement.prototype) {
        const images = document.querySelectorAll('img[loading="lazy"]');
        images.forEach(img => {
            img.src = img.dataset.src;
        });
    } else {
        // Fallback for browsers that don't support lazy loading
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
        document.body.appendChild(script);
    }

    // ===== Image Preview =====
    const postBody = document.querySelector('.post-body');
    if (postBody) {
        const images = postBody.querySelectorAll('img');
        
        images.forEach(img => {
            // Skip if image is already wrapped
            if (img.parentElement.classList.contains('image-preview-wrapper')) return;
            
            // Make image clickable
            img.style.cursor = 'zoom-in';
            
            img.addEventListener('click', (e) => {
                e.preventDefault();
                openImagePreview(img.src, img.alt);
            });
        });
    }
    
    function openImagePreview(src, alt) {
        // Create preview overlay
        const overlay = document.createElement('div');
        overlay.className = 'image-preview-overlay';
        overlay.innerHTML = `
            <div class="image-preview-content">
                <img src="${src}" alt="${alt || ''}" />
                <button class="image-preview-close" aria-label="Close">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                </button>
            </div>
        `;
        
        document.body.appendChild(overlay);
        document.body.style.overflow = 'hidden';
        
        // Fade in
        setTimeout(() => overlay.classList.add('active'), 10);
        
        // Close handlers
        const closeBtn = overlay.querySelector('.image-preview-close');
        const previewImg = overlay.querySelector('img');
        
        closeBtn.addEventListener('click', closeImagePreview);
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) closeImagePreview();
        });
        
        // Prevent closing when clicking on image
        previewImg.addEventListener('click', (e) => e.stopPropagation());
        
        // ESC key to close
        document.addEventListener('keydown', handleEscKey);
        
        function closeImagePreview() {
            overlay.classList.remove('active');
            setTimeout(() => {
                overlay.remove();
                document.body.style.overflow = '';
                document.removeEventListener('keydown', handleEscKey);
            }, 300);
        }
        
        function handleEscKey(e) {
            if (e.key === 'Escape') closeImagePreview();
        }
    }

    // ===== Reading Progress Bar =====
    const progressBar = document.querySelector('.reading-progress-bar');
    if (progressBar) {
        window.addEventListener('scroll', () => {
            const windowHeight = window.innerHeight;
            const documentHeight = document.documentElement.scrollHeight - windowHeight;
            const scrolled = window.scrollY;
            const progress = (scrolled / documentHeight) * 100;
            progressBar.style.width = progress + '%';
        });
    }

    // ===== Back to Top with Percentage =====
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

    // ===== Initialize =====
    console.log('Hugo Theme Daemon loaded successfully! 🎉');
})();
