import { useState, useEffect } from 'react'
import * as api from '../../../Api/sectionApi'
import { List } from '../Dashboard/List'
import {Menu} from '../Dashboard/Header/Menu'

function Section() {
  const [refreshSection, setRefreshSection] = useState(false)
  const [errors, setErrors] = useState([])
  const [sectionName, setSectionName] = useState('')

  const [sections, setSections] = useState([])
  const [currentSection, setCurrentSection] = useState(null)
  const [currentSectionId, setCurrentSectionId] = useState(null)
  const [currentSectionName, setCurrentSectionName] = useState(null)
  console.log(currentSectionId, 'cr Sections')

  useEffect(() => {
    async function get() {
        let response;
      try {
        if(currentSectionId){
             response = await api.getOne(currentSectionId)
             setCurrentSection(response[0])
             setCurrentSectionName(response[0].sectionname)
             setCurrentSectionId(response[0]._id)
        }else{
             response = await api.getAll(localStorage.getItem('userId'))
             setCurrentSection(response[0])
             setCurrentSectionName(response[0].sectionname)
             setCurrentSectionId(response[0]._id)
                setSections(response)
        }
      } catch (err) {
        console.log(err.message)
        // setErrors([err.message])
      }
    }
    get()
    setRefreshSection(false)
  }, [refreshSection || currentSectionId])

  async function requestHandler(e, to) {
    if (to === 'create') {
      if (sectionName.length > 0) {
        try {
          const data = generateData()
          const response = await api.create(data)
          reset()
        } catch (err) {
          console.log(err.message)
          reset()
        }
      } else {
        reset()
        setErrors(['section Field is empty !'])
      }
    } else if (to === 'delete') {
      try {
        const response = await api.del(e.target.parentElement.id)
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

  function reset() {
    document.querySelector('.sectionCreateInput').value = ''
    setSectionName('')
    setErrors([])
    setRefreshSection(true)
  }

  return (
    <div className="sectionWrapper">
      {errors.length > 0 ? (
        <div className="errorsWrapper">
          {errors.map((msg) => (
            <div className="error">{msg}</div>
          ))}
        </div>
      ) : null}
      <div className="sectionInnerWrapper">
        <Menu refresh={setRefreshSection} />
        <div className="sectionHeadArea">
          <div
            className="sectionCurrent hide"
            onClick={(e) => display(e, '.sectionDropDownWrapper')}
          >
            {currentSectionName ? currentSectionName : 'Choose section'}
          </div>
          <div className="sectionDropDownWrapper hide">
            <div className="sectionCreateWrapper">
              <input
                type="text"
                className="sectionCreateInput"
                onChange={(e) => setSectionName(e.target.value)}
              />
              <i
                className="fa-solid fa-circle-plus sectionCreateIcon"
                onClick={(e) => requestHandler(e, 'create')}
              ></i>
            </div>
            {sections.map((s) => (
              <div className="sectionDropDownFieldWrapper" key={s._id} id={s._id}>
                {' '}
                <div className="sectionDropDownField" onClick={(e) => setCurrentSectionId(e.target.parentElement.id)}>{s.sectionname}</div>{' '}
                <i
                  className="fa-solid fa-trash"
                  
                  onClick={(e) => requestHandler(e, 'delete')}
                ></i>
              </div>
            ))}
          </div>
        </div>
        <div className="sectionMainArea">
          <div className="listsWrapper">
            <div className="listsInnerWrapper">
              {currentSection && currentSection?.lists.map((listData) => (
                <List
                  key={listData._id}
                  setRefresh={setRefreshSection}
                  {...listData}
                  currentSectionId={currentSectionId}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export { Section }

function display(e, selector) {
  const htmlEl = document.querySelector(selector)
  if (htmlEl.classList.contains('show')) {
    htmlEl.classList.remove('show')
  } else {
    htmlEl.classList.add('show')
  }
}
