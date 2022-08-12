import maleimg from '../../../../profileImages/male.jpg'
import femaleimg from '../../../../profileImages/female.jpg'
function CreatedComment(props){

    const commentData = props
    return(
        <div className="CreatedCommentWrapper commentBox">
            <div className="commentUserArea">
                    <img src={props.gender == 'male' ? maleimg : femaleimg} alt="" />
                    <div className="commentUsername">{props.username}</div>
                </div>            
            <p className="createdCommentContent">{props.comment}</p>
        </div>
    );
}


export {CreatedComment}