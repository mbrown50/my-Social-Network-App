const { Schema, model } = require('mongoose');

// Create a virtual called friendCount that retrieves the length of the user's friends array field on query.

// Schema to create User model
const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            // unique
            // trimmed
        },
        email: {
            type: String,
            required: true,
            // Unique
            // Must match a valid email address (look into Mongoose's matching validation)
        },
        /*
        thoughts: {
            // Array of _id values referencing the Thought model
        },
        friends: {
            // Array of _id values referencing the User model (self-reference)
        },
        */
    }
);

const User = model('user', userSchema);

module.exports = User;
