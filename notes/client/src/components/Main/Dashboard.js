import { useState } from 'react'

function Dashboard() {
  const [noteSection, setNoteSection] = useState(null)
  const [text, setText] = useState(null)

  function onpasteHandler(e) {
    const textArea = document.querySelector('#note-content')
    // textArea.focus()
    // textArea.innerHTML = `\n${textArea.innerHTML}`

    const el = document.getElementById('selectable')
    const selection = window.getSelection()
    const range = document.createRange()
    // selection.removeAllRanges()
    range.selectNode(el)
    // range.collapse(false)
    // selection.addRange(range)
    // el.focus()

    // sel.removeAllRanges()
    // sel.addRange(range)
    // console.log(textArea.innerHTML)
    // e.target.innerHTML =e.target.innerHTML+ "<div><br></div>"
  }

  function clickedBtnHandler(e) {
    if (e.key == 'Enter') {
      const textArea = document.querySelector('#note-content')
    }
  }
  function addNodeBtnHandler(e) {
    console.log(text)
  }

  function submitHandler(e) {
    e.preventDefault()
  }
  return (
    <div className="dashboard-wrapper">
      <input
        type="checkbox"
        id="plus-btn"
        onClick={(e) => plusCheckboxHandler(e)}
      />

      <div className="note-wrapper">
        <label htmlFor="plus-btn">
          <div className="add-note-btn">
            <i className="fa-solid fa-plus"></i>
          </div>
        </label>

        <div className="note-sheet-wrapper">
          <form action="" onSubmit={(e) => submitHandler(e)}>
            <input type="text" className="noteSection" name="noteSection" placeholder="type section"/>
            {/* <textarea
              type="text"
              id="note-content"
              name="note-content"
              onChange={(e) => setText(e.target.value)}
            ></textarea> */}
            <textarea
              //   type="text"
              id="note-content"
              //   name="note-content"
              suppressContentEditableWarning={true}
              contentEditable={true}
              //   onInput={(e) => setText(e.target.innerHTML)}
              onKeyDown={(e) => clickedBtnHandler(e)}
              onPaste={(e) => onpasteHandler(e)}
            >
            </textarea>
              <button
                type="submit"
                className="save-note"
                onClick={(e) => addNodeBtnHandler(e)}
              >
                Save
              </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export { Dashboard }

function plusCheckboxHandler(e) {
  const noteSheetWrapper = document.querySelector('.note-sheet-wrapper')
  if (e.target.checked) {
    noteSheetWrapper.classList.add('show-note')
  } else {
    noteSheetWrapper.classList.remove('show-note')
  }
}
