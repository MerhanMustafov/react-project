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


async function getAll(ownerid){
    const endPoint = `/section/get/all/${ownerid}`
    try{
        const response = await fetch(baseUrl + endPoint)
        if(response.ok == false){
            await response.json()
            throw new Error(response.error)
        }
        return await response.json()
    }catch (err) {
        throw new Error(err.message)
    }
}
async function getOne(sectionid){
    const endPoint = `/section/get/one/${sectionid}`
    try{
        const response = await fetch(baseUrl + endPoint)
        if(response.ok == false){
            await response.json()
            throw new Error(response.error)
        }
        return await response.json()
    }catch (err) {
        throw new Error(err.message)
    }
}

async function getByName(sectionname){
    const endPoint = `/section/get/byname/${sectionname}`
     try{
        const response = await fetch(baseUrl + endPoint)
        if(response.ok == false){
            await response.json()
            throw new Error(response.error)
        }
        return await response.json()
    }catch (err) {
        throw new Error(err.message)
    }

}
async function del(sectionid){
    const endPoint = `/section/delete/${sectionid}`
    try{
        const response = await fetch(baseUrl + endPoint, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
        })
        if(response.ok == false){
            await response.json()
            throw new Error(response.error)
        }
        return await response.json()

    }catch (err) {
        throw new Error(err.message)
    }
}

export {create, getAll, getOne, getByName, del}