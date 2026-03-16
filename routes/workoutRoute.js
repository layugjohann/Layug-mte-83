const express = require("express");
const router = express.Router();
const workoutController = require("../controllers/workoutController");
							
const { verify, isLoggedIn} = require("../auth")


// add router here ------------------------------------

router.post("/addWorkout", verify, workoutController.addWorkout);

router.get("/getMyWorkouts", verify, workoutController.getMyWorkouts);

router.put("/:workoutId/updateWorkout", verify, workoutController.updateWorkout);

router.patch("/:workoutId/completeWorkoutStatus", verify, workoutController.completeWorkoutStatus);

router.delete("/:workoutId/deleteWorkout", verify, workoutController.deleteWorkout);


// end router here ------------------------------------



module.exports = router;