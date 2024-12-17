// รายการสินค้าตัวอย่าง
const productList = [
    "Product A",
    "Product B",
    "Product C",
    "Product D",
    "Product E"
];

let products = []; // เก็บรายการสินค้าที่เพิ่มเข้ามา

const form = document.getElementById('product-form');
const tableBody = document.querySelector('#product-table tbody');
const exportBtn = document.getElementById('export-btn');

// เพิ่ม datalist ของสินค้า
function populateProductSuggestions(productsList) {
    const suggestionsList = document.getElementById('product-suggestions');
    suggestionsList.innerHTML = '';
    productsList.forEach(product => {
        const option = document.createElement('option');
        option.value = product;
        suggestionsList.appendChild(option);
    });
}

// แสดงข้อมูลในตาราง
function renderTable() {
    tableBody.innerHTML = '';
    products.forEach((product, index) => {
        const row = `
            <tr>
                <td>${index + 1}</td>
                <td>${product.name}</td>
                <td>${product.quantity}</td>
                <td>${product.unit}</td>
                <td>
                    <button onclick="removeProduct(${index})">ลบ</button>
                </td>
            </tr>
        `;
        tableBody.insertAdjacentHTML('beforeend', row);
    });
}

// ลบสินค้าจากตาราง
function removeProduct(index) {
    products.splice(index, 1); // ลบรายการตาม index
    renderTable(); // แสดงตารางใหม่
}

// เพิ่มข้อมูลสินค้า
form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('product-name').value;
    const quantity = document.getElementById('product-quantity').value;
    const unit = document.getElementById('product-unit').value;

    const product = { name, quantity, unit };
    products.push(product); // เพิ่มสินค้าในรายการ
    renderTable(); // แสดงรายการในตาราง

    form.reset(); // รีเซ็ตฟอร์ม
});

// Export ข้อมูลเป็น CSV
exportBtn.addEventListener('click', () => {
    const csvContent = "data:text/csv;charset=utf-8," + 
        ["ลำดับ,ชื่อสินค้า,จำนวน,หน่วย"]
            .concat(products.map((product, index) => 
                `${index + 1},${product.name},${product.quantity},${product.unit}`))
            .join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "products.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
});

// เรียกใช้ฟังก์ชันเพื่อเพิ่มสินค้าใน datalist
populateProductSuggestions(productList);

