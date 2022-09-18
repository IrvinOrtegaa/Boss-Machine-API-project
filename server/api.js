const express = require('express');
const apiRouter = express.Router();
const {
    createMeeting,
    getAllFromDatabase,
    getFromDatabaseById,
    addToDatabase,
    updateInstanceInDatabase,
    deleteFromDatabasebyId,
    deleteAllFromDatabase,
} = require('./db');

apiRouter.get('/minions', (req, res, next) => {
    const minions = getAllFromDatabase('minions');
    res.status(200).send(minions);
    next();
})

apiRouter.get('/minions/:minionId', (req, res, next) => {
    const id = req.params.minionId;
    const minion = getFromDatabaseById('minions', id);
    if (minion === null) {
        return res.status(404).send();
    } else {
        res.status(200).send(minion);
        next();
    }
})

apiRouter.post('/minions', (req, res, next) => {
    const { name, title, weaknesses, salary } = req.body;
    const newMinion = {
        name: name,
        title: title,
        weaknesses: weaknesses,
        salary: parseFloat(salary.replace(/,/g, ''))
    }

    if (!name || !title || !weaknesses || !salary) {
        return res.status(400).send();
    } else {
        console.log(newMinion);
        addToDatabase('minions', newMinion);
        res.status(201).send(newMinion);
        next();
    }
    
})

apiRouter.get('/ideas', (req, res, next) => {
    const ideas = getAllFromDatabase('ideas');
    res.status(200).send(ideas);
})

apiRouter.get('/ideas/:ideaId', (req, res, next) => {
    const id = req.params.ideaId;
    const idea = getFromDatabaseById('ideas', id);
    if (idea === null) {
        return res.status(404).send();
    } else {
        res.status(200).send(idea);
        next();
    }
})

apiRouter.get('/meetings', (req, res, next) => {
    const meetings = getAllFromDatabase('meetings');
    res.status(200).send(meetings);
})



module.exports = apiRouter;
