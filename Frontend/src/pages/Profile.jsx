import React, { useEffect, useState, useContext, useRef } from 'react';
import StudentContext from '../context/StudentContext';
import { FaEdit } from 'react-icons/fa';
import { FaUpload, FaTrash, FaFacebook, FaInstagram, FaTwitter, FaLinkedin, FaCheck } from 'react-icons/fa6';
import axios from "axios";

const getInitial = (name) => name ? name.charAt(0).toUpperCase() : '?';

const socialIcons = {
  facebook: <FaFacebook color="#1877f3" />,
  instagram: <FaInstagram color="#e4405f" />,
  twitter: <FaTwitter color="#1da1f2" />,
  linkedin: <FaLinkedin color="#0077b5" />,
};

const Profile = ({ darkMode }) => {
  const { user, setUser, fetchUser } = useContext(StudentContext);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({});
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [socialLinks, setSocialLinks] = useState({ facebook: '', instagram: '', twitter: '', linkedin: '' });
  const [showSocialEdit, setShowSocialEdit] = useState(false);
  const token = localStorage.getItem("token");
  const fileInputRef = useRef();

  useEffect(() => {
    if (token) fetchUser();
  }, [token]);

  useEffect(() => {
    if (user) {
      setFormData(user);
      setAvatarPreview(user.avatar ? `http://localhost:5000${user.avatar}` : null);
      setSocialLinks(user.socialLinks || { facebook: '', instagram: '', twitter: '', linkedin: '' });
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSocialChange = (e) => {
    setSocialLinks((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
    setAvatarPreview(file ? URL.createObjectURL(file) : avatarPreview);
  };

  const handleImageUpload = async () => {
    if (!imageFile) {
      Swal.fire("No File", "Please select an image to upload", "info");
      return;
    }
    const formDataImage = new FormData();
    formDataImage.append("file", imageFile);
    try {
      const uploadRes = await axios.post("http://localhost:5000/upload", formDataImage, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      const filePath = uploadRes.data.filePath;
      const avatarRes = await axios.put("http://localhost:5000/api/profile/update-avatar", {
        avatar: filePath,
      }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser((prev) => ({ ...prev, avatar: avatarRes.data.avatar }));
      setAvatarPreview(`http://localhost:5000${avatarRes.data.avatar}`);
      setImageFile(null);
      await fetchUser();
      Swal.fire("Success", "Profile picture updated!", "success");
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Upload failed", "error");
    }
  };


  const handleImageDelete = async () => {
    try {
      await axios.delete("http://localhost:5000/api/profile/delete-avatar", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser((prev) => ({ ...prev, avatar: null }));
      setAvatarPreview(null);
      Swal.fire("Deleted!", "Profile picture deleted!", "success");
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Failed to delete image", "error");
    }
  };


  const handleSubmit = async () => {
    try {
      const res = await axios.put("http://localhost:5000/api/profile/update-profile", { ...formData, socialLinks }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser(res.data.updatedUser || res.data);
      setEditMode(false);
      setShowSocialEdit(false);
      Swal.fire("Updated", "Profile updated successfully", "success");
    } catch (err) {
      console.error("Failed to update profile", err);
      Swal.fire("Error", "Profile update failed", "error");
    }
  };


  if (!user) return <p className="text-center mt-5">Loading profile...</p>;

  return (
    <div className={`profile-section min-vh-100 d-flex flex-column align-items-center justify-content-center ${darkMode ? "bg-dark text-white" : "bg-light text-dark"}`} style={{paddingTop: 40, paddingBottom: 40}}>
      <div className="container d-flex flex-column align-items-center">
        {/* Avatar Section */}
        <div className="position-relative d-flex flex-column align-items-center mb-3" style={{ width: 160, marginTop: 140 }}>
          <div style={{ position: 'relative', display: 'inline-block', margin: '0 auto' }}>
            {avatarPreview ? (
              <img
                src={avatarPreview}
                alt="Avatar"
                className="img-fluid rounded-circle border border-3 shadow"
                style={{ width: 140, height: 140, objectFit: 'cover', background: '#f8f9fa', fontSize: 48 }}
              />
            ) : (
              <div
                className="rounded-circle border border-3 d-flex align-items-center justify-content-center shadow"
                style={{ width: 140, height: 140, background: '#e0e0e0', fontSize: 48, userSelect: 'none' }}
              >
                {getInitial(user.name)}
              </div>
            )}
            {/* Upload and Delete icons */}
            <div style={{ position: 'absolute', top: 8, right: -18, display: 'flex', flexDirection: 'column', gap: 8 }}>
              <span
                style={{ background: '#fff', borderRadius: '50%', padding: 7, boxShadow: '0 0 4px #aaa', cursor: 'pointer', marginBottom: 4 }}
                title="Upload photo"
                onClick={() => fileInputRef.current.click()}
              >
                <FaUpload size={20} color="#007bff" />
              </span>
              <span
                style={{ background: '#fff', borderRadius: '50%', padding: 7, boxShadow: '0 0 4px #aaa', cursor: 'pointer' }}
                title="Delete photo"
                onClick={handleImageDelete}
              >
                <FaTrash size={20} color="#dc3545" />
              </span>
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                style={{ display: 'none' }}
                onChange={handleImageChange}
              />
            </div>
          </div>
          {/* Show save icon if imageFile is selected, else nothing. Remove Upload button. */}
          {imageFile && (
            <button className="btn btn-outline-success mt-2 d-flex align-items-center justify-content-center" style={{ width: 44, height: 44, borderRadius: '50%', padding: 0 }} onClick={handleImageUpload}>
              <FaCheck size={22} />
            </button>
          )}
          <h4 className="mt-3 mb-1 text-center">{user.name}</h4>
          <p className="text-muted text-capitalize text-center mb-2">{user.role}</p>
        </div>

        {/* Details Section */}
        <div className="card p-4 shadow-sm position-relative mb-4" style={{ maxWidth: 500, width: '100%' }}>
          <FaEdit
            className="position-absolute"
            style={{ top: 18, right: 18, cursor: 'pointer', color: editMode ? '#ffc107' : '#888' }}
            size={22}
            onClick={() => setEditMode(!editMode)}
            title={editMode ? 'Cancel Edit' : 'Edit Profile'}
          />
          <h5 className="mb-4">My Profile</h5>
          <div className="row">
            <EditableField label="Name" name="name" value={formData.name} editMode={editMode} onChange={handleChange} />
            <EditableField label="Email" name="email" value={formData.email} editMode={editMode} onChange={handleChange} />
            {user.role === "student" && (
              <EditableField label="Age" name="age" value={formData.age} editMode={editMode} onChange={handleChange} />
            )}
            {user.role === "student" && (
              <EditableField label="Course" name="course" value={formData.course?.name || ''} editMode={false} onChange={handleChange} />
            )}
            <EditableField label="Role" name="role" value={formData.role} editMode={false} onChange={handleChange} />
            <EditableField label="Joined" name="date" value={new Date(formData.date).toLocaleDateString()} editMode={false} onChange={handleChange} />
          </div>
          {editMode && (
            <div className="mt-3 text-end">
              <button className="btn btn-success" onClick={handleSubmit}>Save Changes</button>
            </div>
          )}
        </div>

        {/* Social Media Section */}
        <div className="card p-4 shadow-sm mb-4" style={{ maxWidth: 500, width: '100%' }}>
          <div className="d-flex justify-content-between align-items-center mb-2">
            <h6 className="mb-0">Social Media Links</h6>
            <button className="btn btn-sm btn-outline-secondary" onClick={() => setShowSocialEdit((v) => !v)}>
              {showSocialEdit ? 'Cancel' : 'Edit'}
            </button>
          </div>
          {showSocialEdit ? (
            <form onSubmit={e => { e.preventDefault(); handleSubmit(); }}>
              <div className="row">
                {Object.keys(socialLinks).map((platform) => (
                  <div className="col-6 mb-2" key={platform}>
                    <label className="form-label">{platform.charAt(0).toUpperCase() + platform.slice(1)}</label>
                    <input
                      type="url"
                      name={platform}
                      value={socialLinks[platform]}
                      onChange={handleSocialChange}
                      className="form-control"
                      placeholder={`Enter ${platform} link`}
                    />
                  </div>
                ))}
              </div>
              <div className="text-end">
                <button className="btn btn-primary btn-sm" type="submit">Save Links</button>
              </div>
            </form>
          ) : (
            <div className="d-flex gap-3 flex-wrap">
              {Object.entries(socialLinks).filter(([_, link]) => link).length === 0 && (
                <span className="text-muted">No social links added.</span>
              )}
              {Object.entries(socialLinks).map(([platform, link]) =>
                link ? (
                  <a key={platform} href={link} target="_blank" rel="noopener noreferrer" className="fs-4 me-2">
                    {socialIcons[platform]}
                  </a>
                ) : null
              )}
            </div>
          )}
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
