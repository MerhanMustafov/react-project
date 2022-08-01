const route = require('express').Router()
const {isAuth, isOwner} = require('../middlewares/guards')
const {createNoteRecord, getAllLists} = require('../services/noteService')

route.post('/create/newList', async (req, res) => {
    console.log('/CREATE server side')
    console.log(req.body)
    const created = await createNoteRecord(req.body)
    console.log('/controller', created)
})
route.get('/getLists/:userId', async (req, res) => {
    // console.log('/GETLISTS server side', req.params)
    const list = await getAllLists(req.params.userId)
    res.status(200).json(list)
    // console.log(list)
    // console.log(req.body)
    // const created = await createNoteRecord(req.body)
    // console.log('/controller', created)
})


module.exports = route