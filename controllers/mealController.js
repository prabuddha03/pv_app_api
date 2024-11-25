const Meal = require('../models/Meal');
const factory = require('./handlerFactory');

exports.createMeal = factory.createOne(Meal);
exports.getMeal = factory.getOne(Meal);
exports.updateMeal = factory.updateOne(Meal);
exports.deleteMeal = factory.deleteOne(Meal);

exports.getAllMeals = factory.getAll(Meal);