// cart.js
function parsePrice(price) {
    if (!price) return 0;
    return parseInt(price.toString().replace(/\s/g, '')) || 0;
}

let cart = [];

function loadCart() {
    const saved = localStorage.getItem('cart');
    cart = saved ? JSON.parse(saved) : [];
}

function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

function addToCart(product) {
    loadCart();
    const prodId = String(product.id);
    const existingIndex = cart.findIndex(item => String(item.id) === prodId);

    if (existingIndex > -1) {
        cart[existingIndex].quantity = (cart[existingIndex].quantity || 1) + 1;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            img: product.img,
            brand: product.brand || '',
            quantity: 1
        });
    }
    saveCart();
    updateCartCount();
    showToast(`✅ Đã thêm "${product.name}" vào giỏ hàng!`);
}

function removeFromCart(id) {
    loadCart();
    cart = cart.filter(item => String(item.id) !== String(id));
    saveCart();
    renderCart();
    updateCartCount();
}

function updateQuantity(id, delta) {
    loadCart();
    const item = cart.find(item => String(item.id) === String(id));
    if (item) {
        item.quantity = Math.max(1, (item.quantity || 1) + delta);
        saveCart();
        renderCart();
        updateCartCount();
    }
}

function getCartTotal() {
    loadCart();
    return cart.reduce((total, item) => {
        return total + parsePrice(item.price) * (item.quantity || 1);
    }, 0);
}

function renderCart() {
    const container = document.getElementById('cart-items');
    if (!container) return;

    loadCart();
    container.innerHTML = '';

    if (cart.length === 0) {
        container.innerHTML = `<p style="text-align:center;padding:40px 20px;color:#666;">Giỏ hàng của bạn đang trống.</p>`;
        document.getElementById('cart-total-price').innerText = '0 đ';
        return;
    }

    cart.forEach(item => {
        const html = `
            <div class="cart-item">
                <img src="${item.img}" alt="${item.name}">
                <div class="cart-item-info">
                    <h4>${item.name}</h4>
                    <p>${item.brand} • ${parsePrice(item.price).toLocaleString('vi-VN')} đ</p>
                </div>
                <div class="quantity-controls">
                    <button onclick="updateQuantity('${item.id}', -1)">–</button>
                    <span>${item.quantity}</span>
                    <button onclick="updateQuantity('${item.id}', 1)">+</button>
                </div>
                <div class="item-total-price">${(parsePrice(item.price) * item.quantity).toLocaleString('vi-VN')} đ</div>
                <button class="remove-item" onclick="removeFromCart('${item.id}')">&times;</button>
            </div>
        `;
        container.innerHTML += html;
    });

    document.getElementById('cart-total-price').innerText = 
        getCartTotal().toLocaleString('vi-VN') + ' đ';
}

function updateCartCount() {
    loadCart();
    const totalItems = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
    const countEl = document.getElementById('cart-count');
    if (countEl) {
        countEl.textContent = totalItems;
        countEl.style.display = totalItems > 0 ? 'inline' : 'none';
    }
}

function showCartModal() {
    const modal = document.getElementById('cart-modal');
    if (modal) {
        renderCart();
        modal.style.display = 'flex';
    }
}

function hideCartModal() {
    const modal = document.getElementById('cart-modal');
    if (modal) modal.style.display = 'none';
}

function showToast(message) {
    const toast = document.createElement('div');
    toast.style.cssText = `position:fixed; bottom:20px; left:50%; transform:translateX(-50%);
                           background:#e52e2d; color:white; padding:14px 24px; border-radius:30px;
                           box-shadow:0 4px 15px rgba(0,0,0,0.3); z-index:3000; white-space:nowrap;`;
    toast.textContent = message;
    document.body.appendChild(toast);
    setTimeout(() => {
        toast.style.transition = 'all 0.4s';
        toast.style.opacity = '0';
        setTimeout(() => toast.remove(), 400);
    }, 2800);
}

// Khởi tạo
document.addEventListener('DOMContentLoaded', () => {
    updateCartCount();

    // Icon giỏ hàng
    const cartIcon = document.getElementById('cart-icon');
    if (cartIcon) cartIcon.addEventListener('click', showCartModal);

    // Modal events
    const modal = document.getElementById('cart-modal');
    const closeBtn = document.querySelector('.close-modal');
    if (closeBtn) closeBtn.addEventListener('click', hideCartModal);
    if (modal) {
        modal.addEventListener('click', e => {
            if (e.target === modal) hideCartModal();
        });
    }

    const continueBtn = document.getElementById('continue-shopping');
    if (continueBtn) continueBtn.addEventListener('click', hideCartModal);

const checkoutBtn = document.getElementById('checkout-btn');
if (checkoutBtn) {
    checkoutBtn.addEventListener('click', () => {
        loadCart();
        if (cart.length > 0) {
            window.location.href = './checkout.html';   // ← chuyển sang trang checkout
        } else {
            alert('Giỏ hàng trống!');
        }
    });
}
});