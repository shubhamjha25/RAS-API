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

// EDIT ITEM (ONLY ADMIN)
router.put("/:id", verifyTokenAndAdmin, async (req, res) => {
    try {
        const updatedItem = await Item.findByIdAndUpdate(
            req.params.id,
            {
                $set: req.body,
            },
            { new: true }
        );
        res.status(200).json(updatedItem);
    } catch (err) {
        res.status(500).json(err);
    }
});

// GET ITEM
router.get("/find/:id", async (req, res) => {
    try {
        const item = await Item.findById(req.params.id);
        res.status(200).json(item);
    } catch (err) {
        res.status(500).json(err);
    }
});

// DELETE ITEM (ONLY ADMIN)
router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
    try {
        await Item.findByIdAndDelete(req.params.id);
        res.status(200).json("Item Deleted");
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;