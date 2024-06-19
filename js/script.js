const baseURL = "https://kasirin.vercel.app";
const STORE = 'mia'

const fetchProduct = async () => {
  try {
    const response = await fetch(`${baseURL}/products/${STORE}`);
    const result = await response.json();

    const products = result.data;

    return products;
  } catch (error) {
    console.log(error);
  }
};

const fetchCart = async () => {
  try {
    const response = await fetch(`${baseURL}/carts/${STORE}`);
    const result = await response.json();

    const carts = result.data;

    return carts;
  } catch (error) {
    console.log(error);
  }
};

const addToCart = async (id) => {
  try {
    const response = await fetch(`${baseURL}/products/${STORE}/${id}/add`, {
      method: "POST",
    });
    const result = await response.json();

    // const carts = result;
    console.log(result);

    return result;
  } catch (error) {
    console.log(error);
  }
};

window.onload = async () => {
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

  // add product 
  const addProduct = document.querySelector('.product-add');
  if (addProduct) {
    const button = document.getElementById('addProduct')
    button.onclick = () => {
      addProduct.style.display = 'block'
    }

    const close = document.getElementById('close')
    close.onclick = () => {
      addProduct.style.display = 'none'
    }

    const form = document.querySelector('.product-add form')
    form.onsubmit = async (e) => {
      e.preventDefault()
      console.log('udang');
      try {
        const formData = new FormData();
        formData.append('name', e.target.name.value);
        formData.append('price', e.target.price.value);
        formData.append('image', e.target.image.files[0]);

        const response = await fetch(`https://kasirin.vercel.app/products/${STORE}`, {
          method: 'POST',
          body: formData
        })


        window.location.reload();
      } catch (error) {
        console.log(error);
      }
    }
  }

}