import {useState, useEffect} from 'react'
import {CreateComment} from './CreateComment'
import {CreatedComment} from './CreatedComment'
import {getNoteById} from '../../../../Api/noteService'
function Comments(props) {
    const {listid, noteid, showComments, setShowComments, isLogged, setListNoteClicked} = props
    const [addCommentWindow, setAddCommentWindow] = useState(false)
    const [refreshComments, setRefreshComments] = useState(false)
    const [comments, setComments] = useState([])
    console.log(noteid)

    useEffect(() => {
        getNoteById(noteid).then(data => setComments(data.comments))
        setRefreshComments(false)
    }, [refreshComments])
  return (
    <div className="commentsWrapper">
            {isLogged 
                ? <i className="fa-solid fa-comment-dots addCommentIcon" onClick={(e) => addCommentWindow ? setAddCommentWindow(false) : setAddCommentWindow(true)}></i>
                : null}
            
            {addCommentWindow ? <CreateComment noteid={noteid} setAddCommentWindow={setAddCommentWindow} setRefreshComments={setRefreshComments}/> : null}
            

      {/* {true ? ( */}
        <div className="commentsInnerWrapper">
            {comments.length > 0 ? 
             comments.map(c => <CreatedComment {...c} setListNoteClicked={setListNoteClicked}/>)
             : <div className="commentEmpty">There is no comments yet !</div> }
        </div>
      {/* ) : null} */}
    </div>
  )
}

export { Comments }
