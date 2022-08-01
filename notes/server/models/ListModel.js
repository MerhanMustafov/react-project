const {Schema, model} = require('mongoose');

const listSchema = new Schema({
    listName: {type: String, required: true},
    ownerId: {type: String, required: true},
    notes: [{type: Schema.Types.ObjectId, ref: 'Note'}],
    // userNotes: [{type: Schema.Types.ObjectId, ref: 'Note'}]

})

module.exports = model('List', listSchema)