import { addToCart, fetchCart, fetchProduct } from "./fetcher.js";

const products = await fetchProduct();
const carts = await fetchCart();

// product
const productContainer = document.querySelector(".products");
if (productContainer) {
  productContainer.innerHTML = products
  .map(
    (product) =>
      `
    <div class="card">
            <img src="${product.image}" />

            <div class="description">
              <div class="left">
                <h5>${product.name}</h5>
                <p>Rp.${product.price}</p>
              </div>
              <button class="buy" data-id=${product.id}>Buy</button>
            </div>
    </div>
    `
  )
  .join("");
}

//   carts
function renderCart(carts) {
  const cartContainer = document.querySelector("table tbody");
  cartContainer.innerHTML = carts.carts
    .map(
      (cart, i) =>
        `
          <tr>
                  <td>${i + 1}</td>
                  <td>${cart.product.name}</td>
                  <td>${cart.amount}</td>
                  <td>Rp.${cart.product.price}</td>
                </tr>
        `
    )
    .join("");
  document.getElementById("total").innerText = `Rp.${carts.total}`;
}
renderCart(carts);

// add to cart
const buyButtons = document.querySelectorAll(".buy");

buyButtons.forEach((button) => {
  button.onclick = async (e) => {
    const productId = e.target.getAttribute("data-id");

    await addToCart(productId);

    const updated = await fetchCart();
    renderCart(updated);
  };
});

// checkout
const form = document.querySelector('form')

if (form) {
  document.querySelector('form').onsubmit = async (e) => {
   e.preventDefault() 
  
   const payment = document.querySelector('input[type="radio"]:checked').value
  
   sessionStorage.setItem('payment', payment)
  }
  
}