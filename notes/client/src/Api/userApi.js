const baseUrl = process.env.REACT_APP_SERVER_BASE_URL

async function getUserById(userId) {
  if (userId) {
    const endPoint = `/user/get/${userId}`
    try {
      const response = await fetch(baseUrl + endPoint)
      if (response.ok == false) {
        await response.json()
        throw new Error(response.error)
      }
      return await response.json()
    } catch (err) {
      throw new Error(err.message)
    }
  }
}
async function getUserByIdWithLists(userId) {
  if (userId) {
    const endPoint = `/user/getUserWithLists/${userId}`
    const response = await fetch(baseUrl + endPoint)
    try {
      if (response.ok === false) {
        return null
      }
      return await response.json()
    } catch (err) {
      return err.message
    }
  }
}

async function getUserByName(username) {
  const endPoint = `/user/getuser/${username}`
  try {
    const response = await fetch(baseUrl + endPoint)
    if(response.ok == false){
        await response.json()
        throw new Error(response.error)
    }
    return await response.json()
  } catch (err) {
    throw new Error(err.message)
  }
}

async function register(userData) {
  const endPoint = '/user/register'
  try {
    const response = await fetch(baseUrl + endPoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData),
    })
    if (response.ok == false) {
      await response.json()
      throw new Error(response.error)
    }

    return await response.json()
  } catch (err) {
    throw new Error(err.message)
  }
}
async function login(userData) {
  const endPoint = '/user/login'
  const response = await fetch(baseUrl + endPoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData),
  })
  if (response.ok == false) {
    const errorMessage = await response.json()
    throw new Error(errorMessage.error)
  }
  return response.json()
}
async function logout() {
  localStorage.clear()
}

async function verifyUser(accessToken) {
  const endPoint = `/user/verify/${accessToken}`
  try {
    const response = await fetch(baseUrl + endPoint)
    if (response.status === 401) {
      const { error } = await response.json()
      throw new Error(error)
    }
    return await response.json()
  } catch (err) {
    throw new Error(err.message)
  }
}
export {
  register,
  login,
  logout,
  getUserById,
  getUserByName,
  getUserByIdWithLists,
  verifyUser,
}
