import maleimg from '../../../../profileImages/male.jpg'
import femaleimg from '../../../../profileImages/female.jpg'
import {useNavigate, useParams} from 'react-router-dom'
import {useEffect, useState} from 'react'
import {getUserByName} from '../../../../Api/userService'
import {ConfurmationDelW} from './ConfirmationDelW'
function CreatedComment(props){
    const params = useParams()
    const navigate = useNavigate()
    const {username, setListNoteClicked, _id, noteid, setRefreshComments, ownerid, isLogged, setAddCommentWindow, addCommentWindow} = props
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
            {isLogged ?  <i className="fa-solid fa-comment-dots addCommentIcon" onClick={(e) => savecommentHandler(e, _id, addCommentWindow, setAddCommentWindow) }></i> : null }
            
            {isAuthor 
                ? 
                <>
                <div className="commentDelBtn"  >
                    <i
                    className="fa-solid fa-xmark deleteCommentIcon"
                    title="delete single comment"
                    onClick={(e) => showHide(e, _id)}
                    ></i>
                    <ConfurmationDelW {...props} setRefreshComments={setRefreshComments}/>
                </div>
                
               </>
                : null}
           
            
            <div className="commentUserArea">
                    <img src={userData && userData.profile_img_url} alt="" />
                    <div className="commentUsername" onClick={(e) => userClickedHandler(e)}>{props.username}</div>
                </div>
            <div className="commentcontentWrapper">
                {/* <i class="fa-solid fa-maximize"></i> */}
                {/* <i class="fa-solid fa-window-minimize minimizeButton" onClick={(e) => minimaze(e, _id)}></i> */}
                {/* <i class="fa-solid fa-down-left-and-up-right-to-center minimazeButtonMiddle"></i> */}
                <i class="fa-solid fa-maximize risizeBtnTop" onClick={(e) => resizeBtn(e, _id)}></i>
                <i class="fa-solid fa-maximize risizeBtnBottom" onClick={(e) => resizeBtn(e, _id)}></i>
                <textarea className="createdCommentContent" onClick={(e) => maximize(e, _id)} readOnly={isAuthor ? false : true}>{props.comment}</textarea>
                    
            </div>            
        </div>
    );
}


export {CreatedComment}



function showHide(e, commentid){
    const el = document.getElementById(commentid).querySelector('.delCommentConfirmWindow')
    if(el.classList.contains('showDelConfWindow')){
        el.classList.remove('showDelConfWindow')
    }else{
        el.classList.add('showDelConfWindow') 
    }
}
function maximize(e, commentid){
    const el = document.getElementById(commentid).querySelector('.createdCommentContent')
    el.style.height = '30px'
    el.style.height = el.scrollHeight + 'px'

    
}
function resizeBtn(e, commentid){
    const el = document.getElementById(commentid).querySelector('.createdCommentContent')
    const heightNum = Number(el.style.height.slice(0, -2))
    if(heightNum > 30){
        el.style.height = '30px'
    }else{
        el.style.height = '30px'
        el.style.height = el.scrollHeight + 'px'
    }
}
// function minimaze(e, commentid){
//     const el = document.getElementById(commentid).querySelector('.createdCommentContent')
//     el.style.height = '30px'
// }


function savecommentHandler(e, commentid, addCommentWindow, setAddCommentWindow){
    addCommentWindow ? setAddCommentWindow(false) : setAddCommentWindow(true)

}
