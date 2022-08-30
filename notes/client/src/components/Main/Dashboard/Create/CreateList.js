import {ListSample} from './ListSample'

function CreateList(props) {
  const userid = localStorage.getItem('userId')
  const { refresh } = props
  


  return (
    <div className="createListWrapperExtend hide">
        <ListSample refresh={refresh}/>
      
    </div>
  )
}

export { CreateList }

{/* <div className="createListWrapper">
        <i className="fa-solid fa-xmark createListCloseIcon" onClick={(e) => display(e, 'createListWrapperExtend')}></i>
        <div className="createListInnerWrapper">
          
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
          <button
            className="addList"
            disabled={true ? listname.length === 0 : false}
            onClick={(e) => requestHandler(e, `/list/create/${userid}`)}
          >
            {waitingAddListData ? <AddListSpinner /> : 'New List'}
          </button>
        </div>
      </div> */}