const Meal = require('../models/Meal');
const factory = require('./handlerFactory');
const catchAsync = require('../utils/catchAsync');

exports.createMeal = factory.createOne(Meal);
exports.getMeal = factory.getOne(Meal);
exports.updateMeal = factory.updateOne(Meal);
exports.deleteMeal = factory.deleteOne(Meal);

exports.getAllMeals = factory.getAll(Meal);

exports.getMealByDay = catchAsync(async (req, res, next) => {
    const { eventDayID } = req.body || req.params;
    if (!eventDayID) {
        return res.status(400).json({ success: false, message: "dayID is required." });
    }
    const meal = await Meal.find({ eventDayID }).populate('items').exec();
    res.status(200).json({
         success: true, 
         data: meal 
    });
  });


exports.getMealWithItems = catchAsync(async (req, res) => {
          const { mealId } = req.params;
          const meal = await Meal.findById(mealId)
              .populate('items') 
              .exec();
  
          if (!meal) {
              return res.status(404).json({ message: 'Meal not found' });
          }
  
          res.status(200).json(meal);

          console.error('Error fetching meal with items:', error);
          res.status(500).json({ message: 'Internal server error' });

  });
  