const Note = require('../models/NoteModel')
const List = require('../models/ListModel')

async function createNoteRecord(noteData) {
  const note = new Note(noteData)
  const created = await note.save()

  await addNote(created._id, created.listid)
  return created

  
  async function addNote(noteId, listId) {
    const list = await List.findOne({ _id: listId })
    list.notes.push(noteId)
    list.save()
  }
}

async function updateNoteRecord(newData, noteId) {
  const note = await Note.findOneAndUpdate({ _id: noteId }, newData)
}

module.exports = { createNoteRecord, updateNoteRecord }
