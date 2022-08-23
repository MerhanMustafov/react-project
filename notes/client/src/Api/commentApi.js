const baseUrl = process.env.REACT_APP_SERVER_BASE_URL

async function createComment(data, noteid) {
  const endPoint = `/comment/create/${noteid}`
  try {
    const response = await fetch(baseUrl + endPoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
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

async function updateComment(data, commentid) {
  const endPoint = `/comment/update/${commentid}`
  try {
    const response = await fetch(baseUrl + endPoint, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
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

async function deleteComment(commentid, noteid) {
  const endPoint = `/comment/delete/commentid=${commentid}/noteid=${noteid}`
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

export { createComment, updateComment, deleteComment }
