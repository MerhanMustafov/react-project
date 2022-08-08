import { SearchList } from './SearchList'
function Search(props) {
    const {setArrayOfLists, setRefresh, arrayOfLists} = props
  return (
    <div className="dashboardSearchWrapper">
      <SearchList setArrayOfLists={setArrayOfLists} setRefresh={setRefresh} arrayOfLists={arrayOfLists} />
    </div>
  )
}

export { Search }
