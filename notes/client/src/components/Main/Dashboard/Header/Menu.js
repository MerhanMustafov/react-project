import { CreateList } from '../Create/CreateList'

function Menu(props) {
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
    <div className="menuWrapper">
      <div className="menuInnerWrapper">
        {/* <i
          className="fa-solid fa-bars dashboardMenuIcon"
          onClick={(e) => display(e, '.dashboardMenuButtonsWrapper')}
        ></i> */}
        <i className="fa-solid fa-plus addListIcon" title="create list" onClick={(e) => display(e, '.createListWrapperExtend')}></i>
        {/* <div className="dashboardMenuButtonsWrapper hide">

          <div
            className="menuCreateListBtn"
            onClick={(e) => display(e, '.createListWrapperExtend')}
          >
            Create List
          </div>
        </div> */}
      </div>

      <CreateList
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

export { Menu }

function display(e, selector) {
  const htmlEl = document.querySelector(selector)
  if (htmlEl.classList.contains('show')) {
    htmlEl.classList.remove('show')
  } else {
    htmlEl.classList.add('show')
  }
}
