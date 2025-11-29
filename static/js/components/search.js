// ===== Search Functionality =====
(function() {
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
})();
