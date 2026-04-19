// Load giỏ hàng và hiển thị tóm tắt
function loadOrderSummary() {
    loadCart(); // từ cart.js
    const container = document.getElementById('order-items');
    container.innerHTML = '';

    if (cart.length === 0) {
        container.innerHTML = '<p>Giỏ hàng trống. <a href="index.html">Quay về cửa hàng</a></p>';
        return;
    }

    let subtotal = 0;

    cart.forEach(item => {
        const price = parsePrice(item.price);
        const itemTotal = price * (item.quantity || 1);
        subtotal += itemTotal;

        const html = `
            <div class="order-item">
                <img src="${item.img}" alt="${item.name}">
                <div style="flex:1">
                    <h4 style="margin:0 0 4px 0;">${item.name}</h4>
                    <p style="margin:0; color:#666; font-size:0.95rem;">${item.quantity} × ${price.toLocaleString('vi-VN')} đ</p>
                </div>
                <div style="text-align:right; font-weight:bold;">${itemTotal.toLocaleString('vi-VN')} đ</div>
            </div>`;
        container.innerHTML += html;
    });

    document.getElementById('subtotal').textContent = subtotal.toLocaleString('vi-VN') + ' đ';
    document.getElementById('shipping-fee').textContent = '0 đ'; // có thể thay đổi theo radio
    document.getElementById('grand-total').textContent = subtotal.toLocaleString('vi-VN') + ' đ';
}

// Hoàn tất đơn hàng (demo)
function completeOrder() {
    loadCart();
    if (cart.length === 0) return alert('Giỏ hàng trống!');

    const fullname = document.getElementById('fullname').value.trim();
    const phone = document.getElementById('phone').value.trim();

    if (!fullname || !phone) {
        return alert('Vui lòng nhập đầy đủ Họ tên và Số điện thoại!');
    }

    // Xóa giỏ hàng
    cart = [];
    saveCart();
    updateCartCount();

    // Thông báo thành công
    alert(`🎉 Cảm ơn bạn ${fullname}!\n\nĐơn hàng của bạn đã được xác nhận.\nMã đơn: GX-${Date.now().toString().slice(-8)}\n\nChúng tôi sẽ liên hệ trong 5-10 phút.`);

    // Chuyển về trang chủ
    setTimeout(() => {
        window.location.href = 'index.html';
    }, 800);
}

// Khởi chạy
document.addEventListener('DOMContentLoaded', loadOrderSummary);