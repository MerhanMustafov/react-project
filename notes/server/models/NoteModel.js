const {Schema, model} = require('mongoose');

const noteSchema = new Schema({
    text: {type: String, required: true},
    listId: {type: String, required: true},
    title: {type: String, required: true}
})

module.exports = model('Note', noteSchema)