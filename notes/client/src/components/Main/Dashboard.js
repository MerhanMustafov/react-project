import { useState, useEffect } from 'react'
import { createListRecord, getAllLists } from '../../Api/noteService'
import {List} from './List'
import {Note} from './Note'

function Dashboard() {
  let key = 165156
  const [refresh, setRefresh] = useState(false)
  const [search, setSearch] = useState(null)
  const [addNoteBtn, setAddNoteBtn] = useState('')
  const [listName, setListName] = useState('')
  const [arrayOfLists, setArrayOfLists] = useState([])

 
  useEffect(() => {
    async function getLists(){
        const userId = localStorage.getItem('userId')
        const lists = await getAllLists(userId)
        setArrayOfLists(lists)
        setListName('')
        // addNoteBtn('')
        // console.log("CLIENT ", lists)
    }
    getLists()
    setRefresh(false)
        
  }, [refresh === true])


   async function listHandler(e) {
    const ownerId = localStorage.getItem('userId')
    const listData = await createListRecord({ listName, notes: [], ownerId })
    
    setRefresh(true)
  }
  return (
    <div className="dashboardWrapper">
      <div className="searchBoxWrapper">
        <i
          className="fa-solid fa-magnifying-glass"
          onClick={(e) => searchBoxHandler(e)}
        ></i>
        <input
          type="text"
          id="searchBox"
          placeholder="Search section"
          name="sectionTitle"
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={(e) => searchBoxHandler(e)}
        />
      </div>
        {addNoteBtn.length > 0 ?  <Note setRefresh={setRefresh} noteBtn={{setAddNoteBtn, addNoteBtn} } /> : null }
      <button
        className="addList"
        disabled={true ? listName.length === 0 : false}

        onClick={(e) => listHandler(e)}
      >
        A List
      </button>
      <input
        type="text"
        id="listI"
        placeholder="type..."
        value={'' ? listName.length > 0 : listName}

        onChange={(e) => setListName(e.target.value)}
      />

      <div className="listsWrapper">
        {arrayOfLists.map(list => <List key={list._id} listid={list._id} setRefresh={setRefresh} {...list} note={{addNoteBtn, setAddNoteBtn}}/>)}
      </div>
    </div>
  )
}

export { Dashboard }

function searchBoxHandler(e) {
  const searchIconClicked =
    e.target.className === 'fa-solid fa-magnifying-glass' &&
    e._reactName === 'onClick'
  if (e.key === 'Enter' || searchIconClicked) {
    console.log(e)
    // console.log(search)
  }
}

