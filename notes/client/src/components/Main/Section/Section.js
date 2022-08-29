import { useState, useEffect } from 'react'
import * as api from '../../../Api/sectionApi'

function Section() {
  const [refreshSection, setRefreshSection] = useState(false)
  const [errors, setErrors] = useState([])
  const [sectionName, setSectionName] = useState('')

  async function requestHandler(e, to) {
    if (to === 'create') {
      if (sectionName.length > 0) {
        try {
          const data = generateData()
          const response = await api.create(data)
        } catch (err) {
          console.log(err.message)
        }
      } else {
        setErrors(['section Field is empty !'])
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
        <div className="sectionHeadArea">
          <div className="sectionCurrent">Javascript</div>
          <div className="sectionDropDownWrapper hide">
            <div className="sectionCreateWrapper">
              <input
                type="text"
                className="sectionCreateInput"
                onChange={(e) => setSectionName(e.target.value)}
              />
              <i className="fa-solid fa-circle-plus sectionCreateIcon" onClick={(e) => requestHandler(e, 'create')}></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export { Section }
