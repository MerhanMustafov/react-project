import { Note } from './Note'
import { CreatedNote } from './CreatedNote'
import { useState, useEffect } from 'react'

import { updateListTitle, deleteList } from '../../Api/noteService'

function List(props) {
  let key = 654
  const { addNoteBtn, setAddNoteBtn } = props.note
  const { setRefresh } = props
  const listid = props._id

  const [title, setTitle] = useState()
  async function requestHandler(e, to) {
    if (to === `/list/update/${listid}`) {
      if (e.key == 'Enter') {
        if (title.length > 0) {
          const listname = title
          const updated = await updateListTitle(listname, listid)
          editBtnHandler(null, listid, setTitle)
          setRefresh(true)
        }
      }
    }else if(to ===  `/list/delete/${listid}`){
        await deleteList(listid)
        console.log('client side-/list/delete/id')
        setRefresh(true)
    }
  }

  return (
    <div className="listWrapper" id={listid}>
      <header>
        <input
          className="title"
          name="listname"
          defaultValue={props.listname}
          readOnly={true}
          onChange={(e) => setTitle(e.target.value)}
          onKeyDown={(e) => requestHandler(e, `/list/update/${listid}`)}
        />
        <div className="options">
          <div className="settings hide">
            <i
              className="fa-solid fa-pen"
              title="edit list title"
              onClick={(e) => editBtnHandler(e, listid, setTitle)}
            ></i>
            <i
              className="fa-solid fa-trash"
              title="delete whole list"
              onClick={(e) => deleteBtnHandler(e, listid)}
            ></i>
            <div className="delConfirmWindow hideDelW">
              Are you sure ?
              <div className="btnsWrapper">
                <button
                  className="cancel"
                  onClick={(e) => {
                    cancelBtnHandler(e, listid)
                  }}
                >
                  Cancel
                </button>
                <button
                  className="delete"
                  onClick={(e) => requestHandler(e, `/list/delete/${listid}`)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
          <i
            className="fa-solid fa-gear"
            title="settings"
            onClick={(e) => settingsBtnHandler(listid)}
          ></i>
        </div>
      </header>
      <main>
        {props.notes.length > 0
          ? props.notes.map((noteData) => (
              <CreatedNote
                key={++key}
                setRefresh={setRefresh}
                setAddNoteBtn={setAddNoteBtn}
                noteData={noteData}
              />
            ))
          : null}
      </main>
      <footer>
        <button
          className="add"
          onClick={(e) => addNoteBtnHandler(e, props.note)}
        >
          Add Note
        </button>
      </footer>
    </div>
  )
}

export { List }

function addNoteBtnHandler(e, { addNoteBtn, setAddNoteBtn }) {
  const listid = document.querySelector('.listWrapper').id
  addNoteBtn.length === 0 ? setAddNoteBtn(listid) : setAddNoteBtn('')
}

function settingsBtnHandler(listid) {
  const el = document.getElementById(listid).querySelector('.settings')
  if (el.classList.contains('hide')) {
    el.classList.remove('hide')
    el.classList.add('show')
  } else if (el.classList.contains('show')) {
    el.classList.remove('show')
    el.classList.add('hide')
  }

  //   setTimeout(() => {
  //     el.classList.remove('show')
  //     el.classList.add('hide')
  //   }, 7000)
}

function editBtnHandler(e, listid, setTitle) {
  const listTitle = document.getElementById(listid).querySelector('.title')
  setTitle(listTitle.value)
  listTitle.readOnly
    ? (listTitle.readOnly = false)
    : (listTitle.readOnly = true)
}

function deleteBtnHandler(e, listid) {
  const el = document.getElementById(listid).querySelector('.delConfirmWindow')
  if (el.classList.contains('hideDelW')) {
    el.classList.add('showDelW')
    el.classList.remove('hideDelW')
  } else if (el.classList.contains('showDelW')) {
    el.classList.add('hideDelW')
    el.classList.remove('showDelW')
  }
}
function cancelBtnHandler(e, listid) {
  const el = document.getElementById(listid).querySelector('.delConfirmWindow')
  if (el.classList.contains('hideDelW')) {
    el.classList.add('showDelW')
    el.classList.remove('hideDelW')
  } else if (el.classList.contains('showDelW')) {
    el.classList.add('hideDelW')
    el.classList.remove('showDelW')
  }
}
