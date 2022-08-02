import {useState} from 'react'
import {createNoteRecord} from '../../Api/noteService'
function Note(props) {
  const { addNoteBtn,  setAddNoteBtn } = props.noteBtn


  const [error, setError] = useState('')
  const [isSaved, setIsSaved] = useState(false)
  const [text, setText] = useState("")
  const [title, setTitle] = useState("")
  async function saveBtnHandler(e) {

    if((text.length === 0 && title.length === 0) || title.length === 0 || text.length === 0){
        setError('title and note content is required!')
        setTimeout(() => { setError('')}, 2000)
           
    }else{
        const noteData = {text: text.trim(), listId: addNoteBtn, title: title.trim()}
        const createdNote = await createNoteRecord(noteData)
        setIsSaved(true)
        setTimeout(() => {
            setIsSaved(false)
            setAddNoteBtn('')
            props.setRefresh(true)
        }, 2100)
    }
    

}


  return (
    <div>
    {isSaved ? <div className='successfullySaved'>Saved</div> : <div className="noteW" id={addNoteBtn}>
      {error.length > 0 ? <div className='noteError'>{error}</div> : null}
      <input type="text" className="noteT" name="noteTitle" placeholder="note title" onChange={(e) => setTitle(e.target.value)}/>
      <textarea name="noteC" id="noteC" cols="30" rows="10" onChange={(e) => setText(e.target.value)}></textarea>
      <i
        className="fa-solid fa-xmark"
        title="close"
        onClick={() => closeBtnHandler(setAddNoteBtn)}
      ></i>
      
     <i className="fa-regular fa-floppy-disk" title="save"  onClick={(e) => saveBtnHandler(e)}></i>
    </div> }
    
    </div>
  )
}

export { Note }

function closeBtnHandler(setBtn) {
  setBtn('')
}


