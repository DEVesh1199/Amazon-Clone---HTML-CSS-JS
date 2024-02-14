import { Cart, deleteFromCart, checkCartQuantity, checkItemQuantity, updateCart} from "../data/cart.js";
import { products } from "../data/products.js";

let checkoutCartHTML = '';

Cart.forEach((item) => {
  let matchingProduct;
  products.forEach((product)=>{
    if(item.productId === product.id)
      matchingProduct = product;
  })
  checkoutCartHTML += `
  <div class="cart-item-container js-cart-item-container-${item.productId}">
    <div class="delivery-date">
      Delivery date: Tuesday, June 21
    </div>

    <div class="cart-item-details-grid">
      <img class="product-image"
        src=${matchingProduct.image}>

      <div class="cart-item-details">
        <div class="product-name">
          ${matchingProduct.name}
        </div>
        <div class="product-price">
          $${(matchingProduct.priceCents / 100).toFixed(2)}
        </div>
        <div class="product-quantity">
          <span>
            Quantity: <span class="quantity-label js-quantity-label-${matchingProduct.id}">${item.quantity}</span>
          </span>
          <span class="update-quantity-link js-update-quantity-link link-primary"
          data-product-id="${matchingProduct.id}">
            Update
          </span>
          <input class="quantity-input js-quantity-input-${matchingProduct.id}" type="number" value="1" min="1" max="100">
          <span class="save-quantity-link js-save-quantity-link link-primary"
          data-product-id="${matchingProduct.id}">
            Save
          </span>
          <span class="delete-quantity-link link-primary js-delete-from-cart"
          data-product-id="${matchingProduct.id}">
            Delete
          </span>
        </div>
      </div>

      <div class="delivery-options">
        <div class="delivery-options-title">
          Choose a delivery option:
        </div>
        <div class="delivery-option">
          <input type="radio" checked
            class="delivery-option-input"
            name="delivery-option-${item.productId}">
          <div>
            <div class="delivery-option-date">
              Tuesday, June 21
            </div>
            <div class="delivery-option-price">
              FREE Shipping
            </div>
          </div>
        </div>
        <div class="delivery-option">
          <input type="radio"
            class="delivery-option-input"
            name="delivery-option-${item.productId}">
          <div>
            <div class="delivery-option-date">
              Wednesday, June 15
            </div>
            <div class="delivery-option-price">
              $4.99 - Shipping
            </div>
          </div>
        </div>
        <div class="delivery-option">
          <input type="radio"
            class="delivery-option-input"
            name="delivery-option-${item.productId}">
          <div>
            <div class="delivery-option-date">
              Monday, June 13
            </div>
            <div class="delivery-option-price">
              $9.99 - Shipping
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  `
});

document.querySelector('.js-order-summary').innerHTML = checkoutCartHTML;

document.querySelectorAll('.js-delete-from-cart')
  .forEach((deleteButton)=>{
    const {productId} = deleteButton.dataset;
    deleteButton.addEventListener('click', ()=>{
      deleteFromCart(productId);
      document.querySelector('.js-checkout-items').innerHTML = `${checkCartQuantity()} items`;
    });
  });

document.querySelectorAll('.js-update-quantity-link')
  .forEach((updateLink)=>{
    const {productId} = updateLink.dataset;
    updateLink.addEventListener('click',()=>{
      const productContainer = document.querySelector(`.js-cart-item-container-${productId}`);
      productContainer.classList.add('is-editing-quantity');
    });
  });

document.querySelectorAll('.js-save-quantity-link')
  .forEach((saveLink)=>{
    const {productId} = saveLink.dataset;
      saveLink.addEventListener('click',()=>{
      const productContainer = document.querySelector(`.js-cart-item-container-${productId}`);
      productContainer.classList.remove('is-editing-quantity');
      let newQuantity = Number(document.querySelector(`.js-quantity-input-${productId}`).value);
      updateCart(productId, newQuantity);
      document.querySelector('.js-checkout-items').innerHTML = `${checkCartQuantity()} items`;
      document.querySelector(`.js-quantity-label-${productId}`).innerHTML = `${checkItemQuantity(productId)} items`;
    });
  });

document.querySelector('.js-checkout-items').innerHTML = `${checkCartQuantity()} items`;
  
