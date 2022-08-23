const baseUrl = process.env.REACT_APP_SERVER_BASE_URL

async function createListRecord(listData, userid) {
  const endPoint = `/list/create/${userid}`
  try {
    const response = await fetch(baseUrl + endPoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(listData),
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

async function getAllLists(userId) {
  const endPoint = `/list/getAllUsersList/${userId}`
  try {
    const response = (await fetch(baseUrl + endPoint)).json()
    if (response.ok == false) {
      await response.json()
      throw new Error(response.error)
    }
    return await response.json()
  } catch (err) {
    throw new Error(err.message)
  }
}

async function getOneList(listid) {
  const endPoint = `/list/getOneList/${listid}`
  try {
    if (listid) {
      const response = await fetch(baseUrl + endPoint)
      if (response.ok == false) {
        await response.json()
        throw new Error(response.error)
      }
      return await response.json()
    }
  } catch (err) {
    throw new Error(err.message)
  }
}

async function updateListTitle(listname, listid) {
  const endPoint = `/list/update/${listid}`
  try {
    const response = await fetch(baseUrl + endPoint, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ listname }),
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

async function deleteList(listid, userid) {
  try {
    const endPoint = `/list/delete/${listid}/${userid}`
    const response = await fetch(baseUrl + endPoint, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
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

export {
  createListRecord,
  getAllLists,
  getOneList,
  updateListTitle,
  deleteList,
}
