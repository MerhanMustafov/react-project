// const baseUrl = process.env.REACT_APP_BASEURL
// const baseUrl = "http://localhost:5151"
const baseUrl = "https://server-for-notes-app.herokuapp.com"

async function createListRecord(listData, userid) {
  const endPoint = `/list/create/${userid}`
  const response = await fetch(baseUrl + endPoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(listData),
  })
    return response
}

async function getAllLists(userId) {
  const endPoint = `/list/getAllUsersList/${userId}`
  return await (await fetch(baseUrl + endPoint)).json()
}
async function getOneList(listid) {
  if (listid) {
    const endPoint = `/list/getOneList/${listid}`
    const response = await fetch(baseUrl + endPoint)
    return await response.json()
  }
}

async function updateListTitle(listname, listid) {
  const endPoint = `/list/update/${listid}`
  const response = await fetch(baseUrl + endPoint, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ listname }),
  })
  return response
}

async function deleteList(listid, userid) {
  try {
    const endPoint = `/list/delete/${listid}/${userid}`
    const response = await fetch(baseUrl + endPoint, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    })
    if (response.ok == false) {
      throw new Error('Error')
    }
    return response
  } catch (err) {
    throw new Error(err.message)
  }
}

async function createNoteRecord(noteData) {
  const endPoint = '/note/create'
  try {
    const response = await fetch(baseUrl + endPoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(noteData),
    })

    if (response.ok == false) {
      throw new Error(
        'somthing went wrong, please try to refresh the page or logout and login again',
      )
    }
    return await response.json()
  } catch (err) {
    throw new Error(err)
  }
}

async function getAllNoteRecords(listid) {
  const endPoint = `/note/getAll/${listid}`

  try {
    const response = await fetch(baseUrl + endPoint)
    return await response.json()
  } catch (err) {
    return [err.message]
  }
}


async function getNoteById(noteid){
    const endPoint = `/note/getNote/${noteid}`
    const response = await fetch(baseUrl + endPoint)
    if(response.ok){
        return await response.json()
    }
}
async function updateNoteRecord(newData, noteId) {
  const endPoint = `/note/update/${noteId}`
  try {
    const response = await fetch(baseUrl + endPoint, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newData),
    })
    if (response.ok == false) {
      throw new Error(
        'somthing went wrong, please try to refresh the page or logout and login again',
      )
    }
  } catch (err) {
    throw new Error(err)
  }
}

async function deleteNote(noteid, listid) {
  const endPoint = `/note/delete/noteid=${noteid}/listid=${listid}`
  try {
    const response = await fetch(baseUrl + endPoint, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    })
    if (response.ok === false) {
      throw new Error('Error')
    }
        return await response.json()
    } catch (err) {
        throw new Error(err.message)
    }
}


async function createComment(data, noteid){
    const endPoint = `/comment/create/${noteid}`
    try{
        const response = await fetch(baseUrl + endPoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    })
    if(response.ok){
        return await response.json()
    }

    }catch (err) {
        return err.message
    }
    
}

async function deleteComment(commentid, noteid){
    const endPoint = `/comment/delete/commentid=${commentid}/noteid=${noteid}`
    try{
    const response = await fetch(baseUrl + endPoint, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    })
    if (response.ok === false) {
      throw new Error('Error')
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
  createNoteRecord,
  getAllNoteRecords,
  getNoteById,
  updateNoteRecord,
  deleteNote,
  createComment,
  deleteComment,
}
