import { ListSample } from './ListSample'

function CreateList(props) {
  const userid = localStorage.getItem('userId')
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

  return (
    <div className="createListWrapperExtend hide">
      <ListSample
        sections={sections}
        setSections={setSections}
        sectionNames={sectionNames}
        setSectionNames={setSectionNames}
        sectionName={sectionName}
        setSectionName={setSectionName}
        currentSection={currentSection}
        setCurrentSection={setCurrentSection}
        currentSectionId={currentSectionId}
        setCurrentSectionId={setCurrentSectionId}
        currentSectionName={currentSectionName}
        setCurrentSectionName={setCurrentSectionName}
        refresh={refresh}
      />
    </div>
  )
}

export { CreateList }

{
  /* <div className="createListWrapper">
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
      </div> */
}
