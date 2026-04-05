const userId = localStorage.getItem("userId");
if (userId !== "1" && userId !== 1) {
    alert("Bạn không có quyền truy cập trang này!");
    window.location.href = "index.html";
}
const API_URL = 'https://692ba4eec829d464006d5216.mockapi.io/guitar/guitar';

const tableBody = document.getElementById('tableBody');
const guitarForm = document.getElementById('GuiForm');
const btnAdd = document.getElementById('btnAdd');
const btnUpdate = document.getElementById('btnUpdate');

const guitarIdInput = document.getElementById('GuiId');
const guitarNameInput = document.getElementById('GuiName');
const guitarImgInput = document.getElementById('GuiImg');
const guitarBrandInput = document.getElementById('GuiBrand');
const guitarPriceInput = document.getElementById('GuiPri');

// R - READ
function fetchGuitars() {
    fetch(API_URL)
        .then(res => res.json())
        .then(data => {
            tableBody.innerHTML = '';
            data.forEach(g => {
                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td>
                        <div style="display:flex; align-items:center; gap:12px">
                            <img src="${g.img}" class="preview">
                            <b>${g.name}</b>
                        </div>
                    </td>
                    <td>${g.brand}</td>
                    <td>${g.type}</td>
                    <td>${g.price} </td>
                    <td>
                        <div class="actions" style="justify-content: center;">
                            <button class="btn-edit" onclick="editGuitar('${g.id}')">Sửa</button>
                            <button class="btn-delete" onclick="deleteGuitar('${g.id}')">Xoá</button>
                        </div>
                    </td>
                `;
                tableBody.appendChild(tr);
            });
        });
}

// C - CREATE
guitarForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const newGuitar = {
        name: guitarNameInput.value,
        img: guitarImgInput.value,
        brand: guitarBrandInput.value,
        price: guitarPriceInput.value
    };

    fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newGuitar)
    }).then(() => {
        alert("Đã thêm thành công!");
        guitarForm.reset();
        fetchGuitars();
    });
});

// D - DELETE
function deleteGuitar(id) {
    if (confirm("Bạn có chắc muốn xóa không?")) {
        fetch(`${API_URL}/${id}`, { method: 'DELETE' })
            .then(() => fetchGuitars());
    }
}

// U - UPDATE (Step 1: Fill form)
function editGuitar(id) {
    fetch(`${API_URL}/${id}`)
        .then(res => res.json())
        .then(data => {
            guitarIdInput.value = data.id;
            guitarNameInput.value = data.name;
            guitarImgInput.value = data.img;
            guitarBrandInput.value = data.brand;
            guitarPriceInput.value = data.price;

            btnAdd.style.display = 'none';
            btnUpdate.style.display = 'inline-block';
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
}

// U - UPDATE (Step 2: Submit change)
btnUpdate.addEventListener('click', function () {
    const id = guitarIdInput.value;
    const updatedGuitar = {
        name: guitarNameInput.value,
        img: guitarImgInput.value,
        brand: guitarBrandInput.value,
        price: guitarPriceInput.value
    };

    fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedGuitar) // Đã sửa từ updatedPokemon thành updatedGuitar
    }).then(() => {
        alert("Cập nhật thành công!");
        guitarForm.reset();
        btnAdd.style.display = 'inline-block';
        btnUpdate.style.display = 'none';
        fetchGuitars();
    });
});

fetchGuitars();
