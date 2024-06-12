//Importing thought and user models
const { Thought, User } = require('../models');

//controller object containing methods to handle different routes for thoughts
const thoughtController = {
    //get all thoughts
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

    //get throught by its id
    getThoughtById({ params }, res) {
        Thought.findOne({_id: params.id})
            .populate({
                path: 'reactions',
                select: '-_v',
            })
            .select('-_v')
            .then((dbThoughtData) => {
                if (!dbThoughtData) {
                    return res.status(404).json({ message: 'No thought was found with the id provided!'});
                }
                res.json(dbThoughtData);
            })
            .catch((err) => {
                console.log(err);
                res.sendStatus(400);
            });
    },
    //create a new thought
    createThought({ params, body }, res) {
        Thought.create(body)
        .then(({ _id}) => {
            return User.findOneAndUpdate(
                { _id: body.userId },
                { $push: { thoughts: _id } },
                { new: true }
            );
        })
        .then((dbUserData) => {
            if (!dbUserData) {
                return res.status(404).json({ message: 'Thought was created, but no user associated with this id!'});
            }
            res.json({ message: 'Thought was created successfully!'});
        })
        .catch((err) => res.json(err));
    },

    //update a thought
    updateThought ({ params, body }, res) {
        Thought.findOneAndUpdate({ _id: params.id }, body, {
            new: true,
            runValidators: true,
        })
        .then((dbThoughtData) => {
            if (!dbThoughtData) {
                res.status(404).json({ message: 'No thought was found with this id!'});
                return;
            }
            res.json(dbThoughtData);
        })
        .catch((err) => res.json(err));
    },
    //delete a thought
    deleteThought({ params }, res) {
        Thought.findOneAndDelete({_id: params.id })
        .then((dbThoughtData) => {
            if(!dbThoughtData) {
                return res.status(404).json({ message: 'No Thought was found with this id!'});
            }

            return User.findOneAndUpdate(
                { thoughts: params.id },
                { $pull: { thoughts: params.id }},
                { new: true }
            );
        })
        .then((dbThoughtData) => {
            if (!dbUserData) {
                return res
                .status(404).json({ message: 'Thought was created, but no id associated with it!'});
            }
            res.json({ message: 'This thought was successfully deleted!'});
        })
        .catch((err) => res.json(err));
    },

    //adding a reaction
    addReaction({ params, bod }, res) {
        Thought.findOneAndUpdate(
            { _id: params.thoughtId },
            { $addToSet: { reactions: body }},
            { new: true, runValidators: true }
        )
        .then((dbThoughtData) => {
            if (!dbThoughtData) {
                res.status(404).json({ message: 'No thought was found with this id!'});
                return;
            }
            res.json(dbThoughtData);
        })
        .catch((err) => res.json(err));
    },

    //deleting a reaction
    deleteReaction({ params }, res) {
        Thought.findOneAndUpdate (
            { _id: params.thoughtId },
            { $pull: { reactions: { reactionId: params.reactionId }}},
            { new: true}
        )
            .then((dbThoughtData) => res.json(dbThoughtData))
            .catch ((err) => res.json(err));
        },
    };

    //export thoughtcontroller object
    module.exports = thoughtController;