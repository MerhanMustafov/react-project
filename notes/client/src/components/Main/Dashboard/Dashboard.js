import { useState, useEffect } from 'react'
import { getAllLists } from '../../../Api/noteService'
import { List } from './List'
import { Search } from './Search/Search'
import { Spinner } from '../Spinner/Spinner'
import {AddList} from './AddList/AddList'

function Dashboard() {
  let key = 165156
  const [refresh, setRefresh] = useState(false)

  const [addNoteBtn, setAddNoteBtn] = useState('')
  const [arrayOfLists, setArrayOfLists] = useState([])
  const [waitingData, setWaitingData] = useState(false)

  useEffect(() => {
    async function getLists() {
      const userId = localStorage.getItem('userId')
      setWaitingData(true)
      const lists = await getAllLists(userId)
      setArrayOfLists(lists)
      setRefresh(false)
      setTimeout(() => {
        setWaitingData(false)
      }, 300)
    }
    getLists()
  }, [refresh === true])

 

  return (
    <div className="dashboardWrapper">
      <Search
        setArrayOfLists={setArrayOfLists}
        arrayOfLists={arrayOfLists}
        setRefresh={setRefresh}
      />

      <AddList setRefresh={setRefresh}/>

      {waitingData ? (
        <Spinner />
      ) : (
        <div className="listsWrapper">
          {arrayOfLists.map((listData) => (
            <List key={listData._id} setRefresh={setRefresh} {...listData} />
          ))}
        </div>
      )}
    </div>
  )
}

export { Dashboard }

