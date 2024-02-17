export let Cart = JSON.parse(localStorage.getItem('Cart')) || [];


export function addToCart(productId, quantity = 1) {
  let alreadyInCart;
  
  Cart.forEach((product) => {
    if (productId === product.productId)
      alreadyInCart = product;
  });
  if (!alreadyInCart) {
    Cart.push({
      productId,
      quantity,
      deliveryId: '1'
    });
  } else alreadyInCart.quantity += quantity;

  localStorage.setItem('Cart',JSON.stringify(Cart));
}

export function deleteFromCart(productId) {
  const newCart = [];
  Cart.forEach((item) => {
    if (productId === item.productId) return;
    else newCart.push(item);
  });
  Cart = newCart;
  localStorage.setItem('Cart',JSON.stringify(Cart));
}

export function checkCartQuantity() {
  let finalQuantity = 0;
  Cart.forEach((product) => {
    finalQuantity += product.quantity;
  });
  return finalQuantity;
}

export function updateCart (productId, quantity){
  Cart.forEach((item)=>{
    if(item.productId === productId && quantity > 0) item.quantity = quantity;
    else if (item.productId === productId && quantity === 0) deleteFromCart(productId);
  });
  localStorage.setItem('Cart',JSON.stringify(Cart));  
}

export function checkItemQuantity(productId){
  let productQuantity = 0;
  Cart.forEach((item) => {
    if(item.productId === productId)
      productQuantity = item.quantity;
  });
  return productQuantity;
}

export function matchingCartItem(productId){
  let matchingProduct;
  Cart.forEach((item) => {
    if(item.productId === productId)
      matchingProduct = item;
  });
  return matchingProduct;
}
