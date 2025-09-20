import React, { useState, useEffect } from 'react';
import "./card.css";

function ItemCard({ item }) {
  const [imageUrl, setImageUrl] = useState('');
  useEffect(() => {
    const fetchImageUrl = async () => {
      try {
        const response = await fetch(`http://localhost:4040/Ebartr/images/${item.position}/${item._id}`);
        const data = await response.json();
        setImageUrl(data.imageUrl);
      } catch (error) {
        console.error('Error fetching image URL:', error);
      }
    };
    fetchImageUrl();
  }, [item]);

  return (
    <div className="card">
    <img src={imageUrl} alt="Product" />
    <div className="card-details">
      <h2>{item.position}</h2>
      <p>Price: {item.price}</p>
      <p>Contact: {item.contactNo}</p>
    </div>
  </div>
  );
}
export default ItemCard;
