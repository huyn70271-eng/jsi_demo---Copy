function checkLoginStatus() {
    const username = localStorage.getItem("username");
    const userId = localStorage.getItem("userId");

    // Tìm các phần tử hiển thị trên Header (dựa trên index.html của bạn)
    const userDisplay = document.querySelector('.user');
    const loginLink = document.getElementById("login-link");
    const adminLink = document.getElementById("admin-link");

    if (username) {
        // 1. Nếu đã đăng nhập: Hiển thị tên và nút Đăng xuất
        if (userDisplay) {
            userDisplay.innerHTML = `
                <span>👤 ${username}</span>
                <a href="#" id="logout-btn" style="color: #e52e2d; margin-left: 10px; font-size: 12px; text-decoration: none;">(Thoát)</a>
            `;
            
            // Xử lý sự kiện đăng xuất
            document.getElementById("logout-btn").addEventListener("click", (e) => {
                e.preventDefault();
                localStorage.clear(); // Xóa sạch bộ nhớ
                window.location.href = "index.html"; // Quay về trang chủ
            });
        }

        // 2. Ẩn nút "Đăng nhập"
        if (loginLink) loginLink.style.display = "none";

        // 3. Nếu là Admin (ID = 1), hiện nút "Quản lý"
        if (adminLink && (userId === "1" || userId === 1)) {
            adminLink.style.display = "block";
        }
    } else {
        // Nếu chưa đăng nhập, đảm bảo nút Quản lý luôn ẩn
        if (adminLink) adminLink.style.display = "none";
    }
}

// Chạy hàm ngay khi trang web tải xong
document.addEventListener("DOMContentLoaded", checkLoginStatus);