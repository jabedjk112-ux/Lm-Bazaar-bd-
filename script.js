const products = [
  { id: 1, name: "মোবাইল কভার", price: 150, img: "https://via.placeholder.com/150?text=Cover" },
  { id: 2, name: "হেডফোন", price: 450, img: "https://via.placeholder.com/150?text=Headphone" },
  { id: 3, name: "স্মার্ট ঘড়ি", price: 1200, img: "https://via.placeholder.com/150?text=Watch" },
  { id: 4, name: "পাওয়ার ব্যাংক", price: 850, img: "https://via.placeholder.com/150?text=PowerBank" },
  { id: 5, name: "ব্লুটুথ স্পিকার", price: 990, img: "https://via.placeholder.com/150?text=Speaker" },
  { id: 6, name: "USB কেবল", price: 120, img: "https://via.placeholder.com/150?text=Cable" }
];

let cart = [];
let orders = [];
let currentUser = null;

function renderProducts(list) {
  const container = document.getElementById("productList");
  container.innerHTML = "";
  list.forEach(p => {
    const card = document.createElement("div");
    card.className = "product-card";
    card.innerHTML = `
      <img src="${p.img}" alt="${p.name}">
      <h3>${p.name}</h3>
      <div class="price">৳${p.price}</div>
      <button onclick="addToCart(${p.id})">কার্টে যোগ করুন</button>
    `;
    container.appendChild(card);
  });
}

function addToCart(id) {
  if (!currentUser) {
    alert("দয়া করে প্রথমে লগইন করুন!");
    showLogin();
    return;
  }
  const product = products.find(p => p.id === id);
  cart.push(product);
  updateCart();
  alert(product.name + " কার্টে যোগ হয়েছে!");
}

function updateCart() {
  document.getElementById("cartCount").innerText = cart.length;
  const cartItems = document.getElementById("cartItems");
  cartItems.innerHTML = "";
  let total = 0;
  cart.forEach((item, index) => {
    total += item.price;
    const li = document.createElement("li");
    li.innerHTML = `${item.name} - ৳${item.price} <button onclick="removeFromCart(${index})" style="background:red;padding:2px 6px;font-size:12px;">X</button>`;
    cartItems.appendChild(li);
  });
  document.getElementById("cartTotal").innerText = total;
}

function removeFromCart(index) {
  cart.splice(index, 1);
  updateCart();
}

function checkout() {
  if (cart.length === 0) {
    alert("কার্ট খালি!");
    return;
  }
  const total = document.getElementById("cartTotal").innerText;
  const order = {
    id: Date.now(),
    items: [...cart],
    total: total,
    date: new Date().toLocaleString()
  };
  orders.push(order);
  alert(`অর্ডার সফল!
অর্ডার ID: ${order.id}
মোট: ৳${total}`);
  cart = [];
  updateCart();
  hideCart();
}

function showOrders() {
  if (!currentUser) {
    alert("দয়া করে লগইন করুন!");
    showLogin();
    return;
  }
  const orderList = document.getElementById("orderList");
  orderList.innerHTML = "";
  if (orders.length === 0) {
    orderList.innerHTML = "<li>কোনো অর্ডার নেই!</li>";
  } else {
    orders.forEach(o => {
      const li = document.createElement("li");
      li.innerHTML = `<div>অর্ডার #${o.id}<br><small>${o.date}</small></div><div>৳${o.total}</div>`;
      orderList.appendChild(li);
    });
  }
  document.getElementById("orderModal").style.display = "flex";
}

function hideOrders() {
  document.getElementById("orderModal").style.display = "none";
}

function showCart() {
  document.getElementById("cartModal").style.display = "flex";
}

function hideCart() {
  document.getElementById("cartModal").style.display = "none";
}

function showLogin() {
  document.getElementById("loginModal").style.display = "flex";
}

function hideLogin() {
  document.getElementById("loginModal").style.display = "none";
}

function toggleLogin() {
  if (currentUser) {
    if (confirm("লগআউট করতে চান?")) {
      currentUser = null;
      document.getElementById("userDisplay").innerText = "👤 লগইন";
      alert("লগআউট সফল!");
    }
  } else {
    showLogin();
  }
}

function login() {
  const username = document.getElementById("username").value.trim();
  if (username) {
    currentUser = username;
    document.getElementById("userDisplay").innerText = "👤 " + username;
    hideLogin();
    alert("স্বাগতম, " + username + "!");
  } else {
    alert("দয়া করে একটি নাম দিন!");
  }
}

function filterProducts() {
  const query = document.getElementById("searchInput").value.toLowerCase();
  const filtered = products.filter(p => p.name.toLowerCase().includes(query));
  renderProducts(filtered);
}

// Initialize
renderProducts(products);
