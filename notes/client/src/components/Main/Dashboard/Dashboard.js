import { useState, useEffect } from 'react'
import { getAllLists } from '../../../Api/noteApi'
import { List } from './List'
import { Search } from './Search/Search'
import { Spinner } from '../Spinner/Spinner'
// import { CreateList } from './CreateList/CreateList'
import {Menu} from './Header/Menu'
function Dashboard() {
  let key = 165156
    const uid = localStorage.getItem('userId')
  const [refresh, setRefresh] = useState(false)
  const [refreshListArea, setRefreshListArea] = useState(false)
  
//   const [refreshDashboard, setRefresh] = useState(false)

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
    <div className="dashboardHeaderArea">
        <Menu setRefreshListArea={setRefreshListArea}/>
      
      {/* <AddList setRefresh={setRefresh}  /> */}
    </div>

        <div className="listsWrapper">
            <Search
        setArrayOfLists={setArrayOfLists}
        arrayOfLists={arrayOfLists}
        setRefresh={setRefresh}
        uid={uid}
      />
      <div className="listsInnerWrapper">
          {arrayOfLists.map((listData) => (
            <List key={listData._id} setRefresh={setRefresh} {...listData} />
          ))}
        </div>
    </div>
    </div>
  )
}

export { Dashboard }


