const User = require('../models/UserModel')

async function createUser(userData){
    const user = new User(userData)
    return await user.save()
}
async function getUserByName(name){
    const user = await User.findOne({username: name.trim().toLowerCase()})
    // console.log(user)
    return user
}



module.exports = {createUser, getUserByName}