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
    isValidMinion
} = require('./db');

apiRouter.get('/minions', (req, res, next) => {
    const minions = getAllFromDatabase('minions');
    res.status(200).send(minions);
    next();
})

apiRouter.get('/minions/:minionId', (req, res, next) => {
    const id = req.params.minionId;
    const minion = getFromDatabaseById('minions', id);
    if (minion === undefined) {
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
        salary: Number(salary)
    }

    if (!name) {
        return res.status(400).send();
    } else {
        console.log(newMinion);
        addToDatabase('minions', newMinion);
        res.status(201).send(newMinion);
        next();
    }
    
})

apiRouter.put('/minions/:minionId', (req, res, next) => {
    const { id, name, title, weaknesses, salary } = req.body;
    const updatedMinion = {
        id: id,
        name: name,
        title: title,
        weaknesses: weaknesses,
        salary: Number(salary)
    }
    const minionIndex = getFromDatabaseById('minions', id);
    if (minionIndex === undefined) {
        return res.status(404).send('Not Found');
    }
    updateInstanceInDatabase('minions', updatedMinion);
    res.status(200).send(updatedMinion);
})

apiRouter.delete('/minions/:minionId', (req, res, next) => {
    const deleteId = req.params.minionId;
    const minionIndex = getFromDatabaseById('minions', deleteId);
    if (minionIndex === undefined) {
        return res.status(404).send('Not Found');
    }
    deleteFromDatabasebyId('minions', deleteId);
    res.status(204).send('No Content');
})

apiRouter.get('/ideas', (req, res, next) => {
    const ideas = getAllFromDatabase('ideas');
    res.status(200).send(ideas);
})

apiRouter.get('/ideas/:ideaId', (req, res, next) => {
    const id = req.params.ideaId;
    const idea = getFromDatabaseById('ideas', id);
    if (idea === undefined) {
        return res.status(404).send();
    } else {
        res.status(200).send(idea);
        next();
    }
})

apiRouter.post('/ideas', (req, res, next) => {
    const { name, description, numWeeks, weeklyRevenue } = req.body;
    const newIdea = {
        name: name,
        description: description,
        numWeeks: Number(numWeeks),
        weeklyRevenue: Number(weeklyRevenue)
    }

    if (!name || !numWeeks || !weeklyRevenue) {
        return res.status(400).send();
    } else {
        console.log(newIdea);
        addToDatabase('ideas', newIdea);
        res.status(201).send(newIdea);
        next();
    }  
})

apiRouter.put('/ideas/:ideaId', (req, res, next) => {
    const { name, description, numWeeks, weeklyRevenue } = req.body;
    const updatedIdea = {
        description: description,
        id: req.params.ideaId,
        name: name,
        numWeeks: Number(numWeeks),
        weeklyRevenue: Number(weeklyRevenue)
    }
    const ideaIndex = getFromDatabaseById('ideas', req.params.ideaId);
    if (ideaIndex === undefined) {
        return res.status(404).send('Not Found');
    }
    updateInstanceInDatabase('ideas', updatedIdea);
    res.status(200).send(updatedIdea);
})

apiRouter.delete('/ideas/:ideaId', (req, res, next) => {
    const deleteId = req.params.ideaId;
    const deleteIdea = getFromDatabaseById('ideas', deleteId);
    if (deleteIdea === undefined) {
        return res.status(404).send('Not Found');
    } else {
    deleteFromDatabasebyId('ideas', deleteId);
    res.status(204).send();
    }
})

apiRouter.get('/meetings', (req, res, next) => {
    const meetings = getAllFromDatabase('meetings');
    res.status(200).send(meetings);
})

apiRouter.post('/meetings', (req, res, next) => {
    const newMeeting = createMeeting();
    addToDatabase('meetings', newMeeting);
    res.status(201).send(newMeeting);
});

apiRouter.delete('/meetings', (req, res, next) => {
    deleteAllFromDatabase('meetings');
    res.status(204).send('No Content');
})


module.exports = apiRouter;
