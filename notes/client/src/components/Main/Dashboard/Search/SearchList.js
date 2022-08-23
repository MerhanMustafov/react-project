import { useState, useEffect } from 'react'
import { getAllLists } from '../../../../Api/listApi'

function SearchList(props) {
  const { setArrayOfLists, arrayOfLists, setRefresh, uid } = props
  const [allLists, setAllLists] = useState([])
  const userId = uid
 
  useEffect(() => {
    getAllLists(userId).then((data) => setAllLists(data))
  }, [allLists.length !== arrayOfLists.length])


    function match(input) {
      if (!input) {
        setArrayOfLists(allLists)
      } else if (input.length > 0) {
        const filtered = allLists.filter((d) =>
          d.listname.toLowerCase().includes(input.toLowerCase()),
        )
        if (filtered.length > 0) {
          setArrayOfLists(filtered)
        } else {
          setArrayOfLists(allLists)
        }
      } else {
        setArrayOfLists(allLists)
      }
    }

  return (
    <div className="searchListWrapper">
      <input
        type="text"
        id="searchBox"
        placeholder="Search a list"
        autoComplete="off"
        name="sectionTitle"
        onChange={(e) =>  match(e.target.value)}
      />
    </div>
  )
}

export { SearchList }
