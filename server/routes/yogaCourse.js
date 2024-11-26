const express = require('express');
const yogaCourseController = require('../controllers/yogaCourseController');

const router = express.Router();

router.post('/create', yogaCourseController.createCourse);
router.get('/getAll', yogaCourseController.getAllYogaCourses);
router.get('/:id', yogaCourseController.getYogaCourseById);
router.put('/:id', yogaCourseController.updateCourse);
router.delete('/:id', yogaCourseController.deleteYogaCourse);
router.post('/search', yogaCourseController.search);

module.exports = router;