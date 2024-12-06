const express = require('express');
const router = express.Router();

const mealController = require ('../controllers/mealController');

router.get('/', mealController.getAllMeals);
router.post('/', mealController.createMeal);

router.get('/:id', mealController.getMeal);
router.patch('/:id', mealController.updateMeal);
router.delete('/:id', mealController.deleteMeal);

router.post('/get-meal-daywise', mealController.getMealByDay)
router.get('/:mealId/items', mealController.getMealWithItems);//redundant route

module.exports = router;