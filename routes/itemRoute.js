const express = require('express');
const router = express.Router();

const itemController = require('../controllers/itemController');

router.get('/', itemController.getAllItems);
router.post('/', itemController.createItem);
router.get('/:id', itemController.getItem);
router.patch('/:id', itemController.updateItem);

router.delete('/:id', itemController.deleteItem);