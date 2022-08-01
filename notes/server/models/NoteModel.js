const {Schema, model} = require('mongoose');

const noteSchema = new Schema({
    listName: {type: String, required: true},
    noteTitle: {type: String, required:true},
    noteContent: {type: String, required: true},
    // userNotes: [{type: Schema.Types.ObjectId, ref: 'Note'}]

})

module.exports = model('Note', noteSchema)