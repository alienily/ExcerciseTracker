import * as exercises from './exercise_model.mjs';
import express from 'express';
const app = express();
//app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));
app.use(express.json());

const PORT = 3000;

app.post('/exercises', (req, res) => {
    exercises.createExercise(
        req.body.name,
        req.body.reps, 
        req.body.weight, 
        req.body.unit, 
        req.body.date,
        )
        .then(exercise => {
            res.status(201).json(exercise);
        })
        .catch(error => {
            console.log(error);
            res.status(400).json({Error: 'Failed to create exercise'});

        });
});


app.get('/exercises', (req, res) => {
    const exerciseId = req.params.id;
    exercises.retrieveExercise(exerciseId)
        .then(exercise=> {
            res.status(201).json(exercise);
        })
        .catch(error => {
            console.log(error);
            res.status(400).json({ Error: 'Request failed' });
        })
});

//Update using PUT
app.put('/exercises/:id', (req, res) => {
    exercises.updateExercise(
        req.params.id, 
        req.body.name,
        req.body.reps,
        req.body.weight,
        req.body.unit, 
        req.body.date
    )
    .then(exercise => {
        //found so update excercise
        res.json(exercise);
    })
    .catch(error => {
        //error, sends back status code 400
        console.log(error);
        res.status(400).json({Error: 'Request to replace a document failed.'});
    });
});

//Delete by ID
app.delete('/exercises/:id', (req, res) => {
    exercises.deleteExercise(req.params.id)
    .then(deletedCount => {
        //delete one or more
        if (deletedCount === 1){
            res.status(204).send();
        } else {
            res.status(404).json({Error: 'Document not found'});
        }
    })
    .catch(error => {
        res.send({Error: 'Request Failed'});
    });

});
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
});

