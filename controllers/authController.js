const jwt = require('jsonwebtoken');
const User = require('../models/User');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');


const signToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

  const createSendToken = (user, statusCode, res) => {
    const token = signToken(user._id);
    user.password = undefined; 
    res.status(statusCode).json({
      status: 'success',
      token,
      data: {
        user,
      },
    });
  };
  

  exports.register = catchAsync(async (req, res, next) => {
    const { userName, password } = req.body;
    if (!userName || !password) {
      return next(new AppError('Please provide username and password', 400));
    }
    const user = await User.findOne({ userName });

    if (!user) {
      return next(new AppError('User not found', 404));
    }
  
    if (user.passCheck) {
      return next(new AppError('User already registered. Please log in.', 403));
    }
  
    user.password = password; 
    user.passCheck = true;    
    await user.save();
    createSendToken(user, 200, res); 
  });
  


  exports.login = catchAsync(async (req, res, next) => {
    const { userName, password } = req.body;
  
    if (!userName || !password) {
      return next(new AppError('Please provide username and password', 400));
    }
    const user = await User.findOne({ userName }).select('+password'); 
  
    if (!user || !(await user.correctPassword(password, user.password))) {
      return next(new AppError('Incorrect username or password', 401));
    }
    createSendToken(user, 200, res); 
  });

  exports.onboarding = catchAsync(async(req, res, next)=>{
    const { id } = req.body;
    const user = await User.findById(id);
    if(user.onboarded){
      return next(new AppError('User already onboarded', 400));
    }
    user.onboarded = true;
    await user.save();
    res.status(200).json({
      status: 'success',
      data: {
        user,
      },
    })
  })

  exports.protect = catchAsync(async (req, res, next) => {
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      token = req.headers.authorization.split(' ')[1];
    }
    if (!token) {
      return next(
        new AppError('You are not logged in! Please log in to access.', 401),
      );
    }
  
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
    const currentUser = await User.findById(decoded.id);
    if (!currentUser) {
      return next(new AppError('The user no longer exists.', 401));
    }
  
    req.user = currentUser;
    next();
  });
  