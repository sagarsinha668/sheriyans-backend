import React, { useState } from "react";
import { useNavigate } from "react-router";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Login Data:", formData);
    // Add API call here
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4"
      style={{ backgroundColor: "#1d1d1d" }}
    >
      <div className="w-full max-w-md">
        {/* Card Container */}
        <div
          className="rounded-lg shadow-2xl p-8"
          style={{
            backgroundColor: "#1d1d1d",
            borderColor: "#1db8cc",
            borderWidth: "2px",
          }}
        >
          {/* Header */}
          <div className="text-center mb-8">
            <h1
              className="text-4xl font-bold mb-2"
              style={{ color: "#1db8cc" }}
            >
              Login
            </h1>
            <p style={{ color: "#f0f0f0" }}>
              Welcome back! Please login to your account
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div>
              <label
                className="block text-sm font-medium mb-2"
                style={{ color: "#f0f0f0" }}
              >
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className="w-full px-4 py-2 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-opacity-50 placeholder-gray-500"
                style={{
                  backgroundColor: "#2a2a2a",
                  borderColor: "#1db8cc",
                  borderWidth: "1px",
                  focusBorderColor: "#1db8cc",
                }}
                required
              />
            </div>

            {/* Password Field */}
            <div>
              <label
                className="block text-sm font-medium mb-2"
                style={{ color: "#f0f0f0" }}
              >
                Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                className="w-full px-4 py-2 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-opacity-50 placeholder-gray-500"
                style={{
                  backgroundColor: "#2a2a2a",
                  borderColor: "#1db8cc",
                  borderWidth: "1px",
                  focusBorderColor: "#1db8cc",
                }}
                required
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full text-white font-semibold py-2 px-4 rounded-lg transition-all duration-200 transform hover:scale-105"
              style={{ backgroundColor: "#1db8cc" }}
            >
              Login
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div
                className="w-full"
                style={{ borderTopColor: "#1db8cc", borderTopWidth: "1px" }}
              ></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span
                className="px-2"
                style={{ backgroundColor: "#1d1d1d", color: "#f0f0f0" }}
              >
                Don't have an account?
              </span>
            </div>
          </div>

          {/* Register Link */}
          <button
            onClick={() => navigate("/register")}
            className="w-full font-semibold py-2 px-4 rounded-lg transition-all duration-200 transform hover:scale-105"
            style={{ backgroundColor: "#1db8cc", color: "#1d1d1d" }}
          >
            Go to Register
          </button>
        </div>

        {/* Footer */}
        <p className="text-center text-sm mt-6" style={{ color: "#f0f0f0" }}>
          Your security is our priority
        </p>
      </div>
    </div>
  );
};

export default Login;
