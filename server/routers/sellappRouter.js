const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const multer = require('multer');
const MongoClient = require('mongodb').MongoClient;
const Item = require('../models/Item');
const dotenv = require("dotenv");
dotenv.config();
const upload = multer();

const mongoUrl =
  process.env.MONGO_URL;
const dbName = 'Ebartr';

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

router.post('/sell', upload.single('image'), async (req, res) => {
  try {
    const { collectionName, description, date, position, price, contactNo,userID } = req.body;
    const image = req.file;

    const client = await MongoClient.connect(mongoUrl, { useUnifiedTopology: true });
    const db = client.db(dbName);

    const collectionExists = await db.listCollections({ name: collectionName }).hasNext();

    if (!collectionExists) {
      await db.createCollection(collectionName);
    }

    const collection = db.collection(collectionName);
    await collection.insertOne({
      description,
      date,
      position,
      price,
      contactNo,
      image: { data: image.buffer, contentType: image.mimetype },
      userID
    });

    client.close();

    res.status(200).json({ message: 'Data added successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
