const express = require('express');
const router = express.Router();

const foodBookingController = require('../controllers/foodBookingController')

router.get('/', foodBookingController.getAllFoodBookings);
router.post('/', foodBookingController.createFoodBooking);
router.get('/:id', foodBookingController.getFoodBooking );

router.patch('/:id', foodBookingController.updateFoodBooking);
router.delete('/:id', foodBookingController.deleteFoodBooking);

router.post('/get-booking-by-user', foodBookingController.getFoodBookingByUser);
router.post('/get-all-booking-by-day', foodBookingController.getFoodBookingByDay);

router.patch('/approve-booking', foodBookingController.bookingApproval);

module.exports = router;
