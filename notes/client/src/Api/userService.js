const baseUrl = process.env.REACT_APP_BASEURL
console.log(baseUrl)
async function getUserById(userId){
    if(userId){
        const endPoint = `/user/get/${userId}`
        const response = await fetch(baseUrl + endPoint)
        if(response.ok === false){
            return null
        }else{
            return response
        }
    }
}
async function getUserByIdWithLists(userId){
    if(userId){
        const endPoint = `/user/getUserWithLists/${userId}`
        const response = await fetch(baseUrl + endPoint)
        try{
            if(response.ok === false){
                return null
            }
            return response

        }catch (err) {
            return err.message
        }
       
    }
}

async function getUserByName(username){
    const endPoint = `/user/getuser/${username}`
    const response = await fetch(baseUrl + endPoint)
    return await response.json()
}

async function register(userData){
    const endPoint = '/user/register'
    const response = await fetch(baseUrl + endPoint, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(userData)
    })
    if(response.ok == false){
        const errorMessage = await response.json()
        throw new Error(errorMessage.error)
    }
    return response.json()
}
async function login(userData){
    const endPoint = '/user/login'
    const response = await fetch(baseUrl + endPoint, {
         method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(userData)
    })
    if(response.ok == false){
        const errorMessage = await response.json()
        throw new Error(errorMessage.error)
    }
    return response.json()
}
async function logout(){
    localStorage.clear()
}
export {register, login, logout, getUserById, getUserByName, getUserByIdWithLists} 