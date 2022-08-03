import { Note } from './Note'
import { ListNote } from './ListNote'

function List(props) {
  let key = 654
  const { addNoteBtn, setAddNoteBtn } = props.note
  const { setRefresh } = props
  const listid = props._id

  return (
    <div className="listWrapper">
      <header>
        <div className="title">{props.listname}</div>
        <div className="options">
          <div className="hide" id={listid}>
            <i className="fa-solid fa-pen" title="edit"></i>
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
              <ListNote
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
          id={listid}
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
  addNoteBtn.length === 0 ? setAddNoteBtn(e.target.id) : setAddNoteBtn('')
}

function settingsBtnHandler(listid) {
  const el = document.getElementById(listid)
  if (el.classList.contains('hide')) {
    el.classList.remove('hide')
    el.classList.add('show')
  } else if (el.classList.contains('show')) {
    el.classList.remove('show')
    el.classList.add('hide')
  }
}
