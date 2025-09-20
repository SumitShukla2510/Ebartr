import axios from "axios";
import MessageSection from "./Components/Message/messageRender";
import LoginSignup from "./Components/LoginSignup/loginSignupRender";
import Form from "./Components/sellapp/sellapp";
import React, {useState, useEffect} from "react";
import {useContext} from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Cardsdata from "./Components/cards/RenderCards";
import ItemDetailsPage from "./Components/Itemdetails/Itemdetails";
import { UserContext } from "./Components/Message/UserContext";
// import logo from "./logo.svg";
// import Footer from "./Components/footer/Render Code/RenderFooter";
import Header from "./Components/Header/Render Code/RenderHeader";
// import ProductSection from "./Components/ProductSection/Render code/RenderProduct";

function App() {
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

  // const {username, id} = useContext(UserContext);
  axios.defaults.baseURL = "http://localhost:4040";
  axios.defaults.withCredentials = true; //used to send cookie from server

  if(username){
  return (

<Router>
      <div>
        {/* <Header /> */}
        <Routes>
          <Route exact path="/" element={<Cardsdata />} />
          {/* <Route exact path="/product" element={<ProductSection />} /> */}
          <Route path="/loginsignup" element={<LoginSignup />} />
          <Route exact path="/message" element={<MessageSection />} />
          <Route path="/sell" element={<Form />} />
          <Route exact path="/card/:collection/:itemId" element={<ItemDetailsPage />} />
        </Routes>
        {/* <Footer /> */}
      </div>
    </Router>
  );
  }
  return (
  <LoginSignup />
  );
}

export default App;