const baseUrl = 'http://localhost:5151'

async function createNoteRecord(noteData){
    const endPoint = '/note/create'
    const response = await fetch(baseUrl + endPoint, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(noteData)
    })
    console.log('FETCH client side')
}


export {createNoteRecord}