const Note = require('../models/NoteModel')


async function createNoteRecord(noteData){
    const note = new Note(noteData)
    const createdNote = await note.save()
    console.log('createNoteRecord', createdNote)    
}


async function getAllLists(userId){
    return await Note.find({ownerId: userId})
    
}

module.exports = {createNoteRecord, getAllLists}

