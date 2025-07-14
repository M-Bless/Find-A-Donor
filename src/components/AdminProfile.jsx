import React, { useState } from 'react';

const AdminProfile = () => {
  const [admin, setAdmin] = useState({
    name: 'Dr. Mary Wanjiru',
    email: 'admin@hospital.org',
    hospital: 'Green Cross Hospital',
    phone: '+254 712 345678',
    role: 'Hospital Administrator'
  });

  const [editing, setEditing] = useState(false);

  const [profileImage, setProfileImage] = useState('/default-avatar.png'); // Can be replaced with actual image
  const [previewImage, setPreviewImage] = useState(null);

  const handleChange = (e) => {
    setAdmin({ ...admin, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    // TODO: Send updated profile info to the backend
    setEditing(false);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageUpload = () => {
    // TODO: Upload image to backend or storage
    setProfileImage(previewImage);
    setPreviewImage(null);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-3xl mx-auto bg-white shadow rounded-lg p-8">
        <h2 className="text-2xl font-bold text-green-600 mb-6">Admin Profile</h2>

        {/* Profile Picture Section */}
        <div className="flex flex-col items-center mb-8">
          <div className="relative w-32 h-32">
            <img
              src={previewImage || profileImage}
              alt="Profile"
              className="w-32 h-32 object-cover rounded-full border-4 border-green-500 shadow"
            />
            {previewImage && (
              <button
                onClick={handleImageUpload}
                className="absolute bottom-0 right-0 bg-green-600 text-white px-2 py-1 text-xs rounded-full hover:bg-green-700"
              >
                Save
              </button>
            )}
          </div>
          <label className="mt-4 text-sm text-blue-600 cursor-pointer hover:underline">
            Change Photo
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
          </label>
        </div>

        {/* Profile Form Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-gray-600 mb-1">Full Name</label>
            <input
              type="text"
              name="name"
              value={admin.name}
              onChange={handleChange}
              disabled={!editing}
              className={`w-full px-4 py-2 border rounded focus:outline-none ${editing ? 'border-green-500' : 'bg-gray-100 border-gray-300'}`}
            />
          </div>
          <div>
            <label className="block text-gray-600 mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={admin.email}
              onChange={handleChange}
              disabled={!editing}
              className={`w-full px-4 py-2 border rounded focus:outline-none ${editing ? 'border-green-500' : 'bg-gray-100 border-gray-300'}`}
            />
          </div>
          <div>
            <label className="block text-gray-600 mb-1">Hospital</label>
            <input
              type="text"
              name="hospital"
              value={admin.hospital}
              onChange={handleChange}
              disabled={!editing}
              className={`w-full px-4 py-2 border rounded focus:outline-none ${editing ? 'border-green-500' : 'bg-gray-100 border-gray-300'}`}
            />
          </div>
          <div>
            <label className="block text-gray-600 mb-1">Phone</label>
            <input
              type="text"
              name="phone"
              value={admin.phone}
              onChange={handleChange}
              disabled={!editing}
              className={`w-full px-4 py-2 border rounded focus:outline-none ${editing ? 'border-green-500' : 'bg-gray-100 border-gray-300'}`}
            />
          </div>
          <div>
            <label className="block text-gray-600 mb-1">Role</label>
            <input
              type="text"
              name="role"
              value={admin.role}
              disabled
              className="w-full px-4 py-2 bg-gray-100 border border-gray-300 rounded focus:outline-none cursor-not-allowed"
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-4">
          {editing ? (
            <>
              <button
                onClick={() => setEditing(false)}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
              >
                Save Changes
              </button>
            </>
          ) : (
            <button
              onClick={() => setEditing(true)}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Edit Profile
            </button>
          )}
        </div>

        {/* Account Actions */}
        <hr className="my-8" />
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Account Actions</h3>
          <div className="flex flex-col sm:flex-row gap-4">
            <button className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600">
              Change Password
            </button>
            <button className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700">
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;