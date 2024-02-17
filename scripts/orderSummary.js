import { Cart, checkCartQuantity } from "../data/cart.js";
import { products } from "../data/products.js";
import { deliveryOptions } from "../data/deliveryOptions.js";


export function cartSummaryGenerator(){
  let orderSummaryHTML = '';
  let productsPrice = 0;
  let handlingPrice = 0;
  Cart.forEach((item) => {
    products.forEach((product)=>{
      if(item.productId === product.id){
        productsPrice += product.priceCents * item.quantity;
        
      }
    });
    deliveryOptions.forEach((option)=>{
      if(option.deliveryId === item.deliveryId){
        handlingPrice += option.deliveryPriceCents;
      }
    });
  });

  orderSummaryHTML += `
    <div class="payment-summary-title">
      Order Summary
    </div>

    <div class="payment-summary-row">
    <div>Items (${checkCartQuantity()}):</div>
    <div class="payment-summary-money">$${(productsPrice / 100).toFixed(2)}</div>
    </div>

    <div class="payment-summary-row">
    <div>Shipping &amp; handling:</div>
    <div class="payment-summary-money">$${(handlingPrice / 100).toFixed(2)}</div>
    </div>

    <div class="payment-summary-row subtotal-row">
    <div>Total before tax:</div>
    <div class="payment-summary-money">$${((productsPrice + handlingPrice) / 100).toFixed(2)}</div>
    </div>

    <div class="payment-summary-row">
    <div>Estimated tax (10%):</div>
    <div class="payment-summary-money">$${((productsPrice + handlingPrice) * 0.1 / 100).toFixed(2)}</div>
    </div>

    <div class="payment-summary-row total-row">
    <div>Order total:</div>
    <div class="payment-summary-money">$${((productsPrice + handlingPrice + ((productsPrice + handlingPrice) * 0.1)) / 100).toFixed(2)}</div>
    </div>

    <button class="place-order-button button-primary">
    Place your order
    </button>
  `;

  document.querySelector('.js-payment-summary').innerHTML = orderSummaryHTML;
}

cartSummaryGenerator();