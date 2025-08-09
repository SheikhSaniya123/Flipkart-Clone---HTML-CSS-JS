// Search Functionality
document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.querySelector('.search-input');
    const searchBtn = document.querySelector('.search-btn');
    const searchDropdown = document.querySelector('.search-dropdown');
    
    // Sample product data for search (in a real app, this would come from an API)
    const products = [
        { 
            name: "Minimalist Lounge Chair", 
            category: "Furniture", 
            price: "$1,299.00",
            image: "images/products/new1.jpg"
        },
        { 
            name: "Scandinavian Coffee Table", 
            category: "Furniture", 
            price: "$899.00",
            image: "images/products/new2.jpg"
        },
        { 
            name: "Modern Floor Lamp", 
            category: "Lighting", 
            price: "$349.00",
            image: "images/products/new3.jpg"
        },
        { 
            name: "Linen Sofa", 
            category: "Furniture", 
            price: "$2,499.00",
            image: "images/products/new4.jpg"
        },
        { 
            name: "Ceramic Vase Set", 
            category: "Decor", 
            price: "$129.00",
            image: "images/products/new5.jpg"
        },
        { 
            name: "Oak Dining Table", 
            category: "Furniture", 
            price: "$1,799.00",
            image: "images/products/dining1.jpg"
        },
        { 
            name: "Pendant Light", 
            category: "Lighting", 
            price: "$279.00",
            image: "images/products/lighting1.jpg"
        },
        { 
            name: "Wool Area Rug", 
            category: "Furnishings", 
            price: "$599.00",
            image: "images/products/furnishings3.jpg"
        }
    ];
    
    // Search functionality
    const performSearch = (query) => {
        if (!query.trim()) return [];
        
        const lowerCaseQuery = query.toLowerCase();
        return products.filter(product => 
            product.name.toLowerCase().includes(lowerCaseQuery) || 
            product.category.toLowerCase().includes(lowerCaseQuery)
        );
    };
    
    // Display search results
    const displayResults = (results) => {
        searchDropdown.innerHTML = '';
        
        if (results.length === 0) {
            const noResults = document.createElement('div');
            noResults.className = 'no-results';
            noResults.textContent = 'No results found';
            searchDropdown.appendChild(noResults);
        } else {
            results.slice(0, 5).forEach(result => {
                const resultItem = document.createElement('div');
                resultItem.className = 'search-result';
                resultItem.innerHTML = `
                    <img src="${result.image}" alt="${result.name}" loading="lazy">
                    <div class="search-result-info">
                        <h4>${result.name}</h4>
                        <p>${result.category} • ${result.price}</p>
                    </div>
                `;
                resultItem.addEventListener('click', () => {
                    // In a real app, this would navigate to the product page
                    console.log('Selected product:', result.name);
                    searchInput.value = '';
                    searchDropdown.classList.remove('active');
                    
                    // Show quick view for demo purposes
                    const quickViewBtn = document.querySelector(`.quick-view-btn[data-id="1"]`);
                    if (quickViewBtn) quickViewBtn.click();
                });
                searchDropdown.appendChild(resultItem);
            });
            
            if (results.length > 5) {
                const viewAll = document.createElement('div');
                viewAll.className = 'view-all-results';
                viewAll.textContent = `View all ${results.length} results`;
                viewAll.addEventListener('click', () => {
                    console.log('View all results for:', searchInput.value);
                    searchInput.value = '';
                    searchDropdown.classList.remove('active');
                });
                searchDropdown.appendChild(viewAll);
            }
        }
        
        if (results.length > 0 && searchInput.value.trim()) {
            searchDropdown.classList.add('active');
        } else {
            searchDropdown.classList.remove('active');
        }
    };
    
    // Search on button click
    searchBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const query = searchInput.value;
        const results = performSearch(query);
        displayResults(results);
    });
    
    // Search on Enter key
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            const query = searchInput.value;
            const results = performSearch(query);
            displayResults(results);
        }
    });
    
    // Live search as user types (with debounce)
    let searchTimeout;
    searchInput.addEventListener('input', (e) => {
        clearTimeout(searchTimeout);
        
        searchTimeout = setTimeout(() => {
            const query = e.target.value;
            if (query.length >= 2) { // Only search after 2 characters
                const results = performSearch(query);
                displayResults(results);
            } else {
                searchDropdown.classList.remove('active');
            }
        }, 300);
    });
    
    // Close dropdown when clicking outside
    document.addEventListener('click', (e) => {
        if (!searchContainer.contains(e.target)) {
            searchDropdown.classList.remove('active');
        }
    });
    
    // Add styles for search dropdown
    const searchDropdownStyles = document.createElement('style');
    searchDropdownStyles.textContent = `
        .search-dropdown {
            position: absolute;
            top: 100%;
            left: 0;
            width: 100%;
            background-color: var(--bg-base);
            border: 1px solid var(--border);
            border-top: none;
            max-height: 400px;
            overflow-y: auto;
            z-index: 1000;
            display: none;
            box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
            border-radius: 0 0 var(--radius) var(--radius);
        }
        
        .search-dropdown.active {
            display: block;
        }
        
        .search-result {
            padding: 1rem;
            display: flex;
            gap: 1rem;
            align-items: center;
            cursor: pointer;
            transition: var(--transition);
            border-bottom: 1px solid var(--border);
        }
        
        .search-result:hover {
            background-color: var(--bg-secondary);
        }
        
        .search-result img {
            width: 50px;
            height: 50px;
            object-fit: cover;
            border-radius: var(--radius);
        }
        
        .search-result-info h4 {
            font-size: 0.95rem;
            margin-bottom: 0.3rem;
            font-weight: 500;
        }
        
        .search-result-info p {
            font-size: 0.8rem;
            color: var(--text-secondary);
        }
        
        .no-results {
            padding: 1rem;
            text-align: center;
            color: var(--text-secondary);
        }
        
        .view-all-results {
            padding: 1rem;
            text-align: center;
            color: var(--accent-primary);
            font-weight: 500;
            cursor: pointer;
            transition: var(--transition);
        }
        
        .view-all-results:hover {
            background-color: var(--bg-secondary);
        }
    `;
    document.head.appendChild(searchDropdownStyles);
});