const express = require("express");
const router = express.Router();

const eventDayController = require("../controllers/eventDayController");

router.get('/',eventDayController.getAllEventDays)
router.post('/', eventDayController.createEventDay)
router.get('/:id', eventDayController.getEventDay)
router.delete('/:id', eventDayController.deleteEventDay)
router.patch('/:id',eventDayController.updateEventDay)

router.get('get-day-event/:id', eventDayController.getDayByEvent)

module.exports = router;