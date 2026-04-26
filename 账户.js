// 控制开关与切换的逻辑
function openUser() {
  const overlay = document.getElementById('userOverlay');
  const panel = document.getElementById('userPanel');
  if (!overlay || !panel) return;

  overlay.style.display = 'block';
  setTimeout(() => {
    panel.style.transform = 'translateX(0)';
  }, 10);
}

function closeUser() {
  const panel = document.getElementById('userPanel');
  panel.style.transform = 'translateX(-100%)';
  setTimeout(() => {
    document.getElementById('userOverlay').style.display = 'none';
  }, 400);
}

function toggleAuth(mode) {
  const isReg = mode === 'reg';
  document.getElementById('loginBox').style.display = isReg ? 'none' : 'block';
  document.getElementById('regBox').style.display = isReg ? 'block' : 'none';
  document.getElementById('authTitle').innerText = isReg ? '新会员注册' : '会员登录';
}

// 自动加载 HTML 结构的函数 (核心)
async function loadAccountComponent() {
  try {
    const response = await fetch('账户.html');
    const html = await response.text();
    document.body.insertAdjacentHTML('beforeend', html);
  } catch (err) {
    console.error('加载账户组件失败:', err);
  }
}

// 页面加载完成后自动载入 HTML 结构
window.addEventListener('DOMContentLoaded', loadAccountComponent);