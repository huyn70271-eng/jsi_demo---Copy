// ==================== HELPER PARSE GIÁ ====================
function parsePrice(price) {
    if (!price) return 0;
    // Loại bỏ tất cả khoảng trắng và chuyển thành số
    return parseInt(price.toString().replace(/\s/g, '')) || 0;
}


// Biến toàn cục
let allGuitars = [];
const listContainer = document.getElementById('guitar-list');

// Render danh sách
function renderGuitars(guitarsToRender) {
    listContainer.innerHTML = '';

    if (guitarsToRender.length === 0) {
        listContainer.innerHTML = '<p style="text-align:center; width:100%; color:#555;">Không tìm thấy sản phẩm nào.</p>';
        return;
    }

    guitarsToRender.forEach(g => {
        const card = document.createElement('div');
        card.className = 'glass-card';
        card.innerHTML = `
            <div class="image-container">
                <div class="blob"></div>
                <img src="${g.img}" alt="${g.name}" class="guitar-sprite">
            </div>
            <h1 class="guitar-name">${g.name}</h1>

            <div class="stats-row">
                <div class="stat-item">
                    <span class="stat-value">${parsePrice(g.price).toLocaleString('vi-VN')} đ</span>
                    <span class="stat-label">Giá</span>
                </div>
                <div class="stat-item">
                    <span class="stat-value">${g.brand}</span>
                    <span class="stat-label">Hãng</span>
                </div>
            </div>
            <div class="card-footer">
                <a href="detail.html?id=${g.id}" class="detail-btn">Xem chi tiết</a>
            </div>
        `;
        listContainer.appendChild(card);
    });
}

// Fetch dữ liệu
fetch('https://692ba4eec829d464006d5216.mockapi.io/guitar/guitar')
    .then(response => response.json())
    .then(data => {
        allGuitars = data;
        populateBrands(data);
        renderGuitars(allGuitars);
    })
    .catch(error => {
        console.error("Có lỗi xảy ra khi tải dữ liệu:", error);
        listContainer.innerHTML = '<p>Lỗi tải dữ liệu. Vui lòng thử lại sau.</p>';
    });

// Populate hãng động
function populateBrands(data) {
    const brands = [...new Set(data.map(item => item.brand).filter(Boolean))];
    const filterBrand = document.getElementById('filter-brand');
    filterBrand.innerHTML = '<option value="all">Tất cả hãng</option>';
    brands.forEach(brand => {
        const option = document.createElement('option');
        option.value = brand;
        option.textContent = brand;
        filterBrand.appendChild(option);
    });
}

// Hàm lọc tổng hợp
function applyAllFilters() {
    let filtered = allGuitars;

    // Lọc theo Navbar
    const activeNav = document.querySelector('.nav-list a.active');
    if (activeNav) {
        const type = activeNav.getAttribute('data-type');
        if (type !== 'all') {
            filtered = filtered.filter(g => 
                g.type && g.type.toLowerCase().includes(type.toLowerCase())
            );
        }
    }

 // Lọc theo sidebar (giữ nguyên code cũ của bạn)
const brandVal = document.getElementById('filter-brand').value;
if (brandVal !== 'all') filtered = filtered.filter(g => g.brand === brandVal);

const priceVal = document.getElementById('filter-price').value;
if (priceVal !== 'all') {
    filtered = filtered.filter(g => {
        const price = parsePrice(g.price);
        
        if (priceVal === 'under2') return price < 2000000;
        if (priceVal === '2to5') return price >= 2000000 && price <= 5000000;
        if (priceVal === 'over5') return price > 5000000;
        return true;
    });
}

    let originVal = 'all';
    document.querySelectorAll('input[name="origin"]').forEach(radio => {
        if (radio.checked) originVal = radio.value;
    });
    if (originVal !== 'all') {
        const vietnameseBrands = ['ba đờn', 'thuận', 'điệp', 'việt', 'badon'];
        filtered = filtered.filter(g => {
            const isViet = vietnameseBrands.some(vb => g.brand && g.brand.toLowerCase().includes(vb));
            return originVal === 'vietnam' ? isViet : !isViet;
        });
    }

    // Tìm kiếm
    const keyword = document.getElementById('search-input').value.trim().toLowerCase();
    if (keyword) {
        filtered = filtered.filter(g => 
            (g.name && g.name.toLowerCase().includes(keyword)) || 
            (g.brand && g.brand.toLowerCase().includes(keyword))
        );
    }

    renderGuitars(filtered);
}

// Event listeners cho navbar
const navLinks = document.querySelectorAll('.nav-list a');
navLinks.forEach(link => {
    link.addEventListener('click', (event) => {
        if (link.getAttribute('href') === './login.html') return;

        event.preventDefault();
        navLinks.forEach(nav => nav.classList.remove('active'));
        link.classList.add('active');
        applyAllFilters();

        // Đóng menu mobile sau khi click
        const navMenu = document.getElementById('nav-menu');
        if (navMenu.classList.contains('active')) navMenu.classList.remove('active');
    });
});

// Event listeners cho sidebar + search
document.getElementById('filter-brand').addEventListener('change', applyAllFilters);
document.getElementById('filter-price').addEventListener('change', applyAllFilters);
document.querySelectorAll('input[name="origin"]').forEach(radio => radio.addEventListener('change', applyAllFilters));

const searchBtn = document.getElementById('search-btn');
const searchInput = document.getElementById('search-input');
searchBtn.addEventListener('click', applyAllFilters);
searchInput.addEventListener('keypress', e => {
    if (e.key === 'Enter') applyAllFilters();
});

// Hamburger menu (mobile)
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');
hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// Hiển thị link Quản lý cho admin
const userId = localStorage.getItem("userId");
const adminLink = document.getElementById("admin-link");
if (userId === "1" || userId === 1) {
    adminLink.style.display = "inline-block";
}


