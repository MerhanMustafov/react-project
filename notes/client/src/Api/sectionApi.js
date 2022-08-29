const baseUrl = process.env.REACT_APP_SERVER_BASE_URL

async function create(data) {
  const endPoint = '/section/create'
  try {
    const response = await fetch(baseUrl + endPoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
    if (response.ok == false) {
      await response.json(data)
      throw new Error(response.error)
    }
    return await response.json()
  } catch (err) {
    throw new Error('Something went wrong !')
  }
}


export {create}