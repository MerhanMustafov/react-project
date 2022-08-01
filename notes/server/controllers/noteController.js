const route = require('express').Router()
const {isAuth, isOwner} = require('../middlewares/guards')
const {createNoteRecord} = require('../services/noteService')

route.post('/create', async (req, res) => {
    console.log('/CREATE server side')
    console.log(req.body)
    const created = await createNoteRecord(req.body)
    console.log('/controller', created)
})


module.exports = route