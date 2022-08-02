const route = require('express').Router()
const {createNoteRecord, updateNoteRecord} = require('../services/noteService')
route.post('/create', async (req, res) => {
    // req.body.json().map(({key, value}) => console.log(value))
    try{

        const created = await createNoteRecord(req.body)
        // console.log('note/create  ',req.body)
        res.status(200).json(created)
    }catch(err){
        const errors = {errors: err.message}
        res.status(400).json(errors)
    }
})

route.put('/update/:noteId', async (req, res) => {
    try{
        const noteId = req.params.noteId
        const newData = req.body
        console.log(noteId)
        console.log(newData)
        const updated = await updateNoteRecord(newData, noteId)
        console.log(updated)
        res.status(200).json(updated)
    }catch(err){
        const errors = {errors: err.message}
        res.status(400).json(errors)
    }

})
module.exports = route