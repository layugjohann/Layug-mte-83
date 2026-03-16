const mongoose = require('mongoose');

const workoutSchema = new mongoose.Schema({

	userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
	
	name: {
		type: String,
		required: [true, 'Name is Required']
	},
	duration: {
		type: String,
		required: [true, 'duration is Required']
	},
	status: {
        type: String,
        enum: ["pending", "completed"],
        default: "pending"
    }

});


module.exports = mongoose.model('Workout', workoutSchema);