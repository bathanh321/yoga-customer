const YogaCourse = require("../models/YogaCourse");

const yogaCourseController = {
    createCourse: async (req, res) => {
        try {
            const yogaCourse = new YogaCourse(req.body);
            await yogaCourse.save();
            res.status(201).json(yogaCourse);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },

    getAllYogaCourses: async (req, res) => {
        try {
            const yogaCourses = await YogaCourse.find();
            res.status(200).json(yogaCourses);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    getYogaCourseById: async (req, res) => {
        try {
            const yogaCourse = await YogaCourse.findById(req.params.id);
            if (!yogaCourse) {
                return res.status(404).json({ message: 'Yoga course not found' });
            }
            res.status(200).json(yogaCourse);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    updateCourse: async (req, res) => {
        try {
            // Find the existing course to preserve the classes
            const existingCourse = await YogaCourse.findById(req.params.id);
            if (!existingCourse) {
                return res.status(404).json({ message: 'Yoga course not found' });
            }
    
            // Preserve the classes field
            const updatedData = { ...req.body, classes: existingCourse.classes };
    
            // Update the course with the preserved classes
            const yogaCourse = await YogaCourse.findByIdAndUpdate(req.params.id, updatedData, { new: true, runValidators: true });
            res.status(200).json(yogaCourse);
        } catch (error) {
            res.status(400).json(error);
        }
    },

    deleteYogaCourse: async (req, res) => {
        try {
            const yogaCourse = await YogaCourse.findByIdAndDelete(req.params.id);
            if (!yogaCourse) {
                return res.status(404).json({ message: 'Yoga course not found' });
            }
            res.status(200).json(yogaCourse);
        } catch (error) {
            res.status(500).json(error);
        }
    },

    search: async (req, res) => {
        try {
            const { dayOfWeek } = req.query;
            if (!dayOfWeek) {
                return res.status(400).json({ message: 'dayOfWeek query parameter is required' });
            }
            const yogaCourses = await YogaCourse.find({ dayOfWeek: dayOfWeek });
            res.status(200).json(yogaCourses);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}

module.exports = yogaCourseController;