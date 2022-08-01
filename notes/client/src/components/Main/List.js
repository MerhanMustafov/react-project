
function List(props){
    const {addNoteBtn, setAddNoteBtn} = props.note
    const {listid} = props
    
    return (
        <div className="listWrapper">
            <header>
                <div className="titlee">{props.listName}</div>
            </header>
            <main></main>
        <footer><button  id={listid} className="add" onClick={(ev) =>  addNoteBtnHandler(ev ,props.note) }>Add Note</button></footer>
        </div>
    );
}


export {List}


function addNoteBtnHandler(ev,{addNoteBtn, setAddNoteBtn}){
    addNoteBtn.length == 0  ? setAddNoteBtn(ev.target.id) : setAddNoteBtn('')
}