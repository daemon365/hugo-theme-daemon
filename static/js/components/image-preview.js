// ===== Image Preview =====
(function() {
    const postBody = document.querySelector('.post-body');
    if (!postBody) return;
    
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
})();
