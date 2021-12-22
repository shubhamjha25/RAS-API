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

// GET ALL PRODUCTS
router.get("/", async (req, res) => {
    const qNew = req.query.new;
    const qCategory = req.query.category;
    try {
        let items;
  
        if (qNew) {
            items = await Item.find().sort({ createdAt: -1 });
        } else if (qCategory) {
            items = await Item.find({
                categories: {
                    $in: [qCategory],
                },
            });
        } else {
            items = await Item.find();
        }
  
        res.status(200).json(items);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;