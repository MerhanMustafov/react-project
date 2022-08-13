import maleimg from '../../../../profileImages/male.jpg'
import femaleimg from '../../../../profileImages/female.jpg'
import {useNavigate, useParams} from 'react-router-dom'
import {getUserByName} from '../../../../Api/userService'
function CreatedComment(props){
    const params = useParams()
    const navigate = useNavigate()
    const {username, setListNoteClicked} = props
    console.log(params, 'PARSMS')

    async function userClickedHandler(e){
        const user = await getUserByName(username)
        console.log(user, "UUUUSSSSEEERRRRR")
        if(params.userid === user[0]._id){
            setListNoteClicked(false)
        }else{
            navigate(`/profile/${user[0].username}/${user[0]._id}`)

        }
    }

    return(
        <div className="CreatedCommentWrapper commentBox">
            <div className="commentUserArea">
                    <img src={props.gender == 'male' ? maleimg : femaleimg} alt="" />
                    <div className="commentUsername" onClick={(e) => userClickedHandler(e)}>{props.username}</div>
                </div>            
            <p className="createdCommentContent">{props.comment}</p>
        </div>
    );
}


export {CreatedComment}


function closeBtnHandler(listNoteclicked, setListNoteClicked, setEditMode, showComments, setShowComments) {
  listNoteclicked ? setListNoteClicked(false) : setListNoteClicked(true)
  if(showComments){setShowComments(false)}
  setEditMode(false)
}