import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { getUserByIdWithLists } from '../../../Api/userService'
import { List } from '../Dashboard/List'

function UserProfile() {
  const [maleImg, femaleImg] = [
    require('../../../profileImages/male.jpg'),
    require('../../../profileImages/female.jpg'),
  ]
  const params = useParams()
  const [userData, setUserData] = useState()

  useEffect(() => {
    getUserByIdWithLists(params.userid)
      .then((res) => res.json())
      .then((data) => setUserData(data))
  }, [])
  console.log('Profile page view', userData)

  return (
    <>
      <div className="userProfilePageWrapper">
        <div className="profileInfoSection">
          <div>
            <img
              src={userData?.gender === 'male' ? maleImg : femaleImg}
              alt="prof img"
            />
            <div className="nameAreaWrapper">
              <div className="profSName">{userData?.username}</div>
              <div className="UserProfileListCount">
                {userData?.lists.length}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="dashboardWrapper">
          {/* {waitingData ? (
        <Spinner />
      ) : ( */}
          <div className="listsWrapper">
            {userData?.lists.map((listData) => (
              <List key={listData._id} {...listData} />
            ))}
          </div>
          {/* )} */}
      </div>
    </>
  )
}

export { UserProfile }
