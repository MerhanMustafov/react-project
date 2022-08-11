import { SearchList } from './SearchList'
function Search(props) {
    const {setArrayOfLists, setRefresh, arrayOfLists, uid} = props
  return (
    <div className="dashboardSearchWrapper">
      <SearchList setArrayOfLists={setArrayOfLists} setRefresh={setRefresh} arrayOfLists={arrayOfLists} uid={uid} />
    </div>
  )
}

export { Search }
