const baseUrl = 'http://localhost:5151'

async function createListRecord(listData){
    const endPoint = '/list/create'
    const response = await fetch(baseUrl + endPoint, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(listData)
    })
    console.log('FETCH client side')
}


async function getAllLists(userId){
    const endPoint = `/list/getAllUsersList/${userId}`
    return await (await fetch(baseUrl + endPoint)).json()

    
}

async function createNoteRecord(noteData){
    const endPoint = '/note/create'
    // console.log('CLIENT note data ', noteData)
    return await fetch(baseUrl + endPoint, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(noteData)
    })
}

export {createListRecord, getAllLists, createNoteRecord}