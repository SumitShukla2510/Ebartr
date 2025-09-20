
import "bootstrap/dist/css/bootstrap.min.css";
// import "../Style/style.css";
import "../Style/style.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDoubleRight } from '@fortawesome/free-solid-svg-icons'
import React, { useState } from "react";
// import { Link } from "react-router-dom";

const Footer = () => {
  const [activeTab, setActiveTab] = useState("help");

  return (
    <footer className="nb-footer">
      <div className="container">
        <div className="row">
          <div className="col-sm-12">
            <div className="about">
              <img src="images/logo.png" alt="" className="img-responsive center-block" />
              <p>
              Ebartering is a great way to save money on the things you need and want. You can trade your skills, services, or products for the things you want, and you can often get a better deal than you would if you bought the items outright.              </p>

             
            </div>
          </div>

          <div className="col-md-3 col-sm-6">
            <div className="footer-info-single">
              < h2 className="title">
                  Help Center
              </h2>
              <ul className="list-unstyled">
                <li>
                  <a  href="#"style={{ textDecoration: 'none' }}><FontAwesomeIcon icon={faAngleDoubleRight} />How to Pay </a>
                </li>
                <li>
                  <a  href="#"style={{ textDecoration: 'none' }}><FontAwesomeIcon icon={faAngleDoubleRight} /> FAQ's</a>
                </li>
                <li>
                  <a  href="#"style={{ textDecoration: 'none' }}><FontAwesomeIcon icon={faAngleDoubleRight} />Sitemap </a>
                </li>
                <li>
                  <a  href="#"style={{ textDecoration: 'none' }}> <FontAwesomeIcon icon={faAngleDoubleRight} />Delivery Info </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="col-md-3 col-sm-6">
            <div className="footer-info-single">
              <h2 className="title">
         
                  Customer information
           
              </h2>
              <ul className="list-unstyled">
                <li>
                <a  href="#"style={{ textDecoration: 'none' }}> <FontAwesomeIcon icon={faAngleDoubleRight} />About Us  </a>
                </li>
                <li>
                  <a  href="#"style={{ textDecoration: 'none' }}><FontAwesomeIcon icon={faAngleDoubleRight} /> FAQ's </a>
                </li>
                <li>
                  <a  href="#"style={{ textDecoration: 'none' }}><FontAwesomeIcon icon={faAngleDoubleRight} />Sell Your Items </a>
                </li>
                <li>
                  <a  href="#"style={{ textDecoration: 'none' }}> <FontAwesomeIcon icon={faAngleDoubleRight} />Contact Us </a>
                </li>
                <li>
                  <a  href="#"style={{ textDecoration: 'none' }}><FontAwesomeIcon icon={faAngleDoubleRight} /> RSS </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="col-md-3 col-sm-6">
      <div className="footer-info-single">
        <h2 className="title">Security & privacy</h2>
        <ul className="list-unstyled">
        <li>
      <a  href="#"style={{ textDecoration: 'none' }}><FontAwesomeIcon icon={faAngleDoubleRight} /> How to Pay </a>
    </li>         
     <li><a  href="#" style={{ textDecoration: 'none' }}><FontAwesomeIcon icon={faAngleDoubleRight} />Privacy Policy</a></li>
          <li><a  href="#" style={{ textDecoration: 'none' }}><FontAwesomeIcon icon={faAngleDoubleRight} /> Return / Refund Policy</a></li>
          <li><a  href="#" style={{ textDecoration: 'none' }}><FontAwesomeIcon icon={faAngleDoubleRight} /> Store Locations</a></li>
        </ul>
      </div>
    </div>

    <div className="col-md-3 col-sm-6">
      <div className="footer-info-single">
        <h2 className="title">Payment</h2>
        <p>Sample HTML page with Twitter's Bootstrap. Code example of Easy Sticky Footer using HTML, Javascript, jQuery, and CSS. This bootstrap tutorial covers all the major elements of responsive</p>
      </div>
    </div>

    </div>
</div>
<section className="copyright">
      <div className="container">
        <div className="row">
          <div >
            <p>Copyright © 2023. E-BARTER.</p>
          </div>
        
        </div>
      </div>
    </section>
</footer>
  );
}

export default Footer;
