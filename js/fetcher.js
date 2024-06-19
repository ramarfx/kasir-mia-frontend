export const baseURL = "https://kasirin.vercel.app";
export const STORE = 'mia'

export const fetchProduct = async () => {
  try {
    const response = await fetch(`${baseURL}/products/${STORE}`);
    const result = await response.json();

    const products = result.data;

    return products;
  } catch (error) {
    console.log(error);
  }
};

export const fetchCart = async () => {
  try {
    const response = await fetch(`${baseURL}/carts/${STORE}`);
    const result = await response.json();

    const carts = result.data;

    return carts;
  } catch (error) {
    console.log(error);
  }
};

export const addToCart = async (id) => {
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
