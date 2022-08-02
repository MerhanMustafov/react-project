const route = require('express').Router()
const {createNoteRecord} = require('../services/noteService')
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

module.exports = route