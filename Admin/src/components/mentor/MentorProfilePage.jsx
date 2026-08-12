import { useState } from 'react';
import {
  User,
  Shield,
  Pencil,
  Camera,
  Phone,
  Mail,
  Calendar,
  MapPin,
  ChevronDown,
  BookmarkCheck,
  CheckCircle2,
  Lock
} from 'lucide-react';
import './MentorProfilePage.css';

function SolidPenIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="#ffffff" xmlns="http://www.w3.org/2000/svg">
      <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" />
    </svg>
  );
}

function FilledCameraIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"
        fill="#7656f4"
      />
      <circle cx="12" cy="13.5" r="3.5" fill="#ffffff" />
    </svg>
  );
}

function FigmaMailIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="contact-meta-icon">
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}

function FigmaPhoneIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="#64748b" xmlns="http://www.w3.org/2000/svg" className="contact-meta-icon">
      <path d="M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2a1.003 1.003 0 011.02-.24c1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
    </svg>
  );
}

function FigmaLocationIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="#64748b" xmlns="http://www.w3.org/2000/svg" className="contact-meta-icon">
      <path fillRule="evenodd" clipRule="evenodd" d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 110-5 2.5 2.5 0 010 5z" />
    </svg>
  );
}

function FigmaHeaderPhoneIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="#7656f4" xmlns="http://www.w3.org/2000/svg">
      <path d="M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2a1.003 1.003 0 011.02-.24c1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
    </svg>
  );
}

function FigmaSaveDiskIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15.2 3a2 2 0 0 1 1.4.6l3.8 3.8a2 2 0 0 1 .6 1.4V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z" />
      <path d="M17 21v-8H7v8" />
      <path d="M7 3v5h8" />
    </svg>
  );
}

