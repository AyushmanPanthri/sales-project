const products = [
  {
    id: 1,
    name: "Noir Chronograph",
    category: "accessories",
    price: 12999,
    icon: "⌚",
    tag: "BESTSELLER"
  },
  {
    id: 2,
    name: "Imperial Leather",
    category: "fashion",
    price: 8499,
    icon: "🧥",
    tag: "NEW"
  },
  {
    id: 3,
    name: "Aurum Essence",
    category: "lifestyle",
    price: 5999,
    icon: "♛",
    tag: "EXCLUSIVE"
  },
  {
    id: 4,
    name: "Obsidian Shades",
    category: "accessories",
    price: 4499,
    icon: "🕶️",
    tag: ""
  },
  {
    id: 5,
    name: "Royal Classic",
    category: "fashion",
    price: 9999,
    icon: "👞",
    tag: "PREMIUM"
  },
  {
    id: 6,
    name: "Golden Signature",
    category: "accessories",
    price: 6999,
    icon: "💍",
    tag: ""
  },
  {
    id: 7,
    name: "Noir Collection",
    category: "lifestyle",
    price: 3499,
    icon: "♠",
    tag: "LIMITED"
  },
  {
    id: 8,
    name: "Aurevia Reserve",
    category: "lifestyle",
    price: 7499,
    icon: "✦",
    tag: "NEW"
  }
];

let cart = JSON.parse(localStorage.getItem("aureviaCart")) || [];

const productGrid = document.getElementById("productGrid");
const cartBtn = document.getElementById("cartBtn");
const cartDrawer = document.getElementById("cartDrawer");
const cartOverlay = document.getElementById("cartOverlay");
const closeCart = document.getElementById("closeCart");

const cartItems = document.getElementById("cartItems");
const cartCount = document.getElementById("cartCount");
const cartTotal = document.getElementById("cartTotal");

const filterButtons = document.querySelectorAll(".filter-btn");

const searchToggle = document.getElementById("searchToggle");
const searchBar = document.getElementById("searchBar");
const searchInput = document.getElementById("searchInput");

const menuBtn = document.getElementById("menuBtn");
const nav = document.getElementById("nav");

const toast = document.getElementById("toast");

const newsletterForm =
  document.getElementById("newsletterForm");

const newsletterMessage =
  document.getElementById("newsletterMessage");


/* Format Price */

function formatPrice(price) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0
  }).format(price);
}


/* Render Products */

function renderProducts(items = products) {

  productGrid.innerHTML = "";

  if (items.length === 0) {
    productGrid.innerHTML =
      "<p>No products found.</p>";
    return;
  }

  items.forEach(product => {

    const card = document.createElement("article");

    card.className = "product-card";

    card.innerHTML = `
      <div class="product-image">

        ${
          product.tag
            ? `<span class="product-tag">
                ${product.tag}
               </span>`
            : ""
        }

        <span>${product.icon}</span>

      </div>

      <div class="product-info">

        <p class="product-category">
          ${product.category}
        </p>

        <h3>${product.name}</h3>

        <div class="product-bottom">

          <span class="price">
            ${formatPrice(product.price)}
          </span>

          <button
            class="add-cart"
            onclick="addToCart(${product.id})"
            aria-label="Add ${product.name} to cart"
          >
            +
          </button>

        </div>

      </div>
    `;

    productGrid.appendChild(card);
  });
}


/* Add to Cart */

function addToCart(id) {

  const product =
    products.find(item => item.id === id);

  cart.push(product);

  saveCart();

  updateCart();

  showToast(
    `${product.name} added to cart`
  );
}


/* Remove Item */

function removeFromCart(index) {

  cart.splice(index, 1);

  saveCart();

  updateCart();
}


/* Save Cart */

function saveCart() {

  localStorage.setItem(
    "aureviaCart",
    JSON.stringify(cart)
  );
}


/* Update Cart */

function updateCart() {

  cartCount.textContent = cart.length;

  cartItems.innerHTML = "";

  if (cart.length === 0) {

    cartItems.innerHTML = `
      <p class="empty-cart">
        Your cart is currently empty.
      </p>
    `;

  } else {

    cart.forEach((item, index) => {

      const cartItem =
        document.createElement("div");

      cartItem.className = "cart-item";

      cartItem.innerHTML = `
        <div class="cart-item-info">
          <h4>${item.name}</h4>
          <p>${formatPrice(item.price)}</p>
        </div>

        <button
          class="remove-item"
          onclick="removeFromCart(${index})"
        >
          Remove
        </button>
      `;

      cartItems.appendChild(cartItem);

    });
  }

  const total = cart.reduce(
    (sum, item) => sum + item.price,
    0
  );

  cartTotal.textContent =
    formatPrice(total);
}


/* Cart Drawer */

function openCart() {

  cartDrawer.classList.add("active");

  cartOverlay.classList.add("active");

  document.body.style.overflow = "hidden";
}

function hideCart() {

  cartDrawer.classList.remove("active");

  cartOverlay.classList.remove("active");

  document.body.style.overflow = "";
}

cartBtn.addEventListener(
  "click",
  openCart
);

closeCart.addEventListener(
  "click",
  hideCart
);

cartOverlay.addEventListener(
  "click",
  hideCart
);


/* Product Filters */

filterButtons.forEach(button => {

  button.addEventListener("click", () => {

    filterButtons.forEach(btn =>
      btn.classList.remove("active")
    );

    button.classList.add("active");

    const category =
      button.dataset.category;

    if (category === "all") {

      renderProducts(products);

    } else {

      const filtered =
        products.filter(
          product =>
            product.category === category
        );

      renderProducts(filtered);
    }

  });

});


/* Search */

searchToggle.addEventListener(
  "click",
  () => {

    searchBar.classList.toggle("active");

    if (
      searchBar.classList.contains("active")
    ) {

      searchInput.focus();

    }

  }
);

searchInput.addEventListener(
  "input",
  event => {

    const query =
      event.target.value
        .toLowerCase()
        .trim();

    const results =
      products.filter(product =>
        product.name
          .toLowerCase()
          .includes(query)
      );

    renderProducts(results);

  }
);


/* Mobile Menu */

menuBtn.addEventListener(
  "click",
  () => {

    nav.classList.toggle("active");

  }
);

document
  .querySelectorAll(".nav a")
  .forEach(link => {

    link.addEventListener(
      "click",
      () => {

        nav.classList.remove("active");

      }
    );

  });


/* Toast */

function showToast(message) {

  toast.textContent = message;

  toast.classList.add("active");

  setTimeout(
    () => {

      toast.classList.remove("active");

    },
    2200
  );
}


/* Newsletter */

newsletterForm.addEventListener(
  "submit",
  event => {

    event.preventDefault();

    const email =
      document
        .getElementById("emailInput")
        .value;

    newsletterMessage.textContent =
      `Welcome to the Aurevia Circle — ${email}`;

    newsletterForm.reset();

  }
);


/* Checkout */

document
  .getElementById("checkoutBtn")
  .addEventListener(
    "click",
    () => {

      if (cart.length === 0) {

        showToast(
          "Your cart is empty"
        );

        return;
      }

      showToast(
        "Checkout system coming soon"
      );

    }
  );


/* Initialize */

renderProducts();

updateCart();