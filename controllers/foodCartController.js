const FoodCart = require("../models/FoodCart");
const catchAsync = require("../utils/catchAsync");
const factory = require('./handlerFactory');

exports.createCart = factory.createOne(FoodCart);
exports.getCart = factory.getOne(FoodCart);
exports.updateCart = factory.updateOne(FoodCart);


const clearCart = (Model) => catchAsync(async(req, res, next)=>{
    const cart = await Model.findById(req.params.id);
    if (!cart) {
        return res.status(404).json({ message: 'Cart not found' });
    }
    cart.cartItems = [];
    cart.totalAmount = 0;
    
    // Save the updated cart
    await cart.save();
    
    res.status(200).json({
        message: 'Cart cleared successfully',
        cart
    });
});

exports.clearCart = clearCart(FoodCart);