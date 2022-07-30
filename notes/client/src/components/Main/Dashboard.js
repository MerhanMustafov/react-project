function Dashboard() {
  function addNodeBtnHandler(e) {
    console.log(e.target.parentElement)
  }

  function submitHandler(e){
    e.preventDefault()
    console.log(e.target)
  }
  return (
    <div className="dashboard-wrapper">
        <input type="checkbox" id="plus-btn" onClick={(e) => plusCheckboxHandler(e)}/>
      <div className="note-wrapper">
          
          <label htmlFor="plus-btn">
            <div className="add-note-btn" onClick={(e) => addNodeBtnHandler(e)}>
              <i className="fa-solid fa-plus"></i>
            </div>
          </label>


        <div className="note-sheet-wrapper">
          <form action="" onSubmit={(e) => submitHandler(e)}>
            {/* <textarea name="note-content" id="note-content" cols="" rows="">
            </textarea> */}
            <div type="text" id="note-content"  contentEditable ></div>
            <button type="submit" className="add-note-btn">Add</button>
          </form>
          {/* <div className="note-sheet"></div> */}
        </div>
      </div>
    </div>
  )
}

export { Dashboard }


function plusCheckboxHandler(e){
    const noteSheetWrapper = document.querySelector('.note-sheet-wrapper')
    if(e.target.checked){
        noteSheetWrapper.classList.add('show-note')
    }else{
        noteSheetWrapper.classList.remove('show-note')
    }
}