import { useState, useEffect } from 'react'

import {CreateNote} from './CreateNote'

function Dashboard() {
    let key = 0
    let [addNoteClicked, setAddNoteClicked] = useState(false)
    const [sectionsList, setSectionsList] = useState([])
    const [search, setSearch] = useState(null)
    // console.log(search)

    useEffect(() => {
        setSectionsList(['Programming ', ' pj', 'usefull Notes', 'JavaScript', '  Phyton'])
        console.log(sectionsList)
    }, [])

    function searchBoxHandler(e){
        // if(sectionsList.includes())

        const searchIconClicked = e.target.className == 'fa-solid fa-magnifying-glass' && e._reactName == 'onClick'
        if(e.key == 'Enter' || searchIconClicked){
            console.log(e)
            console.log(search)
        } 
        
    }
  return (
    <div className="dashboardWrapper">
      <div className="searchBoxWrapper">
        <i className="fa-solid fa-magnifying-glass" onClick={(e) => searchBoxHandler(e)}></i>
        <input type="text" id="searchBox" placeholder="Search section" name="sectionTitle" onChange={(e) => setSearch(e.target.value)} onKeyDown={(e) => searchBoxHandler(e)}/>
      </div>
        {/* {sectionsList ? sectionsList.map(s => <p key={++key}>{s.trim()}</p> ): null} */}
        
        <button type="checkbox" className="addNote" id="addNote" onClick={() => {addNoteClicked ? setAddNoteClicked(false) : setAddNoteClicked(true)} } >Note <i class="fa-solid fa-plus"></i></button>
        {/* <label htmlFor="addNote" className="addNoteLabel">Add Note</label> */}
        {addNoteClicked == true ? <CreateNote /> : null}
    </div>
  )
}

export { Dashboard }


