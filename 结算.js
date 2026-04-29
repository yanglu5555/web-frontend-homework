document.addEventListener('DOMContentLoaded', () => {
  const cart = JSON.parse(localStorage.getItem('checkout_cart')) || [];
  const products = JSON.parse(localStorage.getItem('all_products')) || [];
  const orderList = document.getElementById('orderList');
  let total = 0;

  if (cart.length === 0) {
    orderList.innerHTML = "<p>订单已失效，请重新选择商品。</p>";
    return;
  }

  cart.forEach(item => {
    const p = products[item.id];
    total += p.price * item.count;

    const div = document.createElement('div');
    div.className = 'order-item';
    div.innerHTML = `
            <img src="${p.img}" alt="${p.name}">
            <div class="order-item-info">
                <div>${p.name}</div>
                <div style="color:#999; font-size:12px;">数量 x${item.count}</div>
            </div>
            <div style="font-weight:bold;">¥${p.price * item.count}</div>
        `;
    orderList.appendChild(div);
  });

  document.getElementById('finalTotal').innerText = total;
});

function handlePay() {
  alert("正在调用支付接口... (功能演示)");
  setTimeout(() => {
    alert("🎉 支付成功！lalacake 将尽快为您派送。");
    localStorage.removeItem('checkout_cart'); // 支付成功清除购物车
    window.location.href = 'index.html'; // 假设你的主页是 index.html
  }, 1000);
}