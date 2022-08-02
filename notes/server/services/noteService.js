const Note = require('../models/NoteModel')
const {addNote} = require('./listService')

async function createNoteRecord(noteData){
    const note = new Note(noteData)
    const created = await note.save()
    console.log(created._id, "   ", created.listId)
    await addNote(created._id, created.listId)
    return created
}

async function updateNoteRecord(newData,noteId){
    const note = await Note.findOneAndUpdate({_id: noteId}, newData)
}

module.exports = {createNoteRecord, updateNoteRecord}