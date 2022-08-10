function DropDownUser(props){
    const maleImg = require('../../../profileImages/male.jpg')
    const femaleImg = require('../../../profileImages/female.jpg')
    function x(e, id){
        console.log(id)
    }
    return(
        <div className={`userWrapper ${props._id}`} onClick={(e) => x(e, props._id)}>
            <img src={props.gender === 'male' ? maleImg : femaleImg} alt=""/>
            <div className="name">{props.username}</div>
            <div className="listCount">{props.lists.length}</div>
        </div>
    );
}

export {DropDownUser}