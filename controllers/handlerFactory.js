const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");


exports.deleteOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndDelete(req.params.id);

    if (!doc) {
      return next(new AppError("No document found with that ID", 404));
    }

    res.status(204).json({
      status: "success",
      data: null,
    });
  });

exports.updateOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findById(req.params.id);

    // Proceed with the update if the user is authorized
    const updatedDoc = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedDoc) {
      return next(new AppError('No document found with that ID', 404));
    }


    res.status(200).json({
      status: "success",
      data: {
        data: doc,
      },
    });
  });

exports.createOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.create(req.body);
    res.status(201).json({
      status: "success",
      data: {
        data: doc,
      },
    });
  });

exports.getOne = (Model) =>
  catchAsync(async (req, res, next) => {
    let query = Model.findById(req.params.id);
    const doc = await query;

    if (!doc) {
      return next(new AppError("No document found with that ID", 404));
    }

    res.status(200).json({
      status: "success",
      data: {
        data: doc,
      },
    });
  });

  exports.getAll = (Model) =>
    catchAsync(async (req, res, next) => {

      let query = Model.find();
  
      // If filters are provided, apply them (e.g., ?field=value)
      if (req.query.filter) {
        query = query.find(JSON.parse(req.query.filter));
      }
  
      // Apply sorting if provided (e.g., ?sort=field,-anotherField)
      if (req.query.sort) {
        const sortBy = req.query.sort.split(',').join(' ');
        query = query.sort(sortBy);
      } else {
        query = query.sort('-createdAt'); // Default sorting by creation date
      }
  
      // Pagination (e.g., ?page=1&limit=10)
      const page = parseInt(req.query.page, 10) || 1;
      const limit = parseInt(req.query.limit, 10) || 10;
      const skip = (page - 1) * limit;
  
      query = query.skip(skip).limit(limit);
  
      // Execute query
      const docs = await query;
  
      // Send response
      res.status(200).json({
        status: "success",
        results: docs.length,
        data: {
          data: docs,
        },
      });
    });
  