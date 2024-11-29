const express = require('express');
const router = express.Router();

const cartController = require("../controllers/foodCartController");

router.get('/:id', cartController.getCart);
router.post('/', cartController.createCart);
router.put('/:id', cartController.updateCart);
router.post('/clear/:id', cartController.clearCart);

module.exports = router;