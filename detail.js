const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');

if (id) {
    fetch(`https://692ba4eec829d464006d5216.mockapi.io/guitar/guitar/${id}`)
        .then(response => response.json())
        .then(data => {
            // Breadcrumb
            document.getElementById('bread-type').innerText = data.type;
            document.getElementById('bread-name').innerText = data.name;

            const container = document.getElementById('product-content');
            container.innerHTML = `
                <div class="product-image">
                    <img src="${data.img}" alt="${data.name}">
                </div>

                <div class="product-info">
                    <h1>${data.name}</h1>
                    
                    <div class="product-meta">
                        <span>Thương hiệu: <strong>${data.brand}</strong></span>
                        <span>Mã sản phẩm: <strong>GUI-${data.id}</strong></span>
                        <span>Tình trạng: <strong>Còn hàng</strong></span>
                    </div>

                    <div class="price-box">
                        <div class="current-price">${parsePrice(data.price).toLocaleString('vi-VN')} đ</div>
                    </div>

                    <div class="product-desc-short">
                        <p><i class="fas fa-check-circle"></i> Sản phẩm chính hãng 100%.</p>
                        <p><i class="fas fa-truck"></i> Giao hàng miễn phí trong nội thành.</p>
                        <p><i class="fas fa-shield-alt"></i> Bảo hành chính hãng 12 tháng.</p>
                        <p>Đây là dòng đàn ${data.type} chất lượng cao từ ${data.brand}, phù hợp cho cả người mới bắt đầu và người chơi chuyên nghiệp.</p>
                    </div>

                    <div class="action-btns">
                        <button class="btn btn-buy">MUA NGAY</button>
                        <button class="btn btn-cart">THÊM GIỎ HÀNG</button>
                    </div>
                </div>
            `;

            // === THÊM SỰ KIỆN GIỎ HÀNG ===
            const buyBtn = container.querySelector('.btn-buy');
            const addCartBtn = container.querySelector('.btn-cart');

            if (buyBtn) {
                buyBtn.addEventListener('click', () => {
                    addToCart(data);
                    showCartModal();           // mở modal giỏ hàng
                });
            }

            if (addCartBtn) {
                addCartBtn.addEventListener('click', () => {
                    addToCart(data);
                });
            }
        })
        .catch(error => {
            console.error('Error:', error);
            document.getElementById('product-content').innerHTML = '<h2>Không thể tải thông tin sản phẩm.</h2>';
        });
}

// Helper parsePrice (để hiển thị giá trên detail)
function parsePrice(price) {
    if (!price) return 0;
    return parseInt(price.toString().replace(/\s/g, '')) || 0;
}
