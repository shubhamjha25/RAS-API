const Item = require('../models/Item');
const { verifyTokenAndAuthorization, verifyTokenAndAdmin } = require('../middlewares/verifyToken');

const router = require('express').Router();

// ADD ITEM (ONLY ADMIN)
router.post("/", verifyTokenAndAdmin, async (req, res) => {
    const newItem = new Item(req.body);
  
    try {
        const savedItem = await newItem.save();
        res.status(200).json(savedItem);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;