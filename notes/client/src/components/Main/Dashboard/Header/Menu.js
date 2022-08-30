
import { CreateList } from '../Create/CreateList'

function Menu(props){
    const {
        refresh
    } = props 
    return (
        <div className="menuWrapper">
            <div className="menuInnerWrapper">
            <i className="fa-solid fa-bars dashboardMenuIcon" onClick={(e) => display(e, '.dashboardMenuButtonsWrapper')}></i>
            <div className="dashboardMenuButtonsWrapper hide" >
                <div className="menuCreateListBtn" onClick={(e) => display(e, '.createListWrapperExtend')}>Create List</div>
                {/* <div className="menuCreateSectionBtn">Create Section</div> */}
            </div>

            </div>


            <CreateList refresh={refresh}  />
        </div>
    );
}


export {Menu}



function display(e, selector){
    const htmlEl = document.querySelector(selector)
    if(htmlEl.classList.contains('show')){
        htmlEl.classList.remove('show')
    }else{htmlEl.classList.add('show')}
}