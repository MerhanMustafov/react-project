import { useState } from 'react'
import { createNoteRecord } from '../../../Api/noteApi'
import {socket} from '../../../socket'
function CreateNote(props) {
  //   const {setWaitingData} = props
  //   const { setrefreshNotesList } = props
  //   const { addNoteBtn, setAddNoteBtn } = props.noteBtn
  //   const [isSaved, setIsSaved] = useState(false)
  const { listid } = props
  const { setAddNoteBtnClicked } = props
  const { setSpinnerNotes } = props
  const { setLstId } = props
  const { setRefreshList } = props
  const [error, setError] = useState('')
  const [text, setText] = useState('')
  const [title, setTitle] = useState('')

  async function requestHandler(e, to) {
    if (to === '/note/create') {
      if (
        (text.length === 0 && title.length === 0) ||
        title.length === 0 ||
        text.length === 0
      ) {
        setError('title and note content is required!')
        setTimeout(() => {
          setError('')
        }, 5000)
      } else {
        try {
          setSpinnerNotes(true)
          const noteData = {
            ownerid: localStorage.getItem('userId'),
            text: text.trim(),
            listid: listid,
            title: title.trim(),
            comments: []
          }
          const note = await createNoteRecord(noteData)
          setAddNoteBtnClicked(false)
          setLstId(note.listid)
          socket.emit('server-refresh-all', true)
          
          
        } catch (err) {
          setError(err.message)
          setTimeout(() => {
            setError('')
          }, 5000)
        }
      }
    }
  }

  socket.on('client-refresh-all', (refresh) => {
    setRefreshList(true)
  })

  return (
    <div>
      <div className="onPopUpBackground">
        <div className="noteW CrNoteW">
          {error.length > 0 ? <div className="noteError">{error}</div> : null}
          <input
            type="text"
            className="noteT"
            name="noteTitle"
            placeholder="note title"
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            name="noteC"
            id="noteC"
            cols="30"
            rows="10"
            onChange={(e) => setText(e.target.value)}
          ></textarea>
          <i
            className="fa-solid fa-xmark"
            title="close"
            onClick={() => closeBtnHandler(setAddNoteBtnClicked)}
          ></i>

          <i
            className="fa-regular fa-floppy-disk saveOnCreateNote"
            title="save"
            onClick={(e) => requestHandler(e, '/note/create')}
          ></i>
        </div>
      </div>
    </div>
  )
}

export { CreateNote }

function closeBtnHandler(setBtn) {
  setBtn(false)
}
