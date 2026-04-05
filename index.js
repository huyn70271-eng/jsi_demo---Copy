<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Cửa Hàng Nhạc Cụ - GUITARX</title>
    <link rel="stylesheet" href="./index.css">
</head>
<body>

    <header class="header">
        <div class="header-top">
            <div class="logo">
                <h2>GUITARX</h2>
            </div>
            
            <div class="search-bar">
                <input type="text" id="search-input" placeholder="Tìm kiếm sản phẩm">
                <button type="button" id="search-btn">Tìm kiếm</button>
            </div>

            <div class="header-contact">
                <span class="hotline">Hotline: <strong>0839 2010 09</strong></span>
                <span class="cart">🛒 Giỏ hàng</span>
                <span class="user">👤 <br name="user-name"></span>
            </div>
        </div>

        <nav class="navbar">
            <ul class="nav-list">
                <li><a href="#home" class="active" data-type="all">Trang chủ</a></li>
                <li><a href="#AGui" data-type="Acoustic">Acoustic Guitar</a></li>
                <li><a href="#CGui" data-type="Classic">Classical Guitar</a></li>
                <li><a href="#BGui" data-type="Electric">Electric Guitar</a></li>
                <li><a href="#Acc" data-type="Accessory">Phụ kiện</a></li>
                <li id="login-link"><a href="./login.html">Đăng nhập</a></li>
                <li id="admin-link" style="display: none;"><a href="./admin.html">Quản lý</a></li>
            </ul>
        </nav>
    </header>       

    <main class="main-content">
        <div id="guitar-list"></div>
    </main>

    <script src="./index.js"></script>
    <script src="./auth.js"></script>
    <script src="./index.js"></script>
</body>
</html>
