const Workout = require('../models/Workout')
const { errorHandler } = require("../auth");

module.exports.addWorkout = (req, res) => {

	const userId = req.user.id;

	if (!req.user || !req.user.id) {
		return res.status(403).send("Access Forbidden");
	}

	console.log(req.user.id);
	const newWorkout = new Workout({
		userId: userId,
		name: req.body.name,
		duration: req.body.duration,
	})

	return newWorkout.save()
		.then(workout => {
			return res.status(201).send(workout)
		})
		.catch((err) => errorHandler(err, req, res))
};

module.exports.getMyWorkouts = (req, res) => {
	const userId = req.user.id;

	if (!userId) {
		return res.status(403).send("Access Forbidden");
	}

	Workout.find({ userId: userId })
		.then(workout => res.status(200).send({ workouts: workout }))
		.catch(err => errorHandler(err, req, res));
};


module.exports.updateWorkout = async (req, res) => {
	const { workoutId } = req.params

	console.log("workoutId", workoutId);

	return await Workout.findByIdAndUpdate(
		workoutId,
		{
			name: req.body.name,
			duration: req.body.duration,
			status: req.body.status,
		},
		{ new: true }
	)
		.then((updatedWorkout) => {
			if (updatedWorkout) {
				return res.status(200).send({
					message: "Workout updated successfully",
					updatedWorkout: updatedWorkout,
				});
			} else {
				return res.status(404).send({ message: "Workout not found" });
			}
		})
		.catch((err) => errorHandler(err, req, res));
}


module.exports.deleteWorkout = (req, res) => {
	const { workoutId } = req.params

	return Workout.findByIdAndDelete(workoutId)
		.then(workout => {
			return res.status(200).send({ message: "Workout deleted successfully" })
		})
		.catch((err) => errorHandler(err, req, res));
}

module.exports.completeWorkoutStatus = async (req, res) => {
	const { workoutId } = req.params;

	return Workout.findByIdAndUpdate(workoutId, { status: 'complete' }, { new: true })
		.then(updatedWorkout => {
			return res.status(200).send({
				message: 'Workout status updated successfully',
				updatedWorkout: updatedWorkout
			})
		})
		.catch((err) => errorHandler(err, req, res));

}