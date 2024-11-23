const EventDay = require("../models/EventDay");
const factory = require("./handlerFactory");

exports.createEventDay = factory.createOne(EventDay);
exports.getEventDay = factory.getOne(EventDay);
exports.deleteEventDay = factory.deleteOne(EventDay);
exports.getAllEventDays = factory.getAll(EventDay);
exports.updateEventDay = factory.updateOne(EventDay);