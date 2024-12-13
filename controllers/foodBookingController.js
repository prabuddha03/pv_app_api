const FoodBooking = require("../models/FoodBooking");
const mongoose = require('mongoose');
const Meal = require("../models/Meal");
const factory = require("./handlerFactory");
const catchAsync = require("../utils/catchAsync");


exports.createFoodBooking = factory.createOne(FoodBooking);
//exports.getFoodBooking = factory.getOne(FoodBooking);
exports.deleteFoodBooking = factory.deleteOne(FoodBooking);
exports.getAllFoodBookings = factory.getAll(FoodBooking);
exports.updateFoodBooking = factory.updateOne(FoodBooking);

exports.getFoodBookingByUser = catchAsync(async (req, res, next) => {
  const { userId } = req.body || req.params;
  if (!userId) {
    return res.status(403).json({ success: false, message: "Login first" });
  }
  const bookingByUser = await FoodBooking.find({ userId })
    .populate({
      path: "eventId",
      select: "eventName endDate",
    })
    .populate({
      path: "eventDayId",
      select: "dayName",
    });

  res.status(200).json({
    status: "success",
    results: bookingByUser.length,
    data: {
      bookingByUser,
    },
  });
});

exports.getFoodBookingByDay = catchAsync(async (req, res, next) => {
  const { eventDayId } = req.body;
  const foodBookingByDay = await FoodBooking.find({ eventDayId }).populate({
    path: "userId",
    select: "userName name",
  });
  res.status(200).json({
    results: foodBookingByDay.length,
    status: "success",
    data: {
      foodBookingByDay,
    },
  });
});
exports.getBooking = async (req, res, next) => {
  try {
    const { bookingId } = req.body || req.params;
    const booking = await FoodBooking.findById(bookingId)
      .populate({
        path: "userId",
        select: "userName",
      })
      .populate({
        path: "eventId",
        select: "eventName endDate",
      })
      .populate({
        path: "eventDayId",
        select: "dayName",
      });

    if (!booking) {
      return res.status(404).json({
        status: "fail",
        message: "No booking found with that ID",
      });
    }

    res.status(200).json({
      status: "success",
      data: booking,
    });
  } catch (err) {
    next(err);
  }
};

exports.getEventDayBookingDetails = async (req, res) => {
  try {
      const { eventDayId } = req.params;

      const eventDayObjectId = new mongoose.Types.ObjectId(eventDayId);

      const bookingAggregation = await FoodBooking.aggregate([
          // Stage 1: Match bookings for specific event day
          { 
              $match: { 
                  eventDayId: eventDayObjectId 
              } 
          },

          // Stage 2: Unwind cart items
          { 
              $unwind: {
                  path: '$cartItems',
                  preserveNullAndEmptyArrays: false
              } 
          },

          // Stage 3: Lookup Meal Details
          {
              $lookup: {
                  from: 'meals', // Verify this matches your actual MongoDB collection name
                  localField: 'cartItems.meal',
                  foreignField: '_id',
                  as: 'mealDetails'
              }
          },

          // Stage 4: Unwind Meal Details
          {
              $unwind: {
                  path: '$mealDetails',
                  preserveNullAndEmptyArrays: false
              }
          },

          // Stage 5: Group and Aggregate
          {
              $group: {
                  _id: null,
                  totalBookings: { $sum: 1 },
                  totalAmount: { $sum: '$totalAmount' },
                  mealBreakdown: {
                      $push: {
                          mealId: '$cartItems.meal',
                          mealName: '$mealDetails.mealName',
                          mealType: '$mealDetails.mealType',
                          mealCategory: '$mealDetails.mealCategory',
                          quantity: '$cartItems.quantity',
                          mealPrice: '$mealDetails.price'
                      }
                  }
              }
          }
      ]);

      console.log('Booking Aggregation Raw Result10:', 
          JSON.stringify(bookingAggregation, null, 2)
      );

      if (bookingAggregation.length === 0) {

          const bookingCount = await FoodBooking.countDocuments({ 
              eventDayId: eventDayObjectId 
          });
          const sampleBooking = await FoodBooking.findOne({ 
              eventDayId: eventDayObjectId 
          }).lean();

          console.log('Booking Count for this EventDay11:', bookingCount);
          console.log('Sample Booking12:', JSON.stringify(sampleBooking, null, 2));


          if (sampleBooking) {
              const mealIds = sampleBooking.cartItems.map(item => item.meal);
              console.log("111111:", mealIds)
              const mealCheck = await Meal.find({ 
                  _id: { $in: mealIds } 
              })
              
              console.log('Meal Existence Check:', JSON.stringify(mealCheck, null, 2));
          }
      }

      const result = bookingAggregation[0] || {
          totalBookings: 0,
          totalAmount: 0,
          mealBreakdown: []
      };


      const mealCategories = {
          veg: result.mealBreakdown.filter(m => m.mealCategory === 'veg')
              .reduce((sum, m) => sum + m.quantity, 0),
          nonVeg: result.mealBreakdown.filter(m => m.mealCategory === 'non-veg')
              .reduce((sum, m) => sum + m.quantity, 0),
          vegan: result.mealBreakdown.filter(m => m.mealCategory === 'vegan')
              .reduce((sum, m) => sum + m.quantity, 0)
      };

      const mealCountById = result.mealBreakdown.reduce((acc, meal) => {
          const mealIdString = meal.mealId.toString();
          acc[mealIdString] = (acc[mealIdString] || 0) + meal.quantity;
          return acc;
      }, {});


      const response = {
          totalBookings: result.totalBookings || 0,
          totalAmount: result.totalAmount || 0,
          mealCountById,
          mealCategories,
          detailedMealBreakdown: result.mealBreakdown || []
      };

      console.log('Final Response:', JSON.stringify(response, null, 2));

      res.status(200).json(response);
  } catch (error) {
      console.error('Comprehensive Error in Booking Details:', error);
      res.status(500).json({ 
          message: 'Detailed Error Fetching Booking Details', 
          error: error.message,
          stack: error.stack
      });
  }
};
