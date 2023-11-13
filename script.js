const productsEl = document.getElementById("products");
const cartItemsEl = document.getElementById("cart-items");

let cart = JSON.parse(localStorage.getItem("CART")) || [];

const generateProducts = () => {
  productsEl.innerHTML = products
    .map(({ id, title, description, price, image }) => {
      const found = cart.find((x) => x.id === id);
      return `
      <div class="product ${
        found ? "selected" : ""
      }" id=${id} onclick="addToCart(${id})">
        <img src="./assets/products/${image}" class="image" />
        <div class="product-content">
          <h2 class="product-title">${title}</h2>
          <p class="product-description">
            ${description}
          </p>
          <h3>$${price}</h3>
        </div>
        <span class="product-cart-indicator">
          <img src="./assets/cart.svg" class="icon" />
        </span>
      </div>`;
    })
    .join("");
};

const addToCart = (id) => {
  const item = products.find((item) => item.id === id);

  if (cart.some((x) => x.id === id)) {
    let filtered = cart.filter((item) => item.id !== id);

    cart = filtered;
  } else {
    cart.push({
      ...item,
      amount: 1,
    });
  }

  toggleCartIndicator();
  updateCartAmount();

  localStorage.setItem("CART", JSON.stringify(cart));
};

const toggleCartIndicator = () => {
  const productEl = document.querySelectorAll(".product");

  productEl.forEach((item) => {
    if (cart.some((x) => x.id == parseInt(item.id))) {
      item.classList.add("selected");
    } else {
      item.classList.remove("selected");
    }
  });
};

const updateCartAmount = () => {
  const cartAmountIndicatorEl = document.getElementById(
    "cart-amount-indicator"
  );

  let counter = 0;

  cart.map((item) => (counter += item.amount));

  cartAmountIndicatorEl.innerHTML = counter;
};

const generateCartItems = () => {
  cartItemsEl.innerHTML += cart.map((item) => {
    return `
        <div class="cart-item">
                <div class="cart-item-image-cont">
                  <img
                    src="./assets/products/headphones.jpg"
                    class="image cart-item-image"
                  />
                </div>
                <div class="cart-item-content-container">
                  <div class="cart-item-content">
                    <h2 class="cart-item-title">Earphones</h2>
                    <h2 class="cart-item-title">$2.50</h2>
                    <p class="cart-item-description">Item description text here</p>
                  </div>
                  <div class="cart-item-actions">
                    <button class="cart-item-increment button">
                      <img src="./assets/icons/minus.svg" class="icon-sm" />
                    </button>
                    <span>0</span>
                    <button class="cart-item-increment button">
                      <img src="./assets/icons/plus.svg" class="icon-sm" />
                    </button>
                  </div>
                </div>
              </div>`;
  });
};

generateProducts();
updateCartAmount();
generateCartItems();
