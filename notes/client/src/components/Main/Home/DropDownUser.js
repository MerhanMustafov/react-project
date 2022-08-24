import { useNavigate } from 'react-router-dom'
function DropDownUser(props) {
    const userImg = setImage(props)
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
      <img src={userImg} alt="" />
      <div className="name">{props.username}</div>
      <div className="listCount">{props.lists.length}</div>
    </div>
  )
}

export { DropDownUser }



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
