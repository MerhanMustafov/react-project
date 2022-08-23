import { useState, useEffect } from 'react'
import { updateNoteRecord, deleteNote } from '../../../../Api/noteApi'
import { getUserById } from '../../../../Api/userApi'
import { SpinnerNOtesList } from '../../Spinner/Spinner'
import { Comments } from '../Note/Comments'
import { socket } from '../../../../socket'

import { Spinner } from '../../Spinner/Spinner'
function CreatedNote(props) {
  const {
    setAddNoteBtn,
    setRefresh,
    isOwner,
    setRefreshList,
    refreshList,
  } = props
  const noteid = props.noteData._id
  const listid = props.noteData.listid
  const [error, setError] = useState('')
  const [listNoteclicked, setListNoteClicked] = useState(false)
  const [editMode, setEditMode] = useState(false)
  const [text, setText] = useState('')
  const [title, setTitle] = useState('')
  const [showComments, setShowComments] = useState(false)
  const [isLogged, setIsLogged] = useState(false)

  useEffect(() => {
    setText(props.noteData.text)
    setTitle(props.noteData.title)
    const lsUserid = localStorage.getItem('userId')
    if (lsUserid) {
      getUserById(lsUserid).then((data) =>
        data.userId == lsUserid ? setIsLogged(true) : setIsLogged(false),
      )
    }
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
        try {
          const newData = { title, text }
          await updateNoteRecord(newData, props.noteData._id)
          socket.emit('server-refresh-all', true)
          closeBtnHandler(listNoteclicked, setListNoteClicked, setEditMode)
        } catch (err) {
          setError(err.message)
          setTimeout(() => {
            setError('')
          }, 5000)
        }
      }
    } else if (to === `/note/delete/noteid=${noteid}/listid=${listid}`) {
      try {
        const modifiedList = await deleteNote(noteid, listid)
        deleteBtnHandler(null, noteid)
        socket.emit('server-refresh-all', true)
      } catch (err) {
        setError(err.message)
        setTimeout(() => {
          setError('')
        }, 5000)
      }
    }
  }

  socket.on('client-refresh-all', (refresh) => {
    setRefreshList(true)
  })
  return (
    <div>
      {listNoteclicked ? (
        // id={addNoteBtn}
        <div className="onPopUpBackground">
          <div className="iW iWExpand">
            <div className="noteW">
              {error.length > 0 ? (
                <div className="noteError">{error}</div>
              ) : null}
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
                    showComments,
                    setShowComments,
                  )
                }
              ></i>
              {isOwner ? (
                <i
                  className="fa-solid fa-pen-to-square"
                  title="edit"
                  onClick={() => {
                    editMode ? setEditMode(false) : setEditMode(true)
                  }}
                ></i>
              ) : null}

              {editMode ? (
                <i
                  className="fa-regular fa-floppy-disk"
                  title="save"
                  onClick={(e) => requestHandler(e, `/note/update/${noteid}`)}
                ></i>
              ) : null}

              <i
                className="fa-regular fa-comment commentsIcon"
                onClick={(e) =>
                  showComments ? setShowComments(false) : setShowComments(true)
                }
              ></i>
            </div>
            {showComments ? (
              <Comments
                setListNoteClicked={setListNoteClicked}
                isLogged={isLogged}
                listid={listid}
                noteid={noteid}
                setShowComments={setShowComments}
                showComments={showComments}
              />
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
                className="fa-solid fa-xmark closeCreatedNote"
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

function closeBtnHandler(
  listNoteclicked,
  setListNoteClicked,
  setEditMode,
  showComments,
  setShowComments,
) {
  listNoteclicked ? setListNoteClicked(false) : setListNoteClicked(true)
  if (showComments) {
    setShowComments(false)
  }
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
