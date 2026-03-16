const express = require("express");
const mongoose = require("mongoose");

const cors = require("cors");

const port = 4000;

const userRoute = require("./routes/userRoute");
const workoutRoute = require("./routes/workoutRoute");

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use(cors());

//MongoDB database
mongoose.connect("mongodb+srv://admin:admin@cluster0.mgvszn8.mongodb.net/fitness-tracker-API?appName=Cluster0", {
});

mongoose.connection.once('open', () => console.log('Now connected to MongoDB Atlas.'));

app.use("/workouts", workoutRoute);
app.use("/users", userRoute);

if(require.main === module){
    app.listen(process.env.PORT || port, () => {
        console.log(`API is now online on port ${ process.env.PORT || port }`)
    });
}

module.exports = {app,mongoose};