const productsEl = document.getElementById("products");

let cart = [];

const generateProducts = () => {
  productsEl.innerHTML = products
    .map(({ id, title, description, price, image }) => {
      return `
      <div class="product" id=${id} onclick="addToCart(${id})">
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

generateProducts();
