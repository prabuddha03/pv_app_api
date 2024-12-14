const User = require('../models/User');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

exports.intoPaymentTrue = catchAsync(async(req, res, next)=>{
    const { userId } = req.body;
    const user = await User.findById(userId);
    user.intoPayment = true;
    await user.save();
    user.password = undefined; 
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
    user.password = undefined; 
    res.status(200).json({
      status: 'success',
      data: {
        user,
      },
    })
  })

  exports.getUser = catchAsync(async(req, res, next)=>{
    const { id } = req.params;
    const user = await User.findById(id);
    user.password = undefined; 
    res.status(200).json({
      status: 'success',
      data: {
        user,
      },
    })
  })

  exports.getUserByUserName = catchAsync(async(req, res, next)=>{
    const {userName} = req.body
    console.log('userName:', userName);
    const user = await User.findOne({ userName })
    res.status(200).json({
      status: 'success',
      data: {
        user,
      },
    })
  })