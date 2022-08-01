const List = require('../models/ListModel')


async function createNoteRecord(noteData){
    const list = new List(noteData)
    const createdNote = await list.save()
    console.log('createNoteRecord', createdNote)    
}


async function getAllLists(userId){
    return await List.find({ownerId: userId})
    
}

module.exports = {createNoteRecord, getAllLists}

