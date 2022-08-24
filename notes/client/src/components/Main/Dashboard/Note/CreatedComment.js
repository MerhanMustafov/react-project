import maleimg from '../../../../profileImages/male.jpg'
import femaleimg from '../../../../profileImages/female.jpg'
import { useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { getUserByName } from '../../../../Api/userApi'
import { updateComment } from '../../../../Api/commentApi'
import { ConfurmationDelW } from './ConfirmationDelW'

import {socket} from '../../../../socket'

function CreatedComment(props) {
  const params = useParams()
  const navigate = useNavigate()
  const {
    username,
    setListNoteClicked,
    _id,
    noteid,
    setRefreshComments,
    ownerid,
    ownerimg,
    isLogged,
    setAddCommentWindow,
    addCommentWindow,
    comment,
  } = props
  const isAuthor = ownerid === localStorage.getItem('userId')

  const [userData, setUserData] = useState()
  const [userImg, setUserImg] = useState(null)
  const [newComment, setNewComment] = useState('')

  useEffect(() => {
    getUserByName(username).then((data) => {
        setUserData(data[0])
        const image = setImage(data)
        setUserImg(image)
        })
  }, [])

  async function requestHandler(e, to) {
    if (to === `/comment/update/${_id}`) {
      if (newComment.length > 0 && newComment !== comment) {
        try {
          const res = await updateComment({ comment: newComment.trim() }, _id)
          socket.emit('server-refresh-all', true)
        } catch (err) {
          console.log(err.message)
        }
      }
    }
  }
  
  async function userClickedHandler(e) {
    const user = await getUserByName(username)
    if (params.userid === user[0]._id) {
      setListNoteClicked(false)
    } else {
      navigate(`/profile/${user[0].username}/${user[0]._id}`)
    }
  }


  socket.on('client-refresh-all', (refresh) => {
    setRefreshComments(true)
  })


  return (
    <div className={`CreatedCommentWrapper commentBox ${isAuthor ? 'authorsCommentBox' : null}`} id={props._id}>
      {isLogged ? (
        <i
          className="fa-solid fa-comment-dots addCommentIcon"
          onClick={(e) =>
            savecommentHandler(e, _id, addCommentWindow, setAddCommentWindow)
          }
        ></i>
      ) : null}

      {isAuthor ? (
        <>
          <div className="commentDelBtn">
            <i
              className="fa-solid fa-xmark deleteCommentIcon"
              title="delete single comment"
              onClick={(e) => showHide(e, _id)}
            ></i>
            <ConfurmationDelW
              {...props}
              setRefreshComments={setRefreshComments}
            />
            <i
              title="save changes"
              className="fa-regular fa-floppy-disk editComment"
              onClick={(e) => requestHandler(e, `/comment/update/${_id}`)}
            ></i>
          </div>
        </>
      ) : null}

      <div className="commentUserArea">
        <img src={ownerimg} alt="user image" />
        <div className="commentUsername" onClick={(e) => userClickedHandler(e)}>
          {props.username}
        </div>
      </div>
      <div className="commentcontentWrapper">
        {/* <i class="fa-solid fa-window-minimize minimizeButton" onClick={(e) => minimaze(e, _id)}></i> */}
        {/* <i class="fa-solid fa-down-left-and-up-right-to-center minimazeButtonMiddle"></i> */}
        <div className="commentcontentInnerWrapper">
        <i
          className="fa-solid fa-maximize risizeBtnTop"
          onClick={(e) => resizeBtn(e, _id)}
        ></i>

        <i
          className="fa-solid fa-maximize risizeBtnBottom"
          onClick={(e) => resizeBtn(e, _id)}
        ></i>
        <textarea
          className="createdCommentContent"
          onChange={(e) => setNewComment(e.target.value)}
          onClick={(e) => maximize(e, _id)}
          readOnly={isAuthor ? false : true}
          defaultValue={props.comment}
        ></textarea>
        </div>
      </div>
    </div>
  )
}

export { CreatedComment }

function setImage(data) {
  if (data.cld_profile_img_url) {
    return data.cld_profile_img_url
  } else if (data.profile_img_web_link) {
    return data.profile_img_web_link
  } else {
    if (data.gender == 'male') {
      return data.default_image_male
    } else if (data.gender == 'female') {
      return data.default_image_female
    }
  }
}


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
function maximize(e, commentid) {
  const el = document
    .getElementById(commentid)
    .querySelector('.createdCommentContent')
  el.style.height = '30px'
  el.style.height = el.scrollHeight + 'px'
}
function resizeBtn(e, commentid) {
  const el = document
    .getElementById(commentid)
    .querySelector('.createdCommentContent')
  const heightNum = Number(el.style.height.slice(0, -2))
  if (heightNum > 30) {
    el.style.height = '30px'
  } else {
    el.style.height = '30px'
    el.style.height = el.scrollHeight + 'px'
  }
}
// function minimaze(e, commentid){
//     const el = document.getElementById(commentid).querySelector('.createdCommentContent')
//     el.style.height = '30px'
// }

function savecommentHandler(
  e,
  commentid,
  addCommentWindow,
  setAddCommentWindow,
) {
  addCommentWindow ? setAddCommentWindow(false) : setAddCommentWindow(true)
}
