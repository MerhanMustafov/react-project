import maleimg from '../../../../profileImages/male.jpg'
import femaleimg from '../../../../profileImages/female.jpg'
import {useNavigate, useParams} from 'react-router-dom'
import {useEffect, useState} from 'react'
import {getUserByName} from '../../../../Api/userService'
import {ConfurmationDelW} from './ConfirmationDelW'
function CreatedComment(props){
    const params = useParams()
    const navigate = useNavigate()
    const {username, setListNoteClicked, _id, noteid, setRefreshComments, ownerid} = props
    const isAuthor = ownerid === localStorage.getItem('userId')

    const [userData, setUserData] = useState()

    useEffect(() => {
        getUserByName(username).then(data => setUserData(data[0]))
    }, [])
    async function userClickedHandler(e){
        const user = await getUserByName(username)
        if(params.userid === user[0]._id){
            setListNoteClicked(false)
        }else{
            navigate(`/profile/${user[0].username}/${user[0]._id}`)

        }
    }
    return(
        <div className="CreatedCommentWrapper commentBox" id={props._id}>
            {isAuthor ? <ConfurmationDelW {...props} setRefreshComments={setRefreshComments}/> : null }
            
            <div className="commentUserArea">
                    <img src={userData && userData.profile_img_url} alt="" />
                    <div className="commentUsername" onClick={(e) => userClickedHandler(e)}>{props.username}</div>
                </div>            
            <p className="createdCommentContent">{props.comment}</p>
        </div>
    );
}


export {CreatedComment}

