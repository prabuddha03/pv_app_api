const express = require('express');
const router = express.Router();

const cartController = require("../controllers/foodCartController");

router.get('/:id', cartController.getCart);
router.post('/', cartController.createCart);
router.put('/:id', cartController.updateCart);
router.patch('/clear/:id', cartController.clearCart);

router.post('/create-by-user', cartController.createCartForUser);
router.post('/add-to-cart', cartController.addItemToCart);


module.exports = router;