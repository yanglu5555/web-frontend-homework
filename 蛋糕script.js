
// 全部商品数据（和首页统一，新增蛋挞、瑞士卷）
const products = [
  { name: "草莓奶油蛋糕", content: "配料：低筋面粉、鸡蛋、淡奶油、新鲜草莓、白砂糖、牛奶、黄油", price: 68, img: "./img/草莓奶油蛋糕.png" },
  { name: "巧克力慕斯", content: "配料：黑巧克力、淡奶油、鸡蛋、白砂糖、可可粉、牛奶、吉利丁", price: 58, img: "./img/巧克力慕斯.png" },
  { name: "蜂蜜奶茶", content: "配料：红茶、纯牛奶、蜂蜜、冰糖", price: 18, img: "./img/蜂蜜奶茶.png" },
  { name: "芒果千层蛋糕", content: "配料：千层皮、淡奶油、新鲜芒果、白砂糖、牛奶", price: 78, img: "./img/芒果千层蛋糕.png" },
  { name: "芋泥爆浆蛋糕", content: "配料：芋头、淡奶油、鸡蛋、面粉、牛奶、黄油、白砂糖", price: 72, img: "./img/芋泥爆浆蛋糕.png" },
  { name: "杨枝甘露", content: "配料：西柚、芒果、椰奶、西米、冰糖", price: 22, img: "./img/杨枝甘露.png" },
  { name: "手工蛋挞", content: "配料：蛋挞皮、鸡蛋、牛奶、淡奶油、白砂糖", price: 8, img: "./img/蛋挞.png" },
  { name: "抹茶瑞士卷", content: "配料：抹茶粉、低筋面粉、鸡蛋、淡奶油、白砂糖、牛奶", price: 28, img: "./img/瑞士卷.png" }
];

let cart = [];

// 配料弹窗
function showDetail(index) {
  document.getElementById("modalTitle").innerText = products[index].name;
  document.getElementById("modalContent").innerText = products[index].content;
  document.getElementById("modal").style.display = "flex";
}
function closeModal() {
  document.getElementById("modal").style.display = "none";
}

// 购物车
function addToCart(id) {
  const existing = cart.find(item => item.id === id);
  if (existing) {
    existing.count++;
  } else {
    cart.push({ id: id, count: 1 });
  }
  updateCartBadge();
  animateBadge();
  const btns = document.querySelectorAll('.cart-btn');
  const btn = btns[[...btns].findIndex((_, i) => i === [...btns].indexOf(event.target))];
  const original = btn.innerHTML;
  btn.innerHTML = "✓ 已加入";
  btn.style.background = "#5a9";
  setTimeout(() => {
    btn.innerHTML = original;
    btn.style.background = "";
  }, 800);
}

function updateCartBadge() {
  const total = cart.reduce((sum, item) => sum + item.count, 0);
  const badge = document.getElementById('cartBadge');
  badge.innerText = total;
  total > 0 ? badge.classList.add('show') : badge.classList.remove('show');
}

function animateBadge() {
  const badge = document.getElementById('cartBadge');
  badge.classList.remove('bounce');
  void badge.offsetWidth;
  badge.classList.add('bounce');
}

function openCart() {
  renderCart();
  const overlay = document.getElementById('cartOverlay');
  overlay.style.display = 'flex';
  void overlay.offsetWidth;
  overlay.classList.add('show');
  document.body.style.overflow = 'hidden';
}

function closeCart(e) {
  if (e && e.target !== e.currentTarget) return;
  const overlay = document.getElementById('cartOverlay');
  overlay.classList.remove('show');
  setTimeout(() => {
    overlay.style.display = 'none';
    document.body.style.overflow = '';
  }, 350);
}

function renderCart() {
  const body = document.getElementById('cartBody');
  const footer = document.getElementById('cartFooter');
  if (cart.length === 0) {
    body.innerHTML = `
                    <div class="cart-empty">
                        <div class="empty-icon">🍰</div>
                        <p>购物车还是空的哦~<br>快去挑选甜蜜吧</p>
                    </div>
                `;
    footer.style.display = 'none';
    return;
  }
  let html = '';
  let total = 0;
  cart.forEach(c => {
    const p = products[c.id];
    total += p.price * c.count;
    html += `
                    <div class="cart-item">
                        <img src="${p.img}" class="ci-img" alt="${p.name}">
                        <div class="ci-info">
                            <div class="ci-name">${p.name}</div>
                            <div class="ci-row">
                                <div class="ci-price"><span>¥</span>${p.price}</div>
                                <div style="display:flex;align-items:center;">
                                    <div class="qty-box">
                                        <button onclick="changeQty(${c.id}, -1)">−</button>
                                        <div class="qty-num">${c.count}</div>
                                        <button onclick="changeQty(${c.id}, 1)">+</button>
                                    </div>
                                    <button class="ci-del" onclick="removeItem(${c.id})" title="删除">🗑</button>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
  });
  body.innerHTML = html;
  document.getElementById('totalPrice').innerText = total;
  footer.style.display = 'block';
}

function changeQty(id, delta) {
  const item = cart.find(c => c.id === id);
  if (!item) return;
  item.count += delta;
  if (item.count <= 0) cart = cart.filter(c => c.id !== id);
  updateCartBadge();
  renderCart();
}

function removeItem(id) {
  cart = cart.filter(c => c.id !== id);
  updateCartBadge();
  renderCart();
}
// 账户占位
function openUser() { }

// 打开品牌弹窗
function openBrandModal() {
  document.getElementById("brandModal").style.display = "flex";
}
// 关闭品牌弹窗
function closeBrandModal() {
  document.getElementById("brandModal").style.display = "none";
}
