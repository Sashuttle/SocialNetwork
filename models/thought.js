//importing necessary modules from mongoose
const { Schema, model, Types } = require('mongoose');

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
        }
    },
);

//schema for thoughts
const ThhoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: 'A thought is required!',
            minlength: 1,
            maxlength: 350,
        },

        createdOn: {
            type: Date,
            default: Date.now
        },

        reactions: [ReactionSchema],
    },
);

//property for counting number of reactions
ThoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.length;
});

//creating the thought model using the thoughtschema
const Thought = model('Thought', ThoughtSchema);

//exporting thought model
module.exports = Thought;