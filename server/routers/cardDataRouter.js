const express = require("express");
const { MongoClient } = require("mongodb");
const router = express.Router();
const dotenv = require("dotenv");
dotenv.config();

const url = process.env.MONGO_URL;
const dbName = "Ebartr";

// Endpoint to fetch the cards data
router.get("/cardsdata", async (req, res) => {
  try {
    const searchTerm = req.query.search;

    const client = await MongoClient.connect(url);
    const db = client.db(dbName);

    let cardsData = [];
    let combinedarray=[];
    if (searchTerm) {
      const collection = db.collection(searchTerm);
      cardsData = await collection.find().toArray();
    } else {
      // Get the list of collection names in the database
      const collections = await db.listCollections().toArray();
      
      // Iterate through each collection and fetch data
      for (const collectionInfo of collections) {
        const collectionName = collectionInfo.name;
        const collectionData = await db.collection(collectionName).find().toArray();
        combinedarray=combinedarray.concat(collectionData);
      }
      cardsData=combinedarray;
    }

    client.close();
    res.json(cardsData);
  } catch (error) {
    console.error("Error fetching cards data:", error);
    res.status(500).json({ error: "Failed to retrieve cards data" });
  }
});

module.exports = router;
