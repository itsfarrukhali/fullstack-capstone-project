/*jshint esversion: 8 */
const express = require('express');
const router = express.Router();
const connectToDatabase = require('../models/db');
const logger = require('../logger');

// Get All Gifts
router.get('/', async (_req, res, next) => {logger.info("/called");
    try {
        // Task 1: Connect to MongoDB and store connection to db constant
        const db = await connectToDatabase();

        // Task 2: use the collection() method to retrieve the gift collection
        const collection = db.collection("gifts");

        // Task 3: Fetch all gifts using the collection.find method. Chain with toArray method to convert to JSON array
        const gifts = await collection.find({}).toArray();

        // Task 4: return the gifts using the res.json method
        res.json(gifts)
    } catch (e) {
        logger.console.error('oops something went wrong', e)
        next(e);
    }
});

router.get('/:id', async (req, res, next) => {
    try {
        const id = req.params.id;
        
        // Task 1: Connect to MongoDB and store connection to db constant
        const db = await connectToDatabase();
        
        // Task 2: Use the collection() method to retrieve the gift collection
        const collection = db.collection("gifts");
        
        // Task 3: Find a specific gift by ID using collection.findOne method
        const gift = await collection.findOne({ id: id });
        
        if (!gift) {
            return res.status(404).json({ message: 'Gift not found' });
        }
        
        res.json(gift);
    } catch (e) {
        next(e);
    }
});

module.exports = router;



// Add a new gift
router.post('/', async (req, res, next) => {
    try {
        const db = await connectToDatabase();
        const collection = db.collection("gifts");
        const gift = await collection.insertOne(req.body);

        res.status(201).json(gift.ops[0]);
    } catch (e) {
        next(e);
    }
});

module.exports = router;
