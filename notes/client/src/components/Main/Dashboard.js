import { useState, useEffect } from 'react'

import { createListRecord, getAllLists } from '../../Api/noteService'
import {List} from './List'

function Dashboard() {
  let key = 0
  const [search, setSearch] = useState(null)

  const [listName, setListName] = useState('')
  const [arrayOfLists, setArrayOfLists] = useState([])
  async function listHandler(e) {
    const ownerId = localStorage.getItem('userId')
    const listData = await createListRecord({ listName, notes: [], ownerId })
  }
  useEffect(() => {
    async function getLists(){
        const userId = localStorage.getItem('userId')
        const lists = await getAllLists(userId)
        console.log(lists)
        setArrayOfLists(lists)
    }
    getLists()
  }, [])
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

      <button
        className="addList"
        disabled={true ? listName.length == 0 : false}
        onClick={(e) => listHandler(e)}
      >
        A List
      </button>
      <input
        type="text"
        id="listI"
        placeholder="type..."
        onChange={(e) => setListName(e.target.value)}
      />

      <div className="listsWrapper">
        {arrayOfLists.map(list => <List key={++key} {...list}/>)}
      </div>
    </div>
  )
}

export { Dashboard }

function searchBoxHandler(e) {
  const searchIconClicked =
    e.target.className == 'fa-solid fa-magnifying-glass' &&
    e._reactName == 'onClick'
  if (e.key == 'Enter' || searchIconClicked) {
    console.log(e)
    // console.log(search)
  }
}
