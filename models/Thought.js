const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction');

// Schema to create Thought model
const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            maxlength: 280,
            minlength: 1,
        },
        username: {
            type: String,
            required: true,
        },
       reactions: [reactionSchema],
    },
    {
        toJSON: {
            getters: true, 
        },
        id: false,      
        timestamps: { createdAt: true, updatedAt: false},
    }
);

// Create a virtual called reactionCount that retrieves the length of the thought's reactions array field on query.
thoughtSchema
  .virtual('reactionCount')
  // Getter
  .get(function () {
    return this.reactions.length;
  })

// pass collection name to match and not auto pluralize
const Thought = model('thought', thoughtSchema, 'thought');

module.exports = Thought;
