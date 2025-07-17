import React from 'react';
import userImg from "../assets/profile.jpg";

const Profile = ({darkMode}) => {
//   const role = isAdmin ? 'Admin' : 'Student';
  const user = {
  name: 'Bishnu Yadav',
  role: 'Student',
  dob: '2002-04-21',
  grade: 'Bachelor',
  bloodGroup: 'A+',
  address: 'New Plaza, Kathmandu, Nepal',
  contact: '+977-9819748055',
  fatherName: 'Ram Narayan Yadav',
  occupation: 'Student',
  hobbies: 'Traveling, Gaming, Coding',
  nationality: 'Nepali',
  avatar: userImg,
  social: {
    facebook: '#',
    instagram: '#',
    linkedin: '#',
    twitter: '#',
    youtube: '#',
  },
};

  return (
    <div className={`profile-section ${darkMode ? "bg-dark text-white" : "bg-light text-dark"}`}>
    <div className="container">
      <div className="row">
        {/* Left Side - Avatar and Role */}
        <div className="col-md-4 text-center">
          <div className="profile-avatar">
            <img
              src={userImg}
              alt="User Avatar"
              className="img-fluid rounded-circle border border-3"
            />
            <div className="upload-icons mt-3">
              <button className="btn btn-outline-primary me-2">
                <i className="fa-solid fa-camera"></i> Upload
              </button>
              <button className="btn btn-outline-danger">
                <i className="fa-solid fa-trash"></i> Remove
              </button>
            </div>
          </div>
          <h4 className="mt-4">{user.name}</h4>
          <p className="text-muted">{user.role}</p>
        </div>

        {/* Right Side - Bio Details */}
        <div className="col-md-8">
          <div className="card p-4 shadow-sm">
            <h5 className="mb-4">My Profile</h5>
            <div className="row">
              {[
                ['Full Name', user.name],
                ['Date of Birth', user.dob],
                ['Grade', user.grade],
                ['Blood Group', user.bloodGroup],
                ['Address', user.address],
                ['Contact Number', user.contact],
                ["Father's Name", user.fatherName],
                ['Occupation', user.occupation],
                ['Hobbies', user.hobbies],
                ['Nationality', user.nationality],
              ].map(([label, value], index) => (
                <div className="col-sm-6 mb-3" key={index}>
                  <strong>{label}:</strong> <span className="text-muted">{value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Social Media Links */}
      <div className="card mt-5 p-3 text-center shadow-sm">
        <h5 className="mb-3">Social Media</h5>
        <div className="social-icons d-flex justify-content-center gap-4">
          <a href={user.social.facebook} target="_blank" rel="noopener noreferrer"><i className="fa-brands fa-facebook-f"></i></a>
          <a href={user.social.instagram} target="_blank" rel="noopener noreferrer"><i className="fa-brands fa-instagram"></i></a>
          <a href={user.social.linkedin} target="_blank" rel="noopener noreferrer"><i className="fa-brands fa-linkedin-in"></i></a>
          <a href={user.social.twitter} target="_blank" rel="noopener noreferrer"><i className="fa-brands fa-twitter"></i></a>
          <a href={user.social.youtube} target="_blank" rel="noopener noreferrer"><i className="fa-brands fa-youtube"></i></a>
        </div>
      </div>
      </div>
    </div>
  );
};

export default Profile;
