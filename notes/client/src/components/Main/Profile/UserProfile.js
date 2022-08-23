import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { getUserByIdWithLists } from '../../../Api/userApi'
import { List } from '../Dashboard/List'
import { Search } from '../Dashboard/Search/Search'

import maleimg from '../../../profileImages/male.jpg'
import femaleimg from '../../../profileImages/female.jpg'
function UserProfile() {
  const params = useParams()
  const [userData, setUserData] = useState()
  const [arrayOfLists, setArrayOfLists] = useState([])
  const [refresh, setRefresh] = useState(false)
  useEffect(() => {
    getUserByIdWithLists(params.userid).then((data) => set(data))
    function set(data) {
      setUserData(data)
      setArrayOfLists(data.lists)
      setRefresh(false)
    }
  }, [params.userid, refresh])
  return (
    <>
      <div className="userProfilePageWrapper">
        <div className="profileInfoSection">
          <div>
            <img
              src={userData && userData.cld_profile_img_url}
              alt="Profile Image"
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
        <Search
          setArrayOfLists={setArrayOfLists}
          arrayOfLists={arrayOfLists}
          uid={params.userid}
          setRefresh={setRefresh}
        />

        <div className="listsWrapper">
          <div className="listsInnerWrapper">
            {arrayOfLists &&
              arrayOfLists.map((listData) => (
                <List
                  key={listData._id}
                  setRefresh={setRefresh}
                  {...listData}
                />
              ))}
          </div>
        </div>
      </div>
    </>
  )
}

export { UserProfile }
