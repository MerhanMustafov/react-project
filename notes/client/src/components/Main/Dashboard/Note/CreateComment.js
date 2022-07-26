import { useState, useEffect } from 'react'
import { socket } from '../../../../socket'

const { createComment } = require('../../../../Api/commentApi')
function CreateComment(props) {
  const username = localStorage.getItem('username')
  const creatorImage = localStorage.getItem('img')
  const gender = localStorage.getItem('gender')
  const ownerid = localStorage.getItem('userId')
  const { noteid, setAddCommentWindow, setRefreshComments } = props
  const [comment, setComment] = useState('')
  const [errors, setErrors] = useState('')

  async function requestHandler(e, to) {
    e.preventDefault()
    if (to === `/comment/create/${noteid}`) {
      if (comment.length > 10) {
        try {
          const data = { comment, noteid, username, gender, ownerid, ownerimg:creatorImage,}
          const response = await createComment(data, noteid)
          socket.emit('server-refresh-all', true)
          setAddCommentWindow(false)
        } catch (err) {
          setErrors(err.message)
          setTimeout(() => {
            setErrors('')
          }, 3000)
        }
      } else {
        setErrors('comment should be at least 10 characters long !')
        setTimeout(() => {
          setErrors('')
        }, 3000)
      }
    }
  }

  socket.on('client-refresh-all', (refresh) => {
    setRefreshComments(true)
  })
  return (
    <form className="addCommentForm">
      <i
        className="fa-regular fa-floppy-disk saveComment"
        title="save"
        onClick={(e) => requestHandler(e, `/comment/create/${noteid}`)}
      ></i>
      {errors ? <p className="commentError">{errors}</p> : null}
      <textarea
        name="comment"
        id="addCommentWindow"
        cols="30"
        rows="10"
        onChange={(e) => setComment(e.target.value)}
      ></textarea>
    </form>
  )
}

export { CreateComment }
