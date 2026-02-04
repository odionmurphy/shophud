import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiUser, FiMail, FiPhone, FiMapPin, FiLogOut } from "react-icons/fi";
import { useAuthStore } from "../store";

export const ProfilePage: React.FC = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: "John Doe",
    email: "john@example.com",
    phone: "+1 (555) 123-4567",
    address: "123 Main Street, City, State 12345",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    setIsEditing(false);
    alert("Profile updated successfully!");
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Sidebar */}
        <div className="md:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
            <div className="flex flex-col items-center mb-6">
              <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center text-white text-3xl mb-4">
                <FiUser />
              </div>
              <h2 className="text-2xl font-bold text-center">
                {formData.name}
              </h2>
              <p className="text-gray-600 text-sm">{formData.email}</p>
            </div>

            <nav className="space-y-3">
              <button className="w-full text-left px-4 py-2 bg-blue-600 text-white rounded-lg font-medium">
                Profile
              </button>
              <button className="w-full text-left px-4 py-2 hover:bg-gray-100 rounded-lg transition">
                Orders
              </button>
              <button className="w-full text-left px-4 py-2 hover:bg-gray-100 rounded-lg transition">
                Wishlist
              </button>
              <button className="w-full text-left px-4 py-2 hover:bg-gray-100 rounded-lg transition">
                Settings
              </button>
              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition flex items-center gap-2"
              >
                <FiLogOut /> Logout
              </button>
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="md:col-span-2">
          <div className="bg-white rounded-lg shadow-md p-8">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-3xl font-bold">My Profile</h1>
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                {isEditing ? "Cancel" : "Edit Profile"}
              </button>
            </div>

            {isEditing ? (
              // Edit Form
              <form className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Address
                  </label>
                  <textarea
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    rows={3}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <button
                  type="button"
                  onClick={handleSave}
                  className="w-full bg-green-600 text-white py-2 rounded-lg font-semibold hover:bg-green-700 transition"
                >
                  Save Changes
                </button>
              </form>
            ) : (
              // View Mode
              <div className="space-y-6">
                <div className="border-b pb-4">
                  <div className="flex items-center gap-3 mb-2">
                    <FiUser className="text-gray-400" />
                    <span className="text-gray-600 text-sm">Full Name</span>
                  </div>
                  <p className="text-lg font-medium">{formData.name}</p>
                </div>

                <div className="border-b pb-4">
                  <div className="flex items-center gap-3 mb-2">
                    <FiMail className="text-gray-400" />
                    <span className="text-gray-600 text-sm">Email Address</span>
                  </div>
                  <p className="text-lg font-medium">{formData.email}</p>
                </div>

                <div className="border-b pb-4">
                  <div className="flex items-center gap-3 mb-2">
                    <FiPhone className="text-gray-400" />
                    <span className="text-gray-600 text-sm">Phone Number</span>
                  </div>
                  <p className="text-lg font-medium">{formData.phone}</p>
                </div>

                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <FiMapPin className="text-gray-400" />
                    <span className="text-gray-600 text-sm">Address</span>
                  </div>
                  <p className="text-lg font-medium">{formData.address}</p>
                </div>
              </div>
            )}
          </div>

          {/* Recent Orders */}
          <div className="mt-8 bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-bold mb-6">Recent Orders</h2>
            <div className="text-center py-8 text-gray-600">
              <p>No orders yet. Start shopping now!</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
