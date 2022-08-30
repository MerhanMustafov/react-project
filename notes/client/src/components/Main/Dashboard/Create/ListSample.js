import { SearchNote } from '../Search/SearchNote'
import { useState, useEffect } from 'react'
import { socket } from '../../../../socket'
import { AddListSpinner } from '../../Spinner/Spinner'
import { createListRecord } from '../../../../Api/listApi'
function ListSample(props) {
  const userid = localStorage.getItem('userId')
  const { setRefreshListArea } = props
  const [listname, setListName] = useState('')
  const [uploadedImg, setUploadedImg] = useState(null)
  const [linkImg, setLinkImg] = useState(null)
  const [errors, setErrors] = useState('')
  const [waitingAddListData, setWaitingAddListData] = useState(false)
  async function requestHandler(e, to) {
    if (to === `/list/create/${userid}`) {
      if (listname.length > 0) {
        setWaitingAddListData(true)
        try {
          const listData = await createListRecord(
            {
              uploadedImg,
              linkImg,
              listname: listname.trim(),
              notes: [],
              sectionid: null,
              ownerid: userid,
            },
            userid,
          )
          setUploadedImg(null)
          setLinkImg(null)
          setListName('')
          setWaitingAddListData(false)
          socket.emit('server-refresh-all', true)

          display(null, '.createListWrapperExtend')
        } catch (err) {
          setErrors(err.message)
          setTimeout(() => {
            setErrors('')
          }, 3000)
        }
      } else {
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
      <input
        type="file"
        id="sampleUploadimg"
        name="uploadimg"
        onChange={(e) => set(e, setUploadedImg, setLinkImg, null)}
      />
      <div className="sampleOptions">
        <i className="fa-solid fa-gear" title="settings" onClick={(e) => displayImg(e, '.optionsWrapper')}></i>

        <div className="optionsWrapper hide">
          {/* <i className="fa-solid fa-images sampleAddImage"></i> */}

          <div className="optionsInnerwrapper">
            <div className="imgOptionWrapper hide">
              <div className="wrap hide">
                <i
                  className="fa-solid fa-magnifying-glass setIcon"
                  onClick={(e) => set(e, setUploadedImg, setLinkImg, 'link')}
                ></i>

                <div className="sampleImgLinkWrapper hide">
                  <input type="text" className="inputLink" />
                </div>
              </div>

              <i className="fa-solid fa-link imgIconLink" onClick={(e) => displayImg(e, '.wrap')}></i>

              <label
                htmlFor="sampleUploadimg"
                className="sampleLabelInputListImg"
                onChange={(e) => set(e, setUploadedImg, setLinkImg, null)}
              >
                <i className="fa-solid fa-upload imgIconUpload"></i>
              </label>
            </div>

            <i className="fa-solid fa-image sampleAddImage" onClick={(e) => displayImg(e, '.imgOptionWrapper')}></i>
          </div>
        </div>
      </div>
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

function set(e, setUpload, setLink, link) {
  if (link === 'link') {
    const linkUrl = document.querySelector('.inputLink').value
    if (linkUrl) {
      document.querySelector(
        '.sampleListWrapper',
      ).style.backgroundImage = `url(${linkUrl})`
      setLink(linkUrl)
      setUpload(null)
      displayImg(e, '.wrap')
    }
  } else {
    uploadImgHandler(e, setUpload, setLink)
    
  }
  document.getElementById('sampleUploadimg').value = ''
  document.querySelector('.sampleLabelInputListImg').value = ''
  document.querySelector('.inputLink').value = ''
}

function uploadImgHandler(e, setUpload, setLink) {
  const reader = new FileReader()
  reader.addEventListener('load', (e) => {
    const url = reader.result
    document.querySelector(
      '.sampleListWrapper',
    ).style.backgroundImage = `url(${url})`
    setLink(null)
    setUpload(url)
  })
  reader.readAsDataURL(e.target.files[0])
}

function cleanFields() {
  document.querySelector('.sampleTitle').value = ''
  document.querySelector('.sampleLabelInputListImg').value = ''
  document.querySelector('.sampleListWrapper').style.backgroundImage = ``
}

function display(e, selector) {
  cleanFields()
  const htmlEl = document.querySelector(selector)
  if (htmlEl.classList.contains('show')) {
    htmlEl.classList.remove('show')
    closeSettingsOptions()
  } else {
    htmlEl.classList.add('show')
  }
}


function displayImg(e, classN){
    const el = document.querySelector(classN)
    if(el.classList.contains('show')){
        if(classN === '.optionsWrapper'){
            closeSettingsOptions()
        }
        else if(classN === '.imgOptionWrapper'){
            el.classList.remove('show')
            document.querySelector('.wrap').classList.remove('show')
        }
        el.classList.remove('show')
    }else{
        el.classList.add('show')
    }
    
}

function closeSettingsOptions(){
    document.querySelector('.optionsWrapper').classList.remove('show')
    document.querySelector('.imgOptionWrapper').classList.remove('show')
    document.querySelector('.wrap').classList.remove('show')
}

