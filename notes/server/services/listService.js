const List = require('../models/ListModel')

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

async function addNote(noteId, listId) {
  const list = await List.findOne({ _id: listId })
  list.notes.push(noteId)
  list.save()
}

module.exports = { createListRecord, getAllLists, addNote, updateListTitle }
