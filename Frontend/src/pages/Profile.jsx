import React, { useEffect, useState } from 'react';
import userImg from "../assets/profile.jpg";
import axios from "axios";

const Profile = ({ darkMode }) => {
  const [user, setUser] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({});
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/profile/getuser", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(res.data);
        setFormData(res.data);
        setAvatarPreview(res.data.avatar || userImg);
      } catch (err) {
        console.error("Error fetching profile", err);
      }
    };

    if (token) fetchProfile();
  }, [token]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
    setAvatarPreview(URL.createObjectURL(file));
  };

  const handleImageUpload = async () => {
    if (!imageFile) return alert("No file selected");

    const formDataImage = new FormData();
    formDataImage.append("file", imageFile);

    try {
      const uploadRes = await axios.post("http://localhost:5000/upload", formDataImage, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const filePath = uploadRes.data.filePath;

      const avatarUpdateRes = await axios.put("http://localhost:5000/api/profile/update-avatar", {
        avatar: filePath,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUser({ ...user, avatar: avatarUpdateRes.data.avatar });
      alert("Profile picture updated");
    } catch (err) {
      console.error(err);
      alert("Upload failed");
    }
  };

  const handleImageDelete = async () => {
    try {
      await axios.delete("http://localhost:5000/api/profile/delete-avatar", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser({ ...user, avatar: null });
      setAvatarPreview(userImg);
    } catch (err) {
      console.error(err);
      alert("Failed to delete image");
    }
  };

  const handleSubmit = async () => {
    try {
      const res = await axios.put("http://localhost:5000/api/profile/update-profile", formData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setUser(res.data.updatedUser || res.data);
      setEditMode(false);
      alert("Profile updated successfully");
    } catch (err) {
      console.error("Failed to update profile", err);
      alert("Profile update failed");
    }
  };

  if (!user) return <p className="text-center mt-5">Loading profile...</p>;

  return (
    <div className={`profile-section ${darkMode ? "bg-dark text-white" : "bg-light text-dark"}`}>
      <div className="container">
        <div className="row">
          {/* Avatar */}
          <div className="col-md-4 text-center">
            <img src={`http://localhost:5000${user.avatar || ''}`} onError={(e) => e.target.src = userImg} alt="Avatar" className="img-fluid rounded-circle border border-3" />
            <input type="file" accept="image/*" onChange={handleImageChange} className="form-control mt-2" />
            <button className="btn btn-outline-primary mt-2" onClick={handleImageUpload}>Upload</button>
            <button className="btn btn-outline-danger mt-2" onClick={handleImageDelete}>Remove</button>
            <h4 className="mt-4">{user.name}</h4>
            <p className="text-muted text-capitalize">{user.role}</p>
            <button className="btn btn-warning mt-2" onClick={() => setEditMode(!editMode)}>
              {editMode ? "Cancel Edit" : "Edit Profile"}
            </button>
          </div>

          {/* Profile Info */}
          <div className="col-md-8">
            <div className="card p-4 shadow-sm">
              <h5 className="mb-4">My Profile</h5>
              <div className="row">
                {user.role === "admin" ? (
                  <>
                    <EditableField label="Name" name="name" value={formData.name} editMode={editMode} onChange={handleChange} />
                    <EditableField label="Email" name="email" value={formData.email} editMode={editMode} onChange={handleChange} />
                  </>
                ) : (
                  <>
                    <EditableField label="Full Name" name="name" value={formData.name} editMode={editMode} onChange={handleChange} />
                    <EditableField label="Date of Birth" name="dob" value={formData.dob} editMode={editMode} onChange={handleChange} />
                    <EditableField label="Grade" name="grade" value={formData.grade} editMode={editMode} onChange={handleChange} />
                    <EditableField label="Blood Group" name="bloodGroup" value={formData.bloodGroup} editMode={editMode} onChange={handleChange} />
                    <EditableField label="Address" name="address" value={formData.address} editMode={editMode} onChange={handleChange} />
                    <EditableField label="Contact" name="contact" value={formData.contact} editMode={editMode} onChange={handleChange} />
                    <EditableField label="Father's Name" name="fatherName" value={formData.fatherName} editMode={editMode} onChange={handleChange} />
                    <EditableField label="Occupation" name="occupation" value={formData.occupation} editMode={editMode} onChange={handleChange} />
                    <EditableField label="Hobbies" name="hobbies" value={formData.hobbies} editMode={editMode} onChange={handleChange} />
                    <EditableField label="Nationality" name="nationality" value={formData.nationality} editMode={editMode} onChange={handleChange} />
                  </>
                )}
              </div>

              {editMode && (
                <div className="mt-3 text-end">
                  <button className="btn btn-success" onClick={handleSubmit}>Save Changes</button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const EditableField = ({ label, name, value, editMode, onChange }) => (
  <div className="col-sm-6 mb-3">
    <strong>{label}:</strong>
    {editMode ? (
      <input
        type="text"
        name={name}
        value={value || ""}
        onChange={onChange}
        className="form-control mt-1"
      />
    ) : (
      <span className="text-muted"> {value || "Not set"}</span>
    )}
  </div>
);

export default Profile;
