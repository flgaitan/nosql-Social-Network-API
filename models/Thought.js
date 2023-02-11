const { Schema, model } = require('mongoose');

// Schema to create User model
const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            minLength: 1,
            maxLength: 280
        },
        createdAt: {
            type: Date,
            default: Date.now,
            //get: timeStamp => format timestamp method    
        },
        username: {
            type: String,
            required: true,
        },
        // reactions: [
        //     reactionSchema
        // ]
    },
    {
        // Mongoose supports two Schema options to transform Objects after querying MongoDb: toJSON and toObject.
        // Here we are indicating that we want virtuals to be included with our response, overriding the default behavior
        toJSON: {
            virtuals: true,
        },
        id: false,
    }
);

// Create a virtual property `fullName` that gets and sets the user's full name
// userSchema
//     .virtual('fullName')
//     // Getter
//     .get(function () {
//         return `${this.first} ${this.last}`;
//     })
//     // Setter to set the first and last name
//     .set(function (v) {
//         const first = v.split(' ')[0];
//         const last = v.split(' ')[1];
//         this.set({ first, last });
//     });

// Initialize our User model
const Thought = model('Thought', thoughtSchema);

module.exports = Thought;
