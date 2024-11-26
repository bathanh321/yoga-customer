const mongoose = require('mongoose');

const YogaCourseSchema = new mongoose.Schema({
    dayOfWeek: { 
        type: String, 
        required: true 
    },
    courseTime: {
        type: String,
        required: true,
    },
    pricePerClass: { 
        type: Number, 
        required: true 
    },
    classType: { 
        type: String,
        required: true 
    },
    location: { 
        type: String, 
        required: true 
    },
    classes: [{ 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Class' 
    }]
});

module.exports = mongoose.model('YogaCourse', YogaCourseSchema);
