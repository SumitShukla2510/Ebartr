import "../Style/Productstyles.css";

import React, { useState, useEffect } from "react";

export default function Slideshow() {
  return (
    <div>
      <body>
        {/* <!-- Main ---------------------------------------------------> */}
        <div className="main-container">
          <section className="left">
            <img
              src="https://raw.githubusercontent.com/frontendmentorio/ecommerce-product-page/main/images/image-product-4.jpg"
              alt="product-img-4"
              className="product-img"
            />
          </section>

          {/* <!-- Product Description ---------------------------------------------------> */}
          <section class="right">
            <small>E-BARTER</small>
            <h1>fall limited edition sneakers</h1>

            <p>
              <span>
                These low-profile sneakers are your perfect casual wear{" "}
              </span>
              <span>
                companion. Featuring a durable rubber outer sole, they'll{" "}
              </span>
              withstand everything the weather can offer.
            </p>

            <div className="price">
              <div className="discounted-price">
                <strong className="current-price">$125.00</strong>
                <strong className="discount">50%</strong>
              </div>

              <s>$250.00</s>
            </div>

            {/* <!-- Cart Controls ---------------------------------------------------> */}
            <div className="add-to-cart">
              <a href="message">
              <button className="add-to-cart-btn" id="add-to-cart-btn">
                Chat with Seller
              </button>
              </a>
              
            </div>
            
          </section>
        </div>
        {/* <!-- Lightbox ---------------------------------------------------> */}
        <div className="lightbox" id="lightbox">
          <div className="close-icon-container" id="close-icon-container">
            <img
              src="https://raw.githubusercontent.com/frontendmentorio/ecommerce-product-page/168180def66c040b9b9a60afc31a31f4658272ec/images/icon-close.svg"
              alt="close-icon"
              className="close-icon"
            />
          </div>
        </div>

        {/* product images */}
      </body>
    </div>
  );
}
