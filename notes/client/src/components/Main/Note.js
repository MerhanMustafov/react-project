function Note(props) {
  const { addNoteBtn, setAddNoteBtn } = props.noteBtn
  return (
    <div className="noteW" id={addNoteBtn}>
      {' '}
      <textarea name="noteC" id="noteC" cols="30" rows="10"></textarea>
      <i
        class="fa-solid fa-xmark"
        title="close"
        onClick={() => addNoteBtnHandler(setAddNoteBtn)}
      ></i>
      <i class="fa-regular fa-floppy-disk" title="save"></i>
    </div>
  )
}

export { Note }

function addNoteBtnHandler(setBtn) {
  setBtn('')
}
