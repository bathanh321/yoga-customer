const express = require('express');
const classController = require('../controllers/classController');
const router = express.Router();

router.post('/:courseId/create', classController.createClassInCourse);
router.get('/:courseId/getAll', classController.getAllClassesInCourse);
router.get('/getAll', classController.getAllClasses);
router.get('/:classId', classController.getClassById);
router.put('/:classId', classController.updateClass);
router.delete('/:classId', classController.deleteClassById);
router.post('/search', classController.searchClasses);

module.exports = router;