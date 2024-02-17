import { Cart, deleteFromCart, checkCartQuantity, checkItemQuantity, updateCart, matchingCartItem} from "../data/cart.js";
import { products } from "../data/products.js";
import { deliveryOptions } from "../data/deliveryOptions.js";
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import {cartSummaryGenerator} from './orderSummary.js';

function checkoutCart (){
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
        Delivery date:
        ${deliveryDateUpdate(item.deliveryId)}
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
          ${orderSummaryGen(item.productId, item.deliveryId)}
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
        checkoutCart();
        cartSummaryGenerator();
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
        cartSummaryGenerator();
      });
    });

  function orderSummaryGen (productId, deliveryId){
    let orderSummaryHTML = '';
    
    deliveryOptions.forEach((option)=>{
      const deliveryDay = (dayjs().add(option.deliveryDays, 'day')).format('dddd, MMMM D');
      let deliveryPrice ;
      option.deliveryPriceCents === 0 ? deliveryPrice = 'Free ' : deliveryPrice = `$${(option.deliveryPriceCents / 100).toFixed(2)} `;
      orderSummaryHTML += `
      <div class="delivery-option js-delivery-option"
      data-product-id = ${productId} data-delivery-id = ${option.deliveryId}>
        <input type="radio" ${deliveryId === option.deliveryId ? 'checked' : ''}
          class="delivery-option-input 
          name="delivery-option-${productId}">
        <div>
          <div class="delivery-option-date">
            ${deliveryDay}
          </div>
          <div class="delivery-option-price">
            ${deliveryPrice}-Shipping
          </div>
        </div>
      </div>`
    });
    return orderSummaryHTML;
  }

  document.querySelectorAll('.js-delivery-option')
    .forEach((deliveryOption)=>{
      const {productId, deliveryId} = deliveryOption.dataset;
      deliveryOption.addEventListener('click',()=>{
        const matchedProduct = matchingCartItem(productId);
        matchedProduct.deliveryId = deliveryId;
        localStorage.setItem('Cart',JSON.stringify(Cart));  
        checkoutCart();
        cartSummaryGenerator();
    });
  });

  function deliveryDateUpdate(deliveryid){
    let deliveryDay = '';
    deliveryOptions.forEach((option)=>{
      if(deliveryid === option.deliveryId){
        deliveryDay = `${(dayjs().add(option.deliveryDays,'day')).format('dddd, MMMM D')}.`
      }

    });
    return deliveryDay;
  }
  document.querySelector('.js-checkout-items').innerHTML = `${checkCartQuantity()} items`;
}

checkoutCart();
