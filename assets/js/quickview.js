// Quick View Functionality for 40 items

document.addEventListener('DOMContentLoaded', () => {
    const quickViewBtns = document.querySelectorAll('.quick-view-btn');
    const quickViewModal = document.getElementById('quickViewModal');
    const modalClose = document.querySelector('.modal-close');
    const modalOverlay = document.querySelector('.modal-overlay');

    const products = {};
    for (let i = 1; i <= 40; i++) {
        products[i] = {
            name: `Product ${i}`,
            price: `$${(i * 100).toFixed(2)}`,
            description: `This is a sample description for product ${i}. Customize this with your actual product details.`,
            image: `images/products/sample${i}.jpg`,
            thumbnails: [
                `images/products/sample${i}.jpg`,
                `images/products/sample${i}-alt1.jpg`,
                `images/products/sample${i}-alt2.jpg`
            ],
            specs: [
                `Dimensions: ${30 + i}" x ${40 + i}" x ${20 + i}"`,
                `Weight: ${5 + i} lbs`,
                "Material: Premium quality",
                "Assembly: Required",
                "Warranty: 1 year",
                "Made in Country"
            ]
        };
    }

    quickViewBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const productId = btn.getAttribute('data-id');
            const product = products[productId];

            if (!product) {
                alert("Product not found.");
                return;
            }

            document.getElementById('modalProductName').textContent = product.name;
            document.getElementById('modalProductPrice').textContent = product.price;
            document.getElementById('modalProductDescription').textContent = product.description;

            const mainImage = document.getElementById('modalProductImage');
            mainImage.src = product.image;
            mainImage.alt = product.name;

            const thumbnailsContainer = document.querySelector('.modal-thumbnails');
            thumbnailsContainer.innerHTML = '';

            product.thumbnails.forEach((thumb, index) => {
                const thumbnail = document.createElement('img');
                thumbnail.src = thumb;
                thumbnail.alt = `${product.name} - View ${index + 1}`;
                thumbnail.className = 'thumbnail';
                if (index === 0) thumbnail.classList.add('active');

                thumbnail.addEventListener('click', () => {
                    mainImage.src = thumb;
                    document.querySelectorAll('.thumbnail').forEach(t => t.classList.remove('active'));
                    thumbnail.classList.add('active');
                });

                thumbnailsContainer.appendChild(thumbnail);
            });

            const specsList = document.getElementById('modalProductSpecs');
            specsList.innerHTML = '';
            product.specs.forEach(spec => {
                const li = document.createElement('li');
                li.textContent = spec;
                specsList.appendChild(li);
            });

            quickViewModal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
            document.body.classList.add('no-scroll');
        });
    });

    const closeModal = () => {
        quickViewModal.style.display = 'none';
        document.body.style.overflow = 'auto';
        document.body.classList.remove('no-scroll');
    };

    modalClose.addEventListener('click', closeModal);
    modalOverlay.addEventListener('click', closeModal);

    // Quantity selector
    const minusBtn = document.querySelector('.quantity-btn.minus');
    const plusBtn = document.querySelector('.quantity-btn.plus');
    const quantityInput = document.querySelector('.quantity-input');

    minusBtn.addEventListener('click', () => {
        let value = parseInt(quantityInput.value);
        if (value > 1) quantityInput.value = value - 1;
    });

    plusBtn.addEventListener('click', () => {
        let value = parseInt(quantityInput.value);
        quantityInput.value = value + 1;
    });

    quantityInput.addEventListener('input', () => {
        quantityInput.value = quantityInput.value.replace(/[^0-9]/g, '');
        if (quantityInput.value === '' || parseInt(quantityInput.value) < 1) {
            quantityInput.value = '1';
        }
    });

    const colorOptions = document.querySelectorAll('.color-option');
    colorOptions.forEach(option => {
        option.addEventListener('click', () => {
            colorOptions.forEach(opt => opt.classList.remove('active'));
            option.classList.add('active');
            console.log(`Selected color: ${option.getAttribute('data-color')}`);
        });
    });

    document.querySelector('.add-to-cart-modal').addEventListener('click', () => {
        const productName = document.getElementById('modalProductName').textContent;
        const quantity = parseInt(quantityInput.value);
        const selectedColor = document.querySelector('.color-option.active')?.getAttribute('data-color') || 'Default';

        console.log(`Added ${quantity} ${productName} in ${selectedColor} to cart`);

        const addToCartBtn = document.querySelector('.add-to-cart-modal');
        const originalText = addToCartBtn.innerHTML;
        addToCartBtn.innerHTML = '<i class="fas fa-check"></i> Added to Cart';
        addToCartBtn.style.backgroundColor = 'var(--accent-primary)';

        setTimeout(() => {
            addToCartBtn.innerHTML = originalText;
            addToCartBtn.style.backgroundColor = 'var(--cta)';
        }, 2000);
    });

    const modalWishlistBtn = document.querySelector('.modal-details .wishlist-btn');
    modalWishlistBtn.addEventListener('click', function () {
        this.classList.toggle('active');
        this.innerHTML = this.classList.contains('active') ?
            '<i class="fas fa-heart"></i>' :
            '<i class="far fa-heart"></i>';

        const productName = document.getElementById('modalProductName').textContent;
        const action = this.classList.contains('active') ? 'Added' : 'Removed';
        console.log(`${action} ${productName} to wishlist`);
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && quickViewModal.style.display === 'flex') {
            closeModal();
        }
    });
});
