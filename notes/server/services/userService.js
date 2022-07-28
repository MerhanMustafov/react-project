const User = require('../models/UserModel')

async function createUser(userData){
    const user = new User(userData)
    const createdUser = await user.save()
    return createdUser
}




module.exports = {createUser}