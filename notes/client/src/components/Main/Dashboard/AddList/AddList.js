import { createListRecord } from '../../../../Api/noteService'
import { useState } from 'react'

function AddList(props) {
      const userid = localStorage.getItem('userId')
  const { setRefresh } = props
  const [listname, setListName] = useState('')
  const [image, setImage] = useState()

  async function requestHandler(e, to) {
    if (to === `/list/create/${userid}`) {
      const listData = await createListRecord({
        listimg: image,
        listname: listname.trim(),
        notes: [],
        ownerid: userid,
      }, userid)
      setRefresh(true)
      setListName('')
      setImage('')

    }
  }
  return (
    <div className="addListWrapper">
      <div className="addListInnerWrapper">
        <button
          className="addList"
          disabled={true ? listname.length === 0 : false}
          onClick={(e) => requestHandler(e, `/list/create/${userid}`)}
        >
          New List
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
          onChange={(e) => uploadImgHandler(e, setImage)}
        >
          Upload List Img
        </label>
        <input
          type="file"
          id="uploadimg"
          name="uploadimg"
          onChange={(e) => uploadImgHandler(e, setImage)}
        />
      </div>
    </div>
  )
}

export { AddList }

function uploadImgHandler(e, setImage) {
  const reader = new FileReader()
  reader.addEventListener('load', (e) => {
    const url = reader.result
    setImage(url)
  })
  reader.readAsDataURL(e.target.files[0])
}
