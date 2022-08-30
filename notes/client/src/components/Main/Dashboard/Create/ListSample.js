import { SearchNote } from '../Search/SearchNote'
import { useState, useEffect } from 'react'
import { socket } from '../../../../socket'
import { AddListSpinner } from '../../Spinner/Spinner'
import { createListRecord } from '../../../../Api/listApi'
import { getAll, create, del, getByName } from '../../../../Api/sectionApi'
function ListSample(props) {
  const userid = localStorage.getItem('userId')
  const [refreshListSample, setRefreshListSample] = useState('')
  const [listname, setListName] = useState('')
  const [uploadedImg, setUploadedImg] = useState(null)
  const [linkImg, setLinkImg] = useState(null)
  const [errors, setErrors] = useState('')
  const [waitingAddListData, setWaitingAddListData] = useState(false)

    const {
    sections,
    setSections,
    sectionNames,
    setSectionNames,
    sectionName,
    setSectionName,
    currentSection,
    setCurrentSection,
    currentSectionId,
    setCurrentSectionId,
    currentSectionName,
    setCurrentSectionName,
    refresh,
  } = props



  async function requestHandler(e, to) {
    if (to === `/list/create/${userid}`) {
      if (listname.length > 0) {
        if(currentSectionName){
            setWaitingAddListData(true)
        try {
            const section = await getByName(currentSectionName)
          const listData = await createListRecord(
            {
              uploadedImg,
              linkImg,
              listname: listname.trim(),
              notes: [],
              sectionid: section._id,
              sectionname: section.sectionname,
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
          displaySection(null, '.sampleSectionDropDownWrapper')
          setCurrentSection(null)
          document.querySelector('.sampleSectionDropDownWrapper').classList.remove('show')
        } catch (err) {
          setErrors(err.message)
          document.querySelector('.sampleSectionDropDownWrapper').classList.remove('show')
          setTimeout(() => {
            setErrors('')
          }, 3000)
        }

        }else{
            setErrors('Choose section !')
            document.querySelector('.sampleSectionDropDownWrapper').classList.remove('show')
        setTimeout(() => {
          setErrors('')
        }, 3000)
        }
        
      } else {
        setErrors('Fill in the title field !')
        document.querySelector('.sampleSectionDropDownWrapper').classList.remove('show')
        setTimeout(() => {
          setErrors('')
        }, 3000)
      }
    }
    if (to === 'create') {
      if (sectionName.length > 0) {
        if (!sectionNames.includes(sectionName)) {
          try {
            const data = generateData()
            const response = await create(data)
            reset()
          } catch (err) {
            console.log(err.message)
            reset()
          }
        } else {
          setErrors(['section alredy exists !'])
          setTimeout(() => {
          setErrors('')
        }, 3000)
        }
      } else {
        setErrors(['section alredy exists !'])
        setTimeout(() => {
          setErrors('')
        }, 3000)
      }
    } else if (to === 'delete') {
      try {
        const response = await del(e.target.parentElement.id)
        reset()
      } catch (err) {
        reset()
        console.log(err.message)
      }
    }
  }

  function generateData() {
    return {
      sectionname: sectionName,
      ownerid: localStorage.getItem('userId'),
      lists: [],
    }
  }

//   function reset() {
//     document.querySelector('.sampleSectionCreateInput').value = ''
//     setSectionName('')
//     setErrors([])
//     refresh(true)
//     // setRefreshListSample(true)
//   }

    function reset() {
    document.querySelector('.sampleSectionCreateInput').value = ''
    setCurrentSectionId(null)
    setSectionName('')
    setErrors([])
    refresh(true)
  }
  socket.on('client-refresh-all', () => {
    refresh(true)
  })

  function sett(e){
    setCurrentSectionName(e.target.innerText?.trim())
    setCurrentSectionId(e.target.parentElement.id)
    displaySection(null, '.sampleSectionDropDownWrapper')
  }

  return (
    <div className="sampleListWrapper">
      <div className="sampleSectionHeadArea">
        <div
          className="sampleSectionCurrent hide"
          onClick={(e) => displaySection(e, '.sampleSectionDropDownWrapper')}
        >
          {currentSectionName ? currentSectionName : 'Choose Section'}
        </div>
        <div className="sampleSectionDropDownWrapper hide">
          <div className="sampleSectionCreateWrapper">
            <input
              type="text"
              className="sampleSectionCreateInput"
              onChange={(e) => setSectionName(e.target.value)}
            />
            <i
              className="fa-solid fa-circle-plus sampleSectionCreateIcon"
              onClick={(e) => requestHandler(e, 'create')}
            ></i>
          </div>
          <div className="sectionDropDownFieldsWrapper">
            {sections.map((s) => (
            <div className="sectionDropDownFieldWrapper" key={s._id} id={s._id}>
              {' '}
              <div
                className="sectionDropDownField"
                onClick={(e) =>
                sett(e)
                  
                }
              >
                {s.sectionname}
              </div>{' '}
              <i
                className="fa-solid fa-trash"
                onClick={(e) => requestHandler(e, 'delete')}
              ></i>
            </div>
          ))}


          </div>
          
        </div>
      </div>
      <input
        type="file"
        id="sampleUploadimg"
        name="uploadimg"
        onChange={(e) => setImg(e, setUploadedImg, setLinkImg, null)}
      />
      <div className="sampleOptions">
        <i
          className="fa-solid fa-gear"
          title="settings"
          onClick={(e) => displayImg(e, '.optionsWrapper')}
        ></i>

        <div className="optionsWrapper hide">
          {/* <i className="fa-solid fa-images sampleAddImage"></i> */}

          <div className="optionsInnerwrapper">
            <div className="imgOptionWrapper hide">
              <div className="wrap hide">
                <i
                  className="fa-solid fa-magnifying-glass setIcon"
                  onClick={(e) => setImg(e, setUploadedImg, setLinkImg, 'link')}
                ></i>

                <div className="sampleImgLinkWrapper hide">
                  <input type="text" className="inputLink" />
                </div>
              </div>

              <i
                className="fa-solid fa-link imgIconLink"
                onClick={(e) => displayImg(e, '.wrap')}
              ></i>

              <label
                htmlFor="sampleUploadimg"
                className="sampleLabelInputListImg"
                onChange={(e) => setImg(e, setUploadedImg, setLinkImg, null)}
              >
                <i className="fa-solid fa-upload imgIconUpload"></i>
              </label>
            </div>

            <i
              className="fa-solid fa-image sampleAddImage"
              onClick={(e) => displayImg(e, '.imgOptionWrapper')}
            ></i>
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

function setImg(e, setUpload, setLink, link) {
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

function displayImg(e, classN) {
  const el = document.querySelector(classN)
  if (el.classList.contains('show')) {
    if (classN === '.optionsWrapper') {
      closeSettingsOptions()
    } else if (classN === '.imgOptionWrapper') {
      el.classList.remove('show')
      document.querySelector('.wrap').classList.remove('show')
    }
    el.classList.remove('show')
  } else {
    el.classList.add('show')
  }
}

function closeSettingsOptions() {
  document.querySelector('.optionsWrapper').classList.remove('show')
  document.querySelector('.imgOptionWrapper').classList.remove('show')
  document.querySelector('.wrap').classList.remove('show')
  document.querySelector('.sampleSectionDropDownWrapper').classList.remove('show')
}

function displaySection(e, selector) {
  const htmlEl = document.querySelector(selector)
  if (htmlEl.classList.contains('show')) {
    htmlEl.classList.remove('show')
  } else {
    htmlEl.classList.add('show')
  }
}
