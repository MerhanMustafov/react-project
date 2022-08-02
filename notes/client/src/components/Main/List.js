
import {Note} from './Note'
import {ListNote} from './ListNote'



function List(props){

    let key = 654
    const {addNoteBtn, setAddNoteBtn} = props.note
    const {listid, setRefresh} = props
    
    console.log('LIST COM ', props)
    
    return (
        <div className="listWrapper">
            <header>
                <div className="title">{props.listName}</div>
            </header>
            <main>
                {props.notes.length > 0 ? props.notes.map(noteData => <ListNote key={++key} setRefresh={setRefresh} setAddNoteBtn={setAddNoteBtn} noteData={noteData}/>) : null}
            </main>
        <footer><button  id={listid} className="add" onClick={(ev) =>  addNoteBtnHandler(ev ,props.note) }>Add Note</button></footer>
        </div>
    );
}


export {List}


function addNoteBtnHandler(ev,{addNoteBtn, setAddNoteBtn}){
    addNoteBtn.length === 0  ? setAddNoteBtn(ev.target.id) : setAddNoteBtn('')
}