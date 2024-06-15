// import models
const { User, Thought } = require('../models');

//define usercontroller to handle user related requests
const userController = {

    //retrieve all users
    getAllUser(req, res) {
        User.find({}).populate({
            path: 'friends',
            select: '-_v',
        })
        .select('-_v')
        .sort({ _id: -1 })
        .then((dbUserData) => res.json(dbUserData))
        .catch((err) => {
            console.log(err);
            res.sendStatus(400);
        });
    },

    //retrieve one user by id
    getUserById({ params }, res) {
        User.findOne({ _id: params.id }).populate({
            path: 'thoughts',
            select: '-_v',
        })
        .populate({
            path: 'friends',
            select: '-_v',
        })
        .select('-_v')
        .then((dbUserData) => {
            if (!dbUserData) {
                return res.status(404).json({ message: 'No user was found with the id provided'});
            }
            res.json(dbUserData);
        })
        .catch((err) => {
            console.log(err);
            res.sendStatus(400);
        });
    },

    //create a new user
    createUser({ body }, res) {
        User.create(body)
            .then((dbUserData) => res.json(dbUserData))
            .catch((err) => res.json(err));
    },

    //update an existing user
    updateUser({ params, body }, res) {
        User.findOneAndUpdate({ _id: params.id }, body, {
            new: true,
            runValidators: true,
        })
        .then((dbUserData) => {
            if (!dbUserData) {
                res.status(404).json ({ message: 'No user was found with the id provided'});
                return;
            }
            res.json(dbUserData);
        })
        .catch((err) => res.json(err));
    },

    //delete a user by their id
    deleteUser({ params}, res) {
        User.findOneAndDelete({ _id: params.id })
        .then((dbUserData) => {
            if (!dbUserData) {
                return res.status(404).json({ message: 'No user was found with the id provided'});
            }
            return Thought.deleteMany({ _id: { $in: dbUserData.thoughts }});
        })
        .then(() => {
            res.json({ message: 'The user and all their thoughts have been....deleted'});
        })
        .catch((err) => res.json(err));
    },

    //add a friend to a user's friend list
    addFriend ({ params}, res) {
        User.findOneAndUpdate(
            { _id: params.userId },
            { $pull: { friends: params.friendId }},
            { new: true }
        )
        .then((dbUserData) => {
            if (!dbUserData) {
                return res.status(404).json({ message: 'No user was found with the id provided'});
            }
            res.json(dbUserData);
        })
        .catch((err) => res.json(err));
    },

    //remove a friend
    deleteFriend({ params }, res) {
        User.findOneAndUpdate(
            { _id: params.userId },
            { $pull: { friends: params.friendId }},
            { new: true }
        )
        .then((dbUserData) => {
            if(!dbUserData) {
                return res.status(404).json({ message: 'No user was found with the id provided'});
            }
            res.json(dbUserData);
        })
        .catch((err) => res.json(err));
    },
};

//export model to use in other parts of applications
module.exports = userController;