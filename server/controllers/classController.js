const Class = require("../models/Class");
const YogaCourse = require("../models/YogaCourse");

const classController = {
    createClassInCourse: async (req, res) => {
        try {
            const yogaCourse = await YogaCourse.findById(req.params.courseId);
            if (!yogaCourse) {
                return res.status(404).json({ message: 'Yoga course not found' });
            }
            const newClass = new Class({ ...req.body, yogaCourseId: req.params.courseId });
            await newClass.save();
            yogaCourse.classes.push(newClass._id);
            await yogaCourse.save();
            res.status(201).json(newClass);
        } catch (error) {
            res.status(400).json(error);
        }
    },

    getAllClassesInCourse: async (req, res) => {
        try {
            const yogaCourse = await YogaCourse.findById(req.params.courseId).populate('classes');
            if (!yogaCourse) {
                return res.status(404).json({ message: 'Yoga course not found' });
            }
            res.status(200).json(yogaCourse.classes);
        } catch (error) {
            res.status(500).json(error);
        }
    },

    getAllClasses: async (req, res) => {
        try {
            const classes = await Class.find();
            res.status(200).json(classes);
        } catch (error) {
            res.status(500).json(error);

        }
    },

    getClassById: async (req, res) => {
        try {
            const classInstance = await Class.findById(req.params.classId)
                .populate({
                    path: 'participants',
                    select: 'username'
                });
            if (!classInstance) {
                return res.status(404).json({ message: 'Class not found' });
            }
            res.status(200).json(classInstance);
        } catch (error) {
            res.status(500).json(error);
        }
    },

    updateClass: async (req, res) => {
        try {
            const classInstance = await Class.findByIdAndUpdate(req.params.classId, req.body, { new: true, runValidators: true });
            if (!classInstance) {
                return res.status(404).json({ message: 'Class not found' });
            }
            res.status(200).json(classInstance);
        } catch (error) {
            res.status(400).json(error);
        }
    },

    deleteClassById: async (req, res) => {
        try {
            const classInstance = await Class.findByIdAndDelete(req.params.classId);
            if (!classInstance) {
                return res.status(404).json({ message: 'Class not found' });
            }
            await YogaCourse.findByIdAndUpdate(classInstance.yogaCourseId, { $pull: { classes: classInstance._id } });
            res.status(200).json(classInstance);
        } catch (error) {
            res.status(500).json(error);
        }
    },

    searchClasses: async (req, res) => {
        try {
            const { teacherName } = req.query;
            const classes = await Class.find({ teacherName: { $regex: new RegExp(teacherName, 'i') } });
            res.status(200).json(classes);
        } catch (error) {
            res.status(500).json(error);
        }
    },
}

module.exports = classController;