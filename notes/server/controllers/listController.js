const route = require('express').Router()
const {isAuth, isOwner} = require('../middlewares/guards')
const {createNoteRecord, getAllLists} = require('../services/listService')

route.post('/create', async (req, res) => {
    try{
    const created = await createNoteRecord(req.body)
        res.status(200).json(created)
    }catch(err){
        const errors = {errors: err.message}
    }
})
route.get('/getAllUsersList/:userId', async (req, res) => {
    try{
    const list = await getAllLists(req.params.userId)
    res.status(200).json(list)

    }catch(err){
        const errors = {errors: err.message}
        res.status(404).json(errors)
    }
})


module.exports = route