const cartController = require('../controllers/cartController');
const express = require('express');
const router = express.Router();

router.get("/", cartController.getCart);
router.post("/addToCart", cartController.addToCart);
router.delete("/deleteItem/:itemId", cartController.deleteItem);

module.exports = router;