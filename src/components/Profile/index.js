import './index.css'

const Profile = props => {
  const {profileDetails} = props
  const {name, profileImageUrl, shortBio} = profileDetails
  return (
    <div className="jobProfile-bg-container">
      <img className="avatar" src={profileImageUrl} alt="profile" />
      <h1 className="avatar-name ">{name}</h1>
      <p className="avatar-description ">{shortBio}</p>
    </div>
  )
}

export default Profile
