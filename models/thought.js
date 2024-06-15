//importing necessary modules from mongoose
const { Schema, model, Types } = require('mongoose');
//decided on adding a dateformat since a lot of social media platforms use timestamps
const dateFormat = require('../utils/dateFormat');

//schema for reactions
const ReactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId(),
        },

        reactionBody: {
            type: String,
            required: true,
            maxlength: 300,
        },

        username: {
            type: String,
            required: true,
        },

        createdOn: {
            type: Date,
            default: Date.now,
            get: (timestamp) => dateFormat(timestamp),
        },
    },

    {
        toJSON: {
            getters: true,
        },
        id: false,
    }
);

//schema for thoughts
const ThoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: 'A thought is required!',
            minlength: 1,
            maxlength: 350,
        },

        createdOn: {
            type: Date,
            default: Date.now,
            get: (timestamp) => dateFormat(timestamp),
        },

        username: {
            type: String,
            required: true,
        },

        reactions: [ReactionSchema],
    },
    {
        toJSON: {
            getters: true,
            virtuals: true,
        },
        id: false,
    }
);

//property for counting number of reactions
ThoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.length;
});

//creating the thought model using the thoughtschema
const Thought = model('Thought', ThoughtSchema);

//exporting thought model
module.exports = Thought;