import { useState, useEffect } from 'react'
import { getAllLists } from '../../../Api/noteService'
import { List } from './List'
import { Search } from './Search/Search'
import { Spinner } from '../Spinner/Spinner'
import { AddList } from './AddList/AddList'

function Dashboard({ setUserStatus }) {
  let key = 165156
    const uid = localStorage.getItem('userId')
  const [refresh, setRefresh] = useState(false)

  const [addNoteBtn, setAddNoteBtn] = useState('')
  const [arrayOfLists, setArrayOfLists] = useState([])


  useEffect(() => {
    async function getLists() {
    const userid = localStorage.getItem('userId')
      const lists = await getAllLists(userid)
      setArrayOfLists(lists)
    }
    getLists()
    setRefresh(false)
  }, [refresh])

  return (
    <div className="dashboardWrapper">
      <Search
        setArrayOfLists={setArrayOfLists}
        arrayOfLists={arrayOfLists}
        setRefresh={setRefresh}
        uid={uid}
      />

      <AddList setRefresh={setRefresh}  />

        <div className="listsWrapper">
    
          {arrayOfLists.map((listData) => (
            <List key={listData._id} setRefresh={setRefresh} {...listData} />
          ))}
        </div>
    </div>
  )
}

export { Dashboard }
