const express = require("express");
const router = express.Router();
const { MongoClient, ObjectId } = require('mongodb');
const dotenv = require("dotenv");
dotenv.config();
const mongoUrl = process.env.MONGO_URL;
const dbName = 'Ebartr';
router.get("/:collection/:id", async (req, res) => {
  const itemId = req.params.id;
  const collectionName = req.params.collection;
  let client=null;
  try {
    client = await MongoClient.connect(mongoUrl, { useUnifiedTopology: true });
    const db = client.db(dbName);
    const collection = db.collection(collectionName);
    item = await collection.findOne({ _id: new ObjectId(itemId) });

    if (!item) {
      return res.status(404).json({ error: "Image not found" });
    }

    const imageUrl = `data:${item.image.contentType};base64,${item.image.data.toString('base64')}`;
    res.set('Content-Type', item.image.contentType);
    res.json({ imageUrl });
  
  } catch (error) {
    console.log("Error fetching image URL:", error);
    res.status(500).json({ error: "Internal server error" });
  }finally {
    if (client) {
      client.close();
    }
  }
});

module.exports = router;
