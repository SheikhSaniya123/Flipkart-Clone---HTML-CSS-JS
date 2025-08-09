// Shopping Cart Functionality
document.addEventListener('DOMContentLoaded', () => {
    const cartSidebar = document.getElementById('cartSidebar');
    const cartIcon = document.querySelector('.cart-icon');
    const cartClose = document.querySelector('.cart-close');
    const cartItemsContainer = document.getElementById('cartItems');
    const cartSubtotal = document.getElementById('cartSubtotal');
    const cartCount = document.querySelector('.cart-count');
    const addToCartBtns = document.querySelectorAll('.add-to-cart-btn');
    const checkoutBtn = document.querySelector('.checkout-btn');
    const continueShoppingBtn = document.querySelector('.continue-shopping');
    
    let cart = [];
    
    // Open cart sidebar
    cartIcon.addEventListener('click', (e) => {
        e.preventDefault();
        cartSidebar.style.right = '0';
        document.body.style.overflow = 'hidden';
        document.body.classList.add('no-scroll');
    });
    
    // Close cart sidebar
    const closeCart = () => {
        cartSidebar.style.right = '-400px';
        document.body.style.overflow = 'auto';
        document.body.classList.remove('no-scroll');
    };
    
    cartClose.addEventListener('click', closeCart);
    continueShoppingBtn.addEventListener('click', closeCart);
    
    // Add to cart functionality
    addToCartBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const productCard = btn.closest('.product-card');
            const productName = productCard.querySelector('h3').textContent;
            const productPrice = productCard.querySelector('.product-price').textContent;
            const productImage = productCard.querySelector('img').src;
            
            // Check if product already in cart
            const existingItem = cart.find(item => item.name === productName);
            
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                cart.push({
                    name: productName,
                    price: productPrice,
                    image: productImage,
                    quantity: 1
                });
            }
            
            updateCart();
            
            // Animate cart icon
            cartCount.classList.add('cart-bounce');
            setTimeout(() => {
                cartCount.classList.remove('cart-bounce');
            }, 500);
            
            // Show added notification
            showNotification(`${productName} added to cart`);
        });
    });
    
    // Update cart UI
    const updateCart = () => {
        // Update cart items
        cartItemsContainer.innerHTML = '';
        
        let subtotal = 0;
        
        cart.forEach((item, index) => {
            const priceNumber = parseFloat(item.price.replace('$', '').replace(',', ''));
            subtotal += priceNumber * item.quantity;
            
            const cartItem = document.createElement('div');
            cartItem.className = 'cart-item';
            cartItem.innerHTML = `
                <div class="cart-item-image">
                    <img src="${item.image}" alt="${item.name}" loading="lazy">
                </div>
                <div class="cart-item-details">
                    <h4>${item.name}</h4>
                    <p class="cart-item-price">${item.price}</p>
                    <div class="cart-item-quantity">
                        <button class="decrease-qty" data-index="${index}">-</button>
                        <input type="number" value="${item.quantity}" min="1" class="qty-input" data-index="${index}">
                        <button class="increase-qty" data-index="${index}">+</button>
                    </div>
                    <button class="cart-item-remove" data-index="${index}">Remove</button>
                </div>
            `;
            
            cartItemsContainer.appendChild(cartItem);
        });
        
        // Update subtotal
        cartSubtotal.textContent = `$${subtotal.toFixed(2)}`;
        
        // Update cart count
        const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
        cartCount.textContent = totalItems;
        
        // Show empty state if cart is empty
        if (cart.length === 0) {
            cartItemsContainer.innerHTML = `
                <div class="empty-cart">
                    <i class="fas fa-shopping-bag"></i>
                    <p>Your cart is empty</p>
                    <a href="#new-arrivals" class="btn-outline">Shop New Arrivals</a>
                </div>
            `;
            cartSubtotal.textContent = '$0.00';
            cartCount.textContent = '0';
        }
        
        // Add event listeners to quantity controls
        document.querySelectorAll('.decrease-qty').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const index = e.target.getAttribute('data-index');
                if (cart[index].quantity > 1) {
                    cart[index].quantity -= 1;
                    updateCart();
                }
            });
        });
        
        document.querySelectorAll('.increase-qty').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const index = e.target.getAttribute('data-index');
                cart[index].quantity += 1;
                updateCart();
            });
        });
        
        document.querySelectorAll('.qty-input').forEach(input => {
            input.addEventListener('change', (e) => {
                const index = e.target.getAttribute('data-index');
                const newQty = parseInt(e.target.value);
                
                if (newQty >= 1) {
                    cart[index].quantity = newQty;
                    updateCart();
                } else {
                    e.target.value = cart[index].quantity;
                }
            });
        });
        
        document.querySelectorAll('.cart-item-remove').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const index = e.target.getAttribute('data-index');
                const removedItem = cart[index].name;
                cart.splice(index, 1);
                updateCart();
                showNotification(`${removedItem} removed from cart`);
            });
        });
    };
    
    // Checkout button
    checkoutBtn.addEventListener('click', (e) => {
        e.preventDefault();
        if (cart.length === 0) {
            showNotification('Your cart is empty', 'error');
            return;
        }
        
        // In a real app, this would redirect to checkout
        showLoading();
        console.log('Proceeding to checkout with:', cart);
        
        // Simulate checkout process
        setTimeout(() => {
            hideLoading();
            showNotification('Checkout completed successfully!', 'success');
            cart = [];
            updateCart();
            closeCart();
        }, 2000);
    });
    
    // Show notification
    function showNotification(message, type = 'success') {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.innerHTML = `
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
            <span>${message}</span>
        `;
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.classList.add('show');
        }, 10);
        
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }
    
    // Close cart when clicking outside
    document.addEventListener('click', (e) => {
        if (!cartSidebar.contains(e.target) && e.target !== cartIcon && !cartIcon.contains(e.target)) {
            closeCart();
        }
    });
    
    // Close cart when pressing Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && cartSidebar.style.right === '0px') {
            closeCart();
        }
    });
    
    // Initialize empty cart
    updateCart();
    
    // Add styles for notifications
    const notificationStyles = document.createElement('style');
    notificationStyles.textContent = `
        .notification {
            position: fixed;
            bottom: 20px;
            right: 20px;
            background-color: var(--bg-base);
            color: var(--text-primary);
            padding: 1rem 1.5rem;
            border-radius: var(--radius);
            display: flex;
            align-items: center;
            gap: 0.5rem;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
            transform: translateX(100%);
            opacity: 0;
            transition: all 0.3s ease;
            z-index: 3000;
            border-left: 4px solid var(--accent-primary);
        }
        
        .notification.success {
            border-left-color: var(--accent-primary);
        }
        
        .notification.error {
            border-left-color: var(--error);
        }
        
        .notification.show {
            transform: translateX(0);
            opacity: 1;
        }
        
        .notification i {
            font-size: 1.2rem;
        }
        
        .notification.success i {
            color: var(--accent-primary);
        }
        
        .notification.error i {
            color: var(--error);
        }
    `;
    document.head.appendChild(notificationStyles);
});