const Cart = require("../models/Cart");
const { verifyToken, verifyTokenAndAdmin } = require("../middlewares/verifyToken");

const router = require('express').Router();

// CREATE CART | ADD TO CART
router.post("/", verifyToken, async (req, res) => {
    const newCart = new Cart(req.body);

    try {
        const savedCart = await newCart.save();
        res.status(200).json(savedCart);
    } catch (err) {
        res.status(500).json(err);
  }
});

// UPDATE/EDIT/MODIFY CART
router.put("/:id", verifyToken, async (req, res) => {
    try {
        const updatedCart = await Cart.findByIdAndUpdate(
            req.params.id,
            {
                $set: req.body,
            },
            { new: true }
        );
        res.status(200).json(updatedCart);
    } catch (err) {
        res.status(500).json(err);
    }
});

// DELETE CART
router.delete("/:id", verifyToken, async (req, res) => {
    try {
        await Cart.findByIdAndDelete(req.params.id);
        res.status(200).json("Cart Has Been Deleted");
    } catch (err) {
        res.status(500).json(err);
    }
});

// GET USER CART
router.get("/find/:userId", verifyToken, async (req, res) => {
    try {
        const cart = await Cart.findOne({ userId: req.params.userId });
        res.status(200).json(cart);
    } catch (err) {
        res.status(500).json(err);
    }
});

// GET ALL CARTS (FOR ADMIN)
router.get("/", verifyTokenAndAdmin, async (req, res) => {
    try {
        const carts = await Cart.find();
        res.status(200).json(carts);
    } catch (err) {
        res.status(500).json(err);
  }
});

module.exports = router;