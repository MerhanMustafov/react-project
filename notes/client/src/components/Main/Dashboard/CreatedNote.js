import { useState, useEffect } from 'react'
import { updateNoteRecord, deleteNote } from '../../../Api/noteService'
import { SpinnerNOtesList } from '../Spinner/Spinner'
function CreatedNote(props) {
  const { setAddNoteBtn, setRefresh, setRefreshList, refreshList } = props
  const noteid = props.noteData._id
  const listid = props.noteData.listid
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
    if (to == `/note/update/${noteid}`) {
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
        // setRefresh(true)
        setRefreshList(true)
        closeBtnHandler(listNoteclicked, setListNoteClicked, setEditMode)
      }
    } else if (to === `/note/delete/noteid=${noteid}/listid=${listid}`) {
      const modifiedList = await deleteNote(noteid, listid)
      deleteBtnHandler(null, noteid)
      setRefreshList(true)
    }
  }

  return (
    <div>
      {listNoteclicked ? (
        // id={addNoteBtn}
        <div className="onPopUpBackground">
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
                closeBtnHandler(
                  listNoteclicked,
                  setListNoteClicked,
                  setEditMode,
                )
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
                onClick={(e) => requestHandler(e, `/note/update/${noteid}`)}
              ></i>
            ) : null}
          </div>
        </div>
      ) : (
        <>
          <div className="listNoteWrapper" id={noteid}>
            <div
              className="listNoteTitle"
              onClick={(e) => setListNoteClicked(true)}
            >
              {props.noteData.title}
            </div>
            <div className="listNoteDelBtn">
              <i
                className="fa-solid fa-xmark"
                title="delete single note"
                onClick={(e) => deleteBtnHandler(e, noteid)}
              ></i>
            </div>
            <div className="noteDelConfWindow hideNoteDelW">
              Are you sure ?
              <div className="btnW">
                <button
                  className="cancelBtn"
                  onClick={(e) => cancelBtnHandler(e, noteid)}
                >
                  Cancel
                </button>
                <button
                  className="delBtn"
                  onClick={(e) =>
                    requestHandler(
                      e,
                      `/note/delete/noteid=${noteid}/listid=${listid}`,
                    )
                  }
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export { CreatedNote }

function closeBtnHandler(listNoteclicked, setListNoteClicked, setEditMode) {
  listNoteclicked ? setListNoteClicked(false) : setListNoteClicked(true)
  setEditMode(false)
}

function deleteBtnHandler(e, noteid) {
  const el = document.getElementById(noteid).querySelector('.noteDelConfWindow')
  if (el.classList.contains('hideNoteDelW')) {
    el.classList.add('showNoteDelW')
    el.classList.remove('hideNoteDelW')
  } else if (el.classList.contains('showNoteDelW')) {
    el.classList.add('hideNoteDelW')
    el.classList.remove('showNoteDelW')
  }
}

function cancelBtnHandler(e, noteid) {
  const el = document.getElementById(noteid).querySelector('.noteDelConfWindow')
  if (el.classList.contains('hideNoteDelW')) {
    el.classList.add('showNoteDelW')
    el.classList.remove('hideNoteDelW')
  } else if (el.classList.contains('showNoteDelW')) {
    el.classList.add('hideNoteDelW')
    el.classList.remove('showNoteDelW')
  }
}
