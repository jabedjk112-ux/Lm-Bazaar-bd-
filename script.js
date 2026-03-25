let products = [
  {name: "Pant", price: 500},
  {name: "Shirt", price: 400},
  {name: "T-Shirt", price: 300}
];

let cart = [];
let orders = [];

/* Show Products */
function displayProducts(list = products) {
  let container = document.getElementById("productList");
  container.innerHTML = "";

  list.forEach((p, i) => {
    container.innerHTML += `
      <div class="product">
        <h3>${p.name}</h3>
        <p>৳${p.price}</p>
        <button onclick="addToCart(${i})">Add to Cart</button>
      </div>
    `;
  });
}

/* Search */
function filterProducts() {
  let text = document.getElementById("searchInput").value.toLowerCase();
  let filtered = products.filter(p => p.name.toLowerCase().includes(text));
  displayProducts(filtered);
}

/* Cart */
function addToCart(i) {
  cart.push(products[i]);
  document.getElementById("cartCount").innerText = cart.length;
}

function showCart() {
  document.getElementById("cartModal").style.display = "block";
  let list = document.getElementById("cartItems");
  let total = 0;
  list.innerHTML = "";

  cart.forEach(item => {
    total += item.price;
    list.innerHTML += `<li>${item.name} - ৳${item.price}</li>`;
  });

  document.getElementById("cartTotal").innerText = total;
}

function hideCart() {
  document.getElementById("cartModal").style.display = "none";
}

/* Checkout */
function checkout() {
  orders.push([...cart]);
  cart = [];
  document.getElementById("cartCount").innerText = 0;
  alert("অর্ডার সম্পন্ন!");
  hideCart();
}

/* Orders */
function showOrders() {
  document.getElementById("orderModal").style.display = "block";
  let list = document.getElementById("orderList");
  list.innerHTML = "";

  orders.forEach((order, i) => {
    list.innerHTML += `<li>Order ${i+1} (${order.length} items)</li>`;
  });
}

function hideOrders() {
  document.getElementById("orderModal").style.display = "none";
}

/* Login */
function toggleLogin() {
  document.getElementById("loginModal").style.display = "block";
}

function hideLogin() {
  document.getElementById("loginModal").style.display = "none";
}

function login() {
  let name = document.getElementById("username").value;
  localStorage.setItem("user", name);
  document.getElementById("userDisplay").innerText = name;
  hideLogin();
}

/* Load + Start */
window.onload = function() {
  let user = localStorage.getItem("user");
  if(user){
    document.getElementById("userDisplay").innerText = user;
  }

  displayProducts(); // 🔥 important
}

/* Chatbot */
function toggleChat(){
  let box = document.getElementById("chatbox");
  box.style.display = box.style.display === "block" ? "none" : "block";
}

function chat(e){
  if(e.key === "Enter"){
    let input = document.getElementById("chatInput").value;
    let msgBox = document.getElementById("chatMessages");

    msgBox.innerHTML += `<p><b>You:</b> ${input}</p>`;

    let reply = "দুঃখিত, বুঝতে পারিনি 🤖";

    if(input.includes("price")) reply = "সব প্রোডাক্ট 300-500৳ এর মধ্যে";
    if(input.includes("order")) reply = "আপনি cart থেকে অর্ডার করতে পারবেন";
    if(input.includes("delivery")) reply = "ডেলিভারি চার্জ 60৳";

    msgBox.innerHTML += `<p><b>Bot:</b> ${reply}</p>`;

    document.getElementById("chatInput").value = "";
  }
}
displayProducts();
