// 🛍️ Sotots-এর সব পণ্য (নতুন পণ্য সহ)
const products = [
  { id: 1, name: "স্মার্ট ওয়াচ", price: 1200, category: "Electronics", image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300" },
  { id: 2, name: "ওয়ারলেস হেডফোন", price: 1500, category: "Electronics", image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300" },
  { id: 3, name: "ক্যাজুয়াল টি-শার্ট", price: 450, category: "Fashion", image: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=300" },
  { id: 4, name: "লেদার ওয়ালেট", price: 650, category: "Fashion", image: "https://images.unsplash.com/photo-1627123424574-724758594e93?w=300" },
  { id: 5, name: "পোল্যান্ড ব্যাকপ্যাক", price: 1850, category: "Fashion", image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=300" },
  { id: 6, name: "স্পোর্টস শু (Sneakers)", price: 2200, category: "Fashion", image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300" },
  { id: 7, name: "স্মার্ট ব্লুটুথ স্পিকার", price: 990, category: "Electronics", image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=300" },
  { id: 8, name: "প্রিমিয়াম সানগ্লাস", price: 750, category: "Fashion", image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=300" }
];

let cart = [];

// 🛍️ Render Products
function renderProducts(items) {
  const grid = document.getElementById('productGrid');
  grid.innerHTML = '';
  
  items.forEach(product => {
    grid.innerHTML += `
      <div class="product-card">
        <img src="${product.image}" alt="${product.name}">
        <h4>${product.name}</h4>
        <p class="price">৳${product.price}</p>
        <button class="btn-add-cart" onclick="addToCart(${product.id})">🛒 Add to Cart</button>
      </div>
    `;
  });
}

// 🛒 Add to Cart
function addToCart(id) {
  const product = products.find(p => p.id === id);
  const existing = cart.find(item => item.id === id);

  if (existing) {
    existing.qty++;
  } else {
    cart.push({ ...product, qty: 1 });
  }

  updateCartUI();
}

// 💰 Update Cart & Total
function updateCartUI() {
  const cartItems = document.getElementById('cartItems');
  const cartCount = document.getElementById('cartCount');
  const cartTotal = document.getElementById('cartTotal');

  cartCount.innerText = cart.reduce((acc, item) => acc + item.qty, 0);

  if (cart.length === 0) {
    cartItems.innerHTML = '<p class="empty-msg">কার্ট খালি আছে</p>';
    cartTotal.innerText = '৳0';
    return;
  }

  cartItems.innerHTML = '';
  let total = 0;

  cart.forEach(item => {
    total += item.price * item.qty;
    cartItems.innerHTML += `
      <div class="cart-item">
        <div>
          <strong>${item.name}</strong><br>
          <small>৳${item.price} x ${item.qty}</small>
        </div>
        <div>৳${item.price * item.qty}</div>
      </div>
    `;
  });

  cartTotal.innerText = `৳${total}`;
}

// 🔍 Search Filter
function filterProducts() {
  const text = document.getElementById('searchInput').value.toLowerCase();
  const filtered = products.filter(p => p.name.toLowerCase().includes(text));
  renderProducts(filtered);
}

// 🏷️ Category Filter
function filterCategory(cat) {
  if (cat === 'All') {
    renderProducts(products);
  } else {
    const filtered = products.filter(p => p.category === cat);
    renderProducts(filtered);
  }
}

function toggleCart() {
  document.getElementById('cartDrawer').classList.toggle('open');
}

// 📦 Checkout Action Modal Control
function openCheckout() {
  if (cart.length === 0) {
    alert("আপনার কার্ট খালি!");
  } else {
    document.getElementById('orderModal').style.display = 'flex';
  }
}

function closeOrderModal() {
  document.getElementById('orderModal').style.display = 'none';
}

// 📱 Send Order Details to WhatsApp
function sendToWhatsApp(e) {
  e.preventDefault();
  
  // 🔴 এখানে আপনার হোয়াটসঅ্যাপ নম্বর লিখুন (যেমন: 8801700000000)
  const myWhatsAppNumber = "8801700000000"; 

  const name = document.getElementById('custName').value;
  const phone = document.getElementById('custPhone').value;
  const address = document.getElementById('custAddress').value;

  let orderList = "";
  let total = 0;

  cart.forEach((item, index) => {
    orderList += `${index + 1}. ${item.name} - ${item.qty}টি (৳${item.price * item.qty})\n`;
    total += item.price * item.qty;
  });

  // WhatsApp মেসেজ ফরম্যাট
  const message = `🛍️ *Sotots.com - নতুন অর্ডার!*\n\n` +
                  `*গ্রাহকের তথ্য:*\n` +
                  `👤 নাম: ${name}\n` +
                  `📞 ফোন: ${phone}\n` +
                  `🏠 ঠিকানা: ${address}\n\n` +
                  `*পণ্যের তালিকা:*\n${orderList}\n` +
                  `💰 *সর্বমোট মূল্য:* ৳${total}`;

  const encodedMessage = encodeURIComponent(message);
  const whatsappURL = `https://wa.me/${myWhatsAppNumber}?text=${encodedMessage}`;

  window.open(whatsappURL, '_blank');

  // কার্ট ক্লিয়ার করে ক্লোজ করা
  cart = [];
  updateCartUI();
  closeOrderModal();
  toggleCart();
}

// 👤 Login Modal Controls
function openLoginModal() { document.getElementById('loginModal').style.display = 'flex'; }
function closeLoginModal() { document.getElementById('loginModal').style.display = 'none'; }
function handleLogin(e) {
  e.preventDefault();
  alert("সফলভাবে লগইন হয়েছে!");
  closeLoginModal();
}

// Initial Load
renderProducts(products);