// ===== Code Block Copy Button =====
(function() {
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
            
            // Modern clipboard API
            if (navigator.clipboard && window.isSecureContext) {
                navigator.clipboard.writeText(text).then(() => {
                    showCopySuccess(button);
                }).catch(err => {
                    console.error('Failed to copy:', err);
                    fallbackCopyTextToClipboard(text, button);
                });
            } else {
                fallbackCopyTextToClipboard(text, button);
            }
        });
        
        pre.appendChild(button);
    });

    function showCopySuccess(button) {
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
                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                </svg>
            `;
            button.style.color = '#6e6e73';
        }, 2000);
    }

    function fallbackCopyTextToClipboard(text, button) {
        const textarea = document.createElement('textarea');
        textarea.value = text;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.select();
        
        try {
            document.execCommand('copy');
            showCopySuccess(button);
        } catch (err) {
            console.error('Failed to copy:', err);
        }
        document.body.removeChild(textarea);
    }
})();
