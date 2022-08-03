import { useState, useEffect } from 'react'
import { updateNoteRecord } from '../../Api/noteService'
function CreatedNote(props) {
  const { setAddNoteBtn, setRefresh } = props
  //   const { listid } = props.noteData
  console.log('NNNNNNOOOOTEEEE', props)
  const [error, setError] = useState('')
  const [listNoteclicked, setListNoteClicked] = useState(false)
  const [editMode, setEditMode] = useState(false)
  const [text, setText] = useState('')
  const [title, setTitle] = useState('')

  useEffect(() => {
    setText(props.noteData.text)
    setTitle(props.noteData.title)
  }, [])

  async function requestHandler(e, to) {
    if (to == `/note/update/${props.noteData._id}`) {
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
        const newData = { title, text }
        await updateNoteRecord(newData, props.noteData._id)
        setRefresh(true)
        closeBtnHandler(listNoteclicked, setListNoteClicked, setEditMode)
      }
    }
  }

  return (
    <div>
      {listNoteclicked ? (
        // id={addNoteBtn}
        <div className="noteW">
          {error.length > 0 ? <div className="noteError">{error}</div> : null}
          <input
            type="text"
            className="noteT"
            name="noteTitle"
            placeholder="note title"
            defaultValue={props.noteData.title}
            readOnly={true ? !editMode : false}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            name="noteC"
            id="noteC"
            cols="30"
            rows="10"
            defaultValue={props.noteData.text}
            readOnly={true ? !editMode : false}
            onChange={(e) => setText(e.target.value)}
          ></textarea>
          <i
            className="fa-solid fa-xmark"
            title="close"
            onClick={() =>
              closeBtnHandler(listNoteclicked, setListNoteClicked, setEditMode)
            }
          ></i>
          <i
            className="fa-solid fa-pen-to-square"
            title="edit"
            onClick={() => {
              editMode ? setEditMode(false) : setEditMode(true)
            }}
          ></i>
          {editMode ? (
            <i
              className="fa-regular fa-floppy-disk"
              title="save"
              onClick={(e) =>
                requestHandler(e, `/note/update/${props.noteData._id}`)
              }
            ></i>
          ) : null}
        </div>
      ) : (
        <div className="listNote" onClick={(e) => setListNoteClicked(true)}>
          {props.noteData.title}
          {/* <div className="options">
          <div className="hide" id={props.listid}>
            <i class="fa-solid fa-pen" title="edit"></i>
          </div>
          <i class="fa-solid fa-gear" onClick={(e) => settingsH(listid)}></i>
        </div> */}
        </div>
      )}
    </div>
  )
}

export { CreatedNote  }

function closeBtnHandler(listNoteclicked, setListNoteClicked, setEditMode) {
  listNoteclicked ? setListNoteClicked(false) : setListNoteClicked(true)
  setEditMode(false)
}