export default function MentorProfilePage() {
  const [activeTab, setActiveTab] = useState('personal');
  const [isEditing, setIsEditing] = useState(false);
  const [saveMessage, setSaveMessage] = useState('');

  // Form State
  const [formData, setFormData] = useState({
    firstName: 'Kawshik',
    middleName: '',
    lastName: 'Chattarji',
    employeeId: '1102456',
    gender: 'Male',
    department: 'Computer Science & Engineering',
    phoneNo: '9836524102',
    personalEmail: 'kawshik.chattarji123@gmail.com',
    collegeEmail: 'kawshik.chattarji@rcciit.faculty.in',
    location: 'RCCIIT, Kolkata, West Bengal',
    joinedDate: '12 Aug 2022',
    avatarUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=320&q=80',
  });

  // Security Update Form State
  const [securityData, setSecurityData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSecurityChange = (field, value) => {
    setSecurityData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSaveProfile = (e) => {
    e.preventDefault();
    setIsEditing(false);
    setSaveMessage('Profile information saved successfully!');
    setTimeout(() => setSaveMessage(''), 4000);
  };

  const handleSaveSecurity = (e) => {
    e.preventDefault();
    if (securityData.newPassword && securityData.newPassword !== securityData.confirmPassword) {
      alert('New passwords do not match!');
      return;
    }
    setSaveMessage('Password updated successfully!');
    setSecurityData({ currentPassword: '', newPassword: '', confirmPassword: '' });
    setTimeout(() => setSaveMessage(''), 4000);
  };

  const handlePhotoUpload = () => {
    const newUrl = prompt('Enter image URL for avatar:', formData.avatarUrl);
    if (newUrl) {
      setFormData((prev) => ({ ...prev, avatarUrl: newUrl }));
    }
  };

  return (
    <div className="mentor-profile-view">
      {/* Success Notification Alert */}
      {saveMessage && (
        <div className="mentor-profile-alert">
          <CheckCircle2 size={18} />
          <span>{saveMessage}</span>
        </div>
      )}

      {/* Navigation Tab Pills Bar & Edit Profile Action in SAME ROW */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div className="mentor-profile-tab-bar">
          <button
            type="button"
            className={`mentor-profile-tab personal-tab ${activeTab === 'personal' ? 'active' : ''}`}
            onClick={() => setActiveTab('personal')}
          >
            <User size={16} fill={activeTab === 'personal' ? '#7656f4' : 'none'} color={activeTab === 'personal' ? '#7656f4' : 'currentColor'} />
            <span>Personal Details</span>
          </button>

          <button
            type="button"
            className={`mentor-profile-tab ${activeTab === 'security' ? 'active' : ''}`}
            onClick={() => setActiveTab('security')}
          >
            <Shield size={17} />
            <span>Security Update</span>
          </button>
        </div>

        <button
          type="button"
          className={`mentor-edit-profile-btn ${isEditing ? 'outlined' : 'filled'}`}
          onClick={() => setIsEditing(!isEditing)}
        >
          {isEditing ? (
            <>
              <Pencil size={15} color="#7656f4" strokeWidth={2.4} />
              <span>Edit Profile</span>
            </>
          ) : (
            <>
              <SolidPenIcon />
              <span>Edit Profile</span>
            </>
          )}
        </button>
      </div>

      {/* Main Profile Content Card */}
      <div className="mentor-profile-card-container">
        {/* Banner Profile Hero Header */}
        {!isEditing ? (
          /* DEFAULT VIEW MODE: Wavy Purple Banner & Floating ID Card Graphic */
          <div className="mentor-profile-banner-hero wavy-hero-layout">
            <div className="mentor-profile-avatar-block">
              <div className="mentor-avatar-circle-wrap">
                <img
                  src={formData.avatarUrl}
                  alt={`${formData.firstName} ${formData.lastName}`}
                  className="mentor-avatar-img"
                />
                <button
                  type="button"
                  className="mentor-avatar-camera-btn"
                  onClick={handlePhotoUpload}
                  title="Change Photo"
                >
                  <FilledCameraIcon />
                </button>
              </div>

              <div className="mentor-profile-meta-info">
                <h2>{`${formData.firstName} ${formData.middleName ? formData.middleName + ' ' : ''}${formData.lastName}`}</h2>
                <span className="mentor-dept-badge">{formData.department}</span>
                <p className="mentor-profile-sub-meta">
                  Employee ID: {formData.employeeId} &nbsp;&nbsp;•&nbsp;&nbsp; {formData.gender}
                </p>
              </div>
            </div>

            {/* Decorative ID Card Graphic Illustration */}
            <div className="mentor-banner-graphic">
              <div className="mentor-banner-card-mock">
                <div className="mock-card-photo">
                  <User size={18} color="#7656f4" />
                </div>
                <div className="mock-card-lines">
                  <div className="mock-line line-1"></div>
                  <div className="mock-line line-2"></div>
                  <div className="mock-line line-3"></div>
                </div>
                <div className="mock-card-shield">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20 6L9 17l-5-5" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </div>
              <span className="star-sparkle sparkle-1">✦</span>
              <span className="star-sparkle sparkle-2">✦</span>
              <span className="star-sparkle sparkle-3">✦</span>
            </div>
          </div>
        ) : (
          /* EDIT PROFILE MODE: Contact Meta List on Right & Vertical Divider */
          <div className="mentor-profile-banner-hero edit-hero-layout">
            <div className="mentor-profile-avatar-block">
              <div className="mentor-avatar-circle-wrap">
                <img
                  src={formData.avatarUrl}
                  alt={`${formData.firstName} ${formData.lastName}`}
                  className="mentor-avatar-img"
                />
                <button
                  type="button"
                  className="mentor-avatar-camera-btn"
                  onClick={handlePhotoUpload}
                  title="Change Photo"
                >
                  <FilledCameraIcon />
                </button>
              </div>

              <div className="mentor-profile-meta-info">
                <h2>{`${formData.firstName} ${formData.middleName ? formData.middleName + ' ' : ''}${formData.lastName}`}</h2>
                <span className="mentor-dept-badge">{formData.department}</span>
                <p className="mentor-profile-emp-id">
                  Employee ID : <span>{formData.employeeId}</span>
                </p>
                <p className="mentor-profile-joined">
                  <Calendar size={15} className="joined-icon" />
                  <span>Joined on {formData.joinedDate}</span>
                </p>
              </div>
            </div>

            <div className="mentor-hero-divider"></div>

            <div className="mentor-profile-contact-meta">
              <div className="contact-meta-row">
                <FigmaMailIcon />
                <span>{formData.collegeEmail}</span>
              </div>
              <div className="contact-meta-row">
                <FigmaPhoneIcon />
                <span>{formData.phoneNo}</span>
              </div>
              <div className="contact-meta-row">
                <FigmaLocationIcon />
                <span>{formData.location}</span>
              </div>
            </div>
          </div>
        )}

        {/* TAB 1: PERSONAL DETAILS */}
        {activeTab === 'personal' && (
          <form onSubmit={handleSaveProfile} className="mentor-profile-form-body">
            {/* Section 1: Personal Details */}
            <div className="mentor-form-section">
              <div className="mentor-section-header">
                <div className="mentor-section-icon-badge">
                  <User size={18} fill="#7656f4" color="#7656f4" />
                </div>
                <h3>Personal Details</h3>
              </div>

              <div className="mentor-form-grid-3">
                {/* First Name */}
                <div className="mentor-field-group">
                  <label>First Name</label>
                  <div className="mentor-input-clean">
                    <input
                      type="text"
                      value={formData.firstName}
                      onChange={(e) => handleChange('firstName', e.target.value)}
                      readOnly={!isEditing}
                      placeholder="Enter first name"
                    />
                  </div>
                </div>

                {/* Middle Name */}
                <div className="mentor-field-group">
                  <label>Middle Name</label>
                  <div className="mentor-input-clean">
                    <input
                      type="text"
                      value={formData.middleName || '—'}
                      onChange={(e) => handleChange('middleName', e.target.value === '—' ? '' : e.target.value)}
                      readOnly={!isEditing}
                      placeholder="—"
                    />
                  </div>
                </div>

                {/* Last Name */}
                <div className="mentor-field-group">
                  <label>Last Name</label>
                  <div className="mentor-input-clean">
                    <input
                      type="text"
                      value={formData.lastName}
                      onChange={(e) => handleChange('lastName', e.target.value)}
                      readOnly={!isEditing}
                      placeholder="Enter last name"
                    />
                  </div>
                </div>

                {/* Employee ID */}
                <div className="mentor-field-group">
                  <label>Employee ID</label>
                  <div className="mentor-input-clean">
                    <input
                      type="text"
                      value={formData.employeeId}
                      onChange={(e) => handleChange('employeeId', e.target.value)}
                      readOnly={!isEditing}
                      placeholder="Enter employee ID"
                    />
                  </div>
                </div>

                {/* Gender */}
                <div className="mentor-field-group">
                  <label>Gender</label>
                  <div className="mentor-input-clean select-clean-wrap">
                    <select
                      value={formData.gender}
                      onChange={(e) => handleChange('gender', e.target.value)}
                      disabled={!isEditing}
                    >
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                    <ChevronDown size={16} className="select-arrow" />
                  </div>
                </div>

                {/* Department */}
                <div className="mentor-field-group">
                  <label>Department</label>
                  <div className="mentor-input-clean select-clean-wrap">
                    <select
                      value={formData.department}
                      onChange={(e) => handleChange('department', e.target.value)}
                      disabled={!isEditing}
                    >
                      <option value="Computer Science & Engineering">Computer Science & Engineering</option>
                      <option value="Information Technology">Information Technology</option>
                      <option value="Electronics & Communication">Electronics & Communication</option>
                      <option value="Electrical Engineering">Electrical Engineering</option>
                      <option value="Mechanical Engineering">Mechanical Engineering</option>
                    </select>
                    <ChevronDown size={16} className="select-arrow" />
                  </div>
                </div>
              </div>
            </div>

            {/* Section 2: Contact Details */}
            <div className="mentor-form-section">
              <div className="mentor-section-header">
                <div className="mentor-section-icon-badge">
                  <FigmaHeaderPhoneIcon />
                </div>
                <h3>Contact Details</h3>
              </div>

              <div className="mentor-form-grid-3">
                {/* Phone No. */}
                <div className="mentor-field-group">
                  <label>Phone No.</label>
                  <div className="mentor-input-clean">
                    <input
                      type="text"
                      value={formData.phoneNo}
                      onChange={(e) => handleChange('phoneNo', e.target.value)}
                      readOnly={!isEditing}
                      placeholder="Enter phone number"
                    />
                  </div>
                </div>

                {/* Personal Email Address */}
                <div className="mentor-field-group">
                  <label>Personal Email Address</label>
                  <div className="mentor-input-clean">
                    <input
                      type="email"
                      value={formData.personalEmail}
                      onChange={(e) => handleChange('personalEmail', e.target.value)}
                      readOnly={!isEditing}
                      placeholder="Enter personal email address"
                    />
                  </div>
                </div>

                {/* College Email Address */}
                <div className="mentor-field-group">
                  <label>College Email Address</label>
                  <div className="mentor-input-clean">
                    <input
                      type="email"
                      value={formData.collegeEmail}
                      onChange={(e) => handleChange('collegeEmail', e.target.value)}
                      readOnly={!isEditing}
                      placeholder="Enter college email address"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Right Action Buttons - Only visible when Edit Profile is active */}
            {isEditing && (
              <div className="mentor-profile-bottom-actions">
                <button
                  type="button"
                  className="mentor-cancel-btn"
                  onClick={() => setIsEditing(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="mentor-save-changes-btn">
                  <FigmaSaveDiskIcon />
                  <span>Save Changes</span>
                </button>
              </div>
            )}
          </form>
        )}

        {/* TAB 2: SECURITY UPDATE */}
        {activeTab === 'security' && (
          <form onSubmit={handleSaveSecurity} className="mentor-profile-form-body">
            <div className="mentor-form-section">
              <div className="mentor-section-header">
                <div className="mentor-section-icon-badge">
                  <Lock size={18} />
                </div>
                <h3>Security Update</h3>
              </div>

              <div className="mentor-form-grid-3 security-grid">
                <div className="mentor-field-group">
                  <label>Current Password</label>
                  <div className="mentor-input-clean">
                    <input
                      type="password"
                      value={securityData.currentPassword}
                      onChange={(e) => handleSecurityChange('currentPassword', e.target.value)}
                      placeholder="••••••••"
                      required
                    />
                  </div>
                </div>

                <div className="mentor-field-group">
                  <label>New Password</label>
                  <div className="mentor-input-clean">
                    <input
                      type="password"
                      value={securityData.newPassword}
                      onChange={(e) => handleSecurityChange('newPassword', e.target.value)}
                      placeholder="••••••••"
                      required
                    />
                  </div>
                </div>

                <div className="mentor-field-group">
                  <label>Confirm New Password</label>
                  <div className="mentor-input-clean">
                    <input
                      type="password"
                      value={securityData.confirmPassword}
                      onChange={(e) => handleSecurityChange('confirmPassword', e.target.value)}
                      placeholder="••••••••"
                      required
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="mentor-profile-bottom-actions">
              <button
                type="button"
                className="mentor-cancel-btn"
                onClick={() => setActiveTab('personal')}
              >
                Cancel
              </button>
              <button type="submit" className="mentor-save-changes-btn">
                <Lock size={16} />
                <span>Update Password</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
