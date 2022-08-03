const List = require('../models/ListModel')
const Note = require('../models/NoteModel')
async function createListRecord(noteData) {
  const list = new List(noteData)
  const createdNote = await list.save()
  console.log('createNoteRecord', createdNote)
}

async function getAllLists(userId) {
  return await List.find({ ownerid: userId }).populate('notes')
}

async function updateListTitle(newData, listid) {
  return await List.findOneAndUpdate({ _id: listid }, newData)
}

async function deleteList(listid) {
  const list = await List.findById(listid)

  for (let i = 0; i < list.notes.length; i++) {
    await deleteNoteRecord(list.notes[i])
  }
  await List.findByIdAndDelete(listid)

  async function deleteNoteRecord(noteid) {
    await Note.findByIdAndDelete(noteid)
  }
}

async function addNote(noteId, listId) {
  const list = await List.findOne({ _id: listId })
  list.notes.push(noteId)
  list.save()
}

module.exports = {
  createListRecord,
  getAllLists,
  addNote,
  updateListTitle,
  deleteList,
}
