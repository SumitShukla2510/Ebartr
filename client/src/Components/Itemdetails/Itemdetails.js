import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./ItemDetails.css";
import Header from "../Header/Code/HeaderSec";
import axios from "axios";
const ItemDetailsPage = () => {
  //const { itemId } = useParams();
  const { collection, itemId } = useParams();
  // console.log(collection);
  // console.log(itemId);
  //   const itemId = "64a07863be267ed11ed6a89e";
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedUsr, setSelectedUsr] = useState(null);
  const [username, setUsername] = useState(null);
  const [id, setId] = useState(null);

  // Fetch user profile data when the component mounts
  useEffect(() => {
    // Send an HTTP GET request to '/profile' endpoint using Axios
    axios.get("/profile").then((response) => {
      // Update the state variables with the received data
      setId(response.data.userId);
      setUsername(response.data.username);
    });
  }, []);
  useEffect(() => {
    const currentURL = window.location.href;
    // console.log(currentURL);
    const queryParams = new URLSearchParams(currentURL.split("?")[1]);
    const selectUserValue = queryParams.get("currUser");
    setSelectedUsr(selectUserValue);
    console.log(selectUserValue);
  }, []);
  const handleMsgClick = () => {
    if (id != selectedUsr)
      window.location.href = `http://localhost:3000/message?selectUser=${selectedUsr}`;
  };
  useEffect(() => {
    fetch(`http://localhost:4040/Ebartr/items/${collection}/${itemId}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Item not found");
        }
        return response.json();
      })
      .then((data) => {
        setItem(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, [itemId]);

  if (loading) {
    return <div className="item-details-loading">Loading...</div>;
  }

  if (error) {
    return <div className="item-details-error">{error}</div>;
  }

  if (!item) {
    return <div className="item-details-error">Item not found</div>;
  }

  return (
    <div>
      <Header />
      <div className="item-details-container">
        {/* <img className="item-details-image" src={`data:${item.image.contentType};base64,${Buffer.from(item.image.data).toString('base64')}`} alt="Item" /> */}
        <div className="item-details-content">
          <h2 className="item-details-heading">{item.position}</h2>
          <p className="item-details-description">{item.description}</p>
          <p className="item-details-date">Date: {item.date}</p>
          <p className="item-details-price">Price: {item.price}</p>
          <p className="item-details-contact">Contact No: {item.contactNo}</p>
          <div className="item-details-buttons">
            <button onClick={handleMsgClick}>Chat with Seller</button>
            <button>Contact Seller</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemDetailsPage;
