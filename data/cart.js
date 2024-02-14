export let Cart = JSON.parse(localStorage.getItem('Cart')) || [];


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
}

export function deleteFromCart(productId) {
  const newCart = [];
  Cart.forEach((item) => {
    if (productId === item.productId) return;
    else newCart.push(item);
  });
  Cart = newCart;
  document.querySelector(`.js-cart-item-container-${productId}`).remove();
}

export function checkCartQuantity() {
  let finalQuantity = 0;
  Cart.forEach((product) => {
    finalQuantity += product.quantity;
  });

  document.querySelector('.js-cart-quantity').innerHTML = finalQuantity;
}