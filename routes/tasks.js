const express = require('express');
const { Error } = require('mongoose');
const router = express.Router();
const Task = require('../models/Task');

router.get('/', async (req, res) => {
    try {
        const tasks = await Task.find();
        res.status(200).json( tasks );
    } catch (err) {
        res.json({ message: err });
    }
    
});

router.post('/', async (req, res) => {
    try {
        const task = await Task.create({
            text: req.body.text,
            date: req.body.date,
            objectDate: req.body.objectDate,
            reminder: req.body.reminder
        })
        res.status(200).json(task);
    } catch (err) {
        res.json({ message: err });
    }
});

router.get('/:id', async (req, res) => {
    try {
        let task = await Task.findById(req.params.id);
        res.status(200).json(task);
    } catch (err) {
        res.json({ message: err });
    }
});

router.patch('/:id', async (req, res) => {
    try {
        console.log(req.body, req.params)
        let updatedTask = await Task.findOneAndUpdate(
            { _id: req.params.id},
            { $set: { 
                text: req.body.text,
                date: req.body.date,
                objectDate: req.body.objectDate,
                reminder: req.body.reminder
            }}, 
            {
                new: true,
                upsert: true,
                setDeafultsOnInsert: true,
                useFindAndModify: false
            },
            (err, docs) => {
                if (!err) {
                    return res.json(docs);
                }
                else {
                    return res.status(500).send({message: err});
                }
            }
            );
    } catch (err) {
        res.json(err);
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const removedTask = await Task.deleteOne({ _id: req.params.id });
        res.status(200).send('It has been deleted');
    } catch (err) {
        res.json({ message: err });
    }
});

module.exports = router;