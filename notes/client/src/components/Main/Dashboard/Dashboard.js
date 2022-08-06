import { useState, useEffect } from 'react'
import { createListRecord, getAllLists } from '../../../Api/noteService'
import { List } from './List'
import { Note } from './Note'
import { Spinner } from '../Spinner/Spinner'
function Dashboard() {
  let key = 165156
  const [refresh, setRefresh] = useState(false)
  const [search, setSearch] = useState(null)
  const [addNoteBtn, setAddNoteBtn] = useState('')
  const [listname, setListName] = useState('')
  const [image, setImage] = useState()
  const [arrayOfLists, setArrayOfLists] = useState([])
  const [waitingData, setWaitingData] = useState(false)

  useEffect(() => {
    async function getLists() {
    //   setWaitingData(true)
      const userId = localStorage.getItem('userId')
      const lists = await getAllLists(userId)
      setArrayOfLists(lists)
      setListName('')
        setRefresh(false)

    }
    getLists()
  }, [refresh === true])

  async function requestHandler(e, to) {
    if (to === '/list/create') {
      const ownerid = localStorage.getItem('userId')
      const listData = await createListRecord({
        listimg: image,
        listname: listname.trim(),
        notes: [],
        ownerid,
      })
      setRefresh(true)
    }
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

      {addNoteBtn.length > 0 ? (
        <Note
          setRefresh={setRefresh}
          noteBtn={{ setAddNoteBtn, addNoteBtn }}
          setWaitingData={setWaitingData}
        />
      ) : null}
      <button
        className="addList"
        disabled={true ? listname.length === 0 : false}
        onClick={(e) => requestHandler(e, '/list/create')}
      >
        Add new List
      </button>
      <input
        type="text"
        id="listI"
        placeholder="type..."
        value={'' ? listname.length > 0 : listname}
        onChange={(e) => setListName(e.target.value)}
      />

      <input
        type="file"
        id="uploadimg"
        name="uploadimg"
        onChange={(e) => uploadImgHandler(e, setImage)}
      />

      {waitingData ? (
        <Spinner />
      ) : (
        <div className="listsWrapper">
          {arrayOfLists.map((listData) => (
            <List
              key={listData._id}
              setRefresh={setRefresh}
              {...listData}
              note={{ addNoteBtn, setAddNoteBtn }}
            />
          ))}
        </div>
      )}
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
  }
}

function uploadImgHandler(e, setImage) {
  const reader = new FileReader()
  reader.addEventListener('load', (e) => {
    const url = reader.result
    setImage(url)
  })
  reader.readAsDataURL(e.target.files[0])
}
