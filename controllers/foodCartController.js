const FoodCart = require("../models/FoodCart");
const catchAsync = require("../utils/catchAsync");
const factory = require('./handlerFactory');
const Meal = require('../models/Meal');
const AppError = require('../utils/appError');


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

exports.incrementItemQuantity = catchAsync(async (req, res, next) => {

    const { userId, mealId } = req.body;
    const cart = await FoodCart.findOne({ user: userId });
    if (!cart) {
        return next(new AppError('Cart not found for user.', 404));
    }

    const item = cart.cartItems.find(item => item.meal.toString() === mealId);
    if (!item) {
        return next(new AppError('Item not found in cart.', 404));
    }

    const meal = await Meal.findById(mealId);
    if (!meal) {
        return next(new AppError('Meal not found.', 404));
    }

    item.quantity += 1;
    cart.totalAmount += meal.price;

    await cart.save();
    res.status(200).json({ status: 'success', data: cart });
});

exports.decrementItemQuantity = catchAsync(async (req, res, next) => {
    const { userId, mealId } = req.body;
    const cart = await FoodCart.findOne({ user: userId });
    if (!cart) {
        return next(new AppError('Cart not found for user.', 404));
    }
    const item = cart.cartItems.find(item => item.meal.toString() === mealId);
    if (!item) {
        return next(new AppError('Item not found in cart.', 404));
    }

    const meal = await Meal.findById(mealId);
    if (!meal) {
        return next(new AppError('Meal not found.', 404));
    }

    if (item.quantity <= 1) {
        return next(new AppError('Quantity cannot be less than 1. Use remove instead.', 400));
    }

    item.quantity -= 1;
    cart.totalAmount -= meal.price;

    await cart.save();
    res.status(200).json({ status: 'success', data: cart });
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