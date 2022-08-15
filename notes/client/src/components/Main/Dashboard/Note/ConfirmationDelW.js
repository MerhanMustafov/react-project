import { useState, useEffect } from 'react'
import {deleteComment} from '../../../../Api/noteService'
function ConfurmationDelW(props) {
    const {setRefreshComments} = props
    const commentid = props._id
    const noteid = props.noteid
    

    async function requestHandler(e, to){
        if(to === `/comment/delete/commentid=${commentid}/noteid=${noteid}`){
            const deleted = await deleteComment(commentid, noteid)
            setRefreshComments(true)
            showHide(null,commentid)
        }
    }

  return (
    <>
      <div className="delCommentConfirmWindow"  >
        Are you sure ?
        <div className="buttonsWrapper">
          <button
            className="cancelBtn"
            onClick={(e) => showHide(e, commentid)}
          >
            Cancel
          </button>
          <button
            className="delBtn"
            onClick={(e) =>
              requestHandler(
                e,
                `/comment/delete/commentid=${commentid}/noteid=${props.noteid}`,
              )
            }
          >
            Delete
          </button>
        </div>
      </div> 
      
    </>
  )
}

export { ConfurmationDelW }


function showHide(e, commentid){
    const el = document.getElementById(commentid).querySelector('.delCommentConfirmWindow')
    if(el.classList.contains('showDelConfWindow')){
        el.classList.remove('showDelConfWindow')
    }else{
        el.classList.add('showDelConfWindow') 
    }
}
