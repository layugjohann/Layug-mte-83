const Workout = require("../models/Workout");
const bcrypt = require("bcrypt");
const auth = require("../auth");

const { errorHandler }  = require("../auth");

module.exports.addWorkout = (req, res) => {

	const { name, duration } = req.body;
	const userId = req.user.id;

	if (!name || !duration)
		return res.status(400).send({ error: "All fields are required" });

	return Workout.create({ name, duration, userId })
		.then(workout => res.status(201).send({
			success: true,
			message: "Workout added successfully",
			workout
		}))
		.catch(error => errorHandler(error, req, res));
};


module.exports.getMyWorkouts = (req, res) => {

	const { userId } = req.user.id;

	return Workout.find({ userId })
	.then(workouts => {
		if (workouts.length === 0) {
			throw { status: 404, message: "No workouts found" };
		}

		return res.status(200).json({
			success: true,
			workouts
		});
	})
	.catch(error => errorHandler(error, req, res));

};


module.exports.updateWorkout = (req, res) => {

	const userId = req.user.id;
	const { name, duration } = req.body;
	const { workoutId } = req.params;

	if (!name || !duration) {
		return res.status(400).send({
			error: "All fields are required"
		});
	}

	return Workout.findByIdAndUpdate(
		workoutId,
		{
			name,
			duration
		},
		{ new: true }
	)
	.then(result => {
		if (!result) {
			throw { status: 404, message: "No workout found" };
		}

		return res.status(200).send({
			success: true,
			message: "Workout updated successfully",
			result
		});
	})
	.catch(error => errorHandler(error, req, res));

};


module.exports.completeWorkoutStatus = (req, res) => {
    
    const { workoutId } = req.params;

    if (!workoutId) {
        return res.status(400).send({ error: "Workout ID must be provided"});
    }

    return Workout.findById(workoutId)
    .then(workout => {
        if (!workout) {
            throw { status: 404, message: "Workout not found"};
        }

        if (workout.status === "completed") {
            throw { status: 400, message: "Workout is already completed"};
        }

        workout.status = "completed";
        return workout.save();
    })

    .then(updatedWorkout => res.status(200).send({
        success: true,
        message: "Workout done",
        updatedWorkout
    }))
    .catch(error => errorHandler(error, req, res));

}

module.exports.deleteWorkout = (req, res) => {

    const { workoutId } = req.params;
    const userId = req.user.id;

    if (!workoutId) {
        return res.status(400).send({ error: "Workout ID must be provided"});
    }

    return Workout.findByIdAndDelete(workoutId)
    .then(workout => {
        if (!workout) {
            throw { status: 404, message: "Workout already deleted"};
        }

        return res.status(200).send({
            success: true,
            message: "Workout successfully deleted"
        });
    })
    .catch(error => errorHandler(error, req, res));
}

















