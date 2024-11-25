const Item = require('../models/Item');
const factory = require("./handlerFactory");

exports.createItem = factory.createOne(Item);
exports.getItem = factory.getOne(Item);
exports.deleteItem = factory.deleteOne(Item);
exports.updateItem = factory.updateOne(Item);

exports.getAllItems = factory.getAll(Item);