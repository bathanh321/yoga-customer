const mongoose = require('mongoose');

const ClassSchema = new mongoose.Schema({
    teacherName: { 
        type: String, 
        required: true 
    },
    description: { 
        type: String, 
        required: false 
    },
    date: { 
        type: Date, 
        required: true 
    },
    duration: { 
        type: Number, 
        required: true 
    },
    capacity: { 
        type: Number, 
        required: true 
    },
    participants: [{ 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User' 
    }],
    yogaCourseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'YogaCourse',
        required: true
    }

});

module.exports = mongoose.model('Class', ClassSchema);
