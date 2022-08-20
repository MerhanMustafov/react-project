import { createListRecord } from '../../../../Api/noteService'
import { useState } from 'react'
import { AddListSpinner } from '../../Spinner/Spinner'
import {socket} from '../../../../socket'

function AddList(props) {
  const userid = localStorage.getItem('userId')
  const { setRefresh } = props
  const [listname, setListName] = useState('')
  const [image, setImage] = useState('')
  
  const [waitingAddListData, setWaitingAddListData] = useState(false)



  async function requestHandler(e, to) {
    if (to === `/list/create/${userid}`) {
        setWaitingAddListData(true)
      const listData = await createListRecord(
        {
          rowImg: image,
          listname: listname.trim(),
          notes: [],
          ownerid: userid,
        },
        userid,
      )
      setImage('')
      setListName('')
      socket.emit('server-refresh-all', true)
      
      setWaitingAddListData(false)
    }
  }

  socket.on('client-refresh-all', (refresh) => {
    setRefresh(true)
  })
  return (
      <div className="addListWrapper">
        <div className="addListInnerWrapper">
          <button
            className="addList"
            disabled={true ? listname.length === 0 : false}
            onClick={(e) => requestHandler(e, `/list/create/${userid}`)}
          >
       { waitingAddListData ? <AddListSpinner /> :  'New List'}
       {/* { true ? <AddListSpinner /> :  'New List'} */}
           
          </button>
          <input
            type="text"
            id="listI"
            placeholder="Type List Title..."
            value={'' ? listname.length > 0 : listname}
            onChange={(e) => setListName(e.target.value)}
          />
          <label
            htmlFor="uploadimg"
            className="labelInputListImg"
            onChange={(e) => set(e, setImage)}
          >
            Upload List Img
          </label>
          <input
            type="file"
            id="uploadimg"
            name="uploadimg"
            onChange={(e) => set(e, setImage)}
          />
        </div>
      </div>
  )
}

export { AddList }

function set(e, setImage) {
  uploadImgHandler(e, setImage)
  document.getElementById('uploadimg').value = ''
  document.querySelector('.labelInputListImg').value = ''
}

function uploadImgHandler(e, setImage) {
  const reader = new FileReader()
  reader.addEventListener('load', (e) => {
    const url = reader.result
    setImage(url)
  })
  reader.readAsDataURL(e.target.files[0])
}
