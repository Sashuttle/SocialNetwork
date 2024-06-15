//import modules from mongoose
const { Schema, model } = require('mongoose');

//schema for user model
const UserSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            trim: true,
            required: 'Username is required in order to continue',
        },

        email: {
            type: String,
            unique: true,
            trim: true,
            required: 'Username is required in order to continue',
            match: [/.+@.+\..+/],
        },

        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Thought',
            },
        ],

        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User',
            },
        ],
    },
    
    {
        toJSON: {
            virtuals: true,
        },
        id: false,
    }
);

//property for counting the number of friends
UserSchema.virtual('friendCount').get(function () {
    return this.friends.length;
});

//creating the user model using userschema
const User = model('User', UserSchema);

//exporting user model
module.exports = User;