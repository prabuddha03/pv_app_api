const Event = require("../models/Event");
const factory = require("./handlerFactory");

exports.createEvent = factory.createOne(Event);
exports.getEvent = factory.getOne(Event);
exports.deleteEvent = factory.deleteOne(Event);
exports.getAllEvents = factory.getAll(Event);
exports.updateEvent = factory.updateOne(Event);