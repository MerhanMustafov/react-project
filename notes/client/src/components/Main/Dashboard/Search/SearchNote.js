
import { useState, useEffect } from 'react';
import {getAllNoteRecords} from '../../../../Api/noteApi';


function SearchNote(props){
    const {listid, notes, setNotes} = props
    const [allNotes, seatAllNotes] = useState([])

  useEffect(() => {
     getAllNoteRecords(listid).then(data => seatAllNotes(data))
  }, [allNotes.length !== notes.length])
    
    
    function match(input){
        if(!input){
            setNotes(allNotes)
        }else if(input.length > 0){
            const filtered = allNotes.filter(note => note.title.toLowerCase().includes(input.toLowerCase()))
            if(filtered.length > 0){
                setNotes(filtered)
            }else{
                setNotes(allNotes)
            }
        }else{
            setNotes(allNotes)
        }
    }
    
    return (
        <div className="searchNoteWrapper">
            <i className="fa-solid fa-magnifying-glass searchNoteIcon" onClick={(e) => searchNoteIconHandler(e, listid)}></i>
            <input type="text" className="searchNoteInput" onChange={(e) => match(e.target.value)}/>

        </div>
    );
}


export {SearchNote}



function searchNoteIconHandler(e, listid){
    const searchBar = document.getElementById(listid).querySelector('.searchNoteInput')
    if(searchBar.classList.contains('showSearchNoteInput')){
        searchBar.classList.remove('showSearchNoteInput')
    }else{
        searchBar.classList.add('showSearchNoteInput')

    }
}