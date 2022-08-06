import { useState, useEffect, useRef } from 'react'
import { Note } from './Note'
import { CreatedNote } from './CreatedNote'

import {
  updateListTitle,
  deleteList,
  getOneList,
  getAllLists
} from '../../../Api/noteService'

import { SpinnerNOtesList } from '../Spinner/Spinner'

function List(props) {
  let key = 654
  const [refreshList, setRefreshList] = useState(false)
  const [addNoteBtnClicked, setAddNoteBtnClicked] = useState(false)
  const [spinnerNotes, setSpinnerNotes] = useState(false)
  const [lstId, setLstId] = useState(null)
  const [lists, setLists] = useState([])
  const { setRefresh } = props
  let listid = props._id
  let image = props.listimg
  const [title, setTitle] = useState()

  useEffect(() => {
    let data = null
    async function update() {
      if (lstId) {
        const singleList = await getOneList(lstId)
        data = singleList[0].notes
      } else {
        // const userId = localStorage.getItem('userId')
        // const lists = await getAllLists(userId)
        data = props.notes
      }
      if (image) {
        document.getElementById(listid).style.backgroundImage = `url(${image})`
      }
      setLists(data)
      setLstId(listid)
      setSpinnerNotes(false)
      setRefreshList(false)
    }
    update()
    // setTimeout(() => {
    // }, 1000)
  }, [refreshList])

  async function requestHandler(e, to) {
    if (to === `/list/update/${listid}`) {
      if (e.key == 'Enter') {
        if (title.length > 0) {
          const listname = title
          const updated = await updateListTitle(listname, listid)
          editBtnHandler(null, listid, setTitle, 'update')
          document
            .getElementById(listid)
            .querySelector('.title')
            .classList.remove('titleInputReady')
          //   setRefresh(true)
          setRefreshList(true)
        }
      }
    } else if (to === `/list/delete/${listid}`) {
      await deleteList(listid)
      //   setRefresh(true)
      setRefreshList(true)
    }
  }

  return (
    <div className="expandBackground">
      {addNoteBtnClicked ? (
        <Note
          listid={listid}
          setAddNoteBtnClicked={setAddNoteBtnClicked}
          setSpinnerNotes={setSpinnerNotes}
          setRefreshList={setRefreshList}
          setLstId={setLstId}
        />
      ) : null}
      <div className="listWrapper" id={listid}>
        <div className="listInnerWrapper">
          <i
            className="fa-solid fa-arrows-left-right expandListBtn"
            onClick={(e) => expandList(e, listid)}
          ></i>
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
                      onClick={(e) =>
                        requestHandler(e, `/list/delete/${listid}`)
                      }
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
          <main className="scrollMain">
            {spinnerNotes ? <SpinnerNOtesList className="spn" /> : null}
            {lists.length > 0
              ? lists.map((noteData) => (
                  <CreatedNote
                    key={++key}
                    setRefresh={setRefresh}
                    setRefreshList={setRefreshList}
                    spinnerNotes={spinnerNotes}
                    noteData={noteData}
                  />
                ))
              : null}
          </main>
          <footer>
            <button
              className="add"
              onClick={(e) =>
                addNoteBtnHandler(e, addNoteBtnClicked, setAddNoteBtnClicked)
              }
            >
              Add Note
            </button>
          </footer>
        </div>
      </div>
    </div>
  )
}

export { List }

function addNoteBtnHandler(e, addNoteBtnClicked, setAddNoteBtnClicked) {
  addNoteBtnClicked == false
    ? setAddNoteBtnClicked(true)
    : setAddNoteBtnClicked(false)
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
}

function editBtnHandler(e, listid, setTitle, from) {
  const listTitle = document.getElementById(listid).querySelector('.title')
  setTitle(listTitle.value)
  listTitle.readOnly
    ? (listTitle.readOnly = false)
    : (listTitle.readOnly = true)

  const title = document.getElementById(listid).querySelector('.title')
  title.classList.contains('titleInputReady')
    ? title.classList.remove('titleInputReady')
    : title.classList.add('titleInputReady')
  if (from !== 'update') {
    settingsBtnHandler(listid)
  }
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

function expandList(e, listid) {
  const listWrapper = document.getElementById(listid)
  if (!listWrapper.classList.contains('expand')) {
    listWrapper.classList.add('expand')
    listWrapper.parentElement.classList.add('expandBackgroundOn')
    listWrapper.querySelector('main').classList.add('expandMain')
  } else {
    listWrapper.classList.remove('expand')
    listWrapper.parentElement.classList.remove('expandBackgroundOn')
    listWrapper.querySelector('main').classList.remove('expandMain')
  }
}
