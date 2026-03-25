document.addEventListener("DOMContentLoaded", function () {

  let products = [
    {name: "Pant", price: 500},
    {name: "Shirt", price: 400},
    {name: "T-Shirt", price: 300}
  ];

  let cart = [];
  let orders = [];

  function displayProducts(list = products) {
    let container = document.getElementById("productList");
    if(!container) return;

    container.innerHTML = "";

    list.forEach((p, i) => {
      container.innerHTML += `
        <div class="product">
          <h3>${p.name}</h3>
          <p>৳${p.price}</p>
          <button onclick="addToCart(${i})">Add</button>
        </div>
      `;
    });
  }

  window.filterProducts = function() {
    let text = document.getElementById("searchInput").value.toLowerCase();
    let filtered = products.filter(p => p.name.toLowerCase().includes(text));
    displayProducts(filtered);
  }

  window.addToCart = function(i) {
    cart.push(products[i]);
    document.getElementById("cartCount").innerText = cart.length;
  }

  window.showCart = function() {
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

  window.hideCart = function() {
    document.getElementById("cartModal").style.display = "none";
  }

  window.checkout = function() {
    orders.push([...cart]);
    cart = [];
    document.getElementById("cartCount").innerText = 0;
    alert("অর্ডার সম্পন্ন!");
    hideCart();
  }

  window.showOrders = function() {
    document.getElementById("orderModal").style.display = "block";
    let list = document.getElementById("orderList");
    list.innerHTML = "";

    orders.forEach((order, i) => {
      list.innerHTML += `<li>Order ${i+1} (${order.length} items)</li>`;
    });
  }

  window.hideOrders = function() {
    document.getElementById("orderModal").style.display = "none";
  }

  window.toggleLogin = function() {
    document.getElementById("loginModal").style.display = "block";
  }

  window.hideLogin = function() {
    document.getElementById("loginModal").style.display = "none";
  }

  window.login = function() {
    let name = document.getElementById("username").value;
    localStorage.setItem("user", name);
    document.getElementById("userDisplay").innerText = name;
    hideLogin();
  }

  window.toggleChat = function(){
    let box = document.getElementById("chatbox");
    box.style.display = box.style.display === "block" ? "none" : "block";
  }

  window.chat = function(e){
    if(e.key === "Enter"){
      let input = document.getElementById("chatInput").value;
      let msgBox = document.getElementById("chatMessages");

      msgBox.innerHTML += `<p><b>You:</b> ${input}</p>`;

      let reply = "দুঃখিত 🤖";

      if(input.includes("price")) reply = "300-500৳";
      if(input.includes("order")) reply = "Cart থেকে অর্ডার করুন";
      if(input.includes("delivery")) reply = "Delivery 60৳";

      msgBox.innerHTML += `<p><b>Bot:</b> ${reply}</p>`;
      document.getElementById("chatInput").value = "";
    }
  }

  // ✅ load everything
  let user = localStorage.getItem("user");
  if(user){
    document.getElementById("userDisplay").innerText = user;
  }

  displayProducts();
});
