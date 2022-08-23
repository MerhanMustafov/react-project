import { SearchNote } from '../Search/SearchNote'
import { useState, useEffect } from 'react'
import { socket } from '../../../../socket'
import { AddListSpinner } from '../../Spinner/Spinner'
import { createListRecord } from '../../../../Api/noteApi'
function ListSample(props) {
  const userid = localStorage.getItem('userId')
  const {setRefreshListArea} = props
  const [listname, setListName] = useState('')
  const [rowImg, setRowImg] = useState(null)
  const [errors, setErrors] = useState('')

  const [waitingAddListData, setWaitingAddListData] = useState(false)

  async function requestHandler(e, to) {
    if (to === `/list/create/${userid}`) {
      if (listname.length > 0) {
        setWaitingAddListData(true)
        const listData = await createListRecord(
          {
            rowImg,
            listname: listname.trim(),
            notes: [],
            ownerid: userid,
          },
          userid,
        )
        setRowImg(null)
        setListName('')
        socket.emit('server-refresh-all', true)

        setWaitingAddListData(false)
        display(null, '.createListWrapperExtend')
      } else {
        console.log('INNNN')
        setErrors('Fill in the title field !')
        setTimeout(() => {
          setErrors('')
        }, 3000)
      }
    }
  }

  socket.on('client-refresh-all', (refresh) => {
    setRefreshListArea(true)
  })
  return (
    <div className="sampleListWrapper">
      <label
        htmlFor="sampleUploadimg"
        className="sampleLabelInputListImg"
        onChange={(e) => set(e, setRowImg)}
      >
        <i className="fa-solid fa-images sampleAddImage"></i>
      </label>
      <input
        type="file"
        id="sampleUploadimg"
        name="uploadimg"
        onChange={(e) => set(e, setRowImg)}
      />

      <div className="sampleSearchNoteWrapper">
        <i className="fa-solid fa-magnifying-glass sampleSearchNoteIcon"></i>
      </div>
        <i
          className="fa-solid fa-arrows-left-right sampleExpandListBtn"
          onClick={(e) => display(e, '.createListWrapperExtend')}
        ></i>
       
      <div className="samplelistInnerWrapper">
         {errors && errors.length > 0 ? (
            <div className="sampleError">{errors}</div>
          ) : null}
        
        <header className="sampleListHeader">
          <input
            className="sampleTitle"
            placeholder="Enter title"
            // defaultValue={listname}
            onChange={(e) => setListName(e.target.value)}
          />
          
          <div className="sampleOptions">
            <i
                className="fa-solid fa-gear"
                title="settings"
              ></i>
          </div>
        </header>
        <main className="scrollMain"></main>
        <footer>
          <button
            className="sampleCreateListBtn"
            onClick={(e) => requestHandler(e, `/list/create/${userid}`)}
            //   onClick={(e) =>
            // addNoteBtnHandler(e, addNoteBtnClicked, setAddNoteBtnClicked)
            //   }
          >
            {waitingAddListData ? <AddListSpinner /> : 'SAVE'}
          </button>
        </footer>
      </div>
    </div>
  )
}

export { ListSample }

function set(e, setImage) {
  uploadImgHandler(e, setImage)
  document.getElementById('sampleUploadimg').value = ''
  document.querySelector('.sampleLabelInputListImg').value = ''
}

function uploadImgHandler(e, setImage) {
  const reader = new FileReader()
  reader.addEventListener('load', (e) => {
    const url = reader.result
    document.querySelector('.sampleListWrapper').style.backgroundImage = `url(${url})`
    setImage(url)
  })
  reader.readAsDataURL(e.target.files[0])
}

function cleanFields(){
    document.querySelector('.sampleTitle').value = ''
    document.querySelector('.sampleLabelInputListImg').value = ''
    document.querySelector('.sampleListWrapper').style.backgroundImage = ``
    // document.getElementById('sampleUploadimg').value = ''

}
function display(e, selector) {
    cleanFields()
  const htmlEl = document.querySelector(selector)
  console.log(htmlEl)
  if (htmlEl.classList.contains('show')) {
    htmlEl.classList.remove('show')
  } else {
    htmlEl.classList.add('show')
  }
}
