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

async function deleteNoteRecord(noteid, listid){
    // const list = await List.findByIdAndDelete(listid)

    const list = await List.findById(listid)
    const modified =  list.notes.filter(objId => objId.toString() !== noteid)
    list.notes = modified
    list.save()
    await Note.findByIdAndDelete(noteid)
    console.log(list.notes)
    console.log('server', list.notes[0].toString() !== noteid)

    // await Note.findByIdAndDelete(noteid)
    // for (let i = 0; i < list.notes.length; i++){
    //     if(list.notes[i].toString() === noteid){
    //         await Note.findByIdAndDelete(noteid)
    //     }
    // }
}

module.exports = { createNoteRecord, updateNoteRecord, deleteNoteRecord }
