const checkMillionDollarIdea = (req, res, next) => {
    let { numWeeks, weeklyRevenue } = req.body;
    if (!numWeeks || !weeklyRevenue) {
        return res.status(400).send();
    }
    numWeeks = Number(numWeeks);
    weeklyRevenue = Number(weeklyRevenue);
    if (isNaN(numWeeks) || isNaN(weeklyRevenue)) {
        console.log('this should be working');
        return res.status(400).send();
    }
    const totalValue = numWeeks * weeklyRevenue;
    if (totalValue < 1000000) {
        return res.status(400).send();
    }
    next();
};

// Leave this exports assignment so that the function can be used elsewhere
module.exports = checkMillionDollarIdea;
