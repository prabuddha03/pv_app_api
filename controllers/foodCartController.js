const FoodCart = require("../models/FoodCart");
const catchAsync = require("../utils/catchAsync");
const factory = require('./handlerFactory');
const Meal = require('../models/Meal');

exports.createCart = factory.createOne(FoodCart);
exports.getCart = factory.getOne(FoodCart);
exports.updateCart = factory.updateOne(FoodCart);

exports.createCartForUser = catchAsync(async (req, res, next) => {
        const {userId} = req.body
        const newCart = new FoodCart({ user: userId });
        await newCart.save();
        console.log('Cart created successfully for user:', userId);
        next();
});

exports.addItemToCart = catchAsync(async (req, res) => {
        const { userId, mealId, quantity } = req.body;
        const meal = await Meal.findById(mealId);
        if (!meal) {
            return res.status(404).json({ message: 'Meal not found' });
        }
        const cart = await FoodCart.findOne({ user: userId });
        if (!cart) {
            const newCart = new FoodCart({ user: userId });
            await newCart.save();
            const cart = await FoodCart.findOne({ user: userId });
        }
        const existingItem = cart.cartItems.find(item => item.meal.toString() === mealId);
        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            cart.cartItems.push({ meal: mealId, quantity });
        }
        cart.totalAmount += meal.price * quantity;
        await cart.save();
        res.status(200).json(cart);
});


const clearCart = (Model) => catchAsync(async(req, res, next)=>{
    const cart = await Model.findById(req.params.id);
    if (!cart) {
        return res.status(404).json({ message: 'Cart not found' });
    }
    cart.cartItems = [];
    cart.totalAmount = 0;
    await cart.save();
    
    res.status(200).json({
        message: 'Cart cleared successfully',
        cart
    });
});

exports.clearCart = clearCart(FoodCart);