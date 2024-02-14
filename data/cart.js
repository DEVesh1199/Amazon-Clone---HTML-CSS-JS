export const Cart = [];

export function addToCart(productId) {
  let alreadyInCart;
  let quantity = Number(document.querySelector(`.js-quantity-selector-${productId}`).value);
  Cart.forEach((product) => {
    if (productId === product.productId)
      alreadyInCart = product;
  });
  if (!alreadyInCart) {
    Cart.push({
      productId,
      quantity
    });
  } else alreadyInCart.quantity += quantity;

  let finalQuantity = 0;

  Cart.forEach((product) => {
    finalQuantity += product.quantity;
  });

  document.querySelector('.js-cart-quantity').innerHTML = finalQuantity;

}