import {useState, useEffect} from 'react'
const {createComment} = require('../../../../Api/noteService')
function CreateComment(props){
    const username = localStorage.getItem('username')
    const gender = localStorage.getItem('gender')
    const ownerid = localStorage.getItem('userId')
    const {noteid, setAddCommentWindow, setRefreshComments} = props
    const [comment, setComment] = useState('')
    const [errors, setErrors] = useState('')
   

    async function requestHandler(e, to){
        e.preventDefault()
        if(to === `/comment/create/${noteid}`){
            if(comment.length > 10){
                const data = {comment, noteid, username, gender, ownerid}
                const response = await createComment(data,noteid)
                setRefreshComments(true)
                setAddCommentWindow(false)

            }else{
                setErrors('comment should be at least 10 characters long !')
                setTimeout(() => {
                    setErrors('')
                }, 3000)
            }
        }

    }
    return (
        <form className="addCommentForm">
            <i
                className="fa-regular fa-floppy-disk saveComment"
                title="save"
                onClick={(e) => requestHandler(e, `/comment/create/${noteid}`)}
            ></i>
            {errors ? <p className="commentError">{errors}</p> : null}
            <textarea name="comment" id="addCommentWindow" cols="30" rows="10" onChange={(e) => setComment(e.target.value)}></textarea>
        </form>
    );
}


export {CreateComment}