import React, {useState, useEffect} from "react";
import SingleCard from "./singlecard"
import "./card.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { DropdownMenu } from "../Header/Code/dropDown";
// import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
// import ItemDetailsPage from "../Itemdetails/Itemdetails";
function Cardsdata(){
    const [cards, setCards] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    
  
    useEffect(() => {
      fetchCardsData();
    }, []);
  
    const fetchCardsData = async () => {
      try {
        const response = await fetch(`http://localhost:4040/Ebartr/cards/cardsdata/${searchTerm ? `?search=${searchTerm}` : ''}`);
        const data = await response.json();
        setCards(data);
      } catch (error) {
        console.error('Error fetching cards data:', error);
      }
    };
  
    const handleSearch = (e) => {
      setSearchTerm(e.target.value);
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      fetchCardsData();
    };
    const groupedCards = cards.reduce((groups, card) => {
      if (!groups[card.position]) {
        groups[card.position] = [];
      }
      groups[card.position].push(card);
      return groups;
    }, {});
    const handleCardClick = (cardId,cardpos,cardUserID) => {
        window.location.href = `/card/${cardpos}/${cardId}?currUser=${cardUserID}`;
    };
    return(
          <div>
<nav className="bg-gray-800 px-4 py-2 flex lg:flex-row items-center flex-shrink-0">
  <div className="flex justify-between items-center">
    <span className="text-white text-xl ml-6 lg:mb-0 sm:mb-2">EBARTR</span>
  </div>
  <div className="flex flex-grow justify-center" id="navbar-collapse">
    <form onSubmit={handleSubmit} className="w-2/3 flex items-center">
      <input
        type="text"
        value={searchTerm}
        onChange={handleSearch}
        placeholder="Search Product..."
        className="text-gray-800  py-2 w-3/4 rounded-l-lg"
      />
      <button type="submit" className="bg-white h-10 w-10 flex justify-center items-center ml-0 rounded-r-lg cursor-pointer border">
        <FontAwesomeIcon icon={faMagnifyingGlass} className="" />
      </button>
    </form>
    <a
      href="/"
      className="text-gray-500 hover:text-gray-300 py-2 hidden lg:block underline-none"
    >
      Home
    </a>
  </div>
  <div className="flex my-3 my-0">
    <div className="lg:hidden">
      <DropdownMenu />
    </div>
    <a href="sell">
      <button className="bg-transparent hover:bg-white text-white hover:text-gray-900 py-1 px-3 rounded border border-solid border-white mr-2 hidden lg:block">
        &#43; SELL
      </button>
    </a>
    <a href="LoginSignup">
      <button className="bg-purple-700 hover:bg-purple-800 text-white py-1 px-3 rounded border border-solid border-purple-700 hover:border-purple-800 hidden lg:block">
        Log In/Sign Up
      </button>
    </a>
  </div>
</nav>
      {/* <div className="card-list"> */}
        {/* {cards.map((card) => ( */}
          {/* // <div key={card._id} onClick={() => handleCardClick(card._id, card.position,card.userID)}> */}
            {/* Display card details */}
            {/* <SingleCard  item={card}/> */}
          {/* </div> */}
        {/* // ))} */}
      {/* </div> */}
      <div>
        {Object.entries(groupedCards).map(([collectionName, collectionCards]) => (
          <div key={collectionName}>
            {/* Display collection name as heading */}
            <h1 style={{ fontSize: '4vh' }}>{collectionName}</h1>
            {/* Display cards in the collection */}
            <div className="card-list">
            {collectionCards.map((card) => (
              <div key={card._id} onClick={() => handleCardClick(card._id, card.position, card.userID)}>
                <SingleCard item={card} />
              </div>
            ))}
          </div>
          </div>
        ))}
      </div>
      </div>
   
    );
}
export default Cardsdata;