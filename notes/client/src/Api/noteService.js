const baseUrl = 'http://localhost:5151'

async function createListRecord(listData){
    const endPoint = '/note/create/newList'
    const response = await fetch(baseUrl + endPoint, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(listData)
    })
    console.log('FETCH client side')
}


async function getAllLists(userId){
    const endPoint = `/note/getLists/${userId}`
    return await (await fetch(baseUrl + endPoint)).json()
    // console.log(await fetch(baseUrl + endPoint))
    // const res = await fetch(baseUrl + endPoint)
    // console.log( await res.json())

    
}

export {createListRecord, getAllLists}