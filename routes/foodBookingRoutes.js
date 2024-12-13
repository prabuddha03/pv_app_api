const express = require('express');
const router = express.Router();

const foodBookingController = require('../controllers/foodBookingController')

router.get('/', foodBookingController.getAllFoodBookings);
router.post('/', foodBookingController.createFoodBooking);
router.post('/get-populated-booking', foodBookingController.getBooking );

router.patch('/:id', foodBookingController.updateFoodBooking);
router.delete('/:id', foodBookingController.deleteFoodBooking);

router.post('/get-by-user', foodBookingController.getFoodBookingByUser);
router.post('/get-all-by-day', foodBookingController.getFoodBookingByDay);


router.get('/event-day/:eventDayId/booking-details', foodBookingController.getEventDayBookingDetails);


module.exports = router;
