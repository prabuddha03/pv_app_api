const User = require('../models/User');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

exports.intoPaymentTrue = catchAsync(async(req, res, next)=>{
    const { userId } = req.body;
    const user = await User.findById(userId);
    user.intoPayment = true;
    await user.save();
    res.status(200).json({
      status: 'success',
      data: {
        user,
      },
    })
  })

  exports.intoPaymentFalse = catchAsync(async(req, res, next)=>{
    const { userId } = req.body;
    const user = await User.findById(userId);
    user.intoPayment = false;
    await user.save();
    res.status(200).json({
      status: 'success',
      data: {
        user,
      },
    })
  })
