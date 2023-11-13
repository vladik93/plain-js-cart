const productsEl = document.getElementById("products");
const cartItemsEl = document.getElementById("cart-items");
const body = document.body;

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
  return cart
    .map((item) => {
      console.log("generateCartItems ===>");
      console.log(item);
      return `
        <div class="cart-item">
                  <img
                    src="./assets/products/${item.image}"
                    class="image cart-item-image"
                  />
                <div class="cart-item-content-container">
                  <div class="cart-item-content">
                    <h2 class="cart-item-title">${item.title}</h2>
                    <h2 class="cart-item-title">$${item.price}</h2>
                    <p class="cart-item-description">${item.description}</p>
                  </div>
                  <div class="cart-item-actions">
                    <button class="cart-item-increment button">
                      <img src="./assets/icons/minus.svg" class="icon-sm" />
                    </button>
                    <span>${item.amount}</span>
                    <button class="cart-item-increment button">
                      <img src="./assets/icons/plus.svg" class="icon-sm" />
                    </button>
                  </div>
                </div>
              </div>`;
    })
    .join("");
};

const generateCartModal = () => {
  return (body.innerHTML += `
  <div id="cart-modal" class="cart-modal">
    <div class="cart-modal-header">
      <h2>My Cart</h2>
      <button class="cart-modal-close" onclick="closeCartModal()">
        <img src="./assets/icons/close.svg" class="icon-sm" />
      </button>
    </div>
    <div id="cart-items" class="cart-items">
      ${generateCartItems()}
    </div>
    <div class="cart-modal-footer">
      <div class="cart-details">
        <div class="cart-detail">
          <span>Subtotal</span>
          <span>$55.21</span>
        </div>
        <div class="cart-detail">
          <span>Tax & Fees</span>
          <span>$3.00</span>
        </div>
        <div class="cart-detail">
          <span>Delivery</span>
          <span>Free</span>
        </div>
      </div>
      <div class="cart-checkout-container">
        <button class="button cart-checkout-button">CHECKOUT</button>
      </div>
    
    
    </div>
</div>`);
};

const closeCartModal = () => {
  const cartModalEl = document.getElementById("cart-modal");

  cartModalEl.remove();
};

generateProducts();
updateCartAmount();
generateCartModal();
