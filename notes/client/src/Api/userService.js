const baseUrl = 'http://localhost:5151'

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

async function logout(){
    localStorage.clear()
}
export {register, logout} 