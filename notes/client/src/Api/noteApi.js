const baseUrl = process.env.REACT_APP_SERVER_BASE_URL

async function createNoteRecord(noteData) {
  const endPoint = '/note/create'
  try {
    const response = await fetch(baseUrl + endPoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(noteData),
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

async function getAllNoteRecords(listid) {
  const endPoint = `/note/getAll/${listid}`

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

async function getNoteById(noteid) {
  const endPoint = `/note/getNote/${noteid}`
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
async function updateNoteRecord(newData, noteId) {
  const endPoint = `/note/update/${noteId}`
  try {
    const response = await fetch(baseUrl + endPoint, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newData),
    })
    if (response.ok == false) {
      await response.json()
      throw new Error(response.error)
    }
  } catch (err) {
    throw new Error(err.message)
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
      await response.json()
      throw new Error(response.error)
    }
    return await response.json()
  } catch (err) {
    throw new Error(err.message)
  }
}

export {
  createNoteRecord,
  getAllNoteRecords,
  getNoteById,
  updateNoteRecord,
  deleteNote,
}
