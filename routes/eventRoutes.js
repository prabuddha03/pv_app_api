const express = require('express');
const router = express.Router();

const eventController = require("../controllers/eventController");

router.get('/',eventController.getAllEvents)
router.post('/', eventController.createEvent)
router.get('/:id', eventController.getEvent)
router.delete('/:id', eventController.deleteEvent)
router.patch('/:id',eventController.updateEvent)

module.exports = router;