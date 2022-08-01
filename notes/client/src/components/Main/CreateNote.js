import {useState, useEffect} from 'react'
import * as noteService from '../../Api/noteService'

function CreateNote(){
    let errKey = 0
    let [errors, setErrors] = useState([])
    let [listName, setListName] = useState('')
    let [title, setTitle] = useState('')
    let [noteC, setNoteC] = useState('')

    async function saveNoteHaandler(e){
        checkForErrors(setErrors, {listName, title, noteC})
        if(listName.length > 0 && title.length > 0 && noteC.length > 0){
            const noteData = {listName: listName.trim(), noteTitle:title.trim(), noteContent: noteC.trim()}
            await noteService.createNoteRecord(noteData)
        }
    }

  
    return (
        <div className='createNoteWrapper' >
            
            <form action="">
            {errors.length > 0 ? <div className="noteErrors">{errors.map(err => <p key={++errKey}>{err}</p>)}</div> : null}
                <input type="text" name='noteList' id="noteList" placeholder="list name" onChange={(e) => setListName(e.target.value)}/>
                <input type="text" name='noteTitle' id="noteTitle" placeholder="title" onChange={(e) => setTitle(e.target.value)}/>
                {/* <textarea name="noteContent" cols="30" rows="10" id="noteContent" onChange={(e) => setNoteC(e.target.value)} onSelect={(e) => highlightH(e)}></textarea> */}
                <textarea name="noteContent"  cols="2" rows="1" id="noteContent" onChange={(e) => setNoteC(e.target.value)}></textarea>
                <input type="button" name='save' id="saveBtn" value="SAVE" onClick={(e) => saveNoteHaandler(e)}/>
            </form>
        </div>
    );
}

export {CreateNote}


function checkForErrors(setErrors, obj){
    let errors = []
    let allFilled = obj.listName !== '' &&  obj.title !== '' &&  obj.noteC !== ''
    if(obj.listName == ''){
        errors.push('list name is empty!')
    }
    if(obj.title == ''){
        errors.push('title is empty!')
    }
    if(obj.noteC == ''){
        errors.push('note is empty!')
    }else if(allFilled){
        errors = []
    }
    setErrors(errors)

    setTimeout(() => {
        setErrors([])
    }, 3500)
}


