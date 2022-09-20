// Get the mongoose object
import { query } from 'express';
import mongoose from 'mongoose';

// Prepare to the database movies_db in the MongoDB server running locally on port 27017
mongoose.connect(
    'mongodb+srv://alienily:Clee2010!@excercises.78daa.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
);

// Connect to to the database
const db = mongoose.connection;

// The open event is called when the database connection successfully opens
db.once('open', (err) => {
    if(err){
        res.status(500).json({error: '500: Connection to the server failed.'});
    }else{
        console.log('Successfully connected to ExcercisesLog MongoDB excercise collection using Mongoose');

    }

});

/**
 * Define the schema to represent USER: 4 properties (name, age, email, phone number)
 */
const exerciseSchema = mongoose.Schema({
    name: { type: String, required: true },
    reps: { type: Number, required: true },
    weight: { type: Number, required: true },
    unit: { type: String, required: true },
    date: { type: Date, required: true},
})

/**
 * Compile the model class from the schema. This must be done after defining the schema.
 */
const Exercises = mongoose.model("Exercises", exerciseSchema);

//Creates a new document in the collection excercise
///**
/**
 * Create a movie
 * @param {String} name
 * @param {Number} reps
 * @param {Number} weight
 * @param {String} unit
 * @param {Date} date
 * @returns A promise. Resolves to the JSON object for the document created by calling save
 */
const createExercise = async (name, reps, weight, unit, date) => {
    //call the constructor to create an instance of the model class Excercise
    const exercise = new Exercises({ name: name, reps: reps, weight: weight, unit: unit, date: date}); 
    //Call save to persis this object as a document in mongodb
    return exercise.save(); //called on an instance of the model class
}


//GET 

const retrieveExercise = async() => {
    const exercise = Exercises.find({}); 
    return exercise.exec(); //calling method exec on query object actually executes the retrival operation
}
/**
 * Update the title, year, language properties of the movie with the id value provided
 * @param {String} id 
 * @param {String} name
 * @param {Number} reps
 * @param {Number} weight
 * @param {String} unit
 * @param {Date} date
 * @returns A promise. Resolves to the number of documents modified
 */
const updateExercise = async (id, name, reps, weight, unit, date) => {
    const result = await Exercises.findOneAndUpdate({ _id: id },
        { name: name, reps: reps, weight: weight, unit: unit, date: date }, {new:true});
    return result.save();
}


/**
 * Delete
 * @param {String} id 
 * @returns A promise. Resolves to the number of documents modified
 */
const deleteExercise = async (id) => {
    const result = await Exercises.deleteOne({_id: id});
    // Return the count of deleted document. Since we called deleteOne, this will be either 0 or 1.
    return result.deletedCount;
}

export { createExercise, retrieveExercise, updateExercise, deleteExercise };