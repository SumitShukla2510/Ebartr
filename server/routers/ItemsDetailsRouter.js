const express = require('express');
const router = express.Router();
const { MongoClient, ObjectId } = require('mongodb');
const Item = require('../models/Item');
const dotenv = require("dotenv");
dotenv.config();

// Connect to MongoDB Atlas
const mongoUrl = process.env.MONGO_URL;
const dbName = 'Ebartr';

router.get('/:collection/:itemId', async (req, res) => {
  const itemId = req.params.itemId;
  const collectionName=req.params.collection;
  // console.log(collectionName);
  let client = null;

  try {
    
    client = await MongoClient.connect(mongoUrl, { useUnifiedTopology: true });
    const db = client.db(dbName);
    // console.log(itemId);
 
    //const collections = await db.collections();
    let item = null;
    const collection = db.collection(collectionName);
    // console.log(collection);

    item = await collection.findOne({ _id: new ObjectId(itemId) });

    // for (const collection of collections) {
    //   item = await collection.findOne({ _id: itemId });
    //   if (item) break;
    // }
    //console.log(item);
    if (!item) {
      return res.status(404).json({ error: 'Item not found' });
    }
    
    res.json(item);
  } catch (error) {
    console.log('Error connecting to MongoDB:', error);
    res.status(500).json({ error: 'Server error' });
  } finally {
    if (client) {
      client.close();
    }
  }
});

module.exports = router;