// Biến toàn cục để lưu trữ danh sách sản phẩm ban đầu
let allGuitars = [];
const listContainer = document.getElementById('guitar-list');

// Hàm hiển thị danh sách sản phẩm
function renderGuitars(guitarsToRender) {
    // Xóa trắng danh sách cũ trước khi render mới
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

            <div class="types-container">
                <span class="type-badge">${g.type}</span>
            </div>

            <div class="stats-row">
                <div class="stat-item">
                    <span class="stat-value">${g.price} đ</span>
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

// 1. FETCH DATA TỪ API
fetch('https://692ba4eec829d464006d5216.mockapi.io/guitar/guitar')
    .then(response => response.json())
    .then(data => {
        allGuitars = data; // Lưu lại dữ liệu gốc
        renderGuitars(allGuitars); // Hiển thị toàn bộ khi tải trang
    })
    .catch(error => {
        console.error("Có lỗi xảy ra khi tải dữ liệu:", error);
        listContainer.innerHTML = '<p>Lỗi tải dữ liệu. Vui lòng thử lại sau.</p>';
    });

// 2. CHỨC NĂNG LỌC QUA NAVBAR
const navLinks = document.querySelectorAll('.nav-list a');

navLinks.forEach(link => {
    link.addEventListener('click', (event) => {
        // Bỏ qua nếu là link đăng nhập
        if (link.getAttribute('href') === './login.html') return;
        
        event.preventDefault(); // Chặn hành vi nhảy trang của thẻ a

        // Xóa class 'active' ở tất cả thẻ a, thêm vào thẻ vừa click
        navLinks.forEach(nav => nav.classList.remove('active'));
        link.classList.add('active');

        // Lấy keyword để lọc từ thuộc tính data-type
        const filterType = link.getAttribute('data-type');

        if (filterType === 'all') {
            // Nếu chọn Trang chủ thì hiển thị hết
            renderGuitars(allGuitars);
        } else {
            // Lọc ra các guitar có chứa từ khóa (không phân biệt chữ hoa/thường)
            const filteredData = allGuitars.filter(g => 
                g.type && g.type.toLowerCase().includes(filterType.toLowerCase())
            );
            renderGuitars(filteredData);
        }
        // Nếu ID là 1 thì mới hiển thị mục Quản lý
if (userId === "1") {
    adminLink.style.display = "block";
}
    });
});

const userId = localStorage.getItem("userId");
const adminLink = document.getElementById("admin-link");




