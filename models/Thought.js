const { Schema, model } = require('mongoose');
// const assignmentSchema = require('./Assignment-schema-delete');

//Create a virtual called reactionCount that retrieves the length of the thought's reactions array field on query.

// Schema to create Thought model
const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            maxlength: 280,
            minlength: 1,
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
        username: {
            type: String,
            required: true,
        },
        /*
        reactions: { // (These are like replies)
            // Array of nested documents created with the reactionSchema
        }
        */
    },
    /*
    {
        toJSON: {
            getters: true, //Use a getter method to format the timestamp on query
        },
    }
    */
);

const Thought = model('thought', thoughtSchema);

module.exports = Thought;
