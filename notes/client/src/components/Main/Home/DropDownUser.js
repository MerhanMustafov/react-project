import { useNavigate } from 'react-router-dom'
function DropDownUser(props) {
  const [maleImg, femaleImg] = [
    require('../../../profileImages/male.jpg'),
    require('../../../profileImages/female.jpg'),
  ]
    const navigate = useNavigate()
  return (
    <div
      className={`userWrapper ${props._id}`}
      onClick={(e) => navigate(`/profile/${props.username}/${props._id}`)}
    >
      <img src={props.gender === 'male' ? maleImg : femaleImg} alt="" />
      <div className="name">{props.username}</div>
      <div className="listCount">{props.lists.length}</div>
    </div>
  )
}

export { DropDownUser }
