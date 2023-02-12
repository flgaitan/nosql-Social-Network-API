const { Schema, model } = require('mongoose');
const moment = require('moment');


const reactionSchema = new Schema({
    reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId()
    },
    reactionBody: {
        type: String,
        required: true,
        maxLength: 280
    },
    username: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: timeStamp => moment(timeStamp).format('MMMM Do YYYY, h:mm:ss a')   
    }
},
{
        toJSON: {
            getters: true
        },
}
);

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
            get: timeStamp => moment(timeStamp).format('MMMM Do YYYY, h:mm:ss a')   
        },
        username: {
            type: String,
            required: true,
        },
        reactions: [
            reactionSchema
        ]
    },
    {
        // Mongoose supports two Schema options to transform Objects after querying MongoDb: toJSON and toObject.
        // Here we are indicating that we want virtuals to be included with our response, overriding the default behavior
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false,
    }
);



// Initialize our User model
const Thought = model('Thought', thoughtSchema);

thoughtSchema.virtual('reactionCount').get(function(){
    return this.reactions.length
})

module.exports = Thought;
