const { Thought, User } = require('../models');

const thoughtController = {
    getAllThought(req, res) {
        Thought.find({})
        .populate({
            path: 'reactions',
            select: '-_v',
        })
        .select('-_v')
        .sort({ _id: -1 })
        .then((dbThoughtData) => res.json(dbThoughtData))
        .catch((err) => {
            console.log(err)
            res.sendStatus(400);
        });
    },
    



















}