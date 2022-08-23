import { useState, useEffect } from 'react'
import { deleteComment } from '../../../../Api/commentApi'
import { socket } from '../../../../socket'
function ConfurmationDelW(props) {
  const { setRefreshComments } = props
  const commentid = props._id
  const noteid = props.noteid

  async function requestHandler(e, to) {
    if (to === `/comment/delete/commentid=${commentid}/noteid=${noteid}`) {
      try {
        const deleted = await deleteComment(commentid, noteid)
        socket.emit('server-refresh-all', true)
        showHide(null, commentid)
      } catch (err) {
        console.log(err.message)
      }
    }
  }

  socket.on('client-refresh-all', (refresh) => {
    setRefreshComments(refresh)
  })

  return (
    <>
      <div className="delCommentConfirmWindow">
        Are you sure ?
        <div className="buttonsWrapper">
          <button className="cancelBtn" onClick={(e) => showHide(e, commentid)}>
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

function showHide(e, commentid) {
  const el = document
    .getElementById(commentid)
    .querySelector('.delCommentConfirmWindow')
  if (el.classList.contains('showDelConfWindow')) {
    el.classList.remove('showDelConfWindow')
  } else {
    el.classList.add('showDelConfWindow')
  }
}
